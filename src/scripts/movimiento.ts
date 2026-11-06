/**
 * Movimiento de toda la web, en un solo módulo pequeño y sin librerías. Cada parte se activa solo donde
 * tiene sentido:
 *
 * - Entradas al asomar (siempre que haya IntersectionObserver): las partes de cada sección aparecen una
 *   vez, en orden. Con «Reducir movimiento», solo fundido; sin JavaScript, todo está quieto y a la vista.
 * - Con movimiento: los títulos de sección suben palabra a palabra y las fotos se revelan con el corte
 *   diagonal de la X.
 * - Con ratón y movimiento: cursor propio (un balón pequeño y un aro), fotos y torneos que se inclinan
 *   hacia el puntero con un brillo, y botones con imán.
 * - Con pantalla táctil y movimiento: la foto o el torneo se inclina un poco hacia el dedo al tocar.
 *
 * Nada de esto cambia el contenido ni hace falta para usar la web, y nada toca el scroll: la rueda y el
 * dedo van como siempre. Solo se escriben transform, translate, opacity y variables de un único elemento.
 */

const html = document.documentElement;
const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;
const raton = matchMedia('(hover: hover) and (pointer: fine)').matches;
const conMovimiento = !reducido;

/** Interpolación hacia el objetivo: da a lo que sigue al puntero un poco de inercia, como un muelle */
const hacia = (a: number, b: number, f: number) => a + (b - a) * f;
const cerca = (a: number, b: number) => Math.abs(a - b) < 0.01;

// ── Entradas al asomar ────────────────────────────────────────────────────
function entradas() {
  if (!('IntersectionObserver' in window)) return;
  const secciones = document.querySelectorAll<HTMLElement>('main > section:not(:first-child)');
  const titulos = conMovimiento ? [...document.querySelectorAll<HTMLElement>('main > section:not(:first-child) :is(h2, .equipacion__titulo)')] : [];
  for (const t of titulos) palabras(t);

  // En la tira de Madrid del móvil las fotos llegan de lado: ahí no se revelan, para no parecer lentas
  const enTira = matchMedia('(max-width: 599px)').matches;
  const fotos = conMovimiento
    ? [...document.querySelectorAll<HTMLElement>('main > section:not(:first-child) .foto:has(img)')].filter((f) => !(enTira && f.closest('.anterior__fotos')))
    : [];
  for (const f of fotos) f.classList.add('foto--revela');

  const obs = new IntersectionObserver(
    (vistas) => {
      for (const v of vistas) {
        if (!v.isIntersecting) continue;
        const el = v.target as HTMLElement;
        obs.unobserve(el);
        if (el.classList.contains('foto--revela')) {
          // La foto se revela cuando ya está cargada; si tarda, a los 1,2 s se revela igual
          const img = el.querySelector('img');
          const revela = () => el.classList.add('foto--vista');
          if (!img || img.complete) revela();
          else {
            img.addEventListener('load', revela, { once: true });
            setTimeout(revela, 1200);
          }
        } else el.classList.add('visto');
      }
    },
    { rootMargin: '0px 0px -10% 0px' },
  );
  for (const s of secciones) {
    s.querySelectorAll<HTMLElement>(':scope > *').forEach((el, i) => el.style.setProperty('--i', String(Math.min(i, 4))));
    obs.observe(s);
  }
  // Marcas de las listas: giran al entrar, una detrás de otra
  document.querySelectorAll<HTMLElement>('main ul[role="list"] > li').forEach((li) => li.style.setProperty('--n', String([...li.parentElement!.children].indexOf(li))));
  for (const t of titulos) obs.observe(t);
  for (const f of fotos) obs.observe(f);
  html.classList.add('entradas');
}

