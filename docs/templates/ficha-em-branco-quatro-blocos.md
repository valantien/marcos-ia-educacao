# [Título oficial do documento] ([órgão], [ano])

> FICHA EM BRANCO (modelo em discussão, quatro blocos). Cada campo diz se é obrigatório e como preencher. Apague as instruções entre colchetes ao preencher.

> **Selo: [Rascunho (vermelho) | Parcial (amarelo) | Conferido (verde) | Em revisão (roxo)].** [O que já foi conferido e onde. Obrigatório. Sai da ficha quando o selo for verde.]

[Capa: imagem da primeira página do documento, tirada da fonte oficial. Entra na criação da ficha.]

---

## 1. O que é este documento?

**Obriga ou orienta?** [Obriga | Orienta | Ainda não vale. Uma frase simples. Obrigatório.]
**Está valendo?** [Sim | Alterado | Revogado | Aguardando homologação | Em tramitação, com a data. Obrigatório.]
**Para quem?** [Etapas de ensino e públicos a que se aplica. Obrigatório.]

| | |
|---|---|
| Tipo | [Lei, decreto, resolução, parecer, portaria, referencial, guia... Obrigatório.] |
| Órgão | [Nome completo do órgão que publicou. Obrigatório.] |
| Número e data | [Número oficial e data de publicação; "sem número" quando não houver. Obrigatório.] |
| Esfera | [Internacional, federal, estadual ou municipal. Obrigatório.] |
| Palavras-chave | [#tag1 #tag2, sem acento, com hífen. Obrigatório.] |
| Documento correlato | [Só quando o documento não trata de IA: "Documento correlato: não trata diretamente de IA, mas é base para o uso de IA no ensino (motivo em uma frase)."] |
| Link | [Link da fonte oficial, público e gratuito. Nunca um arquivo local. Obrigatório.] |

**Ementa oficial:** [Texto literal da ementa, copiado da fonte. Se o documento não tiver ementa, usar o texto de apresentação do próprio documento e dizer isso. Obrigatório.]

---

## 2. O que ele diz?

*Descrição do documento feita pelos curadores. Cada ponto indica a página, o artigo ou o capítulo, para conferência.*

### Pontos principais

[Obrigatório. De três a oito tópicos, cada um com a localização no documento.]

- [Ponto do documento] ([p. X | art. Y | cap. Z]).
- [Ponto do documento] ([localização]).

### Trechos do documento

[Obrigatório. Texto literal dos dispositivos mais importantes, copiado da fonte oficial, sem paráfrase. Documentos brasileiros: trechos literais. Documentos internacionais: trechos curtos, na língua original ou na tradução oficial.]

> **[Art. X | p. Y]:** "[texto exato]"

### Mapa do documento

[Opcional. Só para documentos longos, e só depois do selo verde, porque é interpretação. Logo abaixo, uma frase descrevendo o mapa, para leitores de tela.]

---

## 3. O que significa na prática?

*Leitura dos curadores do GT. É interpretação, não texto oficial, e não pode contradizer o bloco 2.*

**Em resumo:** [Obrigatório. Uma ou duas frases simples sobre o que o documento significa para o ensino.]

**Na sala de aula:** [Quando fizer sentido. Decisões didáticas do professor.]

**Na gestão:** [Quando fizer sentido. Decisões de direção, coordenação e secretarias.]



---

## 4. O que mais preciso saber?

### Marcos relacionados

[Quando houver. Outros documentos do acervo ligados a este, um por linha.]

- [Título curto do marco relacionado (órgão, ano)]

### Observações

[Quando houver. Divergências entre fontes (registradas, sem escolher uma versão), mudanças de situação com data, confusões comuns com outros documentos.]

### Como citar

[Obrigatório. Referência no padrão ABNT (NBR 6023), preenchida só com dados conferidos na fonte.]

---

## Campos técnicos (preenchidos pelo maintainer ou pelo assistente de IA)

Ficam no cabeçalho do arquivo, invisíveis na leitura, e alimentam o site e os dados abertos. Quem confere a ficha não precisa preenchê-los.

| Campo | O que guarda |
|---|---|
| id | Identificador único: ano-tipo-número-assunto |
| esfera, jurisdicao, emissor | De onde vem o documento |
| tipo, orgao, numero, data, ementa | Os mesmos dados do bloco 1 |
| status, situacao, natureza | Se obriga e se está valendo, em opções fixas |
| niveis | Etapas de ensino |
| temas | Palavras-chave |
| correlato | sim ou não |
| relacionados | Ids dos marcos relacionados |
| fonte, fonte_copia | Link oficial e cópia de apoio |
| como_citar, capa | Referência ABNT e imagem da capa |
| verificacao, conferido_em | Selo e data da conferência (sem nome de pessoas) |
| registrado_em, atualizado_em | Datas de criação e da última mudança da ficha |
