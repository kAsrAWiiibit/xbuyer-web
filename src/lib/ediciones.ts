/** Lo que comparten la página de la Cup, el menú y la página de cada edición */
import { ediciones, type Edicion } from '../data/cup-ediciones';
import { rango } from './fechas';
import { ruta } from './ruta';

export const rutaEdicion = (e: Edicion) => ruta(`/cup/${e.slug}/`);

/** El desplegable «Ediciones» de la cabecera de la Cup */
export const menuEdiciones = (actual?: string) => ({
  hijos: ediciones.map((e) => ({ href: rutaEdicion(e), texto: e.ciudad, detalle: `${rango(e.inicio, e.fin)} · ${e.localidad}`, actual: e.slug === actual })),
});
