/* Shared AFACES chrome for discovery pages; radio and theme follow welcome.html */
(()=>{
const html=document.documentElement;
try{html.dataset.theme=localStorage.getItem('afaces-theme')||'dark'}catch(e){html.dataset.theme='dark'}
document.getElementById('themeToggle')?.addEventListener('click',()=>{const next=html.dataset.theme==='dark'?'light':'dark';html.dataset.theme=next;try{localStorage.setItem('afaces-theme',next)}catch(e){}});
const cur=document.getElementById('cursor'),ring=document.getElementById('cursorRing');
if(cur&&ring&&matchMedia('(hover:hover) and (pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion:reduce)').matches){let mx=-100,my=-100,rx=-100,ry=-100;document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY},{passive:true});function frame(){cur.style.left=mx+'px';cur.style.top=my+'px';rx+=(mx-rx)*.12;ry+=(my-ry)*.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(frame)}requestAnimationFrame(frame);document.addEventListener('pointerover',e=>{if(e.target.closest('a,button,label,input,.ux-card')){cur.classList.add('big');ring.classList.add('big')}});document.addEventListener('pointerout',e=>{if(e.target.closest('a,button,label,input,.ux-card')){cur.classList.remove('big');ring.classList.remove('big')}})}
const panel=document.getElementById('radioPanel'),backdrop=document.getElementById('radioBackdrop'),toggle=document.getElementById('radioToggle'),close=document.getElementById('radioClose');
function setRadio(open){panel?.classList.toggle('open',open);backdrop?.classList.toggle('open',open);panel?.setAttribute('aria-hidden',String(!open));toggle?.setAttribute('aria-expanded',String(open));if(open){document.getElementById('radioPlaylist').textContent='Para escuchar la radio completa, abre la portada principal.'}}
toggle?.addEventListener('click',()=>setRadio(!panel?.classList.contains('open')));close?.addEventListener('click',()=>setRadio(false));backdrop?.addEventListener('click',()=>setRadio(false));document.addEventListener('keydown',e=>{if(e.key==='Escape')setRadio(false)});
const play=document.getElementById('rPlay');play?.addEventListener('click',()=>{location.href='welcome.html#hero'});
})();