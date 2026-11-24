# Design system do site

Como o site é hoje: cores, letras, ícones, componentes e o mapa 3D. Antes de mudar o visual, leia este arquivo. As decisões que levaram a cada escolha estão em [`log-decisoes.md`](log-decisoes.md).

## Onde fica cada coisa

| Arquivo | O que guarda |
|---|---|
| `site/assets/app.css` | cores (variáveis no começo do arquivo), visual da home e do mapa |
| `site/assets/paginas.css` | visual das páginas Acervo e Estrutura e do leitor |
| `site/assets/fontes.css` | as fontes, embutidas no próprio arquivo |
| `site/assets/transicoes.css` | animações de abrir, fechar e passar o mouse (trechos da biblioteca transitions.dev, MIT, cada um com o número da transição) |
| `site/assets/app.js` | o mapa 3D e as dicas dos números da home |
| `site/assets/logo3d.js` | o logo girando em 3D no título da home |
| `site/assets/diagrams/` | diagramas das páginas, em SVG |

## Cores

O site tem modo claro (padrão) e modo escuro, trocados pelo botão sol/lua. O claro usa camadas de creme; o escuro, camadas de vinho.

**Texto: quatro cores em cada modo.**

| Papel | Claro | Escuro |
|---|---|---|
| Texto principal (`--ink`) | marinho `#1B1F3B` | creme `#FFFDF8` |
| Texto secundário (`--soft`) | cinza `#4A4F68` | rosado `#E6D8DF` |
| Texto discreto (`--faint`) | cinza-taupe `#665A4A` | lilás `#B49FAB` |
| Destaque (`--accent`): links, chamadas, números | coral `#FF6B4A` | ocre `#F0B13B` |

**Fundos.** Claro: fundo `#E8DFCE`, cartões `#DFD3BE`, ativo `#D3C5AC`, bordas `#C9BCA3`. Escuro: fundo `#2A1121`, cartões `#230E1C`, ativo `#61374F`.

**Esferas do mapa** (variáveis `--c-*`):

| Esfera | Claro | Escuro |
|---|---|---|
| Acervo (centro) | `#FF6B4A` | `#F0B13B` |
| Internacional | `#2B59FF` | `#5FA2FF` |
| Federal | `#D64545` | `#F0647A` |
| Estadual | `#056F88` | `#3CC8D8` |
| Municipal | `#6D3FD0` | `#B48CFF` |
| Palavra-chave | `#978A78` | `#9A8492` |

**Selos de verificação:** Rascunho (magenta), Parcial (amarelo; no escuro, palha), Conferido (verde), Em revisão (laranja). Os valores ficam em `--s-*` no `app.css`.

Regra: nunca duas cores no mesmo link.

## Letras

- **Rubik** nos títulos e no texto; **JetBrains Mono** nas etiquetas e nos nomes de arquivo.
- Tamanhos só nestes degraus: 12, 14, 16, 18, 20, 24, 30 e 36 px. Os títulos grandes da home crescem e diminuem com a tela.
- Nome de arquivo ou de pasta no texto vai entre crases, para sair em fonte mono.

## Ícones e logo

- Ícones **Lucide**, traço 1,75 (licença ISC), escritos dentro do HTML e do JavaScript.
- **Nada de símbolo de texto no lugar de ícone** (↗, ▸, ×): sempre o ícone Lucide. Link externo = "arrow-up-right"; abrir e fechar pasta = "chevron-right" girando; rotação do mapa = "orbit"; ir a um nó do mapa = "locate". Botões só com ícone têm moldura (como os do topo) e uma dica ao parar o mouse.
- **Logo:** o icosaedro do centro do mapa, em traço. Aparece no topo das quatro páginas e no ícone da aba. Na home, gira em 3D; sem 3D ou com "reduzir movimento" ligado, fica parado.

## Componentes

- **Menu do topo:** um só, em sanduíche ("Menu ☰"), com todas as páginas em grupos. O HTML do menu é escrito à mão em `index.html`, `acervo.html`, `estrutura.html` e `404.html`: página nova entra nas quatro.
- **Botão do topo:** nome curto "Marcos IA EDU".
- **Botão "Documentos"** (ícone de organograma): abre a lista dos marcos por esfera.
- **Home:** o bloco da esquerda tem a largura do título (`--hero-w`). Os números mostram só o mapa (marcos, emissores, palavras-chave, conexões), cada um com uma dica ao passar o mouse.
- **Legenda do mapa:** números entre parênteses; no celular vira o botão "Legenda"; fundo semitransparente.
- **Ajustes finos** de CSS ficam no fim do `app.css`, cada um com um comentário.

### Quando usar e quando não usar

- **Cartão principal** (coral no claro, ocre no escuro): a ação principal da tela. Só um por tela. Nunca para links secundários.
- **Cartões secundários da home** ("Curadoria", "Use com sua IA"): só no computador. No celular saem, porque já estão no menu.
- **Cores das esferas:** só no mapa, na legenda e nas marcas de esfera. Nunca como cor de botão ou de destaque.
- **Cores dos selos:** só nos selos de verificação. Nunca para outra coisa, para não confundir o leitor.

## Celular (até 760 px)

- **Barra de cima:** só ícones. A busca é estreita e diz só "buscar".
- **Home:** o mapa ocupa o espaço acima do bloco de texto. O bloco fica embaixo, encostado na legenda, sem espaço vazio.
- **Bloco da home:** logos CBAE/UFRJ pequenos, título de 24 px, texto de 14 px e só o botão "Explorar os marcos", do tamanho do texto. Os números e a dica de uso não aparecem.
- **Tamanhos:** os mesmos degraus do computador. Nada fora deles.

## Mapa 3D

- **Centro (o acervo):** icosaedro facetado girando devagar, com aura e brilho que respira.
- **Palavras-chave:** tetraedros pequenos girando.
- **Esferas:** em constelação em volta do centro.
- **Aura:** só nos nós que agrupam (centro, esferas, emissores), nunca nos marcos.
- **Linhas:** retas, com degradê.
- **Movimento:** o mapa abre florescendo do centro; os nós flutuam de leve, dão um pulinho com o mouse e soltam uma onda no clique.

## Já testado e recusado

Não refazer sem o maintainer pedir.

- **Mapa:** paleta nova das esferas, linhas em arco, anéis girando no centro, aura nos marcos, marcos maiores com anel do selo, bolhas foscas, rótulos que somem ao se encostar.
- **Visual geral:** painéis de vidro com neon; versões "v7 moderno" e "v8 acadêmico" (só trocavam as cores).
- **Ícones:** Phosphor e Solar (voltou o Lucide).
- **Animação:** a da legenda do mapa.

## Regras técnicas

- O site abre com dois cliques em `site/index.html`, sem internet: nada de CDN nem de módulos JavaScript. Bibliotecas e fontes ficam dentro de `site/`.
- Diagramas: SVG embutido, um arquivo só para claro e escuro (usa as variáveis de cor do site), formato vertical de 640 de largura, em `site/assets/diagrams/`.
