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
  for(const label of ['Biografía corta','Biografía larga','Música seleccionada para prensa',
    'Vídeos','Hitos del proyecto','Enlaces y redes','Fotografías de prensa','Contacto directo de prensa'])
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
test('selección de exactamente 4 piezas y 2 videoclips, con enlaces externos descriptivos',()=>{
  const songs=page.match(/<ol class="press-curation">([\s\S]*?)<\/ol>/)?.[1]||'';
  const videos=page.match(/<ul class="press-video-links">([\s\S]*?)<\/ul>/)?.[1]||'';
  assert.equal((songs.match(/<li>/g)||[]).length,4);
  assert.equal((videos.match(/<li>/g)||[]).length,2);
  assert.equal((songs.match(/youtube\.com\/watch\?v=/g)||[]).length,4);
});
test('dos encuadres con vínculo al original, créditos pendientes explícitos',()=>{
  const photos=page.match(/<div class="press-gallery">([\s\S]*?)<\/div>/)?.[1]||'';
  assert.equal((photos.match(/<figure class="press-photo">/g)||[]).length,2);
  assert.equal((photos.match(/\bdownload=/g)||[]).length,2);
  assert.ok(photos.includes('press-photo-vertical'));
  assert.ok(photos.includes('press-photo-horizontal'));
  assert.ok(page.includes('Crédito fotográfico no identificado'));
  assert.ok(page.includes('resolución nativa están pendientes de verificación'));
});
test('navegación compartida, estilos responsive, fallback y fuente local',()=>{
  assert.ok(page.includes('src="js/persistent-navigation.js"'));
  assert.ok(page.includes('src="js/mobile-nav.js"'));
  assert.ok(page.includes('src="js/modes.js"'));
  assert.ok(page.includes('href="prensa.html"'));
  assert.ok(read('css/prensa.css').includes('@media(max-width:740px)'));
  assert.ok(page.includes('>126+</span>'));
  assert.match(source,/fetch\('data\/metadata\.json'/);
  assert.ok(!source.includes('googleapis'));
});

function invoke(response,willReject=false){
  const nodes={};
  for(const key of ['total','albums','lps','phases','nuclei','duration']){
    nodes[key]=Array.from({length:key==='total'?3:1},()=>({textContent:key==='total'?'126+':'Sin datos'}));
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
  vm.runInNewContext(source,{document:doc,fetch,Intl,Number,Math,Error,String,Array});
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
  assert.ok(nodes.total.every(n=>n.textContent==='126+'));
  assert.match(status.textContent,/No se pudo actualizar el catálogo/);
});
