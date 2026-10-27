'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.join(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const page=read('prensa.html');
const source=read('js/counter.js');

test('EPK semántico español, secciones para profesionales y sin enlaces vacíos',()=>{
  assert.match(page,/<html lang="es"/);
  assert.match(page,/<title>Prensa y EPK oficial/);
  assert.match(page,/<meta name="description"/);
  assert.equal((page.match(/<main\b/g)||[]).length,1);
  assert.equal((page.match(/<h1\b/g)||[]).length,1);
  for(const label of ['Biografía corta','Biografía larga','Empieza por escuchar',
    'La música también tiene imagen','Hitos. Sin medallas inventadas','Canales de distribución del sistema','Fotos. Sin correos de ida y vuelta','Contacto para prensa'])
    assert.ok(page.includes(label),label);
  for(const tag of (page.match(/<(?:a|button|input)\b[^>]*>/g)||[]))assert.match(tag,/aria-label=/,tag);
  assert.ok(!page.includes('href="#"'));
  assert.ok(!page.includes('googleapis.com'));
  assert.ok(page.includes('src="js/counter.js"'));
  assert.ok(!page.includes('Más de 72'));
  assert.ok(!page.includes('bajo solicitud'));
});

test('biografía corta es menor de 80 palabras y antecede a los bloques de contenido',()=>{
  const bio=page.match(/<section class="press-short"[\s\S]*?<p class="press-prose">([^<]+)<\/p>/)?.[1];
  assert.ok(bio);
  assert.ok(bio.trim().split(/\s+/).length<=80);
  assert.ok(page.indexOf('class="press-short"')<page.indexOf('id="bio-larga"'));
});
test('playlist señalizada y 2 videoclips suministrados, con enlaces descriptivos',()=>{
  const songs=page.match(/<ol class="press-curation">([\s\S]*?)<\/ol>/)?.[1]||'';
  const videos=page.match(/<ul class="press-video-links">([\s\S]*?)<\/ul>/)?.[1]||'';
  assert.equal((songs.match(/<li>/g)||[]).length,0);
  assert.equal((videos.match(/<li>/g)||[]).length,2);
  assert.ok(page.includes('Esenciales para prensa'));
  assert.ok(!page.includes('youtube.com/watch?v=SWNbhMxS4S4'));
  assert.ok(page.includes('https://www.youtube.com/watch?v=nR1u7q244bk'));
  assert.ok(page.includes('https://www.youtube.com/watch?v=q642i-jRWOA'));
  assert.equal((videos.match(/youtube\.com\/watch\?v=/g)||[]).length,2);
});
test('dos archivos de imagen, descarga local y créditos pendientes explícitos',()=>{
  const photos=page.match(/<div class="press-gallery">([\s\S]*?)<\/div>/)?.[1]||'';
  assert.equal((photos.match(/<figure class="press-photo">/g)||[]).length,2);
  assert.equal((photos.match(/\bdownload=/g)||[]).length,2);
  assert.ok(photos.includes('press-photo-vertical'));
  assert.ok(photos.includes('press-photo-archive'));
  assert.ok(photos.includes('assets/images/press/afaces-archivo.jpg'));
  assert.ok(fs.existsSync(path.join(root,'assets/images/press/afaces-archivo.jpg')));
  assert.ok(page.includes('Autoría fotográfica no documentada'));
  assert.ok(page.includes('No se promete una resolución'));
});
test('navegación compartida, estilos responsive, fallback y fuente local',()=>{
  assert.ok(page.includes('src="js/persistent-navigation.js"'));
  assert.ok(page.includes('src="js/mobile-nav.js"'));
  assert.ok(page.includes('src="js/modes.js"'));
  assert.ok(page.includes('href="prensa.html"'));
  assert.ok(read('css/prensa.css').includes('@media(max-width:740px)'));
  assert.ok(page.includes('>Cargando cifras…</span>'));
  assert.match(source,/fetch\('data\/metadata\.json'/);
  assert.ok(!source.includes('googleapis'));
});

function invoke(response,willReject=false){
  const nodes={};
  for(const key of ['total','albums','lps','phases','nuclei','duration']){
    nodes[key]=Array.from({length:key==='total'?3:1},()=>({textContent:key==='total'?'Cargando cifras…':'Sin datos'}));
  }
  const status={textContent:'Datos de referencia disponibles'};
  const doc={querySelectorAll:selector=>{
    const key=selector.match(/data-press-counter="([^"]+)"/)?.[1];
    return nodes[key]??[];
  },getElementById:id=>id==='pressDataStatus'?status:null};
  const fetch=async url=>{
    assert.equal(url,'data/metadata.json');
    if(willReject)throw Error('Sin red');
    return {ok:true,json:async()=>response};
  };
  vm.runInNewContext(source,{document:doc,fetch,Intl,Number,Math,Error,String,Array,setTimeout,clearTimeout});
  return new Promise(resolve=>setImmediate(()=>resolve({nodes,status})));
}
test('contador usa longitud real del array y agrega duración disponible sin falsos totales',async()=>{
  const fixture={videos:[
    {coleccion:'album',durationSeconds:3600},{coleccion:'lp',durationSeconds:3660},{coleccion:'lp'}
  ],architecture:{phases:[{},{}],nuclei:[{},{},{}]}};
  const {nodes,status}=await invoke(fixture);
  assert.ok(nodes.total.every(n=>n.textContent==='3'));
  assert.equal(nodes.albums[0].textContent,'1');
  assert.equal(nodes.lps[0].textContent,'2');
  assert.equal(nodes.phases[0].textContent,'2');
  assert.equal(nodes.nuclei[0].textContent,'3');
  assert.equal(nodes.duration[0].textContent,'2 h 01 min');
  assert.match(status.textContent,/2 de 3 lanzamientos/);
});
test('fallback estático ante fallo de lectura no se sustituye por cero',async()=>{
  const {nodes,status}=await invoke(null,true);
  assert.ok(nodes.total.every(n=>n.textContent==='No disponible'));
  assert.match(status.textContent,/Error al cargar el sistema/);
});

