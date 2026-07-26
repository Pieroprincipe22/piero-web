// ============================================================
//  DATOS PRINCIPALES — edita SOLO este bloque para tus datos reales.
//  Lo que dejes en "" (vacío) no se mostrará en la web.
// ============================================================

export const site = {
  // Marca
  brand: 'Koda Estudio',
  mark: 'K', // símbolo del logo
  tagline: 'Desarrollo web a medida',

  // Dominio final en producción (ya conectado en Vercel + IONOS).
  domain: 'https://www.kodaestudio.com',

  // SEO
  title: 'Koda Estudio — Desarrollo web a medida para tu negocio',
  description:
    'Diseñamos y programamos webs a medida para negocios: rápidas, con base de datos cuando hace falta y con precios cómodos para todo tipo de clientes.',

  // Contacto  ← RELLENA con tus datos reales
  email: 'hola@kodaestudio.com', //  ← PENDIENTE: crea este buzón en IONOS o Resend antes de publicarlo
  whatsapp: '', //  ← solo números con prefijo, ej: '34600112233'. Vacío = oculta el botón.
  whatsappTexto: 'Hola, quiero información sobre una web.',
  ciudad: 'Barcelona', //  ← tu zona de trabajo

  // Redes (opcional, vacío = no se muestra)
  github: '',
  linkedin: '',
  instagram: '',
};

export type Site = typeof site;