/** Fotos de la web (src/data/fotos.json): qué hueco tiene foto y los créditos de las que se usan */
import fotos from '../data/fotos.json';

export interface Foto { archivo: string; alt: string; autor: string; origen?: string }
export type Hueco = keyof typeof fotos.huecos;

const huecos = fotos.huecos as Record<string, Foto | null>;
export const fotoDe = (hueco: string): Foto | null => huecos[hueco] ?? null;

const usadas = (lista?: string[]) =>
  (lista ? lista.map(fotoDe) : Object.values(huecos)).filter((f): f is Foto => f !== null);

/** «Eric Leiro (Xbuyer Cup Madrid 2025)», una vez por fotógrafo y evento, de los huecos dados */
export const creditos = (lista?: string[]) => [...new Set(usadas(lista).map((f) => `${f.autor}${f.origen ? ` (${f.origen})` : ''}`))];

/** «Eric Leiro»: solo los autores, para el pie de foto agrupado de una sección */
export const autores = (lista: string[]) => [...new Set(usadas(lista).map((f) => f.autor))];
