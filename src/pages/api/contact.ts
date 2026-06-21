import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Esta ruta se ejecuta en el servidor (función serverless en Vercel),
// no se genera de forma estática.
export const prerender = false;

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Petición no válida' }, 400);
  }

  const nombre = (body.nombre || '').trim();
  const email = (body.email || '').trim();
  const mensaje = (body.mensaje || '').trim();

  if (!nombre || !email || !mensaje) {
    return json({ error: 'Faltan campos obligatorios' }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'Email no válido' }, 400);
  }

  const env = import.meta.env;
  let guardado = false;
  let avisado = false;

  // 1) Guardar en Supabase
  if (env.SUPABASE_URL && env.SUPABASE_SERVICE_KEY) {
    try {
      const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY);
      const { error } = await supabase.from('leads').insert({ nombre, email, mensaje });
      if (!error) guardado = true;
      else console.error('Supabase:', error.message);
    } catch (e) {
      console.error('Supabase error:', e);
    }
  }

  // 2) Avisar por email con Resend
  if (env.RESEND_API_KEY && env.MAIL_FROM && env.MAIL_TO) {
    try {
      const resend = new Resend(env.RESEND_API_KEY);
      await resend.emails.send({
        from: env.MAIL_FROM,
        to: env.MAIL_TO,
        replyTo: email,
        subject: `Nuevo cliente desde la web — ${nombre}`,
        text: `Nombre: ${nombre}\nEmail: ${email}\n\nMensaje:\n${mensaje}`,
      });
      avisado = true;
    } catch (e) {
      console.error('Resend error:', e);
    }
  }

  if (!guardado && !avisado) {
    // Nada configurado o ambos fallaron.
    return json({ error: 'No se pudo procesar el mensaje' }, 500);
  }

  return json({ ok: true });
};
