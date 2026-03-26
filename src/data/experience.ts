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
    descPt: 'Desenvolvimento e manutenção de sistemas enterprise de gestão de tempo, RH e workforce management. Desenvolvimento de PWAs, sistemas WMS e portais para clientes. Criação e consumo de APIs RESTful, deploy com Tomcat, trabalho em ambiente ágil com Trello/Kanban.',
    descEn: 'Development and maintenance of enterprise time tracking, HR and workforce management systems. Development of PWAs, WMS systems and client portals. RESTful API creation and consumption, Tomcat deployment, agile environment with Trello/Kanban.',
    tags: ['Java', 'Spring Boot', 'Angular', 'AngularJS', 'Ionic', 'TypeScript', 'Node.js', 'SQL Server', 'Azure', 'Docker', 'Redis', 'Kafka'],
  },
  {
    period: '2019 — 2022',
    rolePt: 'Desenvolvedor Full Stack Pleno',
    roleEn: 'Pleno Full Stack Developer',
    company: 'Bel fix',
    descPt: 'Desenvolvimento de APIs REST e serviços de integração. Trabalho com mensageria, autenticação e monitoramento de banco de dados.',
    descEn: 'REST API and integration service development. Messaging, authentication, and database monitoring.',
    tags: ['Java', 'PostgreSQL', 'Angular', 'Ionic', 'TypeScript', 'Node.js', 'TypeORM', 'PWA', 'WMS'],
  },
];
