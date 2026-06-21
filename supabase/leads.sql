-- ============================================================
--  Tabla para guardar los mensajes del formulario de contacto.
--  Pégalo en Supabase → SQL Editor → New query → Run.
-- ============================================================

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  nombre      text not null,
  email       text not null,
  mensaje     text not null,
  created_at  timestamptz not null default now()
);

-- Seguridad: activamos RLS y NO creamos políticas públicas.
-- La web escribe con la "service_role key" (solo en el servidor),
-- que salta RLS. Así nadie puede leer tus leads desde el navegador.
alter table public.leads enable row level security;
