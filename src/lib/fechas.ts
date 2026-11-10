/** Fechas en castellano a partir de ISO (AAAA-MM-DD), sin depender de la zona horaria de quien construye */
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

const partes = (iso: string) => {
  const [a, m, d] = iso.split('-').map(Number);
  return { a, m, d, semana: new Date(Date.UTC(a, m - 1, d)).getUTCDay() };
};

/** «21–25 de marzo de 2027», «27 de junio – 2 de julio de 2027»; sin año: «21–25 de marzo» */
export function rango(inicio: string, fin: string, { anio = true } = {}) {
  const i = partes(inicio), f = partes(fin);
  const cola = anio ? ` de ${f.a}` : '';
  if (inicio === fin) return `${i.d} de ${MESES[i.m - 1]}${cola}`;
  if (i.m === f.m && i.a === f.a) return `${i.d}–${f.d} de ${MESES[f.m - 1]}${cola}`;
  return `${i.d} de ${MESES[i.m - 1]} – ${f.d} de ${MESES[f.m - 1]}${cola}`;
}

/** «Domingo, 21 de marzo» */
export function dia(iso: string) {
  const p = partes(iso);
  const nombre = DIAS[p.semana];
  return `${nombre.charAt(0).toUpperCase()}${nombre.slice(1)}, ${p.d} de ${MESES[p.m - 1]}`;
}

export const anio = (iso: string) => partes(iso).a;

/** «595 €» */
export const euros = (n: number) => `${n.toLocaleString('es-ES')} €`;
