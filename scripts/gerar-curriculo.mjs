// scripts/gerar-curriculo.mjs
// Gera o currículo em PDF (PT e EN) a partir dos mesmos dados do site, para os dois
// nunca ficarem diferentes. Rode depois de mudar projetos, experiência ou habilidades:
//
//   npm run curriculo
//
// Na primeira vez, baixe o Chromium usado na renderização: npx playwright install chromium
// Saída: public/curriculo-pierre-passos.pdf e public/resume-pierre-passos.pdf

import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import { projects } from '../src/data/projects.ts';
import { experiences } from '../src/data/experience.ts';
import { coreSkills, currentSkills } from '../src/data/skills.ts';
import { ui } from '../src/i18n/translations.ts';

const publicDir = fileURLToPath(new URL('../public/', import.meta.url));

const labels = {
  pt: {
    file: 'curriculo-pierre-passos.pdf',
    role: 'Desenvolvedor Full Stack',
    location: 'Curitiba, PR',
    summary: 'Resumo',
    core: 'Principais tecnologias',
    experience: 'Experiência',
    projects: 'Projetos selecionados',
    skills: 'Outras tecnologias',
    education: 'Formação',
    course: 'Análise e Desenvolvimento de Sistemas',
  },
  en: {
    file: 'resume-pierre-passos.pdf',
    role: 'Full Stack Developer',
    location: 'Curitiba, Brazil',
    summary: 'Summary',
    core: 'Core technologies',
    experience: 'Experience',
    projects: 'Selected projects',
    skills: 'Other technologies',
    education: 'Education',
    course: 'Systems Analysis and Development',
  },
};

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// A descrição da experiência é texto com parágrafos e linhas "• ". Vira parágrafo + listas.
function experienceBody(text) {
  return text.split('\n\n').map((block) => {
    const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
    const bullets = lines.filter((l) => l.startsWith('•'));
    if (!bullets.length) return `<p>${esc(block)}</p>`;
    const heading = lines[0].startsWith('•') ? '' : `<p class="sub">${esc(lines[0])}</p>`;
    const items = bullets.map((b) => `<li>${esc(b.replace(/^•\s*/, ''))}</li>`).join('');
    return `${heading}<ul>${items}</ul>`;
  }).join('');
}

function html(lang) {
  const l = labels[lang];
  const t = ui[lang];
  const pick = (o, field) => o[field + (lang === 'pt' ? 'Pt' : 'En')];

  const core = coreSkills.map((s) =>
    `<li><strong>${esc(s.name)}</strong> <span>${esc(lang === 'pt' ? s.notePt : s.noteEn)}</span></li>`).join('');

  const coreNames = new Set(['Java', 'Spring Boot', 'Angular', 'TypeScript', 'Ionic', 'Azure']);
  const others = currentSkills
    .map((g) => `<p><strong>${g.key}:</strong> ${g.items.filter((i) => !coreNames.has(i)).map(esc).join(', ')}</p>`)
    .join('');

  const jobs = experiences.map((e) => `
    <article class="job">
      <header><h3>${esc(pick(e, 'role'))} · ${esc(e.company)}</h3><span>${esc(pick(e, 'period'))}</span></header>
      ${experienceBody(pick(e, 'desc'))}
    </article>`).join('');

  const projs = projects.filter((p) => p.featured).map((p) => `
    <li><strong>${esc(pick(p, 'title'))}</strong> ${esc(pick(p, 'shortDesc'))}
      <span class="tags">${p.tags.map(esc).join(' · ')}</span></li>`).join('');

  return `<!doctype html>
<html lang="${lang === 'pt' ? 'pt-BR' : 'en'}"><head><meta charset="utf-8">
<title>Pierre Passos — ${l.role}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  @page { size: A4; margin: 14mm 15mm; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Inter', sans-serif; font-size: 9.6pt; line-height: 1.45; color: #1c1c1e; }
  a { color: inherit; text-decoration: none; }
  .top { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2px solid #c25e00; padding-bottom: 8px; }
  h1 { font-size: 22pt; font-weight: 700; letter-spacing: -0.01em; line-height: 1.1; }
  .role { font-size: 11.5pt; font-weight: 600; color: #c25e00; margin-top: 2px; }
  .contact { text-align: right; font-size: 8.6pt; color: #444; line-height: 1.55; }
  h2 { font-size: 9.2pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #c25e00; margin: 14px 0 6px; }
  p + p { margin-top: 5px; }
  .core { list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 3px 18px; }
  .core span { color: #555; }
  .job { margin-bottom: 10px; break-inside: avoid-page; }
  .job header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px; }
  .job h3 { font-size: 10.4pt; font-weight: 600; }
  .job header span { font-size: 8.8pt; color: #555; white-space: nowrap; }
  .job ul, .projects { padding-left: 14px; margin-top: 3px; }
  .job li, .projects li { margin-bottom: 2px; }
  .sub { font-weight: 600; margin-top: 5px; }
  .projects li { margin-bottom: 5px; break-inside: avoid; }
  .tags { display: block; font-size: 8.4pt; color: #666; }
  .others p + p { margin-top: 2px; }
</style></head><body>
  <div class="top">
    <div><h1>Pierre Passos</h1><p class="role">${l.role}</p></div>
    <div class="contact">
      ${l.location}<br>
      pierre.passos.dev@gmail.com<br>
      <a href="https://pierrepassos.dev${lang === 'pt' ? '/' : '/en/'}">pierrepassos.dev</a> ·
      <a href="https://www.linkedin.com/in/pierre-passos">linkedin.com/in/pierre-passos</a><br>
      <a href="https://github.com/pierre-passos-dev">github.com/pierre-passos-dev</a>
    </div>
  </div>

  <h2>${l.summary}</h2>
  <p>${esc(t['about.p1'])}</p>
  <p>${esc(t['about.p2'])}</p>

  <h2>${l.core}</h2>
  <ul class="core">${core}</ul>

  <h2>${l.experience}</h2>
  ${jobs}

  <h2>${l.projects}</h2>
  <ul class="projects">${projs}</ul>

  <h2>${l.skills}</h2>
  <div class="others">${others}</div>

  <h2>${l.education}</h2>
  <p><strong>${l.course}</strong> · UNINTER · 2021 – 2024</p>
</body></html>`;
}

const browser = await chromium.launch();
const page = await browser.newPage();
for (const lang of ['pt', 'en']) {
  await page.setContent(html(lang), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const path = publicDir + labels[lang].file;
  await page.pdf({ path, format: 'A4', preferCSSPageSize: true, printBackground: true });
  console.log('gerado:', path);
}
await browser.close();
