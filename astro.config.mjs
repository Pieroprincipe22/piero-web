// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Páginas estáticas (rápidas + buen SEO). El formulario usa una
  // función serverless aparte (src/pages/api/contact.ts con prerender=false).
  output: 'static',
  adapter: vercel(),
  // CAMBIA esto por tu dominio final cuando lo tengas en IONOS:
  site: 'https://piero.dev',
  vite: {
    plugins: [tailwindcss()],
  },
});
