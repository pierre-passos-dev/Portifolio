import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://pierrepassos.dev',
  output: 'static',
  // 'preserve' gera en/404.html (e não en/404/index.html), que é o arquivo
  // que o Cloudflare Pages procura para erros dentro de /en
  build: { format: 'preserve' },
});
