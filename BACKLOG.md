# BACKLOG

> **RESUME HERE** (11 de noviembre de 2026): los cambios aprobados por los dueños están publicados en
> https://xbuyerteamacademy.com (rama `cambios-reunion` fusionada en `main`; vista previa borrada). Siguiente:
> enlaces de los Google Form de la Cup Madrid y Barcelona (pegarlos en `formulario:` de `src/data/cup-ediciones.ts`,
> `npm run formularios`, build y revisar el bloque `#inscripcion`). Ver «Pendiente de la organización».

## Pendiente de la organización

- Google Form de la Xbuyer Cup **Madrid** y **Barcelona** (mientras, botón de email; el bloque integrado ya está).
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

- El teléfono de los PDF no se publica en ningún sitio de la web.
- La rama `mejoras-noche` no se fusiona.
- Yellow Cup con su logo (lleva el escudo del Villarreal CF; autorizado el 10 de noviembre de 2026).
- MyTeamInfo para la Cup de Barcelona (6–7 de febrero de 2027); desarrollo desde el 9 de diciembre de 2026
  (`docs/propuesta-myteaminfo.md`).

## Bugs / riesgos conocidos

- Formularios propios: si la organización cambia una pregunta de un Google Form, el formulario de la web enviaría
  campos que Google ya no espera. Tras cualquier cambio: `npm run formularios`, revisar el diff y publicar.
  `npm run formularios -- --comprobar` dice si alguno ha cambiado.
- Con `no-cors`, la web no puede leer la respuesta de Google: si un formulario se cierra («ya no acepta respuestas»),
  la web seguiría diciendo «enviada». Al cerrar un formulario, quitar su enlace o volver a leerlos.
- Logos y prendas sacados de los PDF: su resolución máxima es la del PDF (225–1197 px de ancho). Si la organización
  tiene los originales, sustituirlos con `scripts/recortar-png.mjs`.

## Ideas

- Integrar también la preinscripción (`/academy/preinscripcion/`, hoy enlace al Google Form) con el mismo componente.
- Paso en GitHub Actions que ejecute `npm run formularios -- --comprobar` cada día y avise si un formulario cambia.
- Túnel 3D/imágenes en `/cup/` (decidir si sustituye a la portada o va debajo) con el crédito «Imagen generada con IA».
- Traducciones a catalán e inglés cuando la organización las pase.
