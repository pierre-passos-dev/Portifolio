// src/data/experience.ts
export interface Experience {
  period: string;
  rolePt: string;
  roleEn: string;
  company: string;
  descPt: string;
  descEn: string;
  tags: string[];
}

export const experiences: Experience[] = [
  {
    period: '2022 — Atual',
    rolePt: 'Desenvolvedor Fullstack Sênior',
    roleEn: 'Senior Fullstack Developer',
    company: 'Topdata',
    descPt: 'Desenvolvimento de sistemas enterprise de gestão de tempo e RH. Arquitetura de features complexas como banco de horas, separação diurna/noturna de horas extras e integrações com coletores biométricos.',
    descEn: 'Development of enterprise time and HR management systems. Architecture of complex features like hours bank, day/night overtime separation, and biometric collector integrations.',
    tags: ['Java', 'Spring Boot', 'AngularJS', 'Angular', 'Ionic', 'Azure'],
  },
  {
    period: '2019 — 2022',
    rolePt: 'Desenvolvedor Backend',
    roleEn: 'Backend Developer',
    company: 'Empresa anterior',
    descPt: 'Desenvolvimento de APIs REST e serviços de integração. Trabalho com mensageria, autenticação e monitoramento de banco de dados.',
    descEn: 'REST API and integration service development. Messaging, authentication, and database monitoring.',
    tags: ['Java', 'PostgreSQL', 'REST', 'Docker'],
  },
];
