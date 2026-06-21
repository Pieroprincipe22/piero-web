export type Servicio = {
  titulo: string;
  texto: string;
  icono: 'web' | 'db' | 'code' | 'precio';
  acento?: boolean;
};

export const servicios: Servicio[] = [
  {
    icono: 'web',
    titulo: 'Webs para negocios',
    texto:
      'Tu presencia online lista para vender: clara, rápida y pensada para que tus clientes te encuentren y te contacten.',
  },
  {
    icono: 'db',
    titulo: 'Webs con base de datos',
    texto:
      'Reservas, catálogos, paneles, usuarios… Si tu web necesita guardar y gestionar información, la construyo a medida.',
  },
  {
    icono: 'code',
    titulo: 'Desarrollo a medida',
    texto:
      'Nada de plantillas genéricas. Cada web se diseña y programa según lo que tú y tu negocio realmente necesitáis.',
  },
  {
    icono: 'precio',
    titulo: 'Precios cómodos',
    texto:
      'Presupuestos honestos y adaptados a cada tipo de cliente. Sabes lo que pagas desde el primer momento, sin sorpresas.',
    acento: true,
  },
];
