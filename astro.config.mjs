import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://pierre.dev', // ← troque pelo seu domínio
  integrations: [sitemap()],
  output: 'static', // Cloudflare Pages → static build
});
