# Protocolo de Curadoria

**Regras para escolher os documentos do acervo Marcos da IA na Educação: o que entra, o que sai e como decidir**

_GT Formação de Professores em IA_
_Curso de extensão Tópicos Especiais em Inteligência Artificial 3: Aplicações (TEIA 3)_
_Colégio Brasileiro de Altos Estudos da Universidade Federal do Rio de Janeiro (CBAE/UFRJ)_

Versão 2_std100 (proposta para aprovação do GT), 15 de novembro de 2026
Autoria: GT Formação de Professores em IA
Redação inicial: Krysamon Cavalcante

----

## Visão geral

Este protocolo define quais documentos entram no acervo Marcos da IA na Educação. Para aprovar o protocolo, leia só esta sessão. As seções 1 a 9 detalham cada regra e dão exemplos. Use essas seções para consulta.

**As cinco perguntas.** Um documento entra no acervo quando a resposta é "sim" nas cinco perguntas:

1. A inteligência artificial é o tema central do documento?
2. O documento tem relação com a educação? A relação pode ser direta ou indireta.
   - Direta: o documento fala de ensino, escola, professores ou pesquisa.
   - Indireta: o documento é lei, decreto ou política de IA que vale também para escolas e universidades.
3. Um órgão público brasileiro ou um organismo internacional publicou o documento? Exemplos de organismo internacional: UNESCO, OCDE, União Europeia.
4. O documento é uma norma ou uma orientação, e não um estudo ou um artigo? O texto completo está disponível de graça na fonte oficial?
5. O documento é novo para o acervo?

**Duas outras formas de entrada.**

- Exceção: um documento de associação científica pode entrar nos casos que a seção 4 define.
- Correlato: um documento que não trata de IA pode entrar quando é base para o uso da IA no ensino. Exemplos: proteção de dados, educação e competência digital, ensino de computação. A seção 5 define essa regra.

**Quem decide.**

- Um assistente de IA aplica as cinco perguntas e recomenda uma decisão.
- O(a) maintainer decide. O(a) maintainer é o(a) editor(a) principal do repositório do acervo. Quando tem dúvida, o(a) maintainer consulta o GT.
- O GT aprova este protocolo e as mudanças nele. O GT também aprova novos temas correlatos e decide os pedidos de revisão. O GT decide sempre por consenso.
- O(a) maintainer registra publicamente todas as decisões.
- Ninguém apaga documentos do acervo. Um documento que sai do acervo fica guardado com o motivo da saída.

---

## 1. Para que serve este protocolo

Este protocolo contém as regras e os critérios de entrada no acervo Marcos da IA na Educação. Ele define o que entra, o que fica fora e quem decide.

O acervo guarda documentos oficiais sobre inteligência artificial (IA) na educação. Os documentos são do Brasil e de organismos internacionais. Professores, gestores da educação e assistentes de IA consultam o acervo (ver o documento do projeto, versão 2, seção 4.2).

A regra é pública. Assim, qualquer pessoa pode entender por que um documento está no acervo ou fora dele.

O texto da regra tem um objetivo: duas pessoas que analisam o mesmo documento chegam à mesma resposta.

O(a) maintainer registra as decisões. Uma decisão registrada só volta à discussão com um pedido de revisão (seção 7).



## 2. Quem faz o quê

A curadoria tem quatro papéis:

| Papel | Quem é | O que faz |
|---|---|---|
| GT | O conjunto dos integrantes do GT Formação de Professores em IA | Aprova este protocolo e as mudanças nele. Aprova temas correlatos novos. Decide os pedidos de revisão. Responde às consultas do(a) maintainer quando ele(a) tem dúvida. |
| Curadores(as) | Os professores do GT que participam da curadoria | Escrevem as fichas. Conferem as fichas na fonte oficial. Quando dois curadores(as) conferem uma ficha, a ficha recebe o selo verde (ver Ficha modelo de Marcos). Os nomes dos curadores(as) aparecem na página "Quem faz" do site. |
| Maintainer | Um(a) dos curadores(as). O GT indica essa pessoa. Ela é o(a) editor(a) principal do repositório do acervo no GitHub. | Decide a entrada dos documentos, incluindo correlatos e exceções. Usa como base a recomendação do assistente de IA. Consulta o GT quando tem dúvida. Registra as decisões. Publica as fichas e as mudanças no repositório. Mantém o site. Este papel é um serviço dentro da curadoria. Ele não dá autoridade sobre o grupo. |
| Colaboradores(as) | Qualquer pessoa de fora do GT | Sugerem documentos. Indicam erros. Não decidem o que entra. Não conferem fichas. |

