// src/data/projects.ts
// Cada projeto é contado em três partes: o problema, o que eu fiz e o resultado.
export interface Project {
  slug: string;
  titlePt: string;
  titleEn: string;
  shortDescPt: string;
  shortDescEn: string;
  problemPt: string;
  problemEn: string;
  builtPt: string;
  builtEn: string;
  resultPt?: string;
  resultEn?: string;
  tags: string[];
  github?: string;
  demo?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: 'plataforma-relogios-ponto',
    titlePt: 'Plataforma de Gestão de Relógios de Ponto',
    titleEn: 'Time Clock Management Platform',
    shortDescPt: 'Plataforma SaaS multi-tenant na Azure que conecta relógios de ponto à nuvem, com app de registro individual ou em modo quiosque e emissão do AFD.',
    shortDescEn: 'Multi-tenant SaaS platform on Azure that connects time clocks to the cloud, with a clock-in app for personal or kiosk use and AFD file generation.',
    problemPt: 'Empresas com vários relógios de ponto precisam manter os mesmos cadastros em todos os equipamentos, recolher as marcações de cada um e gerar os arquivos exigidos pela legislação, como o AFD, sem fazer isso equipamento por equipamento.',
    problemEn: 'Companies with many time clocks need the same records on every device, the punches from each one collected, and the files required by Brazilian law, such as the AFD, generated without doing it device by device.',
    builtPt: 'Participei de todas as etapas do desenvolvimento, da definição da arquitetura à entrega. Sistema web para cadastrar empresas e funcionários e definir quem registra ponto em qual equipamento; comunicação nos dois sentidos com os relógios, enviando cadastros e recebendo marcações; app para web, Android e iOS, usado pelo próprio colaborador ou em modo quiosque, num aparelho compartilhado; relatórios e emissão do AFD. Por baixo: arquitetura multi-tenant na Azure com os dados de cada cliente isolados, backend em Java com virtual threads para atender muitos equipamentos ao mesmo tempo, API de integração para sistemas externos e observabilidade em produção.',
    builtEn: 'I took part in every stage of development, from defining the architecture to delivery. A web system to register companies and employees and decide who clocks in on which device; two-way communication with the time clocks, sending records and receiving punches; a web, Android and iOS app used by each employee or in kiosk mode on a shared device; reports and AFD file generation (the punch record file required by Brazilian labor law). Underneath: a multi-tenant architecture on Azure with each customer\'s data isolated, a Java backend using virtual threads to serve many devices at once, an integration API for external systems and observability in production.',
    tags: ['Java', 'Azure', 'Multi-tenant', 'Virtual Threads', 'Hardware', 'API', 'Android', 'iOS', 'Observability'],
    featured: true,
  },
  {
    slug: 'sistema-rh',
    titlePt: 'Sistema de RH',
    titleEn: 'HR System',
    shortDescPt: 'Controle de ponto em nuvem com regras trabalhistas automatizadas e integração biométrica.',
    shortDescEn: 'Cloud-based time tracking system with automated labor rules and biometric integration.',
    problemPt: 'Calcular jornada à mão gera erro em hora extra, adicional noturno e banco de horas, e cada erro vira um problema trabalhista para a empresa.',
    problemEn: 'Calculating work hours by hand leads to mistakes in overtime, night shift pay and hour banks, and every mistake becomes a labor issue for the company.',
    builtPt: 'Trabalhei no backend em Java (Spring Boot e Hibernate) e no frontend em AngularJS de um sistema de ponto em nuvem: registro de marcações, escalas, cálculo automático de horas extras, separação entre horas diurnas e noturnas e banco de horas, seguindo as regras trabalhistas brasileiras. As marcações chegam de coletores biométricos.',
    builtEn: 'I worked on the Java backend (Spring Boot and Hibernate) and the AngularJS frontend of a cloud time & attendance system: punch records, shifts, automatic overtime calculation, day/night hour separation and hour banks, following Brazilian labor rules. Punches come from biometric devices.',
    resultPt: 'O cálculo da jornada deixa de ser manual: o RH confere o resultado em vez de montá-lo.',
    resultEn: 'Work hour calculation is no longer manual: HR reviews the result instead of building it.',
    tags: ['Java', 'Spring Boot', 'AngularJS', 'Hibernate', 'PostgreSQL'],
    featured: true,
  },
  {
    slug: 'app-rh-mobile',
    titlePt: 'Aplicativo de RH',
    titleEn: 'HR Mobile App',
    shortDescPt: 'Aplicativo híbrido para registro de ponto com geolocalização e reconhecimento facial.',
    shortDescEn: 'Hybrid app for time tracking with geolocation and facial recognition.',
    problemPt: 'Quem trabalha externo ou em home office não tem relógio de ponto por perto, e marcar ponto pelo celular abre espaço para fraude.',
    problemEn: 'People working in the field or from home have no time clock nearby, and clocking in from a phone opens the door to fraud.',
    builtPt: 'Aplicativo híbrido em Ionic e Angular (web, Android e iOS) integrado ao sistema de RH: marcação de ponto com reconhecimento facial, validação do local por geolocalização e consulta de relatórios e jornada em tempo real. Implementei a sincronização automática dos dados entre o app e o servidor e publiquei o app na Google Play.',
    builtEn: 'Hybrid Ionic and Angular app (web, Android and iOS) integrated with the HR system: clock-in with facial recognition, location check via geolocation, and real-time reports and schedules. I implemented automatic data sync between the app and the server and published the app on Google Play.',
    resultPt: 'O colaborador marca ponto pelo celular, pelo computador ou pelo relógio físico, e tudo cai no mesmo sistema.',
    resultEn: 'Employees clock in from their phone, computer or a physical time clock, and everything lands in the same system.',
    tags: ['Ionic', 'Angular', 'TypeScript', 'Mobile', 'Geolocation'],
    featured: true,
  },
  {
    slug: 'controle-acesso',
    titlePt: 'Controle de Acesso',
    titleEn: 'Access Control',
    shortDescPt: 'Sistema de controle de acesso em tempo real integrado a catracas e reconhecimento facial.',
    shortDescEn: 'Real-time access control system integrated with turnstiles and facial recognition.',
    problemPt: 'Empresas precisam saber em tempo real quem entrou e saiu, e liberar ou bloquear cada pessoa nas catracas e leitores faciais conforme o perfil dela.',
    problemEn: 'Companies need to know in real time who came in and out, and allow or block each person at turnstiles and face readers according to their role.',
    builtPt: 'Desenvolvi o sistema web em Angular com SSR, hospedado no Azure App Service, que conversa com catracas e leitores faciais: sincronização de cadastros e permissões com os dispositivos via API, controle de acesso por perfil e monitoramento dos eventos de entrada e saída. Usei lazy loading e otimização de bundle para manter o carregamento rápido.',
    builtEn: 'I built the Angular (SSR) web system, hosted on Azure App Service, that talks to turnstiles and face readers: syncing people and permissions to the devices through an API, role-based access control and monitoring of entry and exit events. I used lazy loading and bundle optimization to keep it loading fast.',
    resultPt: 'Entradas, saídas e permissões de todos os dispositivos ficam num único painel web, em tempo real.',
    resultEn: 'Entries, exits and permissions for every device live in a single web dashboard, in real time.',
    tags: ['Angular', 'SSR', 'Azure', 'TypeScript'],
    featured: true,
  },
  {
    slug: 'plataforma-estoque-vendas',
    titlePt: 'Plataforma de Estoque e Vendas',
    titleEn: 'Inventory & Sales Platform',
    shortDescPt: 'Plataforma de gestão de estoque e vendas com PWA e arquitetura escalável em cloud.',
    shortDescEn: 'Inventory and sales platform with PWA and scalable cloud architecture.',
    problemPt: 'A operação logística e comercial precisava controlar estoque e vender no mesmo sistema, inclusive em celulares e tablets dentro do depósito.',
    problemEn: 'Logistics and sales teams needed to manage stock and sell from the same system, including on phones and tablets inside the warehouse.',
    builtPt: 'Participei do desenvolvimento de uma plataforma de WMS e vendas: PWA em Angular e Ionic, APIs REST em Node.js (TypeScript) e Java (Spring Boot) integrando vários sistemas, PostgreSQL e SQL Server, com implantação na AWS.',
    builtEn: 'I helped build a WMS and sales platform: an Angular and Ionic PWA, REST APIs in Node.js (TypeScript) and Java (Spring Boot) integrating several systems, PostgreSQL and SQL Server, deployed on AWS.',
    resultPt: 'Estoque, movimentação e vendas atualizados em tempo real, num app que roda no navegador, sem instalação.',
    resultEn: 'Stock, movements and sales updated in real time, in an app that runs in the browser with no install.',
    tags: ['AWS', 'Angular', 'Ionic', 'Node.js', 'Spring Boot', 'TypeScript'],
    featured: true,
  },
  {
    slug: 'sdk-integracao',
    titlePt: 'Integração e SDK (.NET)',
    titleEn: 'Integration & SDK (.NET)',
    shortDescPt: 'SDK e camada de integração para padronizar comunicação com APIs de controle de ponto.',
    shortDescEn: 'SDK and integration layer to standardize communication with time tracking APIs.',
    problemPt: 'Cada sistema que integrava com a API de RH reimplementava autenticação, versionamento e tratamento de erros, cada um de um jeito.',
    problemEn: 'Every system integrating with the HR API reimplemented authentication, versioning and error handling, each in its own way.',
    builtPt: 'Criei um SDK em .NET (C#) que encapsula as chamadas REST: autenticação por token, versionamento por header, respostas e erros padronizados. Também defini e padronizei os contratos da API usados na integração de funcionários, eventos e marcações de ponto.',
    builtEn: 'I created a .NET (C#) SDK that wraps the REST calls: token authentication, header-based versioning, standardized responses and errors. I also defined and standardized the API contracts used to integrate employees, events and time punches.',
    resultPt: 'Integrar passou a ser instalar o SDK e chamar métodos tipados, em vez de montar requisições HTTP à mão.',
    resultEn: 'Integrating became installing the SDK and calling typed methods, instead of hand-building HTTP requests.',
    tags: ['.NET', 'C#', 'API', 'SDK', 'REST', 'Integration'],
    featured: true,
  },
  {
    slug: 'db-updater-azure',
    titlePt: 'Atualizador de Bancos (Azure)',
    titleEn: 'Database Updater (Azure)',
    shortDescPt: 'Automação em Python para atualização de bancos em múltiplos ambientes Azure.',
    shortDescEn: 'Python automation for updating databases across multiple Azure environments.',
    problemPt: 'Atualizar muitos bancos espalhados em vários pools do Azure, um por um, era lento e arriscado: fácil esquecer uma base ou rodar o script errado.',
    problemEn: 'Updating many databases spread across several Azure pools, one by one, was slow and risky: easy to miss a database or run the wrong script.',
    builtPt: 'Escrevi uma ferramenta em Python que aplica as atualizações em lote em todos os pools, com controle da versão de cada base e execução padronizada.',
    builtEn: 'I wrote a Python tool that applies updates in batch across all pools, tracking each database\'s version and running changes the same way every time.',
    resultPt: 'Todas as bases ficam na mesma versão, sem execução manual base a base.',
    resultEn: 'Every database stays on the same version, with no manual run per database.',
    tags: ['Python', 'Azure', 'Automation', 'Scripting'],
    featured: true,
  }
];
