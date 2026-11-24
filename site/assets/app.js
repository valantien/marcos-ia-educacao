// Marcos da IA na Educação: o mapa.
// O acervo inteiro como um grafo 3D: cada esfera, emissor, marco, palavra-chave e
// página do projeto é uma bolha; cada ligação real entre eles é uma linha.
// Os dados vêm de dados.js, gerado por scripts/site.py.
// Baseado no mapa do Second Brain OS (github.com/undefined-ui/second-brain-os, licença MIT).
(() => {
const ICON = {"menu": "<svg class=\"i\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M4 5h16\"/> <path d=\"M4 12h16\"/> <path d=\"M4 19h16\"/></svg>", "moon": "<svg class=\"i\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401\"/></svg>", "sun": "<svg class=\"i\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"4\"/> <path d=\"M12 2v2\"/> <path d=\"M12 20v2\"/> <path d=\"m4.93 4.93 1.41 1.41\"/> <path d=\"m17.66 17.66 1.41 1.41\"/> <path d=\"M2 12h2\"/> <path d=\"M20 12h2\"/> <path d=\"m6.34 17.66-1.41 1.41\"/> <path d=\"m19.07 4.93-1.41 1.41\"/></svg>", "arrow-left": "<svg class=\"i\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"m12 19-7-7 7-7\"/> <path d=\"M19 12H5\"/></svg>", "arrow-right": "<svg class=\"i\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M5 12h14\"/> <path d=\"m12 5 7 7-7 7\"/></svg>", "arrow-up-right": "<svg class=\"i\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M7 7h10v10\"/> <path d=\"M7 17 17 7\"/></svg>", "x": "<svg class=\"i\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M18 6 6 18\"/> <path d=\"m6 6 12 12\"/></svg>", "rotate-cw": "<svg class=\"i\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8\"/> <path d=\"M21 3v5h-5\"/></svg>", "house": "<svg class=\"i\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8\"/> <path d=\"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"/></svg>"};
'use strict';
const THREE = window.THREE, ForceGraph3D = window.ForceGraph3D;
const { LineSegments2, LineSegmentsGeometry, LineMaterial } = window.THREE_LINES;

const G = window.MIE_GRAPH;
const PAGES = window.MIE_PAGES || {};
const $ = (s, el = document) => el.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const clip = (s, n) => (s = String(s || '')).length > n ? s.slice(0, n).replace(/\s+\S*$/, '') + '…' : s;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const store = {
  get(k, d) { try { const v = localStorage.getItem('mie:' + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem('mie:' + k, JSON.stringify(v)); } catch { } },
};
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobile = () => innerWidth <= 760;

// ------------------------------------------------------------------ palette
const root = getComputedStyle(document.documentElement);
const tok = n => root.getPropertyValue(n).trim();
const COLOR = {
  root: tok('--c-root'), int: tok('--c-int'), fed: tok('--c-fed'), est: tok('--c-est'), mun: tok('--c-mun'),
  tag: tok('--c-tag'), proj: tok('--c-proj'),
};
const PAPER = new THREE.Color(tok('--paper'));
function readColors() {
  const r = getComputedStyle(document.documentElement);
  for (const k of Object.keys(COLOR)) COLOR[k] = r.getPropertyValue('--c-' + k).trim();
  PAPER.set(r.getPropertyValue('--paper').trim());
}
const LAYERS = [
  { key: 'int', label: 'Internacional' },
  { key: 'fed', label: 'Federal' },
  { key: 'est', label: 'Estadual' },
  { key: 'mun', label: 'Municipal' },
  { key: 'tag', label: 'Palavras-chave' },
  { key: 'proj', label: 'Sobre o projeto' },
];
const TYPE = { root: 'acervo', esfera: 'esfera', emissor: 'emissor', marco: 'marco', tag: 'palavra-chave', doc: 'página', colecao: 'coleção' };
const SELO = { rascunho: 'Rascunho', parcial: 'Parcial', conferido: 'Conferido', 'em-revisao': 'Em revisão' };
const NAT = { vinculante: 'Vinculante', orientador: 'Orientador', 'não vigente': 'Não vigente' };
const REPO = G.repo;
const fmtData = d => { const m = String(d || '').match(/^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?/); if (!m) return d || ''; return m[3] ? `${m[3]}/${m[2]}/${m[1]}` : m[2] ? `${m[2]}/${m[1]}` : m[1]; };
const isRead = n => !!(n && n.read);

// ------------------------------------------------------------------ data
const nodes = G.nodes;
const byId = new Map(nodes.map(n => [n.id, n]));
const links = G.edges.map(e => ({ source: e.s, target: e.t, s: e.s, t: e.t, kind: e.k, w: e.w || 1, hidden: !!e.h }));
const nbr = new Map(nodes.map(n => [n.id, new Set()]));
const linksOf = new Map(nodes.map(n => [n.id, []]));
for (const l of links) {
  nbr.get(l.s).add(l.t); nbr.get(l.t).add(l.s);
  linksOf.get(l.s).push(l); linksOf.get(l.t).push(l);
}
const FLAT = G.flat;
const marcos = nodes.filter(n => n.type === 'marco');
const dotOf = n => COLOR[n.group] || COLOR.root;
// for HTML: a CSS variable, so labels and panels follow a theme switch on their own
const cssDot = n => `var(--c-${COLOR[n.group] ? n.group : 'root'})`;

const layerOn = Object.assign(Object.fromEntries(LAYERS.map(l => [l.key, !l.off])), store.get('layers', {}));
const visible = n => n.group === 'root' || !!layerOn[n.group];
const seloHTML = n => `<span class="selo ${n.selo}">${SELO[n.selo] || n.selo}</span>`;

// ------------------------------------------------------------------ state
const S = {
  mode: 'boot',       // overview | focus | read
  sel: null,          // selected node
  preview: null,      // node hovered in a list, a label or the graph
  focus: null,        // Set of ids around the selection
  spin: store.get('spin', !REDUCED),
  t0: performance.now(),
};

// ------------------------------------------------------------------ graph
const stage = $('#stage');
let graph;
try {
  graph = ForceGraph3D({ controlType: 'orbit', rendererConfig: { antialias: true, alpha: true, powerPreference: 'high-performance' } })(stage);
} catch (err) {
  failed(err);
  throw err;
}
const scene = graph.scene();
const camera = graph.camera();
const controls = graph.controls();
const renderer = graph.renderer();
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

// where each layer settles: a loose continent per collection around the centre
const R = 230;
const ANCHOR = {
  int: [-.92, .32, .2], fed: [.9, .3, -.1], est: [.5, -.8, .42], mun: [-.5, -.8, -.3],
  tag: [0, .95, .2], proj: [.5, .15, -.6],
};
for (const n of nodes) {
  const a = ANCHOR[n.group] || [0, 0, 0];
  const j = () => (Math.random() - .5) * 8;
  n.x = a[0] * 6 + j(); n.y = a[1] * 6 + j(); n.z = a[2] * 6 + j();
  n._o = 0; n._ot = 0; n._s = REDUCED ? 1 : 0; n._sv = 0; n._st = 1; n._ph = Math.random() * 6.28;
  n._appear = { root: 0, esfera: 250, colecao: 300, emissor: 600, marco: 850, doc: 1000, tag: 1150 }[n.type]
    + (n.type === 'marco' || n.type === 'tag' || n.type === 'doc' ? Math.random() * 700 : Math.random() * 200);
}
const home = byId.get('root');
home.fx = 0; home.fy = 0; home.fz = 0;

const GEO = {
  sphere: new THREE.SphereGeometry(1, 32, 22),
  gem: new THREE.IcosahedronGeometry(1, 0),
  oct: new THREE.OctahedronGeometry(1, 0),
  tet: new THREE.TetrahedronGeometry(1, 0),
  shell: new THREE.SphereGeometry(1, 40, 28),
};
const TOOLISH = new Set(['doc']);
const SHELLED = new Set(['root', 'esfera', 'colecao', 'emissor']);
const SHELL_K = { root: 1.9, marco: 1.38 };
const shellK = n => SHELL_K[n.type] || 1.7;
const coreK = n => n.type === 'root' ? 1.2 : n.type === 'tag' ? .9 : n.type === 'doc' ? 1.15 : 1;
const maxO = n => n.type === 'tag' ? .8 : n.type === 'doc' ? .8 : 1;

const haloTex = (() => {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const x = c.getContext('2d'), g = x.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, 'rgba(255,255,255,.75)'); g.addColorStop(.3, 'rgba(255,255,255,.32)'); g.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = g; x.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
})();
const ringTex = (() => {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const x = c.getContext('2d');
  x.strokeStyle = '#fff'; x.lineWidth = 7; x.beginPath(); x.arc(64, 64, 56, 0, Math.PI * 2); x.stroke();
  return new THREE.CanvasTexture(c);
})();
// a soft rim, brighter at the edge than the middle: the "bubble" around hubs
const rimMaterial = color => new THREE.ShaderMaterial({
  uniforms: { color: { value: new THREE.Color(color) }, opacity: { value: 0 } },
  vertexShader: `varying vec3 vN; varying vec3 vV;
    void main(){ vec4 mv = modelViewMatrix * vec4(position,1.); vN = normalize(normalMatrix*normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix*mv; }`,
  fragmentShader: `uniform vec3 color; uniform float opacity; varying vec3 vN; varying vec3 vV;
    void main(){ float f = 1. - abs(dot(normalize(vN), normalize(vV))); float a = pow(f, 2.2) * (1. - smoothstep(.78, 1., f)) * .85; gl_FragColor = vec4(color, a * opacity); }`,
  transparent: true, depthWrite: false,
});

function makeNode(n) {
  const g = new THREE.Group();
  const r = Math.cbrt(n.val) * 3.1;
  const geo = n.type === 'root' ? GEO.gem : n.type === 'tag' ? GEO.tet : TOOLISH.has(n.type) ? GEO.oct : GEO.sphere;
  const c = new THREE.Color(dotOf(n));
  const mat = new THREE.MeshStandardMaterial({
    color: c, emissive: c.clone(), emissiveIntensity: n.type === 'root' ? .22 : .14, roughness: .32, metalness: 0,
    transparent: true, opacity: n._o, flatShading: geo !== GEO.sphere,
  });
  const core = new THREE.Mesh(geo, mat);
  core.scale.setScalar(r * coreK(n));
  if (geo === GEO.tet) core.rotation.set(Math.random() * 6.28, Math.random() * 6.28, 0);
  if (n.type === 'root') {
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: haloTex, color: c.clone(), transparent: true, depthWrite: false, opacity: 0 }));
    halo.scale.setScalar(r * 7);
    halo.renderOrder = -2;
    g.add(halo);
    n._halo = halo;
  }
  g.add(core);
  n._core = core; n._r = r; n._shell = null;
  if (SHELLED.has(n.type)) {
    const shell = new THREE.Mesh(GEO.shell, rimMaterial(dotOf(n)));
    shell.scale.setScalar(r * shellK(n));
    shell.renderOrder = 2;
    g.add(shell);
    n._shell = shell;
  }
  return g;
}

