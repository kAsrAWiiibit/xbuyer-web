# Referencias: qué hacen las webs grandes del nicho y qué nos llevamos

Noche del 6 de noviembre de 2026. Se abrieron en un Chrome sin cabeza a 1440 y 390 px, con capturas al cargar y
tras dos tramos de scroll, y se miró el código (librerías, carruseles, vídeo, cursores, View Transitions).

| Web | Tipo | Cómo se estudió |
| --- | --- | --- |
| Gothia Cup (gothiacup.se) | Torneo internacional de fútbol base | Abierta y capturada |
| Dana Cup (danacup.dk) | Torneo internacional de fútbol base | Abierta y capturada |
| Real Madrid (realmadrid.com) | Club de primera | Abierta y capturada |
| Atlético de Madrid (atleticodemadrid.com) | Club de primera | Abierta y capturada |
| Nike Fútbol (nike.com/es) | Marca deportiva | Abierta (tapada por el aviso de cookies) |
| Kings League (kingsleague.pro) y adidas Fútbol (adidas.es) | Liga y marca deportiva | **No se pudieron abrir**: las dos bloquean los navegadores automáticos (Cloudflare y Akamai). Lo que se anota de ellas es de memoria y va marcado así. |

## Qué usan

**Gothia Cup.** El mismo esquema que nosotros: título condensado en dos colores («GOTHIA / CUP» en blanco y
amarillo) sobre una foto a sangre, las fechas y la ciudad, y dos botones. Debajo, cifras que cuentan (equipos,
naciones, partidos, campos), tarjetas con foto, una franja de accesos rápidos, noticias, vídeos («Gothia Play»),
testimonios, hotel, boletín y patrocinadores. Carruseles por todas partes (23 en la portada). En el día de la
captura las cifras salían a 0: un contador que depende del script y falla se ve peor que un número quieto.

**Dana Cup.** Vídeo de fondo en la portada, cuenta atrás grande con días, horas, minutos y segundos, cuatro
botones verdes (directo, inscripción, precios, acceso de equipos), una cinta de patrocinadores que se desliza
y un bloque de la app con el móvil. Mucho contenido, poca jerarquía: todos los botones pesan lo mismo.

**Real Madrid.** Tarjetas de noticias con esquinas redondeadas que se amplían un poco al pasar el ratón, la foto
dentro se mueve más que el marco. Carruseles que se arrastran con el dedo (98 elementos de carrusel en la
portada). Tienda, entradas y vídeo propio en el menú.

**Atlético de Madrid.** Titulares de cartel condensados, carrusel de noticias que se arrastra con la última
tarjeta cortada en el borde (invita a deslizar), pestañas en el calendario de entradas, la equipación nueva con
su propio bloque y botón de compra, «Hazte socio».

**Nike Fútbol.** Fotografía de producto a pantalla completa, rejilla de productos que cambia de foto al pasar
el ratón, carrusel de categorías con flechas. Movimiento casi nulo: el premium sale de la foto y del espacio.

**Kings League (de memoria).** Identidad muy gráfica: tipografía condensada enorme, colores planos, tarjetas de
equipos y presidentes, marcadores y clasificación siempre a mano, el directo (Twitch) en primer plano.

**adidas Fútbol (de memoria).** Campañas con vídeo a pantalla completa, titulares de una o dos palabras,
recortes de producto que se superponen a la foto, carruseles de producto que se arrastran.

## Lo que encaja con nuestro cartel plano y lo que aplico esta noche

| Recurso | Dónde lo vimos | Cómo lo aplicamos | Por qué |
| --- | --- | --- | --- |
| Foto que se mueve dentro de su marco (parallax interior) | Real Madrid, adidas | La foto se desplaza unos píxeles dentro del corte XB al hacer scroll; con CSS (`animation-timeline`), sin JavaScript | Da profundidad sin mover la página ni secuestrar el scroll |
| Tarjetas que reaccionan al ratón | Real Madrid, Nike | Inclinación 3D suave de las fotos y de los torneos del palmarés con un brillo leve; en el móvil, al tocar | Hace las fotos «tocables»; en pantallas táctiles no esconde nada |
| Galería que se arrastra con el dedo | Atlético, Real Madrid | En el móvil, las fotos de Madrid 2025 pasan a una tira que se desliza (scroll nativo con imán); en todas, ampliar al pulsar | Cuatro fotos en columna eran cuatro pantallas de scroll |
| Cifras de marcador | Gothia Cup, Dana Cup | Nuestro marcador del palmarés, más de estadio: bombillas que se encienden al acabar de rodar y la bisagra de las fichas | Ya lo teníamos y es nuestro; el de Gothia enseña que el número final tiene que estar en el HTML |
| Titulares de cartel que entran por palabras | Kings League, adidas | Los títulos de sección suben palabra a palabra desde una máscara | Es el ritmo de un cartel que se pega; con «Reducir movimiento», fundido |
| Transición entre páginas | Ninguno lo hace bien (recargas en blanco) | View Transitions nativas: el bloque amarillo o azul de la portada se convierte en la portada de `/academy/` o `/cup/` | Une los dos caminos de la portada con su página; cero JavaScript |
| Detalles de fútbol | Kings League (marcadores), Dana Cup (balón en el logo) | Líneas del campo que se dibujan (ya estaban), el cursor como un balón pequeño que rueda, los cuadrados de las listas que giran al entrar | Personalidad de fútbol sin ilustraciones ni plantillas |

## Lo que no aplico, y por qué

- **Vídeo de fondo en la portada** (Dana Cup, adidas): no tenemos vídeo y pesaría varios megas en el móvil.
- **Carruseles automáticos** (Gothia, Real Madrid): esconden contenido y se mueven sin que nadie lo pida.
- **Cuenta atrás con segundos** (Dana Cup): ya tenemos «Faltan N días», que es lo que importa; los segundos son
  ruido que repinta la página cada segundo.
- **Cinta de patrocinadores en movimiento** (Dana Cup): no hay patrocinadores confirmados (`textos.md`).
- **Esquinas redondeadas y sombras** (Real Madrid, Dana Cup): chocan con el cartel plano.
- **Scroll suavizado con librería** (Lenis y similares): cambia el tacto de la rueda y del dedo.

Lo que tienen ellas y nosotros no (noticias, tienda, vídeos, directo, boletín, idiomas…) va en
`docs/reunion-propuestas.md`, para hablarlo con la organización.
