/**
 * Resumen del «Protocolo y normativa oficial» de la Xbuyer Cup (contenido/normativa/normativa-<edición>.pdf; el PDF
 * que se descarga está en public/normativa/). Los tres reglamentos son iguales salvo las categorías y la duración de
 * los partidos, que van en cada edición (src/data/cup-ediciones.ts).
 *
 * En el punto 6 de los PDF, «Sorteo realizado por la organización» lleva pegada por error la frase «Puntos obtenidos
 * en los enfrentamientos directos»: aquí no está.
 */
export const normativa = [
  {
    titulo: 'Sustituciones',
    puntos: [
      'Hasta 3 cambios por parte. Los que no se usan no pasan a la siguiente.',
      'En el descanso se puede cambiar sin que cuente en el límite.',
      'Siempre con el balón parado y avisando antes al árbitro.',
    ],
  },
  {
    titulo: 'Arbitraje y reglas de juego',
    puntos: [
      'Árbitros designados por la organización. Sus decisiones son definitivas.',
      'Se juega con la normativa de la RFEF (fuera de juego, faltas, sanciones y reanudaciones), con las adaptaciones del torneo.',
    ],
  },
  {
    titulo: 'Puntuación en la fase de grupos',
    puntos: ['Victoria: 3 puntos.', 'Empate: 1 punto.', 'Derrota: 0 puntos.'],
  },
  {
    titulo: 'Desempates, por orden',
    orden: true,
    puntos: [
      'Diferencia general de goles.',
      'Más goles a favor.',
      'Menos goles en contra.',
      'Puntos en los enfrentamientos directos.',
      'Clasificación de fair play.',
      'Sorteo realizado por la organización.',
    ],
  },
  {
    titulo: 'Eliminatorias',
    puntos: ['Si hay empate al final del tiempo reglamentario, tanda de 3 penaltis por equipo.', 'Si sigue el empate, muerte súbita.'],
  },
  {
    titulo: 'Disciplina y fair play',
    puntos: [
      'Tarjeta amarilla: advertencia.',
      'Tarjeta roja: expulsión directa; el jugador no juega el siguiente partido.',
      'La organización puede sancionar conductas graves o repetidas, hasta con la expulsión del torneo.',
      'Se exige respeto a jugadores, entrenadores, delegados y público.',
    ],
  },
  {
    titulo: 'Protocolo',
    puntos: [
      'Llegar a la instalación al menos 30 minutos antes del partido.',
      'Todos los jugadores, identificados.',
      'Espinilleras obligatorias.',
      'La organización no se responsabiliza de los objetos personales.',
      'Participar implica aceptar la normativa; lo que no esté previsto lo resuelve la organización.',
    ],
  },
];
