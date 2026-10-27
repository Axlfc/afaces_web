'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const path=require('node:path');

const source=fs.readFileSync(path.join(__dirname,'..','js','modes.js'),'utf8');

class Element {
  constructor(tag, id=''){
    this.tagName=tag;this.id=id;this.children=[];this.attributes={};
    this.listeners={};this.textContent='';this.className='';
  }
  append(...children){this.children.push(...children)}
  setAttribute(k,v){this.attributes[k]=String(v)}
  getAttribute(k){return this.attributes[k]??null}
  querySelector(selector){
    if(!selector.startsWith('#'))return null;
    const wanted=selector.slice(1);
    return this.children.find(e=>e.id===wanted)||null;
  }
  addEventListener(event,handler){(this.listeners[event]??=[]).push(handler)}
  click(){for(const handler of this.listeners.click||[])handler()}
}
function createPage(storage,existing=false){
  const body=new Element('body');
  const events=[];
  const win={listeners:{},
    addEventListener(name,callback){(this.listeners[name]??=[]).push(callback)},
    dispatchEvent(event){events.push(event)},
    dispatch(name,payload){for(const handler of this.listeners[name]||[])handler(payload)}
  };
  if(existing){
    const group=new Element('div');group.className='ux-mode-switch';
    group.append(new Element('button','modeNovice'),new Element('button','modeExpert'));
    body.append(group);
  }
  const doc={
    body,documentElement:{dataset:{}},
    createElement(name){return new Element(name)},
    querySelector(selector){
      return selector==='.ux-mode-switch'
        ? body.children.find(child=>child.className==='ux-mode-switch')||null
        : null;
    }
  };
  const localStorage={
    getItem:key=>storage.get(key)??null,
    setItem:(key,value)=>storage.set(key,value)
  };
  class CustomEvent{constructor(type,args){this.type=type;this.detail=args.detail}}
  vm.runInNewContext(source,{document:doc,window:win,localStorage,CustomEvent});
  const group=body.children.find(child=>child.className==='ux-mode-switch');
  return {body,doc,win,events,group,
    novice:group.querySelector('#modeNovice'),expert:group.querySelector('#modeExpert')};
}

test('crea el selector en páginas sin controles previos',()=>{
  const storage=new Map();
  const page=createPage(storage);
  assert.equal(page.body.children.length,1);
  assert.equal(page.group.getAttribute('role'),'group');
  assert.equal(page.novice.getAttribute('aria-pressed'),'true');
  assert.equal(page.expert.getAttribute('aria-pressed'),'false');
  assert.equal(page.doc.documentElement.dataset.viewMode,'novato');
  assert.equal(page.novice.textContent,'Vista Simplificada');
  assert.equal(page.expert.textContent,'Vista Completa');
});

test('no duplica el selector de la portada',()=>{
  const page=createPage(new Map(),true);
  assert.equal(page.body.children.length,1);
  assert.equal(page.group.children.length,2);
  page.novice.click();
  assert.equal(page.doc.documentElement.dataset.viewMode,'novato');
});

test('conserva Novato/Experto entre páginas y sincroniza cambios',()=>{
  const storage=new Map();
  const home=createPage(storage);
  home.novice.click();
  assert.equal(storage.get('afaces-view-mode'),'novato');
  const map=createPage(storage);
  assert.equal(map.doc.documentElement.dataset.viewMode,'novato');
  assert.equal(map.novice.getAttribute('aria-pressed'),'true');
  map.expert.click();
  assert.equal(storage.get('afaces-view-mode'),'experto');
  home.win.dispatch('storage',{key:'afaces-view-mode'});
  assert.equal(home.novice.getAttribute('aria-pressed'),'false');
  assert.equal(home.expert.getAttribute('aria-pressed'),'true');
  assert.equal(home.events.at(-1).detail.mode,'experto');
});