const tooltip = n => {
  const em = n.em ? byId.get(n.em) : null;
  const ctx = em ? ` · ${em.label} · ${n.ano}` : n.sub ? ` · ${n.sub}` : '';
  return `<span class="tt-k" style="--dot:${cssDot(n)}">${TYPE[n.type]}${esc(ctx)}</span>` +
    `<span class="tt-t">${esc(n.label)}</span>` +
    (n.desc && n.type !== 'root' ? `<span class="tt-d">${esc(clip(n.desc, 120))}</span>` : '');
};

graph
  .backgroundColor('rgba(0,0,0,0)')
  .showNavInfo(false)
  .nodeId('id')
  .nodeVal('val')
  .nodeThreeObject(makeNode)
  .nodeLabel(n => isMobile() ? '' : tooltip(n))
  .linkVisibility(false)
  .enableNodeDrag(false)
  .warmupTicks(REDUCED ? 110 : 6)
  .cooldownTicks(320)
  .d3AlphaDecay(.016)
  .d3VelocityDecay(.34)
  .onNodeHover(n => { setPreview(n && n._o > .05 ? n : null, 'graph'); })
  .onNodeClick(n => onPick(n))
  .onBackgroundClick(() => { if (S.mode === 'focus') go('root'); })
  .onEngineTick(() => updateLinkPositions())
  .graphData({ nodes, links });

// forces: structure pulls tight, cross-references loose, every layer to its continent
const CONTAINS = { root: 150, esfera: 58, colecao: 50, emissor: 26 };
const DIST = { link: 80, related: 70, tag: 90 };
const STR = { link: .05, related: .12, tag: .03 };
const CHARGE = { root: -600, esfera: -300, colecao: -260, emissor: -120, marco: -70, doc: -50, tag: -40 };
graph.d3Force('link')
  .distance(l => l.kind === 'contains' ? (l.hidden ? 130 : CONTAINS[byId.get(l.s).type] || 30) : DIST[l.kind] || 60)
  .strength(l => {
    if (l.kind === 'contains') return l.hidden ? .012 : byId.get(l.s).type === 'root' ? .35 : .85;
        return STR[l.kind] ?? .05;
  });
graph.d3Force('charge').strength(n => CHARGE[n.type] ?? -20).distanceMax(360);
graph.d3Force('anchor', (() => {
  let ns = [];
  const f = alpha => {
    for (const n of ns) {
      const a = ANCHOR[n.group]; if (!a) continue;
      const k = (n.type === 'esfera' || n.type === 'colecao' ? .14 : n.type === 'emissor' ? .03 : .011) * alpha;
      n.vx += (a[0] * R - n.x) * k; n.vy += (a[1] * R - n.y) * k; n.vz += (a[2] * R - n.z) * k;
    }
  };
  f.initialize = x => { ns = x; };
  return f;
})());

// lights travel with the camera, so a bubble always reads as round
graph.lights([new THREE.AmbientLight(0xffffff, .75), new THREE.HemisphereLight(0xffffff, 0xA8A7A1, .55)]);
const key = new THREE.DirectionalLight(0xffffff, 1.6);
key.position.set(-.6, 1, .8);
camera.add(key);
scene.add(camera);
scene.fog = new THREE.Fog(PAPER, 400, 1600);

controls.enableDamping = true;
controls.dampingFactor = .085;
controls.rotateSpeed = .55;
controls.zoomSpeed = .9;
controls.minDistance = 18;
controls.maxDistance = 2600;
controls.autoRotateSpeed = .3;

// ------------------------------------------------------------------ edges
// One draw call for every edge, with per-vertex colour and alpha so each edge
// can fade on its own; a second, thicker layer for the edges of the selection.
const VL = links.filter(l => !l.hidden);
for (const l of VL) { l._S = byId.get(l.s); l._T = byId.get(l.t); l._a = 0; l._at = 0; }
const KIND_A = { contains: .3, link: .3, related: .55, tag: .14 };
// each edge is a soft arc of SEG pieces, coloured from one end to the other
const SEG = 14;
const BEND = { contains: 0, link: 0, related: 0, tag: 0 };  // straight edges (maintainer, 2026-11-18)
const CTRL = new THREE.Vector3(), UP = new THREE.Vector3(0, 1, 0), D_ = new THREE.Vector3();
function ctrlOf(l) {
  const a = l._S, b = l._T;
  D_.set(b.x - a.x, b.y - a.y, b.z - a.z);
  const len = D_.length() || 1;
  CTRL.set((a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2);
  const side = D_.clone().cross(Math.abs(D_.y / len) > .9 ? D_.set(1, 0, 0) : UP).normalize();
  return CTRL.addScaledVector(side, len * (BEND[l.kind] ?? 0));
}
function arcAt(l, k, c, out, o) {
  const a = l._S, b = l._T, u = 1 - k;
  out[o] = u * u * a.x + 2 * u * k * c.x + k * k * b.x;
  out[o + 1] = u * u * a.y + 2 * u * k * c.y + k * k * b.y;
  out[o + 2] = u * u * a.z + 2 * u * k * c.z + k * k * b.z;
}
const lpos = new Float32Array(VL.length * SEG * 6);
const lcol = new Float32Array(VL.length * SEG * 8);
function paintEdge(l, i) {
  const a = new THREE.Color(dotOf(l._S)), b = new THREE.Color(dotOf(l._T)), m = new THREE.Color();
  for (let s = 0; s < SEG; s++) {
    const o = (i * SEG + s) * 8;
    m.copy(a).lerp(b, s / SEG); lcol[o] = m.r; lcol[o + 1] = m.g; lcol[o + 2] = m.b;
    m.copy(a).lerp(b, (s + 1) / SEG); lcol[o + 4] = m.r; lcol[o + 5] = m.g; lcol[o + 6] = m.b;
  }
}
VL.forEach(paintEdge);
// edges fade a little in the middle, so the web reads as threads between bubbles
const MIDA = new Float32Array(SEG + 1).map((_, s) => 1 - .45 * Math.sin(Math.PI * s / SEG));
const lgeo = new THREE.BufferGeometry();
lgeo.setAttribute('position', new THREE.BufferAttribute(lpos, 3).setUsage(THREE.DynamicDrawUsage));
lgeo.setAttribute('color', new THREE.BufferAttribute(lcol, 4).setUsage(THREE.DynamicDrawUsage));
const lineMesh = new THREE.LineSegments(lgeo, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, depthWrite: false, fog: true }));
lineMesh.frustumCulled = false;
lineMesh.renderOrder = -1;
scene.add(lineMesh);

function updateLinkPositions() {
  for (let i = 0; i < VL.length; i++) {
    const l = VL[i];
    if (l._a < .003) continue;
    const c = ctrlOf(l);
    for (let s = 0; s < SEG; s++) {
      const o = (i * SEG + s) * 6;
      arcAt(l, s / SEG, c, lpos, o); arcAt(l, (s + 1) / SEG, c, lpos, o + 3);
    }
  }
  lgeo.attributes.position.needsUpdate = true;
  if (hl.list.length) updateHL();
}

