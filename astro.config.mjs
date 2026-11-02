import { defineConfig } from 'astro/config';

import pendientes from './integraciones/pendientes.mjs';
import { DOMINIO } from './src/data/sitio.mjs';

// Sin dominio, GitHub Pages sirve la web en usuario.github.io/repositorio/: el flujo de despliegue
// pasa esa ruta en BASE_PATH y la URL en SITE_URL.
export default defineConfig({
  site: DOMINIO ? `https://${DOMINIO}` : process.env.SITE_URL,
  base: DOMINIO ? '/' : (process.env.BASE_PATH ?? '/'),
  trailingSlash: 'always',
  // El estilo de una página llega a los componentes a los que pasa class (Foto, Monograma)
  scopedStyleStrategy: 'class',
  // Castellano en la raíz; catalán (/ca/) e inglés (/en/) cuando la organización pase las traducciones
  i18n: { defaultLocale: 'es', locales: ['es', 'ca', 'en'], routing: { prefixDefaultLocale: false } },
  integrations: [pendientes()],
});
