# Web de Xbuyer Team Academy

Web estática en Astro para GitHub Pages: **Xbuyer Team Academy** (una selección de fútbol base que
se forma para cada torneo, no una escuela) y la **Xbuyer Cup**, el torneo que organiza.
Detalle de producto en `PRODUCT.md`; comandos, contenido y fotos en `README.md`.

- Portada (`/`): dos caminos, Academy en amarillo y Cup en azul.
- `/academy/`: quiénes somos, palmarés, contacto.
- `/cup/`: edición de Torrent (5-7 de diciembre de 2026), qué la hace diferente, qué incluye la
  inscripción, próximas ediciones (Madrid y Barcelona), ediciones anteriores, contacto.
- Legales: `/aviso-legal/`, `/privacidad/`, `/soporte/`.

Dirección visual «cartel plano y ruidoso» (`.taste-skill/direction.json`, fuera de git): colores
planos (azul #1863B8, amarillo #FFED00, marino #0C0433), Barlow Condensed 700 + Barlow, corte
diagonal XB. Skills del proyecto: `design-taste-frontend`, `impeccable`, `emil-design-eng`.

## Reglas

- **Ningún `[pendiente]` visible en producción.** Todo texto sale de `contenido/textos.md`; lo que
  falta se marca `[pendiente: …]` y `npm run build` lo oculta y lo lista. Si llega al HTML, la build
  falla. Nada se inventa: si un dato no está, se marca pendiente.
- **Fotos con crédito visible** (`autor` y `alt` obligatorios en `src/data/fotos.json`), sin
  metadatos y a 2400px como máximo. **Sin primeros planos de niños reconocibles sin autorización**:
  esas van a `contenido/fotos/revisar/` y no se publican. Nunca fotos de bancos de imágenes.
- **El nombre de la asociación** (Associació Esportiva Xbuyer 2026) **solo en el pie y en las
  páginas legales**, nunca como título.
- **Solo castellano de momento.** `/ca/` y `/en/` están declarados, pero no se publica ninguna
  traducción hasta que la organización la pase.
- `contenido/fotos/` está fuera de git (el repositorio será público). Las fotos que se publican se
  copian optimizadas a `src/fotos/`.
- Movimiento: siempre con alternativa para `prefers-reduced-motion`, sin bloquear el hilo principal
  ni penalizar el LCP; nada de librerías pesadas en páginas que no las necesitan.
- No crear el repositorio de GitHub ni publicar hasta que se pida.

## Estado de los encargos

- [x] **a) Contenido real.** `contenido/textos.md` con la academia como selección, palmarés, ediciones
  de la Cup y qué incluye la inscripción; `/academy/` y `/cup/` adaptadas.
- [x] **b) Palmarés y equipación.** Año y categoría de cada título en `textos.md`, sacados de las
  placas de `contenido/fotos/palmares/` (lo que no figura queda `[pendiente]`). Sección «Nueva piel»
  en `/academy/#equipacion`: jugador, portero (con espalda) y paseo, de
  `contenido/fotos/equipacion/` recortadas sin el rótulo impreso; Adidas solo en texto. Crédito
  provisional «Xbuyer Team Academy» hasta que la organización confirme la autoría.
  **`IMG_2696` («New technical partner») no se usa**: pone «XBUYER TEAM» y lleva la corona, que son
  del equipo de la Kings League, no de la academia. Fuera hasta que la organización confirme que esa
  equipación es de la academia.
