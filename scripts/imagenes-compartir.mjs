#!/usr/bin/env node
/**
 * Imágenes para compartir en redes (Open Graph, 1200 × 630) e iconos de la web, hechos con la marca.
 * Lee los textos de contenido/textos.md y src/i18n/ui.ts, los compone en HTML y los fotografía con
 * Chrome sin interfaz. Se ejecuta a mano cuando cambia la edición principal o la frase de la academia:
 *
 *   CHROME_PATH=/ruta/a/chrome node scripts/imagenes-compartir.mjs
 *
 * Escribe public/compartir/{inicio,academy,cup}.png y public/apple-touch-icon.png.
 */
import { readFileSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { Browser, sleep } from '../.claude/skills/design-taste-frontend/scripts/lib/cdp.mjs';

const raiz = resolve(import.meta.dirname, '..');
const textos = readFileSync(join(raiz, 'contenido/textos.md'), 'utf8');
const ui = readFileSync(join(raiz, 'src/i18n/ui.ts'), 'utf8');
const xb = readFileSync(join(raiz, 'src/components/Monograma.astro'), 'utf8').match(/ d="([^"]+)"/)[1];

// Edición principal: la primera de «Próximas ediciones» → «Torrent (Valencia): 5, 6 y 7 de diciembre de 2026.»
const [, ciudad, fechas] = textos.split('## Próximas ediciones')[1].match(/^- ([^(:]+?)(?: \([^)]*\))?: (.+? de \d{4})/m);
const fraseAcademy = ui.match(/'academy\.frase': '([^']+)'/)[1];
const fuente = (f) => pathToFileURL(join(raiz, 'node_modules/@fontsource', f)).href;

const base = `
  @font-face { font-family: 'BC'; font-weight: 700; src: url(${fuente('barlow-condensed/files/barlow-condensed-latin-700-normal.woff2')}); }
  @font-face { font-family: 'B'; font-weight: 500; src: url(${fuente('barlow/files/barlow-latin-500-normal.woff2')}); }
  * { margin: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; overflow: hidden; }
  body { font-family: 'B'; }
  h1, .d { font-family: 'BC'; font-weight: 700; text-transform: uppercase; line-height: 0.85; letter-spacing: -0.02em; }
  svg { display: block; }
`;
const logo = (color, ancho) => `<svg viewBox="66 206 870 586" width="${ancho}" fill="${color}"><path fill-rule="evenodd" d="${xb}"/></svg>`;

const tarjetas = {
  inicio: `<style>${base}
    body { display: grid; grid-template-columns: 1fr 1fr; }
    .m { padding: 64px 56px; display: flex; flex-direction: column; justify-content: space-between; }
    .a { background: #FFED00; color: #0C0433; } .c { background: #1863B8; color: #fff; }
    h1 { font-size: 132px; } .a h1 span { color: #1863B8; } .c h1 span { color: #0C0433; }
  </style>
  <div class="m a">${logo('#1863B8', 120)}<h1>Xbuyer Team<br><span>Academy</span></h1></div>
  <div class="m c">${logo('#0C0433', 120)}<h1>Xbuyer<br><span>Cup</span></h1></div>`,
  academy: `<style>${base}
    body { background: #FFED00; color: #0C0433; padding: 64px; display: grid; grid-template-columns: 1fr auto; align-items: end; }
    h1 { font-size: 168px; } h1 span { color: #1863B8; }
    p { margin-top: 28px; font-size: 34px; line-height: 1.25; max-width: 24ch; }
    .x { align-self: start; }
  </style>
  <div><h1>Xbuyer Team<br><span>Academy</span></h1><p>${fraseAcademy}</p></div><div class="x">${logo('#1863B8', 230)}</div>`,
  cup: `<style>${base}
    body { background: #1863B8; color: #fff; padding: 64px; display: grid; grid-template-columns: 1fr auto; align-items: end; }
    h1 { font-size: 220px; } h1 span { color: #0C0433; }
    .f { margin-top: 28px; font-size: 64px; color: #FFED00; line-height: 0.95; }
    .x { align-self: start; }
  </style>
  <div><h1>Xbuyer <span>Cup</span></h1><p class="d f">${fechas}<br>${ciudad}</p></div><div class="x">${logo('#FFED00', 230)}</div>`,
};

const icono = `<style>${base} html, body { width: 180px; height: 180px; background: #0C0433; display: grid; place-items: center; }</style>${logo('#FFED00', 148)}`;

const tmp = join(raiz, '.astro', 'compartir');
mkdirSync(tmp, { recursive: true });
mkdirSync(join(raiz, 'public/compartir'), { recursive: true });
const b = await Browser.launch();
const foto = async (html, ancho, alto, salida) => {
  const f = join(tmp, 'tarjeta.html');
  writeFileSync(f, `<!doctype html><meta charset="utf-8"><body>${html}</body>`);
  const p = await b.newPage({ width: ancho, height: alto });
  await p.goto(pathToFileURL(f).href, { settleMs: 600 });
  await p.eval('document.fonts.ready.then(() => true)');
  await sleep(200);
  await p.screenshot({ path: salida, format: 'png' });
  await p.close();
  console.log('✓', salida.slice(raiz.length + 1));
};
for (const [nombre, html] of Object.entries(tarjetas)) await foto(html, 1200, 630, join(raiz, 'public/compartir', `${nombre}.png`));
await foto(icono, 180, 180, join(raiz, 'public/apple-touch-icon.png'));
await b.close();
rmSync(tmp, { recursive: true, force: true });
process.exit(0);
