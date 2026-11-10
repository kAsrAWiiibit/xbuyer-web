/**
 * Los [pendiente] solo existen en desarrollo. En la build de producción el componente Pendiente y
 * los datos marcados con pendiente() no se muestran: cada cosa oculta se apunta en .pendientes.jsonl
 * (src/lib/pendiente.ts) y aquí se avisa de todas. Si aun así queda un "[pendiente" en el HTML, la
 * build falla. También escribe el CNAME cuando hay dominio (src/data/sitio.mjs), el sitemap.xml
 * (todas las páginas menos la 404) y el robots.txt.
 */
import { existsSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { DOMINIO, VISTA_PREVIA } from '../src/data/sitio.mjs';
import { BORRADORES } from './borradores.mjs';

const REGISTRO = '.pendientes.jsonl';

const html = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? html(p) : p.endsWith('.html') ? [p] : [];
  });

/** sitemap.xml con las páginas publicadas y robots.txt que lo enlaza */
function sitemap(out, sitio, base) {
  if (!sitio) return;
  const raiz = new URL(base.endsWith('/') ? base : `${base}/`, sitio);
  const paginas = html(out)
    .map((f) => f.slice(out.length).replace(/^\//, '').replace(/index\.html$/, ''))
    .filter((p) => !p.endsWith('.html') && !p.startsWith('prototipos/'))
    .sort((a, b) => a.length - b.length || a.localeCompare(b));
  const urls = paginas.map((p) => `  <url><loc>${new URL(p, raiz).href}</loc></url>`).join('\n');
  writeFileSync(join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  writeFileSync(join(out, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap.xml', raiz).href}\n`);
}

export default function pendientes() {
  let sitio, base;
  return {
    name: 'xbuyer:pendientes',
    hooks: {
      'astro:config:done': ({ config }) => {
        sitio = config.site;
        base = config.base;
      },
      'astro:build:start': () => rmSync(REGISTRO, { force: true }),
      'astro:build:done': ({ dir, logger }) => {
        const out = fileURLToPath(dir);
        if (DOMINIO) writeFileSync(join(out, 'CNAME'), `${DOMINIO}\n`);
        else logger.warn('Sin dominio propio (src/data/sitio.mjs): no se escribe CNAME.');
        if (VISTA_PREVIA) {
          // Vista previa: nada de sitemap y robots.txt que cierra la puerta (cada página lleva noindex)
          writeFileSync(join(out, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
          writeFileSync(join(out, '.nojekyll'), '');
        } else if (!BORRADORES) sitemap(out, sitio, base);

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
