"""Monta os dados do site público (pasta site/) a partir das fichas e da documentação.

Uso: python3 scripts/site.py   (rodar na raiz do acervo, depois de scripts/indice.py)
Precisa de PyYAML e Markdown:  pip install pyyaml markdown

Gera (não editar à mão):
  site/assets/dados.js         o mapa, as fichas e as páginas, lidos pelo site
  (site/data/corpus.json e corpus.csv são gerados por scripts/indice.py)
  site/data/acervo-completo.md  todas as fichas num só texto, para assistentes de IA
  site/llms.txt                o "bilhete" para robôs de IA
"""
import glob, json, os, re, shutil, sys, unicodedata
from collections import Counter, defaultdict
from datetime import date

import markdown
import yaml

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = os.path.join(RAIZ, "site")
REPO = "https://github.com/valantien/marcos-ia-educacao"
SITE_URL = "https://valantien.github.io/marcos-ia-educacao"
NOME = "Marcos da IA na Educação"

ESFERAS = [  # (valor na ficha, grupo no mapa, rótulo)
    ("internacional", "int", "Internacional"),
    ("federal", "fed", "Federal"),
    ("estadual", "est", "Estadual"),
    ("municipal", "mun", "Municipal"),
]
GRUPO = {e: g for e, g, _ in ESFERAS}

# Nomes curtos dos emissores no mapa. Emissor novo sem nome aqui aparece pelo código.
EMISSORES = {
    "unesco": "UNESCO", "ocde+comissao-europeia": "OCDE e Comissão Europeia", "ocde": "OCDE",
    "uniao-europeia": "União Europeia", "cne": "CNE", "mec": "MEC", "mcti": "MCTI",
    "presidencia": "Presidência da República", "congresso": "Congresso Nacional",
    "governo-rj": "Governo do Estado do RJ", "prefeitura-rio": "Prefeitura do Rio",
}
# Palavras-chave com acento. As demais aparecem trocando o hífen por espaço.
TAGS = {
    "etica": "ética", "formacao-docente": "formação docente", "curriculo": "currículo",
    "orientacao": "orientação", "competencias": "competências", "politica-publica": "política pública",
    "letramento-ia": "letramento em IA", "regulacao-geral": "regulação geral", "avaliacao": "avaliação",
    "governanca": "governança", "protecao-de-dados": "proteção de dados", "gestao": "gestão",
    "ia-generativa": "IA generativa", "educacao-digital": "educação digital",
    "inclusao-digital": "inclusão digital", "computacao": "computação", "bncc": "BNCC",
}
SELO = {"conferido": "conferido", "parcial": "parcial", "nao-conferido": "rascunho", "em-revisao": "em-revisao"}

# Páginas de texto do projeto: (id, rótulo, arquivo de origem, descrição curta)
PAGINAS = [
    ("sobre", "Sobre o acervo", "site/pages/sobre.md", "O que é, para quem serve e quem faz este acervo."),
    ("curadoria", "Curadoria", "site/pages/curadoria.md", "O que entra, o que fica fora e o que significa cada selo."),
    ("pipeline", "Do achado ao site", "site/pages/pipeline.md", "As cinco fases por que passa cada documento."),
    ("usar-com-ia", "Use com sua IA", "site/pages/usar-com-ia.md", "Como entregar o acervo ao seu assistente de IA, com prompts de exemplo."),
    ("glossario", "Glossário", "site/pages/glossario.md", "Os termos do site explicados em linguagem simples."),
    ("estrutura", "Como o repositório se organiza", "site/pages/estrutura.md", "As pastas e as regras de nome do acervo."),
    ("como-contribuir", "Como contribuir", "site/pages/como-contribuir.md", "Como sugerir, conferir ou fichar um documento."),
    ("quem-faz", "Quem faz", "site/pages/quem-faz.md", "Os professores do GT que fazem a curadoria."),
]
DOC_DE_ARQUIVO = {os.path.normpath(src): pid for pid, _, src, _ in PAGINAS}
NO_SITE = ("data/", "llms.txt", "acervo.html", "estrutura.html", "index.html")


