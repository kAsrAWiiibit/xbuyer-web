/**
 * Formularios de inscripción integrados. Su estructura (preguntas, opciones, obligatorias, a dónde se envía) está en
 * src/data/formularios.json, que genera `npm run formularios` leyendo cada Google Form. Si un torneo tiene enlace de
 * formulario y el JSON no lo trae, la build falla: hay que volver a leerlos.
 */
import datos from '../data/formularios.json';
import { completo, type Dato } from './pendiente';

interface Enlace { texto: string; href: string }
interface Base { titulo: string | null; descripcion?: string | null; enlaces?: Enlace[] }
export type Campo =
  | (Base & { tipo: 'titulo' })
  | (Base & { tipo: 'texto' | 'parrafo' | 'fecha' | 'hora' | 'email'; entrada: string; obligatorio: boolean })
  | (Base & { tipo: 'radio' | 'casillas' | 'desplegable'; entrada: string; obligatorio: boolean; opciones: string[]; otro: boolean })
  | (Base & { tipo: 'escala'; entrada: string; obligatorio: boolean; opciones: string[]; extremos: [string | null, string | null] });

export interface Formulario {
  url: string;
  /** A dónde envía el formulario propio (formResponse del Google Form) */
  accion: string | null;
  /** El Google Form para el marco */
  marco: string;
  titulo?: string | null;
  modo: 'propio' | 'marco';
  /** Por qué va en marco */
  motivo?: string;
  campos?: Campo[];
}

const formularios = datos as unknown as Record<string, Formulario>;

/** El formulario integrado de un enlace de inscripción; null si aún no hay enlace (se queda el botón de email) */
export function formularioDe(url: Dato<string> | undefined): Formulario | null {
  if (!url || !completo(url)) return null;
  const f = formularios[url];
  if (!f) throw new Error(`src/data/formularios.json no tiene el formulario ${url}. Ejecuta «npm run formularios».`);
  return f;
}
