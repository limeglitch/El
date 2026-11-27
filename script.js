const menu=document.querySelector('.menu'), links=document.querySelector('.links');
if(menu && links) menu.addEventListener('click',()=>links.classList.toggle('open'));
document.querySelectorAll('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());

// Reveal elements with a soft upward motion.
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add('show');revealObserver.unobserve(entry.target);}
}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

// Arabic-friendly type-in effect: text is written when its section enters view.
const typingTargets=[...document.querySelectorAll('main h1, main h2, main h3, main p')];
const typingObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(!entry.isIntersecting)return;
  const el=entry.target; typingObserver.unobserve(el);
  if(el.dataset.typed==='done')return;
  const original=el.textContent.trim();
  if(!original || original.length<24){el.classList.add('typed-ready');return;}
  el.dataset.typed='done'; el.setAttribute('aria-label',original); el.textContent=''; el.classList.add('typing-text');
  let i=0; const speed= Math.max(13,Math.min(27,850/original.length));
  const write=()=>{i=Math.min(i+1,original.length);el.textContent=original.slice(0,i);if(i<original.length)window.setTimeout(write,speed);else el.classList.add('typed-complete');};
  write();
}),{threshold:.35});
typingTargets.forEach(el=>typingObserver.observe(el));

// Subtle pointer parallax for the decorative ambient elements.
window.addEventListener('pointermove',e=>{
  const x=(e.clientX/window.innerWidth-.5)*12, y=(e.clientY/window.innerHeight-.5)*12;
  document.querySelectorAll('.ambient-orbit').forEach((el,i)=>{el.style.setProperty('--mx',`${x*(i?-.7:1)}px`);el.style.setProperty('--my',`${y*(i?-.7:1)}px`);});
},{passive:true});
