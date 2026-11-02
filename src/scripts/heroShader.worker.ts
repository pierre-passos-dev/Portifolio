// src/scripts/heroShader.worker.ts
// Desenha o fundo do hero em WebGL: grade âmbar que ondula perto do cursor, faíscas
// subindo e interferência de sinal. Roda em um worker porque criar o contexto WebGL
// pode travar a thread principal por centenas de milissegundos em aparelho sem GPU.
// Roda em qualquer aparelho e desiste sozinho se os quadros ficarem lentos demais.
// Avisa a página com 'pronto' ou 'falhou'; ver heroShader.ts.

const VERTEX = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAGMENT = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 u_res;      // tamanho do canvas em pixels de desenho
uniform float u_escala;  // pixels de desenho por pixel CSS
uniform float u_t;       // tempo em segundos
uniform vec3 u_mouse;    // x e y em pixels CSS (origem embaixo), z = força
uniform float u_glitch;  // 1 no instante do glitch do nome, cai até 0
uniform float u_intenso;  // modo secreto: vai de 0 a 1
uniform sampler2D u_nome;  // "PIERRE": vermelho = letras, verde = letras borradas
uniform vec4 u_nomeCaixa;  // x, y, largura e altura em pixels CSS (origem embaixo)

const vec3 FUNDO = vec3(0.0196, 0.0196, 0.0275); // --bg-base
const vec3 AMBAR = vec3(1.0, 0.55, 0.0);         // --accent
const vec3 BRASA = vec3(1.0, 0.27, 0.0);         // --accent-hot
const vec3 GLITCH_A = vec3(1.0, 0.23, 0.12);     // --glitch-a
const vec3 GLITCH_B = vec3(0.18, 0.84, 0.88);    // --glitch-b

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

// Mesma grade de 60px do CSS. Devolve 1 em cima da linha e 0 fora dela
float grade(vec2 q) {
  vec2 g = abs(fract(q / 60.0 - 0.5) - 0.5) * 60.0 * u_escala;
  return 1.0 - smoothstep(0.0, 1.25, min(g.x, g.y));
}

float orbe(vec2 p, vec2 centro, float raio) {
  vec2 d = p - centro;
  return exp(-dot(d, d) / (raio * raio));
}

float faiscas(vec2 uv, float aspecto, float camada) {
  float celulas = 11.0 + camada * 7.0;
  vec2 c = vec2(uv.x * aspecto, uv.y) * celulas;
  c.y -= u_t * (0.28 + camada * 0.12);
  c.x += sin(c.y * 0.7 + camada * 2.1) * 0.25;
  vec2 id = floor(c);
  vec2 f = fract(c) - 0.5;
  float h = hash(id + camada * 17.0);
  vec2 pos = (vec2(hash(id + 3.1), hash(id + 7.7)) - 0.5) * 0.7;
  // distância em pixels CSS, para a faísca ter o mesmo tamanho em qualquer tela
  float d = length(f - pos) * u_res.y / (celulas * u_escala);
  float brilho = smoothstep(2.0, 0.2, d) + 0.22 * exp(-d * 0.3);
  return step(0.84, h) * brilho * (0.55 + 0.45 * sin(u_t * 2.6 + h * 40.0));
}

