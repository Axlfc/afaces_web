'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'..');
const get=p=>fs.readFileSync(path.join(root,p),'utf8');
test('dossier de prensa semántico, español y accesible',()=>{
  const src=get('prensa.html');
  assert.match(src,/<html lang="es"/);
  assert.match(src,/<title>Prensa y EPK oficial/);
  assert.match(src,/<meta name="description"/);
  assert.equal((src.match(/<main\b/g)||[]).length,1);
  assert.equal((src.match(/<h1\b/g)||[]).length,1);
  for(const name of ['Biografía corta','Biografía larga','Datos clave','Escucha para medios','Fotografías en alta resolución','Contacto directo de prensa'])
    assert.ok(src.includes(name),name);
  for(const value of ['126','72','9','11','IALEX','NEXUZ','PROTOCOLO','KODE','afaces_music_forge'])
    assert.ok(src.includes(value),value);
  for(const element of (src.match(/<(?:a|button|input)\b[^>]*>/g)||[]))
    assert.match(element,/aria-label=/,element);
  assert.ok(!src.includes('googleapis.com'));
  assert.match(src,/href="https:\/\/www\.youtube\.com\/watch\?v=/);
  assert.match(src,/href="mailto:afaces@salou\.tinet\.cat"/);
  assert.ok(!src.includes('href="#"'));
});
test('pie de página, menú, migas y radio persistente dirigen al dossier actual',()=>{
  for(const name of ['welcome','onboarding','perfiles','mapa','timeline','lanzamiento','recomendaciones','feedback','letras','accesibilidad','prensa']){
    const src=get(name+'.html');
    assert.ok(src.includes('href="prensa.html"'),name);
    assert.ok(!src.includes('href="https://afaces.github.io/epk"'),name);
  }
  assert.ok(get('welcome.html').includes('¿Eres periodista? Descarga nuestro EPK'));
  assert.ok(get('js/mobile-nav.js').includes("['Prensa','prensa.html',true]"));
  assert.ok(get('js/breadcrumbs.js').includes("'prensa.html':'Prensa'"));
  assert.ok(get('js/persistent-navigation.js').includes("'prensa.html'"));
  assert.ok(get('scripts/build_tinet.py').includes('"prensa.html"'));
});
test('CSS prensa responsive con foco visible',()=>{
  const src=get('css/prensa.css');
  assert.match(src,/@media\(max-width:740px\)/);
  assert.match(src,/focus-visible/);
  assert.match(src,/var\(--accent\)/);
});
