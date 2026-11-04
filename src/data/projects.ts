// src/data/projects.ts
// Cada projeto é contado em três partes: o problema, o que eu fiz e o resultado.
// O projeto principal (kind: 'case') ocupa a largura toda e traz também as
// decisões técnicas, cada uma com a sua história.

/** Uma decisão técnica ou problema resolvido, contado em poucas frases. */
export interface Highlight {
  titlePt: string;
  titleEn: string;
  textPt: string;
  textEn: string;
}

export interface Project {
  slug: string;
  /** 'case' = projeto principal, em destaque; sem valor = cartão comum */
  kind?: 'case';
  titlePt: string;
  titleEn: string;
  shortDescPt: string;
  shortDescEn: string;
  /** período, equipe e situação, numa linha */
  metaPt?: string;
  metaEn?: string;
  problemPt: string;
  problemEn: string;
  /** abertura do "O que fiz" */
  builtPt: string;
  builtEn: string;
  /** itens do "O que fiz", mostrados em lista logo abaixo da abertura */
  builtListPt?: string[];
  builtListEn?: string[];
  resultPt?: string;
  resultEn?: string;
  highlights?: Highlight[];
  tags: string[];
  github?: string;
  demo?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: 'plataforma-relogios-ponto',
    kind: 'case',
    titlePt: 'Plataforma de Relógios de Ponto na Nuvem',
    titleEn: 'Cloud Time Clock Platform',
    shortDescPt: 'Plataforma multi-tenant na Azure que substitui um sistema desktop: cadastra os relógios de ponto, coleta as marcações e gera, com assinatura digital, o AFD (Arquivo-Fonte de Dados), o arquivo oficial de marcações que a lei exige. Inclui um app do funcionário com reconhecimento facial.',
    shortDescEn: 'Multi-tenant platform on Azure that replaces a desktop system: it registers time clocks, collects punches and generates, with a digital signature, the AFD (Arquivo-Fonte de Dados), the official punch record file required by Brazilian law. Includes an employee app with facial recognition.',
    metaPt: 'jul/2026 – atual · em homologação',
    metaEn: 'Jul 2026 – present · in acceptance testing',
    problemPt: 'O sistema anterior era um programa desktop. Rodava só no computador do cliente e dependia de um serviço do Windows para coletar as marcações e de um SQL Server instalado ali. A versão nova precisava funcionar no navegador, atender muitos clientes com os dados de cada um separados e seguir a Portaria 671 do MTE, que exige o AFD com assinatura digital e uma trilha de auditoria que os usuários não possam alterar.',
    problemEn: 'The previous system was a desktop program. It ran only on the customer\'s computer and needed a Windows service to collect punches and a local SQL Server. The new version had to run in the browser, serve many customers with each one\'s data kept apart, and follow Brazilian labor rules (Portaria 671), which require a digitally signed AFD file and an audit trail users cannot change.',
    builtPt: 'Estou no projeto desde o começo. Fiz o app do funcionário e o programa de captura de digital, e adaptei o plugin de reconhecimento facial para Android e iOS. No sistema web, a comunicação com os equipamentos e os webhooks ficaram com outra parte do time; do front ao back, fui o responsável por:',
    builtEn: 'I have been on the project since day one. I built the employee app and the fingerprint capture program, and adapted the facial recognition plugin for Android and iOS. On the web system, device communication and webhooks were handled by other teammates; front to back, I was responsible for:',
    builtListPt: [
      'os cadastros de empresas, funcionários, grupos, equipamentos, perfis e operadores;',
      'as telas, os relatórios e a importação e exportação de funcionários por planilha;',
      'a emissão do AFD com assinatura digital;',
      'a API de integração para sistemas de terceiros e o envio por FTP;',
      'as permissões, o login com token e o controle de sessão;',
      'a auditoria, o padrão de logs e a observabilidade, com Loki, Prometheus e Grafana.',
    ],
    builtListEn: [
      'registration of companies, employees, groups, devices, profiles and operators;',
      'the screens, the reports and employee import and export by spreadsheet;',
      'AFD file generation with a digital signature;',
      'the integration API for third-party systems and FTP delivery;',
      'permissions, token login and session control;',
      'the audit trail, the logging standard and observability, with Loki, Prometheus and Grafana.',
    ],
    resultPt: 'O cliente deixa de instalar e manter servidor, banco e serviço do Windows: usa tudo pelo navegador, de qualquer lugar. As marcações ficam na nuvem, com backup automático, e não dependem mais de um computador do escritório. A auditoria e o AFD assinado dão ao cliente a prova de cada alteração e de cada marcação numa fiscalização.',
    resultEn: 'Customers no longer install and maintain a server, a database and a Windows service: everything runs in the browser, from anywhere. Punches live in the cloud with automatic backups and no longer depend on an office computer. The audit trail and the signed AFD give customers proof of every change and every punch in a labor inspection.',
    highlights: [
      {
        titlePt: 'Auditoria só de inclusão',
        titleEn: 'Insert-only audit trail',
        textPt: 'A tabela de auditoria só aceita inclusão: UPDATE e DELETE são bloqueados por permissão e por trigger, e nem a aplicação nem os usuários conseguem alterar um registro. Quando uma operação falha, a auditoria é gravada fora da transação, para o rollback não levar o registro junto. Ela nunca derruba a operação auditada, e senha, PIN e biometria ficam mascarados.',
        textEn: 'The audit table only accepts inserts: UPDATE and DELETE are blocked by permission and by a trigger, so neither the application nor its users can change a record. When an operation fails, the audit entry is written outside the transaction, so the rollback doesn\'t take it along. Auditing never breaks the audited operation, and passwords, PINs and biometrics are masked.',
      },
      {
        titlePt: 'Desempenho medido antes da produção',
        titleEn: 'Performance measured before production',
        textPt: 'Ainda em homologação, um teste de carga mostrou a confirmação de marcações parada em cerca de 40 por minuto. A causa era um padrão do driver JDBC: ele envia texto como NVARCHAR, e o SQL Server, ao comparar com colunas VARCHAR, deixa de usar o índice. Com o schema padronizado em NVARCHAR, a confirmação subiu para cerca de 540 por minuto, e a regra passou a valer para toda tabela nova.',
        textEn: 'While still in acceptance testing, a load test showed punch confirmation stuck at about 40 per minute. The cause was a JDBC driver default: it sends text as NVARCHAR, and when comparing with VARCHAR columns SQL Server stops using the index. With the schema standardized on NVARCHAR, confirmation went up to about 540 per minute, and the rule now applies to every new table.',
      },
      {
        titlePt: 'Digital pelo navegador',
        titleEn: 'Fingerprints from the browser',
        textPt: 'O navegador não acessa o leitor USB. Por isso, o sistema abre um programa desktop em C# por um link próprio, com um ticket de uso único e vida curta. O programa troca o ticket por um acesso restrito àquele funcionário, captura dois dedos e devolve a digital no formato do equipamento. Funciona com três famílias de leitores.',
        textEn: 'The browser can\'t reach a USB reader. So the system opens a C# desktop program through its own link, with a short-lived, single-use ticket. The program trades the ticket for access limited to that employee, captures two fingers and returns the fingerprint in the device\'s format. It works with three families of readers.',
      },
      {
        titlePt: 'Modo quiosque',
        titleEn: 'Kiosk mode',
        textPt: 'Um único aparelho registra o ponto de todos os funcionários da empresa. Roda no navegador, no Android e no iOS, e na prática quase sempre é um tablet. Cada um se identifica pelo rosto, por PIN ou por QR Code, mesmo sem internet, com uma base SQLite no aparelho. Um interceptor do Hibernate transforma cada alteração de cadastro em comando, e o quiosque sincroniza quando a conexão volta.',
        textEn: 'A single device records punches for every employee at the company. It runs in the browser, on Android and on iOS, and in practice it is almost always a tablet. Each person identifies by face, PIN or QR Code, even offline, with an SQLite database on the device. A Hibernate interceptor turns every change to the records into a command, and the kiosk syncs when it is back online.',
      },
      {
        titlePt: 'Processos longos',
        titleEn: 'Long-running jobs',
        textPt: 'AFD, relatórios e importações rodam em fila, com progresso e cancelamento guardados no Redis, e os arquivos saem em fluxo direto para o Azure Blob. Cada item é gravado na própria transação: se o usuário cancela, o que já foi feito continua feito.',
        textEn: 'AFD files, reports and imports run in a queue, with progress and cancellation kept in Redis, and files stream straight to Azure Blob. Each item is saved in its own transaction: if the user cancels, what was done stays done.',
      },
      {
        titlePt: 'App reescrito',
        titleEn: 'App rewrite',
        textPt: 'O app antigo usava Ionic 5, Angular 9 e Cordova, uma stack que já estava envelhecendo. Reescrevi em Ionic 8, Angular 20 e Capacitor 8, nas versões atuais, prontas para publicar nas duas lojas, sem perder nenhum comportamento que o cliente já usava: login único para quem trabalha em várias empresas, ponto com geolocalização e reconhecimento facial com prova de vida.',
        textEn: 'The old app used Ionic 5, Angular 9 and Cordova, a stack that was getting old. I rewrote it in Ionic 8, Angular 20 and Capacitor 8, current versions ready for both app stores, without dropping any behavior customers relied on: a single login for people who work at several companies, clock-in with geolocation and facial recognition with liveness detection.',
      },
    ],
    tags: ['Java', 'Spring Boot', 'Angular', 'Azure', 'SQL Server', 'Kafka', 'Redis', 'Ionic', 'Capacitor', 'C#', 'Multi-tenant', 'Virtual Threads'],
    featured: true,
  },
  {
    slug: 'sistema-rh',
    titlePt: 'Sistema de Gestão de Ponto',
    titleEn: 'Time & Attendance Management System',
    metaPt: 'ago/2024 – atual · em produção',
    metaEn: 'Aug 2024 – present · in production',
    shortDescPt: 'Sistema web e app de ponto em produção há anos, com cerca de 8 mil clientes e mais de 12 mil equipamentos conectados. Cuida da rotina de ponto do RH do começo ao fim, do cadastro da jornada aos arquivos fiscais.',
    shortDescEn: 'A web system and clock-in app in production for years, with about 8,000 customers and more than 12,000 connected devices. It covers HR\'s whole time-tracking routine, from setting up work schedules to the compliance files.',
    problemPt: 'O RH usa o sistema todo dia: cadastra jornadas, escalas e feriados, lança abonos, afastamentos e compensações em lote, aprova o que os funcionários pedem pelo app, trata as marcações e fecha o banco de horas. No fim do mês saem o espelho de ponto, mais de 15 relatórios e os arquivos fiscais que a lei exige (AFDT, ACJEF, AEJ). Por baixo, tudo segue as regras trabalhistas brasileiras, e cada correção mexe num número que vai para a folha de pagamento. Com esse volume de clientes, uma consulta mal planejada já vira lentidão.',
    problemEn: 'HR uses it every day: they set up work schedules, shifts and holidays, post absences, leaves and time-off compensation in bulk, approve what employees request through the app, review punches and close the hour bank. At month end come the timesheet, more than 15 reports and the compliance files required by law (AFDT, ACJEF, AEJ). Underneath, everything follows Brazilian labor rules, and every fix touches a number that ends up in payroll. With this many customers, one badly planned query is enough to slow things down.',
    builtPt: 'Trabalho nele desde o meu primeiro dia na empresa, em agosto de 2024, na sustentação e na evolução do sistema web e do app:',
    builtEn: 'I have worked on it since my first day at the company, in August 2024, maintaining and extending the web system and the app:',
    builtListPt: [
      'corrigi regras de cálculo, como hora noturna reduzida, adicional noturno com tolerância e compensação depois de um dia de falta;',
      'fiz a troca de empresa do funcionário no meio de um período, mantendo o histórico de departamento;',
      'no app de ponto, trabalhei no modo quiosque: fechei uma falha que deixava ver a senha, fiz o login automático, a sincronização dos comandos pendentes e a troca entre QR Code e PIN;',
      'nas consultas lentas, troco entidades com todas as relações por DTOs com os campos necessários, reviso os índices, filtro por id em vez de LIKE e limito o retorno.',
    ],
    builtListEn: [
      'fixed calculation rules such as reduced night hours, night shift pay with tolerance and compensation after an absence;',
      'built the change of an employee\'s company in the middle of a period, keeping the department history;',
      'in the clock-in app, worked on kiosk mode: closed a flaw that exposed the password and built automatic login, pending command sync and switching between QR Code and PIN;',
      'on slow queries, I replace entities loaded with every relation by DTOs with only the needed fields, review indexes, filter by id instead of LIKE and limit the result.',
    ],
    tags: ['Java', 'Spring Boot', 'SQL Server', 'Ionic', 'Kafka', 'Redis', 'WebSockets', 'AngularJS'],
    featured: true,
  },
  {
    slug: 'ferramentas-internas',
    titlePt: 'Ferramentas Internas',
    titleEn: 'Internal Tools',
    shortDescPt: 'Duas ferramentas para o time e o suporte: uma roda scripts e consultas em todas as bases de cliente de uma vez; a outra mostra quais equipamentos estão conectados.',
    shortDescEn: 'Two tools for the team and support: one runs scripts and queries on every customer database at once; the other shows which devices are connected.',
    problemPt: 'Cada cliente tem a própria base. A atualização de schema já rodava em lote, por PowerShell, mas pedia umas 12 janelas abertas ao mesmo tempo, e atualizar 4 mil bases levava de 1h30 a 2h.',
    problemEn: 'Each customer has its own database. Schema updates already ran in batches through PowerShell, but they needed about 12 windows open at once, and updating 4,000 databases took 1.5 to 2 hours.',
    builtPt: 'Em Python:',
    builtEn: 'In Python:',
    builtListPt: [
      'um executor de scripts de linha de comando: escolhe o sistema, o ambiente e a operação e roda em todas as bases, cada uma com a sua transação. Cada script gerado fica salvo, e o resultado de cada base, com sucesso ou erro, vai para uma tabela própria;',
      'no mesmo executor, consultas: a query roda em todas as bases e o resultado sai em CSV e TXT;',
      'num painel de conectividade dos equipamentos (Dash e Plotly), que mostra os equipamentos conectados, tentando conectar ou caídos, de 1 minuto a 7 dias, fiz a persistência de 7 dias, a escolha de sistema e ambiente e o deploy em Docker.',
    ],
    builtListEn: [
      'a command-line script runner: pick the system, the environment and the operation, and it runs on every database, each in its own transaction. Every generated script is saved, and each database\'s result, success or error, goes into its own table;',
      'in the same runner, queries: the query runs on every database and the result comes out as CSV and TXT;',
      'on a device connectivity dashboard (Dash and Plotly) that shows devices online, connecting or down, from 1 minute to 7 days, I built the 7-day persistence, system and environment selection and the Docker deploy.',
    ],
    resultPt: 'Uma atualização que levava de 1h30 a 2h em 4 mil bases hoje roda em 8 mil bases em cerca de 3 minutos, com a trilha de sucessos e falhas de cada uma.',
    resultEn: 'An update that took 1.5 to 2 hours on 4,000 databases now runs on 8,000 databases in about 3 minutes, with a trail of each one\'s successes and failures.',
    tags: ['Python', 'SQL Server', 'Redis', 'Docker', 'Dash', 'Plotly', 'pandas'],
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
];
