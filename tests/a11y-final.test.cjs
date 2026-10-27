'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.join(__dirname,'..');
const html=name=>fs.readFileSync(path.join(root,name),'utf8');
const pages=['welcome','onboarding','perfiles','mapa','timeline','lanzamiento',
  'recomendaciones','feedback','letras','accesibilidad'];
test('las diez páginas incluyen main semántico, salto de teclado y no solicitan Google Fonts',()=>{
  for(const name of pages){
    const page=html(name+'.html');
    assert.equal((page.match(/<main\b/g)||[]).length,1,name);
    assert.match(page,/<a class="a11y-skip-link" href="#[^"]+">Saltar al contenido principal<\/a>/,name);
    assert.match(page,/<main\\b[^>]*tabindex="-1"/,name);
    assert.ok(!page.includes('fonts.googleapis.com'),name);
    assert.ok(!page.includes('Rutas de exploración provisionales'),name);
  }
});
test('cinco accesos temáticos nativos navegan a recomendaciones por parámetro',()=>{
  const page=html('welcome.html');
  const buttons=[...page.matchAll(/<button class="ux-entry-choice" type="submit" name="nucleo" value="([^"]+)" aria-label="([^"]+)">([^<]+)<\/button>/g)];
  assert.equal(buttons.length,5);
  assert.deepEqual(buttons.map(x=>x[1]),['control','vacio','conflicto','identidad','existencia']);
  assert.match(page,/<form action="recomendaciones.html" method="get" aria-labelledby="puertas-titulo">/);
});
test('vista inicial simplificada sin ocultar contenido a usuarios sin JavaScript',()=>{
  const source=html('js/modes.js'),styles=html('css/discovery.css');
  assert.match(source,/const normalized=mode=>mode==='experto'\?'experto':'novato'/);
  assert.match(styles,/html\[data-js="true"\]\[data-view-mode="novato"\] #phases/);
  assert.match(styles,/:target\{display:block!important\}/);
  assert.ok(html('welcome.html').includes('id="resumenFases"'));
});
test('recomendaciones limitadas a cinco, catálogo verificable de nueve fases y once núcleos',()=>{
  const src=html('js/discovery.js');
  assert.ok(src.includes('const chosen=found.slice(0,5)'));
  assert.ok(src.includes('chosen.forEach(x=>out.append(makeCard(x)))'));
  const meta=JSON.parse(html('data/metadata.json'));
  assert.equal(meta.architecture.phases.length,9);
  assert.equal(meta.architecture.nuclei.length,11);
  assert.match(html('js/home-summary.js'),/fetch\('data\/metadata.json'/);
});
test('opiniones por formulario seguro y transcripciones sin contenido publicado ficticio',()=>{
  const feedback=html('feedback.html'),letras=html('letras.html');
  assert.match(feedback,/action="https:\/\/formsubmit.co\//);
  assert.match(feedback,/name="ayuda"/);
  assert.match(feedback,/name="falta"/);
  assert.match(letras,/<template id="plantilla-transcripcion">/);
});
