// src/i18n/translations.ts
export const languages = {
  pt: 'Português',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'pt';

export const ui = {
  pt: {
    'nav.about':      'Sobre',
    'nav.projects':   'Projetos',
    'nav.skills':     'Skills',
    'nav.experience': 'Experiência',
    'nav.contact':    'Contato',

    'hero.greeting':  'Olá, eu sou',
    'hero.role':      'Desenvolvedor Fullstack',
    'hero.sub':       'Backend Java · Angular · Ionic · Cloud',
    'hero.cta':       'Ver projetos',
    'hero.contact':   'Entre em contato',

    'about.title':    'Sobre mim',
    'about.p1':       'Desenvolvedor Fullstack com mais de 5 anos de experiência em sistemas enterprise para gestão de tempo, RH e workforce management.',
    'about.p2':       'Passionate por criar soluções robustas e escaláveis, combinando backend robusto com interfaces modernas e responsivas.',

    'projects.title': 'Projetos',
    'projects.more':  'Ver mais',

    'skills.title':   'Stack',
    'skills.backend': 'Backend',
    'skills.frontend': 'Frontend',
    'skills.mobile':  'Mobile',
    'skills.devops':  'DevOps & Cloud',
    'skills.db':      'Banco de dados',
    'skills.learning': 'Em Desenvolvimento',

    'exp.title':      'Experiência',

    'contact.title':  'Contato',
    'contact.sub':    'Vamos conversar? Estou aberto a oportunidades e colaborações.',
    'contact.email':  'Enviar e-mail',
    'contact.github': 'GitHub',
    'contact.linkedin': 'LinkedIn',

    'footer.rights':  'Todos os direitos reservados.',
  },
  en: {
    'nav.about':      'About',
    'nav.projects':   'Projects',
    'nav.skills':     'Skills',
    'nav.experience': 'Experience',
    'nav.contact':    'Contact',

    'hero.greeting':  'Hi, I\'m',
    'hero.role':      'Fullstack Developer',
    'hero.sub':       'Java Backend · Angular · Ionic · Cloud',
    'hero.cta':       'View projects',
    'hero.contact':   'Get in touch',

    'about.title':    'About me',
    'about.p1':       'Fullstack developer with over 5 years of experience in enterprise systems for time tracking, HR and workforce management.',
    'about.p2':       'Passionate about creating robust and scalable solutions, combining solid backend with modern and responsive interfaces.',

    'projects.title': 'Projects',
    'projects.more':  'View more',

    'skills.title':   'Stack',
    'skills.backend': 'Backend',
    'skills.frontend': 'Frontend',
    'skills.mobile':  'Mobile',
    'skills.devops':  'DevOps & Cloud',
    'skills.db':      'Database',

    'exp.title':      'Experience',

    'contact.title':  'Contact',
    'contact.sub':    'Let\'s talk? I\'m open to opportunities and collaborations.',
    'contact.email':  'Send email',
    'contact.github': 'GitHub',
    'contact.linkedin': 'LinkedIn',

    'footer.rights':  'All rights reserved.',
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