const hl = {
  list: [], o: 0, ot: 0,
  mat: new LineMaterial({ linewidth: 2.4, vertexColors: true, transparent: true, opacity: 0, depthWrite: false, worldUnits: false }),
};
hl.mesh = new LineSegments2(new LineSegmentsGeometry(), hl.mat);
hl.mesh.frustumCulled = false;
hl.mesh.renderOrder = 1;
scene.add(hl.mesh);

function buildHL(list) {
  hl.list = list;
  const geo = new LineSegmentsGeometry();
  const pos = new Float32Array(Math.max(list.length, 1) * SEG * 6), col = new Float32Array(Math.max(list.length, 1) * SEG * 6);
  const m = new THREE.Color();
  list.forEach((l, i) => {
    const a = new THREE.Color(dotOf(l._S)), b = new THREE.Color(dotOf(l._T));
    for (let s = 0; s < SEG; s++) {
      const o = (i * SEG + s) * 6;
      m.copy(a).lerp(b, s / SEG); col[o] = m.r; col[o + 1] = m.g; col[o + 2] = m.b;
      m.copy(a).lerp(b, (s + 1) / SEG); col[o + 3] = m.r; col[o + 4] = m.g; col[o + 5] = m.b;
    }
  });
  geo.setPositions(pos); geo.setColors(col);
  hl.mesh.geometry.dispose();
  hl.mesh.geometry = geo;
  hl.mesh.visible = list.length > 0;
  updateHL();
  buildParticles();
}
function updateHL() {
  const buf = hl.mesh.geometry.attributes.instanceStart.data, arr = buf.array;
  hl.list.forEach((l, i) => {
    const c = ctrlOf(l);
    for (let s = 0; s < SEG; s++) {
      const o = (i * SEG + s) * 6;
      arcAt(l, s / SEG, c, arr, o); arcAt(l, (s + 1) / SEG, c, arr, o + 3);
    }
  });
  buf.needsUpdate = true;
}

// signal dots running outwards from the selection along its edges
const PMAX = 900;
const ppos = new Float32Array(PMAX * 3), pcol = new Float32Array(PMAX * 3);
const pgeo = new THREE.BufferGeometry();
pgeo.setAttribute('position', new THREE.BufferAttribute(ppos, 3).setUsage(THREE.DynamicDrawUsage));
pgeo.setAttribute('color', new THREE.BufferAttribute(pcol, 3));
pgeo.setDrawRange(0, 0);
const dotTex = (() => {
  const c = document.createElement('canvas'); c.width = c.height = 64;
  const x = c.getContext('2d'), g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(.45, 'rgba(255,255,255,.95)'); g.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = g; x.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
})();
const pmat = new THREE.PointsMaterial({ size: 6.5, sizeAttenuation: false, map: dotTex, vertexColors: true, transparent: true, depthWrite: false, opacity: 0 });
const points = new THREE.Points(pgeo, pmat);
points.frustumCulled = false;
points.renderOrder = 3;
scene.add(points);
let particles = [];
function buildParticles() {
  particles = [];
  if (REDUCED || !S.sel) { pgeo.setDrawRange(0, 0); return; }
  for (const l of hl.list) {
    const out = l._S === S.sel;
    const far = out ? l._T : l._S;
    const c = new THREE.Color(dotOf(far)).lerp(new THREE.Color('#ffffff'), .12);
    const k = l.kind === 'contains' ? 2 : 3;
    for (let j = 0; j < k && particles.length < PMAX; j++) {
      particles.push({ l, out, ph: j / k + Math.random() * .25, sp: .28 + Math.random() * .14 });
      pcol.set([c.r, c.g, c.b], (particles.length - 1) * 3);
    }
  }
  pgeo.attributes.color.needsUpdate = true;
  pgeo.setDrawRange(0, particles.length);
}
function updateParticles(t) {
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    const k = (t * .001 * p.sp + p.ph) % 1, e = k * k * (3 - 2 * k);
    arcAt(p.l, p.out ? e : 1 - e, ctrlOf(p.l), ppos, i * 3);
  }
  pgeo.attributes.position.needsUpdate = true;
}

// ------------------------------------------------------------------ highlight
function focusSetOf(n) {
  const s = new Set([n.id]);
  for (const id of nbr.get(n.id)) if (visible(byId.get(id))) s.add(id);
  return s;
}
function retarget() {
  const now = performance.now() - S.t0;
  const F = S.focus, P = S.preview && S.preview !== S.sel ? S.preview : null;
  const PN = P ? nbr.get(P.id) : null;
  for (const n of nodes) {
    let o = visible(n) && now >= n._appear ? 1 : 0;
    if (o && F && !F.has(n.id)) o = P && (n === P || PN.has(n.id)) ? .55 : .12;
    n._ot = o;
    n._st = n === S.sel ? 1.45 : n === P ? 1.3 : 1;
  }
  for (const l of VL) {
    const on = l._S._ot > 0 && l._T._ot > 0 && visible(l._S) && visible(l._T);
    let a = on ? KIND_A[l.kind] : 0;
    if (on && F) {
      a = l._S === S.sel || l._T === S.sel ? .55 : F.has(l.s) && F.has(l.t) ? .16 : .025;
    }
    if (on && P && (l._S === P || l._T === P)) a = Math.max(a, .7);
    l._at = a;
  }
}

// ------------------------------------------------------------------ labels
const labelBox = $('#labels');
const labels = new Map();
function labelSet() {
  const want = new Set();
  for (const n of nodes) {
    if (!visible(n)) continue;
    if (n.type === 'root' || n.type === 'esfera' || n.type === 'colecao' || n.type === 'emissor') want.add(n);
  }
  if (S.focus) {
    [...S.focus].map(id => byId.get(id)).sort((a, b) => b.val - a.val).slice(0, 70).forEach(n => want.add(n));
  }
  if (S.preview && visible(S.preview)) want.add(S.preview);
  return want;
}
function labelHTML(n) {
  if (n.type === 'root') return 'Marcos da IA na Educação';
  if (n.type === 'marco') return esc(clip(n.label.split(' — ')[0], n === S.sel ? 64 : 40));
  return esc(clip(n.label, n === S.sel ? 64 : 40));
}
function refreshLabels() {
  const want = labelSet();
  for (const [id, el] of labels) if (!want.has(byId.get(id))) { el.remove(); labels.delete(id); }
  for (const n of want) {
    let el = labels.get(n.id);
    if (!el) {
      el = document.createElement('div');
      el.className = `lb t-${TOOLISH.has(n.type) ? 'tool' : n.type}`;
      el.style.setProperty('--dot', cssDot(n));
      el.dataset.id = n.id;
      el.style.opacity = '0';
      labelBox.appendChild(el);
      labels.set(n.id, el);
      el._n = n;
    }
    el.innerHTML = labelHTML(n);
    el.classList.toggle('sel', n === S.sel);
    el._p = prio(n);
  }
  for (const [, el] of labels) { el._w = el.offsetWidth; el._h = el.offsetHeight; }
}
labelBox.addEventListener('click', e => { const el = e.target.closest('.lb'); if (el) onPick(byId.get(el.dataset.id)); });
labelBox.addEventListener('mouseover', e => { const el = e.target.closest('.lb'); if (el) setPreview(byId.get(el.dataset.id), 'label'); });
labelBox.addEventListener('mouseout', e => { if (e.target.closest('.lb')) setPreview(null, 'label'); });

const ring = $('#ring');
const V = new THREE.Vector3();
function project(n) {
  V.set(n.x, n.y, n.z).project(camera);
  return { x: (V.x + 1) / 2 * innerWidth, y: (1 - V.y) / 2 * innerHeight, front: V.z < 1 && V.z > -1 };
}
function pxRadius(n, dist) {
  return n._r * n._s * (innerHeight / 2) / (dist * Math.tan(camera.fov * Math.PI / 360));
}
// runs inside the renderer, after the controls moved the camera: no lag
const placed = [];
const PRIO = { root: 6, esfera: 5, colecao: 5, emissor: 4, marco: 3, doc: 2, tag: 2 };
function prio(n) { return n === S.sel ? 9 : n === S.preview ? 8 : (PRIO[n.type] || 1) + (S.focus && S.focus.has(n.id) ? 2 : 0); }
scene.onBeforeRender = () => {
  const cam = camera.position;
  placed.length = 0;
  const order = [...labels.values()].sort((a, b) => b._p - a._p);
  for (const el of order) {
    const n = el._n;
    const p = project(n);
    const d = cam.distanceTo(V.set(n.x, n.y, n.z));
    const depth = clamp(1 - (d - scene.fog.near) / (scene.fog.far - scene.fog.near), .12, 1);
    let o = n._o * (p.front ? 1 : 0) * (n === S.sel ? 1 : depth);
    if (n.type === 'marco' || n.type === 'tag' || TOOLISH.has(n.type)) o *= S.focus ? 1 : .9;
    const off = pxRadius(n, d) + (n.type === 'root' ? 10 : 4);
    const x0 = p.x - el._w / 2, y0 = p.y + off;
    if (o > .05) {
      const hit = placed.some(r => x0 < r[2] && x0 + el._w > r[0] && y0 < r[3] && y0 + el._h > r[1]);
      if (hit) o *= el._p >= 8 ? 1 : .12;
      else placed.push([x0 - 4, y0 - 1, x0 + el._w + 4, y0 + el._h + 1]);
    }
    el.style.opacity = o.toFixed(3);
    el.style.visibility = o < .03 ? 'hidden' : 'visible';
    el.style.transform = `translate3d(${p.x.toFixed(1)}px,${(p.y + off).toFixed(1)}px,0) translateX(-50%)`;
    el.style.zIndex = n === S.sel ? 5 : n.type === 'esfera' || n.type === 'colecao' ? 3 : 1;
  }
  if (S.sel && S.mode !== 'overview') {
    const p = project(S.sel), d = cam.distanceTo(V.set(S.sel.x, S.sel.y, S.sel.z));
    const size = pxRadius(S.sel, d) * 2 + 14;
    ring.style.transform = `translate3d(${p.x}px,${p.y}px,0)`;
    ring.style.width = ring.style.height = size + 'px';
    ring.classList.toggle('on', p.front);
  } else ring.classList.remove('on');
};

