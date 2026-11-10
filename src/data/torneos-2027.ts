/**
 * Torneos 2027 de Xbuyer Team Academy. Sacado de los PDF de la organización (contenido/torneos-2027/), con las
 * erratas corregidas («inagural» → «inaugural», «ofical», «entregra», días de la semana mal puestos). Para cambiar
 * un dato, cámbialo aquí: la sección «Torneos 2027» de /academy/, el menú y la página de cada torneo
 * (/academy/torneos/<slug>/) salen de este archivo.
 *
 * - Fechas en ISO (AAAA-MM-DD); el día de la semana se calcula, no se escribe.
 * - `formulario`: el enlace del Google Form de inscripción (si fuera pendiente(), el botón abriría un email a la
 *   academia con el nombre del torneo en el asunto).
 * - Lo que no está confirmado va con pendiente(): en producción no se muestra.
 */
import { pendiente, type Dato } from '../lib/pendiente';

export type Formato = 'Fútbol 11' | 'Fútbol 8' | 'Fútbol 7';
export interface Categoria { codigo: string; nacimiento: string }
export interface GrupoCategorias { genero: 'Masculina' | 'Femenina'; formato: Formato; categorias: Dato<Categoria>[] }
export interface Dia { fecha: string; actividades: string[] }
export interface Torneo {
  slug: string;
  nombre: string;
  /** Para distinguir dos ediciones del mismo torneo */
  edicion?: string;
  inicio: string;
  fin: string;
  lugar: string;
  /** Texto de presentación del torneo (de la organización) */
  descripcion: string;
  /** En euros, por jugador (sin precio: no se muestra) */
  precio?: number;
  /** Aclaración junto al precio */
  precioNota?: string;
  /** Archivo en src/fotos/torneos/ (null: solo el nombre) */
  logo: string | null;
  incluye?: string[];
  categorias?: Dato<GrupoCategorias[]>;
  programa?: Dato<Dia[]>;
  /** Avisos del programa (dónde se juegan las finales…) */
  notas?: Dato<string>[];
  /** Una frase sobre el torneo, si la organización la ha dado */
  destacado?: string;
  formulario: Dato<string>;
}

/** Lo que incluyen todos los torneos */
export const incluyenTodos = ['Inscripción al torneo', 'Seguro médico', 'Entrenadores titulados', 'Equipación oficial Adidas de juego y paseo'];

// Categorías que se repiten de un torneo a otro
const nacidos = (codigo: string, anio: number, despues = false): Categoria => ({ codigo, nacimiento: `Nacidos en ${anio}${despues ? ' y después' : ''}` });
const nacidas = (codigo: string, anio: number): Categoria => ({ codigo, nacimiento: `Nacidas en ${anio} y después` });
const costaDaurada: GrupoCategorias[] = [
  { genero: 'Masculina', formato: 'Fútbol 11', categorias: [nacidos('B19', 2008, true), nacidos('B16', 2011), nacidos('B15', 2012), nacidos('B14', 2013), nacidos('B13', 2014)] },
  { genero: 'Femenina', formato: 'Fútbol 11', categorias: [nacidas('G20', 2007), nacidas('G17', 2010), nacidas('G16', 2011), nacidas('G14', 2013)] },
  { genero: 'Masculina', formato: 'Fútbol 7', categorias: [nacidos('B12', 2015), nacidos('B11', 2016), nacidos('B10', 2017), nacidos('B9', 2018)] },
  { genero: 'Femenina', formato: 'Fútbol 7', categorias: [nacidas('G14', 2013), nacidas('G12', 2015), nacidas('G10', 2017)] },
];
const f7Masculina = { genero: 'Masculina', formato: 'Fútbol 7', categorias: [nacidos('B12', 2015), nacidos('B11', 2016), nacidos('B10', 2017), nacidos('B9', 2018), nacidos('B8', 2019)] } as const satisfies GrupoCategorias;
const f7Femenina = { genero: 'Femenina', formato: 'Fútbol 7', categorias: [nacidas('G14', 2013), nacidas('G12', 2015)] } as const satisfies GrupoCategorias;


