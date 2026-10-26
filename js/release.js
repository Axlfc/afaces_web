'use strict';
(async()=>{
const by=id=>document.getElementById(id);
const params=new URLSearchParams(location.search),ref=params.get('ref');
const status=by('status');
if(ref && !/^[AL]:\d+$/.test(ref)){status.textContent='Referencia inválida.';return}
try{
const response=await fetch('data/metadata.json',{cache:'no-cache'});
if(!response.ok)throw Error('HTTP '+response.status);
const data=await response.json();if(!ref){status.textContent='Explora las '+data.videos.length+' fichas del catálogo.';by('title').textContent='Catálogo completo';by('meta').textContent='Álbumes y LP';for(const v of data.videos){const row=document.createElement('div');row.className='track';const link=document.createElement('a');link.href='lanzamiento.html?ref='+encodeURIComponent(v.ref);link.textContent=v.ref+' · '+(v.titulo||v.title);row.append(link);by('tracks').append(row)}by('description').textContent='Selecciona un lanzamiento para consultar su descripción y canciones.';return}const item=data.videos.find(x=>x.ref===ref);
if(!item){status.textContent='Lanzamiento no encontrado.';return}
const videoId=new URL(item.youtube_url).searchParams.get('v');
if(!/^[\w-]{11}$/.test(videoId||''))throw Error('Identificador de vídeo incorrecto');
by('title').textContent=item.titulo||item.title;
document.title=(item.titulo||item.title)+' · AFACES';
by('meta').textContent=(item.coleccion==='lp'?'LP ':'Álbum ')+item.numero+(item.publishedAt?' · '+item.publishedAt:'');
const frame=document.createElement('iframe');frame.id='releaseVideo';frame.src='https://www.youtube-nocookie.com/embed/'+videoId+'?enablejsapi=1';frame.title='Reproductor de '+(item.titulo||item.title);frame.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';frame.allowFullscreen=true;frame.loading='lazy';by('player').append(frame);
const tracks=Array.isArray(item.tracklist)?item.tracklist:[];
const time=n=>{const h=Math.floor(n/3600),m=Math.floor(n%3600/60),s=Math.floor(n%60);return(h?h+':':'')+String(m).padStart(h?2:1,'0')+':'+String(s).padStart(2,'0')};
if(!tracks.length){const p=document.createElement('p');p.textContent='El listado de canciones todavía no está documentado para este vídeo.';by('tracks').append(p)}
else tracks.forEach((track,i)=>{if(!Number.isFinite(track.start_time)||track.start_time<0)return;const row=document.createElement('div');row.className='track';const stamp=document.createElement('span');stamp.className='stamp';stamp.textContent=time(track.start_time);const link=document.createElement('button');link.type='button';link.textContent=(i+1)+'. '+track.title;link.title='Reproducir aquí desde '+time(track.start_time);link.addEventListener('click',()=>{frame.contentWindow?.postMessage(JSON.stringify({event:'command',func:'seekTo',args:[Math.floor(track.start_time),true]}),'https://www.youtube-nocookie.com');frame.contentWindow?.postMessage(JSON.stringify({event:'command',func:'playVideo',args:[]}), 'https://www.youtube-nocookie.com');frame.scrollIntoView({behavior:'smooth',block:'center'})});row.append(stamp,link);by('tracks').append(row)});
by('description').textContent=item.description||'La descripción original de YouTube todavía no se ha importado.';
status.textContent='Ficha '+ref;
}catch(e){status.textContent='No se pudo cargar la ficha.';console.error(e)}
})();