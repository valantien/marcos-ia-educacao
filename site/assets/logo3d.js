/* logo 3D do título da home (ajuste fino, 2026-11-19): o icosaedro do logo, em traço como o desenho original,
   girando devagar em 3D. Só as arestas da frente aparecem (as de trás ficam escondidas), com as faces num véu leve
   da mesma cor. Usa a cor de destaque do site (coral no claro, ocre no escuro) e muda sozinho com o botão sol/lua.
   Sem WebGL, ou com "reduzir movimento" ligado, fica o desenho em traço (SVG) que já está no HTML. */
(function () {
  var T = window.THREE, L = window.THREE_LINES, svg = document.querySelector('#hero .hero-logo');
  if (!T || !L || !svg || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var box = document.createElement('span');
  box.className = 'hero-logo3d';
  box.setAttribute('aria-hidden', 'true');
  var cv = document.createElement('canvas');
  box.appendChild(cv);
  var r;
  try { r = new T.WebGLRenderer({ canvas: cv, alpha: true, antialias: true }); } catch (e) { return; }
  var PR = Math.min(devicePixelRatio || 1, 2);
  r.setPixelRatio(PR);
  svg.parentNode.insertBefore(box, svg);
  svg.style.display = 'none';

  var scene = new T.Scene(), cam = new T.PerspectiveCamera(31, 1, .1, 20);
  cam.position.set(0, 0, 4.6);
  var geo = new T.IcosahedronGeometry(1, 0);
  var gem = new T.Group();

  // esconde as arestas de trás: um sólido que só escreve profundidade, um pouco menor
  var hide = new T.Mesh(geo, new T.MeshBasicMaterial({ colorWrite: false }));
  hide.scale.setScalar(.94); hide.renderOrder = 0; gem.add(hide);
  // véu leve nas faces, como o triângulo preenchido do desenho
  var veil = new T.Mesh(geo, new T.MeshBasicMaterial({ transparent: true, opacity: .16, depthWrite: false }));
  veil.renderOrder = 1; gem.add(veil);
  // arestas em traço grosso
  var eg = new T.EdgesGeometry(geo), pos = eg.attributes.position.array;
  var lg = new L.LineSegmentsGeometry(); lg.setPositions(Array.from(pos));
  var lm = new L.LineMaterial({ linewidth: 4, worldUnits: false });
  var lines = new L.LineSegments2(lg, lm); lines.renderOrder = 2; gem.add(lines);
  gem.rotation.set(.35, .6, 0);
  scene.add(gem);

  var last = '';
  function paint() {
    var c = getComputedStyle(svg).color;           // a cor de destaque, lida do tema atual
    if (c === last) return; last = c;
    var col = new T.Color(c);
    lm.color.copy(col); veil.material.color.copy(col);
  }
  function size() {
    var s = Math.round(box.getBoundingClientRect().height) || 100;
    r.setSize(s, s, false);
    lm.resolution.set(s, s);
    lm.linewidth = Math.max(2, s * .052);          // mesma espessura relativa do traço do desenho
  }
  size(); paint();
  addEventListener('resize', size);
  var t0 = performance.now();
  (function loop(now) {
    var dt = Math.min(now - t0, 50); t0 = now;
    gem.rotation.y += .0006 * dt;                  // giro lento, no ritmo do centro do mapa
    gem.rotation.x += .00024 * dt;
    paint();
    r.render(scene, cam);
    requestAnimationFrame(loop);
  })(t0);
})();
