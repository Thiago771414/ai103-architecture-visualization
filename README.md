# Atlas AI-103 — Engenharia de Sistemas Inteligentes

Site estático e interativo para estudar os **cinco domínios e 17 guias da Microsoft AI-103**, combinando desenhos técnicos de locomotivas, arquitetura de software e **simulações de projeto de agentes**. Esta é a **versão 3.0 — From Mechanical Logic to Agentic Intelligence**; mantém os recursos da v1 e v2 e acrescenta história da computação e laboratório GoF.

## Novidade na versão 3.0 — Evolução & GoF

Acesse `#evolucao` para percorrer **oito estações conceituais/históricas**, da mecânica à IA agêntica, incluindo Bombe, Colossus, Pilot ACE, o jogo da imitação de Turing, Gang of Four e sistemas distribuídos. A planta de cinco camadas preserva o esquema fornecido como inspiração. Não se trata de cronologia exaustiva nem genealogia direta.

Em `#padroes`, explore **10 dos 23 padrões clássicos**: Builder, Adapter, Facade, Proxy, Strategy, Mediator, Chain of Responsibility, Command, Observer e Template Method. Cada ficha traz UML de classes simplificado, arquitetura de IA análoga, etapas com destaque sincronizado, critérios de uso e de não uso, limites da analogia e um desafio com correção explicada. Há filtro por categoria, busca textual, exportação SVG dos dois diagramas e progresso independente salvo no navegador.

A relação GoF–IA é uma interpretação didática, não uma equivalência oficial dos produtos Microsoft. A bibliografia do módulo reúne fontes do National Museum of Computing, Turing, GoF, Gentner, NASA e Microsoft Learn. A simulação não executa agentes ou serviços reais.

### Arquivos novos

- `assets/patterns-data.js`: dez fichas de padrões, diagramas, etapas e checkpoints.
- `assets/patterns.js`: estações históricas, renderização dos diagramas, navegação e avaliação.
- `assets/patterns.css`: estilos responsivos do módulo.
- `assets/abstraction-original.svg`: referência conceitual fornecida, também incorporada à página.

Chaves de armazenamento das versões anteriores foram mantidas; o novo progresso usa `atlas-ai103-patterns-v3`. Não apague `.git` nem o armazenamento do navegador ao atualizar.

## Bancada de Arquitetura da versão 2.0

No endereço `#simulador`, escolha uma de **3 situações fictícias**:

1. **Contratos, voz e reembolsos** — PDFs variados, consultas auditáveis, áudio gravado e autorização de pagamentos.
2. **Sinistros com fotos e conversa ao vivo** — imagens, vídeo, Voice Live, picos de demanda e avaliação humana.
3. **Oficina de freios pneumáticos** — esquemas ferroviários, jargão de manutenção, busca em manuais e limites de segurança física.

Para cada cenário, escolha **6 camadas**: planejamento/implantação (D1), agentes (D2), visão (D3), texto e fala (D4), busca e extração (D5), segurança e governança transversal. São **18 decisões e 54 alternativas técnicas**.

**Como funciona:** escolha os componentes → observe a planta SVG atualizar → clique **Executar bancada** → percorra as seis etapas → receba um **laudo individualizado** com uma das três classificações (**econômico e frágil**, **superdimensionado**, **adequado**), comparando cada escolha com a arquitetura recomendada para aquele problema. O laudo pode ser copiado em Markdown.

**Limites:** são casos fictícios e heurísticas pedagógicas. As faixas qualitativas de custo, latência, esforço e risco **não são medições ou cotações do Azure**, não reproduzem preços atuais e não substituem benchmarks, avaliação de segurança ou testes em ambiente real. O código não chama serviços Azure.

As seleções ficam registradas em `localStorage` no próprio navegador, por caso, sem conta e sem transmissão de dados.

## O que inclui

- **5 plantas estruturais interativas** (clique nos módulos para ver responsabilidade, entrada e saída).
- **5 circuitos operacionais** de seis etapas, com sinais de validação e modos de falha.
- **1 sistema integrado** com dez etapas combinando os cinco domínios.
- **17 fichas de revisão**, organizadas nos domínios 4 + 4 + 3 + 3 + 3.
- **5 checkpoints** com correção imediata.
- **3 bancadas práticas com 6 decisões cada**, circuito de execução e diagnóstico comparativo.
- **Perguntas de arquitetura**, busca local, exportação de cada planta para SVG e progresso salvo no navegador.
- Interface responsiva e recursos de acessibilidade, incluindo navegação por teclado e suporte a redução de movimento.

Não utiliza React, Node, banco de dados, APIs externas, chave de Azure ou serviços pagos. Todos os arquivos são entregues estaticamente. Nenhum dado de pesquisa ou progresso é enviado para servidores; o navegador utiliza `localStorage` para registrar as marcações de revisão.

## Estrutura

```text
ai103-atlas-github-pages/
├── .nojekyll
├── index.html
├── README.md
└── assets/
    ├── favicon.svg
    ├── styles.css
    ├── data.js
    ├── app.js
    ├── simulator.css
    ├── simulator-data.js
    └── simulator.js
```

