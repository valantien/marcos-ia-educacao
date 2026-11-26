# Estrutura do repositório

Como as pastas e os arquivos deste acervo estão organizados, e as regras de nome que valem para tudo o que entra.

## Visão geral

```
marcos-ia-educacao/
  README.md            apresentação do projeto
  AGENTS.md            instruções para assistentes de IA que trabalham no acervo
  CLAUDE.md            aponta para o AGENTS.md
  LICENSE.md           licenças do conteúdo e do código
  CONTRIBUTING.md      como contribuir (resumo)
  corpus/              as fichas dos marcos (um arquivo .md por documento)
    br/                Brasil: federal, estadual e municipal
    int/               organismos internacionais e blocos
    fora-do-recorte/   fichas que saíram do acervo, guardadas para registro
  docs/                documentação do repositório
  scripts/             indice.py (índice, pendências e dados), site.py (monta o site)
                       e graph-libs/ (receita das bibliotecas do mapa 3D)
  site/                o site público, publicado pelo GitHub Actions
    assets/            visual do site e imagens: covers/ (capas), logos/, diagrams/
```

**Site.** O código do site fica em `site/`. O `scripts/indice.py` gera `site/data/corpus.json` e `site/data/corpus.csv`. O `scripts/site.py` lê as fichas, `site/data/corpus.json` e os textos de `site/pages/` e gera os outros arquivos de dados do site (`site/assets/dados.js`, `site/data/acervo-completo.md` e `site/llms.txt`), que não são editados à mão. Os textos do site (Sobre, Curadoria, Use com sua IA, Glossário, Como contribuir, Quem faz) ficam em `site/pages/`. Este arquivo (`estrutura.md`) também fica lá, mas aparece no site na página Estrutura de pastas (`site/estrutura.html`), abaixo da árvore, e os diagramas em SVG que eles usam ficam em `site/assets/diagrams/`; as bibliotecas do mapa 3D e as fontes ficam dentro de `site/`, para o site abrir com dois cliques em `site/index.html`, sem internet. Como `docs/` é a documentação, o site é publicado no GitHub Pages pelo GitHub Actions (que aceita qualquer pasta), e não pelo modo simples, que só publica a raiz ou `docs/`.

## Pastas que não são publicadas

**Toda pasta cujo nome começa com `_` fica fora do repositório público** (ex.: `_refs/`, `_output/`, `_interno/`). O arquivo `handoff.md` (estado do trabalho) também fica fora. Elas guardam rascunhos, prévias e referências de trabalho da equipe. A regra está no `.gitignore` (`_*/`): uma pasta nova com `_` na frente já nasce protegida.

## Caminho de cada ficha

O caminho segue sempre a mesma ordem: **jurisdição → emissor → tipo de documento → ano**.

```
corpus/br/federal/<emissor>/<tipo>/AAAA/
corpus/br/estadual/<uf>/<emissor>/<tipo>/AAAA/
corpus/br/municipal/<uf>/<municipio>/<emissor>/<tipo>/AAAA/
corpus/int/<organismo>/<tipo>/AAAA/
```

Exemplos:

- `corpus/br/federal/cne/pareceres/2026/`
- `corpus/br/estadual/rj/governo/decretos/2026/`
- `corpus/br/municipal/rj/rio-de-janeiro/prefeitura/guias/2026/`
- `corpus/int/unesco/referenciais/2024/`

Para crescer, basta criar a pasta que falta: um estado novo é `corpus/br/estadual/sp/…`, um município novo é `corpus/br/municipal/mg/belo-horizonte/…`, um organismo novo é `corpus/int/banco-mundial/…`. A lista de tipos aceitos está em [`mapa-tipos.md`](../../docs/mapa-tipos.md).

`corpus/fora-do-recorte/` repete a mesma organização. O script não lê essa pasta: as fichas dela não entram no índice nem no site, mas ficam públicas para mostrar o que saiu do acervo e por quê (ver [`curadoria.md`](curadoria.md)).

## Regras de nome

- **Pastas e arquivos em minúsculas, sem acento, com hífen** (ex.: `projetos-de-lei`, `mapa-tipos.md`).
- Exceção: os arquivos-padrão da raiz, que ficam em maiúsculas por convenção (`README.md`, `AGENTS.md`, `CLAUDE.md`).
- **Ficha:** `AAAA-tipo-numero-assunto-curto.md` (ex.: `2026-parecer-cne-cp-15-diretrizes-ia.md`). O nome do arquivo, sem `.md`, é também o `id` do marco.
- **Capa:** `site/assets/covers/<id>.png`, com o mesmo `id` da ficha.

## Arquivos gerados

Não editar à mão. Para atualizar, rodar o script (ver [`como-contribuir.md`](como-contribuir.md)).

- `docs/log-indice.md`: todos os marcos, por esfera e por tema.
- `docs/log-pendencias.md`: marcos cuja verificação na fonte ainda não está completa.
- `site/data/corpus.json` e `site/data/corpus.csv`: os dados do site e da versão para assistentes de IA.
