# Web de Xbuyer Team Academy

Web estática (Astro) de **Xbuyer Team Academy** y de la **Xbuyer Cup**, el torneo que organiza la academia.
Se publica en GitHub Pages con `.github/workflows/desplegar.yml` en cada push a `main`.

```bash
npm install
npm run dev          # desarrollo: se ven las marcas [pendiente]
npm run build        # producción (dist/): oculta lo pendiente y avisa de qué ha ocultado
npm run borradores   # build con las marcas [pendiente] visibles (dist-borradores/), para revisar
npm run preview      # sirve dist/ en local
npm run formularios  # vuelve a leer los Google Forms de inscripción (src/data/formularios.json); no envía nada
```

Arquitectura y páginas: `SNAPSHOT.md`. Pendientes: `BACKLOG.md`.

## Páginas

| Ruta | Qué es |
| --- | --- |
| `/` | Dos caminos: Xbuyer Team Academy y Xbuyer Cup |
| `/academy/` | La selección: quiénes somos, palmarés y contacto |
| `/cup/` | Xbuyer Cup: edición principal (la primera de «Próximas ediciones»), qué la hace diferente, qué incluye la inscripción, próximas y anteriores ediciones |
| `/aviso-legal/` | Aviso legal de la web (redactado aquí) |
| `/privacidad/` · `/soporte/` | Política de privacidad y ayuda de la app (textos del proyecto de la app) |

## Contenido: todo sale de `contenido/textos.md`

- La web lee `contenido/textos.md` al compilar (`src/lib/textos.ts`) y le da forma en
  `src/data/contenido.ts`. Para cambiar un texto, una fecha, el palmarés o una edición, se cambia ahí.
- Respeta su forma: títulos `#`/`##` y viñetas `- Etiqueta: valor`. Si algo no se entiende (una fecha
  sin formato, un resultado del palmarés distinto de «N veces campeones», «campeones»,
  «subcampeones» o «participación»), la build falla diciendo qué no encuentra. Tras el resultado van el
  año y la categoría que figuran en el trofeo: `- MEDCUP: campeones. 2025, S12.`
- La equipación sale de «## Equipación (temporada …)»: cada pieza de «Piezas» tiene su hueco de foto
  `equipacion-<pieza>` y, si existe, `equipacion-<pieza>-espalda` (con botón para darle la vuelta).
- La primera viñeta de «Próximas ediciones» es la edición principal de `/cup/`; las demás salen como
  próximas. El palmarés se ordena solo, de más a menos títulos.
- `[pendiente]` o `[pendiente: …]` en un valor: en producción no se muestra y `npm run build` lo lista.
  Si aun así llegara un `[pendiente` al HTML, la build falla.
- Fuera de `textos.md`: los datos legales de la entidad (`src/data/entidad.ts`), los enlaces de las
  tiendas (pendientes, en `src/data/contenido.ts`) y los textos de interfaz (`src/i18n/ui.ts`).

## Fotos

- Huecos en `src/data/fotos.json`. En el palmarés, un torneo sin fotos se muestra solo con su nombre y resultado.
- Fotos de la Xbuyer Cup Madrid 2025 (Eric Leiro) en `/cup/`; las de los torneos de la academia (L8 Sport
  Murcia) van en los huecos `palmares-*` de cada torneo. Antes de copiarlas: máximo 2400px y sin metadatos
  (`ffmpeg -i original.jpg -map_metadata -1 -vf "scale='min(2400,iw)':-2" -q:v 3 src/fotos/…`).
- Para poner una foto: cópiala en `src/fotos/` y rellena su hueco con
  `{ "archivo": "cup/madrid-01.jpg", "alt": "qué se ve", "autor": "Eric Leiro", "origen": "Xbuyer Cup Madrid 2025" }`.
  El crédito aparece en la foto y en el pie. Sin `alt` o `autor` la build falla.
- **Nada de primeros planos de menores reconocibles sin autorización.** Esas fotos van a
  `contenido/fotos/revisar/` (fuera de `src/`, nunca se publican).

## Privacidad y soporte: una sola fuente

Los textos viven en el proyecto de la app (`lib/privacy.ts`, `lib/publicPages.ts`). Al ejecutar allí
`npm run paginas` (o `npm run privacidad`) se genera `docs/web/legal.json` y se copia a
`src/data/legal/legal.json` de esta web (ruta en `XBUYER_WEB_DIR`; por defecto `~/xbuyer-web`).
Después, súbelo con git aquí. La web solo les pone el diseño: no se editan a mano.

## Dominio

https://xbuyerteamacademy.com (`DOMINIO_PROPIO` en `src/data/sitio.mjs`). DNS en Namecheap: 4 registros A de
`@` a GitHub Pages, CNAME de `www` a `kasrawiiibit.github.io` y el TXT de verificación
`_github-pages-challenge-kAsrAWiiibit`. *Settings → Pages*: dominio personalizado y «Enforce HTTPS».
La variable del repositorio `SIN_DOMINIO=1` volvería a publicar en github.io con ruta `/xbuyer-web/`.

## Idiomas

Castellano en la raíz. Catalán (`/ca/`) e inglés (`/en/`) ya están declarados en `astro.config.mjs` y
los textos de interfaz se traducen en `src/i18n/ui.ts`. Las páginas se crean cuando la organización
pase las traducciones; no se publica ninguna traducción automática.

## Al publicar con dominio

- [x] Redirigir las URL antiguas `https://kasrawiiibit.github.io/xbuyer-cup-privacidad/` y `/soporte/`
      a `/privacidad/` y `/soporte/` del dominio nuevo. Como GitHub Pages no hace redirecciones 301,
      el repositorio `xbuyer-cup-privacidad` debe quedarse con dos páginas de redirección (meta refresh
      con `rel="canonical"`).
- [x] En la app: `privacy.url` y `contact.support` apuntan al dominio y `npm run paginas` publica a través
      de esta web (sube `src/data/legal/legal.json`); ya no toca `xbuyer-cup-privacidad`.
- [ ] Actualizar la URL de privacidad y la de soporte en las fichas de App Store y Google Play.