## Publicação no GitHub Pages — pelo navegador

1. Crie um repositório no GitHub, por exemplo `atlas-ai103`.
2. Extraia o arquivo ZIP. Envie **o conteúdo de dentro** da pasta `ai103-atlas-github-pages/` para a **raiz** do repositório. O arquivo `index.html` deve ficar na raiz, ao lado de `assets/` e `.nojekyll`.
3. Confirme o commit na branch `main`.
4. Abra **Settings → Pages** no repositório.
5. Na seção **Build and deployment**, escolha **Deploy from a branch**.
6. Selecione **Branch: main** e **Folder: /(root)**; salve.
7. Após a publicação, o endereço será, em geral, `https://SEU-USUARIO.github.io/atlas-ai103/` (substitua os valores). O link real aparece na página **Settings → Pages**.

O site usa caminhos relativos (`assets/...`), por isso funciona tanto em repositório de projeto quanto no domínio principal de GitHub Pages.

Referência oficial: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

### Alternativa: Git via terminal

```bash
git init
git add .
git commit -m "feat: atlas interativo AI-103"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/atlas-ai103.git
git push -u origin main
```

> Crie o repositório vazio primeiro e substitua `SEU-USUARIO` pelo seu identificador. Os comandos não são necessários se optar pelo upload no navegador.

## Alternativa: um único arquivo HTML

Também foi entregue, separadamente, `atlas-ai103-v3-arquivo-unico.html`. Ele incorpora todo o CSS, todos os dados e toda a lógica JavaScript. Você pode abri-lo diretamente no navegador ou renomeá-lo para `index.html` e publicá-lo **sozinho**, na raiz do repositório. É a opção mais simples para experimentar rapidamente e não exige a pasta `assets/`.

## Como abrir localmente

Abra `index.html` diretamente no navegador (duplo clique). Não há etapa de `npm install` ou `npm run build`.

Para simular um servidor local, opcionalmente execute, dentro da pasta do projeto:

```bash
python -m http.server 8000
```

E acesse `http://localhost:8000/`.

## Como personalizar

- **`assets/data.js`** — textos, módulos, perguntas, fluxos, links oficiais e os 17 guias. Edite este arquivo para atualizar conteúdo sem alterar o mecanismo visual.
- **`assets/styles.css`** — cores, espaçamentos, telas menores e aparência de esquemas técnicos.
- **`assets/app.js`** — interações, progresso, SVG, busca, checkpoints e etapas do circuito.
- **`index.html`** — estrutura geral, introdução e rodapé.

Cada domínio possui `nodes` (componentes da planta), `edges` (conexões), `flow` (etapas operacionais), `checkpoint` e `guides`.

Os componentes de `nodes` são posicionados no SVG em coordenadas 2D (`x`,`y`), e a largura/altura são administradas pelo `app.js`. Evite adicionar dependências circulares nos desenhos sem ajustar o caminho das conexões.

## Escopo e precisão

Este é um **material educacional independente**, construído a partir dos 17 guias estudados nesta conversa, e não é um portal oficial nem reprodução do exame da Microsoft. As plantas simplificam a arquitetura para estudo: suas linhas indicam dependências **conceituais**, não a rede de uma implantação real. Serviços de IA e disponibilidade de recursos podem mudar; consulte sempre a documentação Microsoft Learn antes de implementar um ambiente de produção.

Pesos de domínio usados conforme o material do curso: 25–30%, 30–35%, 10–15%, 10–15% e 10–15%.

## Licença de uso

Você pode copiar, editar e publicar o site em seu repositório. Mantenha os avisos sobre o caráter educacional e a necessidade de conferir documentação atualizada.

## Atualizar o repositório GitHub Pages já existente

O nome do repositório não precisa mudar: `ai103-architecture-visualization`.

1. Extraia `atlas-ai103-v3-github-pages.zip` numa **nova pasta temporária**.
2. Copie o **conteúdo** dessa pasta (incluindo `assets/`, `index.html`, `README.md` e `.nojekyll`) por cima dos arquivos da pasta local que você já usa com Git, como `Downloads\atlas-ai103-github-pages`. **Não remova a pasta `.git`** do repositório local.
3. Abra o PowerShell **na pasta Git já existente** e execute:

```powershell
git status
git add -A
git commit -m "feat: add history and GoF pattern laboratory v3"
git push origin main
```

4. Depois do deploy do GitHub Pages, abra `https://thiago771414.github.io/ai103-architecture-visualization/#simulador`. O mesmo link principal e os diagramas da v1 continuarão funcionando. O novo módulo fica em `#evolucao` e o laboratório em `#padroes`.

## Evolução

- **v1.0**: cinco plantas, cinco circuitos, 17 guias e sistema integrado.
- **v2.0**: três casos práticos, decisões de arquitetura, diagrama dinâmico, execução e laudo comparativo.

- **v3.0**: oito estações, dez padrões, vinte diagramas comparativos, desafios e fontes históricas e técnicas.
