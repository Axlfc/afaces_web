/* AFACES — migas de pan: estructura + recorrido real en esta pestaña. */
(()=>{
'use strict';
const pages={
 'welcome.html':'Inicio','onboarding.html':'Descubrir','perfiles.html':'Perfiles',
 'recomendaciones.html':'Recomendaciones','mapa.html':'Mapa','timeline.html':'Cronología',
 'lanzamiento.html':'Fichas','feedback.html':'Feedback','letras.html':'Letras y transcripciones',
 'accesibilidad.html':'Accesibilidad','prensa.html':'Prensa'
};
const storageKey='afaces-breadcrumb-trail-v1';
const maxTrail=8;
const current=new URL(location.href);
const page=current.pathname.split('/').pop()||'welcome.html';
if(!Object.hasOwn(pages,page))return;
const main=document.querySelector('main');if(!main&&page!=='welcome.html')return;
const clean=url=>{try{const u=new URL(url,location.href);if(u.origin!==location.origin)return null;const file=u.pathname.split('/').pop()||'welcome.html';if(!Object.hasOwn(pages,file))return null;return {url:u.pathname+u.search+u.hash,page:file}}catch{return null}};
const same=(a,b)=>a&&b&&a.url===b.url;
const read=()=>{try{const data=JSON.parse(sessionStorage.getItem(storageKey)||'[]');return Array.isArray(data)?data.filter(x=>x&&typeof x.url==='string'&&clean(x.url)&&x.page===clean(x.url).page).slice(-maxTrail):[]}catch{return []}};
const save=items=>{try{sessionStorage.setItem(storageKey,JSON.stringify(items.slice(-maxTrail)))}catch{}};
const now={url:current.pathname+current.search+current.hash,page};
let trail=read();
const index=trail.findIndex(x=>same(x,now));
if(index>=0)trail=trail.slice(0,index+1);
else {
 // Un acceso directo no hereda una ruta anterior que no lo condujo hasta aquí.
 const entry=performance.getEntriesByType?.('navigation')?.[0];
 const source=clean(document.referrer);
 const previous=trail.at(-1);
 const referrerMatches=source&&previous&&source.page===previous.page&&source.url===previous.url;
 if(!referrerMatches&&entry?.type!=='back_forward')trail=[];
 trail.push(now);
}
if(!trail.length)trail=[now];
save(trail);
const labels=x=>{
 const u=new URL(x.url,location.href);
 if(x.page==='welcome.html'&&u.hash==='#discography')return 'Discografía';
 if(x.page==='welcome.html'&&u.hash==='#phases')return 'Fases';
 if(x.page==='welcome.html'&&u.hash==='#tematicas')return 'Temáticas';
 if(x.page==='welcome.html'&&u.hash==='#series')return 'Series';
 if(x.page==='recomendaciones.html'&&u.searchParams.get('nucleo'))return 'Recomendaciones · '+({control:'Sistema y control',vacio:'Vacío y desaparición',conflicto:'Conflicto social',identidad:'Identidad y lenguaje',existencia:'Filosofía y existencia'}[u.searchParams.get('nucleo')]||'Filtro');
 if(x.page==='lanzamiento.html'){const ref=u.searchParams.get('ref');return ref&&/^[AL]:\d+$/.test(ref)?'Ficha '+ref:'Catálogo'}
 return pages[x.page];
};
const structure=()=>{
 if(page==='welcome.html')return [];
 if(page==='lanzamiento.html')return [{url:'welcome.html#discography',page:'welcome.html'},now];
 if(['feedback.html','letras.html'].includes(page))return [{url:'accesibilidad.html',page:'accesibilidad.html'},now];
 return [now];
};
const path=trail.length>1?trail:structure();
const nav=document.createElement('nav');nav.className='af-breadcrumbs';nav.setAttribute('aria-label','Ruta de navegación');
const ol=document.createElement('ol');const nodes=[{url:'welcome.html',page:'welcome.html'},...path];
const unique=[];for(const n of nodes){if(!unique.length||!same(unique.at(-1),n))unique.push(n)}
unique.forEach((n,i)=>{const li=document.createElement('li');const last=i===unique.length-1;if(last){const span=document.createElement('span');span.textContent=labels(n);span.setAttribute('aria-current','page');span.id='af-breadcrumb-current';li.append(span)}else{const link=document.createElement('a');link.href=n.url;link.textContent=labels(n);link.setAttribute('aria-label',labels(n));li.append(link)}ol.append(li)});
nav.append(ol);
if(main)main.insertBefore(nav,main.firstChild);
if(page==='lanzamiento.html'){
 const heading=document.getElementById('title');
 if(heading){const update=()=>{if(heading.textContent.trim()){const end=document.getElementById('af-breadcrumb-current');if(end)end.textContent=heading.textContent.trim()}};new MutationObserver(update).observe(heading,{childList:true,characterData:true,subtree:true});update()}
}
// Registrar la navegación interna antes de que el navegador abandone la página.
document.addEventListener('click',e=>{
 const anchor=e.target.closest?.('a[href]');if(!anchor||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||anchor.target==='_blank'||anchor.hasAttribute('download'))return;
 const destination=clean(anchor.href);if(!destination)return;
 const previous={url:location.pathname+location.search+location.hash,page};
 let next=read();const i=next.findIndex(x=>same(x,previous));next=i>=0?next.slice(0,i+1):[previous];
 const j=next.findIndex(x=>same(x,destination));if(j>=0)next=next.slice(0,j+1);else next.push(destination);
 save(next);
},true);
window.addEventListener('pageshow',e=>{if(e.persisted){const currentTrail=read();if(currentTrail.length&&currentTrail.at(-1).url!==now.url){const i=currentTrail.findIndex(x=>same(x,now));if(i>=0)save(currentTrail.slice(0,i+1))}}});
})();
