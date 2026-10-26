'use strict';
// AFACES RADIO: único reproductor para las 10 páginas de afaces_web.
// El catálogo vive en radio-data.js, que contiene exclusivamente álbumes Afaces.
(()=>{
  if(typeof RADIO_TRACKS==='undefined'||!Array.isArray(RADIO_TRACKS)||!RADIO_TRACKS.length)return;
  const id=name=>document.getElementById(name);
  const ui={
    panel:id('radioPanel'),backdrop:id('radioBackdrop'),toggle:id('radioToggle'),
    close:id('radioClose'),play:id('rPlay'),prev:id('rPrev'),next:id('rNext'),
    shuffle:id('rShuffle'),seek:id('radioSeek'),volume:id('radioVol'),
    fill:id('radioProgressFill'),current:id('radioCurrTime'),duration:id('radioDuration'),
    name:id('radioTrackName'),artist:id('radioTrackArtist'),count:id('radioTrackCount'),
    artwork:id('radioArtImg'),vinyl:id('radioVinyl'),dot:id('rpDot'),
    liveDot:id('radioLiveDot'),list:id('radioPlaylist')
  };
  if(Object.values(ui).some(element=>!element)){
    console.error('AFACES Radio: faltan controles del reproductor; no se inicializa');
    return;
  }

  const audio=new Audio();
  audio.preload='metadata';
  const state={index:0,playing:false,shuffle:false};
  const KEY='afaces-radio-state-v1';
  let restoredTime=0,lastSaveSecond=-1;
  const escapeHtml=value=>String(value).replace(/[&<>"']/g,char=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  })[char]);
  const fmtTime=seconds=>{
    const value=Number.isFinite(seconds)?Math.max(0,Math.floor(seconds)):0;
    return String(Math.floor(value/60)).padStart(2,'0')+':'+String(value%60).padStart(2,'0');
  };
  const status=document.createElement('div');
  status.className='radio-status';
  status.setAttribute('role','status');
  status.setAttribute('aria-live','polite');
  ui.list.before(status);
  const say=message=>{status.textContent=message};

  function persist(){
    try{
      sessionStorage.setItem(KEY,JSON.stringify({
        index:state.index,
        time:Number.isFinite(audio.currentTime)?audio.currentTime:0,
        volume:audio.volume,
        shuffle:state.shuffle
      }));
    }catch(e){/* Funciona aunque el navegador bloquee sessionStorage */}
  }
  function restore(){
    try{
      const saved=JSON.parse(sessionStorage.getItem(KEY)||'null');
      if(!saved||typeof saved!=='object')return;
      if(Number.isInteger(saved.index)&&saved.index>=0&&saved.index<RADIO_TRACKS.length)state.index=saved.index;
      if(Number.isFinite(saved.time)&&saved.time>0)restoredTime=saved.time;
      if(Number.isFinite(saved.volume)&&saved.volume>=0&&saved.volume<=1)ui.volume.value=Math.round(saved.volume*100);
      state.shuffle=saved.shuffle===true;
    }catch(e){/* Estado corrupto: empezar sin restauración */}
  }
  const setPlaying=playing=>{
    state.playing=Boolean(playing);
    ui.play.querySelector('.play-icon').style.display=playing?'none':'';
    ui.play.querySelector('.pause-icon').style.display=playing?'':'none';
    ui.vinyl.classList.toggle('spinning',Boolean(playing));
    ui.dot.classList.toggle('on',Boolean(playing));
    ui.liveDot.classList.toggle('on',Boolean(playing));
    ui.play.setAttribute('aria-label',playing?'Pausar radio':'Reproducir radio');
  };
  const openRadio=()=>{
    ui.panel.inert=false;
    ui.panel.classList.add('open');
    ui.panel.setAttribute('aria-hidden','false');
    ui.backdrop.classList.add('open');
    ui.toggle.classList.add('active');
    ui.toggle.setAttribute('aria-expanded','true');
  };
  const closeRadio=()=>{
    ui.panel.inert=true;
    ui.panel.classList.remove('open');
    ui.panel.setAttribute('aria-hidden','true');
    ui.backdrop.classList.remove('open');
    ui.toggle.classList.remove('active');
    ui.toggle.setAttribute('aria-expanded','false');
  };
  ui.panel.inert=true;
  ui.toggle.setAttribute('aria-controls','radioPanel');
  ui.toggle.setAttribute('aria-expanded','false');
  ui.toggle.addEventListener('click',()=>ui.panel.classList.contains('open')?closeRadio():openRadio());
  ui.close.addEventListener('click',closeRadio);
  ui.backdrop.addEventListener('click',closeRadio);
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&ui.panel.classList.contains('open')){
      closeRadio();
      ui.toggle.focus();
    }
  });

  function loadTrack(index,autoplay=false){
    if(!Number.isInteger(index)||index<0||index>=RADIO_TRACKS.length)return;
    audio.pause();
    setPlaying(false);
    state.index=index;
    const track=RADIO_TRACKS[index];
    audio.src=track.path;
    audio.volume=Number(ui.volume.value)/100;
    audio.load();
    ui.name.textContent=track.name;
    ui.artist.textContent=track.album;
    ui.count.textContent=(index+1)+' / '+RADIO_TRACKS.length;
    ui.artwork.style.backgroundImage=track.vid
      ?'url("https://img.youtube.com/vi/'+encodeURIComponent(track.vid)+'/hqdefault.jpg")'
      :'none';
    ui.fill.style.width='0%';
    ui.current.textContent='00:00';
    ui.duration.textContent='00:00';
    ui.seek.value=0;
    for(const element of ui.list.querySelectorAll('.rpl-item')){
      const active=Number(element.dataset.idx)===index;
      element.classList.toggle('active',active);
      const button=element.querySelector('.rpl-select');
      if(button)button.setAttribute('aria-current',active?'true':'false');
    }
    say('');
    persist();
    if(autoplay)playTrack();
  }
  function playTrack(){
    const playingIndex=state.index;
    const result=audio.play();
    if(result&&typeof result.then==='function'){
      result.then(()=>{
        if(playingIndex!==state.index)return;
        setPlaying(true);
        say('');
      }).catch(error=>{
        if(playingIndex!==state.index)return;
        setPlaying(false);
        say('No se pudo reproducir esta pista. Prueba otra canción o comprueba la conexión.');
        console.warn('AFACES Radio: reproducción no disponible',error);
      });
    }else setPlaying(true);
  }
  function pauseTrack(){audio.pause();setPlaying(false);persist()}
  const nextTrack=()=>{
    const index=state.shuffle
      ?Math.floor(Math.random()*RADIO_TRACKS.length)
      :(state.index+1)%RADIO_TRACKS.length;
    loadTrack(index,state.playing);
  };
  const prevTrack=()=>{
    if(audio.currentTime>3){audio.currentTime=0;persist();return}
    loadTrack((state.index+RADIO_TRACKS.length-1)%RADIO_TRACKS.length,state.playing);
  };
  ui.play.addEventListener('click',()=>state.playing?pauseTrack():playTrack());
  ui.prev.addEventListener('click',prevTrack);
  ui.next.addEventListener('click',nextTrack);
  ui.shuffle.addEventListener('click',()=>{
    state.shuffle=!state.shuffle;
    ui.shuffle.classList.toggle('active',state.shuffle);
    ui.shuffle.setAttribute('aria-pressed',String(state.shuffle));
    persist();
  });
  ui.seek.setAttribute('aria-label','Posición de reproducción');
  ui.seek.addEventListener('input',()=>{
    if(Number.isFinite(audio.duration)&&audio.duration>0){
      audio.currentTime=audio.duration*Number(ui.seek.value)/100;
      persist();
    }
  });
  ui.volume.setAttribute('aria-label','Volumen de la radio');
  ui.volume.addEventListener('input',()=>{
    audio.volume=Number(ui.volume.value)/100;
    persist();
  });
  audio.addEventListener('ended',nextTrack);
  audio.addEventListener('pause',()=>{
    // El navegador puede pausar el audio sin pulsar nuestro botón.
    if(audio.paused)setPlaying(false);
  });
  audio.addEventListener('play',()=>setPlaying(true));
  audio.addEventListener('loadedmetadata',()=>{
    ui.duration.textContent=fmtTime(audio.duration);
    if(restoredTime>0&&Number.isFinite(audio.duration)){
      audio.currentTime=Math.min(restoredTime,Math.max(0,audio.duration-.2));
      restoredTime=0;
    }
  });
  audio.addEventListener('timeupdate',()=>{
    const duration=audio.duration;
    if(!Number.isFinite(duration)||duration<=0)return;
    const pct=Math.max(0,Math.min(100,100*audio.currentTime/duration));
    ui.fill.style.width=pct+'%';
    ui.seek.value=pct;
    ui.current.textContent=fmtTime(audio.currentTime);
    ui.duration.textContent=fmtTime(duration);
    const second=Math.floor(audio.currentTime);
    if(second-lastSaveSecond>=4||second<lastSaveSecond){lastSaveSecond=second;persist()}
  });
  audio.addEventListener('error',()=>{
    setPlaying(false);
    say('El archivo de esta pista no está disponible temporalmente.');
  });

  // La descarga directa via Blob necesita CORS. Si el proveedor lo impide,
  // se abre el MP3 original; nunca se afirma que ese segundo paso lo descargó.
  async function downloadTrack(index){
    const track=RADIO_TRACKS[index];
    if(!track||!track.path)return;
    say('Preparando descarga de '+track.name+'…');
    try{
      const response=await fetch(track.path);
      if(!response.ok)throw new Error('HTTP '+response.status);
      const blob=await response.blob();
      if(!blob.size)throw new Error('Archivo vacío');
      const objectUrl=URL.createObjectURL(blob);
      const anchor=document.createElement('a');
      anchor.href=objectUrl;
      anchor.download=(track.name.replace(/[^\w .-]+/g,'').trim()||'pista-'+(index+1))+'.mp3';
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      setTimeout(()=>URL.revokeObjectURL(objectUrl),60000);
      say('Descarga iniciada: '+track.name);
    }catch(error){
      console.warn('AFACES Radio: descarga directa no disponible',error);
      if(/^HTTP (?:404|410)\\b/.test(String(error.message))){
        say('Este MP3 no está disponible actualmente en el repositorio de música.');
        return;
      }
      // El enlace permanece visible y requiere un clic deliberado del usuario:
      // funciona incluso si el navegador bloquea popups fuera de un gesto directo.
      status.textContent='No se pudo descargar directamente. ';
      const direct=document.createElement('a');
      direct.href=track.path;
      direct.target='_blank';
      direct.rel='noopener noreferrer';
      direct.textContent='Abrir MP3 original';
      status.appendChild(direct);
    }
  }

  function buildPlaylist(){
    const icon='<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 20h14"/></svg>';
    ui.list.innerHTML=RADIO_TRACKS.map((track,index)=>'<div class="rpl-item" data-idx="'+index+'">'
      +'<button type="button" class="rpl-select" data-idx="'+index+'" aria-label="Reproducir '+escapeHtml(track.name)+'">'
      +'<span class="rpl-num">'+String(index+1).padStart(2,'0')+'</span>'
      +'<span class="rpl-info"><span class="rpl-name">'+escapeHtml(track.name)+'</span>'
      +'<span class="rpl-album">'+escapeHtml(track.album)+'</span></span>'
      +'<span class="rpl-play" aria-hidden="true">▶</span></button>'
      +'<button type="button" class="rpl-download" data-idx="'+index+'" aria-label="Descargar MP3: '+escapeHtml(track.name)+'" title="Descargar MP3">'
      +icon+'</button></div>').join('');
    for(const button of ui.list.querySelectorAll('.rpl-select')){
      button.addEventListener('click',()=>loadTrack(Number(button.dataset.idx),true));
    }
    for(const button of ui.list.querySelectorAll('.rpl-download')){
      button.addEventListener('click',event=>{
        event.stopPropagation();
        downloadTrack(Number(button.dataset.idx));
      });
    }
  }
  restore();
  ui.shuffle.classList.toggle('active',state.shuffle);
  ui.shuffle.setAttribute('aria-pressed',String(state.shuffle));
  audio.volume=Number(ui.volume.value)/100;
  buildPlaylist();
  loadTrack(state.index,false);
  window.addEventListener('pagehide',persist);
  window.AfacesRadio={
    tracks:RADIO_TRACKS,play:playTrack,pause:pauseTrack,select:loadTrack,
    getState:()=>({index:state.index,playing:state.playing,shuffle:state.shuffle})
  };
})();
