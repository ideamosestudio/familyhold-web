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

if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }, { threshold: .12 });
  $$('.reveal, .section-actions').forEach(element => {
    if (element.matches('.section-actions') && element.closest('.page-hero')) return;
    observer.observe(element);
  });
}

$$('.faq-button').forEach(btn=>btn.addEventListener('click',()=>{const item=btn.closest('.faq-item'),open=item.classList.toggle('open');btn.setAttribute('aria-expanded',String(open))}));

const story = $('.desktop-story');
if (story) {
  const scenes = $$('.story-scene', story);
  const progress = $('.story-progress strong', story);
  const desktopMotion = matchMedia('(min-width:1024px) and (pointer:fine) and (prefers-reduced-motion:no-preference)');
  let frame = 0;
  let activeScene = -1;

  function updateStory() {
    frame = 0;
    const range = Math.max(1, story.offsetHeight - innerHeight);
    const fraction = Math.max(0, -story.getBoundingClientRect().top / range);
    const index = desktopMotion.matches ? Math.min(scenes.length - 1, Math.floor(fraction * scenes.length)) : -1;
    if (index === activeScene) return;
    activeScene = index;
    scenes.forEach((scene, position) => {
      scene.classList.toggle('active', position === Math.max(0, index));
      scene.inert = index >= 0 && position !== index;
    });
    if (progress) progress.textContent = String(Math.max(0, index) + 1).padStart(2, '0');
  }

  function queueStoryUpdate() {
    if (!frame) frame = requestAnimationFrame(updateStory);
  }

  addEventListener('scroll', queueStoryUpdate, { passive: true });
  addEventListener('resize', queueStoryUpdate);
  desktopMotion.addEventListener('change', queueStoryUpdate);
  updateStory();
}

const year=$('[data-year]');if(year)year.textContent=new Date().getFullYear();
