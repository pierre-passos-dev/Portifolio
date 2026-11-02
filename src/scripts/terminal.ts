// src/scripts/terminal.ts
// Comandos do terminal escondido. Carregado só quando alguém abre o terminal.
// O visual e o atalho de teclado ficam em components/Terminal.astro.
import { apps, campier } from '../data/apps';
import { experiences } from '../data/experience';
import { projects } from '../data/projects';
import { coreSkills, currentSkills } from '../data/skills';

type Idioma = 'pt' | 'en';

const CONTATO = {
  email: 'pierre.passos.dev@gmail.com',
  github: 'https://github.com/pierre-passos-dev',
  linkedin: 'https://www.linkedin.com/in/pierre-passos',
};

const SECOES: Record<string, { id: string; pt: string; en: string }> = {
  inicio: { id: 'hero', pt: 'inicio', en: 'home' },
  home: { id: 'hero', pt: 'inicio', en: 'home' },
  apps: { id: 'apps', pt: 'apps', en: 'apps' },
  sobre: { id: 'about', pt: 'sobre', en: 'about' },
  about: { id: 'about', pt: 'sobre', en: 'about' },
  projetos: { id: 'projects', pt: 'projetos', en: 'projects' },
  projects: { id: 'projects', pt: 'projetos', en: 'projects' },
  habilidades: { id: 'skills', pt: 'habilidades', en: 'skills' },
  skills: { id: 'skills', pt: 'habilidades', en: 'skills' },
  experiencia: { id: 'experience', pt: 'experiencia', en: 'experience' },
  experience: { id: 'experience', pt: 'experiencia', en: 'experience' },
  contato: { id: 'contact', pt: 'contato', en: 'contact' },
  contact: { id: 'contact', pt: 'contato', en: 'contact' },
};

const TEXTOS = {
  pt: {
    boasVindas: 'PIERRE PASSOS // TERMINAL',
    instrucao: 'Digite um comando ou escolha um da lista.',
    naoEncontrado: (c: string) => `Comando não encontrado: ${c}`,
    tenteAjuda: 'Digite ajuda para ver a lista.',
    sobre: [
      'Sou desenvolvedor Full Stack em Curitiba, há mais de 4 anos.',
      'Trabalho com Java, Angular, Ionic e Azure, principalmente em sistemas de ponto integrados a hardware e plataformas multi-tenant.',
      'Também crio meus próprios apps, publicados pela Campier.',
    ],
    principais: 'Principais',
    status: { 'em-breve': 'Em breve', 'teste-fechado': 'Em teste no Google Play', 'na-loja': 'No Google Play' },
    baixando: 'Baixando o currículo...',
    baixarDeNovo: 'Baixar de novo',
    curriculo: '/curriculo-pierre-passos.pdf',
    irPara: 'Para onde? Escolha uma seção:',
    secaoDesconhecida: (s: string) => `Essa seção não existe: ${s}`,
    glitch: 'Sinal instável por um instante...',
    semMovimento: 'Sua configuração de "reduzir movimento" está ligada, então deixei a tela quieta.',
    sudo: 'Permissão negada. Este incidente será informado ao Pierre.',
    rm: 'Boa tentativa. O site continua no ar.',
    dica: 'Dica: tem um código antigo de videogame escondido neste site.',
  },
  en: {
    boasVindas: 'PIERRE PASSOS // TERMINAL',
    instrucao: 'Type a command or pick one from the list.',
    naoEncontrado: (c: string) => `Command not found: ${c}`,
    tenteAjuda: 'Type help to see the list.',
    sobre: [
      'I\'m a Full Stack Developer in Curitiba, Brazil, with over 4 years of experience.',
      'I work with Java, Angular, Ionic and Azure, mainly on time tracking systems integrated with hardware and multi-tenant platforms.',
      'I also build my own apps, published under Campier.',
    ],
    principais: 'Core',
    status: { 'em-breve': 'Coming soon', 'teste-fechado': 'In testing on Google Play', 'na-loja': 'On Google Play' },
    baixando: 'Downloading the resume...',
    baixarDeNovo: 'Download again',
    curriculo: '/resume-pierre-passos.pdf',
    irPara: 'Where to? Pick a section:',
    secaoDesconhecida: (s: string) => `That section does not exist: ${s}`,
    glitch: 'Unstable signal for a moment...',
    semMovimento: 'Your "reduce motion" setting is on, so I kept the screen still.',
    sudo: 'Permission denied. This incident will be reported to Pierre.',
    rm: 'Nice try. The site is still up.',
    dica: 'Tip: there is an old video game code hidden on this site.',
  },
};

