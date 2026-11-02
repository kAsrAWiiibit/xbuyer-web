/**
 * Lo que aún no ha dado la organización se marca con pendiente('qué falta'). En desarrollo (y en
 * `npm run borradores`) se ve como [pendiente: …]; en producción no se muestra y se apunta para que
 * la build avise (integraciones/pendientes.mjs).
 */
import { appendFileSync } from 'node:fs';

export const MOSTRAR_PENDIENTES = import.meta.env.DEV || process.env.BORRADORES === '1';

export interface Pendiente {
  pendiente: string;
}
export type Dato<T> = T | Pendiente;

export const pendiente = (nota: string): Pendiente => ({ pendiente: nota });
export const esPendiente = (v: unknown): v is Pendiente => typeof v === 'object' && v !== null && 'pendiente' in v;
export const completo = <T>(v: Dato<T>): v is T => !esPendiente(v);

/** Apunta algo que no se ha mostrado en producción */
export function ocultado(pagina: string, donde: string, nota?: string) {
  if (!MOSTRAR_PENDIENTES) appendFileSync('.pendientes.jsonl', `${JSON.stringify({ pagina, donde, nota })}\n`);
}
