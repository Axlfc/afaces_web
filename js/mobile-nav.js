'use strict';
// Navegación única para todas las páginas estáticas de AFACES.
// Los enlaces, accesos destacados y menú desplegable proceden de esta única lista.
(()=>{
  const nav=document.querySelector('body > nav');
  const links=nav?.querySelector('.nav-links');
  if(!nav || !links)return;

  const items=[
    ['Artista','welcome.html#about',true],
    ['Fases','welcome.html#phases',false],
    ['Temáticas','welcome.html#tematicas',false],
    ['Series','welcome.html#series',false],
    ['Discografía','welcome.html#discography',true],
    ['Escuchar','welcome.html#platforms',true],
    ['Descubrir','onboarding.html',true],
    ['Perfiles','perfiles.html',true],
    ['Mapa','mapa.html',false],
    ['Cronología','timeline.html',false],
    ['Fichas','lanzamiento.html',true],
    ['Recomendaciones','recomendaciones.html',true],
    ['Letras','letras.html',true],
    ['Opiniones','feedback.html',true],
    ['Accesibilidad','accesibilidad.html',true],
    ['Contacto','welcome.html#contact',true]
  ];
  const shortcuts=['Discografía','Descubrir','Mapa','Cronología'];

  const createLink=(label,url)=>{
    const anchor=document.createElement('a');
    anchor.href=url;
    anchor.textContent=label;
    return anchor;
  };

  links.replaceChildren();
  for(const [label,url,basic] of items){
    const li=document.createElement('li');
    li.dataset.basic=String(basic);
    li.append(createLink(label,url));
    links.append(li);
  }
  links.id='af-mobile-links';
  links.setAttribute('aria-label','Secciones de AFACES');
  links.hidden=true;

  const quick=document.createElement('div');
  quick.className='af-nav-shortcuts';
  quick.setAttribute('aria-label','Accesos directos');
  for(const label of shortcuts){
    const item=items.find(x=>x[0]===label);
    quick.append(createLink(item[0],item[1]));
  }
  nav.insertBefore(quick,links);

  const toggle=document.createElement('button');
  toggle.type='button';
  toggle.className='af-mobile-toggle';
  toggle.setAttribute('aria-label','Abrir menú de navegación');
  toggle.setAttribute('aria-expanded','false');
  toggle.setAttribute('aria-controls',links.id);
  toggle.textContent='☰ Menú';
  // Importante: el botón precede a la lista en el orden de tabulación.
  nav.insertBefore(toggle,links);

  nav.setAttribute('aria-label','Navegación principal');
  const logo=nav.querySelector('.nav-logo');
  if(logo)logo.href='welcome.html';

  const anchors=[...links.querySelectorAll('a'),...quick.querySelectorAll('a')];
  const currentPage=()=>{
    const name=location.pathname.split('/').pop();
    return name||'welcome.html';
  };
  const updateCurrent=()=>{
    const page=currentPage();
    const hash=location.hash;
    if(logo){
      if(page==='welcome.html'&&!hash)logo.setAttribute('aria-current','page');
      else logo.removeAttribute('aria-current');
    }
    for(const anchor of anchors){
      const [target,fragment]=anchor.getAttribute('href').split('#');
      const active=target===page && (fragment ? hash==='#'+fragment : !hash);
      if(active)anchor.setAttribute('aria-current',fragment?'location':'page');
      else anchor.removeAttribute('aria-current');
    }
  };
  const isOpen=()=>!links.hidden;
  const setOpen=(open,restoreFocus=false)=>{
    links.hidden=!open;
    nav.classList.toggle('af-menu-open',open);
    toggle.setAttribute('aria-expanded',String(open));
    toggle.setAttribute('aria-label',open?'Cerrar menú de navegación':'Abrir menú de navegación');
    toggle.textContent=open?'✕ Cerrar':'☰ Menú';
    if(!open && restoreFocus)toggle.focus();
  };
  const readMode=()=>{
    try{return localStorage.getItem('afaces-view-mode')==='novato'?'novato':'experto'}
    catch{return document.documentElement.dataset.viewMode==='novato'?'novato':'experto'}
  };
  const updateMode=(requestedMode)=>{
    const mode=requestedMode==='novato'||requestedMode==='experto'?requestedMode:readMode();
    document.documentElement.dataset.viewMode=mode;
    for(const li of links.children)li.hidden=mode==='novato' && li.dataset.basic!=='true';
    // La portada oculta su discografía en modo novato; Mapa y Cronología
    // son rutas avanzadas, por lo que solo queda Descubrir como atajo.
    for(const anchor of quick.querySelectorAll('a')){
      anchor.hidden=mode==='novato' && anchor.textContent!=='Descubrir';
    }
    if(isOpen())setOpen(false);
  };

  updateCurrent();
  updateMode();
  toggle.addEventListener('click',()=>setOpen(!isOpen()));
  links.addEventListener('click',event=>{
    if(event.target.closest('a'))setOpen(false);
  });
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&isOpen()){
      event.preventDefault();
      setOpen(false,true);
    }
  });
  document.addEventListener('pointerdown',event=>{
    if(isOpen()&&!nav.contains(event.target))setOpen(false);
  });
  document.addEventListener('focusin',event=>{
    if(isOpen()&&!nav.contains(event.target))setOpen(false);
  });
  nav.querySelector('.radio-toggle')?.addEventListener('click',()=>setOpen(false));
  window.addEventListener('hashchange',()=>{
    updateCurrent();
    setOpen(false);
  });
  window.addEventListener('popstate',updateCurrent);
  window.addEventListener('pageshow',()=>{
    updateCurrent();
    updateMode();
  });
  window.addEventListener('afaces:view-mode-change',event=>updateMode(event.detail?.mode));
  window.addEventListener('storage',event=>{
    if(event.key==='afaces-view-mode')updateMode();
  });
})();
