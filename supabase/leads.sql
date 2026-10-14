-- ============================================================
--  Tabla `leads`: guarda los mensajes del formulario de contacto
--  y las opiniones de la página /demo.
--
--  Refleja la tabla real del proyecto (revisada el 12/10/2026).
--  Se puede ejecutar varias veces: no borra ni cambia datos.
--  Supabase → SQL Editor → New query → Run.
-- ============================================================

create table if not exists public.leads (
  id               uuid primary key default gen_random_uuid(),
  nombre           text,
  email            text not null,
  mensaje          text,
  created_at       timestamptz not null default now(),
  ip_hash          text,                             -- visitante anónimo (límite anti-spam)
  source           text not null default 'contact',  -- de qué formulario viene: 'contact' o 'demo'
  valoracion       smallint,                         -- nota de 1 a 5 de /demo (vacío = sin nota)
  opinion_publica  text,                             -- texto que la persona escribió PARA publicar
  alias_publico    text,                             -- nombre o alias con el que quiere aparecer
  version          text,                             -- versión de Koda que probó (p. ej. 'v0.16.0')
  publicada        boolean not null default false    -- true = se ve en /demo. Desmárcala para ocultarla.
);

-- Por si la tabla se creó con una versión antigua de este archivo.
alter table public.leads add column if not exists ip_hash text;
alter table public.leads add column if not exists source text not null default 'contact';
alter table public.leads add column if not exists valoracion smallint;

-- Opiniones públicas de /demo (12/10/2026).
-- Las filas que ya existían se quedan con `publicada = false`: no se publica
-- nada de lo que te habían enviado hasta hoy.
alter table public.leads add column if not exists opinion_publica text;
alter table public.leads add column if not exists alias_publico text;
alter table public.leads add column if not exists version text;
alter table public.leads add column if not exists publicada boolean not null default false;

-- La nota solo puede ser un número del 1 al 5 (o estar vacía).
alter table public.leads drop constraint if exists leads_valoracion_rango;
alter table public.leads add constraint leads_valoracion_rango
  check (valoracion is null or valoracion between 1 and 5);

-- Seguro contra despistes: una fila solo puede estar publicada si tiene un
-- texto escrito para publicar. Si un día marcas `publicada` por error en un
-- mensaje privado, Supabase no te deja guardarlo.
alter table public.leads drop constraint if exists leads_publicada_con_texto;
alter table public.leads add constraint leads_publicada_con_texto
  check (not publicada or opinion_publica is not null);

-- Índices: el límite de envíos busca por ip_hash + fecha.
create index if not exists leads_ip_hash_created_at_idx on public.leads (ip_hash, created_at desc);
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_source_idx on public.leads (source);

-- Seguridad: activamos RLS y NO creamos políticas públicas.
-- La web lee y escribe con la "service_role key" (solo en el servidor),
-- que salta RLS. Así nadie puede leer tus leads desde el navegador: las
-- opiniones publicadas las pide el servidor y solo manda a la página el
-- alias, el texto público, la nota, la versión y la fecha.
alter table public.leads enable row level security;