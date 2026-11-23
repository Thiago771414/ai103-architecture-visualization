/* Dados didáticos dos 17 guias. Arquivo intencionalmente editável. */
window.ATLAS_DATA = {
  domains: [
    {
      id: 1, slug: 'planejamento', short: 'Planejamento', name: 'Planejar e gerenciar soluções de IA',
      weight: '25–30%', color: '#75aafa', label: 'CHASSI · INFRAESTRUTURA',
      subtitle: 'Antes de ligar a máquina, monte seus recursos, identidades e instrumentos de medição.',
      analogy: 'A planta da locomotiva: estrutura, combustível, comando, proteções e instrumentos.',
      question: 'Como disponibilizar um agente de IA com modelos, permissões, monitoramento e proteção, sem criar acesso ou custo desnecessário?',
      nodes: [
        {id:'app',x:28,y:180,name:'Aplicação',tag:'ENTRADA',detail:'Frontend, API ou serviço que consulta a solução de IA. Nunca deve carregar credenciais administrativas no navegador.',input:'Pergunta ou solicitação',output:'Chamada autenticada ao serviço'},
        {id:'entra',x:302,y:46,name:'Entra ID',tag:'IDENTIDADE',detail:'Identifica usuários e workloads; com identidade gerenciada e RBAC, evita segredos gravados no código.',input:'Identidade autenticada',output:'Token e políticas de acesso'},
        {id:'project',x:302,y:180,name:'Foundry Project',tag:'CONTROLE',detail:'Workspace de desenvolvimento com modelos, agentes, ferramentas, avaliações e escopo de colaboração.',input:'Configuração e permissões',output:'Endpoint e recursos acessíveis'},
        {id:'model',x:576,y:46,name:'Model Deployment',tag:'INFERÊNCIA',detail:'Implantação escolhida por qualidade, região, throughput, quota e custo. Standard, Provisioned e Batch atendem cenários diferentes.',input:'Prompt + parâmetros',output:'Resposta ou embeddings'},
        {id:'agent',x:576,y:180,name:'Agent Service',tag:'ORQUESTRAÇÃO',detail:'Integra modelo, instruções e ferramentas, respeitando permissões e limites do projeto.',input:'Solicitação do aplicativo',output:'Resposta e chamadas de ferramenta'},
        {id:'tools',x:576,y:315,name:'Tools / IQ',tag:'CAPACIDADES',detail:'Ferramentas externas, RAG e Foundry IQ fornecem ações e conhecimento que o modelo não possui nativamente.',input:'Consulta ou chamada autorizada',output:'Dados, contexto e resultado'},
        {id:'observe',x:850,y:46,name:'App Insights',tag:'OBSERVAR',detail:'Logs, métricas, traces, avaliações e custo por uso ajudam a diagnosticar o comportamento em produção.',input:'Telemetria e traces',output:'Métricas e diagnóstico'},
        {id:'safety',x:850,y:180,name:'Guardrails',tag:'PROTEGER',detail:'Content Safety, Prompt Shields, acesso por rede, RBAC e verificações de saída reduzem riscos. Proteções são complementares.',input:'Conteúdo e política',output:'Permitir, sinalizar ou bloquear'}
      ],
      edges:[['app','project'],['entra','project'],['project','model'],['project','agent'],['project','tools'],['model','observe','dashed'],['agent','safety'],['tools','safety','dashed'],['safety','observe','dashed']],
      flowTitle:'Da ideia ao primeiro agente monitorado',
      flow:[
        {title:'Criar a base Azure',actor:'Subscription / Foundry Resource',what:'Escolha assinatura, região e recurso. Confirme disponibilidade do modelo e requisitos de residência de dados.',proof:'O recurso existe na região adequada e tem quota compatível.',risk:'Escolher um deployment Global quando existem restrições regionais.'},
        {title:'Abrir o workspace',actor:'Foundry Project',what:'Configure o projeto e distribua responsabilidades com RBAC e identidades do Microsoft Entra ID.',proof:'Cada pessoa ou workload acessa apenas o necessário.',risk:'Atribuir papel de Owner a todos para acelerar o laboratório.'},
        {title:'Implantar um modelo',actor:'Foundry Models',what:'Escolha modelo e deployment conforme qualidade, latência, residência, custo e tipo de carga.',proof:'O endpoint responde; TPM/RPM e cobrança foram avaliados.',risk:'Confundir limite de TPM com tamanho da janela de contexto.'},
        {title:'Acoplar conhecimento e ações',actor:'Agent Service + Tools',what:'Crie instruções, conecte ferramentas confiáveis e conhecimento recuperável se necessário.',proof:'O agente responde com fontes e respeita as permissões de cada ferramenta.',risk:'Dar a ferramenta de alterar dados a um agente de consulta.'},
        {title:'Instalar proteções',actor:'Guardrails / Entra / Rede',what:'Proteja entradas, saídas e ações. Use autorização no backend, não apenas instruções de prompt.',proof:'Pedidos proibidos são recusados e usuários não acessam dados de outros.',risk:'Tratar prompt de sistema como controle de autorização.'},
        {title:'Avaliar e observar',actor:'Application Insights',what:'Meça qualidade, groundedness, custos, latência e traces. Trate 429 com Retry-After e backoff.',proof:'Existem métricas, alertas e testes de regressão antes da publicação.',risk:'Gravar dados sensíveis em traces sem controle de acesso.'}
      ],
      checkpoint:{q:'A equipe vê HTTP 429 durante picos de inferência. Qual investigação é a mais adequada?',options:['Aumentar a temperatura','Verificar TPM/RPM, Retry-After e política de backoff','Treinar um modelo de OCR'],answer:1,why:'HTTP 429 indica limitação de taxa ou quota. Investigue TPM/RPM, throttling e estratégias de repetição.'},
      guides:[
        {title:'Escolhendo os serviços certos',type:'Seleção',desc:'Foundry Models, Agent Service, Tools e IQ; benchmarks, RAG, prompt e fine-tuning.',tags:['Models','Agent Service','RAG','Foundry IQ'],points:['Modelo maior não é necessariamente melhor: compare qualidade, segurança, custo e throughput.','Prompt ajusta comportamento; RAG adiciona conhecimento; fine-tuning adapta padrões aprendidos.','Ferramentas e conhecimento precisam de autorização e fontes confiáveis.'],ask:'Quando escolher prompt, RAG ou fine-tuning para responder políticas corporativas atualizadas?'},
        {title:'Configurando soluções no Foundry',type:'Implantação',desc:'Assinatura, recurso, projetos, regiões, endpoints e modalidades de implantação.',tags:['Project','Global','Data Zone','Batch'],points:['Global, Data Zone e regional têm implicações de residência e disponibilidade.','Standard é sob demanda, Provisioned reserva capacidade e Batch prioriza processamento assíncrono.','Agent Prompt e Hosted Agent têm necessidades diferentes de execução.'],ask:'Qual deployment usar para uma carga noturna, grande e assíncrona, com restrição de região?'},
        {title:'Gerenciando e protegendo',type:'Operação',desc:'Quota, observabilidade, Entra ID, identidade gerenciada, RBAC e rede privada.',tags:['TPM','RPM','429','RBAC','Private Endpoint'],points:['Application Insights traz métricas, logs e rastreamento.','RBAC define quem pode agir; Private Endpoint ajuda a definir por qual rede o recurso é acessado.','Monitore custo por tokens e comportamento de RAG, inclusive atualização dos documentos.'],ask:'Como reduzir os riscos de um agente com ferramentas financeiras e diagnosticar lentidão?'},
        {title:'IA responsável',type:'Segurança',desc:'Fairness, transparência, avaliação, Content Safety, Prompt Shields e controles.',tags:['Guardrails','Prompt Shields','PII','Groundedness'],points:['Mapear, medir, mitigar e gerenciar riscos ao longo do ciclo de vida.','Injeção direta nasce no prompt; indireta nasce em documentos e fontes externas.','Filtros não substituem autorização nem aprovação humana para ações sensíveis.'],ask:'Quais controles impedirão um documento malicioso de instruir o agente a executar uma transferência?'}
      ],
      docs:[['Microsoft Foundry', 'https://learn.microsoft.com/pt-br/azure/foundry/'], ['Responsabilidade em IA','https://learn.microsoft.com/pt-br/azure/ai-services/content-safety/overview']]
    },
    {
      id: 2, slug: 'agentes', short:'Agentes', name: 'IA generativa e orquestração de agentes', weight:'30–35%',color:'#ae9df5',label:'CONTROLE · ORQUESTRAÇÃO',
      subtitle:'Um agente não é apenas o modelo: é um sistema que decide quando consultar, executar e pedir aprovação.',
      analogy:'O painel de comando: sensores consultam, válvulas executam, controladores coordenam e operadores autorizam.',
      question:'Como responder uma consulta financeira com contexto correto, ferramentas limitadas, aprovação humana e avaliação do resultado?',
      nodes:[
        {id:'person',x:28,y:180,name:'Usuário / App',tag:'ORIGEM',detail:'A aplicação envia texto, contexto e identidade. Histórico e privacidade dependem do desenho de sessão.',input:'Pergunta e identidade',output:'Requisição ao agente'},
        {id:'model',x:302,y:46,name:'Modelo LLM',tag:'INFERÊNCIA',detail:'Interpreta instruções e decide quando solicitar ferramentas; não executa código de funções diretamente.',input:'Prompt e contexto',output:'Resposta preliminar ou tool call'},
        {id:'agent',x:302,y:180,name:'Foundry Agent',tag:'CONTROLE',detail:'Combina modelo, instruções e ferramentas. Uma sessão mantém continuidade conforme API e desenho escolhido.',input:'Mensagem do usuário',output:'Chamadas, respostas e contexto'},
        {id:'iq',x:576,y:46,name:'Foundry IQ',tag:'CONHECIMENTO',detail:'Camada de recuperação de conhecimento corporativo com fontes, permissões e citações.',input:'Pergunta de conhecimento',output:'Trechos e referências'},
        {id:'mcp',x:576,y:180,name:'MCP / OpenAPI',tag:'FERRAMENTAS',detail:'O cliente descobre ferramentas de um servidor confiável; allowed_tools restringe e require_approval controla aprovação.',input:'Nome e argumentos da ferramenta',output:'Resposta de API ou função'},
        {id:'workflow',x:576,y:315,name:'Agent Framework',tag:'FLUXO',detail:'Sequencial, concorrente, chat em grupo, handoff e Magentic organizam a colaboração de agentes.',input:'Estado e tarefas',output:'Resultado coordenado'},
        {id:'human',x:850,y:180,name:'Aprovação',tag:'SEGURANÇA',detail:'Human-in-the-loop pausa ações sensíveis. O backend verifica autorização real.',input:'Solicitação e evidências',output:'Decisão autorizada ou recusa'},
        {id:'eval',x:850,y:46,name:'Evaluations',tag:'QUALIDADE',detail:'Avaliam intenção, aderência, ferramentas, conclusão, relevância e groundedness. Traces mostram a execução.',input:'Trajetória e resposta',output:'Scores e feedback'}
      ],
      edges:[['person','agent'],['agent','model'],['agent','iq'],['agent','mcp'],['agent','workflow'],['iq','eval','dashed'],['mcp','human'],['workflow','human'],['human','eval','dashed']],
      flowTitle:'Consulta de pedido com ferramenta e aprovação',
      flow:[
        {title:'Interpretar intenção',actor:'Foundry Agent',what:'O cliente pergunta sobre pedido e política. O agente diferencia consulta de operação financeira.',proof:'Intent Resolution reconhece a solicitação correta.',risk:'Misturar pergunta informativa e autorização para movimentar valores.'},
        {title:'Buscar regras vigentes',actor:'Foundry IQ / RAG',what:'A recuperação busca a política atualizada em fontes permitidas e devolve trechos citáveis.',proof:'Retrieval e Groundedness confirmam relevância e apoio documental.',risk:'Responder com uma política antiga ou sem citação.'},
        {title:'Consultar pedido real',actor:'MCP / API transacional',what:'O modelo solicita consultar_pedido; o backend verifica a identidade e executa a função.',proof:'Tool Call Accuracy verifica ferramenta e parâmetros adequados.',risk:'O modelo inventar o estado atual de um pedido sem consulta.'},
        {title:'Consolidar pareceres',actor:'Agent Framework',what:'Se necessário, especialistas financeiro e jurídico avaliam partes do problema; a orquestração combina resultados.',proof:'Dependências são respeitadas; concorrência só onde tarefas são independentes.',risk:'Executar em paralelo tarefas que precisam de resultados anteriores.'},
        {title:'Pedir autorização',actor:'Human-in-the-loop',what:'Se a solicitação implicar reembolso, pause antes da chamada que altera valores.',proof:'Operação sensível só ocorre após permissão real e aprovação exigida.',risk:'Acreditar que require_approval substitui autorização na API.'},
        {title:'Avaliar e responder',actor:'Model + Evaluators',what:'Produza resposta explicativa e citada; acompanhe tokens, custo, groundedness e conclusão.',proof:'Resposta reproduzível, aderente à tarefa e com telemetria.',risk:'Confundir fluência da resposta com correção factual.'}
      ],
      checkpoint:{q:'Três especialistas analisam independentemente a mesma transação e um agregador reúne pareceres. Qual padrão?',options:['Sequencial','Concorrente','Handoff'],answer:1,why:'Agentes independentes podem executar em paralelo e ter saídas agregadas posteriormente.'},
      guides:[
        {title:'Construindo aplicações generativas',type:'Aplicação',desc:'Endpoints, SDK, Responses API, RAG e avaliação de aplicações.',tags:['azure-ai-projects','Responses API','Groundedness'],points:['O endpoint do projeto integra recursos Foundry; o endpoint OpenAI prioriza compatibilidade.','responses.create() gera uma resposta no cliente compatível; o aplicativo gerencia o contexto conforme a API.','Retrieval avalia a busca, Groundedness avalia a fidelidade ao conteúdo recuperado.'],ask:'Como corrigir um RAG que recuperou o documento certo, mas inventou uma cláusula?'},
        {title:'Agentes com ferramentas e conhecimento',type:'Integração',desc:'Function Calling, Azure Functions, OpenAPI, MCP, Foundry IQ e publicação.',tags:['MCP','OpenAPI','allowed_tools','Foundry IQ'],points:['No Function Calling, o modelo pede a execução; a aplicação realiza a função.','Uma lista allowed_tools vazia não restringe por si só todas as ferramentas; configure explicitamente.','MCP conecta capacidades; Foundry IQ conecta conhecimento; Azure Bot Service integra publicação ao Teams.'],ask:'Como dar ao agente acesso de leitura via MCP sem permitir que faça pagamentos?'},
        {title:'Workflows e multiagentes',type:'Coordenação',desc:'Agent Framework, sequencial, concorrente, grupo, handoff, Magentic e HITL.',tags:['Agent Framework','Handoff','Magentic','HITL'],points:['Sequencial depende do anterior; concorrente agrega tarefas independentes.','Handoff transfere responsabilidade; chat em grupo favorece discussão; Magentic planeja dinamicamente.','Aprovação humana e avaliação de Tool Call Accuracy precisam fazer parte do fluxo.'],ask:'Qual orquestração combina avaliação paralela e aprovação humana ao final?'},
        {title:'Otimização e operação',type:'Observabilidade',desc:'Temperatura, top_p, few-shot, autocrítica, Model Router, traces e regras.',tags:['Model Router','SSML','Tracing','Few-shot'],points:['Temperatura e top_p ajustam variedade onde suportados; evite mexer nos dois simultaneamente.','Balanced equilibra custo e qualidade; Cost prioriza economia; Quality prioriza desempenho.','Use funções para regras determinísticas e traces para identificar gargalos e falhas.'],ask:'Como manter baixo custo quando a maioria das solicitações é simples, mas algumas exigem análise profunda?'}
      ],
      docs:[['Microsoft Agent Framework','https://learn.microsoft.com/pt-br/agent-framework/overview/'],['Ferramentas MCP','https://learn.microsoft.com/pt-br/azure/foundry/agents/how-to/tools/model-context-protocol']]
    },
    {
      id:3,slug:'visao',short:'Visão',name:'Visão computacional e conteúdo visual',weight:'10–15%',color:'#ecaa75',label:'SENSORES · VISÃO E VÍDEO',
      subtitle:'O mesmo sistema pode criar imagens, interpretar imagens existentes ou auditar sua segurança.',
      analogy:'Câmeras, instrumentos de leitura, estação de inspeção e selo de procedência.',
      question:'Como criar, analisar e publicar imagens ou vídeos com segurança, preservando fontes e distinguindo geração de compreensão?',
      nodes:[
        {id:'media',x:28,y:180,name:'Texto / Mídia',tag:'ENTRADA',detail:'Um prompt pode pedir geração, enquanto uma imagem ou vídeo existente pode exigir compreensão ou edição.',input:'Prompt, imagem ou vídeo',output:'Pedido classificado'},
        {id:'policy',x:302,y:46,name:'Content Safety',tag:'TRIAGEM',detail:'Moderação pode analisar riscos de entrada e saída. Imagens externas podem ser classificadas por categoria e severidade.',input:'Texto e imagem',output:'Risco e decisão de política'},
        {id:'route',x:302,y:180,name:'Tipo de tarefa',tag:'DESVIO',detail:'Separar geração, inpainting, remix e compreensão antes de selecionar modelos e APIs.',input:'Objetivo do usuário',output:'Modalidade correta'},
        {id:'image',x:576,y:46,name:'GPT-Image',tag:'GERAR / EDITAR',detail:'Text-to-image, múltiplas variações e edição por máscara. input_fidelity busca preservar características da entrada quando suportado.',input:'Prompt e imagem/máscara',output:'Imagem criada ou editada'},
        {id:'sora',x:576,y:180,name:'Sora / Vídeo',tag:'ANIMAR',detail:'Geração de vídeo assíncrona, imagem para vídeo e remix de vídeo gerado; acompanha status antes de baixar.',input:'Prompt ou referência',output:'Trabalho e vídeo final'},
        {id:'vision',x:576,y:315,name:'Visão / CU',tag:'COMPREENDER',detail:'Modelo multimodal responde perguntas; Content Understanding extrai texto, cenas e campos estruturados.',input:'Imagem/vídeo existente',output:'Legenda, JSON, transcrição'},
        {id:'shield',x:850,y:46,name:'Prompt Shields',tag:'ATAQUES',detail:'Texto malicioso em imagem/documento é dado não confiável, não ordem para o sistema.',input:'Texto externo extraído',output:'Sinalização de prompt injection'},
        {id:'proof',x:850,y:180,name:'Procedência',tag:'VALIDAR',detail:'Content Credentials/C2PA, quando suportadas, verificam assinaturas de procedência; não provam que a cena aconteceu.',input:'Arquivo e manifesto',output:'Informação de origem verificável'}
      ],
      edges:[['media','route'],['policy','route','dashed'],['route','image'],['route','sora'],['route','vision'],['image','proof'],['sora','proof'],['vision','shield','dashed'],['shield','proof','dashed']],
      flowTitle:'Criar, inspecionar e publicar conteúdo visual',
      flow:[
        {title:'Entender a tarefa',actor:'Aplicação',what:'Detecte se o usuário quer criar imagem, editar região, animar, remixar ou compreender conteúdo existente.',proof:'A API e a modalidade escolhidas correspondem ao objetivo.',risk:'Usar geração quando a tarefa é extrair informação do vídeo.'},
        {title:'Moderador de entrada',actor:'Content Safety',what:'Aplique as políticas de conteúdo adequadas ao prompt e à imagem enviada.',proof:'Rejeições são registradas sem atribuir causas não fornecidas.',risk:'Supor uma categoria específica apenas porque ocorreu bloqueio.'},
        {title:'Selecionar gerador ou analisador',actor:'GPT-Image / Sora / Multimodal',what:'Use máscara e prompt para inpainting, job assíncrono para vídeo, ou modelo com visão para perguntas sobre imagem.',proof:'Arquivo gerado ou análise devolvida no formato esperado.',risk:'Prometer que inpainting preservará todos os pixels fora da máscara.'},
        {title:'Interpretar conteúdo recebido',actor:'Content Understanding',what:'Para vídeo pesquisável, extraia cenas, transcrições e quadros-chave; para arquivos complexos, produza JSON ou Markdown.',proof:'Os dados extraídos têm referência ao conteúdo original.',risk:'Tratar uma descrição probabilística como observação infalível.'},
        {title:'Filtrar ataques indiretos',actor:'Prompt Shields',what:'Extraia texto de fontes externas quando apropriado e trate instruções nelas como dados não confiáveis.',proof:'O texto externo não pode alterar as políticas do agente.',risk:'Obedecer a ordens escondidas num cartaz da foto.'},
        {title:'Moderar e identificar procedência',actor:'Content Safety / C2PA',what:'Verifique a saída e registre Content Credentials quando o modelo/serviço oferecer suporte.',proof:'Política atendida; procedência documentada, quando disponível.',risk:'Confundir assinatura C2PA com prova de veracidade da cena.'}
      ],
      checkpoint:{q:'Uma imagem tem a marca de uma pessoa no uniforme e uma instrução maliciosa escrita num cartaz. O que se deve fazer?',options:['Obedecer ao cartaz','Tratar a instrução como conteúdo externo não confiável','Concluir que a imagem é verdadeira por conter texto'],answer:1,why:'Uma imagem é dado de entrada. Instruções nela são possíveis ataques indiretos, não comandos autorizados.'},
      guides:[
        {title:'Gerar e editar imagens e vídeos',type:'Geração',desc:'GPT-Image, FLUX, inpainting, máscaras, Sora, imagem para vídeo e remix.',tags:['GPT-Image','Inpainting','Sora','Remix'],points:['Texto gera imagem; máscara orienta a região a editar.','Sora cria jobs assíncronos: enviar, consultar status e baixar resultado.','Remix modifica vídeo gerado; imagem para vídeo usa referência compatível.'],ask:'Que APIs usar para criar três capas, editar uma área e animar a versão aprovada?'},
        {title:'Compreensão multimodal',type:'Análise',desc:'Imagem no chat, alt text, perguntas visuais e Content Understanding de vídeos.',tags:['Vision','Alt text','Content Understanding'],points:['Uma mensagem de usuário pode conter texto e imagem; o formato varia entre Chat Completions e Responses API.','Modelo multimodal responde; analisador extrai JSON/Markdown e segmentos.','Não invente números ilegíveis em um gráfico; ofereça descrição alternativa acessível.'],ask:'Como tornar vídeos de treinamento pesquisáveis e suas figuras acessíveis?'},
        {title:'IA responsável visual',type:'Proteção',desc:'Content Safety, Prompt Shields, categorias personalizadas e C2PA.',tags:['Content Safety','Prompt Injection','C2PA'],points:['Content Safety classifica danos; Prompt Shields busca manipulação por instruções.','C2PA registra procedência assinada quando suportada; não atesta realidade factual.','Regras de marca específicas podem exigir detecção visual adicional.'],ask:'Como detectar um ataque indireto escondido numa imagem e provar a procedência declarada do resultado?'}
      ],
      docs:[['Modelos GPT-Image','https://learn.microsoft.com/pt-br/azure/foundry/openai/how-to/dall-e'],['Content Understanding vídeo','https://learn.microsoft.com/pt-br/azure/ai-services/content-understanding/video/overview']]
    },
    {
      id:4,slug:'texto-fala',short:'Texto & fala',name:'Análise de texto, fala e tradução',weight:'10–15%',color:'#6ad2b2',label:'INTERFACE · VOZ E LINGUAGEM',
      subtitle:'Transforme fala em informação, informação em decisão e texto em voz — com limites de privacidade.',
      analogy:'Microfone e alto-falante são sensores e atuadores; Language e Translator interpretam o sinal.',
      question:'Como atender pessoas em vários idiomas por voz, proteger dados pessoais e consultar APIs com auditoria?',
      nodes:[
        {id:'audio',x:28,y:180,name:'Voz / Texto',tag:'ENTRADA',detail:'O cliente pode falar ao microfone ou enviar uma mensagem escrita; o fluxo depende da necessidade de registro e latência.',input:'Áudio ou texto',output:'Mensagens e contexto'},
        {id:'speech',x:302,y:46,name:'Azure Speech',tag:'TRANSCRIÇÃO',detail:'Real-time, Fast e Batch Transcription. Custom Speech pode adaptar reconhecimento a vocabulário específico.',input:'Áudio',output:'Texto e timestamps'},
        {id:'live',x:302,y:180,name:'Voice Live',tag:'CONVERSAÇÃO',detail:'Sessões e eventos de áudio com baixa latência, turn detection e suporte a interrupções. WebSocket e opções como WebRTC.',input:'Fluxo contínuo de áudio',output:'Eventos e áudio de resposta'},
        {id:'language',x:576,y:46,name:'Azure Language',tag:'ENTENDER',detail:'Identificação de idioma, entidades nomeadas e dados pessoais; resultados podem alimentar regras de fluxo.',input:'Texto ou transcrição',output:'Idioma, NER e PII'},
        {id:'agent',x:576,y:180,name:'Agente + MCP',tag:'AÇÃO',detail:'O agente consulta ferramentas autorizadas; tradução e compreensão podem ser combinadas com dados do domínio.',input:'Intent e contexto',output:'Resposta fundamentada'},
        {id:'translate',x:576,y:315,name:'Translator',tag:'IDIOMAS',detail:'Speech Translation traduz áudio. Live Interpreter lida com alternância de idiomas e interpretação natural.',input:'Fala/texto original',output:'Texto/áudio traduzido'},
        {id:'tts',x:850,y:180,name:'TTS / SSML',tag:'SAÍDA',detail:'Sintetiza voz e ajusta pausas, velocidade e pronúncia. Voz personalizada exige consentimento e acesso permitido.',input:'Texto de resposta',output:'Voz sintetizada'},
        {id:'audit',x:850,y:46,name:'Auditoria',tag:'PRIVACIDADE',detail:'Redação de PII, autorização e retenção protegida evitam expor dados do cliente em logs e transcrições.',input:'Logs e transcrições',output:'Histórico protegido'}
      ],
      edges:[['audio','speech'],['audio','live'],['speech','language'],['live','agent'],['language','agent'],['language','audit','dashed'],['agent','tts'],['translate','tts'],['agent','translate']],
      flowTitle:'Atendimento multilíngue por voz',
      flow:[
        {title:'Abrir a sessão',actor:'Voice Live / Client',what:'Configure endpoint, credencial e sessão de áudio. Em modo gerenciado, selecione modelo e voz compatíveis.',proof:'Há sessão ativa com troca de eventos e autenticação válida.',risk:'Expor chave do serviço diretamente no frontend.'},
        {title:'Ouvir e identificar turnos',actor:'VAD / Speech',what:'Supressão de ruído, cancelamento de eco e detecção de término ajudam a manter conversa natural.',proof:'O usuário consegue interromper sem eco ou cortes recorrentes.',risk:'Confundir VAD com detecção de idioma.'},
        {title:'Extrair texto e proteger PII',actor:'Speech + Language',what:'Se houver necessidade de auditoria textual, transcreva e detecte dados pessoais antes de compartilhar/logar.',proof:'Transcrição legível e acessos controlados.',risk:'Persistir números e dados sensíveis sem finalidade ou proteção.'},
        {title:'Consultar informações autorizadas',actor:'Agente + MCP',what:'O agente seleciona ferramenta adequada; o backend autentica e limita a operação.',proof:'A consulta devolve somente os dados que o usuário pode ver.',risk:'Atribuir ferramentas de escrita ao agente que precisa somente consultar.'},
        {title:'Traduzir quando necessário',actor:'Speech Translation / Interpreter',what:'Escolha tradução de fala com idiomas definidos ou interpretação com alternância dinâmica de idiomas.',proof:'A tradução mantém intenção e idioma esperado.',risk:'Assumir que a tecnologia traduz perfeitamente jargões sem validação.'},
        {title:'Responder naturalmente',actor:'TTS / SSML / Voice Live',what:'Gere voz no idioma adequado, respeitando pausas, estilo e política de consentimento.',proof:'Resposta auditável, compreensível e sem uso indevido de voz personalizada.',risk:'Clonar voz real sem declaração de consentimento e acesso aprovado.'}
      ],
      checkpoint:{q:'Uma equipe vai transcrever 25 mil chamadas gravadas sem urgência de resposta imediata. Qual modalidade?',options:['Real-time Transcription','Batch Transcription','Text-to-Speech'],answer:1,why:'Batch Transcription processa grandes conjuntos de áudio previamente gravado de forma assíncrona.'},
      guides:[
        {title:'Análise de texto com Azure Language',type:'Texto',desc:'Language Detection, NER, PII, sentimento, JSON Schema e Azure Translator.',tags:['NER','PII','Translator','Structured Outputs'],points:['NER reconhece entidades; PII identifica dados pessoais a proteger.','Structured Outputs com JSON Schema controla o contrato de saída quando suportado.','Traduzir muitos arquivos pede fluxo em lote; terminologia especializada pode exigir glossário ou personalização.'],ask:'Como montar uma central internacional que traduz reclamações sem revelar dados pessoais?'},
        {title:'Fala no aplicativo e no agente',type:'Speech',desc:'Speech-to-Text, Text-to-Speech, Custom Speech, SSML e avaliação de pronúncia.',tags:['STT','TTS','Custom Speech','SSML'],points:['Real-time recebe áudio ao vivo; Fast transcreve arquivo gravado; Batch atende volume.','Custom Speech melhora reconhecimento especializado; SSML ajusta a voz de saída.','Pronunciation Assessment avalia a fala de quem aprende um idioma.'],ask:'Quando escolher STT → LLM → TTS em vez de áudio direto para um agente?'},
        {title:'Voz em tempo real e tradução',type:'Live',desc:'Voice Live, WebSocket, VAD, Live Interpreter e voz personalizada.',tags:['Voice Live','WebSocket','Live Interpreter'],points:['Voice Live reúne áudio, modelo e voz em interface gerenciada.','VAD detecta turnos; Echo Cancellation reduz o retorno do alto-falante.','Custom Voice requer autorização, consentimento gravado e acesso apropriado.'],ask:'Como manter uma conversa multilíngue fluida e protegida com acesso a APIs financeiras?'}
      ],
      docs:[['Azure Speech','https://learn.microsoft.com/pt-br/azure/ai-services/speech-service/overview'],['Voice Live','https://learn.microsoft.com/pt-br/azure/ai-services/speech-service/voice-live']]
    },
    {
      id:5,slug:'extracao',short:'Busca & extração',name:'Indexação, recuperação e extração de informação',weight:'10–15%',color:'#f2c46c',label:'CIRCUITO · CONHECIMENTO',
      subtitle:'O caminho completo: de um PDF escaneado a uma resposta verificável com citações.',
      analogy:'Da oficina de montagem ao sistema de frenagem: ingestão prepara peças, recuperação as aciona.',
      question:'Como receber contratos escaneados, indexá-los, pesquisar cláusulas por código e significado, e devolver respostas citáveis?',
      nodes:[
        {id:'blob',x:28,y:180,name:'Blob Storage',tag:'FONTE',detail:'Armazena PDFs, contratos e arquivos. Alterações/exclusões exigem políticas adequadas de atualização.',input:'Arquivos e metadados',output:'Documentos para ingestão'},
        {id:'cu',x:302,y:46,name:'Content Under.',tag:'INTERPRETAR',detail:'Extrai campos multimodais, Markdown e estrutura de documentos. Document Intelligence usa modelos prontos ou personalizados.',input:'Documento, áudio, vídeo',output:'Campos, layout e conteúdo'},
        {id:'indexer',x:302,y:180,name:'Indexer',tag:'EXTRAIR',detail:'Executa a ingestão; associa fonte, índice e skillset, com possibilidade de agendamento.',input:'Documentos da origem',output:'Documentos enriquecidos'},
        {id:'skillset',x:576,y:46,name:'OCR + Skillset',tag:'ENRIQUECER',detail:'Normalizar imagens, OCR, Text Merge, Text Split e embedding skill preparam chunks recuperáveis.',input:'Texto e imagens',output:'Trechos vetorizados'},
        {id:'index',x:576,y:180,name:'Search Index',tag:'ARMAZENAR',detail:'Armazena campos textuais e vetoriais para consulta, filtragem e ordenação. Projeções de índice criam documentos por chunk.',input:'Chunks e metadados',output:'Documentos pesquisáveis'},
        {id:'query',x:850,y:46,name:'Hybrid + RRF',tag:'CONSULTAR',detail:'BM25 busca termos; vetores representam significado; RRF combina rankings e Semantic Ranker reordena candidatos.',input:'Pergunta e vectorizer',output:'Resultados relevantes'},
        {id:'kb',x:850,y:180,name:'Foundry IQ',tag:'COORDENAR',detail:'Knowledge Base conecta fontes; recuperação agêntica decompõe questões complexas e oferece trechos com citações.',input:'Pergunta e fontes',output:'Evidências e referências'},
        {id:'answer',x:850,y:315,name:'Agente RAG',tag:'RESPONDER',detail:'Gera resposta com contexto; groundedness e checagem de permissão são essenciais.',input:'Trechos e pergunta',output:'Resposta citada'}
      ],
      edges:[['blob','indexer'],['cu','skillset','dashed'],['indexer','skillset'],['indexer','index'],['skillset','index'],['index','query'],['query','kb'],['kb','answer']],
      flowTitle:'Um contrato escaneado vira resposta fundamentada',
      flow:[
        {title:'Receber e classificar',actor:'Blob / Document Intelligence',what:'Armazene o contrato e identifique documento, metadados, versão e permissões; determine o tipo de analisador.',proof:'Arquivo localizado, classificado e com rastreabilidade.',risk:'Perder informação de versão e permissão na ingestão.'},
        {title:'Extrair conteúdo',actor:'Content Understanding / OCR',what:'Interprete PDF escaneado, tabelas e figuras; escolha layout ou campos estruturados para automação.',proof:'Texto, JSON/Markdown e evidências de origem podem ser conferidos.',risk:'Presumir que todo campo e modalidade têm confidence score disponível.'},
        {title:'Enriquecer e dividir',actor:'Indexer + Skillset',what:'Normalize imagens, aplique OCR, Text Merge, Text Split e projeções.',proof:'Cada chunk mantém vínculo com contrato, página e permissões.',risk:'Perder cabeçalhos de tabela ou deixar documentos revogados no índice.'},
        {title:'Gerar embeddings e indexar',actor:'Embedding Skill + Search Index',what:'Vetorize chunks e salve em campos compatíveis; configure o vectorizer da consulta com mesmo espaço de embeddings.',proof:'Busca vetorial funciona com dimensões e modelo compatíveis.',risk:'Misturar modelos de embeddings incompatíveis entre ingestão e consulta.'},
        {title:'Recuperar com híbrida',actor:'BM25 + Vetores + RRF',what:'Compare termos exatos e significado; combine resultados com RRF e reordene por semântica.',proof:'Cláusula correta aparece entre os candidatos com metadados de origem.',risk:'Confundir Semantic Ranker com busca em todo o acervo.'},
        {title:'Grounding e resposta',actor:'Foundry IQ + Agente',what:'Busque nas fontes autorizadas e entregue evidências ao agente para resposta com citações.',proof:'Groundedness, relevância e autorização estão validadas.',risk:'Gerar resposta de contrato que o usuário não pode acessar.'}
      ],
      checkpoint:{q:'Um contrato tem o código exato X-493, mas também precisa ser encontrado por perguntas em linguagem natural. Qual consulta usar?',options:['Apenas OCR','Busca híbrida e, quando adequado, Semantic Ranker','Somente Knowledge Store'],answer:1,why:'Busca híbrida une BM25 (termos exatos) com vetores (significado); Semantic Ranker reordena candidatos.'},
      guides:[
        {title:'Indexação e enriquecimento',type:'Ingestão',desc:'Data Source, Indexer, Skillset, OCR, chunks, embeddings e Knowledge Store.',tags:['Indexer','Skillset','OCR','Knowledge Store'],points:['Indexer executa; Skillset transforma; Index armazena conteúdo pesquisável.','OCR lê imagens; Merge junta; Split divide; embedding vetoriza; index projection grava chunks.','Knowledge Store é armazenamento opcional de enriquecimento para análise externa, não a busca principal.'],ask:'Como transformar 5 mil PDFs escaneados em um índice atualizado e seguro?'},
        {title:'Busca lexical, vetorial e híbrida',type:'Recuperação',desc:'BM25, RRF, Semantic Ranker, agentes Search Tool e Foundry IQ.',tags:['BM25','RRF','Semantic Ranker','Foundry IQ'],points:['Lexical usa termos; vetorial usa proximidade; híbrida combina rankings via RRF.','Semantic Ranker reordena até 50 candidatos e pode gerar captions/answers extrativas.','Knowledge Base coordena várias Knowledge Sources e recuperação agêntica.'],ask:'Como combinar códigos exatos e significado de cláusulas sem expor contratos alheios?'},
        {title:'Content Understanding e Document Intelligence',type:'Extração',desc:'Extrair/classificar/gerar, templates, neural, modelos compostos e analyzers.',tags:['Content Understanding','Document Intelligence','Template','Neural'],points:['Content Understanding interpreta conteúdos e permite esquema de campos em linguagem natural.','Document Intelligence tem análise, predefinidos e personalizados: Template para layout estável; Neural para variável.','prebuilt-documentSearch prepara Markdown com figuras para RAG; confiança não dispensa revisão.'],ask:'Quando usar modelo predefinido, Custom Neural ou Content Understanding personalizado?'}
      ],
      docs:[['Azure AI Search','https://learn.microsoft.com/pt-br/azure/search/search-what-is-azure-search'],['Content Understanding','https://learn.microsoft.com/pt-br/azure/ai-services/content-understanding/overview']]
    }
  ],
  integration: {
    title: 'Receber contrato, responder por voz, auditar decisão',
    steps: [
      {title:'Entrada',actor:'Voice Live / App',text:'O usuário envia voz, texto ou contrato. O canal autentica e define a sessão.',domain:4},
      {title:'Identidade',actor:'Entra ID / RBAC',text:'Autentica usuário e serviços. O backend aplica as regras efetivas de autorização.',domain:1},
      {title:'Compreensão',actor:'Content Understanding / Document Intelligence',text:'Extrai texto, tabelas, cláusulas e campos; atribui metadados de origem e de revisão.',domain:5},
      {title:'Ingestão',actor:'Indexer + Skillset',text:'Faz OCR, Text Split, embeddings, armazenamento dos chunks e atualização por versão.',domain:5},
      {title:'Recuperação',actor:'Azure AI Search + Foundry IQ',text:'Executa busca híbrida, RRF, Semantic Ranker e recupera fontes acessíveis ao usuário.',domain:5},
      {title:'Ferramentas',actor:'MCP / OpenAPI / Backend',text:'Consulta dados transacionais reais usando identidade e validação independente do modelo.',domain:2},
      {title:'Orquestração',actor:'Agent Framework',text:'Coordena especialistas e regras; exige revisão humana para ações sensíveis.',domain:2},
      {title:'Proteção',actor:'Content Safety / Prompt Shields / PII',text:'Modera entradas, examina conteúdo não confiável e limita dados pessoais.',domain:1},
      {title:'Resposta',actor:'Modelo + TTS / Voice Live',text:'Produz resposta fundamentada, com fonte e voz se o canal exigir.',domain:4},
      {title:'Observação',actor:'Application Insights + Evaluations',text:'Registra traces seguros, custos, latência, groundedness e falhas para melhoria contínua.',domain:1}
    ],
    answer: [
      ['Ingestão e compreensão','Content Understanding interpreta documentos complexos; Document Intelligence processa layouts e modelos de campos específicos. Nenhum dos dois é o mecanismo principal de busca lexical.'],
      ['Indexação e recuperação','Azure AI Search armazena chunks e vetores; usa BM25, busca vetorial, RRF e Semantic Ranker. Foundry IQ organiza fontes e recuperações para múltiplos agentes.'],
      ['Agentes e regras','Agent Framework coordena etapas e especialistas; MCP expõe ações permitidas; o backend valida dados transacionais, autorização e regras determinísticas.'],
      ['Voz e idiomas','Voice Live mantém conversa de baixa latência; Azure Speech e Language auxiliam transcrição, PII e linguagem. Tradução entra apenas quando necessária.'],
      ['Segurança e operação','Entra ID e RBAC limitam privilégios; guardrails e Prompt Shields tratam riscos de conteúdo; aprovação humana controla ações sensíveis; Application Insights e avaliadores monitoram qualidade e custo.']
    ]
  }
};