// ------------------------------------------------------------------ camera
const view = { x: 0, y: 0, tx: 0, ty: 0, w: 0, h: 0 };
const panel = { info: 0, reader: 0, hero: 0, heroTop: innerHeight * .6 };
function measure() {
  panel.info = $('#info').offsetWidth; panel.reader = $('#reader').offsetWidth; panel.hero = $('#hero').offsetWidth;
  // celular: topo do bloco da home, para o mapa ocupar o espaço livre acima dele (ajuste fino, 2026-11-24)
  const h = $('#hero');
  panel.heroTop = innerHeight - (parseFloat(getComputedStyle(h).bottom) || 0) - h.offsetHeight;
  document.documentElement.style.setProperty('--hero-top', panel.heroTop + 'px');
}
const MOBILE_TOP = 58; // altura da barra de cima no celular
function targetOffset() {
  if (isMobile()) return { x: 0, y: S.mode === 'focus' ? innerHeight * .25 : S.mode === 'overview' ? innerHeight / 2 - (MOBILE_TOP + panel.heroTop) / 2 : 0 };
  if (S.mode === 'read') return { x: panel.reader / 2, y: 0 };
  if (S.mode === 'focus') return { x: (panel.info + 16) / 2, y: 0 };
  return { x: -(panel.hero + 28) / 2 * .85, y: 0 };
}
function applyView(force) {
  if (!force && Math.abs(view.x - view.tx) < .3 && Math.abs(view.y - view.ty) < .3 && view.w === innerWidth && view.h === innerHeight) return;
  view.x = Math.abs(view.x - view.tx) < .3 ? view.tx : lerp(view.x, view.tx, .08);
  view.y = Math.abs(view.y - view.ty) < .3 ? view.ty : lerp(view.y, view.ty, .08);
  view.w = innerWidth; view.h = innerHeight;
  camera.setViewOffset(innerWidth, innerHeight, view.x, view.y, innerWidth, innerHeight);
}

let flight = null;
const SPH = new THREE.Spherical();
function fly(target, dist, { ms = 1800, spin = 1.05, phi = null } = {}) {
  if (REDUCED) { ms = 350; spin = 0; }
  const live = typeof dist === 'function' ? dist : null;
  if (live) dist = live();
  if (!isFinite(dist)) dist = 600;
  const off = camera.position.clone().sub(controls.target);
  const from = new THREE.Spherical().setFromVector3(off);
  const to = new THREE.Spherical(dist, phi ?? clamp(lerp(from.phi, 1.18, .55), .45, 2.4), from.theta + spin);
  flight = {
    t0: performance.now(), ms, from, to, target,
    start: controls.target.clone(),
    bump: Math.min(from.radius, dist) * .32 + Math.abs(from.radius - dist) * .1, live,
  };
  controls.autoRotate = false;
}
const nodeVec = n => new THREE.Vector3(n.x || 0, n.y || 0, n.z || 0);
function stepFlight(now) {
  if (!flight) return;
  const f = flight, k = clamp((now - f.t0) / f.ms, 0, 1), e = ease(k);
  if (f.live) { const d = f.live(); if (isFinite(d)) f.to.radius = d; }
  const tgt = typeof f.target === 'function' ? f.target() : f.target.isVector3 ? f.target : nodeVec(f.target);
  const look = f.start.clone().lerp(tgt, e);
  SPH.set(lerp(f.from.radius, f.to.radius, e) + Math.sin(Math.PI * e) * f.bump,
    lerp(f.from.phi, f.to.phi, e), lerp(f.from.theta, f.to.theta, e));
  camera.position.setFromSpherical(SPH).add(look);
  camera.lookAt(look);
  controls.target.copy(look);
  if (k >= 1) { flight = null; resumeSpin(); }
}
// distance at which a sphere of radius r fits the part of the screen the panels leave free
function fitDistance(r) {
  let w = innerWidth, h = innerHeight;
  if (isMobile()) h = S.mode === 'focus' ? h * .46 : S.mode === 'overview' ? (panel.heroTop - MOBILE_TOP) : h;
  // the hero veil is translucent, so the overview may run a little behind it
  else w -= S.mode === 'focus' ? panel.info + 32 : S.mode === 'read' ? panel.reader : (panel.hero + 40) * .6;
  return r * innerHeight / (Math.tan(camera.fov * Math.PI / 360) * Math.max(160, Math.min(w, h)));
}
// the overview looks at the middle of what is shown, not at the origin
function homeCenter() {
  const vis = nodes.filter(n => visible(n) && n.x !== undefined);
  const c = new THREE.Vector3();
  for (const n of vis) c.add(V.set(n.x, n.y, n.z));
  return c.divideScalar(vis.length || 1);
}
function homeDistance() {
  const c = homeCenter();
  const d = nodes.filter(n => visible(n) && n.x !== undefined).map(n => Math.hypot(n.x - c.x, n.y - c.y, n.z - c.z)).sort((a, b) => a - b);
  return clamp(fitDistance(d[Math.floor(d.length * .97)] || 300) * 1.0, 300, 2400);
}
function focusDistance(n) {
  const d = [...(S.focus || [])].filter(id => id !== n.id).map(id => { const m = byId.get(id); return Math.hypot(m.x - n.x, m.y - n.y, m.z - n.z); }).sort((a, b) => a - b);
  // frame most of the neighbourhood; one far-flung neighbour should not push the camera away
  const r = d.length ? Math.min(d[Math.floor((d.length - 1) * .85)], d[Math.floor((d.length - 1) / 2)] * 2.2) : n._r * 6;
  return clamp(fitDistance(r) * 1.1, n._r * 9, 1600);
}
let spinTimer = 0;
function resumeSpin() {
  clearTimeout(spinTimer);
  controls.autoRotate = S.spin && !flight && S.mode !== 'read';
  controls.autoRotateSpeed = S.mode === 'overview' ? .3 : .16;
}
controls.addEventListener('start', () => { flight = null; controls.autoRotate = false; clearTimeout(spinTimer); });
controls.addEventListener('end', () => { clearTimeout(spinTimer); spinTimer = setTimeout(resumeSpin, 5000); });

