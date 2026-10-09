import type { APIRoute } from 'astro';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export const prerender = false;

/** Tabla leads con la columna nueva `source` y nombre/mensaje ya opcionales. */
type Database = {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          nombre: string | null;
          email: string;
          mensaje: string | null;
          ip_hash: string | null;
          source: string;
          created_at: string;
        };
        Insert: {
          email: string;
          ip_hash?: string | null;
          source?: string;
          nombre?: string | null;
          mensaje?: string | null;
        };
        Update: never;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

// ── Ajustes ──────────────────────────────────────────────────
const SOURCE = 'koda-assist-waitlist';
const MAX_POR_IP = 3;         // máximo de altas...
const VENTANA_MINUTOS = 10;   // ...cada 10 minutos
const SEGUNDOS_MINIMOS = 3;   // rellenar más rápido = bot (time-trap opcional)
const LIMITE_EMAIL = 120;

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

// Respuesta "de mentira" para bots: creen que funcionó y no insisten.
const fingirOk = () => json({ ok: true });

/** Hash de la IP: limita por visitante SIN guardar su IP real (RGPD). */
async function hashIp(ip: string, salt: string): Promise<string> {
  const datos = new TextEncoder().encode(`${salt}:${ip}`);
  const buffer = await crypto.subtle.digest('SHA-256', datos);
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, 32);
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const env = import.meta.env;

  // 1) Solo desde nuestra propia web.
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  if (origin && host && !origin.includes(host)) {
    return json({ error: 'No autorizado' }, 403);
  }

  // 2) Cuerpo JSON válido.
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Petición no válida' }, 400);
  }

  const texto = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
  const email = texto(body.email);
  const consent = body.consent === true;

  // 3) Honeypot: campo invisible que solo rellenan los bots.
  if (texto(body.company)) return fingirOk();

  // 4) Time-trap opcional: si el form manda `ts`, exigimos un mínimo de segundos.
  const cargadoEn = Number(body.ts);
  if (Number.isFinite(cargadoEn) && cargadoEn > 0) {
    const segundos = (Date.now() - cargadoEn) / 1000;
    if (segundos < SEGUNDOS_MINIMOS) return fingirOk();
  }

  // 5) Validación.
  if (!email) return json({ error: 'Falta el correo' }, 400);
  if (!consent) return json({ error: 'Falta el consentimiento' }, 400);
  if (email.length > LIMITE_EMAIL) return json({ error: 'Correo demasiado largo' }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'Email no válido' }, 400);
  }
  if (/[\r\n]/.test(email)) return json({ error: 'Datos no válidos' }, 400);

  // 6) Identificador anónimo del visitante.
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    clientAddress ||
    'desconocida';
  const salt = env.IP_SALT || 'piero-web-salt';
  let ipHash: string | null = null;
  try {
    ipHash = await hashIp(ip, salt);
  } catch {
    ipHash = null;
  }

  let supabase: SupabaseClient<Database> | null = null;
  if (env.SUPABASE_URL && env.SUPABASE_SERVICE_KEY) {
    supabase = createClient<Database>(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY);
  }

  // 7) Límite por visitante, contando solo altas de la lista de espera.
  if (supabase && ipHash) {
    try {
      const desde = new Date(Date.now() - VENTANA_MINUTOS * 60_000).toISOString();
      const { count, error } = await supabase
        .from('leads')
        .select('id', { count: 'exact', head: true })
        .eq('ip_hash', ipHash)
        .eq('source', SOURCE)
        .gte('created_at', desde);

      if (!error && typeof count === 'number' && count >= MAX_POR_IP) {
        return json(
          { error: 'Ya te has apuntado hace un momento. Inténtalo más tarde si hace falta.' },
          429
        );
      }
    } catch {
      console.error('Rate limit no disponible');
    }
  }

  let guardado = false;
  let avisado = false;

  // 8) Guardar en Supabase (nombre/mensaje van vacíos; el origen lo marca `source`).
  if (supabase) {
    try {
      const { error } = await supabase
        .from('leads')
        .insert({ email, ip_hash: ipHash, source: SOURCE });
      if (!error) guardado = true;
      else console.error('Supabase insert falló');
    } catch {
      console.error('Supabase no disponible');
    }
  }

  // 9) Avisarte por email de cada alta.
  if (env.RESEND_API_KEY && env.MAIL_FROM && env.MAIL_TO) {
    try {
      const resend = new Resend(env.RESEND_API_KEY);
      await resend.emails.send({
        from: env.MAIL_FROM,
        to: env.MAIL_TO,
        replyTo: email,
        subject: 'Nueva alta en la lista de espera — Koda Assist',
        text: `Nuevo interesado en Koda Assist:\n\nEmail: ${email}`,
      });
      avisado = true;
    } catch {
      console.error('Resend no disponible');
    }
  }

  if (!guardado && !avisado) {
    return json({ error: 'No se pudo completar el alta. Inténtalo más tarde.' }, 500);
  }

  return json({ ok: true });
};