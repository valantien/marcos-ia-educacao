# Registro de decisões

Histórico das decisões sobre o acervo, da mais recente para a mais antiga. Toda decisão nova entra aqui, com data, o que foi decidido e onde está detalhada. Quem decide é o maintainer do projeto, em nome do GT. Decisões sobre documentos específicos (aceito ou recusado) ficam em [log-triagem.md](log-triagem.md); aqui entram só as que mudam regras. As regras em vigor estão reunidas em [curadoria.md](../site/pages/curadoria.md), [estrutura.md](../site/pages/estrutura.md) e [pipeline.md](../site/pages/pipeline.md).

Legenda: **DECIDIDO** · **ADIADO** (decidir depois) · **MUDOU** (substitui decisão anterior).

## 24/11/2026

| # | Decisão | Tipo | Onde está detalhada |
|---|---|---|---|
| 128 | **Preparação para o GitHub:** `AGENTS.md` dividido em público (regras para qualquer assistente) e interno (`_interno/AGENTS-maintainer.md`, não publicado); regras repetidas da curadoria saíram do `AGENTS.md`; a descrição do visual virou `docs/design-system.md`; o `handoff.md` deixou de ser publicado. | DECIDIDO | `AGENTS.md` |
| 129 | **Licença única:** `LICENSE.md` na raiz, com conteúdo do GT em CC BY-NC 4.0 e código (`site/` e `scripts/`) em MIT, em nome do autor, com crédito ao Second Brain OS; `site/LICENSE` saiu. Novo `CONTRIBUTING.md`, curto, apontando para `como-contribuir.md`. | DECIDIDO | `LICENSE.md` |
| 130 | **Uma pasta `assets` só:** as capas passaram de `assets/covers/` (raiz) para `site/assets/covers/`; bibliotecas antigas sem uso saíram de `site/vendor/`; receita para refazer o `graph-libs.js` em `site/vendor/README.md`. | MUDOU | `site/pages/estrutura.md` |
| 131 | **"Maintainer" para quem decide:** os termos "admin" e "mantenedor" foram unificados como "maintainer" (termo usado no GitHub e em projetos de código aberto) em todos os arquivos do acervo, inclusive no histórico. | MUDOU | `AGENTS.md` |
| 132 | **Versão do site:** a primeira publicação no GitHub (24/11/2026) é a **v1**. Quando as fichas começarem a ser conferidas, a versão passa a ser **v1.1**. | DECIDIDO | este arquivo |
| 133 | **Home no celular (até 760 px):** busca mais estreita com o texto "buscar"; logos CBAE/UFRJ menores; título e texto menores; botão "Explorar os marcos" compacto, do tamanho do texto; os cartões "Curadoria" e "Use com sua IA" saem da home no celular (continuam no menu); o bloco de texto encosta na legenda e o mapa se centraliza no espaço livre acima dele. | DECIDIDO | `site/assets/app.css`, `site/assets/app.js` |

## 18/11/2026

