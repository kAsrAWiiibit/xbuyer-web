/** Lo que comparten la sección «Torneos 2027», el menú y la página de cada torneo */
import { entidad } from '../data/entidad';
import { LOGOS_OSCUROS, torneos, type Torneo } from '../data/torneos-2027';
import { rango } from './fechas';
import { completo, ocultado, type Dato } from './pendiente';
import { ruta } from './ruta';

export const nombreCompleto = (t: Torneo) => (t.edicion ? `${t.nombre} · ${t.edicion}` : t.nombre);
export const rutaTorneo = (t: Torneo) => ruta(`/academy/torneos/${t.slug}/`);
export const fondoLogo = (logo: string | null) => (logo && LOGOS_OSCUROS.has(logo) ? 'marino' : 'blanco');

/** El desplegable «Torneos 2027» de la cabecera de la academia */
export const menuTorneos = (actual?: string) => ({
  hijos: torneos.map((t) => ({ href: rutaTorneo(t), texto: nombreCompleto(t), detalle: `${rango(t.inicio, t.fin, { anio: false })} · ${t.lugar}`, actual: t.slug === actual })),
});

/** El formulario de inscripción; mientras no esté, un email a la organización con el asunto dado (y se apunta) */
export function enlaceInscripcion(formulario: Dato<string>, asunto: string, pagina: string) {
  if (completo(formulario)) return formulario;
  ocultado(pagina, `inscripción: ${asunto}`, formulario.pendiente);
  return `mailto:${entidad.email}?subject=${encodeURIComponent(asunto)}`;
}
