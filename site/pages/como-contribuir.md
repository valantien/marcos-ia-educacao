# Como contribuir

Guia para os professores do GT e para quem quiser ajudar. Não é preciso saber programar para participar: sugerir e conferir podem ser feitos só apontando o documento ou o erro ao maintainer do projeto.

Antes de começar, leia as [regras de curadoria](curadoria.md).

## Como funciona um projeto aberto

Este acervo segue o jeito de trabalhar dos projetos de código aberto (*open source*). Você não precisa ser programador para participar. Basta entender quatro ideias:

- **Tudo fica à vista.** Qualquer pessoa pode ler as fichas, as regras e o histórico de decisões.
- **Cada mudança fica registrada.** O repositório guarda quem mudou o quê, quando e por quê, como o histórico de versões de um documento compartilhado.
- **Qualquer pessoa pode sugerir.** Uma sugestão não muda nada sozinha: ela é revisada antes de entrar.
- **Quem contribui recebe crédito.** O nome de quem participa fica registrado, e o conteúdo pode ser reusado citando a fonte.

### As palavras que você vai encontrar no GitHub

| Termo | O que é | Na escola, seria como... |
|---|---|---|
| **Repositório** | A pasta pública do projeto, com todos os arquivos e o histórico. | o arquivo da secretaria, aberto para consulta |
| **Issue** | Um recado aberto: uma dúvida, um erro ou uma sugestão. | deixar um bilhete no mural da sala dos professores |
| **Commit** | Uma mudança salva, com uma frase dizendo o que mudou. | uma anotação datada no diário de classe |
| **Fork** | Uma cópia sua do repositório, para trabalhar sem mexer no original. | fotocopiar a apostila para fazer anotações nela |
| **Pull request** | Um pedido para levar as suas mudanças ao original. | entregar uma revisão de texto para o editor aprovar |
| **Revisão** | A leitura do pedido, com comentários e ajustes. | a correção do coordenador antes de publicar |
| **Merge** | A aceitação: a mudança entra no original. | a versão revisada indo para a gráfica |
| **Maintainer** | Quem cuida do repositório e aceita as mudanças. | o editor ou a coordenação |

**Você não precisa usar o GitHub.** Se preferir, envie a sugestão ou o erro ao maintainer, e ele registra por você.

## Sugerir um documento

1. Confira em [`log-indice.md`](../../docs/log-indice.md) e [`log-triagem.md`](../../docs/log-triagem.md) se ele já está no acervo ou já foi avaliado.
2. Veja se ele passa nas cinco perguntas de [O que entra no acervo](curadoria.md#o-que-entra-no-acervo).
3. Envie ao maintainer o título, o órgão, o ano e o link oficial. A sugestão entra na triagem (ver [As cinco fases](curadoria.md#as-cinco-fases)).

## Conferir uma ficha

1. Abra a ficha (em `corpus/`) e o documento oficial lado a lado.
2. Siga a lista de [Verificação e selos](curadoria.md#verificacao-e-selos).
3. Envie ao maintainer o resultado: tudo certo (selo verde) ou o que falta (selo amarelo).

## Fichar um documento (para quem edita o repositório)

1. Crie a pasta certa em `corpus/`, na ordem jurisdição → emissor → tipo → ano (ver [Estrutura de pastas](estrutura.md)).
2. Copie [`modelo-ficha.md`](../../docs/modelo-ficha.md) para essa pasta e renomeie: `AAAA-tipo-numero-assunto-curto.md`, em minúsculas, sem acento, com hífen.
3. Preencha o cabeçalho e as seções. Use a fonte oficial; marque `[NÃO VERIFICADO]` o que não foi conferido.
4. Salve a capa (primeira página do documento) em `site/assets/covers/<id>.png`.
5. Na raiz do repositório, rode:

   ```
   python3 scripts/indice.py
   ```

   O script precisa do PyYAML. Ele confere os campos obrigatórios, o `id` e os relacionados, e gera de novo `docs/log-indice.md`, `docs/log-pendencias.md` e `site/data/`. Se terminar com erro, corrija antes de publicar.
6. Mudanças grandes entram por pull request, para revisão do maintainer.
