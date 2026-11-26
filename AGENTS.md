# Marcos da IA na Educação: instruções para assistentes de IA

Instruções para qualquer assistente de IA que leia ou trabalhe neste repositório. `CLAUDE.md` só aponta para este arquivo.

## O que é

Acervo curado de documentos oficiais sobre **IA na educação**: Brasil (federal, estadual e municipal) e organismos internacionais. É o trabalho do GT Formação de Professores em IA (TEIA 3, CBAE/UFRJ).

Este repositório publica o site `valantien.github.io/marcos-ia-educacao`. O código do site fica em `site/` e é montado por `scripts/site.py`.

## Leia antes de trabalhar

As regras ficam em um lugar só. Não repita nem contradiga essas regras aqui; se uma regra mudar, atualize o documento certo e registre a mudança em `docs/log-decisoes.md`.

- `site/pages/curadoria.md`: o que entra no acervo, correlatos, as cinco fases (captura, ingestão, conferência, publicação, vigilância), verificação, selos e como escrever a ficha.
- `site/pages/estrutura.md`: pastas, caminhos e regras de nome. No site, aparece abaixo da árvore da página Estrutura de pastas (`site/estrutura.html`), não no leitor.
- `docs/modelo-ficha.md`: modelo obrigatório de toda ficha nova.
- `docs/design-system.md`: cores, letras, ícones e componentes do site. Ler antes de mexer no visual.
- `docs/log-decisoes.md` e `docs/log-triagem.md`: **consultar antes de avaliar um documento.** Se ele já foi decidido, informe a decisão e o motivo em vez de avaliar de novo.

## Para responder sobre o acervo

- Use só as fichas em `corpus/` ou o arquivo único `site/data/acervo-completo.md`. Os dados em tabela estão em `site/data/corpus.json` e `site/data/corpus.csv`.
- Cite a fonte oficial de cada ficha (campo `fonte`).
- Avise quando a ficha ainda não foi conferida (selos Rascunho, Parcial ou Em revisão).
- Responda em português do Brasil, salvo pedido em contrário.

## Para editar o repositório

- **Nomes de pessoas:** só como crédito ou autoria (página Quem faz, protocolos de curadoria, licença). Em qualquer outro texto, use "maintainer" para quem decide. Nada de telefones ou e-mails.
- **Pastas e arquivos novos:** minúsculas, sem acento, com hífen.
- **Arquivos gerados não se editam à mão:** `docs/log-indice.md`, `docs/log-pendencias.md`, `site/data/`, `site/assets/dados.js` e `site/llms.txt`. Rode `python3 scripts/indice.py` e depois `python3 scripts/site.py` (precisam de PyYAML; o segundo também de markdown) e confira que terminam sem erro.
- **Palavras-chave (`temas`):** ainda não há vocabulário fechado. Não crie palavra-chave nova nem troque uma por sinônimo sem avisar o maintainer; aponte as parecidas.
- **Texto das páginas:** em `site/pages/*.md` e `docs/*.md`, nomes de arquivo e de pasta vão entre crases (`` `corpus/` ``).
- **Site sem internet:** o site precisa abrir com dois cliques em `site/index.html`. Nada de CDN nem de módulos JavaScript; bibliotecas e fontes ficam dentro de `site/`.
- **Menu:** o HTML do menu é escrito à mão nas quatro páginas (`index.html`, `acervo.html`, `estrutura.html`, `404.html`). Página nova entra nas quatro.
- **Mudanças grandes** entram por pull request, para revisão do maintainer.

## Se a estrutura mudar

Ao renomear ou mover pastas e arquivos, atualizar na mesma tarefa:

1. `scripts/indice.py` e `scripts/site.py`, se mudar algum caminho que eles usam; rodar os dois em seguida.
2. `.gitignore`, se mudar o que não é publicado.
3. `site/pages/estrutura.md` (a descrição oficial das pastas) e, se for o caso, `curadoria.md`, `como-contribuir.md` e `docs/mapa-tipos.md`.
4. `README.md` (bloco "Organização" e links) e este `AGENTS.md`.
5. Uma decisão nova em `docs/log-decisoes.md`.
6. No fim: procurar o nome antigo em todos os arquivos, conferir os links e confirmar que nenhum nome de pessoa aparece fora dos créditos.