def slug(v, sep="-"):
    v = unicodedata.normalize("NFKD", v).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", sep, v.lower()).strip(sep)


def ler_ficha(caminho):
    texto = open(caminho, encoding="utf-8").read()
    m = re.match(r"^---\n(.*?)\n---\n", texto, re.S)
    if not m:
        sys.exit(f"sem cabeçalho YAML: {caminho}")
    meta = yaml.safe_load(m.group(1))
    return meta, texto[m.end():]


def callouts(md):
    """Troca os avisos do GitHub (> [!NOTE] ...) por caixas que o site sabe desenhar."""
    linhas, out, i = md.split("\n"), [], 0
    while i < len(linhas):
        m = re.match(r"^>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*$", linhas[i])
        if m:
            corpo = []
            i += 1
            while i < len(linhas) and linhas[i].startswith(">"):
                corpo.append(re.sub(r"^>\s?", "", linhas[i]))
                i += 1
            out += ["", f'<div class="callout c-{m.group(1).lower()}" markdown="1">', "", *corpo, "", "</div>", ""]
            continue
        out.append(linhas[i])
        i += 1
    return "\n".join(out)


def limpar_corpo(md):
    """Tira da ficha o que o site já mostra no cabeçalho (título, capa, quadro, selo, diagramas)."""
    md = re.sub(r"^# .*\n", "", md, count=1, flags=re.M)
    md = re.sub(r"<img[^>]*>\s*\n?", "", md)
    md = re.sub(r"```mermaid\n.*?```\n?", "", md, flags=re.S)
    # quadro de identificação (tabela com **Tipo**)
    md = re.sub(r"(?:^\|.*\|\s*\n)+", lambda m: "" if "**Tipo**" in m.group(0) else m.group(0), md, flags=re.M)
    # aviso de verificação (o selo já aparece no topo)
    md = re.sub(r"^> \[!\w+\]\n> \*\*Verificação:[^\n]*(?:\n>[^\n]*)*\n?", "", md, flags=re.M)
    # a seção de relacionados vira lista clicável no site
    md = re.sub(r"^## Marcos relacionados\s*\n(?:(?!^## ).*\n?)*", "", md, flags=re.M)
    return md.strip() + "\n"


def link_local(href, base_dir, ids_marcos):
    """Converte links entre arquivos do repositório em links do site (ou do GitHub)."""
    if re.match(r"^(https?:|mailto:|#)", href) or href.startswith(NO_SITE):
        return href
    alvo = os.path.normpath(os.path.join(base_dir, href.split("#")[0]))
    nome = os.path.basename(alvo)
    if alvo in DOC_DE_ARQUIVO:
        return f"#/read/doc:{DOC_DE_ARQUIVO[alvo]}"
    if nome[:-3] in ids_marcos:
        return f"#/read/{nome[:-3]}"
    return f"{REPO}/blob/main/{alvo}"


def svg_embutido(md, base_dir):
    """Troca ![texto](arquivo.svg) pelo próprio SVG embutido na página.
    O SVG usa as variáveis de cor do site e por isso muda com o botão sol/lua (um <img> não mudaria).
    No .md a linha continua sendo uma imagem comum, que o GitHub e os editores mostram.
    Padrão dos diagramas: ver handoff.md ("Padrão de diagrama nas páginas do site")."""
    def troca(m):
        caminho = os.path.join(RAIZ, base_dir, m.group(1))
        if not os.path.exists(caminho):
            print(f"aviso: diagrama {m.group(1)} não encontrado")
            return m.group(0)
        svg = open(caminho, encoding="utf-8").read()
        svg = re.sub(r"<\?xml[^>]*\?>\s*", "", svg)
        svg = re.sub(r"<metadata>.*?</metadata>\s*", "", svg, flags=re.S)
        svg = re.sub(r"\n\s*\n", "\n", svg).strip()  # linha em branco quebra o bloco HTML no conversor
        return '\n\n<div class="diagrama" markdown="0">\n' + svg + "\n</div>\n\n"
    return re.sub(r"!\[[^\]]*\]\(([^)\s]+\.svg)\)", troca, md)


