# Propuesta: MyTeamInfo (zona privada de cada equipo)

Estado: **propuesta, sin implementar**. Hace falta vuestro visto bueno, y las decisiones del final, antes de empezar.

## Qué es

Una zona con usuario y contraseña para cada equipo inscrito en la Xbuyer Cup. Cada equipo:

1. Entra con la cuenta que le damos nosotros (no hay registro abierto).
2. Elige su categoría, entre las de su edición.
3. Configura su **primera y segunda equipación** en un muñeco de jugador al que se le cambian los colores de
   camiseta, pantalón y medias.
4. Rellena su **plantilla** y la cambia hasta la fecha de cierre: altas, bajas, dorsales y el DNI de cada jugador.

Lo que guardan llega solo a la app del torneo: plantillas, dorsales y colores. Se acaban los Excel por equipo y el
`npm run plantillas`.

## Dónde vive

- **La pantalla:** una página de la web, `xbuyerteamacademy.com/equipos/`, que funciona en el navegador. Desde el
  móvil o el ordenador, sin instalar nada. Sigue siendo una web estática (Astro, GitHub Pages): la página habla
  directamente con Supabase, igual que la app.
- **Los datos:** **el mismo Supabase de la app del torneo**. La web no guarda nada por su cuenta.
- **Por qué no dentro de la app:** quien rellena la plantilla es el delegado, una vez y normalmente desde el
  ordenador. La app es para seguir el torneo. Más adelante se puede enlazar desde «Más».

## Datos (Supabase)

La app ya tiene `teams` (con `colors` primario y secundario), `players` (nombre visible tipo «Julián G.» y dorsal),
`profiles` (roles `admin` y `field_manager`) y `save_squad` (solo administrador). La propuesta amplía eso sin
romper lo que ya funciona.

| Tabla | Qué guarda | Quién la lee |
| --- | --- | --- |
| `profiles` | Nuevo rol `team` con su `team_id`: una cuenta = un equipo | Cada usuario, la suya |
| `teams` | Categoría elegida y `kits`: primera y segunda equipación, cada una con camiseta, pantalón y medias en hexadecimal. `colors` se rellena sola con la primera equipación, para que la app no cambie | Todos (como ahora) |
| `players` | Sin cambios: nombre visible y dorsal | Todos (como ahora) |
| `players_private` (nueva) | Nombre y apellidos completos, **DNI**, año de nacimiento si se pide | El equipo dueño y la organización. Nunca la app pública ni la web |
| `squad_changes` (nueva) | Historial de altas, bajas y cambios: quién y cuándo | La organización |
| `editions` o campos en `tournaments` | Fecha de cierre de plantillas y número máximo de jugadores por categoría | Todos |

## Seguridad

- **RLS en todas las tablas.**
  - Una cuenta `team` solo lee y escribe su equipo, sus jugadores y su `players_private`.
  - Lo hace a través de funciones `security definer` (`save_my_squad` y `save_my_kits`), igual que el `save_squad`
    actual.
  - Esas funciones comprueban dorsales del 0 al 99 sin repetir, máximo de jugadores, categoría válida y que no se
    haya pasado la fecha de cierre.
- **El DNI, en una tabla aparte** (`players_private`):
  - Sin `select` para `anon` ni para la app pública, y fuera de Realtime.
  - Solo lo ven el equipo dueño y el rol `admin`.
  - Nunca sale en la app ni en la web pública.
  - Dentro de la zona del equipo se enseña enmascarado (`****123A`) salvo al editarlo.
- **El DNI se borra tras el torneo:**
  - Una función programada (pg_cron en Supabase, o el script `npm run limpiar`) vacía los DNI X días después de la
    última fecha de la edición. Propuesta: 30 días, para reclamaciones y seguros.
  - Queda registrado en `squad_changes`.
- **Cuentas:**
  - Contraseñas que solo conoce el equipo: el primer acceso obliga a cambiarla.
  - Sesión que caduca y bloqueo tras varios intentos fallidos (Supabase Auth).
  - La clave de servicio nunca va en la web.
- **Comprobación automática:** pruebas de RLS en `supabase/tests/rls.test.sql`, como las que ya tiene la app, para
  comprobar que un equipo no puede leer otro equipo ni el DNI de otro.

## Cómo se crean las cuentas

- **Desde la línea de comandos:** `npm run usuario -- --email delegado@club.es --rol equipo --equipo madrid-alevin-3`.
  Es el script que ya existe, con un rol nuevo; o en lote desde una hoja con los inscritos.
