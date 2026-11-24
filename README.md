# Marcos regulatórios de IA na educação

Acervo curado de normas, pareceres, orientações e referenciais oficiais sobre **inteligência artificial na educação**: Brasil (federal, estadual e municipal) e organismos internacionais.

**Um projeto coletivo dos professores do GT Formação de Professores em IA (TEIA 3, CBAE/UFRJ).** A curadoria é humana: cada marco é selecionado, lido, resumido e conferido por professores antes de receber o selo de conferido. Ferramentas automáticas só ajudam a encontrar documentos e a avisar mudanças. É nisso que está o valor deste acervo.

Cada documento é uma ficha em Markdown, com cabeçalho de dados, resumo, trechos literais, o que significa na prática (na sala de aula e na gestão), referência ABNT e link para a fonte oficial. O formato se inspira no repositório [ctresb/leis](https://github.com/ctresb/leis).

> [!WARNING]
> Acervo em construção. Fichas que ainda não foram conferidas na fonte oficial trazem um aviso e o selo correspondente.

## Por onde começar

- **[Índice](docs/log-indice.md):** todos os marcos, por esfera e por tema.
- **[Pendências](docs/log-pendencias.md):** o que ainda falta conferir na fonte.
- **[Triagem](docs/log-triagem.md):** documentos avaliados, aceitos ou recusados, e por quê.

## Documentação

| Documento | O que explica |
|---|---|
| [estrutura.md](site/pages/estrutura.md) | pastas, caminhos e regras de nome |
| [curadoria.md](site/pages/curadoria.md) | o que entra, o que fica fora, verificação e selos |
| [pipeline.md](site/pages/pipeline.md) | as cinco fases: captura, ingestão, conferência, publicação, vigilância |
| [como-contribuir.md](site/pages/como-contribuir.md) | como sugerir, conferir ou fichar um documento |
| [modelo-ficha.md](docs/modelo-ficha.md) | o modelo de cada ficha |
| [mapa-tipos.md](docs/mapa-tipos.md) | os tipos de documento aceitos |
| [log-decisoes.md](docs/log-decisoes.md) | o registro numerado de decisões do projeto |

## Organização

```
corpus/   fichas dos marcos (br/, int/ e fora-do-recorte/)
docs/     documentação
scripts/  indice.py (índice, pendências e dados) e site.py (monta o site)
site/     o site público (em construção; abra site/index.html para ver)
```

## Licença

O conteúdo escrito pelo GT (fichas, textos do site, glossário) está sob a licença [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/deed.pt-br): pode ser reusado citando o acervo, sem uso comercial. Os documentos oficiais em si não são do GT. O código do site é de Krysamon Cavalcante, sob a licença MIT, com partes do mapa vindas do [Second Brain OS](https://github.com/undefined-ui/second-brain-os) (ver [LICENSE.md](LICENSE.md)).