// ------------------------------------------------------------------ frame loop
// started right after the graph, so it runs before the library renders
let lastLinks = 0, lastIntro = 0;
let booted = false;
function frame(now) {
  requestAnimationFrame(frame);
  // the library builds node objects on its first tick; route once they exist
  if (!booted) {
    if (!home._core) return;
    booted = true; S.t0 = now; retarget(); refreshLabels(); route();
  }
  stepFlight(now);
  const t = now - S.t0;
  if (t < 2600 && now - lastIntro > 80) { retarget(); lastIntro = now; }
  for (const n of nodes) {
    if (!n._core) continue;
    if (Math.abs(n._o - n._ot) > .004) {
      n._o = lerp(n._o, n._ot, .11);
      if (Math.abs(n._o - n._ot) <= .004) n._o = n._ot;
    }
    if (Math.abs(n._s - n._st) > .002 || Math.abs(n._sv) > .0008) {
      // a small spring: the node pops a little past its size and settles
      n._sv = (n._sv + (n._st - n._s) * .09) * .74; n._s += n._sv;
      if (Math.abs(n._s - n._st) <= .002 && Math.abs(n._sv) <= .0008) { n._s = n._st; n._sv = 0; }
    }
    if (!REDUCED && n._o > .01) {
      // barely-there drift, so the still graph is not a still picture
      const fl = n._r * .07 * (n.type === 'root' ? 0 : 1);
      const fx = Math.sin(now * .00052 + n._ph) * fl, fy = Math.cos(now * .00046 + n._ph * 1.7) * fl, fz = Math.sin(now * .00041 + n._ph * .6) * fl;
      n._core.position.set(fx, fy, fz);
      if (n._shell) n._shell.position.set(fx, fy, fz);
    }
    const show = n._o > .01;
    const br = REDUCED ? 1 : 1 + (n.type === 'root' ? .045 : n.type === 'esfera' || n.type === 'colecao' ? .03 : 0) * Math.sin(now * .0016 + n._ph);
    n._core.material.opacity = n._o * maxO(n);
    n._core.layers.set(show ? 0 : 1);
    if (n.type === 'tag' && !REDUCED) n._core.rotation.y += .004;
    if (n.type === 'root' && !REDUCED) { n._core.rotation.y += .003; n._core.rotation.x += .0012; }  // the collection: a slowly turning icosahedron  // the pyramids turn slowly
    n._core.scale.setScalar(n._r * coreK(n) * n._s * br);
    if (n._shell) {
      n._shell.material.uniforms.opacity.value = n._o * (n === S.sel ? 1 : n.type === 'marco' ? .5 : .75);
      n._shell.layers.set(show ? 0 : 1);
      n._shell.scale.setScalar(n._r * shellK(n) * n._s * (2 - br));
    }
    if (n._halo) {
      n._halo.material.opacity = n._o * (REDUCED ? .5 : .42 + .16 * Math.sin(now * .0016 + n._ph));
      n._halo.scale.setScalar(n._r * 7 * n._s * br);
    }
  }
  let lchg = false;
  for (let i = 0; i < VL.length; i++) {
    const l = VL[i];
    if (Math.abs(l._a - l._at) > .002) {
      l._a = lerp(l._a, l._at, .09);
      for (let s = 0; s < SEG; s++) { const o = (i * SEG + s) * 8; lcol[o + 3] = l._a * MIDA[s]; lcol[o + 7] = l._a * MIDA[s + 1]; }
      lchg = true;
    }
  }
  if (lchg) lgeo.attributes.color.needsUpdate = true;
  hl.o = lerp(hl.o, hl.ot, .07); hl.mat.opacity = hl.o; pmat.opacity = hl.o;
  if (now - lastLinks > 32 || flight) { updateLinkPositions(); lastLinks = now; }
  if (particles.length) updateParticles(now);
  updateRipples(now);
  const dist = camera.position.distanceTo(controls.target);
  scene.fog.near = dist * .95; scene.fog.far = dist * 3.4;
  const to = targetOffset(); view.tx = to.x; view.ty = to.y;
  applyView(false);
}
requestAnimationFrame(frame);

// ------------------------------------------------------------------ selection
function setPreview(n, src) {
  if (S.preview === n) return;
  if (!n && S.previewSrc && S.previewSrc !== src) return;
  S.preview = n; S.previewSrc = n ? src : null;
  retarget(); refreshLabels();
  document.querySelectorAll('.li.hot,.chip.hot').forEach(el => el.classList.remove('hot'));
  if (n) document.querySelectorAll(`[data-go="${CSS.escape(n.id)}"]`).forEach(el => el.classList.add('hot'));
}
function onPick(n) {
  if (!n) return;
  if (n.type === 'root') return go('root');
  if (S.mode === 'read' && isRead(n)) return read(n.id);
  go(n.id);
}
const ripples = [];
function ripple(n) {
  if (REDUCED || !n || !n._core) return;
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: ringTex, color: new THREE.Color(dotOf(n)), transparent: true, depthWrite: false, opacity: .8 }));
  sp.position.set(n.x, n.y, n.z); sp.renderOrder = 4;
  scene.add(sp);
  ripples.push({ sp, n, t0: performance.now() });
}
function updateRipples(now) {
  for (let i = ripples.length - 1; i >= 0; i--) {
    const rp = ripples[i], k = clamp((now - rp.t0) / 1100, 0, 1), e = 1 - Math.pow(1 - k, 3);
    rp.sp.position.set(rp.n.x, rp.n.y, rp.n.z);
    rp.sp.scale.setScalar(rp.n._r * (2.4 + e * 9));
    rp.sp.material.opacity = .8 * (1 - k);
    if (k >= 1) { scene.remove(rp.sp); rp.sp.material.dispose(); ripples.splice(i, 1); }
  }
}
function select(n) {
  if (n && n !== S.sel) ripple(n);
  S.sel = n;
  S.focus = n ? focusSetOf(n) : null;
  S.preview = null; S.previewSrc = null;
  retarget();
  buildHL(n ? VL.filter(l => (l._S === n || l._T === n) && visible(l._S) && visible(l._T)) : []);
  hl.ot = n ? 1 : 0;
  refreshLabels();
}

// ------------------------------------------------------------------ routing
function go(id) { const h = id === 'root' ? '#/' : '#/n/' + id; if (location.hash !== h) location.hash = h; else route(); }
function read(id) { const h = '#/read/' + id; if (location.hash !== h) location.hash = h; else route(); }
function parse() {
  const h = decodeURIComponent(location.hash.slice(1));
  if (!h || h === '/') return { mode: 'overview' };
  if (h.startsWith('/read/')) return { mode: 'read', id: h.slice(6) };
  if (h.startsWith('/n/')) return { mode: 'focus', id: h.slice(3) };
  
  return { mode: 'overview' };
}
function route() {
  const r = parse();
  if (r.legacy) history.replaceState(null, '', '#/read/' + r.id);
  let n = r.id ? byId.get(r.id) : null;
  if (r.id && (!n || n.type === 'root')) { r.mode = 'overview'; n = null; }
  if (r.mode === 'read' && !isRead(n)) r.mode = 'focus';
  if (n && !visible(n)) { layerOn[n.group] = true; store.set('layers', layerOn); renderLayers(); }
  const prev = S.sel, prevMode = S.mode;
  S.mode = r.mode;
  document.body.classList.remove('m-overview', 'm-focus', 'm-read', 'booting');
  document.body.classList.add('m-' + r.mode);
  closeContents();
  if (r.mode === 'overview') {
    select(null);
    fly(homeCenter, homeDistance, { ms: prevMode === 'boot' ? 3200 : 1900, spin: prevMode === 'boot' ? 1.7 : .9, phi: 1.2 });
    document.title = 'Marcos da IA na Educação';
    return;
  }
  if (n !== prev) select(n);
  if (r.mode === 'focus') renderInfo(n);
  if (r.mode === 'read') renderReader(n);
  if (n !== prev || prevMode === 'boot') fly(n, () => focusDistance(n), { ms: prevMode === 'boot' ? 2600 : 1800, spin: prevMode === 'boot' ? 1.6 : 1.05 });
  else resumeSpin();
  document.title = n.label + ' · Marcos da IA na Educação';
}
addEventListener('hashchange', route);

// ------------------------------------------------------------------ info panel
const info = $('#info');
const li = (id, meta = '', extra = '') => {
  const n = byId.get(id); if (!n) return '';
  return `<button class="li${extra}" data-go="${esc(id)}" style="--dot:${cssDot(n)}"><span class="d"></span><span>${n.type === 'command' || n.type === 'skill' || n.type === 'script' ? `<code>${esc(n.label)}</code>` : esc(n.label)}</span>${meta ? `<span class="m">${meta}</span>` : ''}</button>`;
};
const chip = id => { const n = byId.get(id); return n ? `<button class="chip${n.type === 'tag' ? ' tag' : ''}" data-go="${esc(id)}" style="--dot:${cssDot(n)}"><span class="d"></span>${n.type === 'tag' ? '#' : ''}${esc(n.label)}</button>` : ''; };
const group = (title, body, count) => body ? `<div class="grp"><h3>${title}${count != null ? `<span>${count}</span>` : ''}</h3>${body}</div>` : '';
const listOf = (ids, meta, max = 14) => {
  if (!ids.length) return '';
  const head = ids.slice(0, max).map(id => li(id, meta ? meta(id) : '')).join('');
  const rest = ids.slice(max);
  return head + (rest.length ? `<div class="restwrap" hidden>${rest.map(id => li(id, meta ? meta(id) : '')).join('')}</div><button class="more" data-more>+ mais ${rest.length}</button>` : '');
};
const edgeIds = (n, kind, dir) => linksOf.get(n.id).filter(l => l.kind === kind && (dir === 'out' ? l.s === n.id : dir === 'in' ? l.t === n.id : true)).map(l => l.s === n.id ? l.t : l.s);
// linha de cima da janela de informação: o texto fica num bloco só ao lado da bolinha, para a segunda linha (quando houver)
// começar alinhada com a primeira palavra
const kicker = (n, ctx) => `<div class="ik" style="--dot:${cssDot(n)}"><span class="sw"></span><span class="ikt">${TYPE[n.type]}${ctx ? ` <i>· ${ctx}</i>` : ''}</span></div>`;
const ghBtn = (url, label = 'GitHub') => url ? `<a class="btn t-learn" href="${esc(url)}" target="_blank" rel="noopener">${label} <span class="t-learn-chevron diag">${ICON['arrow-up-right']}</span></a>` : '';

