/**
 * Deja los logos de los torneos (src/fotos/torneos/) listos para ir sin recuadro, directamente sobre el fondo de la
 * página, y crea las versiones para fondo oscuro y para fondo amarillo de los que no se leerían en uno de los dos.
 *
 *   node scripts/logos-torneos.mjs
 *
 * 1. Limpia el borde: cada píxel semitransparente toma el color del píxel opaco más cercano del logo. Así no queda
 *    halo del fondo del que se recortó (la Yellow Cup traía un filo amarillo).
 * 2. Recorta lo transparente que sobra alrededor.
 * 3. Versiones (archivo `<logo>--oscuro.png` para tarjetas azules o marino; `<logo>--claro.png` para el amarillo).
 *    Se usan solo si existen (src/components/LogoTorneo.astro). Las reglas están en VERSIONES, abajo.
 *
 * Se puede repetir: las bases ya limpias no cambian y las versiones se rehacen desde la base.
 */
import { readdir } from 'node:fs/promises';
import sharp from 'sharp';

const DIR = new URL('../src/fotos/torneos/', import.meta.url);
const BLANCO = [255, 255, 255];
const MARINO = [0x0c, 0x04, 0x33];
const luz = (r, g, b) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

/**
 * Por logo y fondo: qué píxeles cambian de color. `cambia(r, g, b, x, y, w, h)` dice si un píxel opaco del logo se
 * pinta de `color`. `rellenaHuecos`: los huecos transparentes encerrados dentro del logo se rellenan de ese color.
 */
const VERSIONES = {
  // Logos de una tinta oscura: en blanco sobre fondo oscuro (como su versión en negativo)
  '1900-cup.png': { oscuro: { color: BLANCO, cambia: () => true } },
  'copa-uniq-andorra.png': { oscuro: { color: BLANCO, cambia: () => true } },
  'mic7.png': { oscuro: { color: BLANCO, cambia: () => true } },
  // Donosti: el balón se queda; el texto de debajo (nombre y lema) pasa a blanco
  'donosti-cup.png': { oscuro: { color: BLANCO, cambia: (r, g, b, x, y, w, h) => y > h * 0.7 } },
  // MadCup: «CUP» y el trofeo son blancos; sobre el amarillo, en marino
  'madcup.png': { claro: { color: MARINO, cambia: (r, g, b) => luz(r, g, b) > 200 } },
  // MedCup: «MED» va calado (se ve el fondo); sobre el amarillo, relleno de marino para que se lea
  'medcup.png': { claro: { color: MARINO, cambia: () => false, rellenaHuecos: true } },
};

async function leer(archivo) {
  const { data, info } = await sharp(new URL(archivo, DIR).pathname).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  return { data, w: info.width, h: info.height };
}
const guardar = ({ data, w, h }, archivo) =>
  sharp(data, { raw: { width: w, height: h, channels: 4 } }).png({ compressionLevel: 9 }).toFile(new URL(archivo, DIR).pathname);

/** El color de los píxeles semitransparentes, del opaco más cercano (búsqueda en anillos de hasta 4 px) */
function limpiaBorde({ data, w, h }) {
  const fuente = Buffer.from(data);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const p = (y * w + x) * 4;
    const a = fuente[p + 3];
    if (a === 0 || a >= 250) continue;
    buscar: for (let r = 1; r <= 4; r++) {
      for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) {
        if (Math.max(Math.abs(dx), Math.abs(dy)) !== r) continue;
        const xx = x + dx, yy = y + dy;
        if (xx < 0 || yy < 0 || xx >= w || yy >= h) continue;
        const q = (yy * w + xx) * 4;
        if (fuente[q + 3] >= 250) { data[p] = fuente[q]; data[p + 1] = fuente[q + 1]; data[p + 2] = fuente[q + 2]; break buscar; }
      }
    }
  }
}

/** Quita filas y columnas transparentes de los bordes */
function recorta(img) {
  const { data, w, h } = img;
  let x0 = w, y0 = h, x1 = -1, y1 = -1;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (data[(y * w + x) * 4 + 3] > 8) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
  if (x0 === 0 && y0 === 0 && x1 === w - 1 && y1 === h - 1) return img;
  const nw = x1 - x0 + 1, nh = y1 - y0 + 1, out = Buffer.alloc(nw * nh * 4);
  for (let y = 0; y < nh; y++) data.copy(out, y * nw * 4, ((y + y0) * w + x0) * 4, ((y + y0) * w + x1 + 1) * 4);
  return { data: out, w: nw, h: nh };
}

/** Huecos transparentes encerrados (no tocan el borde de la imagen por zonas transparentes) */
function huecos({ data, w, h }) {
  const fuera = new Uint8Array(w * h);
  const pila = [];
  for (let x = 0; x < w; x++) pila.push(x, (h - 1) * w + x);
  for (let y = 0; y < h; y++) pila.push(y * w, y * w + w - 1);
  while (pila.length) {
    const p = pila.pop();
    if (fuera[p] || data[p * 4 + 3] > 128) continue;
    fuera[p] = 1;
    const x = p % w, y = (p / w) | 0;
    if (x > 0) pila.push(p - 1);
    if (x < w - 1) pila.push(p + 1);
    if (y > 0) pila.push(p - w);
    if (y < h - 1) pila.push(p + w);
  }
  return (p) => !fuera[p] && data[p * 4 + 3] <= 128;
}

function version(base, { color, cambia, rellenaHuecos }) {
  const img = { ...base, data: Buffer.from(base.data) };
  const { data, w, h } = img;
  const esHueco = rellenaHuecos ? huecos(base) : () => false;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = y * w + x, p = i * 4;
    if (esHueco(i)) { data[p] = color[0]; data[p + 1] = color[1]; data[p + 2] = color[2]; data[p + 3] = 255; continue; }
    if (data[p + 3] && cambia(data[p], data[p + 1], data[p + 2], x, y, w, h)) { data[p] = color[0]; data[p + 1] = color[1]; data[p + 2] = color[2]; }
  }
  if (rellenaHuecos) limpiaBorde(img);
  return img;
}

const archivos = (await readdir(DIR)).filter((f) => f.endsWith('.png') && !f.includes('--'));
for (const archivo of archivos) {
  let base = await leer(archivo);
  limpiaBorde(base);
  base = recorta(base);
  await guardar(base, archivo);
  const v = VERSIONES[archivo] ?? {};
  for (const fondo of ['oscuro', 'claro']) {
    if (!v[fondo]) continue;
    await guardar(version(base, v[fondo]), archivo.replace('.png', `--${fondo}.png`));
  }
  console.log(`${archivo.padEnd(24)} ${base.w}×${base.h}${Object.keys(v).map((f) => ` + --${f}`).join('')}`);
}
