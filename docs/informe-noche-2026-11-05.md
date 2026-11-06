# Informe de la noche: 5 de noviembre de 2026

> **Actualización (después):** el DNS ya apunta. La web está en **https://xbuyerteamacademy.com** con
> certificado aprobado (dominio y `www`, caduca el 3 de febrero de 2027 y GitHub lo renueva solo),
> «Enforce HTTPS» activado y el dominio verificado en GitHub. `www`, `http` y github.io redirigen con 301. Las
> seis páginas responden 200 y se ven bien en móvil y escritorio. Las URL antiguas de `xbuyer-cup-privacidad`
> ya redirigen. En la app, `privacy.url` y `contact.support` apuntan al dominio; ese cambio está sin commit en
> la app, junto con cambios anteriores. Lo que queda: actualizar las URL en las fichas de App Store y Google
> Play.

Trabajo autónomo de 02:40 a la mañana. Todo está en `main` con un commit por bloque y subido a
`github.com/kAsrAWiiibit/xbuyer-web`.

## Resumen

- **Web publicada:** https://kasrawiiibit.github.io/xbuyer-web/ (GitHub Pages con Actions, repositorio público).
- **Dominio xbuyerteamacademy.com:** todavía no. El DNS de Namecheap sigue en la página de aparcamiento
  (`@ → 162.255.119.220`, `www → parkingpage.namecheap.com`). Comprobado a las 02:57 y a las 14:09, con
  Cloudflare (1.1.1.1) y Google (8.8.8.8). **No hubo comprobaciones entre medias:** el Mac se suspendió durante la
  noche y la espera de una hora se quedó parada hasta las 14:09. Ver «DNS que falta».
  Todo lo demás está listo para pasar al dominio en cuanto apunte.
- **Lighthouse (móvil, web publicada):** 98–100 en rendimiento, 100 en accesibilidad, 100 en buenas prácticas y
  100 en SEO en todas las páginas (tabla abajo).

## Qué he hecho

### Bloque 1: animaciones (encargo c, sin el túnel)

- **Marcador del palmarés** (`src/components/Marcador.astro`, en `/academy/#palmares`): marcador de estadio con
  21 títulos · 1 subcampeonato · 7 torneos. Son sumas de `contenido/textos.md`, no hay datos nuevos. Los dígitos
  ruedan una sola vez cuando el marcador asoma.
- **Líneas del campo en SVG** (`src/components/Campo.astro`): un campo de fútbol 11 con medidas reglamentarias
  detrás de las sedes en `/cup/#torrent` (en el móvil, debajo de las sedes). Las líneas se trazan una vez al asomar.
  También aparece en la 404, quieto.
- Las dos animaciones se quedan quietas con «Reducir movimiento», con ahorro de datos o sin JavaScript. Solo usan
  `transform`/`stroke-dashoffset`, no cargan librerías y no afectan al LCP.
- El túnel 3D no se ha tocado ni integrado.

### Bloque 2: crítica, pulido y SEO

- Crítica de impeccable con dos evaluaciones independientes (diseño y detector o navegador). Lo corregido sale de
  ahí (ver lista del bloque 3, que incluye todo).
- Revisión de animaciones (emil-design-eng):

| Antes | Después | Por qué |
| --- | --- | --- |
| Rótulo «Foto: …» encima de cada foto | Crédito agrupado bajo la galería y en el pie | Los créditos competían con la foto |
| Marcador y campo sin animar | Una sola vez al asomar, 1,1–1,4 s, curva de salida | Momento de marca, no un efecto repetido |
| Sin alternativa al movimiento en lo nuevo | Quieto con reduced-motion, saveData o sin JS | Accesibilidad y rendimiento |
| Dígitos del marcador como texto (0 1 2 … 9) | Tira en CSS (`::before`) | Los buscadores leían basura |
| Botones | Se mantiene `scale(0.97)` 160 ms al pulsar, hover solo con ratón | Ya estaba bien |

- **SEO y compartir:** título y descripción propios en cada página. Imágenes para compartir de marca de 1200 × 630
  (`public/compartir/inicio.png`, `academy.png` y `cup.png`, generadas con `scripts/imagenes-compartir.mjs` desde los
  textos). Open Graph y tarjeta de Twitter. `apple-touch-icon.png` y el favicon SVG que ya había. `sitemap.xml` y
  `robots.txt` se generan en la build. Página 404 de marca («Fuera de juego»), con `noindex`. URL canónicas con el
  dominio. Datos estructurados `SportsEvent` del torneo de Torrent en `/cup/`.

### Bloque 3: revisión final

Revisadas todas las páginas a 360, 768 y 1440 px con capturas. Ninguna página se desborda de lado en ninguna anchura.
Textos cotejados con `textos.md` y enlaces comprobados (ver lista de correcciones).

### Bloque 4: publicación

- `src/data/sitio.mjs`: `DOMINIO_PROPIO = 'xbuyerteamacademy.com'`.
- Repositorio público `kAsrAWiiibit/xbuyer-web` creado, sin `contenido/fotos/` ni `.taste-skill/`. GitHub Pages está
  activado con GitHub Actions (`.github/workflows/desplegar.yml`).
