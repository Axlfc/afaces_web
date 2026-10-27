'use strict';
// Selector de experiencia compartido en TODAS las páginas de AFACES.
(()=>{
  const root=document.documentElement;
  const storageKey='afaces-view-mode';
  let controls=document.querySelector('.ux-mode-switch');
  if(!controls){
    controls=document.createElement('div');
    controls.className='ux-mode-switch';
    controls.setAttribute('role','group');
    controls.setAttribute('aria-label','Modo de navegación');
    const label=document.createElement('span');
    label.textContent='Modo de vista';
    const noviceButton=document.createElement('button');
    noviceButton.type='button';
    noviceButton.id='modeNovice';
    noviceButton.textContent='Vista Simplificada';
    noviceButton.setAttribute('aria-label','Activar vista simplificada');
    const expertButton=document.createElement('button');
    expertButton.type='button';
    expertButton.id='modeExpert';
    expertButton.textContent='Vista Completa';
    expertButton.setAttribute('aria-label','Activar vista completa');
    controls.append(label,noviceButton,expertButton);
    document.body.append(controls);
  }
  const novice=controls.querySelector('#modeNovice');
  const expert=controls.querySelector('#modeExpert');
  if(!novice||!expert)return;

  const normalized=mode=>mode==='experto'?'experto':'novato';
  const storedMode=()=>{
    try{return normalized(localStorage.getItem(storageKey))}
    catch{return normalized(root.dataset.viewMode)}
  };
  const apply=(mode,persist=false)=>{
    const current=normalized(mode);
    root.dataset.js='true';
    root.dataset.viewMode=current;
    novice.setAttribute('aria-pressed',String(current==='novato'));
    expert.setAttribute('aria-pressed',String(current==='experto'));
    if(persist){
      try{localStorage.setItem(storageKey,current)}catch(e){}
    }
    window.dispatchEvent(new CustomEvent('afaces:view-mode-change',{detail:{mode:current}}));
  };

  apply(storedMode());
  novice.addEventListener('click',()=>apply('novato',true));
  expert.addEventListener('click',()=>apply('experto',true));
  window.addEventListener('storage',event=>{
    if(event.key===storageKey)apply(storedMode());
  });
  window.addEventListener('pageshow',()=>apply(storedMode()));
})();
