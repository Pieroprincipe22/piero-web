-- ============================================================
--  Tabla `leads`: guarda los mensajes del formulario de contacto
--  y las opiniones de la página /demo.
--
--  Refleja la tabla real del proyecto (revisada el 9/10/2026).
--  Se puede ejecutar varias veces: no borra ni cambia datos.
--  Supabase → SQL Editor → New query → Run.
-- ============================================================

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  nombre      text,
  email       text not null,
  mensaje     text,
  created_at  timestamptz not null default now(),
  ip_hash     text,                             -- visitante anónimo (límite anti-spam)
  source      text not null default 'contact',  -- de qué formulario viene: 'contact' o 'demo'
  valoracion  smallint                          -- nota de 1 a 5 de /demo (vacío = sin nota)
);

-- Por si la tabla se creó con una versión antigua de este archivo.
alter table public.leads add column if not exists ip_hash text;
alter table public.leads add column if not exists source text not null default 'contact';
alter table public.leads add column if not exists valoracion smallint;

-- La nota solo puede ser un número del 1 al 5 (o estar vacía).
alter table public.leads drop constraint if exists leads_valoracion_rango;
alter table public.leads add constraint leads_valoracion_rango
  check (valoracion is null or valoracion between 1 and 5);

-- Índices: el límite de envíos busca por ip_hash + fecha.
create index if not exists leads_ip_hash_created_at_idx on public.leads (ip_hash, created_at desc);
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_source_idx on public.leads (source);

-- Seguridad: activamos RLS y NO creamos políticas públicas.
-- La web escribe con la "service_role key" (solo en el servidor),
-- que salta RLS. Así nadie puede leer tus leads desde el navegador.
alter table public.leads enable row level security;