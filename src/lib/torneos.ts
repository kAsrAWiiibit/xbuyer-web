/** Lo que comparten la sección «Torneos 2027», el menú y la página de cada torneo */
import { entidad } from '../data/entidad';
import { torneos, type Torneo } from '../data/torneos-2027';
import { rango } from './fechas';
import { completo, ocultado, type Dato } from './pendiente';
import type { Clave } from '../i18n/ui';
import { ruta } from './ruta';

export const nombreCompleto = (t: Torneo) => (t.edicion ? `${t.nombre} · ${t.edicion}` : t.nombre);
export const rutaTorneo = (t: Torneo) => ruta(`/academy/torneos/${t.slug}/`);

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

/**
 * Apartados de la cabecera de la academia. En /academy/ son anclas; en las demás páginas de la academia, enlaces a
 * /academy/#…. `actual`: el torneo o la página en la que se está.
 */
export function menuAcademia(t: (clave: Clave) => string, { enPortada = false, actual }: { enPortada?: boolean; actual?: string } = {}) {
  const a = (ancla: string) => (enPortada ? ancla : ruta(`/academy/${ancla}`));
  return [
    { href: a('#quienes'), texto: t('nav.quienes') },
    { href: a('#torneos'), texto: t('nav.torneos'), ...menuTorneos(actual), todos: { href: a('#torneos'), texto: t('nav.verTodos') } },
    { href: ruta('/academy/preinscripcion/'), texto: t('nav.preinscripcion'), actual: actual === 'preinscripcion' },
    { href: a('#palmares'), texto: t('nav.palmares') },
    { href: a('#equipacion'), texto: t('nav.equipacion') },
    { href: a('#contacto'), texto: t('nav.contacto') },
  ];
}
