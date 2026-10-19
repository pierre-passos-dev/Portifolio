// src/data/skills.ts
// Usado pela seção de habilidades e pelo gerador do currículo (scripts/gerar-curriculo.mjs)
// As principais: o que eu defenderia em qualquer entrevista
export const coreSkills = [
  { name: "Java + Spring Boot", notePt: "APIs REST, Hibernate/JPA, virtual threads", noteEn: "REST APIs, Hibernate/JPA, virtual threads" },
  { name: "Angular", notePt: "Web corporativa, SSR, lazy loading", noteEn: "Enterprise web, SSR, lazy loading" },
  { name: "Ionic", notePt: "Apps web, Android e iOS", noteEn: "Web, Android and iOS apps" },
  { name: "TypeScript", notePt: "Front, mobile e Node.js", noteEn: "Frontend, mobile and Node.js" },
  { name: "Azure", notePt: "Deploy, App Service, multi-tenant", noteEn: "Deploys, App Service, multi-tenant" },
] as const;

export const currentSkills = [
  {
    key: "Backend",
    items: [
      "Java",
      "Spring Boot",
      "Hibernate",
      "JPA",
      "REST APIs",
      "Node.js",
      "Express",
      "TypeORM",
      "Redis",
      "Kafka",
      "Virtual Threads",
      "C# .NET",
      "Tomcat",
    ],
  },
  {
    key: "Frontend",
    items: [
      "JavaScript",
      "AngularJS",
      "Angular",
      "TypeScript",
      "Bootstrap",
      "SCSS",
      "PWA",
    ],
  },
  { key: "Mobile", items: ["Ionic", "Capacitor", "Cordova", "Android"] },
  {
    key: "DevOps",
    items: [
      "Azure",
      "Docker",
      "Grafana",
      "Prometheus",
      "CI/CD",
      "Git",
    ],
  },
  { key: "Database", items: ["SQL Server", "PostgreSQL"] },
] as const;

export const learningSkills = [
  {
    key: "Backend",
    items: ["FastAPI", "Supabase", "Firebase", "Cloudflare R2", "Astro"],
  },
  { key: "Mobile", items: ["Flutter", "Dart", "Drift", "SQLite"] },
] as const;