- Mientras el DNS no apunte, la variable del repositorio `SIN_DOMINIO=1` publica la web en github.io con la ruta
  `/xbuyer-web/`. Si se hubiera puesto ya el dominio en Pages, github.io redirigiría a un dominio que todavía no
  funciona y la web no se vería en ningún sitio.
- Redirecciones de `kasrawiiibit.github.io/xbuyer-cup-privacidad/` (y `/soporte/`) preparadas, pero **sin publicar**:
  solo se publican cuando el dominio ya funcione.

## Puntuaciones de Lighthouse (móvil, web publicada en github.io)

| Página | Rendimiento | Accesibilidad | Buenas prácticas | SEO | LCP | CLS |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | 100 | 100 | 100 | 100 | 1,3 s | 0 |
| `/cup/` | 99 | 100 | 100 | 100 | 1,5 s | 0 |
| `/academy/` | 100 | 100 | 100 | 100 | 1,3 s | 0 |
| `/aviso-legal/` | 100 | 100 | 100 | 100 | 1,4 s | 0 |
| `/privacidad/` | 100 | 100 | 100 | 100 | 1,2 s | 0 |
| `/soporte/` | 100 | 100 | 100 | 100 | 1,1 s | 0,004 |
| 404 | 100 | 100 | 100 | 60* | 1,4 s | 0 |

\* La 404 lleva `noindex` a propósito (no debe salir en Google). Por eso Lighthouse le baja el SEO.

## Correcciones (bloques 2 y 3)

1. **Créditos de foto:** ya no hay un rótulo oscuro encima de cada foto. Hay una línea pequeña bajo la galería de
   Madrid («Fotos: Eric Leiro») y otra bajo la equipación («Fotos: Xbuyer Team Academy»). En el pie de cada página
   salen solo los autores de las fotos de esa página; la portada y las legales ya no muestran créditos de fotos que
   no tienen.
2. **Aviso legal:** el texto decía que el autor «figura en la propia foto»; ahora dice «junto a ellas y en el pie de
   cada página».
3. **Dato que faltaba:** la edición de Barcelona de junio de 2025 no mostraba «Desde el 28 de junio», que está en
   `textos.md`. Ahora sí.
4. **Tableta (600–899 px):** heredaba el diseño del móvil. La foto de portada de `/cup/` medía casi dos pantallas y
   todas las listas iban a una columna. Ahora la foto es apaisada, las listas van a dos columnas y las tres piezas de
   la equipación en fila.
5. **Tamaños de texto:** los nombres de torneos, sedes y ciudades y «Desde la temporada 2022-23» tenían el mismo
   tamaño que los títulos de sección. Ahora van a tamaño de subtítulo, y «Campo de Fútbol Sant Gregori» ya no ocupa
   dos líneas en escritorio. La Donosti Cup tiene el mismo tamaño que los demás torneos (más discreta solo en color).
6. **Antetítulos:** «Organizada por Xbuyer Team Academy» estaba encima del título de `/cup/`; ahora va bajo la fecha.
7. **Navegación en móvil:** los apartados de cada página (Torrent · Ediciones · Contacto; Quiénes somos · Palmarés ·
   Equipación · Contacto) se ven bajo la barra. Antes estaban ocultos en el móvil.
8. **Pie compacto:** letra pequeña, enlaces legales en una sola línea en el móvil y menos aire. Pasa de unos 900 px a
   unos 470 px de alto en el móvil. «C/ Rosa Luxemburgo» ya no se parte tras «C/».
9. **Zonas táctiles:** los enlaces del pie (34 px) y «Cómo llegar» (38 px) pasan a 44 px.
10. **Espaciados:** la sección de contacto sumaba dos márgenes (unos 140 px vacíos arriba y abajo); ahora tiene uno.
11. **Encuadre:** la foto de portada de `/cup/` está recolocada para que el trofeo y las caras queden lejos del corte
    diagonal.
12. **Contenido mixto:** el formulario tenía `action="mailto:…"`, que en HTTPS baja las «buenas prácticas» a 79.
    El formulario funciona con JavaScript. Sin JavaScript se ve un enlace de correo y no se mandan datos por la URL.
13. **Saltos al cargar:** las fuentes de la primera pantalla se precargan. El CLS de `/academy/` baja de 0,065 a 0.
14. **Accesibilidad:** las dos «Barcelona» de ediciones anteriores llevan la fecha para los lectores de pantalla, para
    que no suenen iguales. Los textos de las listas ya no dejan una palabra sola en la última línea.
15. **404:** el campo ya no pisa el texto.

Comprobado y correcto: fechas, sedes, categorías, palmarés (años y categorías), ediciones, qué incluye la
inscripción, contacto e Instagram coinciden con `textos.md`. `/cup/`, `/academy/`, el pie y las legales no se
contradicen. Los nombres son iguales en todas partes. Los enlaces internos no fallan, y Instagram (las dos
cuentas), Google Maps y el correo responden. Ninguna foto se repite. No hay `[pendiente]` en el HTML (la build
fallaría).

