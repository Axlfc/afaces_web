'use strict';
(()=>{
  const nav=document.querySelector('body > nav'),links=nav?.querySelector('.nav-links');
  if(!nav||!links)return;
  const toggle=document.createElement('button');
  toggle.type='button';toggle.className='af-mobile-toggle';toggle.setAttribute('aria-label','Abrir menú');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-controls','af-mobile-links');toggle.textContent='☰ Menú';
  links.id='af-mobile-links';nav.insertBefore(toggle,nav.querySelector('.nav-right'));
  const close=()=>{nav.classList.remove('af-menu-open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menú');toggle.textContent='☰ Menú'};
  toggle.addEventListener('click',()=>{const open=!nav.classList.contains('af-menu-open');nav.classList.toggle('af-menu-open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');toggle.textContent=open?'✕ Cerrar':'☰ Menú'});
  links.addEventListener('click',e=>{if(e.target.closest('a'))close()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
  document.addEventListener('pointerdown',e=>{if(!nav.contains(e.target))close()});
  window.addEventListener('resize',()=>{if(innerWidth>1550)close()});
})();
