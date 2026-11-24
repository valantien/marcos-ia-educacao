# Mapa dos tipos de documentos

Retrato dos tipos de documento do acervo (16 marcos em 07/11/2026) e lista dos tipos aceitos. As regras de recorte estão em [curadoria.md](../site/pages/curadoria.md).

## Como ler

Cada documento tem três classificações independentes:

- **Esfera** (de onde vem): internacional, federal, estadual, municipal.
- **Tipo** (que documento é): lei, decreto, resolução, parecer, guia…
- **Natureza** (quanto obriga): vinculante, orientador, não vigente.

A pasta de cada marco (dentro de `corpus/`) segue sempre: esfera → emissor → **tipo** → ano.

## Tipos presentes hoje

| Família | Tipo | Natureza | Pasta | Qtd | Exemplos |
|---|---|---|---|---|---|
| Normas que obrigam | Lei | vinculante | `corpus/br/federal/leis/` | 2 | LGPD (2018); Política Nacional de Educação Digital (2023) |
| Normas que obrigam | Decreto | vinculante | `corpus/br/estadual/rj/governo/decretos/` | 1 | Política de IA Fluminense (2026) |
| Normas que obrigam | Resolução | vinculante | `corpus/br/federal/cne/resolucoes/` | 1 | Computação na BNCC (2022), documento correlato que permanece |
| Normas que obrigam | Parecer | vinculante após homologação | `corpus/br/federal/cne/pareceres/` | 1 | Parecer CNE/CP 15/2026 (diretrizes de IA) |
| Normas que obrigam | Regulamento estrangeiro | vinculante fora do Brasil | `corpus/int/uniao-europeia/regulamentos/` | 1 | AI Act (2024) |
| Orientações oficiais (BR) | Documento orientador | orientador | `corpus/br/federal/mec/orientacoes/` | 1 | IA na Educação Básica, MEC (2026) |
| Orientações oficiais (BR) | Referencial | orientador | `corpus/br/federal/mec/referenciais/` | 1 | Referencial para Desenvolvimento e Uso Responsáveis de IA na Educação, MEC (2026) |
| Orientações oficiais (BR) | Plano de governo | orientador | `corpus/br/federal/mcti/planos/` | 1 | PBIA 2024–2028 |
| Orientações oficiais (BR) | Guia | orientador | `corpus/br/municipal/rj/rio-de-janeiro/prefeitura/guias/` | 1 | Guia de uso ético de IA, Prefeitura do Rio (2026) |
| Referências internacionais | Recomendação | soft law | `corpus/int/unesco/recomendacoes/` | 1 | Ética da IA, UNESCO (2021) |
| Referências internacionais | Guia | orientador | `corpus/int/unesco/guias/` | 1 | IA generativa na educação, UNESCO (2023) |
| Referências internacionais | Referencial (de competências / de letramento) | orientador | `corpus/int/unesco/referenciais/`, `corpus/int/ocde/referenciais/` | 3 | Competências em IA para alunos e para professores, UNESCO (2024); Letramento em IA, OCDE/CE (2025) |
| Em tramitação | Projeto de lei | não vigente | `corpus/br/federal/projetos-de-lei/` | 1 | PL 2.338/2023 (marco legal da IA) |

Total: 16. Fora do recorte (não tratam de IA), guardados em `corpus/fora-do-recorte/`: decretos dos GETs (2022, 2024), Resolução SME 415/2023 e Resolução CNE/CP 1/2020. Documentos correlatos (dados pessoais, educação digital, computação) permanecem: LGPD, PNED e Computação na BNCC (maintainer, 05/11/2026).

## Tipos oficiais aceitos que ainda não temos

DECIDIDO (maintainer, 05/11/2026): entram, sempre dentro do recorte de IA e tecnologia na educação.

| Tipo | O que é | Pasta (exemplo) |
|---|---|---|
| Portaria | Ato que coloca um programa em prática | `corpus/br/federal/mec/portarias/AAAA/` |
| Nota técnica | Interpretação oficial de um órgão | `corpus/br/federal/anpd/notas-tecnicas/AAAA/` |
| Instrução normativa / circular | Orientação de uma secretaria para as escolas | `corpus/br/municipal/rj/rio-de-janeiro/sme/instrucoes-normativas/AAAA/` |
| Estratégia nacional | Plano do governo para um tema | `corpus/br/federal/presidencia/estrategias/AAAA/` (ex.: Escolas Conectadas, em [log-triagem.md](log-triagem.md)) |

Também entra, sem pasta própria: **homologação** (ato do ministro que faz um parecer valer), registrada como atualização do próprio parecer.

## Fora do recorte

- Pesquisas acadêmicas, relatórios de organizações (Cetic.br, Todos pela Educação), materiais didáticos, experiências de escolas. Não entram nesta versão (decisão de 05/11/2026).

## Decisões

- **DECIDIDO (maintainer, 05/11/2026): só documentos oficiais.** Entram normas, orientações, planos e referenciais publicados por órgãos públicos (Brasil, em qualquer esfera) ou por organismos internacionais (UNESCO, OCDE, União Europeia etc.). Outros tipos podem virar seção separada no futuro.
- DECIDIDO (maintainer, 05/11/2026): portaria, nota técnica, instrução normativa/circular e estratégia nacional entram.