vec2 nomeEm(vec2 q) {
  vec2 n = (q - u_nomeCaixa.xy) / u_nomeCaixa.zw;
  if (n.x < 0.0 || n.x > 1.0 || n.y < 0.0 || n.y > 1.0) return vec2(0.0);
  return texture2D(u_nome, vec2(n.x, 1.0 - n.y)).rg;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspecto = u_res.x / u_res.y;
  vec2 p = vec2(uv.x * aspecto, uv.y);
  vec2 q = gl_FragCoord.xy / u_escala;

  // Glitch: faixas horizontais que pulam de lugar
  float passo = floor(u_t * 22.0);
  float faixa = floor(uv.y * 9.0 + hash(vec2(passo, 1.0)) * 3.0);
  float sorteio = hash(vec2(faixa, passo));
  float rasgo = step(1.0 - u_glitch * 0.6, sorteio);
  q.x += rasgo * (sorteio - 0.5) * 260.0 * u_glitch;
  // Sem as ondulações: o que depende do nome precisa ficar alinhado com as letras do HTML
  vec2 qFixo = q;

  // Ondulação lenta o tempo todo
  q += vec2(sin(q.y * 0.006 + u_t * 0.35), cos(q.x * 0.005 - u_t * 0.28)) * (7.0 + 18.0 * u_intenso);

  // Onda em volta do cursor
  vec2 dm = q - u_mouse.xy;
  float rm = length(dm);
  float perto = exp(-rm * 0.0055) * u_mouse.z;
  // some no centro: sem isso, a grade forma um nó bem embaixo do cursor
  q += dm / max(rm, 1.0) * sin(rm * 0.045 - u_t * 3.5) * exp(-rm * 0.006) * smoothstep(0.0, 90.0, rm) * u_mouse.z * 14.0;

  // A grade desvia das letras, como se o nome esquentasse o ar em volta
  bool temNome = u_nomeCaixa.z > 0.0;
  float halo = 0.0;
  if (temNome) {
    vec2 e = vec2(9.0, 0.0);
    vec2 subida = vec2(nomeEm(qFixo + e.xy).g - nomeEm(qFixo - e.xy).g, nomeEm(qFixo + e.yx).g - nomeEm(qFixo - e.yx).g);
    q -= subida * 26.0;
    halo = nomeEm(qFixo).g;
  }

  // A grade some nas bordas, como a máscara que o CSS usava
  float mascara = 1.0 - smoothstep(0.3, 1.0, length((uv - 0.5) / vec2(0.85, 0.8)));
  float pulso = pow(0.5 + 0.5 * sin((uv.x + uv.y) * 4.0 - u_t * 0.5), 18.0);
  float linha = grade(q);
  vec3 cor = AMBAR * linha * (0.075 * mascara + 0.1 * pulso * mascara + 0.26 * perto);

  // Cores do glitch do nome separando a grade
  if (u_glitch > 0.01) {
    float abertura = 5.0 * u_glitch;
    cor += GLITCH_A * grade(q + vec2(abertura, 0.0)) * 0.2 * u_glitch * mascara;
    cor += GLITCH_B * grade(q - vec2(abertura, 0.0)) * 0.2 * u_glitch * mascara;
    cor += AMBAR * rasgo * 0.03 * u_glitch;
  }

  // Luzes de fundo, nos lugares dos antigos orbes. Em tela em pé elas encolhem,
  // senão tomariam a tela toda e o fundo deixaria de ser escuro
  float raio = clamp(aspecto / 1.6, 0.45, 1.0);
  cor += AMBAR * 0.1 * orbe(p, vec2(0.05 + 0.04 * sin(u_t * 0.4), 1.0 + 0.05 * cos(u_t * 0.3)), 0.62 * raio);
  cor += BRASA * 0.075 * orbe(p, vec2(aspecto - 0.05 + 0.05 * cos(u_t * 0.3), 0.04 + 0.05 * sin(u_t * 0.35)), 0.52 * raio);
  cor += AMBAR * 0.035 * perto;

  // Faixa de interferência que sobe devagar
  float sinal = pow(0.5 + 0.5 * sin(uv.y * 6.0 - u_t * 0.7 + sin(uv.x * 3.0 + u_t * 0.2)), 40.0);
  cor += AMBAR * sinal * 0.018;

  // Faíscas, mais densas perto do chão
  float chao = 0.12 + pow(1.0 - uv.y, 1.6);
  cor += mix(AMBAR, BRASA, 0.35) * (faiscas(uv, aspecto, 0.0) + faiscas(uv, aspecto, 1.0) * 0.7) * chao * 0.75;

  if (temNome) {
    vec2 letras = nomeEm(qFixo);
    float pertoNome = exp(-length(qFixo - u_mouse.xy) * 0.005) * u_mouse.z;

    // Halo que respira e cresce com o cursor por perto
    float respira = 0.78 + 0.22 * sin(u_t * 1.3 + sin(u_t * 0.37) * 2.0);
    cor += mix(AMBAR, BRASA, 0.25) * letras.g * (0.17 * respira + 0.34 * pertoNome);

    // Imagem fantasma: fica escondida atrás das letras e aparece quando o nome salta ou quebra
    cor += AMBAR * letras.r * (0.2 + 0.08 * sin(u_t * 41.0));
    if (u_glitch > 0.01) {
      float abre = 34.0 * u_glitch;
      cor += GLITCH_A * nomeEm(qFixo + vec2(abre, 0.0)).r * 0.55 * u_glitch;
      cor += GLITCH_B * nomeEm(qFixo - vec2(abre, 0.0)).r * 0.55 * u_glitch;
    }

    // Faíscas que saem de cima das letras
    float fonte = nomeEm(qFixo - vec2(0.0, 42.0)).g + nomeEm(qFixo - vec2(0.0, 84.0)).g * 0.6;
    float saindo = faiscas(uv * 1.5, aspecto, 3.0);
    cor += mix(AMBAR, GLITCH_A, 0.2) * saindo * fonte * (0.65 + 1.8 * pertoNome);
  }

  cor *= 1.0 + 0.9 * u_intenso;

  // Termina na cor do fundo, para não marcar a divisa com a próxima seção
  cor *= smoothstep(0.0, 0.07, uv.y);

  // Um pouco de grão evita faixas visíveis nos degradês escuros
  float grao = (hash(gl_FragCoord.xy + fract(u_t) * 91.0) - 0.5) / 96.0;
  gl_FragColor = vec4(FUNDO + cor + grao, 1.0);
}
`;

function compilar(gl: WebGLRenderingContext, tipo: number, fonte: string) {
  const shader = gl.createShader(tipo)!;
  gl.shaderSource(shader, fonte);
  gl.compileShader(shader);
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
}

let gl: WebGLRenderingContext;
let u: Record<'res' | 'escala' | 't' | 'mouse' | 'glitch' | 'intenso' | 'nomeCaixa', WebGLUniformLocation | null>;
let canvas: OffscreenCanvas;

// No celular: menos pixels e no máximo 30 quadros por segundo, para poupar bateria
let maxPixels = 2_000_000, maxDpr = 1, intervaloMin = 0;

let qualidade = 1; // cai sozinha se o aparelho não acompanhar
const tela = { largura: 0, altura: 0, dpr: 1 };

// Cursor: o shader segue a posição suavizada e perde força quando ele para
const alvo = { x: 0, y: 0, ativo: 0 };
const mouse = { x: 0, y: 0, forca: 0 };
let glitch = 0;
let intenso = 0, alvoIntenso = 0;

let quadro = 0, ultimo = 0, tempo = Math.random() * 200;
let somaMedida = 0, quadrosMedidos = 0, descartar = 20;
let visivel = true, encerrado = false, avisou = false;

function falhar() {
  encerrado = true;
  self.postMessage('falhou');
}

function medir() {
  const { largura, altura, dpr } = tela;
  if (!gl || !largura || !altura) return;
  const limite = Math.sqrt(maxPixels / (largura * altura));
  const escala = Math.min(Math.min(dpr, maxDpr), limite) * qualidade;
  canvas.width = Math.round(largura * escala);
  canvas.height = Math.round(altura * escala);
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.uniform2f(u.res, canvas.width, canvas.height);
  gl.uniform1f(u.escala, canvas.width / largura);
}

function desenhar(agora: number) {
  if (encerrado) return;
  quadro = visivel ? requestAnimationFrame(desenhar) : 0;
  const passou = agora - ultimo;
  if (passou < intervaloMin) return;
  ultimo = agora;

  // Pausas longas (aba em segundo plano, hero fora da tela) não contam como lentidão
  if (passou < 250) {
    if (descartar > 0) descartar--;
    else {
      somaMedida += passou;
      if (++quadrosMedidos === 45) {
        const media = somaMedida / quadrosMedidos;
        somaMedida = quadrosMedidos = 0;
        descartar = 10;
        if (media > 36) {
          if (qualidade > 0.5) {
            qualidade = Math.max(0.5, qualidade * 0.75);
            medir();
          } else if (media > 50) {
            return falhar();
          }
        }
      }
    }
  }

  const dt = Math.min(passou, 50) / 1000;
  tempo = (tempo + dt) % 3600;
  alvo.ativo = Math.max(0, alvo.ativo - dt);
  glitch *= Math.exp(-dt * 6);
  intenso += (alvoIntenso - intenso) * (1 - Math.exp(-dt * 1.5));
  if (alvoIntenso && Math.random() < dt * 0.5) glitch = 1;
  const suave = 1 - Math.exp(-dt * 7);
  mouse.x += (alvo.x - mouse.x) * suave;
  mouse.y += (alvo.y - mouse.y) * suave;
  mouse.forca += ((alvo.ativo > 0 ? 1 : 0) - mouse.forca) * (1 - Math.exp(-dt * 2.5));

  gl.uniform1f(u.t, tempo);
  gl.uniform3f(u.mouse, mouse.x, mouse.y, mouse.forca);
  gl.uniform1f(u.glitch, glitch);
  gl.uniform1f(u.intenso, intenso);
  gl.drawArrays(gl.TRIANGLES, 0, 3);

  if (!avisou) {
    avisou = true;
    self.postMessage('pronto');
  }
}

function iniciar(destino: OffscreenCanvas, toque: boolean) {
  canvas = destino;
  if (toque) {
    maxPixels = 700_000;
    maxDpr = 1.5;
    intervaloMin = 30;
  }

  const contexto = canvas.getContext('webgl', {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: 'low-power',
  }) as WebGLRenderingContext | null;
  if (!contexto || typeof requestAnimationFrame !== 'function') return falhar();
  gl = contexto;

  const vs = compilar(gl, gl.VERTEX_SHADER, VERTEX);
  const fs = compilar(gl, gl.FRAGMENT_SHADER, FRAGMENT);
  const programa = gl.createProgram();
  if (!vs || !fs || !programa) return falhar();
  gl.attachShader(programa, vs);
  gl.attachShader(programa, fs);
  gl.linkProgram(programa);
  if (!gl.getProgramParameter(programa, gl.LINK_STATUS)) return falhar();
  gl.useProgram(programa);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(programa, 'a_pos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  u = {
    res: gl.getUniformLocation(programa, 'u_res'),
    escala: gl.getUniformLocation(programa, 'u_escala'),
    t: gl.getUniformLocation(programa, 'u_t'),
    mouse: gl.getUniformLocation(programa, 'u_mouse'),
    glitch: gl.getUniformLocation(programa, 'u_glitch'),
    intenso: gl.getUniformLocation(programa, 'u_intenso'),
    nomeCaixa: gl.getUniformLocation(programa, 'u_nomeCaixa'),
  };

  // A imagem do nome chega depois, quando as fontes terminam de carregar
  gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]));

  canvas.addEventListener('webglcontextlost', falhar);
  medir();
  ultimo = performance.now();
  desenhar(ultimo);
}

self.addEventListener('message', (e: MessageEvent) => {
  const m = e.data;
  if (m.tipo === 'inicio') {
    Object.assign(tela, m.tela);
    iniciar(m.canvas, m.toque);
  } else if (m.tipo === 'tela') {
    Object.assign(tela, m.tela);
    medir();
  } else if (m.tipo === 'mouse') {
    alvo.x = m.x;
    alvo.y = m.y;
    if (!alvo.ativo) { mouse.x = m.x; mouse.y = m.y; }
    alvo.ativo = 1.6; // segundos com força total depois do último movimento
  } else if (m.tipo === 'glitch') {
    glitch = 1;
  } else if (m.tipo === 'intenso') {
    alvoIntenso = 1;
  } else if (m.tipo === 'nome') {
    if (gl && !encerrado) {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, m.imagem);
      gl.uniform4fv(u.nomeCaixa, m.caixa);
    }
    m.imagem.close();
  } else if (m.tipo === 'visivel') {
    visivel = m.visivel;
    if (visivel && !quadro && !encerrado && gl) {
      ultimo = performance.now();
      quadro = requestAnimationFrame(desenhar);
    }
  }
});
