# SNAPSHOT: arquitectura actual (12 de noviembre de 2026, noche)

Web estática en **Astro** publicada en GitHub Pages: **https://xbuyerteamacademy.com** (repositorio público
`kAsrAWiiibit/xbuyer-web`; cada push a `main` despliega con `.github/workflows/desplegar.yml`). Reglas en
`CLAUDE.md`; pendientes en `BACKLOG.md`; comandos, contenido y fotos en `README.md`; producto en `PRODUCT.md`.

## Páginas

| Ruta | Qué es | Archivo |
| --- | --- | --- |
| `/` | Dos caminos (Academy amarillo, Cup azul): logo grande y título con chute | `src/pages/index.astro` |
| `/academy/` | Portada con chute, quiénes somos, Torneos 2027 (8 tarjetas), palmarés (marcador + vitrina), «Nueva piel» con ropa opcional en desplegable, contacto | `src/pages/academy/index.astro` |
| `/academy/torneos/<slug>/` | Ficha de cada torneo 2027: logo grande, precio, qué incluye, categorías, programa y **formulario de inscripción integrado** (`#inscripcion`) | `src/pages/academy/torneos/[torneo].astro` |
| `/academy/preinscripcion/` | Texto de la organización y **formulario de preinscripción integrado** (`#formulario`) | `src/pages/academy/preinscripcion.astro` |
| `/cup/` | Portada con chute, qué la hace diferente, Torneos (Valencia, Madrid, Barcelona), ediciones anteriores, patrocinador, contacto | `src/pages/cup/index.astro` |
| `/cup/<ciudad>/` | Cada torneo de la Cup: logo de la Cup grande, inscripción (formulario integrado cuando haya enlace; si no, email), app («En construcción»), qué incluye, categorías, normativa, sede | `src/pages/cup/[edicion].astro` |
| `/privacidad/`, `/soporte/` | Textos de la app (`src/data/legal/legal.json`, los sube la app), con «En construcción» bajo el título mientras la app no esté publicada; privacidad + sección web «Inscripciones y preinscripción desde la web» | `src/pages/privacidad.astro`, `src/data/privacidad-web.ts` |
| `/aviso-legal/`, `/404` | Legal de la web y «Fuera de juego» | |
| `/prototipos/tunel/` | Prototipo del túnel; solo en desarrollo y borradores | `src/pages/prototipos/[nombre].astro` |

## Datos (nada escrito en las plantillas)

- Textos: `contenido/textos.md` (lo lee `src/lib/textos.ts`, le da forma `src/data/contenido.ts`). Interfaz: `src/i18n/ui.ts`.
- Torneos 2027: `src/data/torneos-2027.ts` (de los PDF de `contenido/torneos-2027/`, fuera de git).
- Logos de los torneos: `src/fotos/torneos/<logo>.png`, sin recuadro, directamente sobre el fondo
  (`LogoTorneo.astro`, prop `fondo: 'oscuro' | 'claro'`). Se recortan de los PDF con `scripts/recortar-png.mjs` y
  después se pasa `node scripts/logos-torneos.mjs`: limpia el borde (sin halo), ajusta el recorte y crea
  `<logo>--oscuro.png` (blanco: 1900, Copa UniQ, MIC7, texto de Donosti) y `<logo>--claro.png` (MadCup con lo
  blanco en marino, MedCup con «MED» relleno). Salen en las tarjetas de Torneos 2027 (azul, `oscuro`) y en la ficha
  de cada torneo (amarillo, `claro`; en el móvil al 46 % del ancho para que el texto siga siendo el LCP). El palmarés
  usa los trofeos y el menú solo texto.
- Ropa opcional (desplegable en `/academy/#equipacion`): las prendas sin fondo, directamente sobre el amarillo.
- App oficial: `cup.app` en `src/data/contenido.ts` (`publicada: false`, enlaces de tiendas pendientes). Mientras no
  esté publicada, `AppEnConstruccion.astro` («En construcción» + «Muy pronto en App Store y Google Play», sin enlaces)
  sale en «¿Qué hace diferente…?» (razones que mencionan la app), en el bloque `#app` de Valencia, bajo el título de
  `/soporte/` y `/privacidad/` (`Legal.astro` con `app`) y en el aviso legal.
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
- Prop `tipo: 'preinscripcion'`: los mensajes dicen «preinscripción». Pistas de teclado (email, teléfono, nombre) por
  el título de la pregunta, sin validar más que Google. Erratas del Google Form corregidas solo al mostrarlas
  (`CORRECCIONES`: «Lateral izquiero», «Correo electronico»).
- Estado: los 8 torneos 2027 y la preinscripción, en modo propio. Cup Madrid y Barcelona: bloque preparado; sin
  enlace todavía (email).

## Movimiento

`TituloChute.astro` (títulos de `/`, `/academy/`, `/cup/`; Web Animations API, solo transform, quieto con
«Reducir movimiento» o sin JS), vitrina de trofeos (flotan y giran, sin sombra), `Marcador.astro`, `Campo.astro`, vitrina de trofeos (CSS), `Tunel.astro` (prototipo).

## Publicación

- `npm run build` → `dist/` (dominio de `src/data/sitio.mjs`, CNAME, sitemap, robots).
- DNS en Namecheap; `www`, `http` y github.io redirigen a `https://xbuyerteamacademy.com`.
- Las URL antiguas `kasrawiiibit.github.io/xbuyer-cup-privacidad/` y `/soporte/` redirigen (repositorio
  `xbuyer-cup-privacidad`). La app usa `/privacidad/` y `/soporte/`.
