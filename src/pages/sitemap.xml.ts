// src/pages/sitemap.xml.ts
// Gerado no build para o lastmod acompanhar o último commit que mexeu no site.
// Se surgir página nova, acrescente em `paginas`.
import { execSync } from 'node:child_process';
import type { APIRoute } from 'astro';

const paginas = ['/', '/en/'];
const idiomas = { 'pt-BR': '/', en: '/en/' };

function ultimaAlteracao() {
  try {
    const data = execSync('git log -1 --format=%cs -- src public', { encoding: 'utf8' }).trim();
    if (data) return data;
  } catch {
    // sem git no ambiente de build: cai na data de hoje
  }
  return new Date().toISOString().slice(0, 10);
}

export const GET: APIRoute = ({ site }) => {
  const lastmod = ultimaAlteracao();
  const alternativas = Object.entries(idiomas)
    .map(([lang, path]) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${new URL(path, site)}" />`)
    .join('\n');
  const urls = paginas
    .map(path => `  <url>\n    <loc>${new URL(path, site)}</loc>\n    <lastmod>${lastmod}</lastmod>\n${alternativas}\n  </url>`)
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
