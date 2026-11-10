// Dominio propio de la web (sin https://). La build escribe el CNAME para GitHub Pages y usa este
// dominio en las URL canónicas, el sitemap y las imágenes para compartir.
// Mientras el DNS no apunte a GitHub Pages, el despliegue se hace con SIN_DOMINIO=1 (variable del
// repositorio): la web se sirve en https://<usuario>.github.io/<repositorio>/ con esa ruta base.
export const DOMINIO_PROPIO = 'xbuyerteamacademy.com';
// Vista previa (VISTA_PREVIA=1 con SITE_URL y BASE_PATH): build fuera de buscadores para publicarla aparte
export const VISTA_PREVIA = process.env.VISTA_PREVIA === '1';
export const DOMINIO = process.env.SIN_DOMINIO === '1' || VISTA_PREVIA ? null : DOMINIO_PROPIO;
