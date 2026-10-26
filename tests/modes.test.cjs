'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const source=fs.readFileSync(path.join(__dirname,'..','js','modes.js'),'utf8');

class Element {
  constructor(tag){
    this.tagName=tag;this.children=[];this.attrs={};this.listeners={};
    this.dataset={};this.textContent='';this.className='';this.id='';
  }
  setAttribute(name,value){this.attrs[name]=String(value)}
  getAttribute(name){return this.attrs[name]??null}
  append(child){this.children.push(child)}
  querySelector(selector){
    const id=selector.slice(1);
    for(const child of this.children){
      if(child.id===id)return child;
      const found=child.querySelector(selector);
      if(found)return found;
    }
    return null;
  }
  addEventListener(type,handler){(this.listeners[type]??=[]).push(handler)}
  click(){for(const callback of this.listeners.click||[])callback({type:'click'})}
}

function loadPage(values=new Map(),storageFails=false){
  const body=new Element('body');
  const root={dataset:{}};
  const document={
    body,documentElement:root,
    createElement(tag){return new Element(tag)},
    querySelector(selector){
      if(selector==='.ux-mode-switch')return body.children.find(x=>x.className==='ux-mode-switch')||null;
      return null;
    }
  };
  const listeners={};
  const events=[];
  const window={
    addEventListener(event,handler){(listeners[event]??=[]).push(handler)},
    dispatchEvent(event){events.push(event);return true},
    emit(event,info){for(const handler of listeners[event]||[])handler(info)}
  };
  const localStorage={
    getItem(key){if(storageFails)throw Error('denied');return values.get(key)||null},
    setItem(key,value){if(storageFails)throw Error('denied');values.set(key,value)}
  };
  class CustomEvent{constructor(type,options){this.type=type;this.detail=options.detail}}
  vm.runInNewContext(source,{document,window,localStorage,CustomEvent});
  const wrapper=document.querySelector('.ux-mode-switch');
  return {root,body,wrapper,values,window,events,
    novice:wrapper.querySelector('#modeNovice'),expert:wrapper.querySelector('#modeExpert')};
}

test('crea exactamente un selector con controles accesibles y estilo compartido',()=>{
  const page=loadPage();
  assert.equal(page.body.children.length,1);
  assert.equal(page.wrapper.getAttribute('role'),'group');
  assert.equal(page.wrapper.getAttribute('aria-label'),'Modo de navegación');
  assert.equal(page.root.dataset.viewMode,'experto');
  assert.equal(page.novice.getAttribute('aria-pressed'),'false');
  assert.equal(page.expert.getAttribute('aria-pressed'),'true');
});

test('persiste Novato y Experto entre páginas y notifica cambios',()=>{
  const store=new Map();
  const first=loadPage(store);
  first.novice.click();
  assert.equal(store.get('afaces-view-mode'),'novato');
  assert.equal(first.novice.getAttribute('aria-pressed'),'true');
  assert.equal(first.expert.getAttribute('aria-pressed'),'false');
  assert.equal(first.events.at(-1).detail.mode,'novato');
  const second=loadPage(store);
  assert.equal(second.root.dataset.viewMode,'novato');
  assert.equal(second.novice.getAttribute('aria-pressed'),'true');
  second.expert.click();
  assert.equal(store.get('afaces-view-mode'),'experto');
  assert.equal(loadPage(store).root.dataset.viewMode,'experto');
});

test('sin localStorage el selector sigue funcionando y emite modo',()=>{
  const page=loadPage(new Map(),true);
  page.novice.click();
  assert.equal(page.root.dataset.viewMode,'novato');
  assert.equal(page.novice.getAttribute('aria-pressed'),'true');
  assert.equal(page.events.at(-1).detail.mode,'novato');
});

test('un cambio desde otra pestaña y pageshow mantiene la interfaz sincronizada',()=>{
  const store=new Map([['afaces-view-mode','experto']]);
  const page=loadPage(store);
  store.set('afaces-view-mode','novato');
  page.window.emit('storage',{key:'afaces-view-mode'});
  assert.equal(page.novice.getAttribute('aria-pressed'),'true');
  store.set('afaces-view-mode','experto');
  page.window.emit('pageshow',{});
  assert.equal(page.expert.getAttribute('aria-pressed'),'true');
});
