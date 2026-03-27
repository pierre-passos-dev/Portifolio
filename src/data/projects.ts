// src/data/projects.ts
export interface Project {
  slug: string;
  titlePt: string;
  titleEn: string;
  shortDescPt: string;
  shortDescEn: string;
  descPt: string;
  descEn: string;
  tags: string[];
  github?: string;
  demo?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: 'sistema-rh',
    titlePt: 'Sistema de RH',
    titleEn: 'HR System',
    shortDescPt: 'Controle de ponto em nuvem com regras trabalhistas automatizadas e integração biométrica.',
    shortDescEn: 'Cloud-based time tracking system with automated labor rules and biometric integration.',
    descPt: 'Sistema enterprise de controle de ponto em nuvem, desenvolvido para automatizar a gestão de jornadas de trabalho e reduzir erros operacionais em processos de RH. Permite registro preciso de horas, controle de escalas, cálculo automático de horas extras e gestão de banco de horas conforme regras trabalhistas brasileiras. Possui separação inteligente entre horas diurnas e noturnas e integração com coletores biométricos para validação de presença. Backend robusto em Java com Spring Boot e Hibernate, garantindo performance e segurança, aliado a um frontend em AngularJS focado em usabilidade e eficiência operacional.',
    descEn: 'Cloud-based enterprise time & attendance system designed to automate workforce management and reduce operational errors in HR processes. Features precise time tracking, shift management, automated overtime calculation, and hours bank handling based on business rules. Includes intelligent day/night overtime separation and biometric device integration for attendance validation. Built with a robust Java Spring Boot + Hibernate backend for performance and security, combined with an AngularJS frontend focused on usability and operational efficiency.',
    tags: ['Java', 'Spring Boot', 'AngularJS', 'Hibernate', 'PostgreSQL'],
    featured: true,
  },
  {
    slug: 'app-rh-mobile',
    titlePt: 'Aplicativo de RH',
    titleEn: 'HR Mobile App',
    shortDescPt: 'Aplicativo híbrido para registro de ponto com geolocalização e reconhecimento facial.',
    shortDescEn: 'Hybrid app for time tracking with geolocation and facial recognition.',
    descPt: 'Aplicativo híbrido (web, Android e iOS) integrado ao sistema de RH, desenvolvido para facilitar o registro de ponto e o acesso a informações pelos colaboradores. Permite marcação de ponto via celular, computador ou relógio físico, com suporte a reconhecimento facial para prevenção de fraudes. Conta com geolocalização para validação do local de registro, acesso a relatórios e gestão de jornadas em tempo real. Solução 100% em nuvem, garantindo mobilidade, alta disponibilidade e acesso de qualquer lugar.',
    descEn: 'Hybrid application (web, Android and iOS) integrated with the HR system, designed to simplify time tracking and employee self-service. Enables clock-in via mobile, desktop, or physical devices, with facial recognition to prevent fraud. Includes geolocation validation for punch location, real-time access to reports and work schedules. Fully cloud-based solution ensuring mobility, high availability, and access from anywhere.',
    tags: ['Ionic', 'Angular', 'TypeScript', 'Mobile', 'Geolocation'],
    featured: true,
  },
  {
    slug: 'controle-acesso',
    titlePt: 'Controle de Acesso',
    titleEn: 'Access Control',
    shortDescPt: 'Sistema de controle de acesso em tempo real integrado a catracas e reconhecimento facial.',
    shortDescEn: 'Real-time access control system integrated with turnstiles and facial recognition.',
    descPt: 'Sistema web de controle de acesso corporativo desenvolvido com Angular (SSR) e hospedado no Azure App Service. Responsável pela gestão em tempo real de entradas e saídas de usuários, integrando com dispositivos físicos como catracas e leitores faciais. Possui comunicação com APIs para sincronização de dados, controle de permissões por perfil e monitoramento de eventos de acesso. Arquitetura otimizada com lazy loading e estratégias de otimização de bundle para alta performance e escalabilidade.',
    descEn: 'Enterprise web-based access control system built with Angular (SSR) and hosted on Azure App Service. Manages real-time user entry and exit, integrating with physical devices such as turnstiles and facial recognition systems. Includes API communication for data synchronization, role-based access control, and access event monitoring. Optimized architecture with lazy loading and bundle optimization strategies for high performance and scalability.',
    tags: ['Angular', 'SSR', 'Azure', 'TypeScript'],
    featured: true,
  },
  {
    slug: 'plataforma-estoque-vendas',
    titlePt: 'Plataforma de Estoque e Vendas',
    titleEn: 'Inventory & Sales Platform',
    shortDescPt: 'Plataforma de gestão de estoque e vendas com PWA e arquitetura escalável em cloud.',
    shortDescEn: 'Inventory and sales platform with PWA and scalable cloud architecture.',
    descPt: 'Plataforma integrada de gestão de estoque (WMS) e vendas, com aplicação PWA desenvolvida para operação em ambientes logísticos e comerciais. O sistema permite controle de inventário, movimentação de produtos e realização de vendas em tempo real, com interface responsiva e foco em performance. Arquitetura baseada em serviços, com frontend em Angular e Ionic, e backend em Node.js (TypeScript) e Java (Spring Boot), integrando múltiplos sistemas via APIs RESTful. Utiliza PostgreSQL e SQL Server para persistência de dados e foi projetado para execução em ambiente cloud (AWS), garantindo escalabilidade e alta disponibilidade.',
    descEn: 'Integrated inventory (WMS) and sales platform, featuring a PWA designed for logistics and commercial operations. Enables real-time stock control, product movement, and sales execution with a responsive, high-performance interface. Service-based architecture with Angular and Ionic frontend, and Node.js (TypeScript) and Java (Spring Boot) backend, integrating multiple systems through RESTful APIs. Uses PostgreSQL and SQL Server for data persistence and is designed for cloud deployment (AWS), ensuring scalability and high availability.',
    tags: ['AWS', 'Angular', 'Ionic', 'Node.js', 'Spring Boot', 'TypeScript'],
    featured: true,
  },
  {
    slug: 'sdk-integracao',
    titlePt: 'Integração e SDK (.NET)',
    titleEn: 'TopPonto Integration & SDK (.NET)',
    shortDescPt: 'SDK e camada de integração para padronizar comunicação com APIs de controle de ponto.',
    shortDescEn: 'SDK and integration layer to standardize communication with time tracking APIs.',
    descPt: 'Desenvolvimento completo da camada de integração com a API do sistema de RH, atuando tanto na implementação do consumo quanto na estruturação da comunicação entre sistemas. Criação de SDK em .NET (C#) para abstração de chamadas REST, incluindo autenticação via token, controle de versionamento (headers), tratamento padronizado de respostas e gerenciamento de erros. Responsável por garantir consistência, segurança e escalabilidade na comunicação entre aplicações, facilitando a integração com recursos como cadastro de funcionários, eventos e controle de ponto. Arquitetura modular projetada para reutilização e manutenção simplificada. Inclui definição e padronização de contratos de API para integração entre sistemas.',
    descEn: 'Full development of the integration layer with the HR API, covering both API consumption and communication structure between systems. Creation of a .NET (C#) SDK to abstract REST calls, including token-based authentication, API versioning via headers, standardized response handling, and error management. Responsible for ensuring consistency, security, and scalability in system communication, enabling integration with features such as employee management, events, and time tracking. Modular architecture designed for reuse and maintainability. Includes API contract definition and standardization for system integration.',
    tags: ['.NET', 'C#', 'API', 'SDK', 'REST', 'Integration'],
    featured: true,
  },
  {
    slug: 'db-updater-azure',
    titlePt: 'Atualizador de Bancos (Azure)',
    titleEn: 'Database Updater (Azure)',
    shortDescPt: 'Automação em Python para atualização de bancos em múltiplos ambientes Azure.',
    shortDescEn: 'Python automation for updating databases across multiple Azure environments.',
    descPt: 'Ferramenta desenvolvida em Python para automatizar a atualização de bancos de dados distribuídos em múltiplos pools no Azure. Permite execução em lote, controle de versões e padronização de alterações em ambientes corporativos, reduzindo erros manuais e garantindo consistência entre bases.',
    descEn: 'Python-based tool designed to automate database updates across multiple Azure pools. Supports batch execution, version control, and standardized changes across enterprise environments, reducing manual errors and ensuring consistency.',
    tags: ['Python', 'Azure', 'Automation', 'Scripting'],
    featured: true,
  }
];