const AJUDA: { pt: string; en: string; descPt: string; descEn: string }[] = [
  { pt: 'sobre', en: 'about', descPt: 'quem eu sou', descEn: 'who I am' },
  { pt: 'apps', en: 'apps', descPt: 'meus apps', descEn: 'my apps' },
  { pt: 'projetos', en: 'projects', descPt: 'projetos que fiz nas empresas', descEn: 'projects I built at work' },
  { pt: 'habilidades', en: 'skills', descPt: 'tecnologias', descEn: 'technologies' },
  { pt: 'experiencia', en: 'experience', descPt: 'onde já trabalhei', descEn: 'where I have worked' },
  { pt: 'contato', en: 'contact', descPt: 'e-mail, GitHub e LinkedIn', descEn: 'email, GitHub and LinkedIn' },
  { pt: 'curriculo', en: 'resume', descPt: 'baixa o PDF', descEn: 'downloads the PDF' },
  { pt: 'ir', en: 'goto', descPt: 'vai até uma seção do site', descEn: 'jumps to a section of the site' },
  { pt: 'glitch', en: 'glitch', descPt: 'experimente', descEn: 'try it' },
  { pt: 'limpar', en: 'clear', descPt: 'limpa a tela', descEn: 'clears the screen' },
  { pt: 'sair', en: 'exit', descPt: 'fecha o terminal', descEn: 'closes the terminal' },
];

