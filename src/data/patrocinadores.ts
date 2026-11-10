/**
 * Patrocinadores de la Xbuyer Cup. El logo es un componente SVG (toma el color del texto) en src/components/logos/.
 * `principal`: se destaca en /cup/ y en la página de cada edición.
 */
export const patrocinadores = [
  {
    id: 'synergy',
    nombre: 'Synergy',
    nivel: 'principal' as const,
    instagram: 'synergy360.app',
  },
];

export const principal = patrocinadores.find((p) => p.nivel === 'principal') ?? null;
export const enlaceInstagram = (usuario: string) => `https://www.instagram.com/${usuario}/`;