def html_de(md, base_dir, ids_marcos):
    md = svg_embutido(md, base_dir)
    md = callouts(md)
    md = re.sub(r"\]\(([^)\s]+)\)", lambda m: "](" + link_local(m.group(1), base_dir, ids_marcos) + ")", md)
    conv = markdown.Markdown(extensions=["tables", "fenced_code", "md_in_html", "sane_lists", "toc"],
                             extension_configs={"toc": {"slugify": slug}})
    html = conv.convert(md)
    html = re.sub(r'<a href="(https?://[^"]+)"', r'<a class="ext" href="\1" target="_blank" rel="noopener"', html)
    heads = [{"id": t["id"], "t": t["name"]} for t in conv.toc_tokens for t in [t] if t["level"] == 2]
    texto = re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", html)).strip()
    return html, texto, heads


def resumo_curto(md):
    m = re.search(r"^## Resumo\s*\n(.*?)(?=^## |\Z)", md, re.S | re.M)
    t = m.group(1) if m else ""
    t = re.sub(r"[*_`>\[\]]", "", t)
    t = re.sub(r"^\s*-\s*", "", t, flags=re.M)
    t = re.sub(r"\s+", " ", t).strip()
    return t


def main():
    corpus = json.load(open(os.path.join(SITE, "data", "corpus.json"), encoding="utf-8"))
    marcos = corpus["marcos"]
    ids = {m["id"] for m in marcos}

    nodes, edges, pages = [], [], {}
    N = lambda **kw: nodes.append(kw)
    E = lambda s, t, k, w=1: edges.append({"s": s, "t": t, "k": k, **({"w": w} if w != 1 else {})})

    N(id="root", type="root", group="root", label=NOME,
      desc="Acervo curado por professores de documentos oficiais sobre inteligência artificial na educação.", val=30)

    por_esfera = defaultdict(list)
    for m in marcos:
        por_esfera[m["esfera"]].append(m)

    emissores_vistos = {}
    for esfera, g, rot in ESFERAS:
        ms = por_esfera.get(esfera, [])
        if not ms:
            continue
        N(id=f"esf:{g}", type="esfera", group=g, label=rot, val=14,
          desc=f"{len(ms)} marco{'s' if len(ms) != 1 else ''} da esfera {rot.lower()}.")
        E("root", f"esf:{g}", "contains")
        for m in ms:
            eid = f"em:{m['emissor']}"
            if eid not in emissores_vistos:
                emissores_vistos[eid] = []
                N(id=eid, type="emissor", group=g, label=EMISSORES.get(m["emissor"], m["emissor"]),
                  sub=rot, val=6, desc="")
                E(f"esf:{g}", eid, "contains")
            emissores_vistos[eid].append(m["id"])

    # coleções do projeto e das palavras-chave
    N(id="col:proj", type="colecao", group="proj", label="Sobre o projeto", val=10,
      desc="Como o acervo funciona: curadoria, selos, uso com IA, glossário e quem faz.")
    E("root", "col:proj", "contains")
    tags = Counter(t for m in marcos for t in (m.get("temas") or []))
    N(id="col:tag", type="colecao", group="tag", label="Palavras-chave", val=10,
      desc="Os temas que atravessam os documentos. Ligam marcos de esferas diferentes.")
    E("root", "col:tag", "contains")
    for t, c in tags.most_common():
        N(id=f"tag:{t}", type="tag", group="tag", label=TAGS.get(t, t.replace("-", " ")), slug=t, val=1 + c, count=c, desc="")
        E("col:tag", f"tag:{t}", "contains")

    # os marcos
    flat = []
    for esfera, g, _ in ESFERAS:
        for m in sorted(por_esfera.get(esfera, []), key=lambda x: str(x["data"]), reverse=True):
            meta, corpo = ler_ficha(os.path.join(RAIZ, m["arquivo"]))
            base = os.path.dirname(m["arquivo"])
            html, texto, heads = html_de(limpar_corpo(corpo), base, ids)
            capa = meta.get("capa") or ""
            if capa and not os.path.exists(os.path.join(RAIZ, capa)):
                capa = ""
            node = dict(
                id=m["id"], type="marco", group=g, read=True, label=m["titulo"],
                desc=m["ementa"], val=3, em=f"em:{m['emissor']}",
                tipo=m["tipo"], orgao=m["orgao"], numero=str(m.get("numero") or ""), data=str(m["data"]),
                ano=str(m["ano"]), esfera=m["esfera"], jurisdicao=m["jurisdicao"],
                natureza=m["natureza"], nat=m["natureza_grupo"], situacao=m["situacao"],
                temas=m.get("temas") or [], rel=[r for r in (m.get("relacionados") or []) if r in ids],
                fonte=m["fonte"], verificacao=m["verificacao"],
                selo=SELO.get(meta.get("status_verificacao") or m["status_verificacao"], "rascunho"),
                correlato=str(meta.get("correlato", "")).lower() in ("sim", "true", "yes"),
                niveis=meta.get("niveis") or [], citar=meta.get("como_citar") or "",
                conferido_em=str(meta.get("conferido_em") or ""), capa=(capa[len("site/"):] if capa.startswith("site/") else "../" + capa) if capa else "",
                arquivo=m["arquivo"], resumo=resumo_curto(corpo),
            )
            N(**node)
            pages[m["id"]] = {"html": html, "text": texto, "heads": heads}
            E(node["em"], m["id"], "contains")
            for t in node["temas"]:
                E(m["id"], f"tag:{t}", "tag")
            flat.append(m["id"])
    for m in marcos:
        for r in m.get("relacionados") or []:
            if r in ids and not any(e["k"] == "related" and {e["s"], e["t"]} == {m["id"], r} for e in edges):
                E(m["id"], r, "related")

    # páginas de texto
    for pid, rot, src, desc in PAGINAS:
        caminho = os.path.join(RAIZ, src)
        if not os.path.exists(caminho):
            print(f"aviso: página {src} não encontrada")
            continue
        md = open(caminho, encoding="utf-8").read()
        md = re.sub(r"^# .*\n", "", md, count=1, flags=re.M)
        html, texto, heads = html_de(md, os.path.dirname(src), ids)
        nid = f"doc:{pid}"
        N(id=nid, type="doc", group="proj", read=True, label=rot, desc=desc, val=4, src=src)
        E("col:proj", nid, "contains")
        pages[nid] = {"html": html, "text": texto, "heads": heads}
        for alvo in set(re.findall(r'href="#/read/([^"]+)"', html)):
            if alvo != nid and (alvo in ids or alvo.startswith("doc:")):
                E(nid, alvo, "link")
        flat.append(nid)
    validos = {n["id"] for n in nodes}
    edges = [e for e in edges if e["s"] in validos and e["t"] in validos]

    # pesos: bolha cresce com as ligações
    grau = Counter()
    for e in edges:
        if e["k"] != "contains":
            grau[e["s"]] += 1
            grau[e["t"]] += 1
    for n in nodes:
        if n["type"] == "marco":
            n["val"] = 3 + grau[n["id"]] * 0.9
        elif n["type"] == "emissor":
            n["val"] = 5 + len(emissores_vistos[n["id"]]) * 1.5

    anos = [int(m["ano"]) for m in marcos if str(m.get("ano", "")).isdigit()]
    stats = {
        "marcos": len(marcos),
        "conferidos": sum(1 for n in nodes if n["type"] == "marco" and n["selo"] == "conferido"),
        "parciais": sum(1 for n in nodes if n["type"] == "marco" and n["selo"] == "parcial"),
        "conexoes": len(edges),  # todas as linhas desenhadas no mapa
        "vinculantes": sum(1 for m in marcos if m["natureza_grupo"] == "vinculante"),
        "ano": max(anos) if anos else "",
        "emissores": len(emissores_vistos), "tags": len(tags),
        "ligacoes": sum(1 for e in edges if e["k"] != "contains"),
    }

    arvore = montar_arvore()
    out = {"gerado_em": corpus.get("gerado_em", date.today().isoformat()), "repo": REPO,
           "stats": stats, "flat": flat, "nodes": nodes, "edges": edges}
    os.makedirs(os.path.join(SITE, "assets"), exist_ok=True)
    with open(os.path.join(SITE, "assets", "dados.js"), "w", encoding="utf-8") as f:
        f.write("/* gerado por scripts/site.py - não editar à mão */\n")
        f.write("window.MIE_GRAPH=" + json.dumps(out, ensure_ascii=False, separators=(",", ":")) + ";\n")
        f.write("window.MIE_PAGES=" + json.dumps(pages, ensure_ascii=False, separators=(",", ":")) + ";\n")
        f.write("window.MIE_TREE=" + json.dumps(arvore, ensure_ascii=False, separators=(",", ":")) + ";\n")

    arquivo_unico(nodes)
    llms_txt(stats)
    print(f"site: {stats['marcos']} marcos, {len(PAGINAS)} páginas, {len(nodes)} bolhas, {len(edges)} ligações")