| # | Decisão | Tipo | Onde está detalhada |
|---|---|---|---|
| 122 | **Sumário com a letra do Menu:** o Sumário passou a usar Rubik peso 500 em 12 px (a mesma do Menu do topo), mantendo os títulos coloridos por grupo. O Menu fica como estava, com os títulos de grupo em cinza. Testada e recusada a versão com o Menu na letra do Sumário (700, 14 px) e títulos coloridos. Cópia antes em `_output/backups/antes-sumario-fonte-menu-2026-11-19/` | MUDOU | este registro |
| 123 | **Ícone do Sumário = organograma:** o botão Sumário trocou o ícone de lista pelo de organograma (três caixas ligadas), para não se confundir com o sanduíche do Menu quando os dois ficam só com o desenho. Opções vistas e não escolhidas: livro aberto e bússola. Cópia antes em `_output/backups/antes-icone-sumario-2026-11-19/` | MUDOU | este registro |
| 124 | **Botão do topo = "M.I.A.":** o nome ao lado do logo, no topo, passou de "Marcos IA EDU" para "M.I.A." (sigla de Marcos da IA na Educação), nas 4 páginas (home, Acervo, Estrutura, 404). Leitores de tela leem o nome completo. Cópia antes em `_output/backups/antes-brand-mia-2026-11-19/` | MUDOU | este registro |
| 125 | **Botão "Sumário" vira "Marcos":** o botão da lista de documentos agrupada por esfera, no topo da home, passou a se chamar "Marcos" (antes "Sumário"). Só o nome mudou; o painel, as cores e o ícone seguem iguais. Cópia antes em `_output/backups/antes-sumario-marcos-2026-11-19/` | MUDOU | este registro |
| 126 | **Voltou "Marcos IA EDU"; "Sumário" vira "Documentos":** a decisão 124 (M.I.A.) foi desfeita: o botão do topo volta a ser "Marcos IA EDU" nas 4 páginas. O botão que era "Sumário" (e por um momento "Marcos", decisão 125) passa a se chamar "Documentos". Cópia antes em `_output/backups/antes-brand-edu-documentos-2026-11-19/` | MUDOU | substitui 124 e 125 |
| 127 | **Bloco da home alinhado ao fim do título:** o painel da esquerda da home ficou mais estreito (largura igual à do título grande: 412 px em telas largas, menor em telas menores). Para compensar a altura: o cartão "Como a curadoria funciona" virou "Curadoria" e os números ficaram menores (24 px). Com isso os números e rótulos aparecem inteiros numa tela de 900 px de altura (antes ficavam cortados). Testado e recusado no mesmo dia: aura nos marcos do mapa (a aura segue só nos nós que agrupam). Cópia antes em `_output/backups/antes-bloco-estreito-2026-11-19/` | MUDOU | este registro |
| 121 | **Busca só na visão geral do mapa (home):** o campo "buscar no acervo" some quando uma ficha ou página está aberta no leitor e quando um item do mapa está selecionado; o atalho `/` também só vale na visão geral. Cópia antes em `_output/backups/antes-busca-so-na-home-2026-11-19/` | MUDOU | este registro |
| 120 | **Sumário sem o grupo "Sobre o projeto":** as páginas do projeto ficam só no Menu do topo (decisão 119). O grupo continua no mapa e na legenda. Cópia antes em `_output/backups/antes-sumario-sem-projeto-2026-11-19/` | MUDOU | este registro |
| 119 | **Menu do topo completo, em modelo sanduíche, em todas as larguras:** o botão "Menu ☰" fica sempre à direita e abre todas as páginas, em grupos (Mapa e Acervo; O projeto: Sobre o acervo, Curadoria, Do achado ao site, Quem faz, Como contribuir; Usar: Use com sua IA, Glossário; Repositório: Estrutura de pastas, Como o repositório se organiza, Código no GitHub). Os links soltos saíram da barra. Mesmo menu na home, no Acervo, na Estrutura e na 404; página atual destacada; no celular rola por dentro. O Sumário trocou o ícone de três linhas por uma lista com marcadores, para não repetir o sanduíche. Cópia antes em `_output/backups/antes-menu-sanduiche-2026-11-19/` | MUDOU | este registro |
| 118 | **Legenda do mapa mais transparente:** só o fundo da caixa passou de 92% para 50% de cobertura, com leve desfoque; letras, bolinhas e borda iguais. No celular, a lista aberta continua com fundo cheio. Cópia antes em `_output/backups/antes-legenda-transparente-2026-11-19/` | MUDOU | este registro |
| 117 | **Logo do título da home gira em 3D:** o icosaedro em traço (arestas da frente, faces num véu leve da cor de destaque) gira devagar, em `site/assets/logo3d.js`. Sem 3D ou com "reduzir movimento", fica o desenho em traço parado. Testada e recusada a versão sólida facetada. Cópia antes em `_output/backups/antes-logo-3d-2026-11-19/` | MUDOU | este registro |
| 116 | **Cartões secundários da home mais baixos:** em "Como a curadoria funciona" e "Use com sua IA", o título fica ao lado do ícone e o texto começa logo abaixo. Cópia antes em `_output/backups/antes-cartoes-baixos-2026-11-19/` | MUDOU | este registro |
| 115 | **Números da home medem só o mapa:** marcos, emissores, palavras-chave e conexões. Saíram "parciais" (conferência) e "vinculantes" (natureza), que misturavam critérios; a natureza continua na ficha e no Acervo. Cada número tem uma dica ao passar o mouse (Documentos oficiais no acervo; Instituições que publicaram os marcos; Temas que ligam os marcos; Ligações desenhadas no mapa), com a palavra sublinhada em pontilhado para indicar a dica. Cópias antes em `_output/backups/antes-dicas-numeros-2026-11-19/` e `_output/backups/antes-numeros-mapa-2026-11-19/` | MUDOU | este registro |
| 114 | **Legenda do mapa no celular vira botão "Legenda"** com as 6 bolinhas; ao tocar, abre a lista completa acima da barra (uma coluna em telas estreitas). Números da legenda entre parênteses, no computador e no celular. Cópia antes em `_output/backups/antes-legenda-celular-2026-11-19/` | MUDOU | este registro |
| 113 | **Botão do topo (voltar ao mapa) com o nome curto "Marcos IA EDU"** em todas as páginas; o nome completo segue no título da home e na aba. Cópia antes em `_output/backups/antes-botao-home-2026-11-19/` | MUDOU | este registro |
| 112 | **Logo (icosaedro) ao lado do título da home**, com a altura das duas linhas; título sempre quebra depois de "IA". Cópia antes em `_output/backups/antes-logo-titulo-2026-11-19/` | DECIDIDO | este registro |
| 111 | **Frase acima do título continua "o acervo inteiro, como um mapa"** (alternativas testadas e recusadas) | DECIDIDO | este registro |
| 110 | **Prefixo `log-` para os registros de `docs/`:** `decisoes.md`, `triagem.md`, `indice.md` e `pendencias.md` viraram `log-decisoes.md`, `log-triagem.md`, `log-indice.md` e `log-pendencias.md` (hífen, como na decisão 45). `modelo-ficha.md` e `mapa-tipos.md` mantêm o nome. `scripts/indice.py`, links, README, AGENTS e handoff ajustados; os documentos do projeto (v0.1, v1, v2) ficaram como estavam. Backup em `_output/antes-log-2026-11-18/`. | DECIDIDO | `docs/` |
| 109 | **Conteúdo separado de documentação:** os 4 textos que viram páginas do site (curadoria, pipeline, estrutura, como-contribuir) saíram de `docs/` e foram para `site/pages/`, junto com Sobre, Use com sua IA, Glossário e Quem faz. `docs/` fica só com a documentação do repositório (decisões, triagem, índice, pendências, modelo de ficha, mapa de tipos). `scripts/site.py`, links, README, AGENTS e handoff ajustados. Backup em `_output/textos-site/antes-mover-docs-2026-11-18/`. | DECIDIDO | `site/pages/`, `scripts/site.py` |
| 108 | **Use com sua IA e Glossário atualizados (etapa 4 dos textos institucionais):** abertura explica a alucinação e por que apontar para o repositório ajuda; chat em dois modos (primário: pelo endereço do arquivo único; secundário: copiar o texto); quatro prompts de exemplo com título, no mesmo molde (arquivo, contexto, tarefa, regras contra invenção, formato); diagrama "Com e sem o acervo" (`site/assets/diagrams/com-e-sem-acervo.svg`). Glossário: selos descritos só pelo nome, sem cor; verbetes novos Ficha e Protocolo de Curadoria. Testar os prompts em chatbots reais fica para depois (handoff). | DECIDIDO | `site/pages/usar-com-ia.md`, `site/pages/glossario.md` |
| 107 | **Quem faz reescrito (etapa 3):** hierarquia CBAE/UFRJ (com logo horizontal), Cátedra Fredric Litto, TEIA (trilogia; coordenação: Ronaldo Mota e Gabriel Goldmeier), GT Formação de Professores em IA (curadores) e Como contribuir. Seção de manutenção removida. Falta reunir o nome de todos os membros do GT (handoff). | DECIDIDO | `site/pages/quem-faz.md` |
| 106 | **Curadoria atualizada (etapa 2):** quem decide é o protocolo (o maintainer aplica e registra; na dúvida o GT decide por consenso); selo Conferido exige dois curadores; diagrama "O caminho de uma ficha". Protocolo de Curadoria v2.1 (proposta ao GT) alinha o texto do protocolo a essa regra. | DECIDIDO | `docs/curadoria.md`, `docs/templates/protocolo-curadoria-v2-1.md` |
| 105 | **Sobre reescrito (etapa 1 dos textos institucionais):** novo recorte com direto, indireto e correlato; público de decisão 104; selos saem do Sobre (ficam em Curadoria); crédito ao Second Brain OS removido (licença a rever, ver handoff). **Diagrama "O que entra no acervo"** em SVG embutido na página, com as cores do site (muda com o botão sol/lua). O arquivo fica em `site/assets/diagrams/o-que-entra.svg`; o `.md` só traz uma linha de imagem, e o `scripts/site.py` a troca pelo SVG embutido (assim o `.md` fica legível e o diagrama muda de cor com o tema). Cópia do `site.py` antes em `_output/textos-site/site-antes-2026-11-18.py`. Cópia antes em `_output/textos-site/sobre-antes-2026-11-18.md` | DECIDIDO | este registro |
| 104 | **Público-alvo em um grupo só, sem divisão entre principal e secundário:** professores, pesquisadores e gestores da educação, nessa ordem. O acervo é aberto também ao público em geral. Substitui o rótulo "gestores da educação" (09/11) e o item 6 de 05/11 ("professores, gestores e todos que tomam decisões…"). Textos que ainda usam a redação antiga: `curadoria.md` e o documento de entrega v2 | MUDOU | este registro |
| 103 | **Tema correlato novo: direitos de crianças e adolescentes no ambiente digital.** Primeiro documento: ECA Digital (Lei nº 15.211/2025), aceito como correlato. Origem: o documento aparece como modelo de proteção na minuta de proposta de regulação da IA generativa (v0.1, 13/11/2026). Pelo Protocolo de Curadoria (seção 5), o tema ainda precisa da aprovação do GT | DECIDIDO (aprovação do GT pendente) | log-triagem.md |
| 102 | **Uma pasta `data/` só.** A pasta `data/` da raiz deixou de existir; `scripts/indice.py` grava `corpus.json` e `corpus.csv` direto em `site/data/`, de onde o site e os downloads leem. Antes havia duas pastas `data/` com os mesmos dois arquivos. Cópia antes em `_output/design-systems/antes-unir-data-2026-11-18/` | MUDOU | este registro |
| 101 | **Pastas do site renomeadas em inglês:** `site/dados/` virou `site/data/` e `site/paginas/` virou `site/pages/`. Ajustados `scripts/site.py` (rodado de novo, sem erro), os links de download em `acervo.html` e `estrutura.html`, `site/pages/usar-com-ia.md`, `llms.txt`, `docs/estrutura.md`, `AGENTS.md` e `handoff.md`. Os arquivos `assets/dados.js`, `assets/paginas.js` e `assets/paginas.css` mantêm o nome. A palavra-chave `dados` nas fichas não mudou. Cópia antes em `_output/design-systems/antes-renomear-pastas-2026-11-18/` | MUDOU | este registro |
| 100 | **Logo: o icosaedro do nó raiz** (sólido de 20 faces, traço, triângulo da frente preenchido) no lugar do ícone Lucide do topo do site (mapa, acervo, estrutura e página de erro) e no ícone da aba (coral sobre creme). Cópia antes em `_output/design-systems/antes-grafo-3d-2026-11-17/` | MUDOU | este registro |
| 99 | **Grafo 3D mais bonito (versão final).** Nó raiz (o acervo) vira um icosaedro facetado girando devagar, coral no claro e ocre no escuro, com aura e brilho que respira; palavras-chave viram tetraedros (pirâmides) pequenos que giram devagar; esferas distribuídas em constelação em volta do centro; aura que se desfaz, sem borda no modo claro; abertura "florescendo" do centro; rotação mais lenta; grafo inteiro cabe na tela; pontos de luz correm pelas linhas ao clicar; nós flutuam de leve, dão um pulinho no mouse e soltam uma onda no clique; linhas retas com degradê. Cores das esferas e rótulos continuam como antes. Cópia antes em `_output/design-systems/antes-grafo-3d-2026-11-17/` | MUDOU | este registro |
| 98 | **Testados e recusados no grafo 3D:** paleta nova das esferas; linhas em arco; anéis girando no centro; aura nos marcos; marcos maiores com anel na cor do selo; bolhas foscas; rótulos que somem ao se encostar; nome sem repetir ao passar o mouse. Item "esconder palavras-chave na visão geral" não foi feito, por decisão do maintainer | DECIDIDO | este registro |

