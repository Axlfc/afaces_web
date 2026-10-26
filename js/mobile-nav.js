'use strict';
(()=>{
  const nav=document.querySelector('body > nav'),links=nav?.querySelector('.nav-links');
  if(!nav||!links)return;
 const items=[['Inicio','welcome.html'],['Artista','welcome.html#about'],['Fases','welcome.html#phases'],['Temáticas','welcome.html#tematicas'],['Series','welcome.html#series'],['Discografía','welcome.html#discography'],['Escuchar','welcome.html#platforms'],['Descubrir','onboarding.html'],['Perfiles','perfiles.html'],['Mapa','mapa.html'],['Cronología','timeline.html'],['Fichas','lanzamiento.html'],['Recomendaciones','recomendaciones.html']];
 const here=location.pathname.split('/').pop()||'welcome.html';
 links.replaceChildren();
 for(const [label,url] of items){const li=document.createElement('li'),a=document.createElement('a');a.href=url;a.textContent=label;if(url.split('#')[0]===here&&!url.includes('#'))a.setAttribute('aria-current','page');li.append(a);links.append(li)}
 nav.setAttribute('aria-label','Navegación principal');
 const logo=nav.querySelector('.nav-logo');if(logo)logo.href='welcome.html';

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
