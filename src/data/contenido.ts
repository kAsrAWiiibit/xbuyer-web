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

const PALMARES = 'Palmarés';
const DIFERENTE = 'Qué la hace diferente';
/** Viñetas del palmarés que no son torneos */
const NO_TORNEO = ['Titular', 'Texto'];

export const academy = {
  nombre: ACADEMY,
  /** Frase de la tarjeta de la portada (y descripción de /academy/) */
  frase: campo(ACADEMY, 'Frase de portada'),
  quienes: campo(ACADEMY, 'Quiénes somos'),
  desde: sinPunto(vineta(ACADEMY, 'Desde')),
  instagram: usuario(campo(ACADEMY, 'Instagram')),
  faseOro: nota(PALMARES),
  titularPalmares: sinPunto(campo(PALMARES, 'Titular')),
  textoPalmares: campo(PALMARES, 'Texto'),
  /** Palmarés de más a menos títulos; una participación va al final y no cuenta como título */
  palmares: pares(PALMARES)
    .filter(({ etiqueta }) => !NO_TORNEO.includes(etiqueta))
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
        /** Logo del torneo en src/fotos/torneos/ (por el nombre, sin lo que va entre paréntesis) */
        logo: `${slug(etiqueta.replace(/\s*\(.*\)$/, ''))}.png`,
        i,
      };
    })
    .sort((a, b) => b.titulos - a.titulos || a.i - b.i),
  /** «Nueva piel», 2026/2027: las piezas y los extras, en src/data/equipacion.ts */
  equipacion: {
    nombre: sinPunto(campo(EQUIPACION, 'Nombre')),
    temporada: nota(EQUIPACION) ?? falta('la temporada en el título de «Equipación (…)»'),
    patrocinadorTecnico: sinPunto(campo(EQUIPACION, 'Patrocinador técnico')),
    incluida: campo(EQUIPACION, 'Incluida'),
  },
};

// ── Xbuyer Cup ──────────────────────────────────────────────────────────────────────
export const cup = {
  nombre: CUP,
  frase: campo(CUP, 'Frase de portada'),
  /** «Los hermanos Buyer: la presencia de…» → título y texto */
  diferente: pares(DIFERENTE).map(({ etiqueta, valor }) => ({ titulo: etiqueta, texto: mayuscula(valor) })),
  incluye: lista(campo(CUP, 'Qué incluye la inscripción')).map(mayuscula),
  cifras: dato(campo(CUP, 'Cifras de ediciones anteriores')),
  instagram: usuario(campo(CUP, 'Instagram')),
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
    /** false mientras la app no esté en las tiendas: «En construcción», sin enlaces de descarga (AppEnConstruccion) */
    publicada: false,
    appStore: pendiente('enlace de App Store') as Dato<string>,
    googlePlay: pendiente('enlace de Google Play') as Dato<string>,
  },
};

export const general = {
  dominio: dato(campo('General', 'Dominio')),
};

// Comprobación: las secciones que la web usa existen
seccion(ACADEMY);
seccion(CUP);
seccion(EQUIPACION);
seccion(DIFERENTE);
