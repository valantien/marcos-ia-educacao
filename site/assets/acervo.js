// Página Acervo: lista dos marcos com busca, filtros e ordenação. Lê window.MIE_GRAPH (dados.js).
(() => {
  const G = window.MIE_GRAPH, byId = new Map(G.nodes.map(n => [n.id, n]));
  const marcos = G.nodes.filter(n => n.type === 'marco');
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const norm = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const fmtData = d => { const m = String(d || '').match(/^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?/); return !m ? d : m[3] ? `${m[3]}/${m[2]}/${m[1]}` : m[2] ? `${m[2]}/${m[1]}` : m[1]; };
  const ESF = [['internacional', 'Internacional', 'int'], ['federal', 'Federal', 'fed'], ['estadual', 'Estadual', 'est'], ['municipal', 'Municipal', 'mun']];
  const NAT = [['vinculante', 'Vinculante'], ['orientador', 'Orientador'], ['não vigente', 'Não vigente']];
  const SEL = [['rascunho', 'Rascunho'], ['parcial', 'Parcial'], ['conferido', 'Conferido'], ['em-revisao', 'Em revisão']];
  const F = { esfera: new Set(), nat: new Set(), selo: new Set(), tag: '', q: '', ord: 'desc' };
  const $ = id => document.getElementById(id);

  function chips(box, list, key, style) {
    $(box).insertAdjacentHTML('beforeend', list.map(([v, l, c]) => {
      const n = marcos.filter(m => (key === 'esfera' ? m.esfera : key === 'nat' ? m.nat : m.selo) === v).length;
      return `<button class="chip ${key === 'selo' ? v : ''}" data-k="${key}" data-v="${esc(v)}" style="${style ? style(c || v) : ''}"><span class="d"></span>${l} <span style="opacity:.6">${n}</span></button>`;
    }).join(''));
  }
  chips('f-esfera', ESF, 'esfera', c => `--dot:var(--c-${c})`);
  chips('f-nat', NAT, 'nat', () => '--dot:var(--soft)');
  chips('f-selo', SEL, 'selo');
  const tags = G.nodes.filter(n => n.type === 'tag').sort((a, b) => a.label.localeCompare(b.label, 'pt'));
  $('f-tag').insertAdjacentHTML('beforeend', tags.map(t => `<option value="${esc(t.slug)}">#${esc(t.label)} (${t.count})</option>`).join(''));

  document.querySelector('.controls').addEventListener('click', e => {
    const b = e.target.closest('.chip'); if (!b) return;
    const set = F[b.dataset.k]; set.has(b.dataset.v) ? set.delete(b.dataset.v) : set.add(b.dataset.v);
    render();
  });
  $('q').addEventListener('input', e => { F.q = e.target.value; render(); });
  $('ord').addEventListener('change', e => { F.ord = e.target.value; render(); });
  $('f-tag').addEventListener('change', e => { F.tag = e.target.value; render(); });
  $('limpar').addEventListener('click', e => { e.preventDefault(); F.esfera.clear(); F.nat.clear(); F.selo.clear(); F.tag = ''; F.q = ''; $('q').value = ''; $('f-tag').value = ''; render(); });

  // filtros vindos do mapa: acervo.html#esfera=federal ou #tag=etica
  const h = new URLSearchParams(location.hash.slice(1));
  if (h.get('esfera')) F.esfera.add(h.get('esfera'));
  if (h.get('tag')) { F.tag = h.get('tag'); $('f-tag').value = F.tag; }

  // transição 6, "number subtle change" (transitions.dev): só os algarismos que mudaram trocam,
  // subindo quando o número cresce e descendo quando diminui
  let num = null, valor = null;
  function contar(next) {
    if (!num) {
      $('count').innerHTML = `<span class="t-subtle-number"></span> de ${marcos.length} marcos`;
      num = $('count').firstElementChild;
    }
    if (next === valor) return;
    const prev = valor === null ? null : String(valor), str = String(next);
    const sameLength = prev !== null && prev.length === str.length;
    num.style.setProperty('--subtle-dir', valor === null || next >= valor ? '1' : '-1');
    num.setAttribute('aria-label', str);
    num.classList.remove('is-animating');
    num.replaceChildren();
    [...str].forEach((ch, i) => {
      if (prev === null || (sameLength && prev[i] === ch)) { num.append(ch); return; }
      const slot = document.createElement('span'); slot.className = 't-subtle-slot';
      if (sameLength) {
        const old = document.createElement('span'); old.className = 't-subtle-old';
        old.setAttribute('aria-hidden', 'true'); old.textContent = prev[i]; slot.appendChild(old);
      }
      const fresh = document.createElement('span'); fresh.className = 't-subtle-new'; fresh.textContent = ch;
      slot.appendChild(fresh); num.appendChild(slot);
    });
    const primeira = valor === null;
    valor = next;
    if (primeira) return; // ao abrir a página, o número já aparece parado
    void num.offsetHeight; // força o navegador a recomeçar a animação
    num.classList.add('is-animating');
  }

  function render() {
    document.querySelectorAll('.controls .chip').forEach(b => b.classList.toggle('on', F[b.dataset.k].has(b.dataset.v)));
    const q = norm(F.q.trim());
    const tagLabel = s => (byId.get('tag:' + s) || {}).label || s;
    let list = marcos.filter(m =>
      (!F.esfera.size || F.esfera.has(m.esfera)) && (!F.nat.size || F.nat.has(m.nat)) &&
      (!F.selo.size || F.selo.has(m.selo)) && (!F.tag || m.temas.includes(F.tag)) &&
      (!q || norm([m.label, m.desc, m.resumo, m.orgao, m.tipo, m.temas.map(tagLabel).join(' '), (byId.get(m.em) || {}).label].join(' ')).includes(q)));
    list.sort((a, b) => F.ord === 'asc' ? String(a.data).localeCompare(String(b.data)) : String(b.data).localeCompare(String(a.data)));
    contar(list.length);
    const nf = F.esfera.size + F.nat.size + F.selo.size + (F.tag ? 1 : 0);
    $('tfil-n').textContent = nf ? `(${nf})` : '';
    $('lista').innerHTML = list.length ? list.map(m => {
      const em = byId.get(m.em) || {}, esf = ESF.find(e => e[0] === m.esfera) || [];
      const selo = SEL.find(s => s[0] === m.selo) || [m.selo, m.selo];
      return `<a class="row" href="index.html#/read/${esc(m.id)}">
        <div class="ano">${esc(m.ano)}<small>${esc(fmtData(m.data))}</small></div>
        <div><h3>${esc(m.label)}</h3><p>${esc(m.desc)}</p>
          <div class="tg">${m.temas.map(t => '#' + esc(tagLabel(t))).join(' ')}</div></div>
        <div class="side"><span class="selo ${selo[0]}">${selo[1]}</span>
          <span class="esf" style="--dot:var(--c-${esf[2]})">${esc(esf[1] || m.esfera)}</span>
          <span class="nat">${esc((NAT.find(n => n[0] === m.nat) || [, m.natureza])[1])}</span>
          ${m.correlato ? '<span class="nat">documento correlato</span>' : ''}</div></a>`;
    }).join('') : vazio(F.q.trim(), F.esfera.size + F.nat.size + F.selo.size + (F.tag ? 1 : 0));
  }
  // lista vazia (auditoria 14/11/2026): diz o que causou o vazio e sugere as palavras-chave mais usadas
  const populares = tags.slice().sort((a, b) => b.count - a.count).slice(0, 6);
  function vazio(q, filtros) {
    const causa = q
      ? `Nenhum marco encontrado para “${esc(q)}”.${filtros ? ' Os filtros marcados também estreitam o resultado.' : ''}`
      : 'Nenhum marco com essa combinação de filtros.';
    const dica = q ? 'Tente uma palavra mais curta ou sem acento, ou escolha uma palavra-chave:' : 'Tire um dos filtros ou escolha uma palavra-chave:';
    return `<div class="none" role="status"><p>${causa}</p><p class="dica">${dica}</p>
      <div class="sug">${populares.map(p => `<button type="button" class="chip" data-sug="${esc(p.slug)}">#${esc(p.label)} <span style="opacity:.6">${p.count}</span></button>`).join('')}
      <a href="#" id="limpar2">limpar tudo</a></div></div>`;
  }
  function limparTudo() { F.esfera.clear(); F.nat.clear(); F.selo.clear(); F.tag = ''; F.q = ''; $('q').value = ''; $('f-tag').value = ''; }
  $('lista').addEventListener('click', e => {
    const s = e.target.closest('[data-sug]');
    if (s) { limparTudo(); F.tag = s.dataset.sug; $('f-tag').value = F.tag; render(); return; }
    if (e.target.closest('#limpar2')) { e.preventDefault(); limparTudo(); render(); }
  });
  // celular (até 640 px): os filtros ficam recolhidos atrás do botão "Filtros" e a busca usa um texto curto (auditoria 14/11/2026)
  const mq = matchMedia('(max-width:640px)'), phLongo = $('q').placeholder;
  const phOn = () => { $('q').placeholder = mq.matches ? 'buscar no acervo' : phLongo; };
  mq.addEventListener('change', phOn); phOn();
  $('tfil').addEventListener('click', () => {
    const c = document.querySelector('.controls'), o = c.classList.toggle('fil-open');
    $('tfil').setAttribute('aria-expanded', o ? 'true' : 'false');
  });
  render();
})();