## 17/11/2026

| # | Decisão | Tipo | Onde está detalhada |
|---|---|---|---|
| 97 | **Cartões do início no formato "principal e secundários".** "Explorar os marcos" em destaque na largura toda (azul-marinho no claro, ocre no escuro); "Como a curadoria funciona" e "Use com sua IA" menores, lado a lado. Ícones Lucide no lugar das etiquetas numeradas; no celular as descrições somem. Cópia antes em `_output/design-systems/antes-cartoes-c-2026-11-17/` | DECIDIDO | este registro |
| 96 | **Botão das páginas do site vira só ícone (três pontos) no mapa**, no mesmo formato do botão sol/lua, para não se confundir com o Sumário quando uma página está aberta. Cópia antes em `_output/design-systems/antes-menu-icone-2026-11-17/` | DECIDIDO | este registro |
| 95 | **Estrutura: árvore de pastas colorida, como num editor de código.** Pastas na cor de destaque; arquivos .md em verde-azulado, dados (.json, .csv) em azul, código em roxo, imagens e PDF em vermelho. Cópia antes em `_output/design-systems/antes-estrutura-cores-2026-11-17/` | DECIDIDO | este registro |
| 94 | **Painéis e leitor um tom mais escuros que o fundo, nos dois modos.** Claro: cartões, painéis e leitor em #DFD3BE (leitor antes #EFE7D8). Escuro: cartões, painéis e leitor em vinho fundo #230E1C (antes #4A2640; leitor antes #3B1B31). Cópia antes em `_output/design-systems/antes-paineis-escuro-2026-11-17/` | MUDOU | este registro |
| 93 | **Fonte JetBrains Mono nas etiquetas** (datas, filtros, busca), no lugar da Geist Mono. Livre (OFL 1.1), embutida em `site/assets/fontes.css`; licença em `site/vendor/licencas/fonte-jetbrains-mono.txt`. Cópia do site antes da troca em `_output/design-systems/antes-jetbrains-mono-2026-11-17/` | MUDOU | este registro |
| 92 | **Fonte Rubik nos títulos e no texto do site** (antes: Schibsted Grotesk nos títulos e Geist no texto). Geist Mono continua nas etiquetas. Rubik é livre (OFL 1.1), embutida em `site/assets/fontes.css`; licença em `site/vendor/licencas/fonte-rubik.txt`. Cópia do site antes da troca em `_output/design-systems/antes-rubik-2026-11-17/` | MUDOU | este registro |
| 91 | **Visual do design system CEMEF testado e recusado.** O site continua com o visual atual (creme e vinho). O teste fica só como referência em `_output/design-systems/v7-cemef/` | DECIDIDO | `_output/design-systems/v7-cemef/README.md` |

