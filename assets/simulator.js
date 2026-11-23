/* ATLAS AI-103 V2 · Bancada de arquitetura, 100% local e sem APIs externas. */
(() => {
  'use strict';
  const catalog = window.ATLAS_SIMULATOR_DATA?.scenarios;
  const host = document.getElementById('simulator-ui');
  if (!host || !Array.isArray(catalog) || catalog.length !== 3) return;
  const STORAGE_KEY = 'atlas-ai103-simulator-v2';
  const byId = id => document.getElementById(id);
  const esc = val => String(val ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const state = {active:0,choices:{},phases:{},runIndex:{}};
  try {
    const cached = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    for (const scene of catalog) {
      if (Array.isArray(cached[scene.id]) && cached[scene.id].length === 6) {
        state.choices[scene.id] = cached[scene.id].map((v,i) => Number.isInteger(v) && v>=0 && v<scene.stages[i].options.length?v:null);
      }
    }
  } catch (_) { /* storage may be unavailable */ }
  for (const scene of catalog) {
    state.choices[scene.id] ??= Array(6).fill(null);
    state.phases[scene.id] = 'build';
    state.runIndex[scene.id] = 0;
  }
  const scene = () => catalog[state.active];
  const choices = () => state.choices[scene().id];
  const phase = () => state.phases[scene().id];
  const save = () => { try {localStorage.setItem(STORAGE_KEY,JSON.stringify(state.choices));} catch (_) {} };
  const gradeNames = {lean:'Projeto econômico, porém frágil',heavy:'Projeto superdimensionado',ideal:'Arquitetura adequada ao cenário'};
  const gradeTags = {lean:'RISCO DE MANUTENÇÃO',heavy:'CUSTO + LATÊNCIA',ideal:'EQUILÍBRIO TÉCNICO'};
  const metricLabels = {cost:'Custo relativo',latency:'Latência fim a fim',maint:'Esforço operacional',risk:'Risco residual'};
  const gradeWords = {lean:'SIMPLIFICAÇÃO ARRISCADA',heavy:'EXCESSO DE COMPLEXIDADE',ideal:'ESCOLHA RECOMENDADA'};

  function evaluation() {
    const s=scene(), opts=s.stages.map((st,i)=>st.options[choices()[i]]);
    const counts={lean:0,heavy:0,ideal:0};
    for (const opt of opts) counts[opt.grade]++;
    const criticalIssue=s.stages.some((stage,i)=>stage.critical && opts[i].grade!=='ideal');
    let grade;
    if (counts.ideal>=5 && !criticalIssue) grade='ideal';
    else if (s.stages.some((st,i)=>st.critical && opts[i].grade==='lean')) grade='lean';
    else grade=counts.heavy>counts.lean?'heavy':'lean';
    const metrics={};
    for (const key of Object.keys(metricLabels)) metrics[key]=opts.reduce((sum,opt)=>sum+opt.metrics[key],0)/opts.length;
    return {opts,counts,grade,criticalIssue,metrics,score:Math.round(counts.ideal / 6 * 100)};
  }
  function barLevel(value){return value <1.67?'Baixo':value<2.34?'Moderado':'Alto'}
  function svgBlueprint(result) {
    const s=scene(), selected=choices();
    const positions=[[24,32],[300,32],[576,32],[576,212],[300,212],[24,212]];
    const W=226,H=100;
    const path=[[0,1],[1,2],[2,3],[3,4],[4,5]].map(([a,b])=>{
      const p=positions[a],q=positions[b];
      let d;
      if(a===2) d=`M ${p[0]+W/2} ${p[1]+H} V ${q[1]-6}`;
      else if(a>=3) d=`M ${p[0]-3} ${p[1]+H/2} H ${q[0]+W+6}`;
      else d=`M ${p[0]+W+3} ${p[1]+H/2} H ${q[0]-6}`;
      return `<path d="${d}"/>`;
    }).join('');
    const nodes=s.stages.map((st,i)=>{
      const [x,y]=positions[i],choice=selected[i],opt=choice===null?null:st.options[choice];
      const c=result?opt.grade:'neutral';
      const label=opt?.title??'AGUARDANDO MONTAGEM';
      const cut=label.length>33?label.slice(0,31)+'…':label;
      return `<g class="sim-svg-node ${c}"><title>${esc(st.title)}: ${esc(label)}</title><rect x="${x}" y="${y}" width="${W}" height="${H}" rx="8"/><text x="${x+14}" y="${y+24}" class="sim-svg-kicker">${esc(st.domain)}</text><text x="${x+14}" y="${y+49}" class="sim-svg-title">${esc(st.title)}</text><text x="${x+14}" y="${y+73}" class="sim-svg-value">${esc(cut)}</text><circle cx="${x+W-13}" cy="${y+14}" r="4" class="sim-svg-led"/></g>`;
    }).join('');
    return `<svg viewBox="0 0 826 358" role="img" aria-label="Planta do sistema com seis módulos, conectados em sequência da esquerda para a direita e depois em retorno"><defs><marker id="sim-arrow" markerWidth="7" markerHeight="7" refX="5.5" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 Z" fill="#39c6b9"/></marker></defs><g class="sim-svg-edges" marker-end="url(#sim-arrow)">${path}</g>${nodes}<text x="24" y="346" class="sim-svg-foot">ATLAS / PROJETO ${esc(s.code.split(' ')[1])} · DIAGRAMA DIDÁTICO</text><text x="600" y="346" class="sim-svg-foot">NÃO EM ESCALA</text></svg>`;
  }
  function renderCases() {
    byId('simulator-case-nav').innerHTML=catalog.map((s,i)=>{
      const count=state.choices[s.id].filter(x=>x!==null).length;
      return `<button type="button" class="sim-case ${state.active===i?'active':''}" data-sim-case="${i}" aria-pressed="${state.active===i}"><span class="sim-case-no">${esc(s.code)} · ${count}/6</span><strong>${esc(s.title)}</strong><small>${esc(s.short)}</small></button>`;
    }).join('');
  }
  function renderOverview() {
    const s=scene();
    byId('simulator-overview').innerHTML=`<div class="sim-intro-tag">${esc(s.eyebrow)}</div><h3>${esc(s.title)}</h3><p>${esc(s.story)}</p><div class="sim-chiprow">${s.specs.map(x=>`<span>${esc(x)}</span>`).join('')}</div><div class="sim-acceptance"><strong>CONTRATO DE ENGENHARIA</strong><p>${esc(s.constraints)}</p></div>`;
  }
  function renderChoices() {
    const s=scene(), vals=choices();
    byId('simulator-decisions').innerHTML=s.stages.map((stage,i)=>`
      <fieldset class="sim-decision" data-sim-stage="${i}">
        <legend class="sim-stage-heading"><span class="sim-stage-count">${String(i+1).padStart(2,'0')}</span><span><small>${esc(stage.domain)} ${stage.critical?'<span class="sim-critical">CRÍTICO</span>':''}</small><strong>${esc(stage.title)}</strong></span><span class="sim-stage-mark">${vals[i]===null?'PENDENTE':'✓'}</span></legend>
        <p class="sim-stage-prompt">${esc(stage.question)}</p>
        <div class="sim-choices">${stage.options.map((opt,j)=>`
          <label class="sim-option ${vals[i]===j?'selected':''}"><input type="radio" name="sim-${esc(s.id)}-${i}" value="${j}" data-sim-choice="${i}" ${vals[i]===j?'checked':''}/><span class="sim-option-dot" aria-hidden="true"></span><span class="sim-option-main"><strong>${esc(opt.title)}</strong><small>${esc(opt.desc)}</small></span></label>`).join('')}
        </div>
      </fieldset>`).join('');
  }
  function renderBoard() {
    const n=choices().filter(x=>x!==null).length, res=phase()==='result'?evaluation():null;
    byId('simulator-board').innerHTML=`<div class="sim-board-top"><div><span class="sim-micro">PLANTA DE MONTAGEM · ${esc(scene().code)}</span><h4>Arquitetura escolhida</h4></div><span class="sim-step-count">${n} / 6</span></div><div class="sim-svg-wrap">${svgBlueprint(res)}</div><div class="sim-board-foot"><span>LINHAS = FLUXO CONCEITUAL</span><span>6 MÓDULOS / 5 DOMÍNIOS + GOVERNANÇA</span></div>`;
    const action=byId('sim-run'), missing=6-n;
    action.disabled=missing>0 || phase()==='running';
    action.textContent=missing>0?`Escolha mais ${missing} camada${missing>1?'s':''}`:phase()==='result'?'Executar novamente':'Executar bancada →';
    byId('sim-progress').style.width=`${Math.round(100*n/6)}%`;
    byId('sim-remaining').textContent=`${n} das 6 decisões selecionadas`;
  }
  function renderRun() {
    const section=byId('simulator-runpanel'), currentPhase=phase();
    if(currentPhase!=='running') {section.hidden=true;return;}
    section.hidden=false;
    const s=scene(),n=state.runIndex[s.id],stage=s.stages[n],opt=stage.options[choices()[n]];
    section.innerHTML=`<div class="sim-run-label">TESTE DE BANCADA · MÓDULO ${String(n+1).padStart(2,'0')} / 06</div><h4>${esc(stage.title)}</h4><p><strong>Componente selecionado:</strong> ${esc(opt.title)}.</p><p>${esc(opt.desc)}</p><div class="sim-run-detail"><strong>O que a bancada observa</strong><span>${esc(opt.why)}</span></div><div class="sim-run-controls"><button type="button" class="sim-plain" data-sim-prev ${n===0?'disabled':''}>← Etapa anterior</button><button type="button" class="sim-cta" data-sim-next>${n===5?'Emitir laudo técnico →':'Próxima etapa →'}</button></div>`;
  }
  function diagnosticText(res) {
    if(res.grade==='ideal')return 'A montagem atende à maior parte dos critérios do caso sem excessos relevantes. Continue conferindo as escolhas individuais: o ideal depende do cenário e dos requisitos.';
    if(res.grade==='lean')return 'A montagem economiza ou simplifica etapas, mas compromete requisitos importantes. O custo oculto aparece em retrabalho, operação manual, respostas frágeis ou falta de controle efetivo.';
    return 'A montagem concentra mecanismos pesados demais para a demanda apresentada. O problema não é usar serviços avançados; é usá-los sem necessidade, com mais chamadas, custo de manutenção ou latência fim a fim.';
  }
  function reportMarkdown(result) {
    const s=scene();
    return `# Laudo de arquitetura — ${s.title}\n\n**Perfil:** ${gradeNames[result.grade]}\n**Aderência didática:** ${result.counts.ideal}/6 decisões adequadas (${result.score}%).\n**Riscos críticos na montagem:** ${result.criticalIssue?'sim':'não'}\n\n${s.constraints}\n\n`+
      s.stages.map((st,i)=>{const selected=result.opts[i],ideal=st.options.find(o=>o.grade==='ideal');return `## ${i+1}. ${st.title}\n- Escolhido: ${selected.title}\n- Diagnóstico: ${selected.why}\n- Recomendado para o caso: ${ideal.title}\n- Motivo: ${ideal.why}\n`}).join('\n')+
      '\n> Exercício didático. As faixas relativas não são benchmark nem preço/custo real de Azure.\n';
  }
  function renderResult() {
    const section=byId('simulator-result');
    if(phase()!=='result'){section.hidden=true;section.innerHTML='';return;}
    const s=scene(),r=evaluation();section.hidden=false;
    const quality=r.counts.ideal===6?'6 de 6 decisões atendem ao desenho recomendado':`${r.counts.ideal} de 6 decisões seguem a proposta de referência`;
    const metrics=Object.entries(metricLabels).map(([key,label])=>`<div class="sim-metric"><span>${esc(label)}</span><strong>${barLevel(r.metrics[key])}</strong><div class="sim-meter"><span style="width:${Math.round(r.metrics[key]/3*100)}%"></span></div></div>`).join('');
    section.innerHTML=`<div class="sim-report-head ${r.grade}"><span class="sim-micro">LAUDO DO SISTEMA · ${esc(gradeTags[r.grade])}</span><h3>${esc(gradeNames[r.grade])}</h3><p>${esc(diagnosticText(r))}</p><div class="sim-result-info"><strong>${quality}</strong><span>${r.criticalIssue?'⚠ Requisito crítico não atendido':'✓ Nenhum requisito crítico foi sacrificado'}</span></div></div>
      <div class="sim-report-metrics"><div><span class="sim-micro">ÍNDICES RELATIVOS</span><p>Faixas ilustrativas desta bancada. Não são medições de preço, tempo ou precisão dos serviços.</p></div><div class="sim-metric-grid">${metrics}</div></div>
      <div class="sim-report-compare"><div class="sim-micro">INSPEÇÃO PEÇA A PEÇA</div><h4>O que você escolheu × o que funciona melhor aqui</h4>${s.stages.map((st,i)=>{
        const sel=r.opts[i],ideal=st.options.find(o=>o.grade==='ideal'),ok=sel.grade==='ideal';
        return `<article class="sim-diff ${ok?'good':'attention'}"><div class="sim-diff-top"><span>${String(i+1).padStart(2,'0')} · ${esc(st.title)}</span><strong>${esc(gradeWords[sel.grade])}</strong></div><div class="sim-diff-columns"><div><small>SUA DECISÃO</small><b>${esc(sel.title)}</b><p>${esc(sel.why)}</p></div><div><small>${ok?'POR QUE ESTA ESCOLHA FUNCIONA':'PENSE NESTA ALTERNATIVA'}</small><b>${esc(ideal.title)}</b><p>${esc(ideal.why)}</p></div></div></article>`;
      }).join('')}</div>
      <div class="sim-report-actions"><button type="button" class="sim-cta" data-sim-edit>Revisar montagem ↶</button><button type="button" class="sim-plain" data-sim-copy>Copiar laudo em Markdown</button><button type="button" class="sim-plain" data-sim-reset>Zerar este caso</button></div>
      <p class="sim-educational">A classificação considera adequação aos requisitos, escolhas críticas e custo/latência/manutenção relativos. Uma opção pode ser adequada em outro contexto; este resultado não é avaliação oficial da Microsoft nem benchmark de nuvem.</p>`;
  }
  function renderAll() {renderCases();renderOverview();renderChoices();renderBoard();renderRun();renderResult();}
  function resetCase() {state.choices[scene().id]=Array(6).fill(null);state.phases[scene().id]='build';state.runIndex[scene().id]=0;save();renderAll();}
  byId('simulator-case-nav').addEventListener('click',e=>{
    const tab=e.target.closest('[data-sim-case]');
    if(tab){state.active=Number(tab.dataset.simCase);renderAll();}
  });
  host.addEventListener('click',async e=>{
    const button=e.target.closest('button');if(!button)return;
    if(button.matches('[data-sim-case]')) {state.active=Number(button.dataset.simCase);renderAll();return;}
    const key=scene().id;
    if(button.id==='sim-run' && choices().every(x=>x!==null)){state.phases[key]='running';state.runIndex[key]=0;renderAll();byId('simulator-runpanel').scrollIntoView({block:'center',behavior:'smooth'});return;}
    if(button.matches('[data-sim-prev]')) {state.runIndex[key]=Math.max(0,state.runIndex[key]-1);renderRun();return;}
    if(button.matches('[data-sim-next]')) {
      if(state.runIndex[key]===5){state.phases[key]='result';renderAll();byId('simulator-result').scrollIntoView({block:'start',behavior:'smooth'});}
      else {state.runIndex[key]++;renderRun();}
      return;
    }
    if(button.matches('[data-sim-edit]')) {state.phases[key]='build';renderAll();byId('simulator-decisions').scrollIntoView({block:'start',behavior:'smooth'});return;}
    if(button.matches('[data-sim-reset]')) {if(confirm('Zerar as escolhas deste caso?'))resetCase();return;}
    if(button.matches('[data-sim-copy]')) {
      const report=reportMarkdown(evaluation());
      try {await navigator.clipboard.writeText(report);button.textContent='Laudo copiado ✓';}
      catch (_){const blob=new Blob([report],{type:'text/markdown;charset=utf-8'}),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download=`laudo-${key}.md`;document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);button.textContent='Laudo salvo (.md) ✓';}
    }
  });
  host.addEventListener('change',e=>{
    const input=e.target.closest('[data-sim-choice]');if(!input)return;
    const key=scene().id,stage=Number(input.dataset.simChoice);
    state.choices[key][stage]=Number(input.value);state.phases[key]='build';state.runIndex[key]=0;save();renderAll();
    const chosen=host.querySelector(`input[name="sim-${key}-${stage}"][value="${input.value}"]`);
    if(chosen) {try{chosen.focus({preventScroll:true});}catch(_){chosen.focus();}}
  });
  renderAll();
})();
