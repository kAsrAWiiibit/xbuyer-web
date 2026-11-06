# Crítica de la vista previa (impeccable critique), 6 de noviembre de 2026

Method: dual-agent (A: revisión de diseño · B: detector y navegador), cada una en un subagente aislado.
Objetivo: https://kasrawiiibit.github.io/xbuyer-web-preview/ (`/`, `/academy/`, `/cup/`), con las mejoras de
interactividad de esta noche. Modo: Persuade.

## Puntuación (heurísticas de Nielsen)

| # | Heurística | Nota | Problema clave |
| --- | --- | --- | --- |
| 1 | Visibilidad del estado | 3 | El visor marca «1 / 5». En la tira de Madrid del móvil, cada foto llega sin revelar mientras se desliza |
| 2 | Relación con el mundo real | 4 | Marcador, campo reglamentario, balón, «Fuera de juego»: lenguaje de fútbol de verdad |
| 3 | Control y libertad | 3 | El cursor propio quita también el cursor de texto, incluso en las páginas legales |
| 4 | Consistencia y estándares | 2 | La placa con brillo en los torneos convierte una lista plana en una tarjeta brillante: fuera del cartel plano |
| 5 | Prevención de errores | 3 | Formulario `mailto` claro, opcionales marcados |
| 6 | Reconocer antes que recordar | 4 | Apartados siempre a la vista |
| 7 | Flexibilidad y eficiencia | n/a | Página de presentación |
| 8 | Estética y minimalismo | 3 | Hasta cinco efectos a la vez en una sección con ratón |
| 9 | Recuperación de errores | 3 | 404 propia |
| 10 | Ayuda | n/a | Página de presentación |
| **Total** | | **25/32** | **Bueno** |

## Especificidad del diseño

**Revisión (A):** hecha para esta marca, no de plantilla: portada partida, cartel condensado, corte XB, marcador
de estadio, campo reglamentario, cursor-balón. Lo que menos encaja es justo lo más «de tarjeta» de lo nuevo: la
inclinación 3D con brillo radial, sobre todo en los torneos del palmarés.

**Detector (B):** `impeccable detect` sobre `src/pages`, `src/components` y `src/layouts`: 1 aviso, `broken-image` en
`src/components/Visor.astro:15` (la imagen del visor no tiene `src` hasta que se abre): falso positivo. El overlay en
el navegador (build local, `/`, `/academy/` y `/cup/` a 1440 y 390): «No anti-patterns found». Sobre la vista previa
pública no se pudo inyectar (Chrome bloquea https → localhost). El inspector de taste-skill confirmó **scroll lateral
de 6 px en `/academy/` a 390** (lo provocan la placa y el brillo de los torneos) y avisó de texto tapado en el palmarés
(el brillo queda por encima del texto). El resto de sus avisos (cuerpo de 14 px en el pie, h1 oculto en la portada,
portada sin fotos, créditos tomados por «antetítulos») son decisiones de la dirección o falsos positivos.

Las dos evaluaciones coinciden: el problema principal es la placa con brillo de los torneos.

## Lo que funciona

1. La transición entre páginas: el bloque de color de la portada se convierte en la página. Es el mejor momento.
2. El movimiento «de una vez»: marcador que rueda, campo que se traza, títulos por palabras con aire para las tildes.
3. Accesibilidad: salto al contenido, foco visible, visor con nombre y foco en Cerrar, fotos ampliables enfocables,
   «Reducir movimiento» limpio (sin palabras partidas, sin cursor, solo fundidos).

## Problemas prioritarios

1. **[P1] Scroll lateral de 6 px en `/academy/` en el móvil.** La placa y el brillo de `.torneo` sobresalen 22 px.
   Arreglo: placa solo con ratón y dentro del margen; brillo fuera de los torneos.
2. **[P1] Torneos del palmarés: placa con brillo radial, fuera de la dirección.** Arreglo: inclinación 3D más
   corta (se pidió «trofeos con efecto 3D»), placa plana de un solo color dentro de la columna, sin brillo, solo con
   ratón.
3. **[P2] Inclinación de las fotos demasiado fuerte y brillo que lava la foto.** Arreglo: 3,5° como mucho, sin
   escala, brillo más leve; al tocar, sin hundimiento.
4. **[P2] El cursor propio quita el cursor de texto y tapa la foto.** Arreglo: sin cursor propio en las páginas
   legales y en el contacto; sobre las fotos, un aro con «+» sin relleno.
5. **[P2] En `/cup/` a 1440 × 900 el botón y la cuenta atrás quedan bajo el pliegue.** Arreglo: ajustar solo el
   tamaño del título y los espacios de la portada.

## Alertas por persona

- **Familia en el móvil con datos:** la página «baila» 6 px de lado en Academy; en la tira de Madrid cada foto se
  revela al llegar, como si cargase lenta.
- **Coordinador de club en escritorio:** el botón de la Cup bajo el pliegue; el nombre «Campo de Fútbol Sant
  Gregori» cruzado por el círculo central del campo; no ve el cursor de texto para copiar el email.
- **Teclado o lector de pantalla:** los títulos partidos en palabras pueden leerse palabra a palabra en VoiceOver.
  Arreglo: `aria-label` con el mismo texto en el título y las palabras ocultas a lectores.

## Observaciones menores

- «SUBCAMPEONATO» toca los bordes de su celda a 390 px.
- Imán y cursor sobre el mismo botón se solapan: el imán, más corto.
- El giro del monograma al pasar es el nivel de efecto que debería tener todo.

## Preguntas

- Si la dirección es cartel plano, ¿por qué lo más visible es profundidad 3D con brillo?
- El listón es la transición entre páginas, sin JavaScript: ¿qué aguanta la comparación?
- El público está en el móvil: ¿merece el cursor-balón quitar el cursor del sistema a quien usa ratón?

Questions skipped: el encargo pide trabajar toda la noche sin preguntas. Las decisiones se tomaron con el criterio
«si dudas, menos» (ver `docs/informe-noche.md`) y las preguntas abiertas van a `docs/reunion-propuestas.md`.
