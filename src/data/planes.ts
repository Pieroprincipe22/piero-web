export type Plan = {
  badge: string;
  titulo: string;
  desc: string;
  // Pon aquí tu precio real, ej: 'desde €290'.
  // Si lo dejas en '' se muestra automáticamente "Presupuesto a medida".
  precio: string;
  incluye: string[];
  cta: string;
  destacado?: boolean;
};

export const planes: Plan[] = [
  {
    badge: 'Para empezar',
    titulo: 'Web Esencial',
    desc: 'Ideal si quieres estar online ya, con una web limpia y profesional.',
    precio: '', //  ← ej: 'desde €290'
    incluye: [
      'Diseño a medida (one-page)',
      'Adaptada a móvil',
      'Formulario de contacto',
      'SEO básico para Google',
    ],
    cta: 'Me interesa',
  },
  {
    badge: 'La más pedida',
    titulo: 'Web Negocio',
    desc: 'La opción completa para negocios que quieren crecer online.',
    precio: '', //  ← ej: 'desde €590'
    incluye: [
      'Varias páginas a medida',
      'Blog, galería o catálogo',
      'Integraciones (WhatsApp, mapas…)',
      'Optimización y velocidad',
    ],
    cta: 'Pide presupuesto',
    destacado: true,
  },
  {
    badge: 'A medida',
    titulo: 'Web con base de datos',
    desc: 'Proyectos completos con gestión de información y funciones propias.',
    precio: '', // este lo dejamos siempre "a medida"
    incluye: [
      'Base de datos a medida',
      'Panel de gestión',
      'Reservas, usuarios o catálogo',
      'Funcionalidades a tu medida',
    ],
    cta: 'Cuéntame tu idea',
  },
];
