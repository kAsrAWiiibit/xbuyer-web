/**
 * Lo que la política de privacidad dice de la web, además de lo de la app (que viene de src/data/legal/legal.json y
 * se sobrescribe desde el proyecto de la app: por eso esto va aparte). Se pinta en /privacidad/, antes de «Contacto».
 */
import type { SeccionLegal } from '../lib/legal';

export const seccionesWeb: (SeccionLegal & { id: string })[] = [
  {
    id: 'inscripciones',
    title: 'Inscripciones y preinscripción desde la web',
    paragraphs: [
      'La preinscripción en Xbuyer Team Academy y las inscripciones a sus torneos (y, cuando se abran, a los de la Xbuyer Cup) se rellenan en esta web, pero se gestionan con Google Forms, un servicio de Google: al enviarlas, las respuestas van directamente al formulario de Google correspondiente y se guardan en él y en su hoja de cálculo de Google, a la que solo accede la organización.',
      'En las inscripciones a los torneos se piden los datos del jugador o jugadora que hacen falta para inscribirle: nombre completo, fecha de nacimiento, DNI, NIE o pasaporte, posición, talla de la ropa, categoría y dorsales, además de las alergias o intolerancias alimentarias (si las hay), el consentimiento de uso de imágenes y la aceptación de la política de cancelación y devoluciones. Solo se usan para gestionar la inscripción y la participación en el torneo.',
      'En la preinscripción se piden el correo electrónico, el nombre completo, la fecha de nacimiento, la categoría, la posición, el club y la división actuales, los torneos que interesan, un teléfono de contacto y, si se quiere, dudas o consultas. Solo se usan para contactar con la familia y explicarle categorías, torneos y próximos pasos.',
      'La web no guarda las respuestas. Para avisar si se envía dos veces la misma inscripción desde el mismo dispositivo, el navegador guarda solo una huella cifrada (SHA-256) del documento o del nombre y la fecha del envío; nunca el documento ni el nombre. Se borra al borrar los datos del sitio en el navegador.',
      'Google trata estos datos como proveedor de la organización, según su política de privacidad (policies.google.com/privacy). Para consultar, corregir o borrar una inscripción, escribe al email de contacto.',
    ],
  },
];
