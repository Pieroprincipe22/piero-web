
// src/data/kodaAssist.ts
// Contenido centralizado de la página de Koda Assist.
// Editar los textos aquí NO requiere tocar el diseño ni los componentes.

export interface CapacidadAssist {
  icono: string; // nombre de icono; lo mapeamos a un SVG en el componente
  titulo: string;
  descripcion: string;
}

export interface PublicoAssist {
  titulo: string;
  descripcion: string;
}

export interface KodaAssistData {
  seo: {
    title: string;
    description: string;
    canonical: string;
    ogImage: string;
  };
  hero: {
    badge: string;
    titulo: string;
    subtitulo: string;
  };
  capacidades: {
    titulo: string;
    items: CapacidadAssist[];
  };
  publico: {
    titulo: string;
    items: PublicoAssist[];
  };
  waitlist: {
    titulo: string;
    descripcion: string;
    placeholderEmail: string;
    textoBoton: string;
    consentimiento: string; // texto junto al checkbox RGPD
    mensajeExito: string;
    mensajeError: string;
    source: string; // etiqueta para distinguir estos leads en la tabla
  };
}

export const kodaAssist: KodaAssistData = {
  seo: {
    title: "Koda Assist — Tu asistente de voz inteligente | Koda Estudio",
    description:
      "Koda Assist es el asistente de voz configurable de Koda Estudio para tu negocio y tu día a día. Muy pronto. Apúntate a la lista de espera.",
    canonical: "https://kodaestudio.com/koda-assist",
    ogImage: "https://kodaestudio.com/og/koda-assist.png",
  },

  hero: {
    badge: "Próximamente",
    titulo: "Koda Assist",
    subtitulo:
      "Un asistente de voz inteligente que te escucha, te entiende y hace el trabajo por ti. Configurable para tu negocio o para tu día a día.",
  },

  capacidades: {
    titulo: "Qué podrás hacer",
    items: [
      {
        icono: "microfono",
        titulo: "Habla y listo",
        descripcion:
          "Controla tus aplicaciones, tu música, tu navegador y tus archivos solo con la voz.",
      },
      {
        icono: "conversacion",
        titulo: "Conversa de verdad",
        descripcion:
          "Le hablas con naturalidad y te responde al momento, con un trato cercano y directo. Sin comandos rígidos.",
      },
      {
        icono: "memoria",
        titulo: "Te recuerda",
        descripcion:
          "Guarda tus preferencias y tus tareas favoritas para adaptarse a cómo trabajas tú.",
      },
      {
        icono: "escudo",
        titulo: "Seguro por diseño",
        descripcion:
          "Antes de cualquier acción delicada te pide confirmación. Tú siempre tienes la última palabra.",
      },
    ],

  },

  publico: {
    titulo: "Pensado para ti",
    items: [
      {
        titulo: "Negocios",
        descripcion:
          "Automatiza tareas repetitivas y gana tiempo para lo que de verdad importa: tus clientes.",
      },
      {
        titulo: "Uso personal",
        descripcion:
          "Un asistente que te acompaña en el día a día y te quita de encima lo tedioso.",
      },
    ],
  },

  waitlist: {
    titulo: "Sé de los primeros en probarlo",
    descripcion:
      "Estamos dando los últimos pasos. Déjanos tu correo y te avisaremos en cuanto Koda Assist esté disponible.",
    placeholderEmail: "tu@correo.com",
    textoBoton: "Apuntarme a la lista",
    consentimiento:
      "Acepto la política de privacidad y que Koda Estudio use mi correo para avisarme sobre Koda Assist.",
    mensajeExito: "¡Listo! Te avisaremos en cuanto Koda Assist esté disponible.",
    mensajeError:
      "No hemos podido guardar tu correo. Inténtalo de nuevo en un momento.",
    source: "koda-assist-waitlist",
  },
};