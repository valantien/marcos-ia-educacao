"""Gera docs/log-indice.md, docs/log-pendencias.md e os dados do site (site/data/corpus.json e
site/data/corpus.csv) a partir do cabeçalho YAML de cada marco.

Uso: python3 scripts/indice.py  (rodar na raiz do acervo)
Os arquivos gerados não devem ser editados à mão.
"""
import csv, glob, json, os, re, sys
from collections import defaultdict
from datetime import date
import yaml

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PASTAS_MARCOS = {"br", "int"}  # subpastas de corpus/ lidas pelo script
ESFERAS = ["internacional", "federal", "estadual", "municipal"]
OBRIGATORIOS = ["id", "titulo", "tipo", "esfera", "jurisdicao", "emissor", "data",
                "ementa", "situacao", "natureza", "temas", "fonte", "verificacao"]

def ler(caminho):
    texto = open(caminho, encoding="utf-8").read()
    m = re.match(r"^---\n(.*?)\n---\n", texto, re.S)
    if not m:
        sys.exit(f"sem cabeçalho YAML: {caminho}")
    meta = yaml.safe_load(m.group(1))
    meta["_corpo"] = texto[m.end():]
    meta["_arquivo"] = os.path.relpath(caminho, RAIZ)
    faltam = [c for c in OBRIGATORIOS if c not in meta]
    if faltam:
        sys.exit(f"{caminho}: faltam campos {faltam}")
    if meta["id"] != os.path.basename(caminho)[:-3]:
        sys.exit(f"{caminho}: id diferente do nome do arquivo")
    return meta

def main():
    arquivos = [f for f in glob.glob(os.path.join(RAIZ, "corpus", "*", "**", "*.md"), recursive=True)
                if os.path.relpath(f, os.path.join(RAIZ, "corpus")).split(os.sep)[0] in PASTAS_MARCOS
                and not os.path.basename(f).startswith("_")]
    marcos = sorted((ler(f) for f in arquivos), key=lambda m: str(m["data"]), reverse=True)
    ids = {m["id"] for m in marcos}
    for m in marcos:
        for r in m.get("relacionados") or []:
            if r not in ids:
                print(f"aviso: {m['id']} cita relacionado inexistente {r}")

    hoje = date.today().isoformat()
    L = ["# Índice do acervo", "", f"Gerado por `scripts/indice.py` em {hoje}. Não editar à mão.", "",
         f"Total: **{len(marcos)}** marcos.", "", "## Por esfera", ""]
    por_esfera = defaultdict(list)
    for m in marcos:
        por_esfera[m["esfera"]].append(m)
    for e in ESFERAS:
        if not por_esfera[e]:
            continue
        L += [f"### {e.capitalize()} ({len(por_esfera[e])})", "",
              "| Data | Documento | Jurisdição | Natureza |", "|---|---|---|---|"]
        for m in por_esfera[e]:
            L.append(f"| {m['data']} | [{m['titulo']}](../{m['_arquivo']}) | {m['jurisdicao']} | {m['natureza']} |")
        L.append("")
    L += ["## Por tema", ""]
    por_tema = defaultdict(list)
    for m in marcos:
        for t in m["temas"]:
            por_tema[t].append(m)
    for t in sorted(por_tema):
        links = ", ".join(f"[{m['id']}](../{m['_arquivo']})" for m in por_tema[t])
        L.append(f"- **{t}** ({len(por_tema[t])}): {links}")
    open(os.path.join(RAIZ, "docs", "log-indice.md"), "w", encoding="utf-8").write("\n".join(L) + "\n")

    P = ["# Pendências de verificação", "", f"Gerado por `scripts/indice.py` em {hoje}. Não editar à mão.", "",
         "Marcos cuja verificação não está completa. Conferir na fonte oficial antes de citar no Documento-Base.", ""]
    pend = [m for m in marcos if not str(m["verificacao"]).startswith("conferido")]
    for m in pend:
        P.append(f"- [{m['titulo']}](../{m['_arquivo']}): {m['verificacao']}")
    open(os.path.join(RAIZ, "docs", "log-pendencias.md"), "w", encoding="utf-8").write("\n".join(P) + "\n")
    exportar(marcos, hoje)
    print(f"{len(marcos)} marcos, {len(pend)} com pendência")


def status_verificacao(v):
    """conferido | parcial | em-revisao | nao-conferido (mesma regra de log-pendencias.md)."""
    v = str(v)
    if v.startswith("conferido"):
        return "conferido"
    if v.startswith("parcial"):
        return "parcial"
    if v.startswith("em-revisao") or v.startswith("em revisão"):
        return "em-revisao"
    return "nao-conferido"


def grupo_natureza(n):
    n = str(n).lower()
    if n.startswith("vinculante"):
        return "vinculante"
    if n.startswith("não vigente") or n.startswith("nao vigente"):
        return "não vigente"
    return "orientador"


def secoes(corpo):
    """Separa o corpo do marco em {nome da seção: texto em Markdown}."""
    out, atual = {}, None
    for linha in corpo.splitlines():
        h = re.match(r"^## (.+)$", linha)
        if h:
            atual = h.group(1).strip().lower()
            out[atual] = []
        elif atual:
            out[atual].append(linha)
    return {k: "\n".join(v).strip() for k, v in out.items()}


def exportar(marcos, hoje):
    """Gera site/data/corpus.json (usado pelo site e para baixar) e site/data/corpus.csv."""
    pasta = os.path.join(RAIZ, "site", "data")
    os.makedirs(pasta, exist_ok=True)
    campos = ["id", "titulo", "tipo", "esfera", "jurisdicao", "emissor", "orgao", "numero",
              "data", "ano", "ementa", "situacao", "natureza", "natureza_grupo", "temas",
              "relacionados", "fonte", "verificacao", "status_verificacao", "registrado_em",
              "arquivo"]
    linhas = []
    for m in marcos:
        s = secoes(m["_corpo"])
        d = {
            "id": m["id"], "titulo": m["titulo"], "tipo": m["tipo"], "esfera": m["esfera"],
            "jurisdicao": m["jurisdicao"], "emissor": m["emissor"], "orgao": m.get("orgao", ""),
            "numero": str(m.get("numero", "")), "data": str(m["data"]), "ano": str(m["data"])[:4],
            "ementa": m["ementa"], "situacao": m["situacao"], "natureza": m["natureza"],
            "natureza_grupo": grupo_natureza(m["natureza"]), "temas": list(m["temas"]),
            "relacionados": list(m.get("relacionados") or []), "fonte": m["fonte"],
            "verificacao": m["verificacao"], "status_verificacao": status_verificacao(m["verificacao"]),
            "registrado_em": str(m.get("registrado_em", "")), "arquivo": m["_arquivo"],
            "resumo": s.get("resumo", ""), "na_pratica": s.get("o que significa na prática", ""),
            "nota_gt": s.get("nota do gt", ""),
            "observacoes": s.get("observações", s.get("observacoes", "")),
        }
        linhas.append(d)
    with open(os.path.join(pasta, "corpus.json"), "w", encoding="utf-8") as f:
        json.dump({"gerado_em": hoje, "total": len(linhas), "marcos": linhas}, f,
                  ensure_ascii=False, indent=1)
    with open(os.path.join(pasta, "corpus.csv"), "w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=campos, extrasaction="ignore")
        w.writeheader()
        for d in linhas:
            w.writerow({**d, "temas": "; ".join(d["temas"]), "relacionados": "; ".join(d["relacionados"])})

if __name__ == "__main__":
    main()
