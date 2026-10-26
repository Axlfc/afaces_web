/* Tema y cursor compartidos. El audio lo controla únicamente radio-player.js. */
(()=>{
const html=document.documentElement;
try{html.dataset.theme=localStorage.getItem('afaces-theme')||'dark'}catch(e){html.dataset.theme='dark'}
document.getElementById('themeToggle')?.addEventListener('click',()=>{const next=html.dataset.theme==='dark'?'light':'dark';html.dataset.theme=next;try{localStorage.setItem('afaces-theme',next)}catch(e){}});
const cur=document.getElementById('cursor'),ring=document.getElementById('cursorRing');
if(cur&&ring&&matchMedia('(hover:hover) and (pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion:reduce)').matches){let mx=-100,my=-100,rx=-100,ry=-100;document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY},{passive:true});function frame(){cur.style.left=mx+'px';cur.style.top=my+'px';rx+=(mx-rx)*.12;ry+=(my-ry)*.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(frame)}requestAnimationFrame(frame);document.addEventListener('pointerover',e=>{if(e.target.closest('a,button,label,input,.ux-card')){cur.classList.add('big');ring.classList.add('big')}});document.addEventListener('pointerout',e=>{if(e.target.closest('a,button,label,input,.ux-card')){cur.classList.remove('big');ring.classList.remove('big')}})}
})();