function marcoMeta(n) {
  const em = byId.get(n.em);
  return `<div class="meta"><span>${esc(em ? em.label : n.orgao)}</span><span><b>${esc(fmtData(n.data))}</b></span><span>${esc(NAT[n.nat] || n.natureza)}</span></div>`;
}
function renderInfo(n) {
  let h = `<button class="x" data-close aria-label="Voltar ao mapa inteiro">${ICON.x}</button>`;
  const T = n.type;
  if (T === 'marco') {
    const em = byId.get(n.em), esf = byId.get(edgeIds(em, 'contains', 'in')[0]);
    const rel = edgeIds(n, 'related'), tags = edgeIds(n, 'tag', 'out');
    h += kicker(n, `${esc(esf ? esf.label : '')} · ${esc(em ? em.label : '')}`) +
      `<div class="selos">${seloHTML(n)}${n.correlato ? '<span class="tagc">documento correlato</span>' : ''}</div>` +
      `<h2>${esc(n.label)}</h2><p class="desc">${esc(n.desc)}</p>` + marcoMeta(n) +
      `<div class="acts"><button class="btn primary t-learn" data-read="${esc(n.id)}">Ler a ficha <span class="t-learn-chevron">${ICON['arrow-right']}</span></button><a class="btn t-learn" href="${esc(n.fonte)}" target="_blank" rel="noopener">Link oficial <span class="t-learn-chevron diag">${ICON['arrow-up-right']}</span></a></div>` +
      (n.resumo ? group('Em poucas palavras', `<p class="desc" style="margin:8px 0 0">${esc(clip(n.resumo, 320))}</p>`) : '') +
      group('Marcos relacionados', listOf(rel, id => esc(byId.get(id).ano || '')), rel.length) +
      group('Palavras-chave', tags.length ? `<div class="chips">${tags.map(chip).join('')}</div>` : '', tags.length) +
      group('Mesmo emissor', listOf(edgeIds(em, 'contains', 'out').filter(id => id !== n.id), id => esc(byId.get(id).ano || '')), null);
  } else if (T === 'doc') {
    const P = PAGES[n.id];
    const out = edgeIds(n, 'link', 'out');
    h += kicker(n, 'sobre o projeto') + `<h2>${esc(n.label)}</h2><p class="desc">${esc(n.desc)}</p>` +
      `<div class="acts"><button class="btn primary t-learn" data-read="${esc(n.id)}">Ler a página <span class="t-learn-chevron">${ICON['arrow-right']}</span></button></div>` +
      group('Nesta página', P && P.heads.length ? P.heads.map((x, k) => `<button class="li" data-read="${esc(n.id)}" data-anchor="${esc(x.id)}" style="--dot:var(--rule)"><span class="n">${String(k + 1).padStart(2, '0')}</span><span>${esc(x.t)}</span></button>`).join('') : '') +
      group('Leva a', listOf(out), out.length);
  } else if (T === 'emissor') {
    const ms = edgeIds(n, 'contains', 'out');
    h += kicker(n, esc(n.sub || '')) + `<h2>${esc(n.label)}</h2>` +
      `<div class="meta"><span><b>${ms.length}</b> marco${ms.length !== 1 ? 's' : ''} no acervo</span></div>` +
      group('Marcos', ms.map(id => { const m = byId.get(id); return `<button class="li" data-go="${esc(id)}" style="--dot:${cssDot(m)}"><span class="sd ${m.selo}" title="${SELO[m.selo]}"></span><span>${esc(m.label)}</span><span class="m">${esc(m.ano)}</span></button>`; }).join(''), ms.length);
  } else if (T === 'esfera') {
    const ems = edgeIds(n, 'contains', 'out');
    const total = ems.reduce((a, id) => a + edgeIds(byId.get(id), 'contains', 'out').length, 0);
    h += kicker(n) + `<h2>${esc(n.label)}</h2><p class="desc">${esc(n.desc)}</p>` +
      `<div class="meta"><span><b>${total}</b> marcos</span><span><b>${ems.length}</b> emissores</span></div>` +
      `<div class="acts"><a class="btn t-learn" href="acervo.html#esfera=${esc(n.label.toLowerCase())}">Ver na lista do Acervo <span class="t-learn-chevron">${ICON['arrow-right']}</span></a></div>` +
      group('Emissores', (() => { const c = ems.map(id => edgeIds(byId.get(id), 'contains', 'out').length), mx = Math.max(1, ...c);
        return ems.map((id, k) => li(id, `<span class="bar" style="width:${Math.round(18 + 70 * c[k] / mx)}px"></span>${c[k]}`)).join(''); })(), ems.length);
  } else if (T === 'tag') {
    const ms = edgeIds(n, 'tag', 'in');
    const co = {};
    for (const id of ms) for (const t of edgeIds(byId.get(id), 'tag', 'out')) if (t !== n.id) co[t] = (co[t] || 0) + 1;
    const rel = Object.entries(co).sort((a, b) => b[1] - a[1]).slice(0, 10).map(x => x[0]);
    h += kicker(n) + `<h2>#${esc(n.label)}</h2>` +
      `<div class="meta"><span>em <b>${ms.length}</b> marco${ms.length !== 1 ? 's' : ''}</span></div>` +
      `<div class="acts"><a class="btn t-learn" href="acervo.html#tag=${esc(n.slug)}">Ver na lista do Acervo <span class="t-learn-chevron">${ICON['arrow-right']}</span></a></div>` +
      group('Marcos com esta palavra-chave', listOf(ms, id => esc(byId.get(id).ano || '')), ms.length) +
      group('Aparece junto com', rel.length ? `<div class="chips">${rel.map(chip).join('')}</div>` : '');
  } else if (T === 'colecao') {
    const members = edgeIds(n, 'contains', 'out');
    h += kicker(n) + `<h2>${esc(n.label)}</h2><p class="desc">${esc(n.desc)}</p>` +
      (n.id === 'col:tag'
        ? group('Palavras-chave, das mais usadas', `<div class="chips">${members.sort((a, b) => byId.get(b).count - byId.get(a).count).map(chip).join('')}</div>`, members.length)
        : group('Páginas', listOf(members, null, 20), members.length));
  }
  info.innerHTML = h;
  info.scrollTop = 0;
}
info.addEventListener('click', e => {
  const t = e.target.closest('[data-go],[data-read],[data-close],[data-more]');
  if (!t) return;
  if (t.dataset.more !== undefined) { const r = t.previousElementSibling; r.hidden = false; t.remove(); return; }
  if (t.dataset.close !== undefined) return go('root');
  if (t.dataset.read) { pendingAnchor = t.dataset.anchor || null; return read(t.dataset.read); }
  go(t.dataset.go);
});
for (const box of [info, $('#hero'), $('#contents'), $('#reader')]) {
  box.addEventListener('mouseover', e => { const t = e.target.closest('[data-go],[data-node]'); if (t) setPreview(byId.get(t.dataset.go || t.dataset.node), 'list'); });
  box.addEventListener('mouseout', e => { const t = e.target.closest('[data-go],[data-node]'); if (t && !t.contains(e.relatedTarget)) setPreview(null, 'list'); });
}