// Sem acento e sem as marcas de tecla morta que o atalho ~ pode deixar no campo
function normalizar(texto: string) {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/^[`~´^¨\s]+/, '')
    .trim()
    .toLowerCase();
}

export function iniciar(dialogo: HTMLDialogElement) {
  const lang = (dialogo.dataset.lang === 'en' ? 'en' : 'pt') as Idioma;
  const T = TEXTOS[lang];
  const saida = dialogo.querySelector<HTMLElement>('#termSaida')!;
  const form = dialogo.querySelector<HTMLFormElement>('#termForm')!;
  const entrada = dialogo.querySelector<HTMLInputElement>('#termEntrada')!;
  const toque = matchMedia('(pointer: coarse)').matches;

  const historico: string[] = [];
  let posicao = 0;

  function bloco(classe = '') {
    const el = document.createElement('div');
    el.className = `term__bloco ${classe}`.trim();
    saida.appendChild(el);
    return el;
  }

  function linha(texto: string, classe = '', destino: HTMLElement = bloco()) {
    const el = document.createElement('p');
    el.className = classe;
    el.textContent = texto;
    destino.appendChild(el);
    return el;
  }

  function link(texto: string, href: string, destino: HTMLElement) {
    const p = document.createElement('p');
    const a = document.createElement('a');
    a.textContent = texto;
    a.href = href;
    if (href.startsWith('http')) {
      a.target = '_blank';
      a.rel = 'noopener';
    }
    p.appendChild(a);
    destino.appendChild(p);
    return a;
  }

  function botaoComando(comando: string, descricao: string, destino: HTMLElement) {
    const p = document.createElement('p');
    p.className = 'term__opcao';
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = comando;
    b.addEventListener('click', () => {
      executar(comando);
      if (!toque) entrada.focus();
    });
    p.appendChild(b);
    if (descricao) {
      const d = document.createElement('span');
      d.textContent = descricao;
      p.appendChild(d);
    }
    destino.appendChild(p);
  }

  const ajuda = () => {
    const b = bloco();
    for (const c of AJUDA) botaoComando(c[lang], lang === 'pt' ? c.descPt : c.descEn, b);
    linha(T.dica, 'term__fraco', b);
  };

  const sobre = () => {
    const b = bloco();
    for (const texto of T.sobre) linha(texto, '', b);
  };

  const listaApps = () => {
    for (const app of apps) {
      const b = bloco();
      linha(`${app.nome} [${T.status[app.status]}]`, 'term__titulo', b);
      linha(lang === 'pt' ? app.descPt : app.descEn, '', b);
      linha(app.tags.join(' · '), 'term__fraco', b);
      if (app.site) link(app.site, app.site, b);
    }
    link(campier.site, campier.site, bloco());
  };

  const listaProjetos = () => {
    for (const p of projects) {
      const b = bloco();
      linha(lang === 'pt' ? p.titlePt : p.titleEn, 'term__titulo', b);
      linha(lang === 'pt' ? p.shortDescPt : p.shortDescEn, '', b);
      linha(p.tags.join(' · '), 'term__fraco', b);
      if (p.github) link(p.github, p.github, b);
      if (p.demo) link(p.demo, p.demo, b);
    }
  };

  const habilidades = () => {
    const b = bloco();
    linha(T.principais, 'term__titulo', b);
    for (const s of coreSkills) linha(`${s.name}: ${lang === 'pt' ? s.notePt : s.noteEn}`, '', b);
    for (const grupo of currentSkills) {
      const g = bloco();
      linha(grupo.key, 'term__titulo', g);
      linha(grupo.items.join(' · '), '', g);
    }
  };

  const experiencia = () => {
    for (const x of experiences) {
      const b = bloco();
      linha(`${lang === 'pt' ? x.rolePt : x.roleEn} @ ${x.company}`, 'term__titulo', b);
      linha(lang === 'pt' ? x.periodPt : x.periodEn, '', b);
      linha(x.tags.join(' · '), 'term__fraco', b);
    }
  };

  const contato = () => {
    const b = bloco();
    link(CONTATO.email, `mailto:${CONTATO.email}`, b);
    link(CONTATO.github, CONTATO.github, b);
    link(CONTATO.linkedin, CONTATO.linkedin, b);
  };

  const curriculo = () => {
    const b = bloco();
    linha(T.baixando, '', b);
    const a = link(T.baixarDeNovo, T.curriculo, b);
    a.download = '';
    a.click();
  };

  const ir = (destino?: string) => {
    const secao = destino ? SECOES[destino] : undefined;
    if (secao) {
      dialogo.close();
      document.getElementById(secao.id)?.scrollIntoView();
      return;
    }
    const b = bloco();
    if (destino) linha(T.secaoDesconhecida(destino), 'term__erro', b);
    linha(T.irPara, '', b);
    const nomes = new Set(Object.values(SECOES).map(s => s[lang]));
    const verbo = lang === 'pt' ? 'ir' : 'goto';
    for (const nome of nomes) botaoComando(`${verbo} ${nome}`, '', b);
  };

  const glitch = () => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      linha(T.semMovimento);
      return;
    }
    linha(T.glitch);
    window.dispatchEvent(new CustomEvent('site:glitch'));
  };

  const limpar = () => {
    saida.textContent = '';
  };

  const COMANDOS: Record<string, (argumento?: string) => void> = {
    ajuda, help: ajuda,
    sobre, about: sobre, whoami: sobre,
    apps: listaApps,
    projetos: listaProjetos, projects: listaProjetos,
    habilidades, skills: habilidades,
    experiencia, experience: experiencia,
    contato, contact: contato,
    curriculo, resume: curriculo, cv: curriculo,
    ir, goto: ir, cd: ir, ls: () => ir(),
    glitch,
    limpar, clear: limpar, cls: limpar,
    sair: () => dialogo.close(), exit: () => dialogo.close(), quit: () => dialogo.close(),
    sudo: () => linha(T.sudo, 'term__erro'),
    rm: () => linha(T.rm),
  };

  function executar(digitado: string) {
    const texto = normalizar(digitado);
    if (!texto) return;
    historico.push(texto);
    posicao = historico.length;

    const eco = linha(`> ${texto}`, 'term__eco');
    const [nome, argumento] = texto.split(/\s+/);
    const comando = Object.prototype.hasOwnProperty.call(COMANDOS, nome) ? COMANDOS[nome] : undefined;
    if (comando) {
      comando(argumento);
    } else {
      const b = bloco();
      linha(T.naoEncontrado(nome), 'term__erro', b);
      linha(T.tenteAjuda, 'term__fraco', b);
    }
    // Resposta longa: a tela fica no começo dela, não no fim
    if (eco.isConnected) saida.scrollTop = eco.closest<HTMLElement>('.term__bloco')!.offsetTop;
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const texto = entrada.value;
    entrada.value = '';
    executar(texto);
  });

  entrada.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      if (!historico.length) return;
      e.preventDefault();
      posicao = Math.min(historico.length, Math.max(0, posicao + (e.key === 'ArrowUp' ? -1 : 1)));
      entrada.value = historico[posicao] ?? '';
    } else if (e.key === 'Tab' && entrada.value.trim()) {
      // Com o campo vazio, o Tab continua levando o foco para o resto do terminal
      e.preventDefault();
      const texto = normalizar(entrada.value);
      const [nome, parte] = texto.split(/\s+/);
      // Primeiro os nomes no idioma da página: "pro" não pode empatar entre projetos e projects
      const unico = (nomes: string[], inicio: string) => {
        const achados = [...new Set(nomes)].filter(n => n.startsWith(inicio));
        return achados.length === 1 ? achados[0] : undefined;
      };
      if (parte === undefined) {
        const achado = unico(AJUDA.map(c => c[lang]), nome) ?? unico(Object.keys(COMANDOS), nome);
        if (achado) entrada.value = `${achado} `;
      } else {
        const achado = unico(Object.values(SECOES).map(s => s[lang]), parte) ?? unico(Object.keys(SECOES), parte);
        if (achado) entrada.value = `${nome} ${achado}`;
      }
    }
  });

  // Clicar no meio do texto volta para o campo, sem atrapalhar quem está selecionando
  saida.addEventListener('click', e => {
    if (toque || (e.target as HTMLElement).closest('a, button') || getSelection()?.toString()) return;
    entrada.focus();
  });

  const inicio = bloco();
  linha(T.boasVindas, 'term__titulo', inicio);
  linha(T.instrucao, '', inicio);
  ajuda();
}
