/**
 * Política de privacidad y ayuda de la app: los textos vienen tal cual del proyecto de la app
 * (`npm run paginas` o `npm run privacidad` allí escriben src/data/legal/legal.json). Aquí no se
 * edita ni se oculta nada: si falta un dato, la build falla.
 */
import legal from '../data/legal/legal.json';

export interface SeccionLegal { title: string; paragraphs: string[]; id?: string }

if (JSON.stringify(legal).includes('[pendiente')) {
  throw new Error('src/data/legal/legal.json tiene datos [pendiente]: complétalos en el proyecto de la app (privacy en config/tournaments/) y vuelve a generarlo.');
}

export const textosLegales = legal as {
  tournament: string;
  draft: string | null;
  contact: { controller: string; email: string; phone: string | null; instagram: string | null };
  privacy: { title: string; sections: SeccionLegal[] };
  support: { title: string; sections: SeccionLegal[] };
};
