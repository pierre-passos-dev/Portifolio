// src/data/projects.ts
export interface Project {
  slug: string;
  titlePt: string;
  titleEn: string;
  descPt: string;
  descEn: string;
  tags: string[];
  github?: string;
  demo?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: 'topponto-web',
    titlePt: 'TopPonto Web',
    titleEn: 'TopPonto Web',
    descPt: 'Sistema enterprise de controle de ponto e jornada. Backend Java (Spring Boot) + Frontend AngularJS. Inclui banco de horas, horas extras, integração com coletores.',
    descEn: 'Enterprise time & attendance system. Java (Spring Boot) backend + AngularJS frontend. Includes hours bank, overtime calculation, and collector integration.',
    tags: ['Java', 'Spring Boot', 'AngularJS', 'Hibernate', 'PostgreSQL'],
    featured: true,
  },
  {
    slug: 'top-acesso-web',
    titlePt: 'TopAcesso Web',
    titleEn: 'TopAcesso Web',
    descPt: 'Aplicação Angular 21 com SSR hospedada no Azure App Service. Controle de acesso e gestão de workforce com otimização de bundle e lazy loading.',
    descEn: 'Angular 21 SSR app hosted on Azure App Service. Access control and workforce management with bundle optimization and lazy loading.',
    tags: ['Angular', 'SSR', 'Azure', 'TypeScript'],
    featured: true,
  },
  {
    slug: 'toroid-controle',
    titlePt: 'Toroid Controle',
    titleEn: 'Toroid Control',
    descPt: 'Aplicação desktop com backend Python FastAPI/SQLAlchemy e frontend Electron. Empacotamento com electron-builder.',
    descEn: 'Desktop app with Python FastAPI/SQLAlchemy backend and Electron frontend. Packaged with electron-builder.',
    tags: ['Python', 'FastAPI', 'Electron', 'SQLAlchemy'],
    github: 'https://github.com/seu-usuario/toroid-controle',
    featured: true,
  },
];
