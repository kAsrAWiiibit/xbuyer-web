# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro, salida estática, desplegada en GitHub Pages con dominio propio ([pendiente: dominio]) mediante GitHub Actions. Sin servicios externos ni backend.

## Qué es

Web de **Xbuyer Team Academy**: la selección que compite en torneos de fútbol base (desde la temporada 2022-23) y organiza la **Xbuyer Cup**. No es una escuela: no hay entrenamientos regulares, sede fija ni inscripción abierta; se forma para cada torneo. Los datos (palmarés, ediciones de la Cup, qué incluye la inscripción) están en `contenido/textos.md`.

La entidad titular, **Associació Esportiva Xbuyer 2026** (NIF G27654011, C/ Rosa Luxemburgo, 11, 1º 3ª, 08840 Viladecans (Barcelona), aexbuyer2026@gmail.com), solo aparece en el pie y en las páginas legales, nunca como título. Los hermanos Buyer solo aparecen como parte de lo que hace especial a la Cup.

Estructura: portada con dos caminos (Academy en amarillo, Cup en azul), `/academy/` (quiénes somos, palmarés, contacto), `/cup/` (edición principal de Torrent, qué la hace diferente, qué incluye la inscripción, próximas y anteriores ediciones, contacto) y las páginas legales.

## Usuarios

- Academy: familias y clubes que quieren conocer la selección y su trayectoria.
- Cup: familias, jugadores y clubes que consultan fechas, sedes, categorías y la app, casi siempre desde el móvil.
- Apple / Google: revisores que comprueban los datos de la entidad, el aviso legal, la privacidad y el soporte de la app.

## Reglas de contenido

- Textos: todos salen de `contenido/textos.md`, que la web lee al compilar (`src/lib/textos.ts`). Lo marcado `[pendiente]` no se publica. Nada se inventa. Fuera de ese archivo solo están los datos legales de la entidad (`src/data/entidad.ts`) y los textos de interfaz (`src/i18n/ui.ts`).
- Fotos: solo las de la organización, en `contenido/fotos/`. Eric Leiro (Xbuyer Cup Madrid 2025) en /cup/; L8 Sport Murcia (torneos de la academia) en «La selección». Crédito visible, optimizadas, sin metadatos de ubicación; ambiente, celebraciones, equipos y acción. Nada de primeros planos de menores reconocibles sin autorización (van a `contenido/fotos/revisar/`). Nunca fotos de niños de bancos de imágenes.
- Política de privacidad y soporte: una sola fuente, `lib/privacy.ts` / `lib/publicPages.ts` del proyecto de la app; la web integra esos textos tal cual (incluida la marca «Borrador pendiente de revisión legal» y «Eliminar mis datos»). El aviso legal se redacta en la web.
- Contacto: `mailto:` a aexbuyer2026@gmail.com con asunto según la marca, y plan B visible (copiar email, copiar mensaje, Instagram). No se guarda nada.

## Marca

- Colores: azul #1863B8, amarillo #FFED00, azul marino #0C0433. Sobre amarillo, el texto siempre en marino.
- Logos: monograma XB de `contenido/logos/`. Las coronas no se usan hasta que la organización lo confirme. El banner con degradado no se usa en la web.
- Dirección visual: cartel plano (colores planos, tipografía grande, corte diagonal XB), con orden: pocas secciones, una idea por bloque, poco movimiento.

## Idiomas

Castellano principal; catalán segundo; inglés tercero. La estructura está preparada, pero ninguna traducción se publica hasta que la organización la proporcione.

## Accesibilidad

WCAG 2.2 AA, móvil primero, `prefers-reduced-motion` respetado.

## Pendiente fuera de la web

- Al publicar con el dominio: redirigir `https://kasrawiiibit.github.io/xbuyer-cup-privacidad/` y `/soporte/` a las nuevas URL, actualizar `privacy.url` y `contact.support` en la configuración de la app y las fichas de App Store y Google Play.
