// src/i18n/translations.ts
export const languages = {
  pt: 'Português',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'pt';

export const ui = {
  pt: {
    'nav.about': 'Sobre',
    'nav.projects': 'Projetos',
    'nav.skills': 'Habilidades',
    'nav.experience': 'Experiência',
    'nav.contact': 'Contato',

    'hero.greeting': 'Olá, eu sou',
    'hero.role': 'Desenvolvedor Fullstack',
    'hero.sub': 'Backend Java · Angular · Ionic · Cloud',
    'hero.cta': 'Ver projetos',
    'hero.contact': 'Entre em contato',

    'about.title': 'Sobre mim',
    'about.p1': 'Sou desenvolvedor Full Stack com mais de 5 anos de experiência na criação de soluções digitais completas e escaláveis. Minha trajetória é marcada pela entrega de projetos que unem performance, design funcional e arquitetura robusta, sempre com foco na melhor experiência para o usuário.',
    'about.p2': 'Ao longo da minha carreira, já coloquei no ar mais de 10 projetos para diferentes plataformas, atuando desde a concepção até a entrega final. Tenho um olhar atento para detalhes, valorizo código limpo e mantenho uma abordagem colaborativa para transformar ideias em produtos digitais de alto impacto.',

    'projects.title': 'Projetos',
    'projects.more': 'Ver mais',

    'skills.title': 'Habilidades',
    'skills.backend': 'Backend',
    'skills.frontend': 'Frontend',
    'skills.mobile': 'Mobile',
    'skills.devops': 'DevOps & Cloud',
    'skills.db': 'Banco de dados',
    'skills.learning': 'Em Desenvolvimento',

    'exp.title': 'Experiência',

    'contact.title': 'Contato',
    'contact.sub': 'Vamos conversar? Estou aberto a oportunidades e colaborações.',
    'contact.email': 'Enviar e-mail',
    'contact.github': 'GitHub',
    'contact.linkedin': 'LinkedIn',

    'footer.rights': 'Todos os direitos reservados.',
  },
  en: {
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.experience': 'Experience',
    'nav.contact': 'Contact',

    'hero.greeting': 'Hi, I\'m',
    'hero.role': 'Fullstack Developer',
    'hero.sub': 'Java Backend · Angular · Ionic · Cloud',
    'hero.cta': 'View projects',
    'hero.contact': 'Get in touch',

    'about.title': 'About me',
    'about.p1': 'I\'m a Full Stack developer with over 5 years of experience creating complete and scalable digital solutions. My journey is marked by delivering projects that combine performance, functional design, and robust architecture, always focusing on the best user experience.',
    'about.p2': 'Throughout my career, I\'ve launched over 10 projects across different platforms, working from conception to final delivery. I have a keen eye for details, value clean code, and maintain a collaborative approach to transform ideas into high-impact digital products.',

    'projects.title': 'Projects',
    'projects.more': 'View more',

    'skills.title': 'Skills',
    'skills.backend': 'Backend',
    'skills.frontend': 'Frontend',
    'skills.mobile': 'Mobile',
    'skills.devops': 'DevOps & Cloud',
    'skills.db': 'Database',

    'exp.title': 'Experience',

    'contact.title': 'Contact',
    'contact.sub': 'Let\'s talk? I\'m open to opportunities and collaborations.',
    'contact.email': 'Send email',
    'contact.github': 'GitHub',
    'contact.linkedin': 'LinkedIn',

    'footer.rights': 'All rights reserved.',
  },
} as const;

export function useTranslations(lang: Lang) {
  return function t(key: keyof typeof ui[typeof defaultLang]): string {
    return (ui[lang] as Record<string, string>)[key] ?? (ui[defaultLang] as Record<string, string>)[key] ?? key;
  };
}

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Lang;
  return defaultLang;
}

export function getLocalizedPath(path: string, lang: Lang): string {
  if (lang === defaultLang) return path;
  return `/${lang}${path}`;
}
