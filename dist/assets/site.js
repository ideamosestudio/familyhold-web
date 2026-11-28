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
      const element = entry.target;
      observer.unobserve(element);
      if (element instanceof HTMLImageElement) {
        const revealImage = () => {
          if (element.naturalWidth) element.classList.add('image-visible');
        };
        if (element.complete) revealImage();
        else element.addEventListener('load', revealImage, { once: true });
      } else {
        element.classList.add('visible');
      }
    }
  }, { threshold: .12 });
  $$('.reveal, .section-actions, main img:not(.scene-media img), .footer-identity img').forEach(element => {
    if (element.matches('.section-actions') && element.closest('.page-hero')) return;
    observer.observe(element);
  });
}

$$('.faq-button').forEach(btn=>btn.addEventListener('click',()=>{const item=btn.closest('.faq-item'),open=item.classList.toggle('open');btn.setAttribute('aria-expanded',String(open))}));

const year=$('[data-year]');if(year)year.textContent=new Date().getFullYear();
