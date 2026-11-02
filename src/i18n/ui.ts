/**
 * Textos de interfaz. Castellano completo; catalán e inglés se rellenan cuando la organización
 * pase las traducciones (lo que falte cae al castellano) y entonces se crean src/pages/ca/ y src/pages/en/.
 */
export const idiomas = { es: 'Castellano', ca: 'Català', en: 'English' } as const;
export type Idioma = keyof typeof idiomas;

const es = {
  'saltar': 'Saltar al contenido',
  'nav.inicio': 'Inicio',
  'nav.contacto': 'Contacto',
  'nav.quienes': 'Quiénes somos',
  'nav.palmares': 'Palmarés',
  'nav.torrent': 'Torrent',
  'nav.ediciones': 'Ediciones',
  // Frases propuestas para la portada y la cabecera de la academia (pendientes de aprobar)
  'academy.frase': 'La selección que compite en torneos de fútbol base y organiza la Xbuyer Cup.',
  'inicio.academy.boton': 'Conoce la academia',
  'inicio.cup.frase': 'El torneo de la academia. Próxima edición: {ciudad}, {fechas}.',
  'inicio.cup.boton': 'Ver la Xbuyer Cup',
  'academy.palmares.boton': 'Ver el palmarés',
  'academy.quienes': 'Quiénes somos',
  'academy.palmares': 'Palmarés',
  'academy.faseOro': 'Resultados en {fase}.',
  'cup.ver': 'Ver categorías y sedes',
  'cup.app': 'Descargar la app',
  'cup.faltan.uno': 'Falta 1 día',
  'cup.faltan.n': 'Faltan {n} días',
  'cup.hoy': 'Se juega hoy',
  'cup.edicion': 'Categorías y sedes',
  'cup.equipos': '{n} equipos.',
  'cup.categorias': 'Categorías',
  'cup.sedes': 'Sedes',
  'cup.comoLlegar': 'Cómo llegar',
  'cup.diferente': 'Qué la hace diferente',
  'cup.incluye': 'Qué incluye la inscripción',
  'cup.proximas': 'Próximas ediciones',
  'cup.anteriores': 'Ediciones anteriores',
  'cup.laApp': 'La app oficial',
  'cup.oficial': 'Patrocinador oficial',
  'contacto.titulo': 'Escríbenos',
  'contacto.tituloCup': '¿Quieres jugarla?',
  'contacto.texto': 'Al pulsar se abre tu correo con el mensaje listo para {email}.',
  'contacto.nombre': 'Tu nombre',
  'contacto.club': 'Club o equipo (opcional)',
  'contacto.telefono': 'Teléfono (opcional)',
  'contacto.mensaje': 'Tu mensaje',
  'contacto.enviar': 'Escribir el email',
  'contacto.planB': '¿No se ha abierto tu correo? Escríbenos a',
  'contacto.copiarEmail': 'Copiar email',
  'contacto.copiarMensaje': 'Copiar mensaje',
  'contacto.copiado': 'Copiado',
  'contacto.volver': 'Volver al formulario',
  'contacto.error': 'Escribe tu nombre y tu mensaje.',
  'pie.contacto': 'Contacto',
  'pie.instagram': 'Instagram',
  'pie.legal': 'Legal',
  'pie.avisoLegal': 'Aviso legal',
  'pie.privacidad': 'Privacidad',
  'pie.soporte': 'Ayuda de la app',
  'pie.fotos': 'Fotos',
};
export type Clave = keyof typeof es;

const ca: Partial<Record<Clave, string>> = {};
const en: Partial<Record<Clave, string>> = {};
const diccionarios = { es, ca, en };

export const t = (idioma: Idioma, clave: Clave, valores: Record<string, string | number> = {}) =>
  (diccionarios[idioma][clave] ?? es[clave]).replace(/\{(\w+)\}/g, (_, k) => String(valores[k] ?? ''));
