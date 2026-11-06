# Reunión con la organización: lo que ha cambiado y lo que podríamos añadir

**Vista previa para enseñar desde el móvil:** https://kasrawiiibit.github.io/xbuyer-web-preview/

Es una copia de prueba: Google no la indexa y la web oficial (https://xbuyerteamacademy.com) sigue igual hasta que
deis el visto bueno.

## 1. Qué ha cambiado esta noche

Las páginas, las secciones, el orden y los textos son los mismos. Lo que cambia es cómo se siente al usarla.

| Dónde | Qué hace ahora | En el móvil |
| --- | --- | --- |
| Toda la web | Los títulos de cada sección entran palabra a palabra al llegar a ellos; el resto, con un fundido suave | Igual |
| Toda la web | Al pasar de la portada a Academy o a la Cup, el bloque amarillo o azul se convierte en la página (transición entre páginas) | Igual (Chrome y Safari recientes) |
| Toda la web, con ratón | Cursor propio: un balón pequeño que rueda y un aro que crece sobre enlaces y fotos | No aparece |
| Botones, con ratón | Se acercan un poco al puntero (efecto imán) | No aplica |
| Fotos | Se revelan con el corte diagonal de la X; al pasar el ratón se inclinan en 3D con un brillo | Se inclinan un poco al tocarlas |
| Fotos de Madrid 2025 y equipación «Nueva piel» | Se amplían al pulsarlas, con flechas para pasar de una a otra (también con el teclado) | Se amplían y se pasan deslizando el dedo; las de Madrid forman una tira que se desliza |
| Palmarés | El marcador parece de estadio: bombillas que se encienden al acabar de contar y la línea de las fichas. Los torneos se iluminan como una placa al pasar el ratón | El marcador cuenta al llegar; los torneos responden al tocar |
| Categorías y sedes (Cup) | Las líneas del campo se dibujan y aparece un balón que sigue al ratón por el campo | El balón va donde se toca |
| Fotos de la portada de la Cup y de Madrid | Se desplazan un poco dentro de su marco al hacer scroll (profundidad) | Igual |

Para quien tenga activado «Reducir movimiento» en el móvil u ordenador: no hay cursor, inclinaciones, imanes,
desplazamientos ni transiciones con movimiento; solo fundidos. Todo se puede usar con el teclado y nada depende
del ratón.

**Velocidad:** la web sigue cargando rápido en el móvil con datos (Lighthouse 97–100 en rendimiento y 100 en
accesibilidad; tabla completa en `docs/informe-noche.md`). El código nuevo pesa unos 4 KB comprimido.

## 2. Qué tienen las webs grandes que nosotros no

Comparada con Gothia Cup, Dana Cup (torneos internacionales de fútbol base), Real Madrid y Atlético de Madrid
(clubes), y Nike, adidas y la Kings League (marcas y liga). Detalle en `docs/referencias.md`.

| Tienen | Quién | Nosotros |
| --- | --- | --- |
| Cifras del torneo (equipos, países, partidos, campos) | Gothia, Dana | Solo «60 equipos» en Torrent; las cifras de ediciones anteriores están pendientes |
| Inscripción online del equipo | Gothia, Dana | No: se escribe por correo |
| Noticias o crónicas | Todos | No |
| Galería por torneo y vídeos (resumen, final) | Gothia («Gothia Play»), Real Madrid, Kings League | Una galería (Madrid 2025) y la equipación |
| Directo y resultados en vivo | Dana, Kings League | La retransmisión existe (está en «Qué incluye»), pero la web no la enlaza |
| App con calendario y resultados | Gothia, Dana | La app existe; faltan los enlaces de las tiendas |
| Tienda o compra de la equipación | Atlético, Real Madrid, Nike, adidas | No |
| Boletín por correo | Gothia | No |
| Patrocinadores | Gothia, Dana, clubes | No (el patrocinador oficial está pendiente) |
| Testimonios (jugadores, familias, entrenadores) | Gothia | No |
| Varios idiomas | Gothia (inglés y sueco), Dana, clubes | Solo castellano (preparada para valenciano/catalán e inglés) |
| Información práctica (alojamiento, cómo llegar, normas) | Gothia, Dana | «Cómo llegar» a cada sede de Torrent |

## 3. Propuestas

Rápida: se hace en un día o menos cuando tengamos el material. Media: unos días. Costosa: semanas o un servicio
de pago.

| Propuesta | Qué aporta | Qué necesitamos de vosotros | Esfuerzo |
| --- | --- | --- | --- |
| **Enlaces de la app** (App Store y Google Play) | La sección de la app ya está hecha y oculta; aparece en cuanto haya enlaces | Los dos enlaces | Rápida |
| **Cifras de ediciones anteriores** | El dato que más convence a un club que duda («X equipos, Y partidos») | Equipos, partidos, categorías y familias de cada edición | Rápida |
| **Galería por torneo** | Que cada torneo del palmarés y cada edición de la Cup tenga sus fotos, con el visor nuevo | Fotos por torneo, con autor y permiso; sin primeros planos de niños sin autorización | Rápida (si hay fotos) |
| **Directo y vídeos** | Enlazar la retransmisión (YouTube, Twitch o Instagram) y un resumen de cada edición | Dónde se emite y los vídeos, con permiso | Rápida para enlazar; media para tener vídeos propios en la web |
| **Patrocinadores** | Visibilidad para quien paga y confianza para las familias | Logos en buena calidad y permiso para usarlos | Rápida |
| **Inscripción online** | Que un club se apunte desde el móvil sin escribir un correo | Qué datos pedís, precio, plazos, cómo se paga, quién recibe las inscripciones y la política de privacidad revisada | Media (formulario que envía un correo); costosa con pago online |
| **Información práctica de cada edición** | Menos preguntas por correo: horarios, normas, alojamiento, aparcamiento | Esos datos de cada sede | Rápida por edición |
| **Noticias o crónicas** | Contenido vivo: resultados, campeones de cada categoría | Alguien que las escriba con regularidad (o pasarnos textos y fotos) | Media; luego, mantenimiento |
| **Testimonios** | Voces de familias, jugadores o clubes | Frases reales con nombre y permiso | Rápida |
| **Newsletter** | Avisar de nuevas ediciones a quien ya vino | Elegir servicio (Mailchimp, Brevo…) y quién la envía; texto legal de consentimiento | Media |
| **Tienda de la equipación** | Vender la «Nueva piel» a familias | Si se vende, precios, tallas, envíos, quién gestiona los pedidos y si Adidas lo permite | Costosa (o rápida si es un enlace a una tienda que ya exista) |
| **Valenciano/catalán e inglés** | Clubes de Cataluña y la Comunitat Valenciana, y equipos de fuera | Los textos traducidos (o el visto bueno a una traducción que preparemos y reviséis) | Media |
| **Resultados en vivo en la web** | Lo que hacen Dana y la Kings League | Ya lo hará la app; en la web, solo si la app publica los datos | Costosa |

Nuestra recomendación para empezar: enlaces de la app, cifras, fotos por torneo y el directo. Son rápidas y son lo
que más mira una familia o un club antes de decidir.

## 4. Preguntas y datos que faltan

Nada de esto se ha inventado: mientras falte, la web no lo enseña.

**Palmarés**
- Costa Daurada Cup: año y categoría de los otros 14 títulos (solo consta 2025, B12).
- Copa UNIQ Andorra: categoría y años de los otros títulos (solo consta 2026).
- MADCUP: categoría (consta 2025, masculino).
- Donosti Cup: año y categoría.
- Fotos de los torneos de la academia (las de L8 Sport Murcia): ¿nos las podéis pasar, con permiso de las
  familias para las que salgan niños reconocibles?

**Xbuyer Cup**
- Cifras de ediciones anteriores (equipos, partidos, categorías).
- Sedes de Madrid (2, 3 y 4 de enero de 2027) y Barcelona (6 y 7 de febrero de 2027).
- Fechas exactas de Barcelona de junio de 2025 (consta «desde el 28 de junio»).
- Enlaces de la app en App Store y Google Play.
- Dónde se ve la retransmisión en directo.
- Patrocinador oficial.

**Equipación**
- Autoría de las imágenes de la «Nueva piel» (ahora se acreditan a Xbuyer Team Academy).
- ¿Podemos usar el logo de Adidas? Ahora la marca solo sale escrita.
- La equipación de la imagen «New technical partner» (la que pone «XBUYER TEAM» y lleva la corona): ¿es de la
  academia? Hasta saberlo no se usa.

**Entidad y legales**
- Número de inscripción en el registro de asociaciones (va en el pie y en el aviso legal).
- Revisión legal de la política de privacidad (sigue marcada como borrador).
- Actualizar las fichas de App Store y Google Play con las URL nuevas de privacidad, soporte y eliminación de datos
  (`https://xbuyerteamacademy.com/soporte/#eliminar-datos`).

**Para decidir en la reunión**
- ¿Publicamos las mejoras de esta noche en la web oficial?
- El túnel animado de la Cup (prototipo): ¿sustituye a la portada de `/cup/` o va debajo? Faltan las imágenes en
  vertical (9:16) para el móvil.
- ¿Qué propuestas de la lista hacemos primero?
