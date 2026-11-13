# BACKLOG

> **RESUME HERE** (13 de noviembre de 2026): **sin precios** en toda la web (`src/data/precios.ts`, importes guardados
> en `src/data/`; build sin ningún «€»). La preinscripción ya estaba integrada como los torneos (formulario propio;
> `npm run formularios -- --comprobar` sin cambios): comprobada en la build. Publicado. Antes (11 de noviembre de 2026): política de privacidad definitiva (revisada por la organización): apartado
> de inscripciones con base legal y plazos, casilla de consentimiento de salud en los formularios y sin «En construcción»
> en las páginas legales. Antes: (12 de noviembre de 2026, noche): logos de las fichas de torneo grandes y centrados; quitados todos los sombreados (eco de los logos en la portada
> y en las páginas de torneo, sombra bajo los trofeos) y el fondo blanco de la sudadera y la mochila. Falta borrar el
> repositorio de la vista previa `kAsrAWiiibit/xbuyer-web-preview` (gh necesita
> `gh auth refresh -h github.com -s delete_repo`). Siguiente: enlaces de los Google Form de la Cup Madrid y Barcelona
> (pegarlos en `formulario:` de `src/data/cup-ediciones.ts`, `npm run formularios`, build y revisar `#inscripcion`).

## Cuando la app esté en las tiendas

- En `src/data/contenido.ts`: `cup.app.publicada: true` y los enlaces reales en `appStore` y `googlePlay`. Así se quita
  la etiqueta «En construcción» de todas partes («¿Qué hace diferente…?», Valencia; las páginas legales ya no la
  llevan) y en el bloque de la app de Valencia salen los botones de descarga.
- Revisar `edicion.cerradasApp` («Podrás seguir el torneo en la app oficial»).

## Pendiente de la organización

- Casilla de consentimiento de salud en los Google Forms de los torneos (la pide la organización). Que **no sea
  obligatoria** en Google (si no, se rechazan las inscripciones sin alergias). Cuando esté: `npm run formularios`,
  comprobar que la casilla deja de pintarse aparte y que su `entry.*` va en el envío.
- Google Form de la Xbuyer Cup **Madrid** y **Barcelona** (mientras, botón de email; el bloque integrado ya está).
- Logos originales en buena calidad (sobre todo MedCup, Swit Cup, Donosti Cup y Central Cup).
- Una inscripción real de prueba desde la web en un torneo 2027 (no se hicieron envíos de prueba a los formularios
  reales): comprobar que llega a la hoja de cálculo y borrar esa fila.
- Fichas de App Store y Google Play con las URL nuevas (privacidad, soporte y eliminación de datos:
  `https://xbuyerteamacademy.com/soporte/#eliminar-datos`) y enlaces de la app en las tiendas.
- Palmarés: año y categoría de los demás títulos de Costa Daurada y Copa UniQ; categoría de la MadCup.
- Autoría de las imágenes de equipación (se acreditan a Xbuyer Team Academy).
- Sedes de Madrid y Barcelona 2027; campo de la edición de Barcelona; cifras de ediciones anteriores.
- Yellow Cup: programa con fechas correctas, lugar del acto inaugural y años de la G13.
- Si hay Infantil femenino en Valencia, Madrid y Barcelona; Cadete en Barcelona.
- Número del registro de asociaciones.
- Fotos de los torneos de la academia (L8 Sport Murcia).
- Si la equipación de `IMG_2696` («New technical partner») es de la academia (hasta entonces no se usa).
- Los PDF oficiales de normativa siguen con el error del punto 6 (corregir en el original).
- Imágenes del túnel en 9:16 (1080 px de ancho o más) y revisión del prototipo en el móvil.

## Decisiones tomadas (no reabrir)

- Sin sombreados en ningún sitio: ni eco detrás de los logos, ni sombras bajo los trofeos (12 de noviembre de 2026).

- El teléfono de los PDF no se publica en ningún sitio de la web.
- La rama `mejoras-noche` no se fusiona.
- Yellow Cup con su logo (lleva el escudo del Villarreal CF; autorizado el 10 de noviembre de 2026).
- MyTeamInfo para la Cup de Barcelona (6–7 de febrero de 2027); desarrollo desde el 9 de diciembre de 2026
  (`docs/propuesta-myteaminfo.md`).

## Bugs / riesgos conocidos

- Lighthouse móvil de las fichas de torneo: el logo, grande y centrado, es el LCP y da 99 (LCP simulado 1,8 s,
  dentro de «bueno»). Decidido (12 de noviembre de 2026, noche): logo grande antes que el 100; con el logo al 46 %
  daba 100, pero se veía pequeño y descentrado. Escritorio: 100.
- La preinscripción ofrece torneos que no están en Torneos 2027 (ITE Football, Mare Nostrum Cup): son opciones del
  Google Form de la organización y se envían tal cual. Si sobran, quitarlas allí y `npm run formularios`.
- Formularios propios: si la organización cambia una pregunta de un Google Form, el formulario de la web enviaría
  campos que Google ya no espera. Tras cualquier cambio: `npm run formularios`, revisar el diff y publicar.
  `npm run formularios -- --comprobar` dice si alguno ha cambiado.
- Con `no-cors`, la web no puede leer la respuesta de Google: si un formulario se cierra («ya no acepta respuestas»),
  la web seguiría diciendo «enviada». Al cerrar un formulario, quitar su enlace o volver a leerlos.
- Logos y prendas sacados de los PDF: su resolución máxima es la del PDF (213–1151 px de ancho). Si la organización
  tiene los originales: `scripts/recortar-png.mjs` y después `node scripts/logos-torneos.mjs` (revisar si hace falta
  versión para fondo oscuro o claro y añadirla en VERSIONES).

## Ideas

- Paso en GitHub Actions que ejecute `npm run formularios -- --comprobar` cada día y avise si un formulario cambia.
- Túnel 3D/imágenes en `/cup/` (decidir si sustituye a la portada o va debajo) con el crédito «Imagen generada con IA».
- Traducciones a catalán e inglés cuando la organización las pase.
