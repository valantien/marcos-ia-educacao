---
id: AAAA-tipo-numero-assunto
esfera: federal
jurisdicao: "BR"
emissor: cne
temas: []   # aparece na ficha e no site como "Palavras-chave", em formato #tag (maintainer, 05/11/2026)
correlato: nao   # sim = documento correlato (dados pessoais, educação digital, computação): fica no acervo mesmo sem tratar de IA; o site mostra a etiqueta "Documento correlato"
niveis: []   # educacao-infantil, fundamental-anos-iniciais, fundamental-anos-finais, medio, eja, educacao-profissional, superior, pos-graduacao, todos
relacionados: []
titulo: ""
titulo_pt: ""     # só para documentos estrangeiros: tradução do título
tipo: ""
orgao: ""
numero: ""
data: AAAA-MM-DD
ementa: ""
status: ""        # em-vigor | alterado | revogado | aguardando-homologacao | em-tramitacao | referencia-internacional
situacao: ""      # detalhe em texto, com datas
natureza: ""
fonte: ""         # LINK OFICIAL PÚBLICO (D.O., Planalto, gov.br, UNESDOC…). Nunca caminho local.
fonte_copia: ""   # opcional: cópia de apoio (arquivo local ou espelho)
como_citar: ""   # referência ABNT pronta para copiar (NBR 6023); só preencher com dados conferidos na fonte
capa: ""         # site/assets/covers/<id>.png — 1ª página do documento, capturada da fonte oficial
verificacao: ""   # começa com: nao-conferido | parcial | conferido | em-revisao (selos no site: Rascunho vermelho · Parcial amarelo · Conferido verde · Em revisão laranja; em-revisao = a vigilância mensal detectou mudança no documento oficial; volta para conferência)
conferido_em: ""  # AAAA-MM-DD da conferência na fonte. SEM nome de pessoas na ficha (maintainer, 05/11/2026)
registrado_em: AAAA-MM-DD
atualizado_em: AAAA-MM-DD   # última revisão da ficha (status, situação, texto)
---
# Título

<!-- MODELO EM REVISÃO (05/11/2026). Formato visual: callouts (GitHub e Obsidian) e diagramas Mermaid.
     Callouts: [!WARNING] verificação · [!NOTE] ementa e citação · [!IMPORTANT] em resumo
     · [!TIP] sala de aula e gestão · [!CAUTION] alertas. -->

<!-- caminho relativo da ficha até site/assets/covers/ (ex.: ../../../../../site/assets/covers/<id>.png); o script confere -->
<img src="../../../../../site/assets/covers/AAAA-tipo-numero-assunto.png" alt="Capa do documento: título completo do marco" width="220" align="right">

> [!WARNING]
> **Verificação: Rascunho / Parcial / Conferido / Em revisão.** O que foi conferido e onde. Remover este aviso só quando o selo for verde. Se for Em revisão: "O documento oficial mudou. Esta ficha está sendo conferida de novo."

| | |
|---|---|
| **Tipo** | |
| **Órgão** | |
| **ID** | |
| **Esfera** | |
| **Natureza** | |
| **Situação** | |
| **Nível de ensino** | |
| **Palavras-chave** | #tag1 #tag2 (as mesmas do campo `temas`, sem acento, com hífen) |
| **Correlato** | Só quando `correlato: sim`: "Documento correlato: não trata diretamente de IA, mas é base para o uso de IA na escola (motivo em uma frase)." |
| **Link** | [link](...) |

> [!NOTE]
> **Ementa oficial:** texto da ementa.

## Mapa do documento

<!-- Logo abaixo do diagrama, uma frase em texto descrevendo o mapa (acessibilidade para leitores de tela). Fazer por último, depois da conferência na fonte. É interpretação: revisar na curadoria. -->

```mermaid
mindmap
  root((Nome curto do marco))
    Eixo 1
      Ponto
    Eixo 2
      Ponto
```

## Resumo

- Ponto do documento (fonte).

## Trechos do documento

<!-- Texto LITERAL dos dispositivos mais importantes sobre IA, copiado da fonte oficial, com o número do artigo. Sem paráfrase. -->

> **Art. Xº** texto exato do artigo.

## O que significa na prática

> [!IMPORTANT]
> **Em resumo:** uma ou duas frases simples.

> [!TIP]
> **Na sala de aula:** decisões didáticas (só se fizer sentido).

> [!TIP]
> **Na gestão:** decisões de direção, coordenação e secretarias (só se fizer sentido).

## Como citar

> [!NOTE]
> Referência ABNT (igual ao campo `como_citar`).

## Marcos relacionados

```mermaid
flowchart LR
  A[Este marco] --- B[Marco relacionado]
```

## Nota do GT

Opcional: leitura do GT para a sugestão de ementa.

## Observações

> [!CAUTION]
> Alertas e pendências, quando houver.
