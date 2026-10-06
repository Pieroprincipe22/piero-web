// ============================================================
//  PÁGINA /demo — versión de prueba de Koda para invitados.
//  Todo el texto editable de la página está aquí.
//  Cuando subas una versión nueva, cambia solo `version` (y `tamano`).
// ============================================================

export const demo = {
  version: 'v0.15.1',

  // Enlace directo al .zip del último Release del repo público `koda-demo`.
  // Si el archivo del Release se llama SIEMPRE `Koda-demo.zip`, este enlace
  // no hay que tocarlo nunca: GitHub sirve automáticamente el más reciente.
  descargaUrl:
    'https://github.com/Pieroprincipe22/koda-demo/releases/latest/download/Koda-demo.zip',

  tamano: '', // ← ej: '140 MB'. Vacío = no se muestra.
  sistema: 'Windows 10 u 11', // ← COMPRUEBA en un PC limpio antes de publicarlo

  requisitos: ['Micrófono y altavoces o cascos', 'Conexión a internet'],

  pasos: [
    {
      titulo: 'Descarga y descomprime',
      texto:
        'Extrae el .zip en una carpeta, por ejemplo en Documentos (clic derecho → «Extraer todo»). No abras Koda desde dentro del zip.',
    },
    {
      titulo: 'Pon tu clave',
      // ← COMPRUEBA desde qué carpeta lee Koda el .env cuando va empaquetado.
      texto:
        'Copia el archivo de clave que te he enviado por privado dentro de esa carpeta, junto a Koda.exe.',
    },
    {
      titulo: 'Ábrelo',
      texto:
        'Abre Koda.exe. Windows avisará de que es una app desconocida: pulsa «Más información» y después «Ejecutar de todas formas».',
    },
    {
      titulo: 'Háblale',
      texto:
        'Acepta el permiso del micrófono si Windows lo pide y prueba: hazle una pregunta, pídele la hora o que abra un programa.',
    },
  ],

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

  // Preguntas del formulario de opinión (se envían por el mismo
  // sistema que el formulario de contacto: Supabase + email).
  preguntas: [
    { id: 'fallo', label: '¿Qué falló?', placeholder: 'Qué hiciste, qué esperabas y qué pasó…' },
    { id: 'gusto', label: '¿Qué te gustó?', placeholder: 'Lo que te sorprendió para bien…' },
    { id: 'falta', label: '¿Qué echaste en falta?', placeholder: 'Algo que intentaste y no supo hacer…' },
  ],
};

export type Demo = typeof demo;