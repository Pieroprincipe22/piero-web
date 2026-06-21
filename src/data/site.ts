// ============================================================
//  DATOS PRINCIPALES — edita SOLO este bloque para tus datos reales.
//  Lo que dejes en "" (vacío) no se mostrará en la web.
// ============================================================

export const site = {
  // Marca
  brand: 'Piero',
  mark: 'π', // símbolo del logo (tus iniciales Piero Iparraguirre)
  tagline: 'Desarrollo web a medida',

  // Dominio final (cuando lo tengas en IONOS). Se usa para SEO.
  domain: 'https://piero.dev',

  // SEO
  title: 'Piero — Desarrollo web a medida para tu negocio',
  description:
    'Diseño y programo webs a medida para negocios: rápidas, con base de datos cuando hace falta y con precios cómodos para todo tipo de clientes.',

  // Contacto  ← RELLENA con tus datos reales
  email: 'hola@piero.dev', //  ← tu email
  whatsapp: '', //  ← solo números con prefijo, ej: '34600112233'. Vacío = oculta el botón.
  whatsappTexto: 'Hola Piero, quiero información sobre una web.',
  ciudad: 'Barcelona', //  ← tu zona de trabajo

  // Redes (opcional, vacío = no se muestra)
  github: '',
  linkedin: '',
  instagram: '',
};

export type Site = typeof site;