# Arquivos da raiz que não são publicados (também no .gitignore)
NAO_PUBLICA = {"handoff.md"}

# Pastas públicas explicadas na página Estrutura (as que começam com _ não são publicadas)
EXPLICA = {
    "README.md": "apresentação do projeto", "AGENTS.md": "instruções para assistentes de IA",
    "CLAUDE.md": "aponta para o `AGENTS.md`", "LICENSE.md": "licenças do conteúdo e do código", "CONTRIBUTING.md": "como contribuir (resumo)", "design-system.md": "cores, letras, ícones e componentes do site", "graph-libs": "receita para refazer as bibliotecas do mapa 3D", "critica-design.md": "crítica de design do site e o que falta ajustar", "404.html": "página de erro (endereço não encontrado)",
    "corpus": "as fichas dos marcos, um arquivo por documento", "br": "Brasil", "int": "organismos internacionais",
    "federal": "esfera federal", "estadual": "esfera estadual", "municipal": "esfera municipal",
    "fora-do-recorte": "fichas que saíram do acervo, guardadas para registro",
    "data": "os dados de todos os marcos em JSON e CSV e o acervo num só texto, para baixar (gerados)", "docs": "documentação do repositório",
    "assets": "imagens", "covers": "capas dos documentos", "logos": "logotipos", "photos": "fotos",
    "scripts": "programas que geram o índice, as pendências, os dados e o site",
    "site": "este site", "indice.py": "gera índice, pendências e dados", "site.py": "gera os dados do site",
    "pages": "textos das páginas do site (Sobre, Use com sua IA, Glossário, Quem faz)",
    "vendor": "bibliotecas de terceiros usadas pelo mapa 3D e as fontes, com suas licenças",
    "LICENSE": "licença MIT do código do site", "index.html": "o mapa (página inicial)",
    "acervo.html": "a lista do acervo", "estrutura.html": "esta página", "llms.txt": "bilhete para robôs de IA",
    "fontes.css": "fontes embutidas", "dados.js": "dados do site (gerado)",
    "transicoes.css": "animações de abrir, fechar e passar o mouse (da biblioteca transitions.dev)",
}


