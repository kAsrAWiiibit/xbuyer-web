/**
 * Equipaciones 2026/2027 («Nueva piel», en /academy/#equipacion). Cada pieza tiene su hueco de foto en
 * src/data/fotos.json (equipacion-<id>, y equipacion-<id>-espalda si hay espalda). Los extras opcionales llevan su
 * imagen del catálogo de la academia (src/fotos/equipacion/) y su precio en euros.
 */
export const piezas = [
  { id: 'jugador', nombre: 'Jugador/a', descripcion: 'Camiseta amarilla, pantalón y medias azules' },
  { id: 'portero', nombre: 'Portero/a', descripcion: 'Camiseta rosa, pantalón y medias negras' },
  { id: 'paseo', nombre: 'Paseo', descripcion: 'Polo y pantalón azul marino' },
] as const;

export const extras = [
  { id: 'sudadera', nombre: 'Sudadera', precio: 30, imagen: 'equipacion/sudadera.png', alt: 'Sudadera azul marino de cremallera corta con el logo de Adidas y el monograma XB en blanco' },
  { id: 'mochila', nombre: 'Mochila', precio: 35, imagen: 'equipacion/mochila.png', alt: 'Mochila azul marino con las tres franjas de Adidas y el monograma XB en blanco' },
] as const;
