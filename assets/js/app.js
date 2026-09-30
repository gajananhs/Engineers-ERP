(function(){'use strict';
const F=window.GE_FLOWS,$=s=>document.querySelector(s),app=$('#app');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const byId=id=>F.find(f=>f.id===id);
let hl='';
const mk=t=>{const r=hl?new RegExp('('+hl.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')','ig'):null;t=esc(t);return r?t.replace(r,'<mark>$1</mark>'):t};
function step(s){
  if(typeof s==='string'){const neg=s[0]==='!';if(neg)s=s.slice(1);const i=s.indexOf(' — ');
    return `<div class="st${neg?' end':''}"><b>${mk(i<0?s:s.slice(0,i))}</b>${i<0?'':`<p>${mk(s.slice(i+3))}</p>`}</div>`}
  if(s.q)return `<div class="dc"><div class="q">${mk(s.q)}</div><div class="br">${s.b.map(([l,x])=>`<div class="bc"><span class="bl">${mk(l)}</span>${seq(x)}</div>`).join('')}</div></div>`;
  const i=s.t.indexOf(' — ');return `<div class="st"><b>${mk(i<0?s.t:s.t.slice(0,i))}</b>${i<0?'':`<p>${mk(s.t.slice(i+3))}</p>`}<a href="#/${s.a}">Open ${s.a==='A1'?'Annexure 1':'Annexure 2'} checklist</a></div>`}
const seq=a=>a.length?`<div class="sq">${a.map(step).join('')}</div>`:'';
const key=id=>'ge_chk_'+id;
const saved=id=>{try{return JSON.parse(localStorage.getItem(key(id))||'{}')}catch(e){return{}}};
function groups(f){const chk=f.kind==='check',st=chk?saved(f.id):{};
  return f.groups.map(([h,items],g)=>`<section class="gp"><h2>${mk(h)}</h2>${chk?items.map((t,i)=>`<label><input type="checkbox" data-k="${g}.${i}"${st[g+'.'+i]?' checked':''}><span>${mk(t)}</span></label>`).join(''):`<ul>${items.map(t=>`<li>${mk(t)}</li>`).join('')}</ul>`}</section>`).join('')}
function flat(f){const o=[];const w=a=>a.forEach(s=>{if(typeof s==='string')o.push(s.replace(/^!/,''));else if(s.q){o.push(s.q);s.b.forEach(([l,x])=>{o.push(l);w(x)})}else o.push(s.t)});
  if(f.steps)w(f.steps);if(f.groups)f.groups.forEach(([h,i])=>{o.push(h);i.forEach(t=>o.push(t))});return o}
function home(q){
  let h=`<h1>Gururaj Engineers Pvt. Ltd.</h1><p class="sub">Process flows by department. Works offline once opened.</p><input id="q" class="search" type="search" placeholder="Search all flows (e.g. GRN, e-waybill, warranty)…" value="${esc(q||'')}" autocomplete="off">`;
  if(q&&q.trim().length>1){hl=q.trim();const r=new RegExp(hl.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'i');let n=0;
    F.forEach(f=>flat(f).forEach(t=>{if(r.test(t)&&n<60){n++;h+=`<a class="hit" href="#/${f.id}?h=${encodeURIComponent(hl)}"><small>${esc(f.ic+' '+f.n)}</small>${mk(t)}</a>`}}));
    if(!n)h+='<p class="sub">No matches.</p>'}
  else{hl='';h+=`<div class="grid">${F.map(f=>`<a class="tile" href="#/${f.id}"><span class="ic">${f.ic}</span><b>${esc(f.n)}</b><span>${esc(f.s)}</span></a>`).join('')}</div>`}
  app.innerHTML=h;const i=$('#q');i.addEventListener('input',()=>{const p=i.selectionStart;home(i.value);const j=$('#q');j.focus();j.setSelectionRange(p,p)})}
function detail(id,q){const f=byId(id);if(!f)return home();hl=q||'';document.title=f.n+' · GE Process Flow';
  app.innerHTML=`<a class="back" href="#/">← All departments</a><h1>${f.ic} ${esc(f.n)}</h1><p class="sub">${esc(f.s)}</p><div class="row"><button class="btn" id="pr">Print / save PDF</button>${f.kind==='check'?'<button class="btn" id="rs">Reset ticks</button>':''}</div>`+(f.steps?seq(f.steps):groups(f));
  $('#pr').onclick=()=>window.print();
  const rs=$('#rs');if(rs)rs.onclick=()=>{localStorage.removeItem(key(id));detail(id)};
  app.querySelectorAll('input[type=checkbox]').forEach(c=>c.onchange=()=>{const s=saved(id);s[c.dataset.k]=c.checked;try{localStorage.setItem(key(id),JSON.stringify(s))}catch(e){}});
  const m=app.querySelector('mark');if(m)m.scrollIntoView({block:'center'});else window.scrollTo(0,0)}
function route(){const [p,qs]=(location.hash.slice(2)||'').split('?');const q=qs?new URLSearchParams(qs).get('h'):'';
  if(!p){document.title='GE Process Flow';home('')}else detail(p,q);app.focus({preventScroll:true})}
window.addEventListener('hashchange',route);route();
window.GE={route};
})();