/** Parte el texto de un título en palabras (cada una dentro de su máscara). Los lectores leen el mismo texto. */
function palabras(titulo: HTMLElement) {
  let n = 0;
  const recorre = (nodo: Node) => {
    for (const hijo of [...nodo.childNodes]) {
      if (hijo.nodeType === Node.TEXT_NODE) {
        const partes = (hijo.textContent ?? '').split(/(\s+)/);
        const trozo = document.createDocumentFragment();
        for (const p of partes) {
          if (!p) continue;
          if (/^\s+$/.test(p)) { trozo.append(p); continue; }
          const caja = document.createElement('span');
          caja.className = 'palabra';
          const dentro = document.createElement('span');
          dentro.textContent = p;
          dentro.style.setProperty('--p', String(n++));
          caja.append(dentro);
          trozo.append(caja);
        }
        hijo.replaceWith(trozo);
      } else if (hijo.nodeType === Node.ELEMENT_NODE && !(hijo as Element).classList.contains('solo-lector')) recorre(hijo);
    }
  };
  // El lector de pantalla lee el título entero, no palabra a palabra
  const texto = titulo.textContent?.replace(/\s+/g, ' ').trim();
  recorre(titulo);
  if (texto && !titulo.hasAttribute('aria-label')) {
    titulo.setAttribute('aria-label', texto);
    for (const caja of titulo.querySelectorAll('.palabra')) caja.setAttribute('aria-hidden', 'true');
  }
  titulo.classList.add('titulo-palabras');
}

// ── Inclinación 3D con brillo ─────────────────────────────────────────────
interface Inclinable { el: HTMLElement; brillos: HTMLElement[]; max: number; rx: number; ry: number; tx: number; ty: number; s: number; ts: number; activo: boolean }

function inclinacion() {
  if (!conMovimiento) return;
  const selector = [
    '.portada__foto',
    '.anterior__fotos > .foto',
    '.pieza__fotos',
    '.torneo',
  ].join(', ');
  // Los torneos solo con ratón: en táctil son una lista que se lee, no algo que se toca
  const elementos = [...document.querySelectorAll<HTMLElement>(selector)].filter((el) => raton || !el.matches('.torneo'));
  if (!elementos.length) return;
  const lista: Inclinable[] = elementos.map((el) => {
    el.classList.add('inclina');
    // El brillo va dentro de cada foto, recortado por su corte XB; los torneos no llevan brillo (cartel plano)
    const destinos = el.matches('.foto') ? [el] : [...el.querySelectorAll<HTMLElement>('.foto')];
    const brillos = destinos.map((d) => {
      const b = document.createElement('span');
      b.className = 'brillo';
      b.setAttribute('aria-hidden', 'true');
      d.append(b);
      return b;
    });
    // Grados como mucho: las fotos 3,5; los torneos, que son texto, 3 (más se desenfoca)
    return { el, brillos, max: el.matches('.torneo') ? 3 : 3.5, rx: 0, ry: 0, tx: 0, ty: 0, s: 1, ts: 1, activo: false };
  });

  let animando = false;
  const paso = () => {
    let seguir = false;
    for (const i of lista) {
      i.rx = hacia(i.rx, i.tx, 0.14);
      i.ry = hacia(i.ry, i.ty, 0.14);
      i.s = hacia(i.s, i.ts, 0.18);
      const quieto = cerca(i.rx, i.tx) && cerca(i.ry, i.ty) && cerca(i.s, i.ts);
      if (quieto && !i.activo && i.tx === 0 && i.ty === 0) {
        i.el.style.transform = '';
        continue;
      }
      i.el.style.transform = `perspective(900px) rotateX(${i.rx.toFixed(2)}deg) rotateY(${i.ry.toFixed(2)}deg) scale(${i.s.toFixed(4)})`;
      if (!quieto) seguir = true;
    }
    animando = seguir;
    if (seguir) requestAnimationFrame(paso);
  };
  const arranca = () => { if (!animando) { animando = true; requestAnimationFrame(paso); } };

  const apunta = (i: Inclinable, x: number, y: number, fuerza: number) => {
    const r = i.el.getBoundingClientRect();
    const px = Math.min(Math.max((x - r.left) / r.width, 0), 1);
    const py = Math.min(Math.max((y - r.top) / r.height, 0), 1);
    i.ty = (px - 0.5) * 2 * i.max * fuerza;
    i.tx = (0.5 - py) * 2 * i.max * fuerza;
    for (const b of i.brillos) {
      const rb = b.getBoundingClientRect();
      b.style.setProperty('--bx', `${(((x - rb.left) / rb.width) * 100).toFixed(1)}%`);
      b.style.setProperty('--by', `${(((y - rb.top) / rb.height) * 100).toFixed(1)}%`);
    }
    arranca();
  };
  const suelta = (i: Inclinable) => {
    i.activo = false; i.tx = 0; i.ty = 0; i.ts = 1;
    i.el.classList.remove('inclina--activa');
    arranca();
  };

  for (const i of lista) {
    if (raton) {
      i.el.addEventListener('pointerenter', (e) => {
        if (e.pointerType !== 'mouse') return;
        i.activo = true;
        i.el.classList.add('inclina--activa');
        apunta(i, e.clientX, e.clientY, 1);
      });
      i.el.addEventListener('pointermove', (e) => { if (i.activo && e.pointerType === 'mouse') apunta(i, e.clientX, e.clientY, 1); });
      i.el.addEventListener('pointerleave', () => suelta(i));
    }
    // Al tocar: se inclina un poco hacia el dedo y vuelve al soltar o al empezar a hacer scroll
    i.el.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'mouse') return;
      i.activo = true;
      i.el.classList.add('inclina--activa');
      apunta(i, e.clientX, e.clientY, 0.5);
    });
    const fin = (e: PointerEvent) => { if (e.pointerType !== 'mouse') suelta(i); };
    i.el.addEventListener('pointerup', fin);
    i.el.addEventListener('pointercancel', fin);
  }
}