// ------------------------------------------------------------------ reader
const reader = $('#reader'), rBody = $('#r-body'), rScroll = $('#r-scroll'), rCrumb = $('#r-crumb');
let pendingAnchor = null;
function fichaHead(n) {
  const em = byId.get(n.em);
  const row = (k, v) => v ? `<tr><th>${k}</th><td>${v}</td></tr>` : '';
  const tags = (n.temas || []).map(t => `<button class="chip tag" data-go="tag:${esc(t)}" style="--dot:var(--c-tag)">#${esc(byId.get('tag:' + t)?.label || t)}</button>`).join(' ');
  return (n.capa ? `<img class="ficha-capa" src="${esc(n.capa)}" alt="Capa do documento: ${esc(n.label)}">` : '') +
    `<div class="selos">${seloHTML(n)}${n.correlato ? '<span class="tagc">documento correlato</span>' : ''}</div>` +
    `<h1>${esc(n.label)}</h1>` +
    `<p class="verif" style="--sc:var(--s-${n.selo})"><b>Verificação:</b> ${esc(n.verificacao)}</p>` +
    `<table class="quadro"><tbody>` +
    row('Ementa', esc(n.desc)) + row('Tipo', esc(n.tipo)) + row('Órgão', esc(n.orgao)) +
    row('ID', esc([n.numero && n.numero !== '—' ? n.numero : '', fmtData(n.data)].filter(Boolean).join(' · '))) +
    row('Esfera', `<button class="chip" data-go="${esc(n.em)}" style="--dot:${cssDot(n)}"><span class="d"></span>${esc(em ? em.label : '')}</button> ${esc(n.esfera)}${n.jurisdicao ? ' · ' + esc(n.jurisdicao) : ''}`) +
    row('Natureza', esc(n.natureza)) + row('Situação', esc(n.situacao)) +
    row('Nível de ensino', esc((n.niveis || []).join(', '))) +
    row('Palavras-chave', tags) +
    row('Link', `<a class="ext" href="${esc(n.fonte)}" target="_blank" rel="noopener">${esc(n.fonte.replace(/^https?:\/\/(www\.)?/, '').slice(0, 60))}${n.fonte.length > 70 ? '…' : ''}</a>`) +
    `</tbody></table>`;
}
// Glossário: cada parágrafo "**Termo.** definição" vira um verbete (termo à esquerda, definição à direita)
function glossify(root) {
  let dl = null;
  [...root.children].forEach(el => {
    const t = el.tagName === 'P' && el.firstElementChild && el.firstElementChild.tagName === 'STRONG' && el.firstChild === el.firstElementChild ? el.firstElementChild : null;
    if (!t) { dl = null; return; }
    if (!dl) { dl = document.createElement('dl'); dl.className = 'gloss'; el.before(dl); }
    const dt = document.createElement('dt'); dt.textContent = t.textContent.replace(/[.:]\s*$/, '');
    t.remove(); if (el.firstChild && el.firstChild.nodeType === 3) el.firstChild.textContent = el.firstChild.textContent.replace(/^\s+/, '');
    const dd = document.createElement('dd'); while (el.firstChild) dd.appendChild(el.firstChild);
    const row = document.createElement('div'); row.className = 'verbete'; row.append(dt, dd); dl.appendChild(row); el.remove();
  });
  const first = root.querySelector('h1 + p'); if (first) first.classList.add('lede');
}
function renderReader(n) {
  const P = PAGES[n.id];
  const i = FLAT.indexOf(n.id), prev = FLAT[i - 1], next = FLAT[i + 1];
  if (n.type === 'marco') {
    const em = byId.get(n.em);
    rCrumb.innerHTML = `<b style="color:${cssDot(n)}">${esc(n.esfera)}</b><button data-go="${esc(n.em)}">${esc(em ? em.label : '')}</button> · ${esc(n.ano)}`;
  } else {
    rCrumb.innerHTML = `<b style="color:${cssDot(n)}">sobre o projeto</b><button data-go="col:proj">todas as páginas</button>`;
  }
  const rel = n.type === 'marco' ? edgeIds(n, 'related') : [];
  rBody.innerHTML = !P ? '<p>Esta página não carregou. Tente recarregar.</p>' :
    (n.type === 'marco' ? fichaHead(n) : `<h1>${esc(n.label)}</h1>`) + P.html +
    (rel.length ? `<div class="rel"><h4>marcos relacionados</h4>${rel.map(id => li(id, esc(byId.get(id).ano || ''))).join('')}</div>` : '') +
    `<nav class="pager">${prev ? `<a class="t-learn" href="#/read/${esc(prev)}" data-node="${esc(prev)}"><span class="lbl"><span class="t-learn-chevron" style="--learn-shift:calc(var(--learn-shift-base) * -1)">${ICON['arrow-left']}</span> anterior</span>${esc(byId.get(prev).label)}</a>` : '<span></span>'}` +
    `${next ? `<a class="t-learn" href="#/read/${esc(next)}" data-node="${esc(next)}" style="text-align:right"><span class="lbl">próxima <span class="t-learn-chevron">${ICON['arrow-right']}</span></span>${esc(byId.get(next).label)}</a>` : '<span></span>'}</nav>` +
    `<div class="src">arquivo: <a class="ext" href="${esc(REPO)}/blob/main/${esc(n.arquivo || n.src)}" target="_blank" rel="noopener">${esc(n.arquivo || n.src)}</a></div>`;
  rBody.dataset.doc = n.id;
  if (n.id === 'doc:glossario') glossify(rBody);
  rScroll.style.scrollBehavior = 'auto';
  rScroll.scrollTop = 0;
  if (pendingAnchor) { const el = rBody.querySelector('#' + CSS.escape(pendingAnchor)); if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 450); pendingAnchor = null; }
  rScroll.style.scrollBehavior = '';
}
reader.addEventListener('click', e => {
  const a = e.target.closest('a[data-anchor]');
  if (a) { e.preventDefault(); const el = rBody.querySelector('#' + CSS.escape(a.dataset.anchor)); if (el) el.scrollIntoView({ behavior: 'smooth' }); return; }
  const g = e.target.closest('[data-go]');
  if (g) { const n = byId.get(g.dataset.go); if (n) return isRead(n) ? read(n.id) : go(n.id); }
});
$('#r-close').onclick = () => go(S.sel ? S.sel.id : 'root');
$('#r-graph').onclick = () => go(S.sel ? S.sel.id : 'root');

// ------------------------------------------------------------------ hero
// três caminhos da página inicial (proposta C, maintainer, 17/11/2026): "Explorar" em destaque, os outros dois menores, lado a lado
const VIA_ICON = {
  busca: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  selo: '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/>',
  bot: '<path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>',
  seta: '<path d="m9 18 6-6-6-6"/>',
};
const viaSvg = k => `<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${VIA_ICON[k]}</svg>`;
const PATHS = [
  ['busca', 'Explorar os marcos', 'A lista completa, com busca e filtros por esfera, natureza e selo.', 'acervo.html'],
  ['selo', 'Curadoria', 'Quem escolhe, quem confere e o que significa cada selo.', '#/read/doc:curadoria'],
  ['bot', 'Use com sua IA', 'Entregue o acervo ao seu assistente, com prompts de exemplo.', '#/read/doc:usar-com-ia'],
];
$('#paths').innerHTML = PATHS.map(([ic, label, p, href], n) =>
  `<a class="via${n === 0 ? ' via-main' : ''}" href="${href}"><span class="via-ic">${viaSvg(ic)}</span>` +
  `<span class="via-tx"><b>${label}</b><span class="via-d">${p}</span></span>${n === 0 ? `<span class="via-seta">${viaSvg('seta')}</span>` : ''}</a>`).join('');
const st = G.stats;
// números da home medem só o mapa: marcos, emissores, palavras-chave e conexões (maintainer, 19/11/2026); dica ao passar o mouse
$('#stats').innerHTML = [[st.marcos, 'marcos', 'Documentos oficiais no acervo'],
  [st.emissores, 'emissores', 'Instituições que publicaram os marcos'],
  [st.tags, 'palavras-chave', 'Temas que ligam os marcos'],
  [st.conexoes, 'conexões', 'Ligações desenhadas no mapa']]
  .map(([b, s, d]) => `<div class="stat" tabindex="0" data-dica="${d}" aria-label="${b} ${s}. ${d}"><b>${b}</b><span>${s}</span></div>`).join('');
$('#gerado').textContent = fmtData(G.gerado_em);

// ------------------------------------------------------------------ layers
const layersBox = $('#layers');
function renderLayers() {
  layersBox.innerHTML = LAYERS.map(L => {
    const c = nodes.filter(n => n.group === L.key && (n.type === 'marco' || n.type === 'tag' || n.type === 'doc')).length;
    return `<button class="lyr" data-layer="${L.key}" aria-pressed="${!!layerOn[L.key]}" style="--dot:var(--c-${L.key})" title="Mostrar ou esconder: ${L.label}"><span class="d"></span>${L.label}<span class="n">${c}</span></button>`;
  }).join('');
}
renderLayers();
layersBox.addEventListener('click', e => {
  const b = e.target.closest('[data-layer]'); if (!b) return;
  const k = b.dataset.layer;
  layerOn[k] = !layerOn[k];
  if (S.sel && !visible(S.sel)) { layerOn[k] = true; return; }
  store.set('layers', layerOn);
  renderLayers();
  if (S.sel) { S.focus = focusSetOf(S.sel); buildHL(VL.filter(l => (l._S === S.sel || l._T === S.sel) && visible(l._S) && visible(l._T))); if (S.mode === 'focus') renderInfo(S.sel); }
  retarget(); refreshLabels();
});
layersBox.addEventListener('mouseover', e => {
  const b = e.target.closest('[data-layer]'); if (b) setPreview(byId.get({ tag: 'col:tag', proj: 'col:proj' }[b.dataset.layer] || 'esf:' + b.dataset.layer), 'list');
});
layersBox.addEventListener('mouseout', () => setPreview(null, 'list'));

const spinBtn = $('#btn-spin');
const paintSpin = () => { spinBtn.setAttribute('aria-pressed', S.spin); spinBtn.title = S.spin ? 'Pausar a rotação' : 'Retomar a rotação'; };
paintSpin();
spinBtn.onclick = () => { S.spin = !S.spin; store.set('spin', S.spin); paintSpin(); resumeSpin(); };
$('#btn-home').onclick = () => go('root');