O acervo fica num repositório no GitHub. O GitHub é uma plataforma gratuita. Ele funciona como uma pasta compartilhada na internet. Ele registra cada alteração: o que mudou, quando mudou e quem mudou.

Qualquer pessoa pode consultar o repositório. Só o(a) maintainer grava mudanças no repositório: novas fichas, correções e decisões. Por isso, o(a) maintainer é o(a) editor(a) principal. Não é qualquer pessoa que pode ocupar este papel. O(a) maintainer precisa:

- ser curador(a) do GT;
- saber usar o GitHub e as ferramentas do acervo (fichas em texto, scripts e site);
- receber a indicação do GT, por consenso.

Curadores(as) e colaboradores(as) não precisam saber usar o GitHub. Eles enviam a sugestão ou indicam o erro. O(a) maintainer faz o registro.

Todos os papéis usam as cinco perguntas da seção 3:

- Curadores(as) e colaboradores(as) usam as perguntas para avaliar um documento antes de sugerir esse documento.
- O(a) maintainer usa as perguntas para decidir.
- Um assistente de IA pode analisar uma pasta de documentos candidatos. O assistente aplica as perguntas a cada documento. Depois, o assistente entrega uma tabela com a recomendação e o motivo. As recomendações possíveis são: entra, fica fora, exceção, correlato ou dúvida.

O assistente só recomenda. O(a) maintainer decide. O(a) maintainer pode confirmar várias recomendações de uma vez (em lote).



## 3. As perguntas de entrada

Aplique as cinco perguntas a todo documento candidato, nesta ordem.

- Quando a resposta é "sim" nas cinco perguntas, o documento entra.
- Quando uma resposta é "não", o documento fica fora. Isso não vale para as exceções da seção 4 e para os correlatos da seção 5.
- Quando uma resposta é "não sei", o(a) maintainer decide. Se tiver dúvida, o(a) maintainer consulta o GT (seção 7).

### Pergunta 1. A inteligência artificial é o tema central do documento?

**Sim**, quando uma destas condições é verdadeira:

- a IA está no título ou no objeto do documento;
- a IA tem uma parte própria no documento (capítulo, seção ou anexo).

**Não**, quando o documento só cita a IA de passagem.

Um documento que não trata de IA ainda pode entrar como documento correlato (seção 5).

### Pergunta 2. O documento tem relação com a educação?

**Sim**, quando a relação é direta. Relação direta: o documento fala de escola, ensino, aprendizagem, professores, estudantes, pesquisa ou publicação científica.

**Sim**, quando a relação é indireta. Relação indireta: o documento cria regras ou políticas públicas de IA que valem também para escolas e universidades. O documento pode não citar escolas e universidades. Exemplos de tipo: leis, decretos, regulamentos, planos de governo. Exemplos de documento:

- Regulamento Europeu de IA (AI Act, 2024);
- Projeto de Lei 2.338/2023;
- Plano Brasileiro de IA;
- Política de IA Fluminense.

**Não**, quando o documento é um guia ou uma orientação geral de IA sem parte dedicada ao ensino. Exemplo: Guia de uso responsável de IA da Controladoria-Geral da União (2024). O site pode indicar esses documentos na futura página "Leituras de apoio" (seção 6).

### Pergunta 3. O documento é oficial e está dentro da abrangência?

**Sim**, quando um destes emissores publicou o documento:

- órgão público brasileiro de qualquer esfera (federal, estadual ou municipal). Isso inclui instituições públicas de ensino e pesquisa, como universidades e institutos federais e estaduais;
- organismo internacional (organização formada por países) ou bloco de países. Exemplos: UNESCO, OCDE, União Europeia, Conselho da Europa.

**Não**, quando um destes emissores publicou o documento:

