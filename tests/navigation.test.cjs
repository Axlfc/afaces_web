'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');

const source=fs.readFileSync(path.join(__dirname,'..','js','mobile-nav.js'),'utf8');

class Element {
  constructor(tag,className=''){
    this.tagName=tag.toLowerCase();
    this.parentNode=null;
    this.children=[];
    this.attributes={};
    this.dataset={};
    this.listeners={};
    this.hidden=false;
    this.textContent='';
    this.className=className;
    this._classes=new Set(className.split(/\s+/).filter(Boolean));
    this.classList={
      add:(name)=>this._classes.add(name),
      remove:(name)=>this._classes.delete(name),
      contains:(name)=>this._classes.has(name),
      toggle:(name,force)=>{
        const value=force===undefined?!this._classes.has(name):Boolean(force);
        if(value)this._classes.add(name);
        else this._classes.delete(name);
        return value;
      }
    };
  }
  set className(value){
    this._className=String(value);
    this._classes=new Set(this._className.split(/\\s+/).filter(Boolean));
  }
  get className(){return this._className}
  setAttribute(key,value){this.attributes[key]=String(value)}
  getAttribute(key){return this.attributes[key]??null}
  removeAttribute(key){delete this.attributes[key]}
  set href(value){this.setAttribute('href',value)}
  get href(){return this.getAttribute('href')}
  set id(value){this.setAttribute('id',value)}
  get id(){return this.getAttribute('id')}
  append(...children){for(const child of children){child.parentNode=this;this.children.push(child)}}
  replaceChildren(...children){this.children=[];this.append(...children)}
  insertBefore(child,reference){
    const at=this.children.indexOf(reference);
    if(at===-1)throw Error('Reference not a child');
    child.parentNode=this;
    this.children.splice(at,0,child);
  }
  get descendants(){return this.children.flatMap(child=>[child,...child.descendants])}
  querySelector(selector){return this.querySelectorAll(selector)[0]||null}
  querySelectorAll(selector){
    return this.descendants.filter(node=>selector==='a'?node.tagName==='a':selector.startsWith('.')&&node._classes.has(selector.slice(1)));
  }
  closest(selector){
    let node=this;
    while(node){if(selector==='a'&&node.tagName==='a')return node;node=node.parentNode}
    return null;
  }
  contains(node){return node===this||this.descendants.includes(node)}
  addEventListener(name,fn){(this.listeners[name]??=[]).push(fn)}
  dispatch(name,init={}){
    const event={type:name,target:init.target||this,key:init.key,preventDefault(){this.prevented=true},...init};
    for(const fn of this.listeners[name]||[])fn(event);
    return event;
  }
  focus(){this.document.activeElement=this}
}

function makeMenu(mode='experto',pathname='/~afaces/welcome.html'){
  const doc={listeners:{},activeElement:null,documentElement:{dataset:{}},
    createElement(tag){const item=new Element(tag);item.document=doc;return item},
    querySelector(selector){return selector==='body > nav'?nav:null},
    addEventListener(name,fn){(this.listeners[name]??=[]).push(fn)},
    dispatch(name,init={}){
      const e={key:init.key,target:init.target,preventDefault(){this.prevented=true},...init};
      for(const fn of this.listeners[name]||[])fn(e);
      return e;
    }
  };
  const win={listeners:{},addEventListener(name,fn){(this.listeners[name]??=[]).push(fn)},
    dispatch(name,init={}){for(const fn of this.listeners[name]||[])fn(init)}};
  const nav=doc.createElement('nav');
  const logo=doc.createElement('a');logo.className='nav-logo';logo._classes.add('nav-logo');
  const links=doc.createElement('ul');links.className='nav-links';links._classes.add('nav-links');
  const right=doc.createElement('div');right.className='nav-right';right._classes.add('nav-right');
  const radio=doc.createElement('button');radio.className='radio-toggle';radio._classes.add('radio-toggle');right.append(radio);
  nav.append(logo,links,right);
  const location={pathname,hash:''};
  const storage={mode,getItem(key){return key==='afaces-view-mode'?this.mode:null}};
  vm.runInNewContext(source,{document:doc,window:win,location,localStorage:storage});
  return {doc,win,nav,logo,links,right,radio,location,storage,
    toggle:nav.querySelector('.af-mobile-toggle'),quick:nav.querySelector('.af-nav-shortcuts')};
}

test('menú completo, accesos rápidos y orden de tabulación',()=>{
  const page=makeMenu();
  assert.equal(page.links.children.length,17);
  assert.equal(page.quick.querySelectorAll('a').length,4);
  assert.equal(page.links.hidden,true);
  assert.equal(page.toggle.getAttribute('aria-controls'),page.links.id);
  assert.ok(page.nav.children.indexOf(page.toggle)<page.nav.children.indexOf(page.links));
  assert.equal(page.links.querySelectorAll('a')[0].getAttribute('aria-current'),'page');
  assert.equal(page.logo.href,'welcome.html');
});

test('abrir, cerrar con Escape, restaurar foco y descartar enlaces ocultos',()=>{
  const page=makeMenu();
  page.toggle.dispatch('click');
  assert.equal(page.links.hidden,false);
  assert.equal(page.toggle.getAttribute('aria-expanded'),'true');
  assert.ok(page.nav.classList.contains('af-menu-open'));
  const key=page.doc.dispatch('keydown',{key:'Escape'});
  assert.equal(key.prevented,true);
  assert.equal(page.links.hidden,true);
  assert.equal(page.doc.activeElement,page.toggle);
  assert.equal(page.toggle.getAttribute('aria-expanded'),'false');
});

test('cerrar tras navegación, clic exterior y pérdida de foco',()=>{
  const page=makeMenu();
  const first=page.links.querySelectorAll('a')[0];
  page.toggle.dispatch('click');
  page.links.dispatch('click',{target:first});
  assert.equal(page.links.hidden,true);
  page.toggle.dispatch('click');
  const outside=page.doc.createElement('section');
  page.doc.dispatch('pointerdown',{target:outside});
  assert.equal(page.links.hidden,true);
  page.toggle.dispatch('click');
  page.doc.dispatch('focusin',{target:outside});
  assert.equal(page.links.hidden,true);
  page.toggle.dispatch('click');
  page.radio.dispatch('click');
  assert.equal(page.links.hidden,true);
});

test('novato filtra avanzados; cambiar a experto actualiza sin recargar',()=>{
  const page=makeMenu('novato');
  const links=page.links.children;
  const map=links.find(li=>li.querySelector('a').textContent==='Mapa');
  const discover=links.find(li=>li.querySelector('a').textContent==='Descubrir');
  assert.equal(map.hidden,true);
  assert.equal(discover.hidden,false);
  page.storage.mode='experto';
  page.win.dispatch('storage',{key:'afaces-view-mode'});
  assert.equal(map.hidden,false);
  assert.equal(page.doc.documentElement.dataset.viewMode,'experto');
});

test('actualiza sección activa al cambiar hash y cerrar menú',()=>{
  const page=makeMenu();
  page.toggle.dispatch('click');
  page.location.hash='#about';
  page.win.dispatch('hashchange');
  const artist=page.links.children.find(li=>li.querySelector('a').textContent==='Artista').querySelector('a');
  assert.equal(artist.getAttribute('aria-current'),'location');
  assert.equal(page.links.hidden,true);
});