// ------------------------------------------------------------------ contents
const contents = $('#contents'), cBtn = $('#btn-contents');
function renderContents() {
  const cur = S.sel?.id;
  const sec = (id, title, items, col) => {
    const open = cur && (cur === id || items.includes(cur));
    // transição 4, "accordion" (transitions.dev): a seção cresce para baixo e a setinha vira
    return `<div class="cs t-acc" data-open="${!!open}" style="--dot:var(--c-${col})"><button class="t-acc-head" data-sec="${esc(id)}" aria-expanded="${!!open}">` +
      `<span class="k"><span class="t-acc-chevron" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M4 6.5L8 10.5L12 6.5"/></svg></span></span>${esc(title)}<span class="n">${items.length}</span></button>` +
      `<div class="t-acc-panel"><div class="t-acc-panel-inner"><ol>` +
      items.map(pid => `<li><button data-page="${esc(pid)}" data-node="${esc(pid)}" class="${pid === cur ? 'cur' : ''}">${esc(byId.get(pid).label)}</button></li>`).join('') + '</ol></div></div></div>';
  };
  let h = '';
  for (const L of LAYERS.slice(0, 4)) {
    const esf = byId.get('esf:' + L.key); if (!esf) continue;
    h += `<div class="cg" style="--dot:var(--c-${L.key})"><h4><span class="d"></span>${L.label}</h4>` +
      edgeIds(esf, 'contains', 'out').map(eid => sec(eid, byId.get(eid).label, edgeIds(byId.get(eid), 'contains', 'out'), L.key)).join('') + '</div>';
  }
  // o grupo "Sobre o projeto" saiu do Sumário (maintainer, 19/11/2026): as páginas do projeto estão no Menu do topo
  $('#c-body').innerHTML = h;
}
function openContents() { renderContents(); document.body.classList.add('c-open'); cBtn.setAttribute('aria-expanded', 'true'); }
function closeContents() { document.body.classList.remove('c-open'); cBtn.setAttribute('aria-expanded', 'false'); }
cBtn.onclick = () => document.body.classList.contains('c-open') ? closeContents() : openContents();
contents.addEventListener('click', e => {
  const s = e.target.closest('[data-sec]'), p = e.target.closest('[data-page]');
  if (p) return read(p.dataset.page);
  if (s) {
    const box = s.parentElement, open = box.getAttribute('data-open') === 'true';
    box.setAttribute('data-open', String(!open)); s.setAttribute('aria-expanded', String(!open));
    setPreview(byId.get(s.dataset.sec), 'list');
  }
});

// ------------------------------------------------------------------ search
const q = $('#q'), hits = $('#hits');
let hitIdx = 0, hitList = [];
function search(v) {
  v = v.trim().toLowerCase(); if (v.length < 2) return [];
  const out = [];
  for (const n of nodes) {
    if (n.type === 'root') continue;
    const l = n.label.toLowerCase();
    let sc = l === v ? 120 : l.startsWith(v) ? 70 : l.includes(v) ? 45 : 0;
    let snip = '';
    if (isRead(n)) {
      const t = PAGES[n.id]?.text || '', tl = t.toLowerCase();
      const at = tl.indexOf(v);
      if (at >= 0) {
        sc += 10 + Math.min(tl.split(v).length - 1, 8) * 2;
        if (!l.includes(v)) snip = (at > 40 ? '…' : '') + esc(t.slice(Math.max(0, at - 40), at)) + '<mark>' + esc(t.slice(at, at + v.length)) + '</mark>' + esc(t.slice(at + v.length, at + v.length + 70)) + '…';
      }
    } else if (sc === 0 && (n.desc || '').toLowerCase().includes(v)) sc = 8;
    if (!sc) continue;
    sc += { marco: 8, tag: 6, emissor: 5, esfera: 5, doc: 4, colecao: 2 }[n.type] || 0;
    out.push({ n, sc, snip });
  }
  return out.sort((a, b) => b.sc - a.sc).slice(0, 12);
}
function paintHits() {
  hits.innerHTML = hitList.length ? hitList.map((h, i) => {
    const n = h.n, em = n.em ? byId.get(n.em) : null;
    const ctx = em ? `${em.label} · ${n.ano}` : n.sub || '';
    return `<button class="hit${i === hitIdx ? ' on' : ''}" data-i="${i}" style="--dot:${cssDot(n)}"><span class="d"></span><span><b>${esc(n.label)}</b><i>${TYPE[n.type]}${ctx ? ' · ' + esc(ctx) : ''}</i>${h.snip ? `<em>${h.snip}</em>` : ''}</span></button>`;
  }).join('') : '<div class="none">nada no acervo corresponde a essa busca</div>';
  hits.classList.add('open');
}
function pickHit(i) {
  const h = hitList[i]; if (!h) return;
  q.value = ''; hits.classList.remove('open'); q.blur();
  isRead(h.n) ? read(h.n.id) : go(h.n.id);
}
q.addEventListener('input', () => {
  hitList = search(q.value); hitIdx = 0;
  if (q.value.trim().length < 2) { hits.classList.remove('open'); setPreview(null, 'list'); return; }
  paintHits();
  setPreview(hitList[0]?.n || null, 'list');
});
q.addEventListener('keydown', e => {
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault();
    if (!hitList.length) return;
    hitIdx = (hitIdx + (e.key === 'ArrowDown' ? 1 : -1) + hitList.length) % hitList.length;
    paintHits(); setPreview(hitList[hitIdx].n, 'list');
  } else if (e.key === 'Enter') { e.preventDefault(); pickHit(hitIdx); }
  else if (e.key === 'Escape') { q.value = ''; hits.classList.remove('open'); setPreview(null, 'list'); q.blur(); e.stopPropagation(); }
});
hits.addEventListener('click', e => { const b = e.target.closest('[data-i]'); if (b) pickHit(+b.dataset.i); });
hits.addEventListener('mouseover', e => { const b = e.target.closest('[data-i]'); if (b) setPreview(hitList[+b.dataset.i].n, 'list'); });
document.addEventListener('click', e => { if (!e.target.closest('.search')) hits.classList.remove('open'); });

// ------------------------------------------------------------------ keys
document.addEventListener('keydown', e => {
  if (e.target instanceof Element && e.target.matches('input,textarea')) return;
  if (e.key === '/' && document.body.classList.contains('m-overview')) { e.preventDefault(); q.focus(); return; }  // a busca só existe na visão geral do mapa
  if (e.key === 'Escape') {
    if (document.body.classList.contains('c-open')) return closeContents();
    if (S.mode === 'read') return go(S.sel.id);
    if (S.mode === 'focus') return go('root');
  }
  if (S.mode === 'read' && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
    const i = FLAT.indexOf(S.sel.id), t = FLAT[i + (e.key === 'ArrowRight' ? 1 : -1)];
    if (t) read(t);
  }
});

// ------------------------------------------------------------------ theme
// The page follows the system theme until the visitor picks one; the pick is
// shared with the resources and tree pages through the same storage key.
const themeBtn = $('#btn-theme');
const sysDark = matchMedia('(prefers-color-scheme: dark)');
const isDark = () => (document.documentElement.dataset.theme || (sysDark.matches ? 'dark' : 'light')) === 'dark';
function paintThemeBtn() {
  // a page cached from before the button existed has no button: carry on without it
  if (!themeBtn) return;
  const d = isDark();
  // transição 5, "icon swap" (transitions.dev): lua e sol ficam no mesmo lugar e um se dissolve no outro
  let sw = themeBtn.querySelector('.t-icon-swap');
  if (!sw) {
    themeBtn.innerHTML = `<span class="t-icon-swap"><span class="t-icon" data-icon="a">${ICON.moon}</span><span class="t-icon" data-icon="b">${ICON.sun}</span></span>`;
    sw = themeBtn.querySelector('.t-icon-swap');
  }
  sw.dataset.state = d ? 'b' : 'a';
  themeBtn.title = d ? 'Modo claro' : 'Modo escuro';
  themeBtn.setAttribute('aria-pressed', String(d));
}
function recolor() {
  readColors();
  scene.fog.color.copy(PAPER);
  for (const n of nodes) {
    if (!n._core) continue;
    n._core.material.color.set(dotOf(n)); n._core.material.emissive.set(dotOf(n));
    if (n._halo) n._halo.material.color.set(dotOf(n));
    if (n._shell) n._shell.material.uniforms.color.value.set(dotOf(n));
  }
  VL.forEach(paintEdge);
  lgeo.attributes.color.needsUpdate = true;
  if (hl.list.length) buildHL(hl.list);
  document.querySelectorAll('meta[name="theme-color"]').forEach(m => { m.content = '#' + PAPER.getHexString(); });
}
if (themeBtn) themeBtn.onclick = () => {
  const next = isDark() ? 'light' : 'dark';
  if (window.mieSaveTheme) window.mieSaveTheme(next);
  document.documentElement.dataset.theme = next;
  store.set('theme', next);
  paintThemeBtn(); recolor();
};
sysDark.addEventListener('change', () => { if (!document.documentElement.dataset.theme) { paintThemeBtn(); recolor(); } });
paintThemeBtn();

// ------------------------------------------------------------------ resize
addEventListener('resize', () => {
  graph.width(innerWidth).height(innerHeight);
  hl.mat.resolution.set(innerWidth, innerHeight);
  measure();
  applyView(true);
});
measure();
if (isMobile()) $('#q').placeholder = 'buscar';
document.fonts?.ready.then(() => { measure(); applyView(true); });
graph.width(innerWidth).height(innerHeight);
hl.mat.resolution.set(innerWidth, innerHeight);

// ------------------------------------------------------------------ go
camera.position.set(0, 120, 2200);
controls.target.set(0, 0, 0);

function failed(err) {
  console.error(err);
  document.body.classList.remove('booting');
  const d = document.createElement('div');
  d.className = 'fail';
  d.innerHTML = '<div><p>O mapa 3D precisa de WebGL, que não está disponível neste navegador.</p><p><a href="acervo.html">Abrir a lista do acervo</a></p></div>';
  document.body.appendChild(d);
}
})();
