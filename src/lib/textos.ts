/**
 * Lee contenido/textos.md, la única fuente de los textos de la web. Entiende su forma: títulos
 * (# y ##) y viñetas «- Etiqueta: valor». Si el archivo cambia de forma y no encuentra algo, la
 * build falla diciendo qué falta, en vez de inventarlo o dejar un hueco.
 */
import md from '../../contenido/textos.md?raw';

interface Seccion { titulo: string; vinetas: string[] }

const secciones: Seccion[] = [];
for (const linea of md.split('\n')) {
  const titulo = linea.match(/^#{1,2}\s+(.+)$/);
  if (titulo) secciones.push({ titulo: titulo[1].trim(), vinetas: [] });
  else if (linea.startsWith('- ') && secciones.length) secciones.at(-1)!.vinetas.push(linea.slice(2).trim());
}

export function falta(que: string): never {
  throw new Error(`contenido/textos.md: no encuentro ${que}`);
}

/** Sección cuyo título empieza por `titulo` (lo que va entre paréntesis es un añadido) */
export function seccion(titulo: string): Seccion {
  return secciones.find((s) => s.titulo === titulo || s.titulo.startsWith(`${titulo} (`)) ?? falta(`la sección «${titulo}»`);
}

/** Lo que va entre paréntesis en el título de una sección, p. ej. «fase oro» */
export const nota = (titulo: string) => seccion(titulo).titulo.match(/\(([^)]+)\)$/)?.[1] ?? null;

/** Viñetas «Etiqueta: valor» de una sección, como pares */
export const pares = (titulo: string) =>
  seccion(titulo).vinetas.map((v) => {
    const i = v.indexOf(': ');
    return i < 0 ? { etiqueta: v, valor: '' } : { etiqueta: v.slice(0, i), valor: v.slice(i + 2) };
  });

/** Valor de la viñeta «Etiqueta: …» */
export const campo = (titulo: string, etiqueta: string) =>
  pares(titulo).find((p) => p.etiqueta === etiqueta)?.valor ?? falta(`«${etiqueta}» en «${titulo}»`);

/** Viñeta que empieza por un texto (las que no tienen etiqueta, como «Desde la temporada…») */
export const vineta = (titulo: string, empieza: string) =>
  seccion(titulo).vinetas.find((v) => v.startsWith(empieza)) ?? falta(`la viñeta «${empieza}…» en «${titulo}»`);

/** Separa la marca [pendiente: …] del texto */
export function sinPendiente(texto: string) {
  const m = texto.match(/\s*\[pendiente(?::\s*([^\]]*))?\]/);
  return { texto: m ? texto.replace(m[0], '').trim() : texto, pendiente: m ? (m[1]?.trim() || 'pendiente') : null };
}

/** «a, b, c y d.» o «a, b, c, y d.» → ['a', 'b', 'c', 'd'] */
export function lista(texto: string) {
  const partes = sinPunto(texto).split(', ');
  const ultima = partes.pop()!;
  if (ultima.startsWith('y ')) return [...partes, ultima.slice(2)];
  const j = ultima.lastIndexOf(' y ');
  return j < 0 ? [...partes, ultima] : [...partes, ultima.slice(0, j), ultima.slice(j + 3)];
}

export const mayuscula = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
export const sinPunto = (s: string) => s.replace(/\.$/, '');
