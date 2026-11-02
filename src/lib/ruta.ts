/** Rutas internas con la base del sitio (GitHub Pages sin dominio la sirve en /repositorio/) */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
export const ruta = (path: string) => `${BASE}${path}`;
