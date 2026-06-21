# Piero — Web de presentación

Web hecha con **Astro + TypeScript + Tailwind**. Páginas estáticas (rápidas y con buen SEO) y un formulario de contacto que **guarda cada consulta en Supabase** y te **avisa por email con Resend**.

---

## 1. Pon tus datos reales (5 minutos)

Edita estos archivos en `src/data/`:

- **`site.ts`** → tu email, WhatsApp (solo números, ej. `34600112233`), ciudad y redes.
- **`planes.ts`** → tus precios reales en el campo `precio` (ej. `'desde €290'`). Si lo dejas vacío, sale "Presupuesto a medida".
- **`proyectos.ts`** → tus proyectos. Si dejas la lista vacía, la sección no se muestra.

> No hace falta tocar el diseño. Todo el contenido editable está en `src/data`.

## 2. Pruébala en tu ordenador

```bash
npm install
npm run dev
```
Abre http://localhost:4321

## 3. Supabase (base de datos)

1. En tu proyecto de Supabase → **SQL Editor** → pega el contenido de `supabase/leads.sql` → **Run**.
2. **Project Settings → API**: copia `URL` y la **`service_role` key** (es secreta, solo va en el servidor).

## 4. Resend (email)

1. En https://resend.com crea una **API Key**.
2. Para enviar desde tu dominio, verifícalo en Resend. Mientras tanto puedes usar `onboarding@resend.dev` como remitente.

## 5. Variables de entorno

Copia `.env.example` como `.env` y rellena: `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, `RESEND_API_KEY`, `MAIL_FROM`, `MAIL_TO`.
(El `.env` está en `.gitignore`: nunca se sube a GitHub.)

## 6. Sube a GitHub

```bash
git init
git add .
git commit -m "Web Piero"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/piero-web.git
git push -u origin main
```

## 7. Despliega en Vercel

1. https://vercel.com → **Add New → Project** → importa tu repo de GitHub.
2. Vercel detecta Astro solo. Antes de desplegar, en **Environment Variables** añade las **mismas 5 variables** del `.env`.
3. **Deploy**. En un minuto tendrás una URL `tuproyecto.vercel.app`.

## 8. Conecta tu dominio de IONOS

1. En Vercel: **Project → Settings → Domains → Add** → escribe tu dominio.
2. Vercel te dirá qué apuntar. Normalmente, en el panel DNS de **IONOS**:
   - Registro **A** de `@` → `76.76.21.21`
   - Registro **CNAME** de `www` → `cname.vercel-dns.com`
3. Espera a que propague (de minutos a unas horas). Vercel pone el HTTPS solo.
4. Cambia `site:` en `astro.config.mjs` por tu dominio final y haz `git push` (se redespliega solo).

---

## Día a día
- Cada `git push` a `main` actualiza la web automáticamente.
- Los mensajes de clientes quedan en la tabla `leads` de Supabase **y** te llegan por email.

## Comandos
```bash
npm run dev      # desarrollo local
npm run build    # compilar
npm run preview  # ver la versión compilada
```
