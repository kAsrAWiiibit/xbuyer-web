/**
 * Los [pendiente] solo existen en desarrollo. En la build de producción el componente Pendiente y
 * los datos marcados con pendiente() no se muestran: cada cosa oculta se apunta en .pendientes.jsonl
 * (src/lib/pendiente.ts) y aquí se avisa de todas. Si aun así queda un "[pendiente" en el HTML, la
 * build falla. También escribe el CNAME cuando hay dominio (src/data/sitio.mjs).
 */
import { existsSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { DOMINIO } from '../src/data/sitio.mjs';
import { BORRADORES } from './borradores.mjs';

const REGISTRO = '.pendientes.jsonl';

const html = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? html(p) : p.endsWith('.html') ? [p] : [];
  });

export default function pendientes() {
  return {
    name: 'xbuyer:pendientes',
    hooks: {
      'astro:build:start': () => rmSync(REGISTRO, { force: true }),
      'astro:build:done': ({ dir, logger }) => {
        const out = fileURLToPath(dir);
        if (DOMINIO) writeFileSync(join(out, 'CNAME'), `${DOMINIO}\n`);
        else logger.warn('Sin dominio propio (src/data/sitio.mjs): no se escribe CNAME.');

        if (BORRADORES) return logger.info('Build de borradores: los [pendiente] se ven a propósito.');

        const ocultos = existsSync(REGISTRO)
          ? [...new Set(readFileSync(REGISTRO, 'utf8').trim().split('\n').filter(Boolean))].map((l) => JSON.parse(l))
          : [];
        rmSync(REGISTRO, { force: true });
        if (ocultos.length) {
          logger.warn(`Ocultado en producción por estar pendiente (${ocultos.length}):`);
          for (const o of ocultos.sort((a, b) => (a.pagina + a.donde).localeCompare(b.pagina + b.donde)))
            logger.warn(`  ${o.pagina}  ·  ${o.donde}${o.nota ? `  (${o.nota})` : ''}`);
        }

        const fugas = html(out).filter((f) => readFileSync(f, 'utf8').includes('[pendiente'));
        if (fugas.length) throw new Error(`Hay "[pendiente" visible en: ${fugas.map((f) => f.slice(out.length)).join(', ')}`);
      },
    },
  };
}