## Lo que está oculto por falta de datos

- Palmarés: año y categoría de los otros títulos de Costa Daurada Cup y Copa UNIQ Andorra, categoría de la MADCUP,
  año y categoría de la Donosti Cup.
- Fotos de los torneos de la academia (L8 Sport Murcia): el palmarés sale sin fotos.
- Sedes de Madrid y Barcelona 2027.
- Cifras de ediciones anteriores.
- Sección de la app (enlaces de App Store y Google Play).
- Número del registro de asociaciones (pie y aviso legal).
- Patrocinador oficial (no se muestra nada).
- Fechas exactas de Barcelona 2025 (solo sale «Junio de 2025 · Desde el 28 de junio»).

## Lo que no he podido hacer y por qué

- **Dominio y HTTPS:** el DNS no apunta a GitHub, así que no se puede poner el dominio en Pages,
  pedir el certificado ni activar «Enforce HTTPS». Está todo preparado para hacerlo en unos minutos.
- **Redirecciones de las URL antiguas:** preparadas, pero sin publicar hasta que el dominio funcione, como pediste.
- **Verificación del dominio en GitHub:** GitHub no tiene API para esto, así que tiene que iniciarla el titular de
  la cuenta en la web (pasos abajo). Yo no puedo saber el código del registro TXT: GitHub lo genera al pedirlo.
- **No he añadido** años de nacimiento por categoría, precio, plazo de inscripción ni horarios, aunque la crítica los
  echa en falta: no están en `textos.md` y no se inventan.

## DNS que falta (Namecheap → Domain List → xbuyerteamacademy.com → Advanced DNS)

Primero, borrar los registros de aparcamiento: el `CNAME www → parkingpage.namecheap.com` y el
«URL Redirect» de `@`, si lo hay. Después, añadir:

| Tipo | Host | Valor |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `kasrawiiibit.github.io.` |

Opcional, para IPv6: cuatro `AAAA` de `@` a `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153` y
`2606:50c0:8003::153`.

### Verificación del dominio (para que nadie más pueda usarlo en GitHub Pages)

1. En GitHub, con la cuenta kAsrAWiiibit: foto de perfil → **Settings** → **Pages** (en «Code, planning, and
   automation») → **Add a domain** → escribir `xbuyerteamacademy.com` → **Add domain**.
2. GitHub muestra un registro TXT. En Namecheap, en Advanced DNS → **Add new record** → **TXT Record**:
   - **Host:** `_github-pages-challenge-kAsrAWiiibit`
   - **Value:** el código que muestra GitHub (letras y números; se copia tal cual, sin comillas)
   - **TTL:** Automatic
3. Esperar unos minutos y pulsar **Verify** en GitHub. El registro TXT tiene que quedarse en el DNS para siempre.

## Cuando el DNS apunte (no ha pasado esta noche; son estos pasos)

```bash
gh api -X PUT repos/kAsrAWiiibit/xbuyer-web/pages -f cname=xbuyerteamacademy.com
gh variable set SIN_DOMINIO --body 0 -R kAsrAWiiibit/xbuyer-web
gh workflow run Desplegar -R kAsrAWiiibit/xbuyer-web
# cuando el certificado esté «approved» (gh api repos/kAsrAWiiibit/xbuyer-web/pages --jq .https_certificate.state):
gh api -X PUT repos/kAsrAWiiibit/xbuyer-web/pages -F https_enforced=true
```

Después, publicar las redirecciones en `kAsrAWiiibit/xbuyer-cup-privacidad`. Son dos páginas con meta refresh,
`rel="canonical"` y `noindex`, que llevan a `https://xbuyerteamacademy.com/privacidad/` y `/soporte/`.

## Lo que tienes que revisar por la mañana

1. **DNS en Namecheap** (tabla de arriba) y **verificación del dominio** (registro TXT).
2. Mirar la web en el móvil: https://kasrawiiibit.github.io/xbuyer-web/ (o el dominio, si ya funciona). Sobre todo el
   marcador del palmarés, las líneas del campo, la barra con los apartados en el móvil y el pie nuevo.
3. Las tres imágenes para compartir de `public/compartir/`. La de la Cup lleva la fecha de Torrent: cuando cambie la
   edición principal, hay que volver a ejecutar `scripts/imagenes-compartir.mjs`.
4. **Ojo con la app:** su `npm run paginas` publica en `xbuyer-cup-privacidad`. Si se vuelve a ejecutar después de
   poner las redirecciones, las borraría. Hay que cambiarlo para que solo genere `legal.json` para esta web, y
   actualizar `privacy.url` y `contact.support` en la app y en las fichas de App Store y Google Play.
5. La política de privacidad sigue con la marca «Borrador pendiente de revisión legal», que viene de la app tal cual.
6. Detalle: la dirección sale como «08840 Viladecans (Barcelona)» en el pie y como «08840 Viladecans, Barcelona» en
   la privacidad (texto de la app). Si quieres que sea igual, se cambia en la app.
7. Pendiente de antes: el túnel 3D (cuando haya imágenes realistas) y lo que falta de la organización (lista de
   arriba).
