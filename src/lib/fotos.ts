/** Fotos de la web (src/data/fotos.json): qué hueco tiene foto y los créditos de las que se usan */
import fotos from '../data/fotos.json';

export interface Foto { archivo: string; alt: string; autor: string; origen?: string }
export type Hueco = keyof typeof fotos.huecos;

const huecos = fotos.huecos as Record<string, Foto | null>;
export const fotoDe = (hueco: string): Foto | null => huecos[hueco] ?? null;

/** «Eric Leiro (Xbuyer Cup Madrid 2025)», una vez por fotógrafo y evento */
export const creditos = () =>
  [...new Set(Object.values(huecos).filter((f): f is Foto => f !== null).map((f) => `${f.autor}${f.origen ? ` (${f.origen})` : ''}`))];
