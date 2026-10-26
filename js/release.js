'use strict';
(async()=>{
const by=id=>document.getElementById(id);
const params=new URLSearchParams(location.search),ref=params.get('ref');
const status=by('status');
if(!/^[AL]:\d+$/.test(ref||'')){status.textContent='Referencia inválida. Abre una ficha desde el catálogo.';return}
try{
const response=await fetch('data/metadata.json',{cache:'no-cache'});
if(!response.ok)throw Error('HTTP '+response.status);
const data=await response.json(),item=data.videos.find(x=>x.ref===ref);
if(!item){status.textContent='Lanzamiento no encontrado.';return}
const videoId=new URL(item.youtube_url).searchParams.get('v');
if(!/^[\w-]{11}$/.test(videoId||''))throw Error('Identificador de vídeo incorrecto');
by('title').textContent=item.titulo||item.title;
document.title=(item.titulo||item.title)+' · AFACES';
by('meta').textContent=(item.coleccion==='lp'?'LP ':'Álbum ')+item.numero+(item.publishedAt?' · '+item.publishedAt:'');
const frame=document.createElement('iframe');frame.src='https://www.youtube-nocookie.com/embed/'+videoId;frame.title='Reproductor de '+(item.titulo||item.title);frame.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';frame.allowFullscreen=true;frame.loading='lazy';by('player').append(frame);
const tracks=Array.isArray(item.tracklist)?item.tracklist:[];
const time=n=>{const h=Math.floor(n/3600),m=Math.floor(n%3600/60),s=Math.floor(n%60);return(h?h+':':'')+String(m).padStart(h?2:1,'0')+':'+String(s).padStart(2,'0')};
if(!tracks.length){const p=document.createElement('p');p.textContent='El listado de canciones todavía no está documentado para este vídeo.';by('tracks').append(p)}
else tracks.forEach((track,i)=>{if(!Number.isFinite(track.start_time)||track.start_time<0)return;const row=document.createElement('div');row.className='track';const stamp=document.createElement('span');stamp.className='stamp';stamp.textContent=time(track.start_time);const link=document.createElement('a');link.textContent=(i+1)+'. '+track.title;link.href='https://www.youtube.com/watch?v='+videoId+'&t='+Math.floor(track.start_time)+'s';link.target='_blank';link.rel='noopener noreferrer';link.title='Abrir en YouTube en '+time(track.start_time);row.append(stamp,link);by('tracks').append(row)});
by('description').textContent=item.description||'La descripción original de YouTube todavía no se ha importado.';
status.textContent='Ficha '+ref;
}catch(e){status.textContent='No se pudo cargar la ficha.';console.error(e)}
})();