- governo de outro país. Exemplo: Departamento de Educação dos Estados Unidos;
- instituição privada, associação ou empresa.

Documentos de associações e entidades científicas só entram como exceção (seção 4).

### Pergunta 4. O documento é uma norma ou orientação, com acesso público e gratuito?

**Sim**, quando as duas condições são verdadeiras:

1. O documento regula ou orienta em nome da instituição que o publica. Os tipos aceitos são: leis, decretos, resoluções, pareceres, portarias, notas técnicas, instruções normativas, planos, estratégias, referenciais, guias e recomendações. O Anexo A tem a lista completa.
2. Qualquer pessoa pode ler o texto completo de graça na fonte oficial. Esta condição é necessária porque a ficha aponta para o original. Os curadores(as) conferem a ficha lado a lado com o original.

**Não**, quando uma destas condições é verdadeira:

- o documento é um estudo, relatório, pesquisa ou artigo, mesmo quando um órgão oficial publica o documento;
- a leitura do documento exige pagamento. Exemplo: as normas técnicas que a ISO e a ABNT vendem.

### Pergunta 5. O documento é novo para o acervo?

Antes de responder, verifique o acervo e o registro de triagem.

**Sim**, quando o documento ainda não está no acervo.

**Não**, quando o documento é uma nova versão de um documento do acervo. Exemplos: a homologação de um parecer, uma edição revisada. Neste caso, registre a mudança na ficha existente. Não crie uma ficha nova.

Documentos revogados ou alterados continuam no acervo, por causa do seu valor histórico. A ficha registra a situação do documento.

Projetos de lei entram com a natureza "não vigente".



## 4. Exceções: documentos que não são de órgão público

Um documento de associação ou entidade não governamental, brasileira ou internacional, não passa na pergunta 3. Este documento pode entrar como exceção quando passa nas perguntas 1, 2, 4 e 5. Ele também precisa cumprir pelo menos uma destas condições:

- a) a entidade fez o documento a pedido de órgão público, para dar base a uma política ou norma oficial;
- b) o documento é norma ou orientação de entidade científica de referência, nacional ou internacional. A entidade não tem fins lucrativos. A orientação tem alcance amplo: muitas instituições, revistas ou pesquisadores adotam essa orientação.

As expressões "referência" e "alcance amplo" dependem de julgamento. Por isso:

- o(a) maintainer decide cada exceção;
- se tiver dúvida, o(a) maintainer consulta o GT;
- o(a) maintainer registra cada exceção com a condição que justifica a entrada.

Estes documentos continuam fora do acervo, mesmo quando uma entidade os publica:

- documentos de empresas e de editoras comerciais;
- documentos de governos de outros países;
- textos com autoria individual (ensaios e artigos assinados).

Exceções já aceitas:

- Diretrizes para o uso de IA nas instituições de ensino superior (Andifes), pela condição (a);
- Manual de boas práticas da publicação científica (ANPAD, 2025), pela condição (b).

Pela condição (b), orientações sobre IA de comitês de ética em publicação científica podem entrar no futuro. Exemplos: COPE e ICMJE [NÃO VERIFICADO: os documentos ainda serão buscados e avaliados].



## 5. Documentos correlatos

Alguns documentos não tratam de IA, mas são base para o uso da IA na educação. Estes documentos entram como documentos correlatos. No site, eles aparecem com a etiqueta "correlato".

O acervo só aceita correlatos dos temas que o GT aprovou. Hoje são três temas:

| Tema | Documentos |
|---|---|
| Proteção de dados pessoais | Lei Geral de Proteção de Dados (Lei 13.709/2018) |
| Educação digital e competência digital | Política Nacional de Educação Digital (Lei 14.533/2023). Candidatos: DigComp 2.2 e DigCompEdu (Comissão Europeia) |
| Ensino de computação | Normas sobre Computação na Educação Básica (Resolução CNE/CEB 1/2022) |

Um correlato entra quando cumpre as duas condições:

1. O documento pertence a um tema aprovado.
2. O documento passa nas perguntas 3, 4 e 5: é oficial, é norma ou orientação de acesso público e é novo para o acervo.

O(a) maintainer aplica estes critérios e decide. Se tiver dúvida, o(a) maintainer envia o caso ao GT.

