/**
 * Contenido de la web, sacado de contenido/textos.md (src/lib/textos.ts). Aquí solo se le da forma:
 * ningún texto de contenido se escribe en este archivo. Lo marcado [pendiente] va con pendiente().
 */
import { pendiente, type Dato } from '../lib/pendiente';
import { campo, falta, lista, mayuscula, nota, pares, seccion, sinPendiente, sinPunto, vineta } from '../lib/textos';

export { entidad } from './entidad';

const ACADEMY = 'Xbuyer Team Academy';
const CUP = 'Xbuyer Cup';
const EQUIPACION = 'Equipación';

const usuario = (instagram: string) => instagram.replace(/^@/, '');
const dato = (texto: string): Dato<string> => {
  const { texto: limpio, pendiente: falta } = sinPendiente(texto);
  return falta ? pendiente(falta) : limpio;
};

// ── Fechas: «5, 6 y 7 de diciembre de 2026» o «junio de 2025» ────────────────────────────
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const FECHAS = /^((?:\d+(?:, | y ))*\d+ de )?(\w+) de (\d{4})/;

function fechas(texto: string) {
  const m = texto.match(FECHAS) ?? falta(`fechas en «${texto}»`);
  const mes = MESES.indexOf(m[2]) + 1 || falta(`el mes «${m[2]}»`);
  const dias = m[1] ? m[1].match(/\d+/g)!.map(Number) : [];
  const iso = (d: number) => `${m[3]}-${String(mes).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  return {
    texto: m[0],
    resto: texto.slice(m[0].length).replace(/^\s*\([^)]*\)/, '').replace(/^[,.]\s*/, '').trim(),
    /** «(desde el 28 de junio)» tras las fechas: una precisión que también se muestra */
    precision: texto.slice(m[0].length).match(/^\s*\(([^)]*)\)/)?.[1] ?? null,
    inicio: dias.length ? iso(dias[0]) : null,
    fin: dias.length ? iso(dias.at(-1)!) : null,
    orden: Number(m[3]) * 10000 + mes * 100 + (dias[0] ?? 1),
  };
}

/** «Barcelona (Sant Vicenç dels Horts)» → ciudad y lugar */
const lugar = (etiqueta: string) => {
  const m = etiqueta.match(/^(.+?)(?: \((.+)\))?$/)!;
  return { ciudad: m[1], lugar: m[2] ?? null };
};

// ── Xbuyer Team Academy ──────────────────────────────────────────────────────────────
const RESULTADO = /^(?:(\d+) veces campeones|(campeones)|(subcampeones)|(participación))$/i;
/** «2025, B12» o «2026»: el año y la categoría que figuran en el trofeo */
const ANIO_CATEGORIA = /^(\d{4})(?:, (.+))?$/;

const slug = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const academy = {
  nombre: ACADEMY,
  queEs: campo(ACADEMY, 'Qué es'),
  /** «No es una escuela…»: lo que va tras la primera frase de «Qué es» */
  noEsEscuela: campo(ACADEMY, 'Qué es').split(/(?<=\.)\s+/).slice(1).join(' ') || falta('la segunda frase de «Qué es»'),
  desde: sinPunto(vineta(ACADEMY, 'Desde')),
  filosofia: mayuscula(campo(ACADEMY, 'Filosofía')),
  instagram: usuario(campo(ACADEMY, 'Instagram')),
  faseOro: nota('Palmarés'),
  /** Palmarés de más a menos títulos; una participación va al final y no cuenta como título */
  palmares: pares('Palmarés')
    .map(({ etiqueta, valor }, i) => {
      // «15 veces campeones. 2025, B12. [pendiente: …]»: resultado, y luego año y categoría
      const { texto, pendiente: faltaDetalle } = sinPendiente(valor);
      const [resultado, ...resto] = sinPunto(texto).split(/\.\s+/);
      const m = resultado.match(RESULTADO) ?? falta(`un resultado reconocible para «${etiqueta}» (${valor})`);
      const d = resto.length ? (resto.join('. ').match(ANIO_CATEGORIA) ?? falta(`año y categoría («2025, B12») para «${etiqueta}» (${valor})`)) : null;
      const titulos = m[1] ? Number(m[1]) : m[2] ? 1 : m[3] ? 0.5 : 0;
      return {
        torneo: etiqueta,
        resultado: mayuscula(resultado),
        titulos,
        participacion: Boolean(m[4]),
        anio: d ? Number(d[1]) : null,
        categoria: d?.[2] ? mayuscula(d[2]) : null,
        /** Lo que falta de año y categoría (no se muestra en producción) */
        faltaDetalle: faltaDetalle ? pendiente(faltaDetalle) : null,
        hueco: `palmares-${slug(etiqueta)}`,
        i,
      };
    })
    .sort((a, b) => b.titulos - a.titulos || a.i - b.i),
  /** «Nueva piel», temporada 26/27: cada pieza tiene su hueco de foto (equipacion-jugador…) */
  equipacion: {
    nombre: sinPunto(campo(EQUIPACION, 'Nombre')),
    temporada: mayuscula(nota(EQUIPACION) ?? falta('la temporada en el título de «Equipación (…)»')),
    patrocinadorTecnico: sinPunto(campo(EQUIPACION, 'Patrocinador técnico')),
    piezas: lista(campo(EQUIPACION, 'Piezas')).map((pieza) => ({ nombre: mayuscula(pieza), hueco: `equipacion-${slug(pieza)}` })),
  },
};

// ── Xbuyer Cup ──────────────────────────────────────────────────────────────────────
const proximas = pares('Próximas ediciones').map(({ etiqueta, valor }) => {
  const { texto, pendiente: sede } = sinPendiente(valor);
  const f = fechas(texto);
  return { ...lugar(etiqueta), etiqueta, fechas: mayuscula(f.texto), inicio: f.inicio!, fin: f.fin!, detalle: f.resto, sede: sede ? pendiente(sede) : null };
});
const principal = proximas[0] ?? falta('la primera de «Próximas ediciones»');
const frases = principal.detalle.split(/\.\s+/).map(sinPunto);

/** «Benjamín y Alevín (fútbol 8), Infantil y Cadete (fútbol 11)» */
const formatos = [...(frases.find((f) => /\(fútbol \d+\)/.test(f)) ?? falta('las categorías de la edición principal')).matchAll(/(?:^|, )([^,(]+?) \((fútbol \d+)\)/g)].map(
  (m) => ({ nombre: mayuscula(m[2]), categorias: m[1].split(' y ') }),
);
const equipos = Number((principal.detalle.match(/(\d+) equipos/) ?? falta('el número de equipos de la edición principal'))[1]);
const sedes = (frases[0] ?? falta('las sedes de la edición principal')).split(' y ');

export const cup = {
  nombre: CUP,
  organiza: nota(CUP) ? mayuscula(nota(CUP)!) : null,
  diferente: lista(campo(CUP, 'Qué la hace diferente')).map(mayuscula),
  incluye: lista(campo(CUP, 'Qué incluye la inscripción')).map(mayuscula),
  cifras: dato(campo(CUP, 'Cifras de ediciones anteriores')),
  instagram: usuario(campo(CUP, 'Instagram')),
  /** La edición de la página: la primera de «Próximas ediciones» */
  edicion: {
    ...principal,
    sedes,
    formatos,
    equipos,
    tieneApp: /app oficial/i.test(principal.detalle),
  },
  proximas: proximas.slice(1),
  anteriores: pares('Ediciones anteriores')
    .map(({ etiqueta, valor }) => {
      const { texto } = sinPendiente(valor);
      const f = fechas(texto);
      const fotos = f.resto.match(/^Fotos: (.+)$/)?.[1] ?? null;
      const detalle = fotos ? null : f.resto ? mayuscula(sinPunto(f.resto)) : f.precision ? mayuscula(f.precision) : null;
      return { ...lugar(etiqueta), fechas: mayuscula(f.texto), detalle, fotografo: fotos ? sinPunto(fotos) : null, orden: f.orden };
    })
    .sort((a, b) => b.orden - a.orden),
  // Fuera de textos.md: lo pide la organización y aún no está
  app: {
    appStore: pendiente('enlace de App Store') as Dato<string>,
    googlePlay: pendiente('enlace de Google Play') as Dato<string>,
  },
  patrocinadorOficial: pendiente('patrocinador oficial') as Dato<string>,
};

export const general = {
  dominio: dato(campo('General', 'Dominio')),
};

// Comprobación: las secciones que la web usa existen
seccion(ACADEMY);
seccion(CUP);
seccion(EQUIPACION);
