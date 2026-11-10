/**
 * Recorta un logo o una prenda a PNG con fondo transparente, ajustado al contenido y sin metadatos.
 *
 *   node scripts/recortar-png.mjs alfa  <origen> <destino.png>   # la imagen ya trae transparencia (las de los PDF)
 *   node scripts/recortar-png.mjs fondo <origen> <destino.png>   # quita el fondo liso que toca los bordes
 *
 * «fondo» rellena desde los bordes los píxeles del color de la esquina: lo que está encerrado (el amarillo de dentro
 * del anillo de la Yellow Cup, por ejemplo) se queda. El borde se suaviza según lo que se parece al fondo.
 * Las imágenes de los PDF de contenido/torneos-2027/ se sacan con PyMuPDF (ver SNAPSHOT.md).
 */
import sharp from 'sharp';

const [modo, origen, destino] = process.argv.slice(2);
if (!['alfa', 'fondo'].includes(modo) || !origen || !destino) {
  console.error('Uso: node scripts/recortar-png.mjs <alfa|fondo> <origen> <destino.png>');
  process.exit(1);
}

let { data, info } = await sharp(origen).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
if (modo === 'fondo') {
  const { width: w, height: h } = info;
  const fondo = [data[0], data[1], data[2]];
  const distancia = (p) => Math.hypot(data[p * 4] - fondo[0], data[p * 4 + 1] - fondo[1], data[p * 4 + 2] - fondo[2]);
  const quitado = new Uint8Array(w * h);
  const pila = [];
  for (let x = 0; x < w; x++) pila.push(x, (h - 1) * w + x);
  for (let y = 0; y < h; y++) pila.push(y * w, y * w + w - 1);
  while (pila.length) {
    const p = pila.pop();
    if (quitado[p] || distancia(p) > 60) continue;
    quitado[p] = 1;
    data[p * 4 + 3] = 0;
    const x = p % w, y = (p / w) | 0;
    if (x > 0) pila.push(p - 1);
    if (x < w - 1) pila.push(p + 1);
    if (y > 0) pila.push(p - w);
    if (y < h - 1) pila.push(p + w);
  }
  // Borde suave: los píxeles junto al fondo quitado, más transparentes cuanto más se parecen al fondo
  for (let p = 0; p < w * h; p++) {
    if (quitado[p]) continue;
    const x = p % w, y = (p / w) | 0;
    const junto = (x > 0 && quitado[p - 1]) || (x < w - 1 && quitado[p + 1]) || (y > 0 && quitado[p - w]) || (y < h - 1 && quitado[p + w]);
    if (junto) data[p * 4 + 3] = Math.round(255 * Math.min(1, Math.max(0, (distancia(p) - 60) / 100)));
  }
}

// Ajustado al contenido, con un margen del 2 %
const png = await sharp(data, { raw: info }).png().toBuffer();
const recorte = await sharp(png).trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 10 }).toBuffer({ resolveWithObject: true });
const m = Math.round(Math.max(recorte.info.width, recorte.info.height) * 0.02);
await sharp(recorte.data)
  .extend({ top: m, bottom: m, left: m, right: m, background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9 })
  .toFile(destino);
const { width, height } = await sharp(destino).metadata();
console.log(`${destino}: ${width}×${height}`);