// ── Botones con imán ──────────────────────────────────────────────────────
function imanes() {
  if (!conMovimiento || !raton) return;
  const els = [...document.querySelectorAll<HTMLElement>('.boton, .cabecera__otra, .cupon__enviar')];
  if (!els.length) return;
  const visibles = new Set<HTMLElement>();
  const io = new IntersectionObserver((vs) => { for (const v of vs) v.isIntersecting ? visibles.add(v.target as HTMLElement) : visibles.delete(v.target as HTMLElement); });
  const estado = new Map(els.map((el) => [el, { x: 0, y: 0, tx: 0, ty: 0 }]));
  for (const el of els) io.observe(el);
  let px = -1e4, py = -1e4, animando = false;
  const paso = () => {
    let seguir = false;
    for (const [el, s] of estado) {
      if (visibles.has(el)) {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        const dx = px - cx, dy = py - cy;
        const alcance = Math.max(r.width, r.height) / 2 + 40;
        const d = Math.hypot(dx, dy);
        const f = d < alcance ? 1 - d / alcance : 0;
        // Como mucho 4 px: el botón se acerca, no se escapa
        s.tx = Math.max(-4, Math.min(4, dx * 0.15 * f));
        s.ty = Math.max(-4, Math.min(4, dy * 0.15 * f));
      } else { s.tx = 0; s.ty = 0; }
      s.x = hacia(s.x, s.tx, 0.2);
      s.y = hacia(s.y, s.ty, 0.2);
      if (cerca(s.x, s.tx) && cerca(s.y, s.ty)) { s.x = s.tx; s.y = s.ty; }
      else seguir = true;
      el.style.translate = s.x || s.y ? `${s.x.toFixed(2)}px ${s.y.toFixed(2)}px` : '';
    }
    animando = seguir;
    if (seguir) requestAnimationFrame(paso);
  };
  addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    px = e.clientX; py = e.clientY;
    if (!animando && visibles.size) { animando = true; requestAnimationFrame(paso); }
  }, { passive: true });
  document.addEventListener('pointerleave', () => { px = py = -1e4; if (!animando) { animando = true; requestAnimationFrame(paso); } });
}