- [~] **c) Animaciones de fútbol.** Prototipo del túnel al campo en 3D en `/cup/` (enseñarlo antes de
  integrarlo), marcador en el palmarés y líneas del campo en SVG, con condiciones de rendimiento y
  movimiento reducido.
  - [~] Túnel: **prototipo con imágenes, pendiente de revisión.** `/prototipos/tunel/` (solo en
    desarrollo y borradores, nunca en producción), componente `src/components/Tunel.astro`. Zoom hacia
    la luz del túnel y fundido con el campo al hacer scroll (sección de 260svh con escenario fijo,
    scroll nativo, sin librerías; three.js se quitó). Rótulo visible desde el principio. Quieto (solo
    el campo; el túnel ni se descarga) con «Reducir movimiento», ahorro de datos, red 2G/3G, menos de
    4 GB o 4 núcleos, o sin JavaScript. Imágenes generadas con IA en `src/fotos/tunel/` (crédito
    «Imagen generada con IA» sobre la imagen), AVIF/WebP por tamaño y orientación. **Faltan las 9:16
    de verdad**: las de `-movil` son recortes provisionales de las 16:9 (528 px de ancho), centrados
    en la luz (x 572–1100). Originales en `contenido/fotos/` («Túnel iluminado hacia el estadio al
    anochecer.png», «Estadio vacío al atardecer.png»); no existe `contenido/fotos/tunel/`.
    Peso descargado: escritorio animado 134 KB (túnel 44 + campo 90), móvil animado 50 KB, quieto
    90 KB / 29 KB. Tiempos del recorrido en el script de `Tunel.astro` (zoom 0–0,7; destello
    0,3–0,8; fundido 0,47–0,62; el campo pasa de 1,6× a 1×; rótulo de 0,7× a 1× en 0,6–0,9).
    No integrado en `/cup/` todavía: falta decidir si sustituye a la portada de `/cup/` o va debajo.
    Historial: hubo una primera versión 3D con three.js (commit `33ab169`); se descartó por poco
    realista y se pasó a imágenes (`102a93b`).
  - [x] Marcador en el palmarés: `src/components/Marcador.astro` en `/academy/#palmares`. Títulos,
    subcampeonatos y torneos sumados de `textos.md` (21 · 1 · 7); los dígitos ruedan una vez al asomar.
    Quieto con «Reducir movimiento», ahorro de datos o sin JavaScript.
  - [x] Líneas del campo en SVG: `src/components/Campo.astro` (campo de 105 × 68 con medidas
    reglamentarias), detrás de las sedes en `/cup/#torrent` (en móvil, debajo). Se trazan una vez al
    asomar; mismas condiciones de movimiento reducido.

## Noche del 5 de noviembre de 2026 (trabajo autónomo; informe en `docs/informe-noche.md`)

- [x] Bloque 1: marcador y líneas del campo (arriba).
- [x] Bloque 2: crítica (impeccable, dos evaluaciones), pulido, revisión de animaciones, SEO
  (Open Graph de marca en `public/compartir/`, generado con `scripts/imagenes-compartir.mjs`;
  `apple-touch-icon.png`; sitemap.xml y robots.txt en la build; 404 «Fuera de juego»; canónicas con
  el dominio; datos estructurados SportsEvent en `/cup/`). Créditos de foto agrupados (sin rótulo
  sobre las fotos) y en el pie solo los de cada página. Apartados de la página visibles en móvil.
- [x] Bloque 3: revisión final a 360/768/1440 (lista de correcciones en el informe). Tramo de
  tableta (600–899 px) en `/cup/` y `/academy/`; fuentes precargadas (CLS 0).
- [x] Bloque 4: publicada en **https://xbuyerteamacademy.com** (repositorio público
  `kAsrAWiiibit/xbuyer-web`, Pages con Actions, dominio verificado, certificado aprobado y «Enforce
  HTTPS»; `www`, `http` y github.io redirigen con 301). Variable `SIN_DOMINIO=0`. Las URL antiguas
  `kasrawiiibit.github.io/xbuyer-cup-privacidad/` y `/soporte/` redirigen (meta refresh + canonical) a
  `/privacidad/` y `/soporte/`. En la app, `privacy.url` y `contact.support` apuntan al dominio y
  `npm run paginas` publica subiendo `src/data/legal/legal.json` aquí. Dominio en `src/data/sitio.mjs` (`DOMINIO_PROPIO`); con `SIN_DOMINIO=1`
  (variable del repositorio) se publica en github.io mientras el DNS no apunte.

## Logo de la Xbuyer Cup (6 de noviembre de 2026)

- [x] Logo nuevo «XB / CUP» (`contenido/logos/xb-cup-negro.jpg`, vectorizado con potrace en
  `src/components/LogoCup.astro`, toma el color del texto). Solo donde representa al torneo: camino Cup de la
  portada, cabecera de `/cup/` (`Cabecera` con `logo="cup"`), portada de `/cup/` (marino, encima del título) e
  imágenes para compartir (`cup.png` y la mitad azul de `inicio.png`, `scripts/imagenes-compartir.mjs`). El
  monograma XB de la academia sigue en el pie, la cabecera de las demás páginas, los huecos de foto y los iconos.
  Revisado a 390 y 1440 px.

