'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.join(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'js/persistent-navigation.js'), 'utf8');
const pages = ['welcome','onboarding','perfiles','mapa','timeline','lanzamiento',
  'recomendaciones','feedback','letras','accesibilidad','prensa'];

test('once páginas cargan la navegación persistente tras la radio', () => {
  for (const name of pages) {
    const html = fs.readFileSync(path.join(root, name + '.html'), 'utf8');
    assert.equal((html.match(/src="js\/persistent-navigation.js"/g) || []).length, 1, name);
    assert.ok(html.indexOf('src="js/persistent-navigation.js"') >
      html.indexOf('src="js/radio-player.js"'), name);
  }
});
test('la navegación interna no destruye el audio ni intercepta enlaces externos', () => {
  const listeners = {};
  const location = new URL('https://example.org/~afaces/welcome.html');
  const replacements = [];
  let frames = 0, pauses = 0;
  const nodes = {radioPanel:{classList:{contains:()=>false}},radioBackdrop:{}};
  const doc = {
    getElementById:key=>nodes[key]||null,
    createElement() {
      frames++;
      return {style:{},addEventListener(){},
        contentWindow:{
          location:{pathname:'/~afaces/welcome.html',search:'',protocol:'about:',
            replace(url) {
              replacements.push(url);
              this.pathname = new URL(url).pathname;
              this.search = new URL(url).search;
              this.protocol = 'https:';
            }},
          history:{replaceState(){}},scrollTo(){},
          Event:class {},dispatchEvent(){}
        },
        contentDocument:{title:'AFACES',getElementById:()=>null}};
    },
    body:{style:{},replaceChildren(){}},
    addEventListener(type,fn){listeners[type]=fn},
    documentElement:{dataset:{}}
  };
  const player={getState:()=>({playing:true}),toggle(){},close(){},pause(){pauses++}};
  const window={AfacesRadio:player,addEventListener(type,fn){listeners[type]=fn}};
  window.top=window;
  const history={pushState(_state,_unused,url){location.href=new URL(url).href}};
  vm.runInNewContext(source,{window,document:doc,location,history,URL,console});
  function click(href) {
    let prevented=false;
    const anchor={href,target:'',hasAttribute:()=>false};
    listeners.click({button:0,defaultPrevented:false,target:{closest:()=>anchor},
      preventDefault(){prevented=true}});
    return prevented;
  }
  assert.equal(click('https://other.example.org/path'),false);
  assert.equal(frames,0);
  assert.equal(click('https://example.org/~afaces/perfiles.html'),true);
  assert.equal(frames,1);
  assert.equal(replacements.at(-1),'https://example.org/~afaces/perfiles.html');
  assert.equal(location.pathname,'/~afaces/perfiles.html');
  assert.equal(click('https://example.org/~afaces/mapa.html#detalle'),true);
  assert.equal(frames,1);
  assert.equal(replacements.at(-1),'https://example.org/~afaces/mapa.html#detalle');
  assert.equal(pauses,0);
});
