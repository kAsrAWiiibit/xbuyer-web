/**
 * Torneos 2027 de Xbuyer Team Academy. Sacado de los PDF de la organización (contenido/torneos-2027/), con las
 * erratas corregidas («inagural» → «inaugural», «ofical», «entregra», días de la semana mal puestos). Para cambiar
 * un dato, cámbialo aquí: la sección «Torneos 2027» de /academy/, el menú y la página de cada torneo
 * (/academy/torneos/<slug>/) salen de este archivo.
 *
 * - Fechas en ISO (AAAA-MM-DD); el día de la semana se calcula, no se escribe.
 * - `formulario`: el enlace del Google Form de inscripción. Mientras sea pendiente(), el botón «Inscríbete» abre
 *   un email a la academia con el nombre del torneo en el asunto.
 * - Lo que no está confirmado va con pendiente(): en producción no se muestra.
 */
import { pendiente, type Dato } from '../lib/pendiente';

export type Formato = 'Fútbol 11' | 'Fútbol 8' | 'Fútbol 7';
export interface Categoria { codigo: string; nacimiento: string }
export interface GrupoCategorias { genero: 'Masculina' | 'Femenina'; formato: Formato; categorias: Categoria[] }
export interface Dia { fecha: string; actividades: string[] }
export interface Torneo {
  slug: string;
  nombre: string;
  /** Para distinguir dos ediciones del mismo torneo */
  edicion?: string;
  inicio: string;
  fin: string;
  lugar: string;
  /** En euros, por jugador */
  precio: number;
  /** Aclaración junto al precio */
  precioNota?: string;
  /** Archivo en src/fotos/torneos/ (null: solo el nombre) */
  logo: string | null;
  incluye: string[];
  categorias: Dato<GrupoCategorias[]>;
  programa: Dato<Dia[]>;
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

const correo = (que: string) => pendiente(`enlace del formulario de inscripción (${que})`) as Dato<string>;

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
    formulario: correo('Costa Daurada Cup, Semana Santa'),
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
    formulario: correo('1900 Cup'),
  },
  {
    slug: 'ite-football',
    nombre: 'ITE Football',
    inicio: '2027-03-25',
    fin: '2027-03-28',
    lugar: "Terres de l'Ebre",
    precio: 535,
    logo: 'ite-football.png',
    incluye: [
      'Inscripción al torneo', 'Seguro médico', 'Entrenadores titulados', '4 partidos garantizados', '4 días y 3 noches en albergue',
      'Régimen de pensión completa', 'Traslados a los campos de juego', '2 entrenamientos previos', 'Equipación oficial Adidas de juego y paseo',
    ],
    categorias: [
      { genero: 'Masculina', formato: 'Fútbol 11', categorias: [nacidos('B16', 2011), nacidos('B15', 2012), nacidos('B14', 2013), nacidos('B13', 2014)] },
      { genero: 'Femenina', formato: 'Fútbol 11', categorias: [nacidas('G16', 2011)] },
      f7Masculina,
      f7Femenina,
    ],
    programa: [
      { fecha: '2027-03-25', actividades: ['Llegada y recogida de documentos', 'Ceremonia de apertura del torneo'] },
      { fecha: '2027-03-26', actividades: ['Partidos de clasificación'] },
      { fecha: '2027-03-27', actividades: ['Fases eliminatorias'] },
      // En el PDF pone «Jueves, 25 de marzo»: es el domingo 28 (confirmado por la organización)
      { fecha: '2027-03-28', actividades: ['Fases eliminatorias', 'Finales', 'Entrega de medallas y trofeos', 'Recogida de los equipos'] },
    ],
    formulario: correo('ITE Football'),
  },
  {
    slug: 'copa-uniq-andorra',
    nombre: 'Copa UNIQ Andorra',
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
    formulario: correo('Copa UNIQ Andorra'),
  },
  {
    slug: 'madcup',
    nombre: 'MADCUP',
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
    formulario: correo('MADCUP'),
  },
  {
    // Sin PDF propio: datos del resumen de la organización. El programa del PDF tenía fechas de «marzo» y el acto
    // inaugural en el «RCDE Stadium»: no se publica hasta que lo confirmen.
    slug: 'villarreal-yellow-cup',
    nombre: 'Villarreal Yellow Cup',
    inicio: '2027-06-24',
    fin: '2027-06-27',
    lugar: 'Vila-real (Castellón)',
    precio: 655,
    logo: null,
    incluye: [
      'Inscripción al torneo', 'Seguro médico', 'Entrenadores titulados', '4 días y 3 noches en hotel', 'Visita al Estadio de la Cerámica',
      'Equipación oficial Adidas de juego y paseo',
    ],
    categorias: pendiente('categorías de la Villarreal Yellow Cup'),
    programa: pendiente('programa de la Villarreal Yellow Cup (el PDF tiene fechas de marzo) y lugar del acto inaugural'),
    formulario: correo('Villarreal Yellow Cup'),
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
    formulario: correo('Costa Daurada Cup, verano'),
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
    formulario: correo('Donosti Cup'),
  },
];

// Comprobaciones al construir: fechas en orden, programa dentro de las fechas del torneo, slugs únicos
for (const [i, t] of torneos.entries()) {
  if (t.fin < t.inicio) throw new Error(`torneos-2027: ${t.slug} acaba antes de empezar`);
  if (i > 0 && t.inicio < torneos[i - 1].inicio) throw new Error(`torneos-2027: ${t.slug} no va en orden de fechas`);
  if (Array.isArray(t.programa))
    for (const d of t.programa) if (d.fecha < t.inicio || d.fecha > t.fin) throw new Error(`torneos-2027: ${t.slug}, el día ${d.fecha} cae fuera del torneo`);
  if (torneos.findIndex((o) => o.slug === t.slug) !== i) throw new Error(`torneos-2027: slug repetido ${t.slug}`);
}

/** Logos con partes blancas: van sobre recuadro marino (también en el palmarés) */
export const LOGOS_OSCUROS = new Set(['madcup.png']);
