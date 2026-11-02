// src/scripts/heroShader.ts
// Liga o fundo em WebGL do hero, desenhado em um worker (heroShader.worker.ts).
// Carregado só depois que a página abre. Quem não consegue rodar fica com o fundo
// em CSS (.hero__grid e .orb), que continua no HTML.

// Folga em volta das letras, para caber o halo e as faíscas que sobem
const FOLGA = 110;

/** Desenha o nome para o shader: vermelho = letras, verde = letras borradas. */
async function imagemDoNome(nome: HTMLElement, hero: HTMLElement) {
  // A posição vem do h1, que nunca se mexe: o nome salta e treme com o glitch, mas
  // a imagem precisa ficar no lugar original. O nome é o primeiro item do h1.
  const posicao = nome.parentElement!.getBoundingClientRect();
  const origem = hero.getBoundingClientRect();
  const estilo = getComputedStyle(nome);
  const alturaLinha = parseFloat(estilo.height);
  const tamanhoFonte = parseFloat(estilo.fontSize);
  const fonte = `${estilo.fontWeight} ${estilo.fontSize} ${estilo.fontFamily}`;
  const texto = nome.dataset.text!;
  const nitidez = Math.min(devicePixelRatio || 1, 2);

  const tela = document.createElement('canvas');
  const c = tela.getContext('2d') as CanvasRenderingContext2D & { letterSpacing: string };
  c.font = fonte;
  // Nem todo navegador tem letterSpacing no canvas: sem ele, escreve letra por letra
  const espaco = 'letterSpacing' in c ? 0 : parseFloat(estilo.letterSpacing) || 0;
  const ajustar = () => { if ('letterSpacing' in c) c.letterSpacing = estilo.letterSpacing; };
  ajustar();
  const medida = c.measureText(texto);
  const larguraTexto = medida.width + espaco * texto.length;
  const escrever = (x: number, y: number) => {
    if (!espaco) return c.fillText(texto, x, y);
    for (const letra of texto) {
      c.fillText(letra, x, y);
      x += c.measureText(letra).width + espaco;
    }
  };
  const largura = Math.ceil(larguraTexto) + FOLGA * 2;
  const altura = Math.ceil(alturaLinha) + FOLGA * 2;

  tela.width = largura * nitidez;
  tela.height = altura * nitidez;
  // Mudar o tamanho do canvas zera o contexto
  c.scale(nitidez, nitidez);
  c.font = fonte;
  ajustar();
  c.fillStyle = '#000';
  c.fillRect(0, 0, largura, altura);

  // Mesma conta do navegador: o texto fica centralizado na altura da linha
  const subida = medida.fontBoundingBoxAscent, descida = medida.fontBoundingBoxDescent;
  const base = FOLGA + (alturaLinha - (subida + descida)) / 2 + subida;

  c.fillStyle = '#0f0';
  c.shadowColor = '#0f0';
  c.shadowBlur = tamanhoFonte * 0.25 * nitidez; // shadowBlur ignora o scale do contexto
  escrever(FOLGA, base);
  escrever(FOLGA, base);
  c.shadowBlur = 0;
  c.globalCompositeOperation = 'lighter';
  c.fillStyle = '#f00';
  escrever(FOLGA, base);

  const topo = posicao.top - origem.top - FOLGA;
  return {
    imagem: await createImageBitmap(tela),
    caixa: [posicao.left - origem.left - FOLGA, hero.clientHeight - topo - altura, largura, altura],
  };
}

/** Liga o fundo. Devolve false se o navegador não tiver como rodar o shader; aoFalhar avisa se ele desistir depois. */
export function iniciarFundo(hero: HTMLElement, aoFalhar: () => void) {
  const canvas = hero.querySelector<HTMLCanvasElement>('.hero__shader');
  if (!canvas || !canvas.transferControlToOffscreen || !window.Worker) return false;

  const worker = new Worker(new URL('./heroShader.worker.ts', import.meta.url), { type: 'module' });
  const lerTela = () => ({ largura: hero.clientWidth, altura: hero.clientHeight, dpr: devicePixelRatio || 1 });
  const offscreen = canvas.transferControlToOffscreen();
  worker.postMessage(
    { tipo: 'inicio', canvas: offscreen, toque: matchMedia('(pointer: coarse)').matches, tela: lerTela() },
    [offscreen],
  );

  const enviarNome = async () => {
    const nome = hero.querySelector<HTMLElement>('.hero__name');
    if (!nome) return;
    await document.fonts.ready;
    const { imagem, caixa } = await imagemDoNome(nome, hero);
    worker.postMessage({ tipo: 'nome', imagem, caixa }, [imagem]);
  };
  enviarNome();

  let esperaNome = 0;
  const redimensionar = new ResizeObserver(() => {
    worker.postMessage({ tipo: 'tela', tela: lerTela() });
    clearTimeout(esperaNome);
    esperaNome = window.setTimeout(enviarNome, 150);
  });
  redimensionar.observe(hero);

  function aoMover(e: PointerEvent) {
    const r = hero.getBoundingClientRect();
    worker.postMessage({ tipo: 'mouse', x: e.clientX - r.left, y: r.height - (e.clientY - r.top) });
  }
  window.addEventListener('pointermove', aoMover, { passive: true });

  // Reage aos mesmos glitches do nome, sem o BaseLayout precisar saber do shader
  const nome = hero.querySelector('.hero__name');
  const aoGlitch = (e: Event) => {
    if ((e as AnimationEvent).animationName === 'glitch-jolt') worker.postMessage({ tipo: 'glitch' });
  };
  nome?.addEventListener('animationstart', aoGlitch);

  // Só desenha com o hero na tela; com mais da metade dele à vista, as partículas
  // do BaseLayout descansam, porque ficariam escondidas atrás do shader
  let naTela = true;
  const avisarVisivel = () => worker.postMessage({ tipo: 'visivel', visivel: naTela && !document.hidden });
  const observador = new IntersectionObserver(([e]) => {
    naTela = e.isIntersecting;
    hero.classList.toggle('shader-em-foco', hero.classList.contains('has-shader') && e.intersectionRatio >= 0.5);
    avisarVisivel();
  }, { threshold: [0, 0.5] });
  observador.observe(hero);
  document.addEventListener('visibilitychange', avisarVisivel);

  function desistir() {
    clearTimeout(esperaNome);
    worker.terminate();
    observador.disconnect();
    redimensionar.disconnect();
    window.removeEventListener('pointermove', aoMover);
    nome?.removeEventListener('animationstart', aoGlitch);
    document.removeEventListener('visibilitychange', avisarVisivel);
    hero.classList.remove('has-shader', 'shader-em-foco');
    aoFalhar();
  }

  worker.addEventListener('error', desistir);
  worker.addEventListener('message', e => {
    if (e.data === 'falhou') desistir();
    else if (e.data === 'pronto') {
      hero.classList.add('has-shader');
      const r = hero.getBoundingClientRect();
      hero.classList.toggle('shader-em-foco', Math.min(r.bottom, innerHeight) - Math.max(r.top, 0) >= r.height / 2);
    }
  });
  return true;
}
