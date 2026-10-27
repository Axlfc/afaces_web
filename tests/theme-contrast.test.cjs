'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.join(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const css=read('css/styles.css');
function tokens(theme){
 const pattern=theme==='dark'?/:root,\s*\[data-theme="dark"\]\s*\{([^}]+)\}/:/\[data-theme="light"\]\s*\{([^}]+)\}/;
 const rule=css.match(pattern);
 assert.ok(rule,'Paleta de '+theme+' ausente');
 return Object.fromEntries([...rule[1].matchAll(/--([\w-]+)\s*:\s*(#[0-9a-f]{6})/gi)].map(x=>[x[1],x[2]]));
}
function luminance(hex){
 const components=hex.slice(1).match(/../g).map(x=>parseInt(x,16)/255);
 const linear=components.map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);
 return .2126*linear[0]+.7152*linear[1]+.0722*linear[2];
}
function contrast(a,b){
 const aa=luminance(a),bb=luminance(b);
 return (Math.max(aa,bb)+.05)/(Math.min(aa,bb)+.05);
}
for(const theme of ['dark','light']){
 test('Contraste WCAG AA de textos, enlaces y fondos, tema '+theme,()=>{
  const p=tokens(theme);
  const backgrounds=['black','dark','mid'];
  for(const surface of backgrounds){
   for(const color of ['text','muted','accent','link','gold']){
    const cr=contrast(p[color],p[surface]);
    assert.ok(cr>=4.5,theme+' '+color+' / '+surface+': '+cr.toFixed(2)+' < 4.5');
   }
   const border=contrast(p['control-border'],p[surface]);
   assert.ok(border>=3,theme+' borde de control / '+surface+': '+border.toFixed(2));
  }
  const radio=contrast(p['radio-muted'],p['radio-bg']);
  assert.ok(radio>=4.5,theme+' texto del reproductor: '+radio.toFixed(2));
  const button=contrast(p['on-accent'],p['accent-solid']);
  assert.ok(button>=4.5,theme+' botón: '+button.toFixed(2));
  const accentButton=contrast(p['accent-solid'],p.dark);
  assert.ok(accentButton>=3,theme+' botón contra superficie: '+accentButton.toFixed(2));
 });
}
test('Enlaces normales y visitados usan tokens temáticos y subrayado identificable',()=>{
 assert.match(css,/:where\(a:link,a:visited\)\{color:var\(--link\)\}/);
 assert.match(css,/text-decoration:underline/);
 assert.match(css,/:where\(a:link,a:visited\):focus-visible/);
 for(const file of ['css/discovery.css','css/architecture.css']){
  const src=read(file);
  assert.ok(!src.includes('background:var(--accent);color:#fff'),file+' color de botón ilegible');
 }
});
test('Etiquetas y accesos del reproductor siguen visibles en modo claro',()=>{
 assert.match(css,/:root\[data-theme="light"\] \.ptag/);
 assert.match(css,/--radio-muted:#62594f/);
 assert.match(css,/--radio-muted:#a9a198/);
});
