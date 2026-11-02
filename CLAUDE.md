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
- [ ] **c) Animaciones de fútbol.** Prototipo del túnel al campo en 3D en `/cup/` (enseñarlo antes de
  integrarlo), marcador en el palmarés y líneas del campo en SVG, con condiciones de rendimiento y
  movimiento reducido.
  - [~] Túnel: **prototipo con imágenes, pendiente de revisión.** `/prototipos/tunel/` (solo en
    desarrollo y borradores, nunca en producción), componente `src/components/Tunel.astro`. Zoom hacia
    la luz del túnel y fundido con el campo al hacer scroll (sección de 260svh con escenario fijo,
    scroll nativo, sin librerías; three.js se quitó). Rótulo visible desde el principio. Quieto (solo
    el campo; el túnel ni se descarga) con «Reducir movimiento», ahorro de datos, red 2G/3G, menos de
    4 GB o 4 núcleos, o sin JavaScript. Imágenes generadas con IA en `src/fotos/tunel/` (crédito
    «Imagen generada con IA» sobre la imagen), AVIF/WebP por tamaño y orientación. **Faltan las 9:16
    de verdad**: las de `-movil` son recortes provisionales de las 16:9 (528 px de ancho).
    No integrado en `/cup/` todavía.
  - [ ] Marcador en el palmarés.
  - [ ] Líneas del campo en SVG.

## Pendiente de la organización

Año y categoría de los demás títulos de Costa Daurada y Copa UNIQ, categoría de la MADCUP, año y
categoría de la Donosti Cup, autoría de las imágenes de equipación (se acreditan a Xbuyer Team
Academy), sedes de Madrid y Barcelona 2027, cifras de ediciones anteriores, fechas exactas de Barcelona 2025,
enlaces de la app en las tiendas, patrocinador oficial, número del registro de asociaciones,
fotos de los torneos de la academia (L8 Sport Murcia) y dominio.
