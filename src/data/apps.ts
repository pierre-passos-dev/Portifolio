// src/data/apps.ts
// Apps próprios, publicados pela Campier (https://campier.app).
// Um app novo = um item aqui. Ordem: o mais recente primeiro.
// Projetos feitos nas empresas ficam em projects.ts.

export type StatusApp = 'em-breve' | 'teste-fechado' | 'na-loja';

export interface App {
  slug: string;
  nome: string;
  /** Ícone em public/apps/. Sem ícone, o card mostra a inicial. */
  icone?: string;
  descPt: string;
  descEn: string;
  /** O que vale contar para quem avalia o código (2 a 4 itens). */
  destaquesPt: string[];
  destaquesEn: string[];
  tags: string[];
  status: StatusApp;
  /** Página do app no site da Campier. */
  site?: string;
  /** Link da Play Store, quando estiver publicado. */
  play?: string;
}

export const campier = {
  site: 'https://campier.app/',
};

export const apps: App[] = [
  {
    slug: 'parcelas',
    nome: 'Parcelas',
    icone: '/apps/parcelas.svg',
    descPt: 'Acompanha financiamento e consórcio de carro, moto ou imóvel: o que já foi pago, quanto falta e quando termina.',
    descEn: 'Tracks car, motorcycle and home loans and Brazilian consórcios: what has been paid, what is left and when it ends.',
    destaquesPt: [
      'Motor de cálculo Price e SAC em Dart puro, com testes',
      'Offline: dados só no celular, backup em arquivo',
      'Avisos de vencimento, widget na tela inicial e bloqueio por biometria',
    ],
    destaquesEn: [
      'Price and SAC amortization engine in pure Dart, with tests',
      'Offline: data stays on the phone, file backup',
      'Due-date reminders, home screen widget and biometric lock',
    ],
    tags: ['Flutter', 'Dart', 'SQLite', 'Riverpod', 'Kotlin'],
    status: 'teste-fechado',
    site: 'https://campier.app/parcelas/',
  },
];
