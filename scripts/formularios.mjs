/**
 * Lee los Google Forms de inscripción (los `formulario: '…'` de src/data/torneos-2027.ts y src/data/cup-ediciones.ts)
 * y guarda su estructura en src/data/formularios.json: preguntas, opciones, obligatorias y a dónde se envía. La web
 * pinta con eso el formulario integrado (src/components/FormularioInscripcion.astro). No envía nada a los formularios:
 * solo abre la página pública de cada uno, como un navegador.
 *
 *   npm run formularios               # vuelve a leerlos y reescribe el JSON
 *   npm run formularios -- --comprobar  # solo compara: falla si algún formulario ha cambiado desde la última lectura
 *
 * Modo de cada formulario:
 * - «propio»: nuestro diseño, que envía al Google Form. Solo si todo lo que tiene se puede reproducir tal cual.
 * - «marco»: el Google Form dentro de un marco. Si pide iniciar sesión con Google, sube archivos, tiene varias
 *   secciones o saltos según la respuesta, validaciones de respuesta, cuadrículas, o un tipo de pregunta desconocido.
 * Hay que volver a leerlos cada vez que la organización cambie una pregunta: si no, el formulario propio enviaría
 * respuestas que el Google Form ya no espera.
 */
import { readFile, writeFile } from 'node:fs/promises';

const RAIZ = new URL('../', import.meta.url);
const SALIDA = new URL('src/data/formularios.json', RAIZ);
const FUENTES = ['src/data/torneos-2027.ts', 'src/data/cup-ediciones.ts'];
const comprobar = process.argv.includes('--comprobar');

const TIPOS = { 0: 'texto', 1: 'parrafo', 2: 'radio', 3: 'desplegable', 4: 'casillas', 5: 'escala', 6: 'titulo', 7: 'cuadricula', 8: 'seccion', 9: 'fecha', 10: 'hora', 11: 'imagen', 12: 'video', 13: 'archivo' };

const enlacesDe = (html) => [...String(html ?? '').matchAll(/<a href="([^"]+)"[^>]*>(.*?)<\/a>/g)].map(([, href, texto]) => ({ texto: texto.replace(/<[^>]+>/g, ''), href: href.replace(/&amp;/g, '&') }));
const limpio = (t) => (t == null ? null : String(t).trim() || null);

async function leer(url) {
  const r = await fetch(url, { redirect: 'follow', headers: { 'user-agent': 'Mozilla/5.0', 'accept-language': 'es' } });
  if (!r.ok) throw new Error(`${url}: HTTP ${r.status}`);
  const final = r.url;
  const html = await r.text();
  const id = final.match(/\/forms\/d\/e\/([^/]+)\//)?.[1];
  const base = { url, accion: id ? `https://docs.google.com/forms/d/e/${id}/formResponse` : null, marco: id ? `https://docs.google.com/forms/d/e/${id}/viewform?embedded=true` : final };
  if (/accounts\.google\.com/.test(final) || !id) return { ...base, modo: 'marco', motivo: 'pide iniciar sesión con Google' };

  const m = html.match(/FB_PUBLIC_LOAD_DATA_ = (.*?);<\/script>/s);
  if (!m) return { ...base, modo: 'marco', motivo: 'no se ha podido leer su estructura' };
  const datos = JSON.parse(m[1]);
  const info = datos[1];
  const motivos = new Set();
  const campos = [];
  if (html.includes('name="emailAddress"')) campos.push({ tipo: 'email', entrada: 'emailAddress', titulo: 'Correo electrónico', obligatorio: true });

  for (const it of info[1] ?? []) {
    const tipo = TIPOS[it[3]] ?? `desconocido (${it[3]})`;
    const titulo = limpio(it[1]);
    const descripcion = limpio(it[2]);
    const enlaces = [...enlacesDe(it[11]?.[1]), ...enlacesDe(it[12]?.[1])];
    if (['cuadricula', 'archivo', 'seccion', 'imagen', 'video'].includes(tipo) || tipo.startsWith('desconocido')) {
      motivos.add({ cuadricula: 'tiene preguntas de cuadrícula', archivo: 'pide subir archivos', seccion: 'tiene varias secciones', imagen: 'lleva imágenes', video: 'lleva vídeos' }[tipo] ?? `tiene un tipo de pregunta ${tipo}`);
      continue;
    }
    if (tipo === 'titulo') {
      campos.push({ tipo, titulo, descripcion, enlaces });
      continue;
    }
    const q = it[4]?.[0];
    if (!q) continue;
    const opciones = (q[1] ?? []).filter((o) => !o[4]).map((o) => String(o[0]));
    const otro = (q[1] ?? []).some((o) => o[4]);
    if ((q[1] ?? []).some((o) => o[2])) motivos.add('salta a otra sección según la respuesta');
    if (q[4]?.length) motivos.add('tiene validaciones de respuesta');
    if (tipo === 'fecha' && JSON.stringify(q[7]) !== '[0,1]') motivos.add('tiene una fecha con hora o sin año');
    if (tipo === 'hora' && q[6]?.[0]) motivos.add('pide una duración');
    const campo = { tipo, entrada: `entry.${q[0]}`, titulo, descripcion, obligatorio: Boolean(q[2]) };
    if (enlaces.length) campo.enlaces = enlaces;
    if (['radio', 'casillas', 'desplegable'].includes(tipo)) Object.assign(campo, { opciones, otro });
    if (tipo === 'escala') Object.assign(campo, { opciones, extremos: [limpio(q[3]?.[0]), limpio(q[3]?.[1])] });
    campos.push(campo);
  }
  const titulo = limpio(info[8]) ?? limpio(datos[3]);
  const motivo = [...motivos].join(', ') || null;
  return motivo ? { ...base, titulo, modo: 'marco', motivo } : { ...base, titulo, modo: 'propio', campos };
}

const urls = new Set();
for (const f of FUENTES) {
  const texto = await readFile(new URL(f, RAIZ), 'utf8');
  for (const [, u] of texto.matchAll(/formulario:\s*'(https:\/\/[^']+)'/g)) urls.add(u);
}

const nuevo = {};
for (const url of [...urls].sort()) {
  nuevo[url] = await leer(url);
  const f = nuevo[url];
  console.log(`${f.modo === 'propio' ? 'propio' : 'MARCO '}  ${f.titulo ?? url}${f.motivo ? ` (${f.motivo})` : ` · ${f.campos.length} preguntas`}`);
}

if (comprobar) {
  const viejo = JSON.parse(await readFile(SALIDA, 'utf8').catch(() => '{}'));
  delete viejo._ayuda;
  const cambiados = [...new Set([...Object.keys(viejo), ...Object.keys(nuevo)])].filter((u) => JSON.stringify(viejo[u]) !== JSON.stringify(nuevo[u]));
  if (cambiados.length) {
    console.error(`\nHan cambiado (o faltan) ${cambiados.length} formularios:\n${cambiados.map((u) => `  ${u}`).join('\n')}\nEjecuta «npm run formularios» y revisa el cambio.`);
    process.exit(1);
  }
  console.log('\nLos formularios coinciden con src/data/formularios.json.');
} else {
  const ayuda = 'Generado con «npm run formularios» a partir de los Google Forms. No se edita a mano.';
  await writeFile(SALIDA, `${JSON.stringify({ _ayuda: ayuda, ...nuevo }, null, 2)}\n`);
  console.log(`\nEscrito src/data/formularios.json (${Object.keys(nuevo).length} formularios).`);
}
