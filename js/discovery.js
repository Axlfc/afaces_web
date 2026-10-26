'use strict';
const NUCLEOS={control:'Sistema y control',vacio:'Vacío y desaparición',conflicto:'Conflicto social',identidad:'Identidad y lenguaje',existencia:'Filosofía y existencia'};
const KEYWORDS={control:/sistema|control|máquina|protocolo|algoritmo|vigilancia/i,vacio:/vacío|ausencia|desapar|silencio|archivo|olvido/i,conflicto:/conflicto|social|clase|emigra|protesta|violencia|política/i,identidad:/identidad|lenguaje|palabra|nombre|voz|ortograf/i,existencia:/existencia|filosof|sentido|muerte|conciencia|ser humano/i};
const el=(tag,cls,txt)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(txt)n.textContent=txt;return n};
function urlVideo(item){const direct=item.youtube_url||item.youtube||item.url;try{const u=new URL(direct);if(['youtube.com','www.youtube.com','youtu.be','music.youtube.com'].includes(u.hostname)&&u.protocol==='https:')return u.href}catch{}const id=item.vid||item.videoId||item.youtube_id;if(typeof id==='string'&&/^[a-zA-Z0-9_-]{11}$/.test(id))return 'https://www.youtube.com/watch?v='+id;return null}
function matches(item,n){const tags=Array.isArray(item.nucleos)?item.nucleos:[];if(tags.includes(n)||item.nucleo===n)return true;const text=[item.title,item.titulo,item.description,item.descripcion,item.phase,item.fase].filter(x=>typeof x==='string').join(' ');return KEYWORDS[n].test(text)}
async function loadJSON(path){const r=await fetch(path,{cache:'no-cache'});if(!r.ok)throw Error('HTTP '+r.status);return r.json()}
async function recommendations(){
 const status=document.getElementById('estado'),out=document.getElementById('resultados'),title=document.getElementById('titulo');
 const params=new URLSearchParams(location.search),n=params.get('nucleo'),archN=params.get('nucleo_arch'),phase=params.get('fase');
 const selected=Object.hasOwn(NUCLEOS,n)?n:null;
 const form=document.getElementById('recommendationFilters');
 if(form){const checked=form.querySelector('input[name="nucleo"][value="'+(selected||'')+'"]');if(checked)checked.checked=true;form.addEventListener('submit',e=>{e.preventDefault();const val=form.querySelector('input[name="nucleo"]:checked')?.value||'';location.href=val?'recomendaciones.html?nucleo='+encodeURIComponent(val):'recomendaciones.html'})}
 try{
  const [data,routes]=await Promise.all([loadJSON('data/metadata.json'),loadJSON('data/routes.json')]);
  const items=Array.isArray(data.videos)?data.videos:[];
  const eligible=items.filter(x=>x&&x.ref&&urlVideo(x));
  out.replaceChildren();
  const makeCard=item=>{const card=el('a','ux-card');card.href='lanzamiento.html?ref='+encodeURIComponent(item.ref);const video=urlVideo(item);const id=video?new URL(video).searchParams.get('v'):null;if(id){const cover=el('img','ux-cover');cover.src='https://i.ytimg.com/vi/'+id+'/hqdefault.jpg';cover.alt='Portada de '+(item.title||item.titulo||'lanzamiento');cover.loading='lazy';card.append(cover)}card.append(el('div','ux-release-meta',(item.coleccion==='lp'?'LP ':'ÁLBUM ')+(item.numero||'')+' / '+(item.fase||'Archivo')),el('h2','',item.title||item.titulo||'Lanzamiento'),el('p','','Ver ficha, canciones y vídeo integrado'));return card};
  if(archN){
   title.textContent='Recomendaciones por arquitectura';
   const found=eligible.filter(x=>String(x.fase_id)===phase&&(x.nucleos_architectura||[]).includes(archN));
   status.textContent=found.length?found.length+' lanzamientos para la fase y núcleo seleccionados.':'No hay lanzamientos clasificados en esta intersección.';
   found.forEach(x=>out.append(makeCard(x)));return;
  }
  if(n&&!selected){status.textContent='El núcleo indicado no existe. Elige uno de los filtros.';title.textContent='Explorar recomendaciones';return}
  if(selected){
   title.textContent=NUCLEOS[selected];const found=eligible.filter(x=>matches(x,selected));
   status.textContent=found.length?found.length+' lanzamientos relacionados con '+NUCLEOS[selected]+'.':'No hay lanzamientos clasificados en este núcleo.';
   found.slice(0,24).forEach(x=>out.append(makeCard(x)));return;
  }
  title.textContent='Descubre tu próximo lanzamiento';
  status.textContent='Elige un núcleo, una ruta editorial o explora una selección del catálogo. Ningún tema está preseleccionado.';
  const heading=el('h2','ux-recommend-heading','Rutas editoriales');out.append(heading);
  for(const [key,route] of Object.entries(routes)){const card=el('article','ux-card');card.append(el('h2','',route.titulo),el('p','',route.descripcion));const links=el('div','ux-picks');for(const ref of (route.lanzamientos||[]).slice(0,4)){const item=eligible.find(x=>x.ref===ref);if(!item)continue;const a=el('a','ux-release',item.title||item.titulo);a.href='lanzamiento.html?ref='+encodeURIComponent(ref);links.append(a)}card.append(links);out.append(card)}
  out.append(el('h2','ux-recommend-heading','Explorar el catálogo'));
  const picks=eligible.filter(x=>Array.isArray(x.tracklist)&&x.tracklist.length>0);
  const stride=Math.max(1,Math.floor(picks.length/8));picks.filter((_,i)=>i%stride===0).slice(0,8).forEach(x=>out.append(makeCard(x)));
 }catch(e){status.textContent='No se pudo cargar el catálogo. Inténtalo de nuevo más tarde.';console.error(e)}
}
async function profiles(){const out=document.getElementById('perfiles');try{const [routes,catalog]=await Promise.all([loadJSON('data/routes.json'),loadJSON('data/metadata.json')]);const items=Array.isArray(catalog.videos)?catalog.videos:[];out.replaceChildren();for(const [key,r] of Object.entries(routes)){const card=el('article','ux-card');card.append(el('h2','',r.titulo),el('p','',r.descripcion));const links=el('div','ux-actions');for(const n of r.nucleos||[]){if(!Object.hasOwn(NUCLEOS,n))continue;const a=el('a','ux-link',NUCLEOS[n]);a.href='recomendaciones.html?nucleo='+encodeURIComponent(n);links.append(a)}card.append(links);const picks=el('div','ux-picks');for(const ref of r.lanzamientos||[]){const item=items.find(v=>v.ref===ref);if(!item||!urlVideo(item))continue;const a=el('a','ux-release',item.title||item.titulo);a.href='lanzamiento.html?ref='+encodeURIComponent(item.ref);picks.append(a)}if(picks.childElementCount)card.append(picks);out.append(card)}}catch(e){out.replaceChildren(el('p','ux-status','No se pudieron cargar las rutas.'));console.error(e)}}
if(document.getElementById('resultados'))recommendations();if(document.getElementById('perfiles'))profiles();
