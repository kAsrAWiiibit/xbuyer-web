# SNAPSHOT: arquitectura actual (11 de noviembre de 2026)

Web estática en **Astro** publicada en GitHub Pages: **https://xbuyerteamacademy.com** (repositorio público
`kAsrAWiiibit/xbuyer-web`; cada push a `main` despliega con `.github/workflows/desplegar.yml`). Reglas en
`CLAUDE.md`; pendientes en `BACKLOG.md`; comandos, contenido y fotos en `README.md`; producto en `PRODUCT.md`.

## Páginas

| Ruta | Qué es | Archivo |
| --- | --- | --- |
| `/` | Dos caminos (Academy amarillo, Cup azul), títulos con chute | `src/pages/index.astro` |
| `/academy/` | Portada con chute, quiénes somos, Torneos 2027 (8 tarjetas), palmarés (marcador + vitrina), «Nueva piel» con ropa opcional en desplegable, contacto | `src/pages/academy/index.astro` |
| `/academy/torneos/<slug>/` | Ficha de cada torneo 2027: precio, qué incluye, categorías, programa y **formulario de inscripción integrado** (`#inscripcion`) | `src/pages/academy/torneos/[torneo].astro` |
| `/academy/preinscripcion/` | Texto y botón al Google Form de preinscripción (enlace, no integrado) | `src/pages/academy/preinscripcion.astro` |
| `/cup/` | Portada con chute, qué la hace diferente, Torneos (Valencia, Madrid, Barcelona), ediciones anteriores, patrocinador, contacto | `src/pages/cup/index.astro` |
| `/cup/<ciudad>/` | Cada torneo de la Cup: inscripción (formulario integrado cuando haya enlace; si no, email), app, qué incluye, categorías, normativa, sede | `src/pages/cup/[edicion].astro` |
| `/privacidad/`, `/soporte/` | Textos de la app (`src/data/legal/legal.json`, los sube la app) + sección web «Inscripciones desde la web» | `src/pages/privacidad.astro`, `src/data/privacidad-web.ts` |
| `/aviso-legal/`, `/404` | Legal de la web y «Fuera de juego» | |
| `/prototipos/tunel/` | Prototipo del túnel; solo en desarrollo y borradores | `src/pages/prototipos/[nombre].astro` |

## Datos (nada escrito en las plantillas)

- Textos: `contenido/textos.md` (lo lee `src/lib/textos.ts`, le da forma `src/data/contenido.ts`). Interfaz: `src/i18n/ui.ts`.
- Torneos 2027: `src/data/torneos-2027.ts` (de los PDF de `contenido/torneos-2027/`, fuera de git). Logos en
  `src/fotos/torneos/*.png` (transparentes, recortados con `scripts/recortar-png.mjs`; `LOGOS_OSCUROS` van sobre marino).
- Torneos de la Cup: `src/data/cup-ediciones.ts`; normativa común `src/data/normativa.ts` (PDF en `public/normativa/`).
- Equipación y ropa opcional: `src/data/equipacion.ts` (prendas en `src/fotos/equipacion/*.png`, recortadas de los PDF).
- Patrocinador: `src/data/patrocinadores.ts`. Fechas: `src/lib/fechas.ts`. Fotos: `src/data/fotos.json`.
- Pendientes: `pendiente()` / `[pendiente: …]` → la build los oculta y los lista (`src/lib/pendiente.ts`); si uno
  llega al HTML, la build falla.

## Formularios de inscripción integrados

- `npm run formularios` (`scripts/formularios.mjs`) abre la página pública de cada Google Form enlazado en
  `formulario:` de `torneos-2027.ts` y `cup-ediciones.ts` y guarda su estructura en `src/data/formularios.json`
  (preguntas, opciones, obligatorias, `entry.*`, URL `formResponse`). No envía nada. `--comprobar` solo compara.
- Modo **propio** (nuestro diseño) si todo se puede reproducir; modo **marco** (iframe en un recuadro) si el form pide
  iniciar sesión, sube archivos, tiene secciones/saltos, validaciones, cuadrículas o tipos desconocidos.
- `src/components/FormularioInscripcion.astro`: pinta los campos, valida, envía con `fetch` `no-cors` al
  `formResponse` (fechas como `_year/_month/_day`), muestra «Inscripción enviada» o error, bloquea el botón al enviar,
  campo trampa para robots y aviso si el mismo dispositivo ya envió el mismo DNI/nombre a ese torneo (huella SHA-256
  en `localStorage`). Sin JavaScript, el form se envía directamente al Google Form en otra pestaña.
- `src/lib/formularios.ts`: `formularioDe(url)`; si hay enlace y el JSON no lo trae, la build falla.
- Estado: los 8 torneos 2027 en modo propio. Cup Madrid y Barcelona: bloque preparado; sin enlace todavía (email).

## Movimiento

`TituloChute.astro` (títulos de `/`, `/academy/`, `/cup/`; Web Animations API, solo transform, quieto con
«Reducir movimiento» o sin JS), `Marcador.astro`, `Campo.astro`, vitrina de trofeos (CSS), `Tunel.astro` (prototipo).

## Publicación

- `npm run build` → `dist/` (dominio de `src/data/sitio.mjs`, CNAME, sitemap, robots).
- DNS en Namecheap; `www`, `http` y github.io redirigen a `https://xbuyerteamacademy.com`.
- Las URL antiguas `kasrawiiibit.github.io/xbuyer-cup-privacidad/` y `/soporte/` redirigen (repositorio
  `xbuyer-cup-privacidad`). La app usa `/privacidad/` y `/soporte/`.
