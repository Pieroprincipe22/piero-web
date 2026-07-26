// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Páginas estáticas (rápidas + buen SEO). El formulario usa una
  // función serverless aparte (src/pages/api/contact.ts con prerender=false).
  output: 'static',
  adapter: vercel(),
  // Dominio final en producción (ya conectado en Vercel + IONOS):
  site: 'https://www.kodaestudio.com',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});