test('copy del manifiesto, sin cifras fijas ni llamadas a APIs de plataformas',()=>{
  assert.match(page,/No juzgues de oídas/);
  assert.match(page,/No necesito un juicio complaciente/);
  assert.match(page,/No juzgues en quince segundos/);
  assert.ok(!page.includes('126 lanzamientos'));
  assert.ok(!page.includes('bajo solicitud'));
  assert.match(source,/fetch\('data\/metadata\.json'/);
  assert.ok(!source.includes('api.spotify.com'));
  assert.ok(!source.includes('googleapis.com'));
});

test('distribución incluye TikTok y SoundCloud con identificadores correctos',()=>{
  const src=page.match(/<section class="press-section" aria-labelledby="redes-titulo">([\s\S]*?)<\/section>/)?.[1]||'';
  for(const link of [
    'https://www.tiktok.com/@el_afaces',
    'https://soundcloud.com/afaces',
    'https://www.youtube.com/@afaces',
    'https://afaces.bandcamp.com',
    'https://www.instagram.com/el_afaces/',
    'https://open.spotify.com/artist/3zbzWzOqZcY3mZBG5ICF9l'
  ])assert.ok(src.includes(link),link);
  const links=src.match(/<a\b[^>]*>/g)||[];
  assert.equal(links.length,6);
  for(const link of links)assert.match(link,/aria-label=/);
});

test('los dos repositorios y la radio propia se explican sin ceder música',()=>{
  const block=page.match(/<section class="press-section" aria-labelledby="codigo-titulo">([\s\S]*?)<\/section>/)?.[1]||'';
  assert.ok(block.includes('https://github.com/afaces/afaces.github.io'));
  assert.ok(block.includes('https://github.com/Axlfc/afaces_web'));
  assert.ok(block.includes('Tu web. Tu radio. Tu catálogo.'));
  assert.ok(block.includes('La música y las imágenes de Afaces no se ceden'));
  assert.ok(block.includes('docs/para-artistas.md'));
  for(const a of (block.match(/<a\b[^>]*>/g)||[]))assert.match(a,/aria-label=/);
  const guide=read('docs/para-artistas.md');
  for(const part of ['RADIO_TRACKS','data/metadata.json','Git LFS','LICENSE','afaces/afaces.github.io','Axlfc/afaces_web'])
    assert.ok(guide.includes(part),part);
});

test('licencias para código y manuales, derechos del catálogo separados',()=>{
  const license=read('LICENSE');
  const rights=read('LICENCIAS.md');
  const guide=read('docs/para-artistas.md');
  const readme=read('README.md');
  assert.ok(license.startsWith('MIT License'));
  assert.match(license,/Copyright \(c\) 2026 Axel Fernández Curros \(Afaces\)/);
  for(const key of ['MIT','CC BY-SA 4.0','derechos reservados','Git LFS','Bootswatch']){
    assert.ok(rights.includes(key),key);
  }
  assert.ok(guide.includes('**MIT**'));
  assert.ok(!guide.includes('Licencia pendiente de formalizar'));
  assert.ok(readme.includes('LICENSE'));
  assert.ok(readme.includes('RADIO_TRACKS'));
  assert.ok(page.includes('licencia MIT'));
  assert.ok(page.includes('LICENCIAS.md'));
});
