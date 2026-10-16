// ============================================================
//  PÁGINA /novedades — lo nuevo de Koda y lo que viene.
//  Todo el texto editable de la página está aquí.
//
//  Tres estados, para que nadie se lleve a engaño:
//    · "proxima": en la próxima versión (todavía no está en la demo).
//    · "ya":      ya está en la demo de hoy.
//    · "diseno":  más adelante; todavía no está en Koda.
//  Cuando salga la próxima versión, la sección "ordenador" pasa a "ya".
//
//  Lo que dice Koda va de usted, como en la app. El resto, de tú.
// ============================================================

export type EstadoMedicion = 'bien' | 'atencion' | 'informa';

export const novedades = {
  seo: {
    title: 'Lo nuevo de Koda — Koda Estudio',
    description:
      'La próxima versión de Koda revisa tu ordenador y te dice qué conviene hacer. Y ya mira por la cámara, lee tu pantalla y te lee documentos en voz alta.',
  },

  // Adónde llevan los botones «Pide probar la demo».
  pedirDemoUrl: '/koda-assist#probar',

  portada: {
    estado: 'Próxima versión de Koda',
    titulo: 'Koda aprende a cuidar de tu ordenador.',
    entrada:
      'Le pides que revise tu PC y te dice, con palabras normales, cómo está y qué conviene hacer. Si algo se puede arreglar, te lo ofrece. Siempre con tu permiso.',
    entrada2:
      'Y lo que ya sabe hacer: mira a través de la cámara, lee tu pantalla y te lee documentos en voz alta.',
    boton: 'Pide probar la demo',
    enlace: 'Ver todo lo que trae',
    nota: 'La próxima versión está en desarrollo y todavía no tiene fecha.',
    orbePie: 'El orbe de Koda, el mismo que ves en la app.',
    orbePieRaton: ' Acerca el ratón.', // solo en ordenadores con ratón
  },

  // ---------------------------------------------------------- Mi ordenador
  ordenador: {
    estado: 'En la próxima versión',
    titulo: 'Una revisión completa de tu ordenador, en palabras que se entienden.',
    intro: 'En unos segundos sabes cómo está tu PC, qué conviene hacer y por qué. Koda mira; tú decides.',

    // Es una secuencia de verdad: por eso va numerada.
    pasos: [
      {
        titulo: 'Se lo pides',
        texto: 'De viva voz o por el chat: «Koda, revisa mi ordenador» o «¿qué ocupa más espacio?».',
      },
      {
        titulo: 'Te pide permiso',
        texto:
          '«¿Me deja revisar su ordenador entero? Solo voy a mirar. No cambio nada.» Para mirar, basta un sí de viva voz.',
      },
      {
        titulo: 'Te lo cuenta',
        texto:
          'Te dice cómo está en una frase y lo deja todo en la página Mi ordenador: lo que conviene hacer, cada cosa que ha mirado y lo que ya ha hecho.',
      },
      {
        titulo: 'Tú decides',
        texto: 'Cada recomendación lleva su botón. Antes de cambiar algo, Koda vuelve a preguntar y hace falta tu clic.',
      },
    ],

    // Solo lo que está en el plan de la v0.17.0 (pasos 7.4 y 7.5).
    mira: [
      'El procesador, la memoria y los programas que más gastan',
      'Qué programas se abren solos al encender',
      'Cuánto ocupan la papelera y los archivos temporales',
      'El espacio libre del disco y qué carpetas ocupan más',
      'La batería y si está enchufado',
      'Si Windows espera un reinicio para terminar una actualización',
    ],
    hace: [
      'Abrirte el ajuste exacto de Windows: Windows Update, los programas de arranque…',
      'Vaciar la papelera',
      'Cerrar un programa que se ha quedado colgado',
      'Borrar los archivos temporales de más de un día que no se estén usando',
    ],
    nunca: [
      'Mirar tus documentos, tus correos, tus contraseñas ni lo que visitas en internet',
      'Pedir permisos de administrador',
      'Mover el ratón ni escribir por ti',
      'Cambiar nada sin tu sí',
    ],
    tambien: {
      negrita: 'También en la próxima versión:',
      texto: 'mientras habla, Koda ya no hace caso a lo que sale por tus altavoces. Se acabó contestarse a sí misma.',
    },

    // La revisión de ejemplo: la misma que scripts/ver_mi_ordenador.py del proyecto Koda.
    ejemplo: {
      menu: ['Inicio', 'Mis apps', 'Tareas', 'Recordatorios', 'Memoria', 'Mi ordenador'],
      activo: 'Mi ordenador',
      antetitulo: 'MI ORDENADOR · REVISADO HOY, 10:32',
      titulo: 'Su ordenador va bien.',
      subtitulo: 'He encontrado cuatro cosas que puedo mejorar. Usted decide cuáles.',
      botonRevisar: 'Revisar otra vez',
      recomendaciones: [
        {
          titulo: 'Reiniciar el ordenador',
          texto:
            'Lleva 12 días encendido y Windows espera un reinicio para terminar una actualización. Guarde lo que esté haciendo antes.',
          botones: [{ texto: 'Abrir Windows Update', principal: true }],
          destacada: true,
        },
        {
          titulo: 'Cerrar Chrome',
          texto: 'Usa 1,8 GB y la memoria va al 82 %. Lo que no esté guardado en Chrome se pierde.',
          botones: [{ texto: 'Cerrar Chrome', principal: false }],
          destacada: false,
        },
        {
          titulo: 'Que 3 programas no se abran solos',
          texto:
            'Spotify, Steam y Discord arrancan con Windows y lo hacen más lento al encender. Le abro la página donde se apagan con un clic.',
          botones: [{ texto: 'Abrir la página', principal: false }],
          destacada: false,
        },
        {
          titulo: 'Liberar 4,3 GB',
          texto: 'Papelera 1,1 GB y archivos temporales 3,2 GB. No se puede deshacer.',
          botones: [
            { texto: 'Vaciar papelera', principal: false },
            { texto: 'Borrar temporales', principal: false },
          ],
          destacada: false,
        },
      ],
      // porcentaje: null = sin barra.
      mediciones: [
        { nombre: 'Procesador', valor: '23 %', estado: 'bien', porcentaje: 23 },
        { nombre: 'Memoria', valor: '82 %', estado: 'atencion', porcentaje: 82 },
        { nombre: 'Disco', valor: '148 GB libres de 476', estado: 'bien', porcentaje: 69 },
        { nombre: 'Descargas antiguas', valor: '214 archivos de más de 3 meses', estado: 'informa', porcentaje: null },
        { nombre: 'Internet', valor: 'Wi-Fi · 38 ms', estado: 'bien', porcentaje: null },
        { nombre: 'Hora del equipo', valor: 'Correcta', estado: 'bien', porcentaje: null },
        { nombre: 'Sin reiniciar', valor: '12 días', estado: 'atencion', porcentaje: null },
        { nombre: 'Batería', valor: '86 %, enchufado', estado: 'bien', porcentaje: 86 },
      ] as { nombre: string; valor: string; estado: EstadoMedicion; porcentaje: number | null }[],
      historial: [
        { cuando: 'Hoy, 10:34', frase: 'Vacié la papelera.' },
        { cuando: 'Hoy, 10:32', frase: 'Revisé su ordenador entero.' },
        { cuando: 'Ayer, 18:02', frase: 'Usted dijo que no a borrar los archivos temporales de más de un día.' },
      ],
      nunca:
        'Sus documentos ni sus nombres, sus correos, sus contraseñas ni lo que visita en internet. Solo miro nombres de programas, tamaños y estados.',
      nunca2: 'Cada botón pide permiso antes de hacer nada.',
      pie: 'La página Mi ordenador, con una revisión de ejemplo.',
    },
  },

  // ---------------------------------------------------------- Ya en la demo
  ya: {
    estado: 'Ya en la demo',
    titulo: 'Koda ya ve, lee y te lo cuenta.',
    intro: 'Esto puedes probarlo hoy mismo en la demo.',

    camara: {
      titulo: 'Mira a través de la cámara',
      texto:
        'Dile «Koda, abre la cámara» y se abre un visor con la imagen en directo, para que coloques bien lo que quieres enseñarle. Cuando preguntas «¿qué tengo en la mano?» o «¿qué pone aquí?», saca una foto y te lo cuenta. Después te pregunta si quieres saber algo más: qué es, dónde conseguirlo, qué dice la etiqueta.',
      detalles: [
        'Mientras la cámara está encendida, un piloto rojo junto al orbe lo avisa.',
        'No graba vídeo: saca una sola foto por pregunta.',
        'Tú decides cuántas veces al día puede mirar.',
      ],
      ventana: 'Cámara de Koda',
      koda: 'Es una taza de cerámica azul, con el asa algo desconchada. ¿Quiere saber algo más de ella?',
    },

    pantalla: {
      titulo: 'Lee tu pantalla',
      texto:
        '«Koda, mira mi pantalla» o «¿qué error es este?». Koda hace una captura de toda la pantalla en ese momento y te explica lo que ve: un mensaje de error, una ventana que no entiendes, un formulario a medio rellenar. Luego te pregunta si quieres que mire algún detalle.',
      detalles: [
        'Una captura cada vez que se lo pides: no mira de continuo ni graba.',
        'Comparte con la cámara el mismo límite de veces al día.',
      ],
      aviso: {
        programa: 'Microsoft Excel',
        texto: 'No hay espacio suficiente en el disco para guardar «Presupuesto.xlsx».',
        boton: 'Aceptar',
      },
      koda: 'Es un aviso de Excel: el disco está casi lleno y el archivo no cabe. Si quiere, le digo qué ocupa más espacio.',
    },

    documentos: {
      titulo: 'Te lee documentos en voz alta',
      texto:
        'Entrégale un PDF o un archivo de texto con el clip del chat. Koda lo lee y te lo cuenta en voz alta: un resumen, una parte concreta o la respuesta a lo que le preguntes.',
      detalles: [
        'Si es muy largo, te pregunta si prefieres un resumen o una parte concreta.',
        'Si el PDF es una imagen escaneada, te lo dice en vez de inventarse lo que pone.',
        'Documentos de hasta 10 MB.',
      ],
      archivo: { nombre: 'Manual de la lavadora.pdf', peso: '2,4 MB' },
      pregunta: '¿Cómo lavo la ropa de lana?',
      koda: 'Según el manual, con el programa Lana: en frío y a 600 revoluciones como mucho.',
    },

    otrasTitulo: 'Y además',
    otras: [
      { titulo: 'Te entiende en tu ordenador', texto: 'Lo que dices se convierte en texto en tu propio equipo. Tu voz no viaja a internet.' },
      { titulo: 'Se acuerda de ti', texto: 'Guarda lo que le cuentas y te lo enseña en la página Memoria. Lo cambias cuando quieras.' },
      { titulo: 'Tareas y recordatorios', texto: 'Se los dictas y te avisa a su hora, aunque esté dormida.' },
      { titulo: 'Busca en internet', texto: 'Solo si tú lo activas, y te dice de dónde ha sacado cada cosa.' },
      { titulo: 'Abre tus programas y pone música', texto: 'Solo los programas que tú autorizas en Mis apps.' },
      { titulo: 'Te trata como prefieras', texto: 'Por tu nombre, de señor o de señora. Y te felicita el día de tu cumpleaños.' },
    ],
  },

  // ---------------------------------------------------------- Más adelante
  despues: {
    estado: 'En diseño, más adelante',
    titulo: 'Lo que viene después.',
    intro: 'Todavía no están en Koda. Te contamos hacia dónde va.',

    estudio: {
      titulo: 'Modo estudio',
      texto:
        'Eliges tu nivel y tus asignaturas, y Koda te explica cada tema con una ficha: la idea clave, un ejemplo resuelto, los errores típicos y ejercicios para practicar. Las cuentas las resuelve con exactitud. Si pides un tema que no está, te lo prepara y te lo guarda para la próxima vez.',
      ficha: {
        ruta: 'Matemáticas · 2.º de Bachillerato',
        tema: 'Derivada de una función compuesta',
        pestanas: ['Idea clave', 'Ejemplo', 'Errores típicos', 'Practicar'],
        idea: 'Derivas la función de fuera, dejas la de dentro igual y multiplicas por la derivada de la de dentro.',
        ejemplo: '(3x + 1)² → 2 · (3x + 1) · 3 = 18x + 6',
      },
    },

    // Todavía sin definir: solo se anuncia, sin prometer funciones concretas.
    trabajo: {
      titulo: 'Modo trabajo',
      texto:
        'Un modo pensado para cuando trabajas con el ordenador al lado: Koda a mano para lo que necesites, sin interrumpirte mientras atiendes. Lo estamos preparando y pronto te contamos qué incluye.',
    },

    // El cliente nunca oye los nombres internos de los ayudantes de Koda.
    investiga: {
      titulo: 'Koda investiga por ti',
      texto:
        'Pídele que averigüe algo y Koda busca en varias fuentes, las contrasta y te lo resume, diciéndote de dónde sale cada dato. También te ayuda a redactar un correo o un texto a partir de lo que encuentra.',
    },
  },

  // ---------------------------------------------------------- Probar
  probar: {
    titulo: '¿Quieres probar Koda?',
    // {sistema} se cambia por el de src/data/demo.ts.
    texto: 'La demo es para {sistema}. Cuéntanos quién eres y para qué lo usarías, y te escribimos con el enlace.',
    boton: 'Pide probar la demo',
  },
};