// src/scripts/heroShader.ts
// Liga o fundo em WebGL do hero, desenhado em um worker (heroShader.worker.ts).
// Carregado só depois que a página abre. Quem não consegue rodar fica com o fundo
// em CSS (.hero__grid e .orb), que continua no HTML.

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

  const redimensionar = new ResizeObserver(() => worker.postMessage({ tipo: 'tela', tela: lerTela() }));
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
