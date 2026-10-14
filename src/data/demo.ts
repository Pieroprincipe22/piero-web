// ============================================================
//  PÁGINA /demo — versión de prueba de Koda para invitados.
//  Todo el texto editable de la página está aquí.
//  Cuando subas una versión nueva, cambia solo `version` (y `tamano`).
// ============================================================

export const demo = {
  version: 'v0.16.0',

  // Enlace directo al .zip del último Release del repo público `koda-demo`.
  // Si el archivo del Release se llama SIEMPRE `Koda-demo.zip`, este enlace
  // no hay que tocarlo nunca: GitHub sirve automáticamente el más reciente.
  descargaUrl:
    'https://github.com/Pieroprincipe22/koda-demo/releases/latest/download/Koda-demo.zip',

  tamano: '719 MB', // Tamaño del .zip. Vacío = no se muestra.
  // Windows 11: comprobado en un PC limpio el 11 de octubre de 2026.
  // Windows 10: sigue SIN comprobar.
  sistema: 'Windows 10 u 11',

  requisitos: ['Micrófono y altavoces o cascos', 'Conexión a internet'],

  pasos: [
    {
      titulo: 'Descarga y descomprime',
      texto:
        'Extrae el .zip en una carpeta, por ejemplo en Documentos (clic derecho → «Extraer todo»). No abras Koda desde dentro del zip.',
    },
    {
      titulo: 'Pon tu clave',
      // Comprobado: Koda empaquetada lee el .env de la carpeta de Koda.exe (main.py).
      texto:
        'Copia el archivo de clave que te he enviado por privado dentro de esa carpeta, junto a Koda.exe.',
    },
    {
      titulo: 'Ábrelo',
      texto:
        'Abre Koda.exe. Windows avisará de que es una app desconocida: pulsa «Más información» y después «Ejecutar de todas formas». Si en su lugar sale un aviso del «Control inteligente de aplicaciones», sin botón para continuar, no cambies nada en tu equipo y escríbeme.',
    },
    {
      titulo: 'Háblale',
      texto:
        'La primera vez, Koda se presenta y te pregunta cómo quieres que te llame. Después acepta el permiso del micrófono si Windows lo pide y prueba: di «Koda», hazle una pregunta, pídele la hora o que abra un programa.',
    },
  ],

  // Guía de primeros ajustes, en carrusel. Cada ficha es un ajuste.
  // `id` enlaza con su dibujo en src/components/sections/DemoGuia.astro:
  // no lo cambies. Lo demás es texto libre. `prueba` y `nota` son
  // opcionales (vacío = no se muestra).
  guia: {
    etiqueta: 'Primeros ajustes',
    titulo: 'Deja a Koda a tu gusto',
    texto:
      'Koda viene con varias funciones apagadas, para no gastar ni mirar nada sin tu permiso. Estos son los cinco ajustes del primer día.',
    fichas: [
      {
        id: 'nombre',
        corto: 'Tu nombre',
        titulo: 'Cambia cómo te llama',
        texto:
          'La primera vez que la abres, Koda te pregunta cómo llamarte. Si después quieres cambiar el nombre, el trato o tu cumpleaños, se hace aquí.',
        pasos: [
          'Pulsa «Configuración», en el menú de la izquierda.',
          'Quédate en la pestaña «General».',
          'En «Su perfil», cambia tu nombre y pulsa Intro.',
        ],
        prueba: '',
        nota: '',
      },
      {
        id: 'busqueda',
        corto: 'Búsqueda web',
        titulo: 'Noticias, tiempo y datos de hoy',
        texto:
          'Koda viene con la búsqueda en internet apagada. Si le pides las noticias sin activarla, te dirá que no puede.',
        pasos: [
          'Pulsa «Configuración», en el menú de la izquierda.',
          'Abre la pestaña «Permisos».',
          'Marca «Búsqueda web (noticias, clima)».',
        ],
        prueba: '«Koda, dame las noticias de hoy».',
        nota: 'La prueba incluye 8 búsquedas.',
      },
      {
        id: 'ciudad',
        corto: 'Tu ciudad',
        titulo: 'Dile dónde estás',
        texto: 'Con tu ciudad y tu país, el tiempo y las noticias serán los de tu zona.',
        pasos: [
          'Pulsa «Configuración», en el menú de la izquierda.',
          'Abre la pestaña «Ubicación».',
          'Escribe tu ciudad y elige tu país.',
        ],
        prueba: '«Koda, ¿qué tiempo hace hoy?»',
        nota: 'Necesita la búsqueda web activada (ajuste 2).',
      },
      {
        id: 'vision',
        corto: 'Cámara y pantalla',
        titulo: 'Déjale mirar, solo si quieres',
        texto:
          'Koda puede ver por la cámara o mirar tu pantalla. Solo lo hace cuando se lo pides, con una foto cada vez, y viene apagado.',
        pasos: [
          'Pulsa «Configuración», en el menú de la izquierda.',
          'Abre la pestaña «Permisos» y baja.',
          'En «Cámara», marca «Usar la cámara cuando se lo pida».',
          'En «Pantalla», marca «Ver la pantalla cuando se lo pida».',
        ],
        prueba: '«Koda, ¿qué es esto?» o «Koda, mira mi pantalla».',
        nota: 'La captura es de toda la pantalla: cierra antes lo que no quieras enseñar.',
      },
      {
        id: 'apps',
        corto: 'Tus programas',
        titulo: 'Enséñale tus programas',
        texto: 'Koda abre los programas que tiene apuntados. Añade los que uses a diario.',
        pasos: [
          'Pulsa «Mis apps», en el menú de la izquierda.',
          'Pulsa «＋ Añadir aplicación» y elige el programa.',
          'Escribe el nombre con el que lo pedirás y pulsa «Guardar».',
        ],
        prueba: '«Koda, abre Spotify».',
        nota: '',
      },
    ],
  },

  avisos: [
    {
      titulo: 'Koda es una inteligencia artificial',
      texto:
        'No hablas con una persona. Sus respuestas las genera una IA y a veces se equivoca, así que comprueba lo que sea importante.',
    },
    {
      titulo: 'Qué pasa con lo que dices',
      texto:
        'Tu voz se convierte en texto dentro de tu PC: el audio no sale de él. Ese texto se envía a Anthropic (Claude) para responderte, y la respuesta a Cartesia para crear la voz de Koda (o a Microsoft, si Cartesia no responde). Si le pides que mire por la cámara, la imagen se envía a Anthropic.',
    },
    {
      titulo: 'Tu clave es personal',
      texto:
        'La clave que te he mandado es solo para ti. No la compartas: tiene un límite de gasto y la desactivaré cuando termine la prueba.',
    },
    {
      titulo: 'Es una versión temprana',
      texto:
        'Puede fallar, quedarse callada o no entenderte a la primera. Cuando pase, cuéntamelo abajo: es justo lo que necesito saber.',
    },
  ],

  // Nota de 1 a 5 estrellas, encima de las preguntas del formulario.
  // `textos` es lo que se lee al elegir cada estrella, de la 1 a la 5:
  // tienen que ser cinco. `sinNota` es lo que pone antes de elegir.
  valoracion: {
    label: '¿Qué nota le pones a Koda?',
    sinNota: 'Sin nota todavía',
    textos: ['Muy mal', 'Mal', 'Normal', 'Bien', 'Muy bien'],
  },

  // Preguntas del formulario de opinión (se envían por el mismo
  // sistema que el formulario de contacto: Supabase + email).
  preguntas: [
    { id: 'fallo', label: '¿Qué falló?', placeholder: 'Qué hiciste, qué esperabas y qué pasó…' },
    { id: 'gusto', label: '¿Qué te gustó?', placeholder: 'Lo que te sorprendió para bien…' },
    { id: 'falta', label: '¿Qué echaste en falta?', placeholder: 'Algo que intentaste y no supo hacer…' },
  ],

  // Opiniones públicas: las que la gente escribe para que las lean otros.
  // Se ven en el apartado «Opiniones», justo debajo del botón de descarga
  // (src/components/sections/DemoOpiniones.astro). Mientras no haya ninguna
  // publicada, ese apartado no aparece.
  opiniones: {
    etiqueta: 'Opiniones',
    // Título para lectores de pantalla (no se ve).
    titulo: 'Opiniones de quienes ya han probado Koda',
    enlace: 'Deja la tuya ↓',
    // Cuántas se enseñan como mucho, de la más nueva a la más antigua.
    maximo: 20,

    // Bloque del formulario para escribir la opinión pública (es opcional).
    form: {
      separador: 'Para publicar en esta página · Opcional',
      label: 'Tu opinión, para quien dude si descargarla',
      placeholder: 'En un par de frases: qué tal va, para qué te ha servido…',
      aliasLabel: 'Nombre o alias que se verá',
      aliasPlaceholder: 'Si lo dejas vacío, saldrá «Anónimo»',
      aviso:
        'Solo si rellenas este apartado: tu opinión, tu nota y ese nombre se publican en esta página, a la vista de cualquiera. Tu email y las tres respuestas de arriba no se publican nunca. Si luego quieres que la quite, escríbeme.',
    },
  },
};

export type Demo = typeof demo;