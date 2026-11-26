window.ATLAS_PATTERNS = [
  {
    "id": "strategy",
    "name": "Strategy",
    "cat": "Comportamental",
    "domain": "D1 · D2 · D5",
    "intent": "Encapsular algoritmos intercambiáveis por uma interface.",
    "problem": "O assistente precisa escolher recuperação lexical ou híbrida conforme o tipo de consulta.",
    "analogy": "Uma política da aplicação seleciona a estratégia de recuperação. O Model Router ilustra uma decisão semelhante para seleção de modelos.",
    "limit": "O Model Router é um serviço de seleção de modelos, não uma implementação comprovada do padrão GoF.",
    "when": "Quando existem alternativas que mudam independentemente do consumidor.",
    "avoid": "Quando há uma única estratégia estável; evite criar abstrações sem necessidade.",
    "uml": {
      "nodes": [
        [
          "c",
          24,
          25,
          "Context",
          "+ search(query)"
        ],
        [
          "i",
          386,
          25,
          "«interface» Strategy",
          "+ execute(query)"
        ],
        [
          "a",
          205,
          190,
          "LexicalStrategy",
          "+ execute(query)"
        ],
        [
          "b",
          386,
          190,
          "HybridStrategy",
          "+ execute(query)"
        ]
      ],
      "edges": [
        [
          "c",
          "i",
          "a"
        ],
        [
          "a",
          "i",
          "r"
        ],
        [
          "b",
          "i",
          "r"
        ]
      ]
    },
    "modern": {
      "nodes": [
        [
          "q",
          24,
          25,
          "Consulta",
          "Código ou pergunta"
        ],
        [
          "p",
          205,
          25,
          "Política de busca",
          "Regra validada"
        ],
        [
          "l",
          24,
          190,
          "Busca lexical",
          "BM25"
        ],
        [
          "h",
          205,
          190,
          "Busca híbrida",
          "BM25 + vetor / RRF"
        ],
        [
          "o",
          386,
          190,
          "Evidências",
          "Contexto do RAG"
        ]
      ],
      "edges": [
        [
          "q",
          "p",
          "a"
        ],
        [
          "p",
          "l",
          "a"
        ],
        [
          "p",
          "h",
          "a"
        ],
        [
          "l",
          "o",
          "a"
        ],
        [
          "h",
          "o",
          "a"
        ]
      ]
    },
    "steps": [
      [
        "c",
        "q",
        "Receber a consulta",
        "O contexto recebe a chamada; a aplicação recebe o pedido."
      ],
      [
        "i",
        "p",
        "Selecionar estratégia",
        "A política escolhe uma implementação compatível com o tipo de pergunta."
      ],
      [
        "b",
        "h",
        "Executar alternativa",
        "Neste exemplo, a pergunta combina código e linguagem natural; a busca híbrida recupera evidências."
      ],
      [
        "c",
        "o",
        "Retornar resultados",
        "O contrato permanece estável, independentemente da estratégia escolhida."
      ]
    ],
    "quiz": [
      "O sistema precisa alternar algoritmos de busca sem mudar o consumidor. Qual padrão clássico ajuda?",
      [
        "Strategy",
        "Observer",
        "Builder"
      ],
      0,
      "Strategy permite trocar algoritmos por um contrato comum."
    ]
  },
  {
    "id": "adapter",
    "name": "Adapter",
    "cat": "Estrutural",
    "domain": "D2 · D4",
    "intent": "Tornar compatíveis interfaces originalmente incompatíveis.",
    "problem": "Um agente de atendimento precisa consultar uma API de pedidos legada, cujo contrato é diferente do contrato de ferramenta.",
    "analogy": "Um adaptador expõe uma função ou ferramenta MCP e traduz argumentos e respostas da API legada.",
    "limit": "MCP é um protocolo; ele não é, por definição, um Adapter GoF. O adaptador é o código que faz a tradução.",
    "when": "Para integrar sistemas legados sem alterar seus contratos.",
    "avoid": "Se ambos os lados já compartilham a interface necessária.",
    "uml": {
      "nodes": [
        [
          "c",
          24,
          25,
          "Client",
          "+ request()"
        ],
        [
          "t",
          205,
          25,
          "«interface» Target",
          "+ request()"
        ],
        [
          "a",
          205,
          190,
          "Adapter",
          "+ request()"
        ],
        [
          "l",
          386,
          190,
          "Adaptee",
          "+ legacyRequest()"
        ]
      ],
      "edges": [
        [
          "c",
          "t",
          "d"
        ],
        [
          "a",
          "t",
          "r"
        ],
        [
          "a",
          "l",
          "a"
        ]
      ]
    },
    "modern": {
      "nodes": [
        [
          "a",
          24,
          25,
          "Agente",
          "Solicita consulta"
        ],
        [
          "t",
          205,
          25,
          "Tool / MCP",
          "Schema de argumentos"
        ],
        [
          "c",
          205,
          190,
          "Adaptador",
          "Valida e transforma"
        ],
        [
          "l",
          386,
          190,
          "API legada",
          "Contrato existente"
        ]
      ],
      "edges": [
        [
          "a",
          "t",
          "a"
        ],
        [
          "t",
          "c",
          "a"
        ],
        [
          "c",
          "l",
          "a"
        ]
      ]
    },
    "steps": [
      [
        "c",
        "a",
        "Solicitar operação",
        "O cliente conhece apenas a interface esperada."
      ],
      [
        "t",
        "t",
        "Descrever contrato",
        "A ferramenta expõe parâmetros claros para o agente."
      ],
      [
        "a",
        "c",
        "Converter chamada",
        "O adaptador valida, mapeia argumentos e normaliza erros."
      ],
      [
        "l",
        "l",
        "Executar e retornar",
        "A API executa a operação autorizada; o adaptador traduz o retorno."
      ]
    ],
    "quiz": [
      "A API antiga aceita customer_id e o agente envia clientId. O que resolve a incompatibilidade?",
      [
        "Mediator",
        "Adapter",
        "Singleton"
      ],
      1,
      "Adapter traduz contratos sem exigir que o consumidor conheça a interface legada."
    ]
  },
  {
    "id": "facade",
    "name": "Facade",
    "cat": "Estrutural",
    "domain": "D2 · D4",
    "intent": "Oferecer uma interface simplificada para um subsistema.",
    "problem": "Um aplicativo precisa falar com IA sem implementar individualmente todos os serviços de voz.",
    "analogy": "Voice Live reúne capacidades de fala e modelos em uma interface gerenciada; uma fachada própria também pode encapsular serviços.",
    "limit": "Voice Live é uma analogia de interface simplificada, não evidência de sua arquitetura interna.",
    "when": "Quando um subsistema complexo precisa ser consumido por uma API coesa.",
    "avoid": "Quando ocultar detalhes impediria controlar requisitos indispensáveis.",
    "uml": {
      "nodes": [
        [
          "c",
          24,
          25,
          "Client",
          "+ run()"
        ],
        [
          "f",
          205,
          25,
          "Facade",
          "+ operation()"
        ],
        [
          "a",
          24,
          190,
          "SubsystemA",
          "+ work()"
        ],
        [
          "b",
          205,
          190,
          "SubsystemB",
          "+ work()"
        ],
        [
          "d",
          386,
          190,
          "SubsystemC",
          "+ work()"
        ]
      ],
      "edges": [
        [
          "c",
          "f",
          "d"
        ],
        [
          "f",
          "a",
          "d"
        ],
        [
          "f",
          "b",
          "d"
        ],
        [
          "f",
          "d",
          "d"
        ]
      ]
    },
    "modern": {
      "nodes": [
        [
          "u",
          24,
          25,
          "Aplicação",
          "Áudio e eventos"
        ],
        [
          "v",
          205,
          25,
          "Voice Live",
          "Sessão gerenciada"
        ],
        [
          "s",
          24,
          190,
          "Entrada de fala",
          "Reconhecimento"
        ],
        [
          "l",
          205,
          190,
          "Modelo",
          "Resposta / ferramentas"
        ],
        [
          "t",
          386,
          190,
          "Saída de fala",
          "Síntese ou áudio direto"
        ]
      ],
      "edges": [
        [
          "u",
          "v",
          "a"
        ],
        [
          "v",
          "s",
          "a"
        ],
        [
          "v",
          "l",
          "a"
        ],
        [
          "v",
          "t",
          "a"
        ]
      ]
    },
    "steps": [
      [
        "c",
        "u",
        "Abrir sessão",
        "O cliente solicita uma interface unificada."
      ],
      [
        "f",
        "v",
        "Configurar fachada",
        "A API gerencia parâmetros e eventos de áudio."
      ],
      [
        "a",
        "s",
        "Processar entrada",
        "O subsistema interpreta a fala quando aplicável."
      ],
      [
        "b",
        "l",
        "Gerar resposta",
        "O modelo processa a solicitação; ferramentas podem ser chamadas."
      ],
      [
        "d",
        "t",
        "Entregar áudio",
        "O cliente recebe a resposta sem orquestrar cada peça."
      ]
    ],
    "quiz": [
      "A equipe quer reduzir a complexidade da integração de um subsistema, sem mudar seus componentes. Qual padrão?",
      [
        "Command",
        "Chain of Responsibility",
        "Facade"
      ],
      2,
      "Facade oferece um ponto de entrada simplificado para o subsistema."
    ]
  },
  {
    "id": "mediator",
    "name": "Mediator",
    "cat": "Comportamental",
    "domain": "D2",
    "intent": "Centralizar a interação entre componentes para reduzir acoplamento.",
    "problem": "Especialistas de pesquisa, análise e revisão precisam coordenar um problema aberto.",
    "analogy": "Um orquestrador coordena agentes; no Magentic, um gerente pode construir e adaptar o plano.",
    "limit": "Mediator clássico coordena objetos por lógica definida; Magentic acrescenta planejamento probabilístico e não equivale ao GoF.",
    "when": "Quando a comunicação entre pares cresce e precisa de coordenação explícita.",
    "avoid": "Quando um pipeline fixo ou apenas um agente já resolve o problema.",
    "uml": {
      "nodes": [
        [
          "i",
          205,
          25,
          "«interface» Mediator",
          "+ notify(sender,event)"
        ],
        [
          "m",
          205,
          107,
          "ConcreteMediator",
          "+ notify(sender,event)"
        ],
        [
          "a",
          24,
          230,
          "ColleagueA",
          "+ operation()"
        ],
        [
          "b",
          386,
          230,
          "ColleagueB",
          "+ operation()"
        ]
      ],
      "edges": [
        [
          "m",
          "i",
          "r"
        ],
        [
          "a",
          "i",
          "a"
        ],
        [
          "b",
          "i",
          "a"
        ],
        [
          "m",
          "a",
          "a"
        ],
        [
          "m",
          "b",
          "a"
        ]
      ]
    },
    "modern": {
      "nodes": [
        [
          "u",
          24,
          25,
          "Objetivo",
          "Problema aberto"
        ],
        [
          "m",
          205,
          25,
          "Agente gerente",
          "Plano e coordenação"
        ],
        [
          "a",
          24,
          190,
          "Pesquisa",
          "Recuperar evidências"
        ],
        [
          "b",
          205,
          190,
          "Análise",
          "Interpretar dados"
        ],
        [
          "r",
          386,
          190,
          "Revisão",
          "Validar conclusões"
        ]
      ],
      "edges": [
        [
          "u",
          "m",
          "a"
        ],
        [
          "m",
          "a",
          "a"
        ],
        [
          "m",
          "b",
          "a"
        ],
        [
          "m",
          "r",
          "a"
        ]
      ]
    },
    "steps": [
      [
        "i",
        "u",
        "Definir objetivo",
        "Estabelecer o contrato de coordenação e a tarefa."
      ],
      [
        "m",
        "m",
        "Coordenar especialistas",
        "No exemplo Magentic, o gerente define um plano e delega."
      ],
      [
        "a",
        "a",
        "Recuperar evidências",
        "O especialista retorna material ao gerente."
      ],
      [
        "b",
        "b",
        "Analisar",
        "O gerente pode alterar a próxima etapa conforme o retorno."
      ],
      [
        "m",
        "r",
        "Revisar e encerrar",
        "Aplicar critérios de conclusão, limites e aprovação quando necessária."
      ]
    ],
    "quiz": [
      "Vários agentes precisam de planejamento dinâmico; uma pessoa pode revisar o plano. Qual opção da AI-103 é mais adequada?",
      [
        "Magentic",
        "Pipeline sequencial fixo",
        "Batch Transcription"
      ],
      0,
      "Magentic combina planejamento adaptativo e coordenação de especialistas; o Mediator é uma analogia de desacoplamento."
    ]
  },
  {
    "id": "chain",
    "name": "Chain of Responsibility",
    "cat": "Comportamental",
    "domain": "D2",
    "intent": "Passar uma solicitação entre handlers até que um deles a trate.",
    "problem": "Um agente de triagem encaminha solicitações para especialistas de cobrança ou suporte.",
    "analogy": "Handoff transfere o controle a um agente apropriado conforme o contexto.",
    "limit": "Uma cadeia GoF tem encadeamento de handlers; handoff pode selecionar um destino dinamicamente, inclusive fora de uma ordem linear.",
    "when": "Quando o receptor depende do conteúdo da solicitação.",
    "avoid": "Quando todas as etapas são obrigatórias; nesse caso, um pipeline sequencial pode ser melhor.",
    "uml": {
      "nodes": [
        [
          "c",
          24,
          25,
          "Client",
          "+ request()"
        ],
        [
          "h",
          205,
          25,
          "«interface» Handler",
          "+ handle(request)"
        ],
        [
          "a",
          24,
          190,
          "HandlerA",
          "+ handle(request)"
        ],
        [
          "b",
          386,
          190,
          "HandlerB",
          "+ handle(request)"
        ]
      ],
      "edges": [
        [
          "c",
          "h",
          "d"
        ],
        [
          "a",
          "h",
          "r"
        ],
        [
          "b",
          "h",
          "r"
        ],
        [
          "h",
          "h",
          "a"
        ]
      ]
    },
    "modern": {
      "nodes": [
        [
          "u",
          24,
          25,
          "Solicitação",
          "Atendimento"
        ],
        [
          "t",
          205,
          25,
          "Agente de triagem",
          "Identificar intenção"
        ],
        [
          "a",
          24,
          190,
          "Cobrança",
          "Resolver cobrança"
        ],
        [
          "b",
          386,
          190,
          "Suporte",
          "Resolver suporte"
        ],
        [
          "r",
          205,
          190,
          "Humano",
          "Escalar exceção"
        ]
      ],
      "edges": [
        [
          "u",
          "t",
          "a"
        ],
        [
          "t",
          "a",
          "a"
        ],
        [
          "t",
          "b",
          "a"
        ],
        [
          "t",
          "r",
          "a"
        ]
      ]
    },
    "steps": [
      [
        "c",
        "u",
        "Receber pedido",
        "O cliente não precisa conhecer o responsável final."
      ],
      [
        "h",
        "t",
        "Avaliar responsabilidade",
        "O handler decide tratar ou encaminhar."
      ],
      [
        "a",
        "a",
        "Transferir controle",
        "Neste caso, a triagem escolhe cobrança pelo contexto."
      ],
      [
        "b",
        "r",
        "Tratar exceção",
        "Se não for possível resolver com segurança, escalar para uma pessoa."
      ]
    ],
    "quiz": [
      "Uma solicitação de cobrança deve passar ao especialista certo, e não por todos os agentes obrigatoriamente. Qual padrão de agente?",
      [
        "Concurrent",
        "Handoff",
        "Group Chat"
      ],
      1,
      "Handoff transfere responsabilidade; sequencial obriga a execução em ordem."
    ]
  },
  {
    "id": "command",
    "name": "Command",
    "cat": "Comportamental",
    "domain": "D2",
    "intent": "Encapsular uma solicitação como objeto executável.",
    "problem": "Um agente precisa solicitar uma consulta de saldo sem executar código diretamente no modelo.",
    "analogy": "Function Calling produz uma solicitação estruturada; a aplicação autoriza, executa e devolve o resultado.",
    "limit": "Uma chamada de ferramenta não é automaticamente um objeto Command; o backend pode implementar o padrão, inclusive auditoria e idempotência.",
    "when": "Quando é necessário separar o solicitante do executor e registrar operações.",
    "avoid": "Quando uma chamada direta já é suficiente e não há necessidade de encapsular operações.",
    "uml": {
      "nodes": [
        [
          "i",
          24,
          25,
          "Invoker",
          "+ invoke()"
        ],
        [
          "c",
          205,
          25,
          "«interface» Command",
          "+ execute()"
        ],
        [
          "a",
          205,
          190,
          "ConcreteCommand",
          "+ execute()"
        ],
        [
          "r",
          386,
          190,
          "Receiver",
          "+ action()"
        ]
      ],
      "edges": [
        [
          "i",
          "c",
          "a"
        ],
        [
          "a",
          "c",
          "r"
        ],
        [
          "a",
          "r",
          "a"
        ]
      ]
    },
    "modern": {
      "nodes": [
        [
          "a",
          24,
          25,
          "Agente",
          "Solicita função"
        ],
        [
          "c",
          205,
          25,
          "Tool call",
          "Nome e argumentos"
        ],
        [
          "v",
          205,
          190,
          "Executor seguro",
          "RBAC / validação"
        ],
        [
          "r",
          386,
          190,
          "API / domínio",
          "Consulta autorizada"
        ]
      ],
      "edges": [
        [
          "a",
          "c",
          "a"
        ],
        [
          "c",
          "v",
          "a"
        ],
        [
          "v",
          "r",
          "a"
        ]
      ]
    },
    "steps": [
      [
        "i",
        "a",
        "Solicitar ação",
        "O invocador dispara uma operação sem conhecer sua implementação."
      ],
      [
        "c",
        "c",
        "Representar intenção",
        "A tool call contém nome e argumentos estruturados."
      ],
      [
        "a",
        "v",
        "Validar e executar",
        "O backend verifica identidade, parâmetros e permissões."
      ],
      [
        "r",
        "r",
        "Retornar resultado",
        "O executor chama a API; o agente usa a saída real."
      ]
    ],
    "quiz": [
      "Quem executa o código de uma função personalizada solicitada pelo modelo?",
      [
        "O modelo diretamente",
        "O índice vetorial",
        "A aplicação que implementou a função"
      ],
      2,
      "A aplicação executa a função, após validar a solicitação e as permissões."
    ]
  },
  {
    "id": "observer",
    "name": "Observer",
    "cat": "Comportamental",
    "domain": "D1 · D2",
    "intent": "Notificar interessados quando um objeto muda de estado.",
    "problem": "Depois de uma análise de documento, serviços de auditoria e notificação precisam reagir ao resultado.",
    "analogy": "Eventos de domínio e consumidores podem distribuir notificações. OpenTelemetry registra operações para observabilidade, uma preocupação distinta.",
    "limit": "Observer é uma relação de notificação entre objetos; pub/sub distribuído é uma analogia, e tracing não é Observer por definição.",
    "when": "Quando vários interessados precisam reagir sem acoplamento direto ao produtor.",
    "avoid": "Quando uma resposta síncrona obrigatória é indispensável ou o evento não agrega valor.",
    "uml": {
      "nodes": [
        [
          "s",
          24,
          25,
          "Subject",
          "+ attach() / notify()"
        ],
        [
          "i",
          386,
          25,
          "«interface» Observer",
          "+ update()"
        ],
        [
          "a",
          205,
          190,
          "AuditObserver",
          "+ update()"
        ],
        [
          "b",
          386,
          190,
          "NotifyObserver",
          "+ update()"
        ]
      ],
      "edges": [
        [
          "s",
          "i",
          "a"
        ],
        [
          "a",
          "i",
          "r"
        ],
        [
          "b",
          "i",
          "r"
        ]
      ]
    },
    "modern": {
      "nodes": [
        [
          "s",
          24,
          25,
          "Processamento",
          "Documento analisado"
        ],
        [
          "e",
          205,
          25,
          "Evento de domínio",
          "AnalysisCompleted"
        ],
        [
          "a",
          24,
          190,
          "Consumidor auditoria",
          "Registrar evento"
        ],
        [
          "b",
          386,
          190,
          "Consumidor alerta",
          "Notificar responsável"
        ]
      ],
      "edges": [
        [
          "s",
          "e",
          "a"
        ],
        [
          "e",
          "a",
          "a"
        ],
        [
          "e",
          "b",
          "a"
        ]
      ]
    },
    "steps": [
      [
        "s",
        "s",
        "Alterar estado",
        "O processamento termina e registra seu resultado."
      ],
      [
        "i",
        "e",
        "Publicar notificação",
        "O evento representa a mudança de estado."
      ],
      [
        "a",
        "a",
        "Reagir independentemente",
        "A auditoria registra o evento."
      ],
      [
        "b",
        "b",
        "Reagir sem acoplamento",
        "O serviço de alerta processa a notificação; trate duplicatas e falhas."
      ]
    ],
    "quiz": [
      "Dois consumidores precisam reagir a um evento de conclusão sem que o produtor conheça cada um. Qual princípio é mais próximo?",
      [
        "Observer",
        "Adapter",
        "Builder"
      ],
      0,
      "Observer inspira notificação de interessados; em sistemas distribuídos, pub/sub exige cuidados adicionais."
    ]
  },
  {
    "id": "builder",
    "name": "Builder",
    "cat": "Criacional",
    "domain": "D1 · D2",
    "intent": "Separar a construção gradual de um objeto de sua representação.",
    "problem": "A equipe cria várias configurações de agente com diferentes instruções, ferramentas e políticas.",
    "analogy": "Um builder da aplicação pode montar a configuração, validar dependências e então criar o agente Foundry.",
    "limit": "A API do Foundry não precisa usar Builder internamente. O padrão está no código que organiza a criação.",
    "when": "Quando a criação tem muitas etapas e combinações válidas.",
    "avoid": "Quando um construtor ou objeto de configuração simples é suficiente.",
    "uml": {
      "nodes": [
        [
          "d",
          24,
          25,
          "Director",
          "+ construct()"
        ],
        [
          "i",
          205,
          25,
          "«interface» Builder",
          "+ addPart()"
        ],
        [
          "b",
          205,
          190,
          "ConcreteBuilder",
          "+ build()"
        ],
        [
          "p",
          386,
          190,
          "Product",
          "Configuração final"
        ]
      ],
      "edges": [
        [
          "d",
          "i",
          "a"
        ],
        [
          "b",
          "i",
          "r"
        ],
        [
          "b",
          "p",
          "d"
        ]
      ]
    },
    "modern": {
      "nodes": [
        [
          "r",
          24,
          25,
          "Requisitos",
          "Objetivo e limites"
        ],
        [
          "b",
          205,
          25,
          "Agent builder",
          "Configurar e validar"
        ],
        [
          "c",
          24,
          190,
          "Modelo / instruções",
          "Configuração"
        ],
        [
          "t",
          205,
          190,
          "Tools / guardrails",
          "Permissões"
        ],
        [
          "a",
          386,
          190,
          "Agente criado",
          "Pronto para avaliação"
        ]
      ],
      "edges": [
        [
          "r",
          "b",
          "a"
        ],
        [
          "b",
          "c",
          "a"
        ],
        [
          "b",
          "t",
          "a"
        ],
        [
          "b",
          "a",
          "a"
        ]
      ]
    },
    "steps": [
      [
        "d",
        "r",
        "Definir requisitos",
        "Identificar as capacidades necessárias."
      ],
      [
        "i",
        "b",
        "Configurar construção",
        "O contrato descreve as etapas de montagem."
      ],
      [
        "b",
        "c",
        "Adicionar modelo",
        "Selecionar implantação e instruções."
      ],
      [
        "b",
        "t",
        "Adicionar controles",
        "Verificar ferramentas, permissões e políticas."
      ],
      [
        "p",
        "a",
        "Construir e avaliar",
        "Criar o agente apenas com configurações válidas; executar testes."
      ]
    ],
    "quiz": [
      "A criação de agentes tem muitas combinações e etapas de validação. Qual padrão GoF organiza a construção?",
      [
        "Proxy",
        "Builder",
        "Observer"
      ],
      1,
      "Builder separa o processo de montagem de seu produto final."
    ]
  },
  {
    "id": "proxy",
    "name": "Proxy",
    "cat": "Estrutural",
    "domain": "D1 · D2",
    "intent": "Fornecer um substituto que controla o acesso ao objeto real.",
    "problem": "Uma ferramenta de reembolso não deve executar operações para usuários sem autorização.",
    "analogy": "Um proxy de proteção no backend verifica identidade e autorização antes da API financeira.",
    "limit": "RBAC, guardrails e aprovação humana não são sinônimos de Proxy; podem coexistir com uma camada de intermediação.",
    "when": "Quando acesso, cache ou comunicação remota precisam ser mediados.",
    "avoid": "Quando a camada apenas repete a API sem responsabilidade adicional.",
    "uml": {
      "nodes": [
        [
          "c",
          24,
          25,
          "Client",
          "+ request()"
        ],
        [
          "s",
          386,
          25,
          "«interface» Subject",
          "+ request()"
        ],
        [
          "p",
          24,
          190,
          "ProtectionProxy",
          "+ request()"
        ],
        [
          "r",
          386,
          190,
          "RealSubject",
          "+ request()"
        ]
      ],
      "edges": [
        [
          "c",
          "s",
          "d"
        ],
        [
          "p",
          "s",
          "r"
        ],
        [
          "r",
          "s",
          "r"
        ],
        [
          "p",
          "r",
          "a"
        ]
      ]
    },
    "modern": {
      "nodes": [
        [
          "a",
          24,
          25,
          "Agente",
          "Solicita reembolso"
        ],
        [
          "p",
          205,
          25,
          "Gateway seguro",
          "Autorização efetiva"
        ],
        [
          "h",
          24,
          190,
          "Aprovação humana",
          "Se exigida"
        ],
        [
          "r",
          386,
          190,
          "API financeira",
          "Regra de domínio"
        ]
      ],
      "edges": [
        [
          "a",
          "p",
          "a"
        ],
        [
          "p",
          "h",
          "a"
        ],
        [
          "p",
          "r",
          "a"
        ]
      ]
    },
    "steps": [
      [
        "c",
        "a",
        "Solicitar operação",
        "O consumidor utiliza o contrato conhecido."
      ],
      [
        "p",
        "p",
        "Verificar acesso",
        "O intermediário valida identidade e autorização; se negado, encerra."
      ],
      [
        "s",
        "h",
        "Obter aprovação",
        "Se a política exigir, aguardar decisão humana autenticada."
      ],
      [
        "r",
        "r",
        "Executar autorizado",
        "Somente após todos os controles o backend pode chamar a API."
      ]
    ],
    "quiz": [
      "Qual medida impede efetivamente um agente de executar uma operação financeira não autorizada?",
      [
        "Apenas escrever no prompt “não faça”",
        "Aumentar a temperatura",
        "Autorização obrigatória no backend"
      ],
      2,
      "O backend deve aplicar a autorização; um proxy de proteção é uma forma possível de implementar essa barreira."
    ]
  },
  {
    "id": "template",
    "name": "Template Method",
    "cat": "Comportamental",
    "domain": "D2 · D3 · D5",
    "intent": "Definir o esqueleto de um algoritmo e deixar etapas variáveis para subclasses.",
    "problem": "Vários fluxos de ingestão seguem extração, normalização e indexação, mas usam métodos de extração distintos.",
    "analogy": "Um pipeline fixo pode reutilizar etapas determinísticas e variar a implementação de extração conforme o documento.",
    "limit": "Workflow sequencial não implica herança; Template Method clássico usa uma classe-base e subclasses.",
    "when": "Quando o algoritmo mantém a ordem, mas algumas etapas variam.",
    "avoid": "Quando a ordem muda dinamicamente ou composição é mais simples.",
    "uml": {
      "nodes": [
        [
          "a",
          205,
          25,
          "AbstractPipeline",
          "+ run() / # extract()"
        ],
        [
          "b",
          24,
          190,
          "PdfPipeline",
          "+ extract()"
        ],
        [
          "c",
          386,
          190,
          "ImagePipeline",
          "+ extract()"
        ]
      ],
      "edges": [
        [
          "b",
          "a",
          "i"
        ],
        [
          "c",
          "a",
          "i"
        ]
      ]
    },
    "modern": {
      "nodes": [
        [
          "i",
          24,
          25,
          "Documento",
          "PDF ou imagem"
        ],
        [
          "e",
          205,
          25,
          "Extrair",
          "OCR ou Layout"
        ],
        [
          "s",
          386,
          25,
          "Normalizar",
          "Chunks / validação"
        ],
        [
          "v",
          386,
          190,
          "Embedding",
          "Vetorização"
        ],
        [
          "o",
          205,
          190,
          "Índice",
          "Azure AI Search"
        ]
      ],
      "edges": [
        [
          "i",
          "e",
          "a"
        ],
        [
          "e",
          "s",
          "a"
        ],
        [
          "s",
          "v",
          "a"
        ],
        [
          "v",
          "o",
          "a"
        ]
      ]
    },
    "steps": [
      [
        "a",
        "i",
        "Iniciar algoritmo",
        "A classe-base define a ordem geral."
      ],
      [
        "b",
        "e",
        "Variar extração",
        "Neste exemplo, a especialização PDF extrai texto e layout."
      ],
      [
        "a",
        "s",
        "Normalizar",
        "Etapas comuns preparam trechos e metadados."
      ],
      [
        "a",
        "v",
        "Vetorizar",
        "A execução gera embeddings compatíveis."
      ],
      [
        "a",
        "o",
        "Persistir",
        "O índice recebe os documentos; a ordem permanece previsível."
      ]
    ],
    "quiz": [
      "Todas as etapas precisam seguir ordem fixa, mas a extração varia por tipo de arquivo. Qual solução é mais coerente?",
      [
        "Workflow sequencial com etapas reutilizáveis",
        "Magentic obrigatório",
        "Handoff aleatório"
      ],
      0,
      "Um fluxo fixo é proporcional ao requisito. Template Method pode organizar a variação por herança, mas composição também é válida."
    ]
  }
];