Um tema novo só vale depois que o GT aprova esse tema. Exemplo de tema novo: direitos de crianças e adolescentes no ambiente digital.



## 6. O que fica fora

- Pesquisas acadêmicas, relatórios, estudos, livros, artigos, pré-prints e documentos de trabalho. Isso inclui os documentos que organismos internacionais publicam. Exemplos: os *AI Papers* da OCDE, os relatórios de fóruns da UNESCO.
- Materiais didáticos, materiais comerciais e relatos de experiências de escolas.
- Documentos de instituições privadas e de empresas. Isso não vale para as exceções da seção 4.
- Documentos de governos de outros países.
- Documentos que citam IA só de passagem.
- Guias e orientações gerais de IA sem parte dedicada ao ensino.
- Documentos sem acesso público e gratuito.
- Documentos que não tratam de IA e não pertencem a um tema correlato aprovado.
- Planos internos e compilações de ferramentas. Exemplos: o plano de trabalho de um grupo, uma lista de aplicativos.

O site pode indicar bons documentos que ficam fora numa futura página de "Leituras de apoio". O GT decide se cria esta página. Documentos já indicados:

- Guia de uso responsável de IA (Controladoria-Geral da União, 2024);
- Guia Orientativo de Uso Ético da IA no Serviço Público Municipal (Prefeitura do Rio, 2026);
- Educar en la era de la inteligencia artificial (UNESCO Montevidéu, 2024);
- Orientações para professores sobre o combate à desinformação (Comissão Europeia, 2022);
- diretrizes da Intercom sobre IA generativa para pesquisadores (2023).



## 7. Como a decisão é tomada e registrada

1. Chegada. O documento candidato chega por uma destas vias:
   - busca dos curadores(as);
   - sugestão de colaboradores(as);
   - busca automática mensal, numa segunda fase.
2. Recomendação. O assistente de IA aplica as cinco perguntas. Depois, o assistente entrega uma tabela com a recomendação e o motivo para cada documento.
3. Decisão. O(a) maintainer decide cada documento: aceito, recusado, exceção ou correlato. O(a) maintainer pode confirmar várias recomendações de uma vez (em lote).
4. Consulta ao GT. O(a) maintainer envia ao GT estes casos:
   - temas correlatos novos (seção 5);
   - qualquer caso em que o(a) maintainer tem dúvida.
5. Decisão do GT. O GT decide por consenso. Uma proposta é aprovada quando nenhum integrante se opõe. Sem consenso, nada muda:
   - um documento novo não entra;
   - uma decisão em revisão continua igual;
   - o caso pode voltar à discussão mais tarde.
6. Prioridade. Os documentos aceitos entram na fila de fichas nesta ordem:
   1. primeiro, os documentos de alcance nacional, internacional e das redes de ensino;
   2. depois, os documentos de uma única instituição (exemplo: o guia de uma universidade), quando houver curadores(as) disponíveis.
7. Registro. O(a) maintainer registra cada decisão no registro público de triagem (`docs/log-triagem.md` do acervo). O registro contém o documento, o emissor, o ano, a decisão e o motivo.
8. Pedido de revisão. Qualquer integrante do GT pode pedir a revisão de uma decisão. O GT decide a revisão. O(a) maintainer registra a mudança e não apaga a decisão anterior.
9. Saída do recorte. Um documento pode deixar de cumprir os critérios por mudança de regra ou de entendimento. Neste caso, o(a) maintainer guarda o documento numa pasta própria (`corpus/fora-do-recorte/`) e registra o motivo. O(a) maintainer não apaga o documento. Exemplo: os decretos municipais do Rio sobre os Ginásios Educacionais Tecnológicos (2022 e 2024) estão nesta pasta, porque não tratam de IA.



## 8. Exemplos

Casos reais da triagem e a pergunta que decidiu cada caso:

