const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
const header=document.querySelector('#header');
const menu=document.querySelector('#navigation');
const toggle=document.querySelector('.menu-toggle');
function closeMenu(){menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menu')}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';menu.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu')});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.classList.contains('open')){closeMenu();toggle.focus()}});
document.addEventListener('click',e=>{if(!header.contains(e.target))closeMenu()});
window.matchMedia('(min-width: 801px)').addEventListener('change',closeMenu);
const dog=document.querySelector('#hero-dog');let scheduled=false;
function paintScroll(){header.classList.toggle('scrolled',window.scrollY>12);if(!reducedMotion.matches&&window.innerWidth>800&&window.scrollY<850){dog.style.transform=`translateY(${Math.min(window.scrollY*.045,26)}px) scale(1.07)`}scheduled=false}
window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(paintScroll)}},{passive:true});paintScroll();
const whatsapp='https://wa.me/5549999171533?text='+encodeURIComponent('Olá! Gostaria de falar com a equipe da Cães & Cia.');
document.querySelectorAll('[data-whatsapp]').forEach(a=>a.href=whatsapp);
document.querySelector('#year').textContent=new Date().getFullYear();
if('IntersectionObserver' in window){
const revealObserver=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.remove('pending');revealObserver.unobserve(entry.target)}}},{threshold:.09,rootMargin:'0px 0px -25px 0px'});
document.querySelectorAll('.reveal').forEach(el=>{if(el.getBoundingClientRect().top>window.innerHeight&&!reducedMotion.matches)el.classList.add('pending');revealObserver.observe(el)});
const countObserver=new IntersectionObserver(entries=>{for(const entry of entries){if(!entry.isIntersecting)continue;const el=entry.target;const target=Number(el.dataset.count);countObserver.unobserve(el);if(reducedMotion.matches)continue;const start=performance.now();function frame(now){const t=Math.min((now-start)/1100,1);const value=target*(1-(1-t)**3);el.textContent=target%1?value.toFixed(1).replace('.',','):Math.round(value);if(t<1)requestAnimationFrame(frame)}requestAnimationFrame(frame)}},{threshold:.5});
document.querySelectorAll('[data-count]').forEach(el=>countObserver.observe(el));
const activeObserver=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){menu.querySelectorAll('a').forEach(a=>{const active=a.hash==='#'+entry.target.id;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})}}},{rootMargin:'-15% 0px -55% 0px'});document.querySelectorAll('main section[id]').forEach(section=>activeObserver.observe(section));
}
const reviewWindow=document.querySelector('.reviews-window');const cards=[...document.querySelectorAll('.review-card')];const previous=document.querySelector('#previous-review');const next=document.querySelector('#next-review');let reviewIndex=0;
function goReview(index){reviewIndex=Math.max(0,Math.min(cards.length-1,index));const offset=cards[reviewIndex].offsetLeft-cards[0].offsetLeft;reviewWindow.scrollTo({left:offset,behavior:reducedMotion.matches?'instant':'smooth'})}
function updateReview(){const step=cards.length>1?cards[1].offsetLeft-cards[0].offsetLeft:1;reviewIndex=Math.round(reviewWindow.scrollLeft/step);const atEnd=reviewWindow.scrollLeft+reviewWindow.clientWidth>=reviewWindow.scrollWidth-3;previous.disabled=reviewWindow.scrollLeft<3;next.disabled=atEnd;document.querySelector('#review-position').textContent=`${atEnd?cards.length:reviewIndex+1} / ${cards.length}`}
previous.addEventListener('click',()=>goReview(reviewIndex-1));next.addEventListener('click',()=>goReview(reviewIndex+1));reviewWindow.addEventListener('scroll',updateReview,{passive:true});reviewWindow.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();goReview(reviewIndex+(e.key==='ArrowRight'?1:-1))}});window.addEventListener('resize',updateReview);updateReview();
reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches){dog.style.transform='none';document.querySelectorAll('.pending').forEach(el=>el.classList.remove('pending'))}});