- **Desde Gestión → Equipos:** un botón «Crear acceso» por equipo.
- **El usuario:** el email del delegado. La contraseña provisional se le envía por correo (o se la dais vosotros) y
  el primer acceso obliga a cambiarla.
- **Borrado:** al terminar la edición se borran las cuentas `team`, o se desactivan si el club repite.

## Cómo lo consulta la organización

- **En la app, en Gestión → Equipos:** cada equipo con su estado (sin plantilla / incompleta / completa), sus
  equipaciones en el muñeco y su plantilla con los DNI visibles solo para el administrador.
- **Exportar a Excel o PDF** para el seguro y el control de edad: un script, o un botón en Gestión. El archivo
  contiene datos personales: se descarga, no se guarda en ningún sitio compartido.
- **Avisos:** equipos sin plantilla a X días del cierre, y colores parecidos (ver abajo).

## Aviso de colores parecidos

- **Cuándo salta:** al guardar una equipación se compara la primera de cada equipo con la de los demás equipos de
  su categoría (o de su grupo, cuando haya grupos). La comparación usa la distancia de color perceptual (CIEDE2000)
  de la camiseta, y del pantalón con menos peso.
- **Qué ve el equipo:** si se parece mucho a la de otro, el aviso «Tu primera equipación se parece a la de otro
  equipo de tu categoría: revisa la segunda». No se dice el nombre del otro equipo.
- **Qué ve la organización:** en Gestión, la lista de choques posibles por partido. Así puede pedir la segunda
  equipación antes del torneo y marcar en el partido cuál lleva cada uno.

## El muñeco

- Una silueta de jugador en SVG con tres zonas (camiseta, pantalón, medias) que se pintan con el color elegido.
- **Colores:**
  - una paleta de colores de equipación habituales;
  - un selector libre;
  - un patrón opcional para la camiseta (lisa, rayas verticales, mitades), que se puede dejar para una segunda fase.
- Se ven la primera y la segunda una al lado de la otra.
- La app usa los mismos colores para pintar el equipo en el calendario y en los partidos.

## Cambios en la política de privacidad

La política (`src/data/legal/legal.json` en la web y `lib/privacy.ts` en la app) tendría que añadir:

- **Datos nuevos:**
  - datos de jugadores menores: nombre completo, DNI y año de nacimiento;
  - datos del delegado: email de la cuenta.
- **Finalidades y base legal:**
  - **Finalidad:** inscripción, control de edad, seguro médico y organización de los partidos.
  - **Base legal:** ejecución del contrato de inscripción con el club. Hay que confirmar con quien revise la
    política si para menores de 14 años hace falta además el consentimiento de los padres, y quién lo recoge (el
    club).
- **Plazo de conservación:** DNI borrados X días después del torneo, y el resto según la política.
- **Encargados del tratamiento:** Supabase (alojamiento, región UE) y el club como quien aporta los datos.
- **Qué no se publica nunca:** el DNI y el nombre completo. En la app solo sale el nombre visible («Julián G.»).

La política ya está marcada como borrador pendiente de revisión legal. Esto debería entrar en esa revisión.

## Trabajo que supone

| Parte | Esfuerzo |
| --- | --- |
| Migración Supabase (rol `team`, `kits`, `players_private`, `squad_changes`, funciones, RLS) y pruebas de RLS | 2 días |
| Página `/equipos/`: entrar, cambiar contraseña, categoría, plantilla (altas, bajas, dorsales, DNI) | 3 días |
| Muñeco de equipaciones y aviso de colores parecidos | 2 días |
| Gestión en la app: estado por equipo, plantilla con DNI, exportar | 2 días |
| Cuentas (script y botón), borrado programado de DNI, textos de privacidad | 1 día |
| Revisión en móvil y ordenador, accesibilidad, pruebas con un equipo de prueba | 1 día |
| **Total** | **unas 2 semanas** de trabajo, más la revisión legal |

Si hay prisa, una primera fase sin muñeco (colores elegidos de una lista) y sin exportar desde la app (solo
script) baja a una semana.

## Lo que tenéis que decidir

1. ¿Lo usamos ya en Madrid (2–4 de enero de 2027) y Barcelona (6–7 de febrero), o empezamos en la siguiente?
   Para Madrid iría muy justo.
2. ¿Qué datos de cada jugador pedimos además del DNI? ¿Año o fecha de nacimiento? ¿Foto? (Mejor que no.)
3. ¿Cuántos días se guardan los DNI después del torneo? (Proponemos 30.)
4. ¿Quién da las cuentas: vosotros a mano, o se crean al confirmar la inscripción?
5. ¿Fecha de cierre de plantillas por edición, y máximo de jugadores por categoría?
6. ¿Quién revisa la política de privacidad?
