# Informe de la noche: 6 de noviembre de 2026

Trabajo autónomo, sin preguntas. Todo está en la rama **`mejoras-noche`**, con un commit por bloque. `main` y la web
oficial (https://xbuyerteamacademy.com) no se han tocado.

**Vista previa:** https://kasrawiiibit.github.io/xbuyer-web-preview/

Es un repositorio aparte (`kAsrAWiiibit/xbuyer-web-preview`, público, GitHub Pages desde `main`). Todas las páginas
llevan `noindex, nofollow`, el `robots.txt` cierra la puerta y no hay sitemap ni CNAME. Para volver a publicarla:
`./scripts/publicar-vista-previa.sh`, que compila con `npm run vista-previa` y sustituye el único commit del
repositorio.

## Qué he hecho

### Bloque 1: referencias (`docs/referencias.md`)

Abrí y capturé a 1440 y 390 px Gothia Cup, Dana Cup, Real Madrid, Atlético de Madrid y Nike Fútbol. La Kings League
y adidas bloquean los navegadores automáticos; lo que anoto de ellas va marcado «de memoria». El documento recoge
qué usan, qué encaja con el cartel plano, qué aplico y por qué, y qué descarto.

### Bloque 2: interactividad

Ni estructura, ni secciones, ni orden, ni textos cambian. El código va en `src/scripts/movimiento.ts`, un solo
módulo sin librerías, y `src/styles/movimiento.css`.

- **Entradas al hacer scroll:** los títulos de sección suben palabra a palabra desde su máscara. Los lectores de
  pantalla leen el título entero (`aria-label`). Las líneas del título de las portadas suben al cargar, solo con CSS.
  Las fotos se revelan con el corte diagonal de la X cuando ya han cargado. Las marcas cuadradas de las listas de
  la Cup giran al entrar.
- **Fotos con profundidad:** con el ratón, las fotos se inclinan en 3D (3,5° como mucho) con un brillo leve. En
  pantalla táctil se inclinan un poco hacia el dedo al tocar, y vuelven al soltar o al empezar el scroll. Afecta a la
  portada de la Cup, la galería de Madrid y las camisetas.
- **Parallax suave:** las fotos de la Cup se desplazan dentro de su corte y el monograma de la portada de Academy y
  el campo van a otra velocidad. Es CSS con `animation-timeline`, fuera del hilo principal y sin JavaScript. Firefox
  no lo soporta y se queda quieto.
- **Cursor propio**, solo con ratón: un balón de 12 px que rueda al moverse y un aro que lo sigue. El aro crece
  sobre enlaces y sobre las fotos ampliables, donde lleva un «+», y toma el color de acento de cada sección. No
  aparece en pantallas táctiles, en las páginas legales, en el contacto ni en el pie: ahí está el cursor del sistema
  para escribir y copiar.
- **Botones con imán** (con ratón): se acercan hasta 4 px al puntero.
- **Palmarés:** el marcador tiene ahora bombillas de estadio que se encienden al pararse los dígitos, y la línea de
  bisagra de las fichas. Con el ratón, pasar por una cifra la hace rodar otra vez. Los torneos se inclinan en 3D
  (3°) y aparece detrás una placa plana de un tono más claro.
- **Galerías:** las fotos de Madrid 2025 y las de la «Nueva piel» se amplían al pulsarlas, en `src/components/Visor.astro`
  (un `<dialog>` nativo). Tiene flechas, teclado (← → Esc) y gesto de deslizar con el dedo, y muestra el crédito de
  cada foto y «1 / 4». En el móvil, la galería de Madrid es una tira que se desliza con imán nativo y deja asomar la
  siguiente foto.
- **Detalles de fútbol:** las líneas del campo se dibujan (ya estaba), y al acabar aparece un balón amarillo que sigue
  al ratón por el campo. En el móvil va donde se toca. Está en `/cup/#torrent` y en la 404. El monograma de la cabecera
  gira un poco al pasar el ratón, igual que el de la portada.
- **Transiciones entre páginas:** View Transitions nativas, sin el router de Astro ni JavaScript. El bloque amarillo
  o azul de la portada se convierte en la portada de `/academy/` o `/cup/`, con su título y el logo de la Cup. Entre
  las demás páginas hay un fundido corto. Funciona en Chrome y en Safari 18.2 o posterior; en Firefox la navegación
  es la de siempre.

### Bloque 3: crítica, pulido y capturas

- **`/impeccable critique`** con dos evaluaciones independientes (diseño, y detector con navegador). Puntuación
  **25/32**: sin P0 y con dos P1. Informe en `docs/critica-noche.md`. Las dos coincidieron en el problema principal:
  la placa con brillo de los torneos se salía del cartel plano y provocaba **6 px de scroll lateral en `/academy/`
  en el móvil**.
- **`/impeccable polish`**, lo que se corrigió:

| Antes | Después | Por qué |
| --- | --- | --- |
| La placa de los torneos sobresalía 22 px con brillo radial | Placa plana de un color, dentro del hueco entre columnas, solo con ratón; sin brillo | Scroll lateral en el móvil y degradado fuera de la dirección |
| Inclinación de fotos de 6° con escala 1,015 y brillo al 24 % | 3,5° sin escala y brillo al 14 % | El corte XB se veía dentado y el brillo lavaba la foto |
| Al tocar una foto, se hundía (escala 0,985) | Solo se inclina un poco hacia el dedo | Daba un tirón al empezar el scroll sobre una foto |
| Cursor propio también en las legales, el contacto y el pie | Cursor del sistema en esos sitios | Hay que poder seleccionar y copiar el email y la dirección |
| Sobre las fotos, un disco relleno de 72 px | Aro sin relleno con «+» | El disco tapaba la foto (el escudo de la camiseta) |
| Imán de 6 px | 4 px | Junto con el cursor, era demasiado |
| Títulos partidos en palabras sin más | `aria-label` con el título entero y las palabras ocultas a los lectores | VoiceOver podía leerlos palabra a palabra |
| En la tira del móvil, cada foto se revelaba al llegar de lado | Sin revelado en la tira | Parecía que cargaba lenta |
| En `/cup/` a 1440 × 900, el botón y «Faltan N días» quedaban bajo el pliegue (botón a 1018 px) | Título a 19vh en escritorio y algo menos de espacio (botón a 868 px; a 1280 × 720, a 714 px) | Quien llega veía la portada sin ninguna acción |
| Las líneas del campo cruzaban «Campo de Fútbol Sant Gregori» con fuerza | Líneas más apagadas | Se leía peor el nombre de la sede |
| «SUBCAMPEONATO» tocaba los bordes de su celda a 390 | Sin espaciado entre letras en el móvil | Le faltaba aire |
| La imagen del visor estaba en el HTML sin `src` | Se crea al abrir el visor | El detector avisaba de imagen rota |

- **Revisión de animaciones** con los criterios de emil-design-eng (la skill «review-animations» no está instalada).
  Lo que se dejó así y por qué:

| Animación | Tiempo y curva | Por qué |
| --- | --- | --- |
| Títulos por palabras | 850 ms, `--ease-expo`, 60 ms entre palabras | Entrada única, de presentación; el escalonado, dentro de 30–80 ms |
| Revelado diagonal de fotos | 850 ms, `--ease-in-out` (era 1000) | Es movimiento en pantalla, no una entrada desde fuera |
| Visor | Entrada 240 ms (fundido) y foto 320 ms desde escala 0,96, `--ease-out`; cierre al instante | Nunca desde escala 0; entrada y salida asimétricas |
| Cursor, inclinación e imán | Interpolación por fotograma (factor 0,14–0,22), sin duración fija | Se puede interrumpir y tiene la inercia de un muelle |
| Hover de botones y aro | 160–280 ms, `--ease-out` | Respuesta al puntero por debajo de 300 ms |
| Marcador | 1400 ms al asomar y 900 ms al volver a rodar | Momento de marca, se ve una vez |
| Transición entre páginas | 520 ms `--ease-in-out` para el bloque que se transforma y 260 ms de fundido | Movimiento en pantalla, no una entrada |

- **Capturas** en `.taste-skill/capturas-noche/`, fuera de git: las 7 páginas a 1440 y 390 px (primera pantalla y
  página entera), y con interacciones:
  - inclinación de torneo, camiseta y foto;
  - marcador rodando;
  - balón en el campo;
  - visor en escritorio y en el móvil;
  - tira del móvil;
  - foco de teclado en una foto;
  - «Reducir movimiento».

  Sin errores de consola en ninguna página. En las capturas de página entera, la cabecera fija sale a media página:
  es cosa de la herramienta de captura, no de la web.

### Bloque 4: reunión

- `docs/reunion-propuestas.md` recoge:
  - un resumen para los dueños;
  - una comparación con las webs de referencia;
  - 13 propuestas, cada una con qué aporta, qué necesitamos y el esfuerzo;
  - la lista de datos y preguntas pendientes.

## Lighthouse (móvil) y peso

«Antes» es la web publicada (xbuyerteamacademy.com) y «después», la vista previa. Las dos están en GitHub Pages.

| Página | Rendimiento antes | Rendimiento después | Accesibilidad antes → después | LCP antes → después | CLS después |
| --- | --- | --- | --- | --- | --- |
| `/` | 100 | 98 | 100 → 100 | 1,4 → 1,4 s | 0 |
| `/academy/` | 98 | 100 | 100 → 100 | 1,5 → 1,2 s | 0 |
| `/cup/` | 99 | 98 | 100 → 100 | 1,5 → 1,8 s | 0 |
| `/aviso-legal/` | 100 | 100 | 100 → 100 | 1,5 → 1,4 s | 0 |
| `/privacidad/` | 100 | 100 | 100 → 100 | 1,4 → 1,1 s | 0 |
| `/soporte/` | 100 | 100 | 100 → 100 | 1,2 → 1,1 s | 0,004 |

- **Buenas prácticas:** 100 antes y después.
- **SEO:** en la vista previa sale 60–63 a propósito, porque lleva `noindex`. En la web oficial, sin cambios,
  sigue en 100.
- **Variación entre pasadas:** Lighthouse varía 1–2 puntos de una pasada a otra. A mitad de la noche, `/` dio 97 y
  `/cup/` 98.
- **Cerca de 90:** ninguna página bajó de 97, así que no hubo que quitar nada por rendimiento.

**Peso en el móvil** (390 px, DPR 2, recorriendo la página entera, sin caché):

| Página | Antes | Después |
| --- | --- | --- |
| `/` | 73 KB | 78 KB |
| `/academy/` | 258 KB | 266 KB |
| `/cup/` | 389 KB | 396 KB |
| `/aviso-legal/` | 70 KB | 75 KB |
| `/privacidad/` | 71 KB | 75 KB |
| `/soporte/` | 71 KB | 76 KB |

El JavaScript nuevo pesa unos 4 KB comprimido: 2,8 KB el módulo común y el resto el visor, que va dentro del HTML.
La foto grande del visor solo se descarga al abrirlo.

## Lo que he descartado, y por qué

- **El router de Astro (`ClientRouter`) para las transiciones:** añade JavaScript y cambia cómo se ejecutan los
  scripts. Las View Transitions nativas hacen lo mismo con CSS.
- **Scroll suavizado con librería (Lenis o similar):** cambia el tacto de la rueda y del dedo, y el encargo pide
  scroll natural.
- **Brillo sobre los torneos y placa a todo el ancho:** se probó y la crítica lo tumbó. Quedan una inclinación
  corta y una placa plana.
- **Parallax en las camisetas:** recortaría la prenda, que ya está ajustada al encuadre.
- **Carrusel arrastrable con el ratón en escritorio:** la cuadrícula de 2 × 2 ya enseña las cuatro fotos. El visor
  da la experiencia inmersiva sin esconder nada.
- **Vídeo de fondo, carruseles automáticos, cuenta atrás con segundos y cinta de patrocinadores:** explicado en
  `docs/referencias.md`.
- **Fotos de las placas del palmarés** (`contenido/fotos/palmares/`): no tienen autor ni permiso confirmados, y el
  hueco espera las fotos de L8 Sport Murcia. No se publican.
- **El túnel de la Cup:** no se ha tocado. Sigue de prototipo, pendiente de vuestra decisión.

## Textos nuevos

No hay ningún texto visible nuevo salvo «Foto: autor» y «1 / 4» dentro del visor, que son el crédito obligatorio y
el contador. Las etiquetas nuevas son solo para lectores de pantalla y botones con icono: «Fotos ampliadas»,
«Ampliar la foto», «Cerrar», «Foto anterior» y «Foto siguiente». Están en `src/i18n/ui.ts`, como el resto de textos
de interfaz.

## Lo que tienes que mirar antes de la reunión

1. **Abre la vista previa en tu móvil**, en Safari y en Chrome si puedes. Comprueba cuatro cosas:
   - La transición al pulsar «Conoce la academia» y «Ver la Xbuyer Cup» desde la portada. Las capturas sin cabeza no
     recogen los fotogramas intermedios: comprobé que se ejecuta (la página llega con `viewTransition`), pero no la vi.
   - La tira de fotos de Madrid.
   - El visor deslizando con el dedo.
   - El marcador del palmarés.
2. **En el ordenador:** el cursor-balón, la inclinación de las fotos y el balón del campo de Torrent. Si alguno os
   parece demasiado, se quita sin tocar lo demás. La crítica preguntaba si merece la pena quitar el cursor del sistema
   a quien usa ratón, porque el público está sobre todo en el móvil.
3. **Activa «Reducir movimiento»** (iPhone: Ajustes › Accesibilidad › Movimiento). Todo debería verse con fundidos y
   sin movimiento.
4. **Lee `docs/reunion-propuestas.md`.** Es lo que conviene llevar a la reunión.
5. **Si los dueños dan el visto bueno,** fusionar `mejoras-noche` en `main` publica en xbuyerteamacademy.com: cada push
   a `main` despliega. No lo he hecho. Antes de fusionar, el cambio de `src/data/sitio.mjs` y del flujo no afecta a
   producción: `VISTA_PREVIA` solo actúa con `npm run vista-previa`.
6. **Decide qué hacer con la vista previa:** déjala para enseñarla o bórrala después. `gh repo delete
   kAsrAWiiibit/xbuyer-web-preview` necesita el permiso `delete_repo`.
