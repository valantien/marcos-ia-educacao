# Pipeline de curadoria

O caminho de um documento, da descoberta até o site, em cinco fases. Princípio: **o robô encontra e avisa; quem decide o que entra e quem confere na fonte são professores.**

```
1. Captura  →  2. Ingestão  →  3. Conferência  →  4. Publicação  →  5. Vigilância
                                     ↑                                    │
                                     └──────── documento mudou ───────────┘
```

## 1. Captura

- **Duas portas de entrada:** o radar de novidades (busca automática, uma vez por mês) e as sugestões de professores e do público.
- Tudo vira **candidato**. Um assistente de IA faz a **pré-triagem**: responde às perguntas abaixo e escreve uma recomendação. Ele não decide.
- A **triagem** é do maintainer do projeto, em nome do GT: cada candidato fica **aceito**, **recusado** (com motivo) ou **em dúvida** (vai para o GT).
- Perguntas da triagem: é documento oficial? Trata de IA ou é documento correlato? Já está no acervo?
- O resultado fica registrado em [`log-triagem.md`](../../docs/log-triagem.md).

## 2. Ingestão

- O documento aceito vira ficha, pelo [`modelo-ficha.md`](../../docs/modelo-ficha.md).
- Buscar o original na fonte oficial; a capa sai da primeira página.
- Um assistente de IA pode fazer o rascunho seguindo o `AGENTS.md`.
- O script confere o formato (campos obrigatórios, `id`, relacionados).
- A ficha nasce com o selo **Rascunho** (vermelho).

## 3. Conferência

Um professor do GT confere a ficha com o documento oficial lado a lado.

- **Fatos que precisam bater exatamente:** número, data, órgão, ementa, trechos literais, link oficial, situação atual e referência ABNT.
- **Leitura que precisa fazer sentido:** resumo, "O que significa na prática" e mapa do documento.
- **Resultado:** selo **Conferido** (verde), registrando só a data em `conferido_em`, ou **Parcial** (amarelo), com o que falta anotado.
- Quem confere não precisa mexer no GitHub: aponta o erro, e o maintainer (ou um assistente de IA) corrige.
- Em aberto: se o selo verde exige um ou dois professores.

## 4. Publicação

- Automática e transparente: toda ficha vai para o site desde o rascunho, com o selo da fase em que está.
- Junto com o site saem os dados (`site/data/corpus.json`, `site/data/corpus.csv`) e a versão para assistentes de IA.

## 5. Vigilância

- Uma vez por mês, confere se os links oficiais funcionam e se algum marco mudou (revogado, alterado, homologado).
- Se mudou, a ficha recebe o selo **Em revisão** (laranja; "O documento oficial mudou. Esta ficha está sendo conferida de novo.") e volta para a fase 3.

## Situação da automação

Previstas, ainda não implementadas: publicação automática do site a cada mudança no repositório, radar mensal de novidades e vigilância mensal dos marcos. O radar e a vigilância começam depois que as fontes atuais estiverem conferidas.
