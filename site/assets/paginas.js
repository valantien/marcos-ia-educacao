// Comum às páginas Acervo e Estrutura: tema claro/escuro e data de atualização.
(() => {
  const SUN = "<svg class=\"i\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"4\"/> <path d=\"M12 2v2\"/> <path d=\"M12 20v2\"/> <path d=\"m4.93 4.93 1.41 1.41\"/> <path d=\"m17.66 17.66 1.41 1.41\"/> <path d=\"M2 12h2\"/> <path d=\"M20 12h2\"/> <path d=\"m6.34 17.66-1.41 1.41\"/> <path d=\"m19.07 4.93-1.41 1.41\"/></svg>", MOON = "<svg class=\"i\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401\"/></svg>";
  const btn = document.getElementById('theme');
  const sys = matchMedia('(prefers-color-scheme: dark)');
  const dark = () => (document.documentElement.dataset.theme || (sys.matches ? 'dark' : 'light')) === 'dark';
  // transição 5, "icon swap" (transitions.dev): lua e sol ficam no mesmo lugar e um se dissolve no outro
  btn.innerHTML = `<span class="t-icon-swap"><span class="t-icon" data-icon="a">${MOON}</span><span class="t-icon" data-icon="b">${SUN}</span></span>`;
  const paint = () => { btn.querySelector('.t-icon-swap').dataset.state = dark() ? 'b' : 'a'; btn.title = dark() ? 'Modo claro' : 'Modo escuro'; };
  btn.onclick = () => { const t = dark() ? 'light' : 'dark'; if (window.mieSaveTheme) window.mieSaveTheme(t); document.documentElement.dataset.theme = t; try { localStorage.setItem('mie:theme', JSON.stringify(t)); } catch (e) { } paint(); };
  paint();
  const g = document.getElementById('gerado');
  const d = (window.MIE_GRAPH && window.MIE_GRAPH.gerado_em || '').split('-');
  if (g && d.length === 3) g.textContent = `${d[2]}/${d[1]}/${d[0]}`;
  // faixa atrás do menu só depois de rolar; no alto da página fica tudo pontilhado (maintainer, 07/11/2026)
  const rolou = () => document.body.classList.toggle('rolou', scrollY > 8);
  addEventListener('scroll', rolou, { passive: true }); rolou();
  // blocos da página sobem e aparecem uma vez ao entrar na tela; não vale com movimento reduzido
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visto'); io.unobserve(e.target); } }));
    document.querySelectorAll('main > *').forEach(el => { el.classList.add('revela'); io.observe(el); });
  }
})();

// Menu suspenso nas telas até 1100 px (como na home): abre crescendo do botão, fecha com Esc, clique fora ou ao escolher um link.
(() => {
  const b = document.getElementById('btn-menu'), n = document.getElementById('nav-links'); if (!b || !n) return;
  const place = () => { const r = b.getBoundingClientRect(); n.style.top = (r.bottom + 8) + 'px'; n.style.right = Math.max(8, document.documentElement.clientWidth - r.right) + 'px'; };
  const closeMs = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--dropdown-close-dur')) || 150;
  let tm = 0;
  const set = o => {
    const was = n.classList.contains('open');
    n.classList.toggle('open', o); b.setAttribute('aria-expanded', o ? 'true' : 'false');
    clearTimeout(tm);
    if (o) { place(); n.classList.remove('is-closing'); n.classList.add('is-open'); }
    else if (was) { n.classList.remove('is-open'); n.classList.add('is-closing'); tm = setTimeout(() => n.classList.remove('is-closing'), closeMs); }
  };
  addEventListener('resize', () => { if (n.classList.contains('open')) place(); });
  b.addEventListener('click', e => { e.stopPropagation(); set(!n.classList.contains('open')); });
  n.addEventListener('click', e => { if (e.target.closest('a')) set(false); });
  document.addEventListener('click', e => { if (!n.contains(e.target)) set(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') set(false); });
})();
