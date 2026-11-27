const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
const header=$('.site-header');
const onScroll=()=>header?.classList.toggle('scrolled',scrollY>30);
addEventListener('scroll',onScroll,{passive:true});onScroll();

const toggle=$('.menu-toggle'), panel=$('.mobile-panel');
let lastFocus;
function closeMenu(){if(!panel)return;panel.classList.remove('open');toggle?.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open');lastFocus?.focus();}
function openMenu(){lastFocus=document.activeElement;panel.classList.add('open');toggle.setAttribute('aria-expanded','true');document.body.classList.add('menu-open');$('.mobile-links a',panel)?.focus();}
toggle?.addEventListener('click',()=>panel.classList.contains('open')?closeMenu():openMenu());
$$('.mobile-panel a').forEach(a=>a.addEventListener('click',closeMenu));
addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();if(e.key==='Tab'&&panel?.classList.contains('open')){const f=$$('a,button',panel.parentElement).filter(x=>x.offsetParent!==null);if(!f.length)return;const first=f[0],last=f[f.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});

const cleanPath=p=>p.replace(/^\/familyhold-web/,'').replace(/index\.html$/,'')||'/';
const route=cleanPath(location.pathname);
$$('[data-nav]').forEach(a=>{const p=cleanPath(new URL(a.href).pathname);if((route==='/'&&p==='/')||(route!=='/'&&p===route))a.setAttribute('aria-current','page')});

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});
$$('.reveal').forEach(el=>io.observe(el));

$$('.faq-button').forEach(btn=>btn.addEventListener('click',()=>{const item=btn.closest('.faq-item'),open=item.classList.toggle('open');btn.setAttribute('aria-expanded',String(open))}));

const story=$('.desktop-story'), scenes=$$('.story-scene'), progress=$('.story-progress strong');
if(story&&matchMedia('(min-width:1024px) and (pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
 const update=()=>{const r=story.getBoundingClientRect(),range=story.offsetHeight-innerHeight,p=Math.min(1,Math.max(0,-r.top/range)),i=Math.min(2,Math.floor(p*3));scenes.forEach((s,n)=>s.classList.toggle('active',n===i));if(progress)progress.textContent=`0${i+1}`};
 addEventListener('scroll',update,{passive:true});update();
}

const year=$('[data-year]');if(year)year.textContent=new Date().getFullYear();
