/**
 * Entidad titular de la web (lo que piden Apple y la LSSI-CE). Solo se muestra en el pie y en las
 * páginas legales, nunca como título. Son los datos legales que dio la organización; no forman
 * parte de los textos de la web (contenido/textos.md).
 */
import { pendiente, type Dato } from '../lib/pendiente';

export const entidad = {
  nombre: 'Associació Esportiva Xbuyer 2026',
  nif: 'G27654011',
  direccion: 'C/ Rosa Luxemburgo, 11, 1º 3ª',
  ciudad: '08840 Viladecans (Barcelona)',
  email: 'aexbuyer2026@gmail.com',
  registro: pendiente('número de inscripción en el registro de asociaciones') as Dato<string>,
};
