'use strict';
// Selector Novato / Experto compartido por todas las páginas.
(()=>{
  const root=document.documentElement,KEY='afaces-view-mode';
  let wrapper=document.querySelector('.ux-mode-switch');
  if(!wrapper){
    wrapper=document.createElement('div');
    wrapper.className='ux-mode-switch';
    wrapper.setAttribute('role','group');
    wrapper.setAttribute('aria-label','Modo de navegación');
    const label=document.createElement('span');
    label.textContent='Modo de vista';
    wrapper.append(label);
    for(const [id,text] of [['modeNovice','Novato'],['modeExpert','Experto']]){
      const button=document.createElement('button');
      button.type='button';
      button.id=id;
      button.textContent=text;
      wrapper.append(button);
    }
    document.body.append(wrapper);
  }
  const novice=wrapper.querySelector('#modeNovice');
  const expert=wrapper.querySelector('#modeExpert');
  if(!novice||!expert)return;

  const getSaved=()=>{
    try{return localStorage.getItem(KEY)==='novato'?'novato':'experto'}
    catch{return root.dataset.viewMode==='novato'?'novato':'experto'}
  };
  const apply=(mode,persist=false)=>{
    const selected=mode==='novato'?'novato':'experto';
    root.dataset.viewMode=selected;
    novice.setAttribute('aria-pressed',String(selected==='novato'));
    expert.setAttribute('aria-pressed',String(selected==='experto'));
    if(persist){
      try{localStorage.setItem(KEY,selected)}catch(e){/* Funciona sin storage */}
    }
    window.dispatchEvent(new CustomEvent('afaces:view-mode-change',{detail:{mode:selected}}));
  };
  apply(getSaved());
  novice.addEventListener('click',()=>apply('novato',true));
  expert.addEventListener('click',()=>apply('experto',true));
  window.addEventListener('storage',event=>{
    if(event.key===KEY)apply(getSaved());
  });
  window.addEventListener('pageshow',()=>apply(getSaved()));
})();
