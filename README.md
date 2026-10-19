# Pierre — Portfolio

Portfólio pessoal construído com **Astro** e hospedado no **Cloudflare Pages**, em https://pierrepassos.dev.

## Stack

- [Astro 7](https://astro.build) — gerador de sites estáticos (Node 22, ver `.node-version`)
- Cloudflare Pages — hospedagem
- CSS custom properties — tema escuro
- i18n manual — PT + EN
- Sem frameworks JS extras (zero bundle por padrão)

## Estrutura

```
src/
├── components/       # Seções do portfólio
│   ├── Navbar.astro
│   ├── Hero.astro
│   ├── About.astro
│   ├── Projects.astro
│   ├── Skills.astro
│   ├── Experience.astro
│   ├── Contact.astro
│   └── Footer.astro
├── data/             # Conteúdo editável (usado pelo site e pelo currículo)
│   ├── projects.ts
│   ├── experience.ts
│   └── skills.ts
├── i18n/
│   └── translations.ts  # Textos PT + EN
├── layouts/
│   └── BaseLayout.astro  # SEO, dark/light, scroll reveal
├── pages/
│   ├── index.astro       # Rota / (PT)
│   ├── en/index.astro    # Rota /en (EN)
│   ├── en/404.astro      # 404 em inglês (Cloudflare usa para /en/*)
│   └── 404.astro
└── styles/
    └── global.css
```

## Desenvolvimento local

```bash
npm install
npm run dev
```

Acesse: http://localhost:4321

## Build

```bash
npm run build
# Output em: dist/
```

## Currículo em PDF

Os PDFs em `public/` (`curriculo-pierre-passos.pdf` e `resume-pierre-passos.pdf`) são gerados a partir de `src/data/` e de `src/i18n/translations.ts`. Depois de mudar projetos, experiência, habilidades ou o "Sobre mim", gere de novo:

```bash
npx playwright install chromium   # só na primeira vez
npm run curriculo
```

## Imagem de prévia (Open Graph)

`public/og-image.png` (1200×630) é a imagem que aparece quando o link é colado no LinkedIn, WhatsApp etc.

## Deploy no Cloudflare Pages

1. Faça push do repo para o GitHub
2. No Cloudflare Pages → **Create a project** → conecte o repo
3. Configurações de build:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Deploy! ✅

## Personalização

### Trocar informações pessoais

- **Projetos:** `src/data/projects.ts`
- **Experiência:** `src/data/experience.ts`
- **Textos gerais:** `src/i18n/translations.ts`
- **Email/links:** `src/components/Contact.astro`
- **GitHub/LinkedIn:** `src/components/Contact.astro`
- **Domínio:** `astro.config.mjs` → campo `site`, mais `public/robots.txt` e `public/sitemap.xml`
- **Sitemap:** `public/sitemap.xml` é estático (o site tem duas páginas); página nova entra lá à mão

### Cores e tema

Todas as variáveis CSS ficam em `src/styles/global.css`, na seção `:root`. Texto precisa de contraste de pelo menos 4,5:1 sobre o fundo.

## Rotas

| Rota    | Idioma     |
|---------|------------|
| `/`     | Português  |
| `/en/`  | English    |
| `/404`  | —          |
