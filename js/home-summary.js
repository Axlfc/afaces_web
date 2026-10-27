'use strict';
(() => {
  const target=document.getElementById('resumenFases');
  if(!target)return;
  fetch('data/metadata.json',{cache:'no-cache'})
    .then(response=>{if(!response.ok)throw new Error('HTTP '+response.status);return response.json()})
    .then(data=>{
      const phases=data.architecture?.phases;
      if(!Array.isArray(phases)||phases.length!==9)throw new Error('No hay nueve fases verificables');
      target.replaceChildren();
      for(const phase of [...phases].sort((a,b)=>a.id-b.id)){
        const item=document.createElement('li');
        const number=document.createElement('span');
        number.className='ux-phase-index';
        number.textContent='FASE '+String(phase.id).padStart(2,'0');
        item.append(number,document.createTextNode(phase.name));
        target.append(item);
      }
    })
    .catch(error=>console.warn('AFACES: resumen de fases no disponible',error));
})();
