# Web de Xbuyer Team Academy

Web estática en Astro (https://xbuyerteamacademy.com): **Xbuyer Team Academy** (una selección de fútbol base que se
forma para cada torneo, no una escuela) y la **Xbuyer Cup**, el torneo que organiza.

- **Este archivo: solo reglas.** Arquitectura actual en `SNAPSHOT.md`; pendientes, bugs, ideas y por dónde seguir
  (bloque «RESUME HERE») en `BACKLOG.md`. Producto en `PRODUCT.md`; comandos, contenido y fotos en `README.md`.
  Al terminar una sesión, actualiza los tres.

Dirección visual «cartel plano y ruidoso» (`.taste-skill/direction.json`, fuera de git): colores planos (azul
#1863B8, amarillo #FFED00, marino #0C0433), Barlow Condensed 700 + Barlow, corte diagonal XB. Skills del proyecto:
`design-taste-frontend`, `impeccable`, `emil-design-eng`.

## Reglas

- **Ningún `[pendiente]` visible en producción.** Todo texto sale de `contenido/textos.md` o de los archivos de
  `src/data/` (nada escrito en las plantillas); lo que falta se marca `[pendiente: …]` / `pendiente()` y
  `npm run build` lo oculta y lo lista. Si llega al HTML, la build falla. Nada se inventa.
- **Fotos con crédito visible** (`autor` y `alt` obligatorios en `src/data/fotos.json`), sin metadatos y a 2400px
  como máximo. **Sin primeros planos de niños reconocibles sin autorización**: van a `contenido/fotos/revisar/` y no
  se publican. Nunca fotos de bancos de imágenes.
- `contenido/fotos/`, `contenido/torneos-2027/`, `contenido/cup-ediciones/` y `contenido/normativa/` están fuera de
  git (el repositorio es público y traen fotos de menores). Lo que se publica se copia optimizado a `src/`.
- **El nombre de la asociación** (Associació Esportiva Xbuyer 2026) **solo en el pie y en las páginas legales**.
- **Solo castellano.** `/ca/` y `/en/` están declarados, pero no se publica ninguna traducción hasta que la
  organización la pase.
- **El teléfono de los PDF no se publica** en ningún sitio de la web.
- **`/privacidad/` y `/soporte/` los usa la app.** Sus textos vienen de `src/data/legal/legal.json`, que sube el
  proyecto de la app: no se editan a mano. Lo propio de la web va en `src/data/privacidad-web.ts`.
- **Formularios de inscripción:** nunca envíos de prueba a los Google Forms reales. Su estructura se lee con
  `npm run formularios` (solo lectura); tras cualquier cambio de un formulario o enlace, vuelve a leerlos.
  Las respuestas tienen que seguir llegando al Google Form y a su hoja de cálculo.
- Movimiento: siempre con alternativa para `prefers-reduced-motion`, sin bloquear el hilo principal ni penalizar el
  LCP; nada de librerías pesadas en páginas que no las necesitan.
- **Cada push a `main` despliega la web oficial.** Trabaja en ramas; fusiona solo con el visto bueno. La rama
  `mejoras-noche` no se fusiona nunca.

## Cómo revisar

- `npm run build` (producción, lista lo ocultado) y `npm run borradores` (con las marcas visibles, `dist-borradores/`).
- En el móvil: `python3 -m http.server 4330 --bind 0.0.0.0 --directory dist-borradores` y
  `http://<IP del Mac>:4330/`.
- Capturas: `CHROME_PATH=~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell node .claude/skills/design-taste-frontend/scripts/inspect.mjs <url> --out .taste-skill/<carpeta> --widths 1440,390`.