## 14/11/2026

| # | Decisão | Tipo | Onde está detalhada |
|---|---|---|---|
| 90 | **Vocabulário de palavras-chave (`temas`): ADIADO.** Hoje cada ficha escreve as tags à mão, sem lista fechada nem regra para tags parecidas (ex.: `formacao-docente` e `formacao-de-professores`); em 14/11/2026 havia 22 tags para 16 marcos, 12 delas com um uso só. Proposta para depois: arquivo público `docs/palavras-chave.yaml` com tag canônica, rótulo e apelidos; o `site.py` troca apelido por canônica e o `indice.py` avisa tag nova ou apelido em `docs/log-pendencias.md`; tag nova passa pelo maintainer. Até lá, não criar tag nova sem avisar o maintainer | ADIADO | handoff.md |
| 89 | **Palavras-chave da lista do Acervo mais discretas:** Geist em peso normal, 14 px e cor apagada (antes Schibsted 600 na cor do texto); contraste 7,1:1 no escuro e 4,8:1 no claro | DECIDIDO | handoff.md |
| 88 | **Coluna da direita do Acervo alinhada pelas bolinhas:** a bolinha do selo, a da esfera e a da natureza ficam na mesma vertical e os três textos na mesma coluna | DECIDIDO | handoff.md |
| 87 | **Natureza com bolinha neutra de 4 px** ("Vinculante", "Orientador", "Não vigente"), na cor do ponto do filtro Natureza | DECIDIDO | handoff.md |
| 86 | **Lista do Acervo sem o emissor:** a coluna da direita mostra selo, esfera e natureza; o emissor continua na ficha (campo Órgão), na janela de informação, no mapa e na busca. Motivo: em 8 dos 16 marcos o título já cita o emissor e a esfera e o tipo bastam nos outros | DECIDIDO | handoff.md |
| 85 | **Geist e Geist Mono de volta** no texto e nas etiquetas (a IBM Plex Sans Condensed, mais estreita, lia pior em 14 px); os títulos continuam em Schibsted Grotesk. Substitui a decisão 84 | MUDOU | handoff.md |
| 84 | **Texto e etiquetas em IBM Plex:** IBM Plex Sans Condensed no texto e IBM Plex Mono nas etiquetas, filtros, busca e nomes de arquivo (no lugar de Geist e Geist Mono); Geist fica embutida só como reserva de `→` e `↗`, e o espaçamento negativo do texto sai. Testada e descartada a Atkinson Hyperlegible Next e Mono | MUDOU | handoff.md |
| 83 | **Títulos em Schibsted Grotesk** (no lugar de Bricolage Grotesque); recorte latino em WOFF2 embutido em `fontes.css`, licenças OFL em `vendor/licencas/`. Testadas e recusadas Orbitron e Rajdhani | MUDOU | handoff.md |
| 82 | **Federal e Rascunho trocam de cor:** a esfera Federal passa ao vermelho que era do Rascunho (claro `#D64545`, escuro `#F0647A`) e o selo Rascunho ao magenta que era da Federal (claro `#A82577`, escuro `#F07AD0`) | DECIDIDO | handoff.md |
| 81 | **Cores das esferas sem repetir as dos selos:** Estadual em azul-petróleo (claro `#056F88`, escuro `#3CC8D8`) e Municipal em violeta (claro `#6D3FD0`, escuro `#B48CFF`); Internacional não muda; o mapa e a legenda seguem os mesmos tokens | MUDOU | handoff.md |
| 80 | **Bolinha da esfera na lista do Acervo** não é mais espremida quando o nome quebra em duas linhas (`flex:none`, alinhada à primeira linha) | DECIDIDO | handoff.md |
| 79 | **Acabamento do topo e do Acervo:** busca e menu de ordenar com raio de 10 px (as pílulas de filtro continuam arredondadas, para se diferenciarem); seta própria no menu de ordenar; ícone sol/lua centrado; marca do topo com 38 px, igual às outras caixas; tags do quadro da ficha com 5 a 6 px entre si | DECIDIDO | handoff.md |
| 78 | **Celular:** nas páginas Acervo, Estrutura e 404, os links do topo viram menu suspenso até 1100 px (mesmo corte e mesmo componente da home); busca com texto curto e filtros recolhidos atrás do botão "Filtros (n)" até 640 px | DECIDIDO | handoff.md |
| 77 | **Foco do teclado:** o leitor fechado deixa de receber o Tab (some só depois da animação de fechar); o campo de busca ganha anel de 2 px | DECIDIDO | handoff.md |
| 76 | **Busca sem resultado** diz se a causa é a palavra ou a combinação de filtros, sugere as seis palavras-chave mais usadas e tem "limpar tudo" | DECIDIDO | handoff.md |
| 75 | **Hierarquia de títulos:** Acervo e Estrutura ganham um H2 só para leitor de tela, sem mudar o visual (H1 > H2 > H3) | DECIDIDO | handoff.md |
| 74 | **Alvos de toque de 44 px só em tela de toque** (`pointer:coarse`); com mouse, nada muda | DECIDIDO | handoff.md |
| 73 | **Contraste do modo claro** (o escuro não muda): cinzas e links mais escuros, texto dos selos escuro e chamadas acima dos títulos em tijolo em vez de coral. Substitui, só nas chamadas, a regra de coral vivo de 07/11/2026 (decisão aprovada ao levar ao site) | MUDOU | handoff.md |
| 72 | **Auditoria de UX** com a lista da skill UI UX Pro Max; relatório em `_output/auditoria-ux.md`; correções feitas numa cópia e levadas ao site juntas, só no fim | DECIDIDO | handoff.md |
| 71 | **Direções "moderna" (v7) e "acadêmica" (v8) recusadas**: só trocavam cores, raio e fonte, sem melhoria real; o visual continua o v6 creme e vinho | DECIDIDO | handoff.md |

