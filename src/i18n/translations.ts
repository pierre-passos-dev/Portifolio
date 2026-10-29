// src/i18n/translations.ts
export const languages = {
  pt: 'Português',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'pt';

export const ui = {
  pt: {
    'nav.apps': 'Apps',
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
    'hero.cv': 'Baixar currículo',

    'about.title': 'Sobre mim',
    'about.p1': 'Sou desenvolvedor Full Stack há mais de 4 anos e minha especialidade é software que conversa com o mundo físico: sistemas de ponto e de controle de acesso integrados a relógios de ponto, catracas e leitores faciais, seguindo as regras trabalhistas brasileiras de jornada, hora extra, adicional noturno e banco de horas.',
    'about.p2': 'Hoje, na Topdata, participo de todas as etapas de uma plataforma multi-tenant na Azure que conecta relógios de ponto à nuvem, com sistema web, app Android e iOS (inclusive em modo quiosque), emissão do AFD, API de integração e observabilidade. Antes, na Bel, trabalhei em WMS e PWAs para operação logística. No backend uso Java e Spring Boot; no frontend e no mobile, Angular e Ionic.',
    'about.p3': 'Fora do trabalho, crio e publico apps próprios com Flutter pela Campier, minha marca.',

    'apps.title': 'Meus apps',
    'apps.sub': 'Apps que eu crio e publico pela minha marca, a Campier',
    'apps.campier': 'Minha marca de apps como desenvolvedor independente: cuido de cada um da ideia à publicação no Google Play.',
    'apps.conhecer': 'Conhecer',

    'projects.title': 'Projetos',
    'projects.sub': 'Projetos em que trabalhei nas empresas',
    'projects.all': 'Ver todos os projetos',
    'projects.fewer': 'Mostrar menos',
    'projects.more': 'Ver mais',
    'projects.less': 'Ver menos',
    'projects.problem': 'Problema',
    'projects.built': 'O que fiz',
    'projects.result': 'Resultado',

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

    '404.title': 'Página não encontrada',
    '404.sub': 'O endereço que você abriu não existe ou mudou de lugar.',
    '404.back': '← Voltar ao início',
  },
  en: {
    'nav.apps': 'Apps',
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
    'hero.cv': 'Download resume',

    'about.title': 'About me',
    'about.p1': 'I\'ve been a Full Stack developer for over 4 years, and my specialty is software that talks to the physical world: time tracking and access control systems integrated with time clocks, turnstiles and face readers, following Brazilian labor rules for work hours, overtime, night shift pay and hour banks.',
    'about.p2': 'Today at Topdata I take part in every stage of a multi-tenant platform on Azure that connects time clocks to the cloud, with a web system, Android and iOS apps (including kiosk mode), AFD file generation, an integration API and observability. Before that, at Bel, I worked on WMS and PWAs for logistics operations. I use Java and Spring Boot on the backend, and Angular and Ionic on the frontend and mobile.',
    'about.p3': 'Outside work, I build and publish my own Flutter apps under Campier, my app brand.',

    'apps.title': 'My apps',
    'apps.sub': 'Apps I build and publish under my own brand, Campier',
    'apps.campier': 'My app brand as an independent developer: I take each one from the idea to publishing on Google Play.',
    'apps.conhecer': 'Learn more',

    'projects.title': 'Projects',
    'projects.sub': 'Projects I worked on at the companies I joined',
    'projects.all': 'See all projects',
    'projects.fewer': 'Show fewer',
    'projects.more': 'View more',
    'projects.less': 'View less',
    'projects.problem': 'Problem',
    'projects.built': 'What I did',
    'projects.result': 'Result',

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

    '404.title': 'Page not found',
    '404.sub': 'The address you opened does not exist or has moved.',
    '404.back': '← Back to home',
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
