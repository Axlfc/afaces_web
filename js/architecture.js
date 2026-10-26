'use strict';
(async()=>{
const map=document.getElementById('mapGrid'),timeline=document.getElementById('timelineYears');
if(!map&&!timeline)return;
const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=String(text);return n};
const validDate=s=>typeof s==='string'&&/^\d{4}-\d{2}-\d{2}(?:T.*)?$/.test(s)&&!Number.isNaN(Date.parse(s));
let data;try{const r=await fetch('data/metadata.json',{cache:'no-cache'});if(!r.ok)throw Error('HTTP '+r.status);data=await r.json()}catch(e){(map||timeline).textContent='No se pudo cargar el catálogo.';console.error(e);return}
const items=data.videos||[],arch=data.architecture;if(!arch){(map||timeline).textContent='Falta el índice de arquitectura.';return}
const link=item=>item.youtube_url&&/^https:\/\/www\.youtube\.com\/watch\?v=[\w-]{11}$/.test(item.youtube_url)?item.youtube_url:null;
if(map){
const detail=document.getElementById('mapDetail'),search=document.getElementById('mapSearch'),count=document.getElementById('mapCount');
const show=(phase,nucleus,selected)=>{
detail.replaceChildren();detail.append(el('h2','',nucleus.name+' / Fase '+String(phase.id).padStart(2,'0')),el('p','ux-note',selected.length+' lanzamientos documentados'));
const actions=el('div','ux-actions');
const query=el('a','ux-link','Ver recomendaciones filtradas');query.href='recomendaciones.html?fase='+phase.id+'&nucleo_arch='+encodeURIComponent(nucleus.id);actions.append(query);
if(nucleus.playlistId){const a=el('a','ux-link','Playlist temática de YouTube');a.href='https://www.youtube.com/playlist?list='+encodeURIComponent(nucleus.playlistId);a.target='_blank';a.rel='noopener noreferrer';actions.append(a)}
detail.append(actions);for(const item of selected){const a=el('a','ux-map-release',item.titulo||item.title);a.href=link(item)||query.href;if(link(item)){a.target='_blank';a.rel='noopener noreferrer'}detail.append(a)}
detail.scrollIntoView({behavior:'smooth',block:'nearest'})
};
function draw(){const term=search.value.trim().toLocaleLowerCase('es');map.replaceChildren();map.style.setProperty('--map-cols',String(arch.phases.length));
map.append(el('div','ux-map-corner','NÚCLEOS / FASES'));for(const phase of arch.phases){const h=el('div','ux-map-head',String(phase.id).padStart(2,'0'));h.title=phase.name;h.append(el('small','',phase.name));map.append(h)}
let populated=0;for(const nucleus of arch.nuclei){map.append(el('div','ux-map-label',nucleus.name));for(const phase of arch.phases){const selected=items.filter(item=>item.fase_id===phase.id&&(item.nucleos_architectura||[]).includes(nucleus.id)&&(!term||[item.title,item.titulo,item.ref].some(x=>String(x||'').toLocaleLowerCase('es').includes(term))));const btn=el('button','ux-map-cell',selected.length?selected.length:'—');btn.type='button';btn.disabled=!selected.length;btn.title=nucleus.name+' / '+phase.name+': '+selected.length+' lanzamientos';btn.setAttribute('aria-label',btn.title);if(selected.length){populated++;btn.classList.add('has-releases');btn.addEventListener('click',()=>show(phase,nucleus,selected))}else btn.classList.add('is-empty');map.append(btn)}}
count.textContent=populated+' intersecciones con lanzamientos';}
search.addEventListener('input',draw);draw()
}
if(timeline){const status=document.getElementById('timelineStatus');const dated=items.filter(x=>validDate(x.publishedAt));status.textContent=dated.length?dated.length+' lanzamientos con fecha de publicación documentada. '+(items.length-dated.length)+' sin fecha.':'Ninguno de los '+items.length+' lanzamientos dispone todavía de publishedAt. No se han asignado años estimados.';const latestYear=Math.max(2026,new Date().getFullYear(),...dated.map(x=>Number(x.publishedAt.slice(0,4))));for(let year=2017;year<=latestYear;year++){const section=el('section','ux-year');section.append(el('h2','',year));const releases=dated.filter(x=>Number(x.publishedAt.slice(0,4))===year).sort((a,b)=>a.publishedAt.localeCompare(b.publishedAt));if(!releases.length)section.append(el('p','ux-note','Sin fechas documentadas para este año.'));else for(const item of releases){const a=el('a','ux-year-release',(item.publishedAt.slice(0,10))+' · '+(item.titulo||item.title));a.href=link(item)||'mapa.html';if(link(item)){a.target='_blank';a.rel='noopener noreferrer'}section.append(a)}timeline.append(section)}}
})();