## Siguiente sesión

1. Esperar la revisión del túnel en el móvil (velocidad del zoom, destello, tamaño final del rótulo)
   y las imágenes 9:16 (1080 px de ancho o más) para sustituir `src/fotos/tunel/*-movil.jpg`.
2. Con el visto bueno: integrar `Tunel` en `/cup/` (decidir con el usuario si sustituye a la portada
   o va debajo), y añadir el crédito «Imagen generada con IA» a los créditos del pie.
3. Seguir con el marcador del palmarés y las líneas del campo en SVG (mismas condiciones de
   rendimiento y movimiento reducido).

Cómo revisar: `npm run borradores` y servir `dist-borradores/` en la red local
(`python3 -m http.server 4330 --bind 0.0.0.0 --directory dist-borradores`) para verlo en el móvil
(`http://<IP del Mac>:4330/prototipos/tunel/`). `astro dev` solo escucha en localhost salvo con
`--host`. Capturas con el inspector de la skill:
`CHROME_PATH=~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell node .claude/skills/design-taste-frontend/scripts/inspect.mjs <url> --out .taste-skill/<carpeta> --widths 1440,390`.

Git: `main` en `github.com/kAsrAWiiibit/xbuyer-web` (público); cada push a `main` despliega.

## Pendiente de la organización

Fichas de App Store y Google Play con las URL nuevas (privacidad, soporte y eliminación de datos:
`https://xbuyerteamacademy.com/soporte/#eliminar-datos`). Año y categoría de los demás títulos de Costa Daurada y Copa UNIQ, categoría de la MADCUP, año y
categoría de la Donosti Cup, autoría de las imágenes de equipación (se acreditan a Xbuyer Team
Academy), sedes de Madrid y Barcelona 2027, cifras de ediciones anteriores, fechas exactas de Barcelona 2025,
enlaces de la app en las tiendas, patrocinador oficial, número del registro de asociaciones,
fotos de los torneos de la academia (L8 Sport Murcia), y si la equipación de `IMG_2696`
es de la academia.

## Cambios de la reunión con los dueños (6 de noviembre de 2026, rama `cambios-reunion`)

La rama `mejoras-noche` (interactividad) **no gustó y no se fusiona**. Se parte de `main` y se mantiene su estilo.
Vista previa en `kAsrAWiiibit/xbuyer-web-preview` (noindex): `./scripts/publicar-vista-previa.sh` →
https://kasrawiiibit.github.io/xbuyer-web-preview/. No se toca la web oficial hasta que lo aprueben.

**Dónde están los datos** (nada escrito en las plantillas):
- Textos: `contenido/textos.md`.
- Torneos 2027: `src/data/torneos-2027.ts`. Sacados de los PDF de `contenido/torneos-2027/`, que está fuera de git
  porque los PDF traen fotos de niños.
- Ediciones de la Cup: `src/data/cup-ediciones.ts`, de los carteles de `contenido/cup-ediciones/`, también fuera de
  git.
- Equipación: `src/data/equipacion.ts`.
- Patrocinador: `src/data/patrocinadores.ts`, con el logo en `src/components/logos/Synergy.astro`.
- Fechas: `src/lib/fechas.ts`, que calcula el día de la semana para no repetir los errores de los PDF.

**Enlaces de inscripción:** los Google Form van en `formulario` de cada torneo o edición. Mientras falten, el botón
abre un email a aexbuyer2026@gmail.com con el asunto del torneo y la build lo lista.

- [x] Bloque 1: portada con los textos nuevos de las dos tarjetas.
- [x] Bloque 2: `/academy/`.
  - Portada solo con título y monograma; «¿Quiénes somos?» nuevo.
  - Sección «Torneos 2027» (8 tarjetas) y desplegable en la cabecera (`<details>`, `Cabecera.astro` con `hijos`).
  - Página de cada torneo en `/academy/torneos/<slug>/`: ficha con precio e «Inscríbete», qué incluye, categorías
    con años de nacimiento y programa.
  - Palmarés con titular «Más de 20 títulos en menos de 3 años», logos de los torneos sacados de los PDF y cifra
    por torneo.
  - «Nueva piel»: descripción de cada pieza, extras opcionales (sudadera 30 €, mochila 35 €) y el texto de lo que
    incluye.
  - Villarreal Yellow Cup sin PDF: programa, categorías y lugar del acto inaugural pendientes (ocultos).