## 13/11/2026

| # | Decisão | Tipo | Onde está detalhada |
|---|---|---|---|
| 70 | **Botão "palavra-chave" do Acervo no estilo dos filtros**: mesma altura (28 px), letra e borda dos filtros ao lado, com seta própria (Lucide) no lugar da seta do sistema | DECIDIDO | handoff.md |
| 69 | **Título da janela de informação do mapa em 24 px** (era 36 px; títulos longos ocupavam metade da janela) | DECIDIDO | handoff.md |
| 68 | **Linha de cima da janela de informação** ("MARCO · INTERNACIONAL · emissor"): quando não cabe, quebra em duas linhas, com a segunda alinhada à primeira palavra. Testado e recusado o corte com "…" | DECIDIDO | handoff.md |
| 67 | **Ícones: Lucide (licença ISC)** de volta, no lugar do Phosphor (substitui a decisão 59), depois de um teste lado a lado com o site atual | MUDOU | AGENTS.md; handoff.md |
| 66 | **Mudanças de design uma por vez**: cada item é feito numa cópia de teste, mostrado e aprovado ou recusado pelo maintainer antes do próximo | DECIDIDO | handoff.md |
| 65 | **Recusada** a transição que levantava os itens da legenda do mapa ao passar o mouse (avatar group hover) | DECIDIDO | handoff.md |
| 64 | **Onze transições da biblioteca transitions.dev (MIT)** no site, em `site/assets/transicoes.css`: menu "Menu" e lista da busca crescendo do botão; pastas da Estrutura e seções do Sumário abrindo para baixo; troca suave do ícone sol/lua; contador do Acervo trocando o número; desfoque leve na entrada dos painéis; dica própria nos botões do mapa (sem dica no "×" do leitor); setas que andam ao passar o mouse; brilho no texto "desenhando o mapa…"; entrada dos textos da home em sequência, uma vez. O mapa e a animação dele não mudam. Todas respeitam "reduzir movimento" | DECIDIDO | AGENTS.md; handoff.md |
| 63 | **Recusados** os painéis de vidro com neon e a melhoria de design guiada pela skill tasteskill; o visual continua o v6 creme e vinho | DECIDIDO | handoff.md |