| Documento | Decisão | O que decidiu |
|---|---|---|
| Referencial para Desenvolvimento e Uso Responsáveis de IA na Educação (MEC, 2026) | Aceito | Sim nas cinco perguntas: IA como tema central, relação direta com a educação, órgão federal, orientação de acesso público, documento novo |
| Regulamento Europeu de IA (AI Act, União Europeia, 2024) | Aceito | Pergunta 2: relação indireta (regulamento de IA que vale também para escolas e universidades). Emissor: bloco de países |
| Plano Brasileiro de IA 2024–2028 (MCTI) | Aceito | Pergunta 2: relação indireta (plano de governo de IA) |
| Lei Geral de Proteção de Dados (Lei 13.709/2018) | Aceito como correlato | Seção 5: tema aprovado (proteção de dados pessoais) |
| Diretrizes para o uso de IA nas instituições de ensino superior (Andifes) | Aceito como exceção | Seção 4, condição (a): a Andifes fez o documento a pedido do MEC |
| Guia de uso responsável de IA (CGU, 2024) | Recusado. Indicado para Leituras de apoio | Pergunta 2: guia geral de IA, sem parte dedicada ao ensino |
| Artificial Intelligence and the Future of Teaching and Learning (Departamento de Educação dos EUA, 2023) | Recusado | Pergunta 3: governo de outro país |
| Educar en la era de la inteligencia artificial (UNESCO Montevidéu, 2024) | Recusado. Indicado para Leituras de apoio | Pergunta 4: ensaio com autoria individual, que não fala em nome da instituição |
| Decreto nº 12.651/2025 (Presidência da República) | Recusado | Pergunta 1: o decreto trata de pesquisa com seres humanos, não de IA. Ele não pertence a tema correlato |

O registro de triagem do acervo contém a lista completa.



## 9. Mudanças neste protocolo

Só o GT pode mudar este protocolo. O(a) maintainer registra cada mudança no registro público de decisões do acervo (`docs/log-decisoes.md`), com data e motivo. Cada mudança gera uma nova versão deste documento.

## Anexo A. Tipos de documento aceitos

Cada documento recebe três classificações independentes:

- esfera: internacional, federal, estadual ou municipal;
- tipo: que documento é;
- natureza: vinculante (o documento obriga), orientadora (o documento recomenda) ou não vigente (o documento ainda não vale).

| Família | Tipos | Natureza mais comum |
|---|---|---|
| Normas que obrigam | Lei, decreto, resolução, parecer (após homologação), portaria, instrução normativa ou circular, regulamento de bloco internacional | Vinculante |
| Orientações oficiais | Documento orientador, referencial, guia, nota técnica, plano de governo, estratégia nacional | Orientadora |
| Referências internacionais | Recomendação, guia, referencial (de competências ou de letramento) | Orientadora |
| Em tramitação | Projeto de lei | Não vigente |

A homologação de um parecer é uma atualização da ficha do próprio parecer. Registre a homologação nessa ficha. Não crie uma ficha nova.

## Anexo B. Pontos em aberto (para conhecimento do GT)

O GT ainda vai decidir estes pontos. A aprovação deste documento não depende deles.

**Quem decide depois do curso.** O TEIA 3 termina em 04/12/2026. Mais perto dessa data, o GT define a instância que substitui o GT nas decisões.

**Mudanças no acervo que decorrem deste protocolo.** O(a) maintainer faz estas mudanças só depois da aprovação:

- O Guia de uso ético de IA da Prefeitura do Rio (serviço público municipal) sai do acervo. O documento vai para `corpus/fora-do-recorte/` e fica indicado para Leituras de apoio.
- O DigComp 2.2 e o DigCompEdu entram como correlatos do tema "educação digital e competência digital".
- Se o DigComp 2.2 tiver parte própria sobre IA, ele entra direto, e não como correlato [NÃO VERIFICADO: conferir no documento].

**Casos da triagem ainda a decidir:**

- Princípios de IA da OCDE (2019, revisados em 2024): localizar o documento oficial.
- Candidatos anteriores que ninguém avaliou ainda. Exemplos:
  - Estratégia Nacional de Escolas Conectadas (possível correlato de educação digital);
  - ECA Digital. Este caso depende de o GT aprovar um tema correlato novo.
- Associações científicas nacionais de outros países com alcance mundial: definir se elas podem entrar pela condição (b) da seção 4.
- Minutas e consultas públicas de normas: definir se elas entram como "não vigentes", como os projetos de lei.