// ── Cursor: un balón pequeño que rueda y un aro que lo sigue ───────────────
function cursor() {
  // En las páginas legales se lee y se copia texto: ahí, el cursor del sistema
  if (!conMovimiento || !raton || document.querySelector('.legal')) return;
  const aro = document.createElement('div');
  aro.className = 'cursor';
  aro.setAttribute('aria-hidden', 'true');
  aro.innerHTML = '<svg class="cursor__mas" viewBox="0 0 24 24"><path d="M12 6v12M6 12h12"/></svg>';
  const balon = document.createElement('div');
  balon.className = 'cursor__balon';
  balon.setAttribute('aria-hidden', 'true');
  // Balón de 12 px: blanco con el pentágono central y cinco manchas, en marino
  balon.innerHTML = '<svg viewBox="-10 -10 20 20"><circle r="9.3" fill="#fff" stroke="#0c0433" stroke-width="1.4"/><path fill="#0c0433" d="M0-3.4 3.2-1.05 2 2.75-2 2.75-3.2-1.05Z"/><path fill="#0c0433" d="M-1.8-9.1 1.8-9.1 1.3-6.6-1.3-6.6ZM8.4-4 9.2-.6 7-.1 6.1-2.4ZM5.8 7.3 3 9 2.1 6.8 4.3 5.6ZM-5.8 7.3-3 9-2.1 6.8-4.3 5.6ZM-8.4-4-9.2-.6-7-.1-6.1-2.4Z"/></svg>';
  document.body.append(aro, balon);
  html.classList.add('cursor-xb');

  let x = innerWidth / 2, y = innerHeight / 2, ax = x, ay = y, giro = 0, animando = false, visto = false;
  const paso = () => {
    ax = hacia(ax, x, 0.22);
    ay = hacia(ay, y, 0.22);
    aro.style.transform = `translate3d(${ax.toFixed(1)}px, ${ay.toFixed(1)}px, 0)`;
    const sigue = !(cerca(ax, x) && cerca(ay, y));
    animando = sigue;
    if (sigue) requestAnimationFrame(paso);
  };
  addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    // Rueda lo que avanza: un balón de 12 px da una vuelta cada ~38 px
    giro += (e.clientX - x) * 9.5;
    x = e.clientX; y = e.clientY;
    balon.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${giro.toFixed(0)}deg)`;
    if (!visto) { visto = true; ax = x; ay = y; html.classList.add('cursor-visible'); }
    if (!animando) { animando = true; requestAnimationFrame(paso); }
  }, { passive: true });
  document.addEventListener('pointerleave', () => html.classList.remove('cursor-visible'));
  document.addEventListener('pointerenter', () => { if (visto) html.classList.add('cursor-visible'); });
  addEventListener('pointerdown', () => html.classList.add('cursor-pulsa'));
  addEventListener('pointerup', () => html.classList.remove('cursor-pulsa'));

  // Sobre qué está: enlace o botón (crece), foto que se amplía (crece con un +), campo de texto (cursor normal).
  // El color, el de acento del capítulo donde esté.
  const colores = new WeakMap<Element, [string, string]>();
  document.addEventListener('pointerover', (e) => {
    const el = e.target as Element;
    const ampliable = el.closest('[data-ampliable]');
    // En el contacto y el pie se escribe o se copia (email, dirección): cursor del sistema
    const escribe = el.closest('input, textarea, select, [contenteditable], .cupon, .pie');
    const enlace = !ampliable && !escribe && el.closest('a, button, [role="button"], label, summary');
    html.classList.toggle('cursor-enlace', !!enlace);
    html.classList.toggle('cursor-foto', !!ampliable);
    html.classList.toggle('cursor-texto', !!escribe);
    const capitulo = el.closest('[data-capitulo]') ?? html;
    let color = colores.get(capitulo);
    if (!color) {
      const estilo = getComputedStyle(capitulo);
      color = [estilo.getPropertyValue('--acento').trim() || '#1863b8', estilo.getPropertyValue('--sobre-acento').trim() || '#ffffff'];
      colores.set(capitulo, color);
    }
    aro.style.color = color[0];
    aro.style.setProperty('--sobre', color[1]);
  }, { passive: true });
}

entradas();
inclinacion();
imanes();
cursor();