## 07/11/2026

| # | Decisão | Tipo | Onde está detalhada |
|---|---|---|---|
| 62 | **Nome de arquivo e de pasta no texto vai entre crases** nos textos-fonte (páginas do site, `docs/` e descrições da Estrutura), para sair em fonte mono; um script que fazia isso na página foi testado e removido por ser complexo demais | DECIDIDO | AGENTS.md |
| 61 | **Visual v6 (creme e vinho, revisado)** salvo em `_output/design-systems/v6-creme-vinho/`; substitui a v5 como visual atual | DECIDIDO | AGENTS.md; handoff.md |
| 60 | **Fontes: Bricolage Grotesque (títulos), Geist (texto) e Geist Mono (etiquetas)**, no lugar de Inter e da fonte de código do sistema. Testada e recusada a variante com Manrope nos títulos | MUDOU | AGENTS.md |
| 59 | **Ícones: Phosphor (peso regular, MIT)** no lugar do Lucide. Solar testado e recusado (sem placa de caminho para a marca; exige citar a autoria) | MUDOU | AGENTS.md |
| 58 | **Tamanhos de letra só nos degraus 12, 14, 16, 18, 20, 24, 30 e 36 px** (mínimo de 12 px); 16 valores fora da escala foram consolidados | DECIDIDO | AGENTS.md |
| 57 | **Auditoria de design com a skill `redesign-existing-projects`**: aplicados só os itens compatíveis com o visual (acessibilidade, estados, 404, entrada ao rolar). Ficam como decisões do maintainer: fontes e ícones próprios, gradientes de fundo, fundo vinho, botão sol/lua, borda lateral dos cartões, títulos em peso 800, etiquetas em maiúsculas | DECIDIDO | critica-design.md |
| 56 | **Crítica de design registrada em `critica-design.md`** (raiz), com decisões e o que falta: cartões da home na cor de destaque, placar com parciais e conexões, fundo pontilhado em Acervo e Estrutura | DECIDIDO | critica-design.md |
| 55 | **Aprovação local antes de publicar**: nada vai para o GitHub sem o maintainer aprovar o site no próprio computador; o site abre com dois cliques em `site/index.html`, sem internet | DECIDIDO | AGENTS.md; estrutura.md |
| 54 | **Licença do conteúdo: CC BY-NC 4.0** (reuso citando o acervo, sem uso comercial). O código do site continua MIT, herdado do modelo | DECIDIDO | README.md |
| 53 | Site com **modo escuro**, ligado por botão; abre no modo claro | DECIDIDO | plano do site (interno) |
| 52 | No mapa, a **cor da bolha é a esfera** do documento (internacional, federal, estadual, municipal); o selo aparece na ficha e na lista | DECIDIDO | plano do site (interno) |
| 51 | **Modelo do site: Second Brain OS** (licença MIT), com mapa 3D, leitor lateral, Acervo e Estrutura; visual próprio, só inspirado num guia de estilo de referência (papel creme, títulos serifados, um destaque amarelo-limão) | DECIDIDO | plano do site (interno) |
| 50 | **Nome do site: "Marcos da IA na Educação"** | DECIDIDO | README.md |
| 49 | **Pasta do site: `site/`** (pública). Publicação no GitHub Pages pelo GitHub Actions, porque o modo simples só aceita a raiz ou `docs/`, que já é a documentação. Substitui o plano de 05/11 de pôr o site na raiz. A pasta é criada quando o site começar | DECIDIDO | estrutura.md |
| 48 | **Estrutura V1 concluída.** Mudanças futuras seguem o roteiro "Se a estrutura mudar" do AGENTS.md | DECIDIDO | AGENTS.md |
| 47 | **`docs/` é a documentação pública do repositório.** Regras reunidas em `estrutura.md`, `curadoria.md`, `pipeline.md` e `como-contribuir.md`; `candidatos.md` (rascunho de trabalho) vai para `_output/` e dá lugar ao `log-triagem.md` público; README fica curto e o AGENTS.md aponta para `docs/` | DECIDIDO | este arquivo |
| 46 | Dados do site passam a ser `data/corpus.json` e `data/corpus.csv` (antes `marcos.json`/`marcos.csv`); dentro deles, cada item continua sendo um "marco" | MUDOU | este arquivo |
| 45 | **Nomes de arquivo em minúsculas, sem acento, com hífen** (ex.: `docs/log-decisoes.md`). Exceção: arquivos-padrão da raiz (`README.md`, `AGENTS.md`, `CLAUDE.md`) | DECIDIDO | este arquivo |
| 44 | Pasta `dados/` passa a se chamar **`data/`** (script ajustado) | MUDOU | este arquivo |
| 43 | Marcos fora do recorte passam a ser **públicos**, em `corpus/fora-do-recorte/` (antes em `_refs/`), para registrar o que saiu e por quê. O script não os lê: não entram no índice nem no site | MUDOU | decisão 12 |
| 42 | **Sem nome de pessoas em documento público.** Onde havia o nome do maintainer nas decisões, fica "maintainer" (README, AGENTS, handoff, docs/, corpus/) | DECIDIDO | este arquivo |
| 41 | `_temp/` passa a se chamar **`_output/`** (continua fora do GitHub) | MUDOU | este arquivo |
| 40 | `docs/diagramas/` e `docs/exemplos/` movidas pelo maintainer para `_temp/` (não publicadas); `docs/` fica só com os .md | MUDOU | este arquivo |
| 39 | Material de bastidor sai de `docs/` e vai para `_temp/` (não publicado): `plano-site.md`, `ordem-digramas.md`, `00-capa.png.pdf` e o link .webloc do Módulo 5 | MUDOU | este arquivo |
| 38 | **Pasta com `_` na frente não sobe para o GitHub.** Hoje: `_refs/` (era `referencias/`, depois `refs/`) e `_temp/` (era `temp/`). O `.gitignore` exclui toda pasta que começa com `_` | DECIDIDO | .gitignore |
| 37 | Pasta das fichas `marcos/` passa a se chamar **`corpus/`** (mais acadêmico); só o nome da pasta muda, nomes de arquivo não | MUDOU | este arquivo |
| 36 | `handoff.md` do acervo fica na **raiz** de `marcos-ia-educacao/`, junto do `AGENTS.md`; a cópia em `docs/` foi apagada | MUDOU | AGENTS.md |

