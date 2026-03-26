# Pierre — Portfolio

Portfólio pessoal construído com **Astro** e hospedado no **Cloudflare Pages**.

## Stack

- [Astro 4](https://astro.build) — gerador de sites estáticos
- Cloudflare Pages — hospedagem
- CSS custom properties — theming dark/light
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
├── data/             # Conteúdo editável
│   ├── projects.ts
│   └── experience.ts
├── i18n/
│   └── translations.ts  # Textos PT + EN
├── layouts/
│   └── BaseLayout.astro  # SEO, dark/light, scroll reveal
├── pages/
│   ├── index.astro       # Rota / (PT)
│   ├── en/index.astro    # Rota /en (EN)
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
- **Domínio:** `astro.config.mjs` → campo `site`
- **Sitemap:** `public/robots.txt`

### Cores e tema

Todas as variáveis CSS ficam em `src/styles/global.css` → seção `:root` e `[data-theme="light"]`.

## Rotas

| Rota    | Idioma     |
|---------|------------|
| `/`     | Português  |
| `/en`   | English    |
| `/404`  | —          |
