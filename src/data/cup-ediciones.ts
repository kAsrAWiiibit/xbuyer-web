/**
 * Ediciones de la Xbuyer Cup de esta temporada, sacadas de los carteles de la organización
 * (contenido/cup-ediciones/). Cada una tiene su página (/cup/<slug>/) y su tarjeta en /cup/; el menú de /cup/ las
 * lista. Para cambiar un dato, cámbialo aquí.
 *
 * - `inscripcion`: 'abierta' (botón de inscripción arriba) o 'cerrada' (aviso y, si tiene app, la app destacada).
 * - `formulario`: el enlace del Google Form de la edición. Mientras sea pendiente(), el botón abre un email a la
 *   organización con la edición en el asunto.
 * - Lo marcado con pendiente() no se muestra en producción (Infantil femenino, hasta que la organización lo confirme).
 */
import { pendiente, type Dato } from '../lib/pendiente';

export interface Formato { nombre: 'Fútbol 7' | 'Fútbol 8' | 'Fútbol 11'; categorias: Dato<string>[] }
export interface Edicion {
  slug: string;
  ciudad: string;
  localidad: string;
  sede: Dato<string>;
  inicio: string;
  fin: string;
  inscripcion: 'abierta' | 'cerrada';
  formulario: Dato<string>;
  formatos: Formato[];
  /** Equipos inscritos, si se sabe */
  equipos?: number;
  /** Tiene la app oficial del torneo (calendario, resultados y directo) */
  app?: boolean;
  /** «Con el apoyo de» */
  apoyo: string[];
  colaboradores: string[];
}

const infantilFemenino = pendiente('Infantil femenino (sin confirmar)');

export const ediciones: Edicion[] = [
  {
    slug: 'valencia',
    ciudad: 'Valencia',
    localidad: 'Torrent',
    sede: 'Campo de Fútbol Sant Gregori',
    inicio: '2026-12-05',
    fin: '2026-12-07',
    inscripcion: 'cerrada',
    formulario: pendiente('formulario de Valencia (inscripciones cerradas)'),
    formatos: [
      { nombre: 'Fútbol 8', categorias: ['Benjamín', 'Alevín', infantilFemenino] },
      { nombre: 'Fútbol 11', categorias: ['Infantil', 'Cadete'] },
    ],
    equipos: 60,
    app: true,
    apoyo: [],
    colaboradores: ['Ajuntament de Torrent', 'Sport Management'],
  },
  {
    slug: 'madrid',
    ciudad: 'Madrid',
    localidad: 'Paracuellos de Jarama',
    sede: 'Campo de Fútbol Paracuellos',
    inicio: '2027-01-02',
    fin: '2027-01-04',
    inscripcion: 'abierta',
    formulario: pendiente('enlace del formulario de inscripción de Madrid'),
    formatos: [
      { nombre: 'Fútbol 7', categorias: ['Benjamín', 'Alevín', infantilFemenino] },
      { nombre: 'Fútbol 11', categorias: ['Infantil', 'Cadete'] },
    ],
    apoyo: ['Ayuntamiento de Paracuellos de Jarama'],
    colaboradores: [],
  },
  {
    slug: 'barcelona',
    ciudad: 'Barcelona',
    localidad: 'Sant Vicenç dels Horts',
    sede: pendiente('campo de la edición de Barcelona'),
    inicio: '2027-02-06',
    fin: '2027-02-07',
    inscripcion: 'abierta',
    formulario: pendiente('enlace del formulario de inscripción de Barcelona'),
    formatos: [
      { nombre: 'Fútbol 7', categorias: ['Benjamín sub-9', 'Benjamín sub-10', 'Alevín sub-11', 'Alevín sub-12', infantilFemenino] },
      { nombre: 'Fútbol 11', categorias: ['Infantil sub-13', 'Infantil sub-14'] },
    ],
    apoyo: ["Ajuntament de Sant Vicenç dels Horts"],
    colaboradores: [],
  },
];