## 05/11/2026

| # | Decisão | Tipo | Onde está detalhada |
|---|---|---|---|
| 35 | Rótulo "Número e data" na tabela da ficha passa a se chamar **"ID"** (conteúdo igual: número e data do documento) | MUDOU | modelo-ficha.md |
| 34 | Legenda "Capa" embaixo da imagem da capa: fica para o site (no Markdown do GitHub a legenda não acompanha a imagem alinhada à direita) | DECIDIDO | este arquivo |
| 33 | Palavras-chave em formato **#tag** (ex.: #etica #governanca) e rótulo "Fonte oficial" vira **"Link"** | MUDOU | modelo-ficha.md |
| 32 | Na ficha e no site, o rótulo "Temas" passa a se chamar **"Palavras-chave"** (o campo interno continua `temas`) | MUDOU | modelo-ficha.md |
| 31 | Pré-triagem das pastas locais concluída: recomendações aprovadas em bloco; resultado por documento em log-triagem.md (12 aceitos para virar ficha) | DECIDIDO | log-triagem.md |
| 30 | Criar este registro de decisões, para que ninguém volte a sugerir algo já decidido sem saber o motivo, e para permitir rever decisões. Toda pré-triagem consulta este arquivo e log-triagem.md antes | DECIDIDO | este arquivo; AGENTS.md |
| 29 | **Academia e pesquisa fazem parte do escopo**: normas e orientações sobre IA na pesquisa e na publicação científica entram (ex.: CNPq, ANPAD, guias de universidades) | DECIDIDO | AGENTS.md |
| 28 | **Abrangência internacional**: só organismos internacionais e blocos (UNESCO, OCDE, União Europeia etc.); governos de outros países ficam fora | DECIDIDO | AGENTS.md |
| 27 | Exceções à regra "só documentos oficiais", aceitas caso a caso: Andifes (associação de reitores, documento feito a pedido do MEC) e ANPAD (associação científica) | DECIDIDO | log-triagem.md |
| 26 | Página "Leituras de apoio" para bons documentos que não entram como marco (ensaios, relatórios, guias de autores) | Sugestão em aberto | log-triagem.md |
| 25 | Glossário de IA da Comissão Europeia (JRC, 2022) como fonte do Glossário do site, reescrito em linguagem simples e citado | DECIDIDO | plano do site (interno) |
| 24 | Pré-triagem por IA dentro da fase de captura: a IA analisa e recomenda; a triagem (decisão) é do maintainer | DECIDIDO | pipeline.md |
| 23 | Ideias para depois: documento oficial do projeto e artigo acadêmico de divulgação científica | Para depois | handoff.md |
| 22 | Selo "Em revisão" (laranja) quando a vigilância detecta mudança no documento oficial; não "rever" nem "atualizado" | DECIDIDO | modelo-ficha.md |
| 21 | **Sem nome de pessoas nas fichas**: só a data da conferência (`conferido_em`). Os nomes do GT ficam só na página "Quem faz" | DECIDIDO | modelo-ficha.md |
| 20 | Campo `correlato` (sim/não) na ficha: o site mostra a etiqueta "Documento correlato" | DECIDIDO | modelo-ficha.md |
| 19 | Quantos professores conferem cada ficha para o selo verde (um ou dois) | ADIADO | pipeline.md |
| 18 | **Transparência**: fichas em rascunho aparecem no site com o selo da fase em que estão; o público acompanha o pipeline | DECIDIDO | pipeline.md |
| 17 | Triagem dos candidatos fica com o maintainer do projeto | DECIDIDO | pipeline.md |
| 16 | Radar de novidades roda **uma vez por mês** (antes: diário), junto com a vigilância | MUDOU | pipeline.md |
| 15 | **Pipeline em cinco fases**: captura, ingestão, conferência, publicação, vigilância | DECIDIDO | pipeline.md |
| 14 | Nome "documentos correlatos" (antes: "assuntos vizinhos") | MUDOU | AGENTS.md |
| 13 | Documentos correlatos (dados pessoais, educação digital, computação) permanecem no acervo mesmo sem tratar de IA: LGPD, PNED e Computação na BNCC | DECIDIDO | AGENTS.md |
| 12 | Marcos que não tratam de IA saem do acervo e são **guardados, não apagados**, em `referencias/fora-do-recorte/` (hoje `corpus/fora-do-recorte/`, ver 43) (decretos do GET, Res. SME 415/2023, Res. CNE/CP 1/2020) | DECIDIDO | handoff.md |
| 11 | **Recorte**: todo marco precisa tratar de IA; por isso a ficha não tem campo "relação com IA" | DECIDIDO | AGENTS.md |
| 10 | Modelo de ficha: citação ABNT, capa do documento, nível de ensino, formato visual (callouts e mapas Mermaid), trechos literais, status com opções fixas, link oficial obrigatório | DECIDIDO | modelo-ficha.md |
| 9 | Campos de curadoria (quem fichou, quem conferiu) | ADIADO, depois resolvido em parte pela decisão 21 | modelo-ficha.md |
| 8 | Só atualizar as fichas depois de fechar o modelo | DECIDIDO | handoff.md |
| 7 | Seção "Uso na ementa" vira "O que significa na prática" (em resumo, na sala de aula, na gestão) | DECIDIDO | AGENTS.md |
| 6 | **Público**: professores, gestores e todos que tomam decisões didáticas ou técnico-administrativas | DECIDIDO | curadoria.md |
| 5 | **Só documentos oficiais**; portaria, nota técnica, IN/circular e estratégia nacional entram | DECIDIDO | mapa-tipos.md |
| 4 | Vigilância dos marcos **uma vez por mês** | DECIDIDO | pipeline.md |
| 3 | **Curadoria humana** por professores é o valor do acervo; robôs só encontram e avisam | DECIDIDO | AGENTS.md |
| 2 | **Projeto coletivo** do GT; o nome de todos os professores entra no site | DECIDIDO | curadoria.md |
| 1 | **O acervo é o trabalho final do GT**; a ementa vira sugestão complementar | MUDOU | AGENTS.md |

Também em 05/11/2026: pasta `marcos-ia-educacao/` com AGENTS.md e handoff.md próprios (ambos públicos); raiz só com o essencial e documentos de trabalho em `docs/`; fichas dentro de `marcos/`; capas em `assets/covers/`; site com glossário e linguagem didática; uso do acervo com assistentes de IA (arquivo único, llms.txt).

## 23/10/2026

- Acervo de marcos regulatórios de IA na educação, no formato de um Markdown por documento com cabeçalho YAML. Abrangência: Brasil (federal, RJ estadual e municipal) e internacional.
- Publicar como site aberto no GitHub Pages, no estilo do monitor-editais.
- Datas de entrega do GT são aproximadas.