def montar_arvore():
    def no(caminho, nome, prof):
        rel = os.path.relpath(caminho, RAIZ)
        item = {"n": nome, "d": EXPLICA.get(nome, "")}
        if os.path.isdir(caminho):
            if prof >= 6 or nome in ("vendor", "assets") and rel.startswith("site"):
                item["c"] = []
                item["f"] = True
                return item
            filhos = sorted(x for x in os.listdir(caminho) if not x.startswith((".", "_")) and x != "__pycache__")
            item["c"] = [no(os.path.join(caminho, x), x, prof + 1) for x in filhos]
            if rel.startswith("corpus") and nome.endswith(".md"):
                pass
        else:
            if nome.endswith(".md") and rel.startswith("corpus") and not rel.startswith(os.path.join("corpus", "fora-do-recorte")):
                item["id"] = nome[:-3]
            item["url"] = f"{REPO}/blob/main/{rel}"
        return item
    topo = sorted(x for x in os.listdir(RAIZ) if not x.startswith((".", "_")) and x not in NAO_PUBLICA)
    return [no(os.path.join(RAIZ, x), x, 0) for x in topo]


def arquivo_unico(nodes):
    marcos = [n for n in nodes if n["type"] == "marco"]
    nome_selo = {"conferido": "Conferido", "parcial": "Parcial", "rascunho": "Rascunho", "em-revisao": "Em revisão"}
    L = [f"# {NOME}: acervo completo", "",
         f"Gerado em {date.today().isoformat()} a partir de {REPO}. Licença do conteúdo: CC BY-NC 4.0.", "",
         "## Instruções para o assistente de IA", "",
         "- Use estas fichas como base de conhecimento sobre documentos oficiais de IA na educação.",
         "- Cite sempre o documento (título, órgão, ano) e o link oficial de cada afirmação.",
         "- Não invente normas, números, datas ou trechos. Se algo não estiver aqui, diga que não está no acervo.",
         "- Cada ficha tem um selo. Só \"Conferido\" foi verificado na fonte oficial. Trate \"Parcial\", \"Rascunho\" e \"Em revisão\" com cautela e avise o usuário.",
         "- \"O que significa na prática\" é a leitura dos professores do GT, não texto do documento.", ""]
    for n in marcos:
        corpo = open(os.path.join(RAIZ, n["arquivo"]), encoding="utf-8").read()
        corpo = re.sub(r"^---\n.*?\n---\n", "", corpo, flags=re.S)
        corpo = re.sub(r"<img[^>]*>\s*\n?", "", corpo)
        corpo = re.sub(r"^# .*\n", "", corpo, count=1, flags=re.M)
        corpo = re.sub(r"^(#+) ", lambda m: "#" * (len(m.group(1)) + 1) + " ", corpo, flags=re.M)
        L += ["---", "", f"## {n['label']}", "",
              f"- **Selo:** {nome_selo.get(n['selo'], n['selo'])} ({n['verificacao']})",
              f"- **Órgão:** {n['orgao']} · **Esfera:** {n['esfera']} · **Data:** {n['data']}",
              f"- **Natureza:** {n['natureza']} · **Situação:** {n['situacao']}",
              f"- **Link oficial:** {n['fonte']}", "", corpo.strip(), ""]
    with open(os.path.join(SITE, "data", "acervo-completo.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(L))


def llms_txt(stats):
    txt = f"""# {NOME}

> Acervo curado por professores de documentos oficiais sobre inteligência artificial na educação: Brasil (federal, estadual e municipal) e organismos internacionais. Projeto do GT Formação de Professores em IA (TEIA 3, CBAE/UFRJ). {stats['marcos']} marcos. Conteúdo sob CC BY-NC 4.0.

Cada marco tem um selo de verificação. Só "Conferido" foi verificado na fonte oficial; trate os demais com cautela. Cite o documento e o link oficial; não invente normas.

## Dados

- [Acervo completo em um só texto]({SITE_URL}/data/acervo-completo.md): todas as fichas, com instruções para assistentes de IA
- [corpus.json]({SITE_URL}/data/corpus.json): dados estruturados de todos os marcos
- [corpus.csv]({SITE_URL}/data/corpus.csv): a mesma tabela em planilha

## Repositório

- [Repositório no GitHub]({REPO}): uma ficha em Markdown por documento, em corpus/
- [AGENTS.md]({REPO}/blob/main/AGENTS.md): instruções para agentes que leem o repositório
- [Regras de curadoria]({REPO}/blob/main/site/pages/curadoria.md)
"""
    with open(os.path.join(SITE, "llms.txt"), "w", encoding="utf-8") as f:
        f.write(txt)


if __name__ == "__main__":
    main()
