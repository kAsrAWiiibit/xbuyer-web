/**
 * Efecto eco de los logos (LogoEco.astro para los SVG; LogoTorneo.astro con `eco` para los PNG de los torneos):
 * 4 copias detrás del logo, en contorno, cada vez más transparentes, desplazadas en diagonal hacia arriba y a la
 * derecha siguiendo el trazo «/» de la X del monograma (51°). Aquí, lo que comparten los dos.
 */
/** De una copia a la siguiente, en anchos del logo */
export const PASO = 0.14;
const ANGULO = (51 * Math.PI) / 180;
/** La más lejana primero: queda debajo */
export const COPIAS = [4, 3, 2, 1];

/** Paso en % del ancho y del alto de la caja de la copia (`proporcion`: ancho / alto de la caja) */
export const pasos = (proporcion: number) => ({
  x: `${(PASO * Math.cos(ANGULO) * 100).toFixed(2)}%`,
  y: `${(-PASO * Math.sin(ANGULO) * proporcion * 100).toFixed(2)}%`,
});

/** Variables CSS de la caja: paso y retraso de la animación (en la portada espera al chute; en las demás, no) */
export const estiloEco = (proporcion: number, retraso: number) => {
  const p = pasos(proporcion);
  return `--paso-x: ${p.x}; --paso-y: ${p.y}; --eco-retraso: ${retraso}ms`;
};