- [x] Bloque 3: `/cup/`.
  - Portada sin «Organizada por…»; frase y botón «Ver torneos».
  - Las cinco razones de «¿Qué hace diferente…?», tarjetas de las ediciones, «Ediciones anteriores», patrocinador
    y contacto.
  - Páginas `/cup/valencia/` (inscripciones cerradas y la app destacada), `/cup/madrid/` y `/cup/barcelona/`.
  - Infantil femenino pendiente (oculto) en las tres. Valencia queda solo en Sant Gregori: Parc Central ya no
    figura.
- [x] Bloque 4: Synergy, patrocinador principal.
  - En la web: banda destacada en `/cup/` y en cada edición, más una línea en la portada de `/cup/`.
  - En la app: logo en `~/xbuyer-cup-app/xbuyer-cup-app/data/source/patrocinadores/synergy.png`, probado con
    `--dry-run`, y nota en su CLAUDE.md. Sin subir ni commit allí.
- [x] Bloque 5: propuesta en `docs/propuesta-myteaminfo.md`. **No implementar hasta que la aprueben.**

**Correcciones tras la revisión (7 de noviembre de 2026):**
- **Torneos 2027:** fuera ITE Football; entra MIC7 (Salou, 11–13 de junio), que solo lleva descripción, fechas,
  lugar e inscripción.
  - La Villarreal pasa a «Yellow Cup» (`/academy/torneos/yellow-cup/`) con las categorías y lo que incluye su PDF.
  - Siguen ocultos el programa, el lugar del acto inaugural y la G13 («nacidas en 2016 y 2014» en el PDF).
  - Sin su logo, porque lleva el escudo del Villarreal CF.
  - Cada torneo tiene su `descripcion` y su Google Form en `formulario`.
  - Nombres según la lista oficial: «Copa UniQ Andorra», «MadCup».
- **Valencia:** dos sedes, Sant Gregori y Parc Central (`sedes` en `cup-ediciones.ts`), cada una con su «Cómo
  llegar».
- **Preinscripción:** `/academy/preinscripcion/` (`src/data/preinscripcion.ts`), pestaña en el menú (`menuAcademia`
  en `src/lib/torneos.ts`) y botón en la portada de la academia.
- **Palmarés:** vitrina de trofeos (`src/fotos/trofeos/`).
  - Recortados con rembg (BiRefNet) de `contenido/fotos/palmares/IMG_2689` y `2690`, imágenes autorizadas por la
    organización.
  - Flotan y giran con CSS; en el móvil, carrusel deslizable; con «Reducir movimiento», quietos.
- **Protocolo y normativa** en cada edición:
  - El resumen común está en `src/data/normativa.ts`; la duración de los partidos va en cada edición.
  - Los PDF se descargan desde `public/normativa/` (solo cambia el título interno; los originales están en
    `contenido/normativa/`, fuera de git).
  - El resumen quita la frase pegada por error en el punto 6.
- **Cabecera:** entre 900 y 1199 px, con seis apartados, el nombre se oculta y queda el logo.

**Pendiente de la organización (nuevo):**
- Teléfono 615 72 25 83: la instrucción vino con las dos opciones sin elegir, así que sigue oculto hasta que se
  confirme.
- Los PDF oficiales de normativa siguen con el error del punto 6; habría que corregirlos en el original.
- Contradicciones entre cartel y reglamento, sin publicar: Infantil femenino en Madrid (no está en su reglamento)
  y en Barcelona; Cadete en Barcelona (no está en el cartel).
- Google Form de las ediciones de Madrid y Barcelona de la Cup.
- Yellow Cup: programa con fechas correctas, lugar del acto inaugural y años de la G13.
- Campo de la edición de Barcelona.
- Si hay Infantil femenino en Valencia, Madrid y Barcelona.
