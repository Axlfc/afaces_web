'use strict';
// El archivo local es la única fuente del contador; no se consulta ninguna API externa.
(() => {
  const keys=['total','albums','lps','phases','nuclei','duration'];
  const nodes=Object.fromEntries(keys.map(k=>[k,document.querySelectorAll('[data-press-counter="'+k+'"]')]));
  if (!nodes.total.length) return;
  const status=document.getElementById('pressDataStatus');
  const put=(key,value)=>nodes[key].forEach(node=>{node.textContent=String(value)});
  const format=n=>new Intl.NumberFormat('es-ES').format(n);
  async function load() {
    const controller=typeof AbortController==='function'?new AbortController():null;
    const timeout=controller?setTimeout(()=>controller.abort(),8000):null;
    try {
      const response=await fetch('data/metadata.json',{cache:'no-cache',...(controller?{signal:controller.signal}:{})});
      if(!response.ok)throw new Error('No se pudo leer el catálogo');
      const data=await response.json();
      if(!Array.isArray(data.videos)||!data.videos.length)throw new Error('Catálogo vacío');
      const launches=data.videos;
      put('total',format(launches.length));
      put('albums',format(launches.filter(v=>v.coleccion==='album').length));
      put('lps',format(launches.filter(v=>v.coleccion==='lp').length));
      if(Array.isArray(data.architecture?.phases))put('phases',format(data.architecture.phases.length));
      if(Array.isArray(data.architecture?.nuclei))put('nuclei',format(data.architecture.nuclei.length));
      const durations=launches.map(v=>v.durationSeconds).filter(n=>typeof n==='number'&&Number.isFinite(n)&&n>0);
      if(durations.length){
        const minutes=Math.floor(durations.reduce((a,b)=>a+b,0)/60);
        put('duration',Math.floor(minutes/60)+' h '+String(minutes%60).padStart(2,'0')+' min');
      }else put('duration','Sin duración registrada');
      if(status)status.textContent=durations.length===launches.length
        ?'Todas las duraciones están documentadas.'
        :'Duración documentada: '+format(durations.length)+' de '+format(launches.length)+' lanzamientos. Falta información; el total real puede ser mayor.';
    }catch(_){
      put('total','No disponible');
      for(const key of ['albums','lps','duration'])put(key,'No disponible');
      if(status)status.textContent='Error al cargar el sistema. ¿Quién eres y por qué estás aquí? Las cifras no están disponibles: recarga la página.';
    }finally{if(timeout!==null)clearTimeout(timeout)}
  }
  load();
})();
