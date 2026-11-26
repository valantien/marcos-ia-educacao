// Página Estrutura: a árvore de pastas do repositório. Lê window.MIE_TREE (dados.js).
(() => {
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const item = (n, depth) => {
    const ds = n.d ? `<span class="ds">${esc(n.d).replace(/`([^`]+)`/g, '<code>$1</code>')}</span>` : '';
    if (n.c) {
      const open = depth < 1 || n.n === 'corpus';
      if (!n.c.length) return `<li class="dir"><span class="nm">${esc(n.n)}/</span>${ds}</li>`;
      // transição 3, "accordion" (transitions.dev): a pasta cresce para baixo e a setinha vira
      return `<li class="dir t-acc" data-open="${open}"><button type="button" class="nm t-acc-head" aria-expanded="${open}">` +
        `<span class="t-acc-chevron" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M4 6.5L8 10.5L12 6.5"/></svg></span>${esc(n.n)}/</button>${ds}` +
        `<div class="t-acc-panel"><div class="t-acc-panel-inner"><ul>${n.c.map(c => item(c, depth + 1)).join('')}</ul></div></div></li>`;
    }
    const nm = n.id ? `<a class="marco" href="index.html#/read/${esc(n.id)}">${esc(n.n)}</a>` : n.url ? `<a href="${esc(n.url)}" target="_blank" rel="noopener">${esc(n.n)}</a>` : esc(n.n);
    // cor por tipo de arquivo, como num editor de código (maintainer, 17/11/2026)
    const m = /\.([a-z0-9]+)$/i.exec(n.n), ext = m ? m[1].toLowerCase() : 'outro';
    return `<li><span class="nm f-${esc(ext)}">${nm}</span>${ds}</li>`;
  };
  const box = document.getElementById('tree');
  box.innerHTML = `<ul>${window.MIE_TREE.map(n => item(n, 0)).join('')}</ul>`;
  // regras de nome e caminho das fichas (texto de site/pages/estrutura.md, decisão 136)
  const regras = document.getElementById('regras');
  if (regras && window.MIE_ESTRUTURA) regras.innerHTML = window.MIE_ESTRUTURA;
  box.addEventListener('click', e => {
    const head = e.target.closest('.t-acc-head'); if (!head) return;
    const acc = head.parentElement, open = acc.getAttribute('data-open') === 'true';
    acc.setAttribute('data-open', String(!open));
    head.setAttribute('aria-expanded', String(!open));
  });
})();
