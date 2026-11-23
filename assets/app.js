/* Atlas AI-103 — cliente estático, sem dependências e sem backend. */
(() => {
  'use strict';
  const data = window.ATLAS_DATA;
  if (!data || !Array.isArray(data.domains)) return;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const normalize = value => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const storageKey = 'atlas-ai103-progress-v1';
  let reviewed = {};
  try { reviewed = JSON.parse(localStorage.getItem(storageKey) || '{}') || {}; } catch (_) { reviewed = {}; }
  const flowPositions = Object.fromEntries(data.domains.map(d => [d.id, 0]));
  const nodePositions = Object.fromEntries(data.domains.map(d => [d.id, d.nodes[0].id]));
  const answered = {};
  let integratedPosition = 0;
  let toastTimer;

  function notify(text) {
    const t = $('#toast');
    t.textContent = text;
    t.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('visible'), 2800);
  }

  function renderNav() {
    $('#side-nav').innerHTML = data.domains.map(d => `
      <a href="#dominio-${d.id}" data-nav="${d.id}">
        <span class="nav-num">0${d.id}</span>
        <span class="nav-title">${esc(d.short)} <span class="nav-weight">${esc(d.weight)} · ${d.guides.length} guias</span></span>
      </a>`).join('');
  }

  const nodeWidth = 215, nodeHeight = 78;
  function edgePath(from, to) {
    const x1 = from.x + nodeWidth, x2 = to.x, cy1 = from.y + nodeHeight/2, cy2 = to.y + nodeHeight/2;
    if (Math.abs(from.x - to.x) < 5) {
      const cyStart = from.y < to.y ? from.y + nodeHeight : from.y;
      const cyEnd = from.y < to.y ? to.y : to.y + nodeHeight;
      return `M ${from.x + nodeWidth/2} ${cyStart} V ${cyEnd}`;
    }
    if (x2 > x1) {
      const middle = Math.round((x1 + x2)/2);
      return `M ${x1} ${cy1} H ${middle} V ${cy2} H ${x2-7}`;
    }
    return `M ${from.x + nodeWidth/2} ${from.y+nodeHeight} V ${to.y-8} H ${to.x + nodeWidth/2}`;
  }

  function renderBlueprint(d) {
    const nodeMap = Object.fromEntries(d.nodes.map(n => [n.id,n]));
    const lines = d.edges.map(([from,to,kind]) => `<path class="edge ${kind === 'dashed' ? 'dashed' : ''}" data-from="${esc(from)}" data-to="${esc(to)}" d="${edgePath(nodeMap[from],nodeMap[to])}" marker-end="url(#arrow-${d.id})"/>`).join('');
    const nodes = d.nodes.map((n,i) => `
      <g class="node ${i===0?'active':''}" data-node="${esc(n.id)}" role="button" tabindex="0" aria-label="Inspecionar: ${esc(n.name)}">
        <title>${esc(n.name)} — ${esc(n.detail)}</title>
        <rect x="${n.x}" y="${n.y}" width="${nodeWidth}" height="${nodeHeight}" rx="5"/>
        <text class="node-tag" x="${n.x+15}" y="${n.y+23}">${esc(n.tag)}</text>
        <text class="node-title" x="${n.x+15}" y="${n.y+47}">${esc(n.name)}</text>
        <text class="node-code" x="${n.x+15}" y="${n.y+66}">MODULE / ${String(i+1).padStart(2,'0')}</text>
        <circle class="pin" cx="${n.x+nodeWidth}" cy="${n.y+nodeHeight/2}" r="3.1"/>
      </g>`).join('');
    return `
      <div class="diagram-block" data-diagram="${d.id}">
        <div class="diagram-top"><span class="diagram-title">FIG. 0${d.id}.01 / DIAGRAMA DE COMPONENTES</span><button class="diagram-export" data-export="${d.id}" type="button" title="Baixar o diagrama vetorial" aria-label="Exportar diagrama SVG do domínio ${d.id}">↓ EXPORTAR SVG</button></div>
        <div class="diagram-body">
          <svg class="architecture-svg" viewBox="0 0 1090 438" xmlns="http://www.w3.org/2000/svg" role="group" aria-label="Planta estrutural do domínio ${d.id}, com componentes selecionáveis">
            <defs><marker id="arrow-${d.id}" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="${d.color}"/></marker></defs>
            <g><text class="frame-text" x="23" y="20">SYSTEM SCHEMATIC // AI-103.D${d.id}</text><text class="frame-text" x="865" y="425">FIG. ${d.id}.01 · NOT TO SCALE</text></g>
            <g class="edges">${lines}</g><g class="nodes">${nodes}</g>
          </svg>
        </div>
        <div class="node-inspector" aria-live="polite">
          <div><span class="inspector-title">MÓDULO SELECIONADO · <span class="inspector-tag">${esc(d.nodes[0].tag)}</span></span><h3 class="inspector-name">${esc(d.nodes[0].name)}</h3><p class="inspector-description">${esc(d.nodes[0].detail)}</p></div>
          <div class="inspector-io"><div><span>ENTRADA</span><strong class="inspector-input">${esc(d.nodes[0].input)}</strong></div><div><span>SAÍDA</span><strong class="inspector-output">${esc(d.nodes[0].output)}</strong></div></div>
        </div>
        <div class="diagram-tip">⌖ Clique em qualquer módulo para ver sua função, entrada e saída. As linhas mostram dependências conceituais, não um diagrama de rede implantada.</div>
      </div>`;
  }

  function renderFlow(d) {
    return `<div class="flow-panel" data-flow="${d.id}">
      <div class="flow-track" role="group" aria-label="Etapas do circuito do domínio ${d.id}">${d.flow.map((s,i) => `<button class="flow-step ${i===0?'active':''}" data-step="${i}" type="button" aria-current="${i===0?'step':'false'}"><span class="step-num">${String(i+1).padStart(2,'0')}</span><span class="step-words"><strong>${esc(s.title)}</strong><small>${esc(s.actor)}</small></span></button>`).join('')}</div>
      <div class="flow-info" aria-live="polite">
        <span class="flow-phase">CIRCUITO EM OPERAÇÃO · ETAPA <span class="flow-phase-number">01</span></span>
        <h4 class="flow-title">${esc(d.flow[0].title)}</h4><p class="flow-what">${esc(d.flow[0].what)}</p>
        <div class="signal-box"><strong>✓ SINAL DE VALIDAÇÃO</strong><span class="flow-proof">${esc(d.flow[0].proof)}</span></div>
        <div class="signal-box warning"><strong>! MODO DE FALHA</strong><span class="flow-risk">${esc(d.flow[0].risk)}</span></div>
        <div class="flow-controls"><button type="button" class="flow-prev" disabled>← Anterior</button><button type="button" class="flow-next next">Próxima etapa →</button><span class="flow-counter">01 / ${String(d.flow.length).padStart(2,'0')}</span></div>
      </div></div>`;
  }

  function renderChapter(d) {
    return `<section class="chapter" id="dominio-${d.id}" style="--domain:${d.color}" aria-labelledby="title-domain-${d.id}">
      <div class="chapter-kicker">DOMÍNIO 0${d.id} / ${esc(d.label)}</div>
      <div class="chapter-heading"><h2 id="title-domain-${d.id}">${esc(d.name)}</h2><p>${esc(d.subtitle)}</p></div>
      <div class="chapter-badges"><span>${esc(d.weight)} DO EXAME*</span><span>${d.guides.length} GUIAS</span><span>PLANTA + OPERAÇÃO</span></div>
      ${renderBlueprint(d)}
      <div class="chapter-subheading"><h3>Em operação: ${esc(d.flowTitle)}</h3><span class="micro-label">FIG. 0${d.id}.02 / EXECUTE AS ETAPAS</span></div>
      ${renderFlow(d)}
      <p class="scenario-note">Analogia mecânica: ${esc(d.analogy)}</p>
      <div class="chapter-bottom">
        <div class="challenge-card"><span class="mini-kicker">[ Q ] PERGUNTA DE PROJETO</span><h3>Diagnóstico de arquitetura</h3><p>Pense nos componentes do desenho, nas interfaces e nos possíveis pontos de falha antes de responder.</p><blockquote>${esc(d.question)}</blockquote><div class="review-hint"><span>Todos os conceitos estão nas fichas.</span><a href="#grupo-${d.id}">Abrir guias ↘</a></div></div>
        <div class="check-card" data-check="${d.id}"><span class="mini-kicker">[ ✓ ] TESTE DE ENTENDIMENTO</span><h3>Checkpoint do circuito</h3><p>${esc(d.checkpoint.q)}</p><div class="check-options">${d.checkpoint.options.map((o,i)=>`<button type="button" data-option="${i}">${String.fromCharCode(65+i)} · ${esc(o)}</button>`).join('')}</div><div class="check-feedback" aria-live="polite">Escolha uma alternativa para receber o diagnóstico.</div></div>
      </div>
    </section>`;
  }

  function renderGuideDirectory() {
    let running = 0;
    $('#all-guides').innerHTML = data.domains.map(d => {
      const entries = d.guides.map((g,i) => {
        running += 1;
        const key = `${d.id}-${i+1}`;
        const matched = [d.name,g.title,g.type,g.desc,...g.tags,...g.points,g.ask].join(' ');
        return `<article class="guide-card" id="guia-${key}" data-search="${esc(normalize(matched))}">
          <details><summary><span class="guide-code">${String(running).padStart(2,'0')}</span><span class="guide-title-wrap"><strong>${esc(g.title)}</strong><small>${esc(g.type)} · Domínio 0${d.id}</small></span><span class="guide-toggle" aria-hidden="true">+</span></summary>
          <div class="guide-content"><p>${esc(g.desc)}</p><div class="guide-tags">${g.tags.map(t=>`<span>${esc(t)}</span>`).join('')}</div>
          <ul>${g.points.map(p=>`<li>${esc(p)}</li>`).join('')}</ul><div class="guide-question">Pergunta de engenharia: ${esc(g.ask)}</div></div>
          </details><div class="guide-card-foot"><label class="guide-review"><input type="checkbox" data-progress="${key}" ${reviewed[key]?'checked':''} /> Marcar como revisado</label><a href="#dominio-${d.id}" aria-label="Voltar ao diagrama do domínio ${d.id}">Ver circuito ↗</a></div></article>`;
      }).join('');
      return `<section class="guide-group" id="grupo-${d.id}"><div class="guide-group-head"><h3>0${d.id} · ${esc(d.short)}</h3><a href="#dominio-${d.id}">VISUALIZAR PLANTA ↗</a></div><div class="guide-grid">${entries}</div></section>`;
    }).join('');
  }

  function renderIntegration() {
    const steps = data.integration.steps;
    $('#integration-visual').innerHTML = `<div class="integration-flow">
      <div class="integrated-grid">${steps.map((s,i)=>`<button class="integrated-step ${i===0?'active':''}" type="button" data-integration-step="${i}"><span class="int-num">${String(i+1).padStart(2,'0')} / D${s.domain}</span><strong>${esc(s.title)}</strong><small>${esc(s.actor)}</small></button>`).join('')}</div>
      <div class="integrated-readout" aria-live="polite"><div><span class="int-counter">ETAPA 01 / 10</span><h3>${esc(steps[0].actor)}</h3></div><p>${esc(steps[0].text)}</p><button id="integration-next" type="button">Próxima etapa →</button></div>
    </div>`;
    $('#integrated-answer').innerHTML = data.integration.answer.map(([title,body])=>`<article><strong>${esc(title)}</strong><p>${esc(body)}</p></article>`).join('');
  }

  function activateNode(d, nodeId) {
    const block = $(`[data-diagram="${d.id}"]`);
    const selected = d.nodes.find(n => n.id === nodeId);
    if (!block || !selected) return;
    nodePositions[d.id] = nodeId;
    $$('.node',block).forEach(el=> el.classList.toggle('active',el.dataset.node===nodeId));
    $$('.edge',block).forEach(el=> el.classList.toggle('related',el.dataset.from===nodeId||el.dataset.to===nodeId));
    $('.inspector-tag',block).textContent = selected.tag;
    $('.inspector-name',block).textContent = selected.name;
    $('.inspector-description',block).textContent = selected.detail;
    $('.inspector-input',block).textContent = selected.input;
    $('.inspector-output',block).textContent = selected.output;
  }

  function activateFlow(d, stepIndex) {
    const block = $(`[data-flow="${d.id}"]`);
    if (!block) return;
    const position = Math.min(d.flow.length-1,Math.max(0,stepIndex));
    const s = d.flow[position];
    flowPositions[d.id] = position;
    $$('.flow-step',block).forEach((el,i)=> {
      el.classList.toggle('active',i===position);
      el.classList.toggle('done-step',i<position);
      el.setAttribute('aria-current',i===position?'step':'false');
    });
    $('.flow-phase-number',block).textContent = String(position+1).padStart(2,'0');
    $('.flow-title',block).textContent = s.title;
    $('.flow-what',block).textContent = s.what;
    $('.flow-proof',block).textContent = s.proof;
    $('.flow-risk',block).textContent = s.risk;
    $('.flow-counter',block).textContent = `${String(position+1).padStart(2,'0')} / ${String(d.flow.length).padStart(2,'0')}`;
    $('.flow-prev',block).disabled = position === 0;
    $('.flow-next',block).textContent = position === d.flow.length-1 ? 'Reiniciar circuito ↺' : 'Próxima etapa →';
  }

  function activateIntegration(position) {
    integratedPosition = (position + data.integration.steps.length) % data.integration.steps.length;
    const s = data.integration.steps[integratedPosition];
    $$('.integrated-step').forEach((el,i)=>el.classList.toggle('active',i===integratedPosition));
    $('.int-counter').textContent = `ETAPA ${String(integratedPosition+1).padStart(2,'0')} / ${data.integration.steps.length}`;
    $('.integrated-readout h3').textContent = s.actor;
    $('.integrated-readout p').textContent = s.text;
    $('#integration-next').textContent = integratedPosition === data.integration.steps.length-1 ? 'Reiniciar circuito ↺' : 'Próxima etapa →';
  }

  function updateProgress() {
    const count = data.domains.reduce((sum,d)=>sum+d.guides.filter((g,i)=>reviewed[`${d.id}-${i+1}`]).length,0);
    $('#progress-number').textContent = count;
    $('#progress-bar').style.width = `${count/17*100}%`;
    try { localStorage.setItem(storageKey,JSON.stringify(reviewed)); } catch (_) { /* Navegação privada ou armazenamento bloqueado. */ }
  }

  function filterGuides(term) {
    const q = normalize(term).trim();
    let visible = 0;
    $$('.guide-group').forEach(group => {
      const cards = $$('.guide-card',group);
      let inGroup = 0;
      cards.forEach(card => {
        const match = !q || card.dataset.search.includes(q);
        card.hidden = !match;
        inGroup += Number(match);
      });
      group.hidden = inGroup === 0;
      visible += inGroup;
    });
    $('#search-count').textContent = `${visible} guia${visible===1?'':'s'}`;
  }

  function exportDiagram(d) {
    const svg = $(`[data-diagram="${d.id}"] .architecture-svg`);
    if (!svg) return;
    const clone = svg.cloneNode(true);
    clone.setAttribute('xmlns','http://www.w3.org/2000/svg');
    clone.setAttribute('width','1090');clone.setAttribute('height','438');
    clone.setAttribute('style',`--domain:${d.color}`);
    const back = document.createElementNS('http://www.w3.org/2000/svg','rect');
    back.setAttribute('x','0');back.setAttribute('y','0');back.setAttribute('width','1090');back.setAttribute('height','438');back.setAttribute('fill','#0b2231');
    clone.insertBefore(back,clone.firstChild);
    const style = document.createElementNS('http://www.w3.org/2000/svg','style');
    style.textContent = `.edge{fill:none;stroke:${d.color};stroke-width:2;stroke-opacity:.66}.edge.dashed{stroke-dasharray:6 6;stroke-opacity:.35}.edge.related{stroke-opacity:1;stroke-width:3}.node rect{fill:#103243;stroke:#537b86;stroke-width:1.5}.node.active rect{fill:#104b56;stroke:${d.color};stroke-width:3}.node text{font-family:Consolas,monospace;fill:#effffd}.node-tag{font-size:10px;letter-spacing:1px;fill:#91b9bd!important}.node-title{font-size:15px;font-weight:bold}.node-code{font-size:9px;fill:#77a9ad!important}.pin{fill:${d.color}}.frame-text{font:10px Consolas,monospace;fill:#7ba4ad;letter-spacing:2px}`;
    clone.insertBefore(style,clone.firstChild);
    const bytes = new XMLSerializer().serializeToString(clone);
    const url = URL.createObjectURL(new Blob([bytes],{type:'image/svg+xml;charset=utf-8'}));
    const a = document.createElement('a');a.href=url;a.download=`ai103-dominio-0${d.id}-planta.svg`;document.body.append(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
    notify(`Planta do domínio ${d.id} exportada como SVG.`);
  }

  function bindEvents() {
    $('#chapters').addEventListener('click', event => {
      const node = event.target.closest('.node');
      if (node) { const block=node.closest('[data-diagram]');const d=data.domains.find(x=>x.id===Number(block.dataset.diagram));activateNode(d,node.dataset.node);return; }
      const exp = event.target.closest('[data-export]');
      if (exp) { const d = data.domains.find(x=>x.id===Number(exp.dataset.export));exportDiagram(d);return; }
      const next = event.target.closest('.flow-next');
      const prev = event.target.closest('.flow-prev');
      const direct = event.target.closest('.flow-step');
      const flow = (next||prev||direct)?.closest('[data-flow]');
      if(flow) {
        const d = data.domains.find(x=>x.id===Number(flow.dataset.flow));
        let idx = flowPositions[d.id];
        if(next) idx = (idx+1)%d.flow.length;
        if(prev) idx -= 1;
        if(direct) idx = Number(direct.dataset.step);
        activateFlow(d,idx);return;
      }
      const opt=event.target.closest('[data-option]');
      const card=opt?.closest('[data-check]');
      if(card && opt) {
        const domainId=Number(card.dataset.check);if(answered[domainId]!==undefined) return;
        const d=data.domains.find(x=>x.id===domainId), selected=Number(opt.dataset.option);
        answered[domainId]=selected;
        $$('.check-options button',card).forEach((btn,i)=>{
          btn.disabled=true;
          if(i===d.checkpoint.answer)btn.classList.add('correct');
          if(i===selected&&selected!==d.checkpoint.answer)btn.classList.add('incorrect');
        });
        $('.check-feedback',card).innerHTML = `<strong>${selected===d.checkpoint.answer?'✓ Correto!':'↳ Revise a escolha.'}</strong>${esc(d.checkpoint.why)}`;
      }
    });
    $('#chapters').addEventListener('keydown', event => {
      const node=event.target.closest('.node');
      if(node && (event.key==='Enter'||event.key===' ')) {
        event.preventDefault(); const block=node.closest('[data-diagram]');
        activateNode(data.domains.find(x=>x.id===Number(block.dataset.diagram)),node.dataset.node);
      }
    });
    $('#integration-visual').addEventListener('click', e => {
      const step=e.target.closest('[data-integration-step]');
      if(step) activateIntegration(Number(step.dataset.integrationStep));
      if(e.target.closest('#integration-next')) activateIntegration(integratedPosition+1);
    });
    $('#guide-search').addEventListener('input',e=>filterGuides(e.target.value));
    $('#all-guides').addEventListener('change',e=>{
      const box=e.target.closest('[data-progress]');
      if(!box) return;
      reviewed[box.dataset.progress]=box.checked;
      updateProgress();
      notify(box.checked?'Guia marcado como revisado.':'Marcação de revisão desfeita.');
    });
    $('#btn-reset').addEventListener('click',()=>{
      if(!window.confirm('Zerar todas as 17 marcações de revisão salvas neste navegador?'))return;
      reviewed={};$$('[data-progress]').forEach(b=>b.checked=false);updateProgress();notify('Marcações de revisão zeradas.');
    });
    $('#btn-print').addEventListener('click',()=>window.print());
    $$('a[href^="#guia-"]').forEach(a=>a.addEventListener('click',()=>{
      const target=document.getElementById(a.getAttribute('href').slice(1));
      if(target?.hasAttribute('hidden')){$('#guide-search').value='';filterGuides('');}
      if(target) $('details',target).open=true;
    }));
    $$('a[href^="#grupo-"]').forEach(a=>a.addEventListener('click',()=>{
      $('#guide-search').value='';filterGuides('');
    }));
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries=>{
        const current=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
        if(!current)return;
        $$('.side-nav a').forEach(a=>a.classList.toggle('active',a.dataset.nav===current.target.id.replace('dominio-','')));
      },{rootMargin:'-22% 0px -55% 0px',threshold:[0,.15,.35]});
      data.domains.forEach(d=>observer.observe(document.getElementById(`dominio-${d.id}`)));
    }
    if(window.location.hash.startsWith('#guia-')) {
      const target=document.querySelector(window.location.hash);
      if(target && $('details',target)) $('details',target).open=true;
    }
  }

  function init() {
    renderNav();
    $('#chapters').innerHTML = data.domains.map(renderChapter).join('');
    renderGuideDirectory();
    renderIntegration();
    data.domains.forEach(d=>{activateNode(d,d.nodes[0].id);activateFlow(d,0);});
    activateIntegration(0);
    updateProgress();
    bindEvents();
  }
  init();
})();
