/* ATLAS V2: cenários fictícios e rubricas qualitativas de decisão. */
window.ATLAS_SIMULATOR_DATA = {
  "scenarios": [
    {
      "id": "contratos",
      "code": "CASO 01",
      "eyebrow": "Operação documental · demanda moderada",
      "title": "Contratos, voz e reembolsos",
      "short": "Um agente para consultar contratos e explicar políticas sem autorizar pagamentos indevidos.",
      "story": "Uma plataforma atende clientes em português e inglês. Recebe contratos digitalizados com tabelas, perguntas por texto e mensagens de voz. Precisa localizar cláusulas, consultar o estado de pedidos e explicar regras com fontes verificáveis. Um reembolso nunca pode ser executado sem autorização.",
      "specs": [
        "300 contratos variados",
        "200 consultas/dia",
        "Áudio já gravado",
        "Auditoria obrigatória",
        "Sem pagamento automático"
      ],
      "constraints": "Critérios de aceitação: citações por cláusula, histórico auditável, controle por cliente e custo proporcional à demanda. A fala não exige conversa contínua.",
      "stages": [
        {
          "domain": "D1 · PLANEJAMENTO",
          "title": "Implantação e capacidade",
          "question": "Qual infraestrutura atende consultas moderadas sem criar custo fixo desnecessário?",
          "critical": false,
          "options": [
            {
              "title": "Global Standard sem avaliação de residência",
              "desc": "Subir o modelo mais barato, sem validar a localização exigida pelos contratos.",
              "grade": "lean",
              "why": "Pode ser barato, mas deixa uma restrição contratual ou regulatória sem verificação; o ideal começa por requisitos de residência e quota.",
              "metrics": {
                "cost": 1,
                "latency": 1,
                "maint": 3,
                "risk": 3
              }
            },
            {
              "title": "Standard na região permitida + telemetria",
              "desc": "Validar região, quota, consumo de tokens e alertas; ajustar capacidade conforme uso.",
              "grade": "ideal",
              "why": "A demanda é moderada. Pagamento por uso e controle de região evitam reservar capacidade ociosa.",
              "metrics": {
                "cost": 2,
                "latency": 2,
                "maint": 1,
                "risk": 1
              }
            },
            {
              "title": "Provisioned + modelos grandes em todas as tarefas",
              "desc": "Reservar capacidade e usar modelos maiores inclusive para detectar idioma e validar campos.",
              "grade": "heavy",
              "why": "A reserva não torna o modelo necessariamente mais lento; aqui o excesso de etapas e inferências grandes eleva custo e pode aumentar o tempo fim a fim.",
              "metrics": {
                "cost": 3,
                "latency": 3,
                "maint": 3,
                "risk": 1
              }
            }
          ]
        },
        {
          "domain": "D2 · AGENTES",
          "title": "Coordenação e ações",
          "question": "Como o agente deve obter informações sobre pedidos e cláusulas?",
          "critical": false,
          "options": [
            {
              "title": "Um agente com funções limitadas e RAG",
              "desc": "Consultar o pedido por API autorizada; recuperar cláusulas; responder com referências.",
              "grade": "ideal",
              "why": "Uma única coordenação cobre a tarefa. Os cálculos e decisões de negócio ficam no backend, com funções focadas.",
              "metrics": {
                "cost": 2,
                "latency": 1,
                "maint": 1,
                "risk": 1
              }
            },
            {
              "title": "LLM responde com prompt fixo e sem ferramentas",
              "desc": "Confiar no conhecimento do modelo para inferir cláusulas e status de pedidos.",
              "grade": "lean",
              "why": "Mais simples, mas não acessa os dados privados atuais nem garante o estado real do pedido.",
              "metrics": {
                "cost": 1,
                "latency": 1,
                "maint": 3,
                "risk": 3
              }
            },
            {
              "title": "Magentic com cinco especialistas para cada pergunta",
              "desc": "Planejador, redator, revisor, auditor e roteador discutem toda consulta simples.",
              "grade": "heavy",
              "why": "Muitos turnos de inferência e coordenação sem benefício proporcional às perguntas rotineiras.",
              "metrics": {
                "cost": 3,
                "latency": 3,
                "maint": 3,
                "risk": 1
              }
            }
          ]
        },
        {
          "domain": "D3 · VISÃO",
          "title": "Documentos escaneados",
          "question": "Como interpretar PDFs e tabelas sem perder o contexto das cláusulas?",
          "critical": false,
          "options": [
            {
              "title": "OCR simples + expressões regulares para todos os layouts",
              "desc": "Tratar contratos variados como texto plano e extrair campos por padrões fixos.",
              "grade": "lean",
              "why": "Barato, mas tabelas, colunas e formatos distintos quebram regras e favorecem extrações incorretas.",
              "metrics": {
                "cost": 1,
                "latency": 1,
                "maint": 3,
                "risk": 3
              }
            },
            {
              "title": "Pipeline generativo repetido sobre cada página",
              "desc": "Usar o maior modelo visual em todas as páginas, repetindo leitura, descrição e resumo.",
              "grade": "heavy",
              "why": "Multiplica chamadas e tempo de processamento; nem toda página precisa de análise generativa intensa.",
              "metrics": {
                "cost": 3,
                "latency": 3,
                "maint": 3,
                "risk": 1
              }
            },
            {
              "title": "Content Understanding com layout e esquema de campos",
              "desc": "Extrair cláusulas e tabelas em Markdown/JSON; revisar campos críticos antes de indexar.",
              "grade": "ideal",
              "why": "Preserva estrutura para RAG e produz valores estruturados adequados para validação.",
              "metrics": {
                "cost": 2,
                "latency": 2,
                "maint": 1,
                "risk": 1
              }
            }
          ]
        },
        {
          "domain": "D4 · TEXTO E FALA",
          "title": "Entrada por voz",
          "question": "As perguntas em áudio já chegam gravadas. Como tratá-las?",
          "critical": false,
          "options": [
            {
              "title": "Voice Live contínuo para todas as mensagens",
              "desc": "Manter sessão bidirecional aberta mesmo quando o cliente envia apenas um arquivo.",
              "grade": "heavy",
              "why": "Voice Live é adequado à conversação contínua, mas não é necessário para gravar e transcrever mensagens ocasionais.",
              "metrics": {
                "cost": 3,
                "latency": 3,
                "maint": 2,
                "risk": 1
              }
            },
            {
              "title": "Fast Transcription + resposta textual; TTS opcional",
              "desc": "Transcrever o arquivo, preservar o texto auditável e sintetizar resposta se solicitado.",
              "grade": "ideal",
              "why": "O caso não exige interrupções em tempo real. A cadeia oferece simplicidade e trilha de auditoria.",
              "metrics": {
                "cost": 2,
                "latency": 2,
                "maint": 1,
                "risk": 1
              }
            },
            {
              "title": "Instruir o cliente a digitar tudo",
              "desc": "Eliminar o áudio sem alternativa acessível para a entrada prevista.",
              "grade": "lean",
              "why": "Reduz o investimento técnico, mas descumpre o requisito de atender mensagens de voz.",
              "metrics": {
                "cost": 1,
                "latency": 1,
                "maint": 3,
                "risk": 3
              }
            }
          ]
        },
        {
          "domain": "D5 · BUSCA",
          "title": "Grounding e citações",
          "question": "Como localizar números de contrato e cláusulas descritas com outras palavras?",
          "critical": true,
          "options": [
            {
              "title": "Somente pesquisa por termos exatos",
              "desc": "Utilizar BM25 sem vetores, mesmo quando a pergunta usa sinônimos.",
              "grade": "lean",
              "why": "Boa para identificadores, mas deixa lacunas nas perguntas semânticas sobre cláusulas.",
              "metrics": {
                "cost": 1,
                "latency": 1,
                "maint": 3,
                "risk": 2
              }
            },
            {
              "title": "Busca híbrida + Semantic Ranker com metadados",
              "desc": "Combinar BM25 e vetores, filtrar por cliente e preservar origem/citação.",
              "grade": "ideal",
              "why": "Combina precisão de códigos com proximidade de significado e classificação semântica.",
              "metrics": {
                "cost": 2,
                "latency": 2,
                "maint": 1,
                "risk": 1
              }
            },
            {
              "title": "Recuperação agêntica aprofundada em múltiplas rodadas",
              "desc": "Decompor e revisar reiteradamente mesmo perguntas simples sobre um único contrato.",
              "grade": "heavy",
              "why": "Pode ajudar perguntas complexas, mas adiciona inferência e latência desnecessárias para o tráfego descrito.",
              "metrics": {
                "cost": 3,
                "latency": 3,
                "maint": 2,
                "risk": 1
              }
            }
          ]
        },
        {
          "domain": "TRANSVERSAL · SEGURANÇA",
          "title": "Autorização de pagamentos",
          "question": "Qual barreira controla dados privados e a execução de reembolsos?",
          "critical": true,
          "options": [
            {
              "title": "Permissão ampla; aprovação apenas no prompt",
              "desc": "O agente pode chamar a API financeira e promete não reembolsar sem autorização.",
              "grade": "lean",
              "why": "Prompt não é mecanismo de autorização: falhas e ataques podem permitir ações indevidas.",
              "metrics": {
                "cost": 1,
                "latency": 1,
                "maint": 3,
                "risk": 3
              }
            },
            {
              "title": "Revisão manual para toda consulta sem escrita",
              "desc": "Exigir aprovação de um gestor até para buscar o nome de uma cláusula.",
              "grade": "heavy",
              "why": "É seguro no papel, mas gera fila operacional e atrasa consultas de leitura sem benefício equivalente.",
              "metrics": {
                "cost": 3,
                "latency": 3,
                "maint": 3,
                "risk": 1
              }
            },
            {
              "title": "RBAC por cliente + validação no backend + HITL para escrita",
              "desc": "Somente ações financeiras sensíveis exigem aprovação; logs e traces minimizam PII.",
              "grade": "ideal",
              "why": "Separa leitura de escrita, mantém autorização efetiva e introduz revisão humana onde o risco exige.",
              "metrics": {
                "cost": 2,
                "latency": 2,
                "maint": 1,
                "risk": 1
              }
            }
          ]
        }
      ]
    },
    {
      "id": "sinistros",
      "code": "CASO 02",
      "eyebrow": "Atendimento multimodal · baixa latência",
      "title": "Sinistros com fotos e conversa ao vivo",
      "short": "Atenda motoristas por voz e fotografia sem transformar cada análise em uma operação pesada.",
      "story": "Motoristas enviam imagens e vídeos curtos de avarias, fazem perguntas por voz e podem interromper o assistente. O sistema identifica o tipo de solicitação, consulta a apólice e encaminha os casos de indenização a um analista humano. A aplicação precisa responder com pouca demora.",
      "specs": [
        "2.000 atendimentos/dia",
        "Fotos e vídeos curtos",
        "Voz em tempo real",
        "Picos de demanda",
        "Sem decisão automática de indenização"
      ],
      "constraints": "Critérios de aceitação: interrupção natural, recuperação da apólice vigente, identificação de conteúdo visual e encaminhamento seguro, sem prometer diagnóstico conclusivo de danos.",
      "stages": [
        {
          "domain": "D1 · PLANEJAMENTO",
          "title": "Capacidade e modelos",
          "question": "Como equilibrar picos e custo sem prejudicar o atendimento por voz?",
          "critical": false,
          "options": [
            {
              "title": "Modelo grande para todas as tarefas com várias rodadas",
              "desc": "Utilizar a inferência mais complexa mesmo para saudações e perguntas triviais.",
              "grade": "heavy",
              "why": "O excesso de chamadas e tokens aumenta o custo e a latência total, embora o deployment provisionado possa estabilizar cada inferência.",
              "metrics": {
                "cost": 3,
                "latency": 3,
                "maint": 2,
                "risk": 1
              }
            },
            {
              "title": "Modelo mínimo único sem carga de teste",
              "desc": "Escolher apenas pelo menor custo por token e ignorar latência e quotas em pico.",
              "grade": "lean",
              "why": "Uma configuração barata pode falhar em horários de pico e perder qualidade em casos complexos.",
              "metrics": {
                "cost": 1,
                "latency": 2,
                "maint": 3,
                "risk": 2
              }
            },
            {
              "title": "Capacidade dimensionada + roteamento/modelos compatíveis",
              "desc": "Avaliar quota, latência, degradação controlada, custos e modelos adequados a cada etapa.",
              "grade": "ideal",
              "why": "Dimensionamento e observabilidade atendem a diferentes complexidades sem superdimensionar tudo.",
              "metrics": {
                "cost": 2,
                "latency": 1,
                "maint": 1,
                "risk": 1
              }
            }
          ]
        },
        {
          "domain": "D2 · AGENTES",
          "title": "Triagem e especialistas",
          "question": "Como separar a triagem da análise de sinistro sem orquestração excessiva?",
          "critical": false,
          "options": [
            {
              "title": "Um agente livre executa qualquer ação",
              "desc": "O modelo decide classificação e indenização e recebe permissão de escrita irrestrita.",
              "grade": "lean",
              "why": "É simples de montar, mas mistura diálogo, análise e decisão financeira sensível sem controle.",
              "metrics": {
                "cost": 1,
                "latency": 1,
                "maint": 3,
                "risk": 3
              }
            },
            {
              "title": "Handoff para especialista + ferramentas com escopo",
              "desc": "Agente de triagem transfere casos complexos, mantém rastreabilidade e solicita revisão humana.",
              "grade": "ideal",
              "why": "Encaminha somente quando necessário, preservando separação de responsabilidades e eficiência.",
              "metrics": {
                "cost": 2,
                "latency": 1,
                "maint": 1,
                "risk": 1
              }
            },
            {
              "title": "Debate obrigatório entre seis agentes para cada saudação",
              "desc": "Todas as perguntas passam por múltiplos revisores antes de responder.",
              "grade": "heavy",
              "why": "A latência cresce com a quantidade de chamadas, sem ganho justificado para questões triviais.",
              "metrics": {
                "cost": 3,
                "latency": 3,
                "maint": 3,
                "risk": 1
              }
            }
          ]
        },
        {
          "domain": "D3 · VISÃO",
          "title": "Imagens e vídeos de avarias",
          "question": "Qual processo visual atende fotos e vídeos curtos com eficiência?",
          "critical": false,
          "options": [
            {
              "title": "Modelo multimodal para fotos; Content Understanding nos vídeos quando útil",
              "desc": "Pedir interpretação preliminar de fotos; usar extração de segmentos para vídeos relevantes e moderar uploads.",
              "grade": "ideal",
              "why": "Usa a análise visual de forma proporcional, sem converter cada foto em um pipeline de vídeo completo.",
              "metrics": {
                "cost": 2,
                "latency": 2,
                "maint": 1,
                "risk": 1
              }
            },
            {
              "title": "Legenda simples sem validação e sem filtro",
              "desc": "Produzir uma frase por foto e tratar a classificação como diagnóstico definitivo.",
              "grade": "lean",
              "why": "Pode economizar, mas não fornece salvaguardas nem confiabilidade para decisões sobre sinistros.",
              "metrics": {
                "cost": 1,
                "latency": 1,
                "maint": 3,
                "risk": 3
              }
            },
            {
              "title": "Análise quadro a quadro em alta resolução de todo vídeo",
              "desc": "Passar cada quadro por vários modelos e resumidores em sequência.",
              "grade": "heavy",
              "why": "Processar tudo com a maior intensidade cria um gargalo evitável de tempo e custo.",
              "metrics": {
                "cost": 3,
                "latency": 3,
                "maint": 3,
                "risk": 1
              }
            }
          ]
        },
        {
          "domain": "D4 · TEXTO E FALA",
          "title": "Conversa interrompível",
          "question": "O cliente precisa poder interromper o agente no meio da resposta. O que escolher?",
          "critical": false,
          "options": [
            {
              "title": "Transcrição em lote, depois geração e TTS",
              "desc": "Esperar o arquivo completo e o processamento assíncrono antes de cada resposta.",
              "grade": "lean",
              "why": "Batch atende grandes arquivos, não uma conversa ao vivo com interrupções.",
              "metrics": {
                "cost": 1,
                "latency": 3,
                "maint": 3,
                "risk": 2
              }
            },
            {
              "title": "Pipeline STT + tradução + LLM + TTS em várias rodadas",
              "desc": "Traduzir tudo para um idioma intermediário, mesmo quando não há necessidade de tradução.",
              "grade": "heavy",
              "why": "A cadeia pode ser correta em outros cenários, mas múltiplas conversões desnecessárias aumentam a latência desta conversa.",
              "metrics": {
                "cost": 3,
                "latency": 3,
                "maint": 3,
                "risk": 1
              }
            },
            {
              "title": "Voice Live com VAD, cancelamento de eco e interrupção",
              "desc": "Sessão de voz em tempo real integrada ao agente e suas ferramentas autorizadas.",
              "grade": "ideal",
              "why": "O serviço foi desenhado para turnos interativos de baixa latência e interrupção natural.",
              "metrics": {
                "cost": 2,
                "latency": 1,
                "maint": 1,
                "risk": 1
              }
            }
          ]
        },
        {
          "domain": "D5 · BUSCA",
          "title": "Consulta de apólices",
          "question": "Como recuperar termos exatos da apólice e explicações em linguagem natural?",
          "critical": true,
          "options": [
            {
              "title": "Busca híbrida + ranking semântico + filtros de segurado",
              "desc": "Recuperar cobertura e exclusões com fonte e controle efetivo de acesso.",
              "grade": "ideal",
              "why": "Combina identificadores de apólice e equivalência semântica em respostas fundamentadas.",
              "metrics": {
                "cost": 2,
                "latency": 2,
                "maint": 1,
                "risk": 1
              }
            },
            {
              "title": "Texto genérico sobre seguros sem consultar a apólice",
              "desc": "O modelo responde com regras gerais sem verificar o documento vigente do usuário.",
              "grade": "lean",
              "why": "A resposta pode não corresponder à cobertura contratada e induzir erro.",
              "metrics": {
                "cost": 1,
                "latency": 1,
                "maint": 3,
                "risk": 3
              }
            },
            {
              "title": "Busca multiagente recursiva em toda consulta",
              "desc": "Executar planejamento de busca profundo mesmo para verificar o número da apólice.",
              "grade": "heavy",
              "why": "A complexidade de recuperação é desnecessária para consultas pontuais.",
              "metrics": {
                "cost": 3,
                "latency": 3,
                "maint": 2,
                "risk": 1
              }
            }
          ]
        },
        {
          "domain": "TRANSVERSAL · SEGURANÇA",
          "title": "Decisão e responsabilidade",
          "question": "Como impedir que imagens ou falas do cliente produzam indenizações indevidas?",
          "critical": true,
          "options": [
            {
              "title": "Somente guardrail de prompt e decisão automática",
              "desc": "Permitir que a IA determine a indenização a partir das fotos, sem autorização humana.",
              "grade": "lean",
              "why": "O problema exige revisão humana de indenizações e autorização do sistema, não apenas filtros de conteúdo.",
              "metrics": {
                "cost": 1,
                "latency": 1,
                "maint": 3,
                "risk": 3
              }
            },
            {
              "title": "Aprovação humana de cada frase e foto sem risco",
              "desc": "Um supervisor aprova até saudações e leitura de informações públicas.",
              "grade": "heavy",
              "why": "O fluxo fica lento e operacionalmente inviável; aprovação deve acompanhar a criticidade.",
              "metrics": {
                "cost": 3,
                "latency": 3,
                "maint": 3,
                "risk": 1
              }
            },
            {
              "title": "Consentimento, segurança visual, RBAC e revisão do sinistro",
              "desc": "Moderar entradas, proteger PII e exigir especialista em ações financeiras.",
              "grade": "ideal",
              "why": "Protege dados, limita poderes e impede que uma análise visual preliminar vire decisão vinculante.",
              "metrics": {
                "cost": 2,
                "latency": 2,
                "maint": 1,
                "risk": 1
              }
            }
          ]
        }
      ]
    },
    {
      "id": "freios",
      "code": "CASO 03",
      "eyebrow": "Engenharia ferroviária · documentação técnica",
      "title": "Oficina de freios pneumáticos",
      "short": "Ajude técnicos a interpretar esquemas e históricos sem dar a uma IA o controle físico da máquina.",
      "story": "Uma oficina ferroviária consulta diagramas de freios pneumáticos, fotografias de válvulas e ordens de serviço. Os técnicos falam termos específicos e precisam localizar etapas documentadas de inspeção. O agente pode orientar a consulta ao manual, mas não pode acionar equipamentos nem substituir o procedimento de segurança.",
      "specs": [
        "2.500 manuais/esquemas",
        "50 consultas/dia",
        "Diagramas e fotografias",
        "Jargão ferroviário",
        "Nenhuma atuação automática"
      ],
      "constraints": "Critérios de aceitação: referência à página do manual, identificação de incerteza visual, confirmação humana e nenhum comando de atuação física em freios ou locomotivas.",
      "stages": [
        {
          "domain": "D1 · PLANEJAMENTO",
          "title": "Implantação e custo",
          "question": "A oficina faz poucas consultas diárias, mas exige rastreabilidade. Como provisionar?",
          "critical": false,
          "options": [
            {
              "title": "Implantação Standard adequada + tracing e RBAC",
              "desc": "Verificar a região, cotas e configurar telemetria para pequena demanda.",
              "grade": "ideal",
              "why": "Poucas consultas não justificam reserva grande; rastreamento e identidade são mais relevantes que capacidade ociosa.",
              "metrics": {
                "cost": 2,
                "latency": 2,
                "maint": 1,
                "risk": 1
              }
            },
            {
              "title": "Modelo improvisado sem identidade ou logs",
              "desc": "Rodar por uma credencial compartilhada e não guardar evidências de consultas.",
              "grade": "lean",
              "why": "Baixo custo inicial, mas não há atribuição confiável das ações nem rastreabilidade de diagnóstico.",
              "metrics": {
                "cost": 1,
                "latency": 1,
                "maint": 3,
                "risk": 3
              }
            },
            {
              "title": "Capacidade reservada para alta concorrência inexistente",
              "desc": "Dimensionar para milhares de chamadas simultâneas e usar modelo grande para cada microetapa.",
              "grade": "heavy",
              "why": "Custo fixo e excesso de inferência para um uso esporádico, sem justificativa técnica.",
              "metrics": {
                "cost": 3,
                "latency": 3,
                "maint": 2,
                "risk": 1
              }
            }
          ]
        },
        {
          "domain": "D2 · AGENTES",
          "title": "Especialização e autonomia",
          "question": "Como o agente deve responder perguntas técnicas sem operar o equipamento?",
          "critical": true,
          "options": [
            {
              "title": "Magentic com planejamento aberto e cinco agentes",
              "desc": "Criar debates internos para toda consulta simples ao manual.",
              "grade": "heavy",
              "why": "A orquestração aberta pode ser útil em pesquisa complexa, mas aumenta tempo e custo aqui.",
              "metrics": {
                "cost": 3,
                "latency": 3,
                "maint": 3,
                "risk": 1
              }
            },
            {
              "title": "Agente de consulta com busca + ferramentas somente leitura",
              "desc": "Citar manuais, sinalizar incerteza e encaminhar decisões técnicas para o profissional.",
              "grade": "ideal",
              "why": "A função do agente é apoiar a interpretação; a responsabilidade operacional continua com o técnico.",
              "metrics": {
                "cost": 2,
                "latency": 1,
                "maint": 1,
                "risk": 1
              }
            },
            {
              "title": "Agente com comandos diretos para atuadores",
              "desc": "Conectar ferramentas de escrita ao sistema pneumático e executar decisões livremente.",
              "grade": "lean",
              "why": "Inaceitável para a segurança: nunca delegar diretamente à IA o acionamento de sistema crítico.",
              "metrics": {
                "cost": 1,
                "latency": 1,
                "maint": 3,
                "risk": 3
              }
            }
          ]
        },
        {
          "domain": "D3 · VISÃO",
          "title": "Esquemas e válvulas",
          "question": "Como aproveitar diagramas e fotografias sem inventar detalhes?",
          "critical": false,
          "options": [
            {
              "title": "Somente OCR básico de todas as páginas",
              "desc": "Ignorar símbolos, conexões, setas e desenhos técnicos.",
              "grade": "lean",
              "why": "O texto extraído sozinho não descreve relações entre os componentes do esquema.",
              "metrics": {
                "cost": 1,
                "latency": 1,
                "maint": 3,
                "risk": 3
              }
            },
            {
              "title": "Modelo multimodal para imagens + extração de layout para manuais",
              "desc": "Interpretar imagens como apoio, preservar figuras e validar achados com o documento original.",
              "grade": "ideal",
              "why": "Distingue conteúdo textual de informação visual e mantém a incerteza explícita.",
              "metrics": {
                "cost": 2,
                "latency": 2,
                "maint": 1,
                "risk": 1
              }
            },
            {
              "title": "Geração de vídeo e descrição visual quadro a quadro",
              "desc": "Converter cada esquema estático em vídeo e usar vários modelos para inspecioná-lo.",
              "grade": "heavy",
              "why": "Transformar esquemas em vídeo é desnecessário e aumenta custo, ruído e tempo de resposta.",
              "metrics": {
                "cost": 3,
                "latency": 3,
                "maint": 3,
                "risk": 1
              }
            }
          ]
        },
        {
          "domain": "D4 · TEXTO E FALA",
          "title": "Termos ferroviários",
          "question": "Técnicos ditam consultas contendo nomes específicos de válvulas. Qual opção?",
          "critical": false,
          "options": [
            {
              "title": "Áudio → STT com vocabulário/Custom Speech → texto rastreável",
              "desc": "Ajustar reconhecimento de termos técnicos e registrar a transcrição para conferência.",
              "grade": "ideal",
              "why": "Ajuda a reconhecer jargão e permite ao técnico verificar o texto antes de consultar procedimentos.",
              "metrics": {
                "cost": 2,
                "latency": 2,
                "maint": 1,
                "risk": 1
              }
            },
            {
              "title": "Reconhecimento genérico sem conferir termos",
              "desc": "Aceitar qualquer transcrição e seguir com instruções operacionais.",
              "grade": "lean",
              "why": "Uma transcrição errada pode trocar o nome de um componente crítico.",
              "metrics": {
                "cost": 1,
                "latency": 1,
                "maint": 3,
                "risk": 3
              }
            },
            {
              "title": "Voice Live, tradução multilíngue e avatar permanente",
              "desc": "Manter avatar, múltiplas traduções e modelo em tempo real em toda consulta breve em português.",
              "grade": "heavy",
              "why": "Não há requisito de interpretação ao vivo ou avatar; as camadas extra complicam sem benefício.",
              "metrics": {
                "cost": 3,
                "latency": 3,
                "maint": 3,
                "risk": 1
              }
            }
          ]
        },
        {
          "domain": "D5 · BUSCA",
          "title": "Manuais e histórico",
          "question": "Como localizar a peça 26L e também encontrar explicações com nomes diferentes?",
          "critical": true,
          "options": [
            {
              "title": "Somente vetores, descartando códigos e números",
              "desc": "Usar apenas proximidade semântica para localizar identificadores críticos.",
              "grade": "lean",
              "why": "O código exato 26L é fundamental; busca vetorial isolada pode perder a correspondência literal.",
              "metrics": {
                "cost": 1,
                "latency": 1,
                "maint": 3,
                "risk": 3
              }
            },
            {
              "title": "Knowledge Base híbrida com fontes autorizadas e citações",
              "desc": "Combinar BM25 + vetores + ranking; preservar figura, versão e página do manual.",
              "grade": "ideal",
              "why": "Une nomenclatura exata e consultas semânticas, com referências rastreáveis.",
              "metrics": {
                "cost": 2,
                "latency": 2,
                "maint": 1,
                "risk": 1
              }
            },
            {
              "title": "Recuperação agêntica profunda em toda pergunta",
              "desc": "Replanejar cada consulta 2–3 vezes mesmo para localizar um esquema conhecido.",
              "grade": "heavy",
              "why": "Busca aprofundada tem lugar para pesquisa aberta, mas é excessiva neste padrão de consulta.",
              "metrics": {
                "cost": 3,
                "latency": 3,
                "maint": 2,
                "risk": 1
              }
            }
          ]
        },
        {
          "domain": "TRANSVERSAL · SEGURANÇA",
          "title": "Limites de atuação",
          "question": "Qual política evita ações físicas e conclusões técnicas sem validação?",
          "critical": true,
          "options": [
            {
              "title": "Prometer no prompt que a IA nunca errará",
              "desc": "Usar apenas instruções; não implementar barreiras reais para ferramentas.",
              "grade": "lean",
              "why": "Promessas no prompt não isolam recursos físicos; riscos materiais exigem controles de engenharia.",
              "metrics": {
                "cost": 1,
                "latency": 1,
                "maint": 3,
                "risk": 3
              }
            },
            {
              "title": "Bloquear todas as consultas até um comitê responder",
              "desc": "Exigir aprovação formal para cada leitura de trecho de manual.",
              "grade": "heavy",
              "why": "Protege em excesso tarefas informativas e cria filas, sem melhorar a evidência técnica.",
              "metrics": {
                "cost": 3,
                "latency": 3,
                "maint": 3,
                "risk": 1
              }
            },
            {
              "title": "Ferramentas somente leitura + aviso de incerteza + validação humana",
              "desc": "Sem interfaces de atuação; manter fontes, logs, permissões e procedimentos físicos fora da IA.",
              "grade": "ideal",
              "why": "Reduz o risco de comandos indevidos e preserva a autoridade do manual e do profissional habilitado.",
              "metrics": {
                "cost": 2,
                "latency": 2,
                "maint": 1,
                "risk": 1
              }
            }
          ]
        }
      ]
    }
  ]
};
