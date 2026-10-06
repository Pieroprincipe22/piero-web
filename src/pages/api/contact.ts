import type { APIRoute } from 'astro';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export const prerender = false;

/** Describe nuestra tabla para que TypeScript conozca sus columnas. */
type Database = {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          nombre: string;
          email: string;
          mensaje: string;
          ip_hash: string | null;
          created_at: string;
        };
        Insert: {
          nombre: string;
          email: string;
          mensaje: string;
          ip_hash?: string | null;
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

// ── Ajustes anti-spam ────────────────────────────────────────
const MAX_POR_IP = 3;          // máximo de mensajes...
const VENTANA_MINUTOS = 10;    // ...cada 10 minutos
const SEGUNDOS_MINIMOS = 3;    // rellenar más rápido que esto = bot
const LIMITES = { nombre: 80, email: 120, mensaje: 2000 };

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

// Respuesta "de mentira" para bots: creen que ha funcionado y no insisten.
const fingirOk = () => json({ ok: true });

/** Hash de la IP: permite limitar por visitante SIN guardar su IP real (RGPD). */
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

  // 1) Solo aceptamos peticiones desde nuestra propia web.
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  if (origin && host && !origin.includes(host)) {
    return json({ error: 'No autorizado' }, 403);
  }

  // 2) El cuerpo debe ser JSON válido.
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Petición no válida' }, 400);
  }

  const texto = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
  const nombre = texto(body.nombre);
  const email = texto(body.email);
  const mensaje = texto(body.mensaje);

  // 3) Honeypot: campo invisible que solo rellenan los bots.
  if (texto(body.website)) return fingirOk();

  // 4) Time-trap: nadie humano rellena un formulario en menos de 3 segundos.
  const cargadoEn = Number(body.ts);
  if (Number.isFinite(cargadoEn) && cargadoEn > 0) {
    const segundos = (Date.now() - cargadoEn) / 1000;
    if (segundos < SEGUNDOS_MINIMOS) return fingirOk();
  }

  // 5) Validación de contenido.
  if (!nombre || !email || !mensaje) {
    return json({ error: 'Faltan campos obligatorios' }, 400);
  }
  if (
    nombre.length > LIMITES.nombre ||
    email.length > LIMITES.email ||
    mensaje.length > LIMITES.mensaje
  ) {
    return json({ error: 'El mensaje es demasiado largo' }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'Email no válido' }, 400);
  }
  // Evita que inyecten cabeceras extra en el correo.
  if (/[\r\n]/.test(nombre) || /[\r\n]/.test(email)) {
    return json({ error: 'Datos no válidos' }, 400);
  }

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

  // 7) Límite de envíos por visitante.
  //    Si la comprobación falla, dejamos pasar: mejor un spam que perder un cliente.
  if (supabase && ipHash) {
    try {
      const desde = new Date(Date.now() - VENTANA_MINUTOS * 60_000).toISOString();
      const { count, error } = await supabase
        .from('leads')
        .select('id', { count: 'exact', head: true })
        .eq('ip_hash', ipHash)
        .gte('created_at', desde);

      if (!error && typeof count === 'number' && count >= MAX_POR_IP) {
        return json(
          { error: 'Has enviado varios mensajes seguidos. Inténtalo de nuevo en unos minutos.' },
          429
        );
      }
    } catch {
      console.error('Rate limit no disponible');
    }
  }

  let guardado = false;
  let avisado = false;

  // 8) Guardar en Supabase.
  if (supabase) {
    try {
      const { error } = await supabase
        .from('leads')
        .insert({ nombre, email, mensaje, ip_hash: ipHash });
      if (!error) guardado = true;
      else console.error('Supabase insert falló');
    } catch {
      console.error('Supabase no disponible');
    }
  }

  // 9) Avisar por email.
  //    Las opiniones de la página /demo llegan con el prefijo "[Demo Koda".
  const esDemo = mensaje.startsWith('[Demo Koda');
  if (env.RESEND_API_KEY && env.MAIL_FROM && env.MAIL_TO) {
    try {
      const resend = new Resend(env.RESEND_API_KEY);
      // Ojo: Resend NO lanza un error cuando falla; lo devuelve en `error`.
      const { error } = await resend.emails.send({
        from: env.MAIL_FROM,
        to: env.MAIL_TO,
        replyTo: email,
        subject: esDemo
          ? `Opinión de la demo de Koda — ${nombre}`
          : `Nuevo cliente desde la web — ${nombre}`,
        text: `Nombre: ${nombre}\nEmail: ${email}\n\nMensaje:\n${mensaje}`,
      });
      if (!error) avisado = true;
      else console.error('Resend rechazó el envío');
    } catch {
      console.error('Resend no disponible');
    }
  }

  if (!guardado && !avisado) {
    // Mensaje genérico: nunca exponemos el motivo real al visitante.
    return json({ error: 'No se pudo enviar el mensaje. Inténtalo más tarde.' }, 500);
  }

  return json({ ok: true });
};