export const torneos: Torneo[] = [
  {
    slug: 'costa-daurada-cup-semana-santa',
    nombre: 'Costa Daurada Cup',
    edicion: 'Semana Santa',
    inicio: '2027-03-21',
    fin: '2027-03-25',
    lugar: 'Salou (Tarragona)',
    precio: 595,
    logo: 'costa-daurada-cup.png',
    incluye: [
      'Inscripción al torneo', 'Seguro médico', 'Entrenadores titulados', '4 partidos garantizados',
      '5 días y 4 noches en hotel de 3 o 4 estrellas', 'Régimen de pensión completa', 'Traslados a los campos de juego',
      '2 entrenamientos previos', 'Equipación oficial Adidas de juego y paseo',
    ],
    categorias: costaDaurada,
    programa: [
      { fecha: '2027-03-21', actividades: ['Llegada y recogida de documentos', 'Ceremonia de apertura del torneo'] },
      { fecha: '2027-03-22', actividades: ['Partidos de clasificación'] },
      { fecha: '2027-03-23', actividades: ['Partidos de clasificación'] },
      { fecha: '2027-03-24', actividades: ['Partidos de clasificación', 'Playoffs'] },
      { fecha: '2027-03-25', actividades: ['Playoffs y finales', 'Entrega de medallas y trofeos', 'Recogida de los equipos'] },
    ],
    notas: ['Finales en el Nàstic Stadium (G20, G17, B16 y B15) y en el Fútbol Salou Sports Center.'],
    descripcion:
      'Xbuyer Team Academy participará en la Costa Daurada Cup 2027, un torneo internacional de fútbol base que tendrá lugar en Salou del 21 al 25 de marzo. Nuestros jugadores representarán a la academia en una competición que reunirá equipos de diferentes lugares, disfrutando de unos días de fútbol, convivencia y grandes experiencias dentro y fuera del campo.',
    formulario: 'https://forms.gle/uoMMPqLdCUV3jzUL7',
  },
  {
    slug: '1900-cup',
    nombre: '1900 Cup',
    inicio: '2027-03-25',
    fin: '2027-03-28',
    lugar: 'Barcelona',
    precio: 295,
    precioNota: 'Sin alojamiento',
    logo: '1900-cup.png',
    incluye: [
      'Inscripción al torneo', 'Seguro médico', 'Entrenadores titulados', '5 partidos garantizados', '2 entrenamientos previos',
      'Acto inaugural en el RCDE Stadium', 'Equipación oficial Adidas de juego y paseo',
    ],
    categorias: [
      { genero: 'Masculina', formato: 'Fútbol 11', categorias: [nacidos('B15', 2012), nacidos('B14', 2013), nacidos('B13', 2014)] },
      f7Masculina,
    ],
    programa: [
      { fecha: '2027-03-25', actividades: ['Recogida de acreditaciones', 'Fase de grupos'] },
      { fecha: '2027-03-26', actividades: ['Fase de grupos', 'Ceremonia inaugural en el RCDE Stadium'] },
      { fecha: '2027-03-27', actividades: ['Fases finales'] },
      { fecha: '2027-03-28', actividades: ['Finales', 'Entrega de medallas y trofeos'] },
    ],
    descripcion:
      'Xbuyer Team Academy estará presente en la 1900 Cup 2027, un torneo internacional de fútbol base que se celebrará en Barcelona del 25 al 28 de marzo. Nuestros equipos competirán representando a la academia, compartiendo cuatro días de fútbol, convivencia y grandes experiencias junto a jugadores y equipos de diferentes procedencias.',
    formulario: 'https://forms.gle/vHLutm48MNVaUcs96',
  },
  {
    slug: 'copa-uniq-andorra',
    nombre: 'Copa UniQ Andorra',
    inicio: '2027-06-04',
    fin: '2027-06-06',
    lugar: 'Andorra',
    precio: 455,
    logo: 'copa-uniq-andorra.png',
    incluye: [
      'Inscripción al torneo', 'Seguro médico', 'Entrenadores titulados', '4 partidos garantizados', '3 días y 2 noches en hotel',
      'Régimen de pensión completa', 'Traslados a los campos de juego', '2 entrenamientos previos', 'Equipación oficial Adidas de juego y paseo',
    ],
    categorias: [f7Masculina, f7Femenina],
    programa: [
      { fecha: '2027-06-04', actividades: ['Llegada y recogida de documentos'] },
      { fecha: '2027-06-05', actividades: ['Fase de grupos', 'Fases eliminatorias'] },
      // En el PDF pone «Domingo, 06 de marzo»: es junio
      { fecha: '2027-06-06', actividades: ['Fases eliminatorias', 'Finales', 'Entrega de medallas y trofeos', 'Recogida de los equipos'] },
    ],
    descripcion:
      'Xbuyer Team Academy participará en la Copa UniQ Andorra 2027, un torneo internacional de fútbol base que se celebrará en Andorra del 4 al 6 de junio. Nuestros equipos representarán a la academia en esta competición, disfrutando de varios días de fútbol, convivencia y nuevas experiencias deportivas junto a equipos de diferentes procedencias.',
    formulario: 'https://forms.gle/SLBYqBJLgMjd8vW86',
  },
  {
    // Sin PDF: solo descripción, fechas, lugar e inscripción
    slug: 'mic7',
    nombre: 'MIC7',
    inicio: '2027-06-11',
    fin: '2027-06-13',
    lugar: 'Salou (Tarragona)',
    // Logo de MIC Sports, organizadora de la MIC7 (contenido/torneos-2027/logos/)
    logo: 'mic7.png',
    descripcion:
      'Xbuyer Team Academy participará en la MIC7 2027, un torneo internacional de fútbol base que se celebrará en Salou del 11 al 13 de junio. Nuestros equipos representarán a la academia en esta competición, compartiendo varios días de fútbol, convivencia y nuevas experiencias junto a equipos de diferentes lugares.',
    formulario: 'https://forms.gle/u7FKX72g4UdtrwXy8',
  },
  {
    slug: 'madcup',
    nombre: 'MadCup',
    inicio: '2027-06-18',
    fin: '2027-06-23',
    lugar: 'Madrid',
    precio: 895,
    logo: 'madcup.png',
    incluye: [
      'Inscripción al torneo', 'Seguro médico', 'Entrenadores titulados', '4 partidos garantizados', '6 días y 5 noches de alojamiento',
      'Régimen de pensión completa', 'Traslados a los campos de juego', 'Traslado de Barcelona a Madrid (ida)', 'Traslado de Madrid a Barcelona (vuelta)',
      '2 entrenamientos previos', 'Equipación oficial Adidas de juego y paseo', 'Acto inaugural',
    ],
    categorias: [
      { genero: 'Masculina', formato: 'Fútbol 11', categorias: [nacidos('B17', 2010), nacidos('B16', 2011), nacidos('B15', 2012), nacidos('B14', 2013), nacidos('B13', 2014)] },
      { genero: 'Femenina', formato: 'Fútbol 11', categorias: [nacidas('G19', 2008), nacidas('G16', 2011), nacidas('G14', 2013)] },
      { genero: 'Masculina', formato: 'Fútbol 7', categorias: [...f7Masculina.categorias, nacidos('B7', 2020)] },
      { genero: 'Femenina', formato: 'Fútbol 7', categorias: [nacidas('G14', 2013), nacidas('G12', 2015), nacidas('G10', 2017)] },
    ],
    programa: [
      { fecha: '2027-06-18', actividades: ['Llegada y recogida de documentos'] },
      { fecha: '2027-06-19', actividades: ['Fase de grupos'] },
      { fecha: '2027-06-20', actividades: ['Fase de grupos'] },
      { fecha: '2027-06-21', actividades: ['Fase de grupos', 'Acto inaugural'] },
      { fecha: '2027-06-22', actividades: ['Eliminatorias'] },
      { fecha: '2027-06-23', actividades: ['Finales', 'Entrega de trofeos'] },
    ],
    descripcion:
      'Xbuyer Team Academy participará en la MadCup 2027, uno de los torneos internacionales de fútbol base más destacados, que se celebrará en Madrid del 18 al 23 de junio. Nuestros equipos representarán a la academia en esta gran cita deportiva, compartiendo días de competición, convivencia y experiencias inolvidables junto a equipos de diferentes países.',
    formulario: 'https://forms.gle/3tufDNfK5hxWNwFz9',
  },
  {
    // Del PDF de la organización. Su programa tiene fechas de «marzo» y el acto inaugural sale en el «RCDE Stadium» (en el
    // programa, en el Estadio de la Cerámica): ni el programa ni el lugar del acto se publican hasta que lo confirmen.
    slug: 'yellow-cup',
    nombre: 'Yellow Cup',
    inicio: '2027-06-24',
    fin: '2027-06-27',
    lugar: 'Vila-real (Castellón)',
    precio: 655,
    // Lleva el escudo del Villarreal CF: la organización lo autoriza (10 de noviembre de 2026)
    logo: 'yellow-cup.png',
    incluye: [
      'Inscripción al torneo', 'Seguro médico', 'Entrenadores titulados', '4 partidos garantizados', '4 días y 3 noches en hotel',
      'Régimen de pensión completa', 'Visita al Estadio de la Cerámica', '2 entrenamientos previos', 'Acto inaugural',
      'Equipación oficial Adidas de juego y paseo',
    ],
    categorias: [
      { genero: 'Masculina', formato: 'Fútbol 11', categorias: [{ codigo: 'B16', nacimiento: 'Nacidos en 2011 y 2012' }, nacidos('B14', 2013), nacidos('B13', 2014)] },
      { genero: 'Femenina', formato: 'Fútbol 11', categorias: [{ codigo: 'G16', nacimiento: 'Nacidas en 2011 y 2012' }, { codigo: 'G14', nacimiento: 'Nacidas en 2013 y 2014' }] },
      { genero: 'Masculina', formato: 'Fútbol 7', categorias: [nacidos('B12', 2015), nacidos('B11', 2016), nacidos('B10', 2017), nacidos('B9', 2018), { codigo: 'B8', nacimiento: 'Nacidos en 2019 y 2020' }] },
      // En el PDF: «G13: Nacidas en 2016 y 2014» (se salta 2015)
      { genero: 'Femenina', formato: 'Fútbol 7', categorias: [pendiente('G13 de la Yellow Cup: el PDF dice «nacidas en 2016 y 2014»')] },
    ],
    programa: pendiente('programa de la Yellow Cup (el PDF tiene fechas de marzo) y lugar del acto inaugural'),
    descripcion:
      'Xbuyer Team Academy participará en la Yellow Cup 2027, un torneo internacional de fútbol base que se celebrará en Castellón del 24 al 27 de junio. Nuestros equipos representarán a la academia en esta competición, compartiendo varios días de fútbol, convivencia y grandes experiencias deportivas junto a equipos de diferentes procedencias.',
    formulario: 'https://forms.gle/KAHMwR89idPfYvzu9',
  },
  {
    slug: 'costa-daurada-cup-verano',
    nombre: 'Costa Daurada Cup',
    edicion: 'Verano',
    inicio: '2027-06-27',
    fin: '2027-06-30',
    lugar: 'Salou (Tarragona)',
    precio: 595,
    logo: 'costa-daurada-cup.png',
    incluye: [
      'Inscripción al torneo', 'Seguro médico', 'Entrenadores titulados', '4 partidos garantizados',
      '4 días y 3 noches en hotel de 3 o 4 estrellas', 'Régimen de pensión completa', 'Traslados a los campos de juego',
      '2 entrenamientos previos', 'Equipación oficial Adidas de juego y paseo',
    ],
    categorias: costaDaurada,
    programa: [
      { fecha: '2027-06-27', actividades: ['Llegada y recogida de documentos', 'Ceremonia de apertura del torneo'] },
      { fecha: '2027-06-28', actividades: ['Partidos de clasificación'] },
      { fecha: '2027-06-29', actividades: ['Partidos de clasificación', 'Playoffs'] },
      { fecha: '2027-06-30', actividades: ['Playoffs', 'Finales', 'Entrega de medallas y trofeos', 'Recogida de los equipos'] },
    ],
    descripcion:
      'Xbuyer Team Academy participará en la Costa Daurada Cup 2027, un torneo internacional de fútbol base que se celebrará en Salou del 27 al 30 de junio. Nuestros equipos representarán a la academia en esta competición, disfrutando de varios días de fútbol, convivencia y grandes experiencias deportivas junto a equipos de diferentes procedencias.',
    formulario: 'https://forms.gle/ZU4xpu93rvgSujdy9',
  },
  {
    slug: 'donosti-cup',
    nombre: 'Donosti Cup',
    inicio: '2027-07-05',
    fin: '2027-07-11',
    lugar: 'Donostia-San Sebastián',
    precio: 945,
    logo: 'donosti-cup.png',
    incluye: [
      'Inscripción al torneo', 'Seguro médico', 'Entrenadores titulados', '4 partidos garantizados', '7 días y 6 noches de alojamiento',
      'Régimen de pensión completa', 'Traslados a los campos de juego', 'Traslado de Barcelona a Donosti (ida)', 'Traslado de Donosti a Barcelona (vuelta)',
      '3 entrenamientos previos', 'Equipación oficial Adidas de juego y paseo', 'Acto inaugural',
    ],
    categorias: [
      { genero: 'Masculina', formato: 'Fútbol 11', categorias: [nacidos('B18', 2009, true), nacidos('B16', 2011), nacidos('B15', 2012), nacidos('B14', 2013), nacidos('B13', 2014)] },
      { genero: 'Femenina', formato: 'Fútbol 11', categorias: [nacidas('G18', 2009), nacidas('G16', 2011), nacidas('G14', 2013)] },
      { genero: 'Masculina', formato: 'Fútbol 8', categorias: [nacidos('B12', 2015), nacidos('B11', 2016), nacidos('B10', 2017), nacidos('B9', 2018)] },
      { genero: 'Femenina', formato: 'Fútbol 8', categorias: [nacidas('G12', 2015), nacidas('G10', 2017)] },
    ],
    programa: [
      { fecha: '2027-07-05', actividades: ['Llegada', 'Control de edad y entrega de acreditaciones'] },
      { fecha: '2027-07-06', actividades: ['Fase de grupos', 'Ceremonia de inauguración'] },
      { fecha: '2027-07-07', actividades: ['Fase de grupos'] },
      { fecha: '2027-07-08', actividades: ['Fase de grupos'] },
      { fecha: '2027-07-09', actividades: ['Eliminatorias'] },
      { fecha: '2027-07-10', actividades: ['Eliminatorias'] },
      { fecha: '2027-07-11', actividades: ['Finales', 'Recogida de jugadores'] },
    ],
    destacado: 'Desde 1992, 5.000 clubes y 80 países han participado en la Donosti Cup.',
    descripcion:
      'Xbuyer Team Academy participará en la Donosti Cup 2027, uno de los torneos internacionales de fútbol base más reconocidos, que se celebrará en Donostia-San Sebastián del 5 al 11 de julio. Nuestros equipos representarán a la academia en esta gran cita deportiva, disfrutando de una semana de competición, convivencia y experiencias inolvidables junto a equipos de diferentes países.',
    formulario: 'https://forms.gle/RnT3N1CGJN89hRni8',
  },
];

// Comprobaciones al construir: fechas en orden, programa dentro de las fechas del torneo, slugs únicos
for (const [i, t] of torneos.entries()) {
  if (t.fin < t.inicio) throw new Error(`torneos-2027: ${t.slug} acaba antes de empezar`);
  if (i > 0 && t.inicio < torneos[i - 1].inicio) throw new Error(`torneos-2027: ${t.slug} no va en orden de fechas`);
  if (t.programa && Array.isArray(t.programa))
    for (const d of t.programa) if (d.fecha < t.inicio || d.fecha > t.fin) throw new Error(`torneos-2027: ${t.slug}, el día ${d.fecha} cae fuera del torneo`);
  if (torneos.findIndex((o) => o.slug === t.slug) !== i) throw new Error(`torneos-2027: slug repetido ${t.slug}`);
}

/** Logos con partes blancas: van sobre recuadro marino (también en el palmarés) */
export const LOGOS_OSCUROS = new Set(['madcup.png']);
