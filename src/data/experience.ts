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
    period: 'Aug 2024 — Atual',
    rolePt: 'Desenvolvedor Full Stack',
    roleEn: 'Full Stack Developer',
    company: 'Topdata',
    descPt: 'Desenvolvimento de aplicações web e mobile voltadas para gestão e controle, atuando como desenvolvedor full stack.\n\n• Desenvolvimento de interfaces com Angular, Ionic, TypeScript e SCSS, garantindo aplicações responsivas e de boa usabilidade\n• Implementação de APIs REST com Java (Spring Boot), Hibernate e JPA\n• Integração de sistemas utilizando Kafka e Redis, melhorando a comunicação entre serviços\n• Implementação de sincronização automática de dados em aplicações mobile, garantindo consistência, escalabilidade e alta performance\n• Desenvolvimento de sistema de controle de acesso web integrado a dispositivos físicos (catracas e leitores faciais)\n• Deploy e gerenciamento de serviços na Azure\n• Publicação e distribuição de aplicações mobile via Google Play Console\n• Containerização de aplicações com Docker\n• Monitoramento com Grafana e Prometheus\n\nResultados:\n• Melhoria na performance e estabilidade dos sistemas\n• Otimização na comunicação entre serviços\n• Participação em soluções escaláveis integrando software e hardware',
    descEn: 'Development of web and mobile applications focused on management and control systems, working as a full stack developer.\n\n• Built user interfaces using Angular, Ionic, TypeScript and SCSS\n• Developed REST APIs with Java (Spring Boot), Hibernate and JPA\n• Integrated systems using Kafka and Redis to improve communication between services\n• Implemented automatic mobile data synchronization ensuring scalability and high performance\n• Worked on access control systems integrated with physical devices (turnstiles and facial recognition)\n• Managed deployments on Azure\n• Published and distributed mobile applications via Google Play Console\n• Containerized applications using Docker\n• Monitored systems with Grafana and Prometheus\n\nResults:\n• Improved system performance and stability\n• Enhanced service communication and data processing\n• Contributed to scalable solutions integrating software and hardware',
    tags: ['Java', 'Spring Boot', 'Angular', 'Ionic', 'TypeScript', 'Azure', 'Docker', 'Kafka', 'Redis'],
  },
  {
    period: 'Mar 2022 — Mar 2024',
    rolePt: 'Desenvolvedor Full Stack',
    roleEn: 'Full Stack Developer',
    company: 'Bel',
    descPt: 'Atuação no desenvolvimento e evolução de sistemas web e PWAs, com foco em performance e experiência do usuário.\n\n• Desenvolvimento de aplicações com Angular, Ionic e TypeScript no front-end\n• Criação de APIs REST com Node.js (Express) e Java (Spring Boot)\n• Integração com banco de dados PostgreSQL e SQL Server\n• Participação no desenvolvimento de sistemas como WMS\n• Deploy de aplicações Java utilizando Apache Tomcat\n• Versionamento com Git e atuação em ambiente ágil (Kanban)\n\nResultados:\n• Melhoria na usabilidade e performance das aplicações\n• Evolução contínua de sistemas críticos\n• Entrega de funcionalidades com impacto direto nos usuários',
    descEn: 'Worked on the development and evolution of web systems and PWAs, focusing on performance and user experience.\n\n• Developed applications using Angular, Ionic and TypeScript on the front-end\n• Built REST APIs with Node.js (Express) and Java (Spring Boot)\n• Integrated systems with PostgreSQL and SQL Server\n• Contributed to WMS systems development\n• Deployed Java applications using Apache Tomcat\n• Used Git and worked in an agile (Kanban) environment\n\nResults:\n• Improved application usability and performance\n• Continuous evolution of critical systems\n• Delivered features with direct impact on end users',
    tags: ['Angular', 'Ionic', 'TypeScript', 'Node.js', 'Spring Boot', 'PostgreSQL', 'SQL Server'],
  },
];
