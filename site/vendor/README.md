# Bibliotecas do grafo 3D

`graph-libs.js` reúne **three.js 0.186.1** e **3d-force-graph 1.80.1** num único arquivo, sem módulos, para o site abrir com dois cliques, sem internet e sem servidor. As licenças estão em `licencas/`.

## Por que um arquivo só

As bibliotecas vêm em formato de "módulo" (`.module.js`). Quando a página é aberta com dois cliques, sem servidor, o navegador bloqueia módulos. Juntar tudo num arquivo comum resolve isso. O site que serviu de base (Second Brain OS) baixava as bibliotecas da internet a cada visita; este site funciona sem internet.

Ganhos extras: o navegador baixa 1 arquivo em vez de 9, e fica de fora o que o site não usa.

## Por que sem WebGPU

O site desenha o 3D com WebGL, a tecnologia comum dos navegadores. Uma peça interna do 3d-force-graph tem a opção de usar WebGPU, mais nova e ainda pouco suportada; por isso o pacote do three.js traz o `three.webgpu.js`. Nem este site nem o original usam essa opção. A receita troca essa parte por um arquivo vazio (`scripts/graph-libs/webgpu-vazio.js`), e o pacote fica cerca de 600 KB menor.

## Como atualizar

Precisa do Node.js. Numa pasta de trabalho fora do repositório:

```
npm init -y
npm install three@<versão> 3d-force-graph@<versão> esbuild
npx esbuild <repositório>/scripts/graph-libs/entrada.js --bundle --format=iife --minify --legal-comments=eof --alias:three/webgpu=<repositório>/scripts/graph-libs/webgpu-vazio.js --outfile=graph-libs.js
```

Depois:

1. Guardar o `graph-libs.js` atual em `_output/` (cópia de antes).
2. Copiar o novo para `site/vendor/`.
3. Atualizar as versões neste arquivo e as licenças em `licencas/`, se mudarem.
4. Abrir `site/index.html` e conferir o mapa (formas, linhas, cliques).

A receita foi reconstruída em 24/11/2026 e testada com as versões atuais: gera um arquivo equivalente ao em uso (cerca de 1 MB). O comando original de 07/11/2026 não tinha sido anotado.

As pastas antigas `three/` e `3d-force-graph/` saíram do site em 24/11/2026 (guardadas fora do repositório).
