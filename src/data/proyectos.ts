// Tus proyectos reales. Añade tantos como quieras.
// Si dejas la lista vacía ([]), la sección "Proyectos" no se muestra.
// Cuando tengas captura, pon la ruta en "imagen" (ej: '/proyectos/nick.jpg'
// guardada en la carpeta /public). Mientras tanto se ve un degradado limpio.

export type Proyecto = {
  titulo: string;
  descripcion: string;
  url?: string;
  imagen?: string;
};

export const proyectos: Proyecto[] = [
  {
    titulo: 'Web para Nick',
    descripcion: 'Desarrollo web a medida',
    url: '', //  ← pon aquí el enlace cuando esté online
  },
  // Duplica este bloque para añadir más proyectos:
  // { titulo: 'Nombre del proyecto', descripcion: 'Tipo de web · sector', url: '' },
];
