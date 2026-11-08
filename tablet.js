// Landscape is a sequence of screens; the portrait layout stays fluid.
const tabletMedia=matchMedia('(min-width:900px) and (orientation:landscape)');
let tabletPage=0,tabletPages=[];
const tabletNav=document.createElement('nav');tabletNav.className='tablet-nav';tabletNav.setAttribute('aria-label','Navigation principale');
tabletNav.innerHTML=`<button onclick="navHome()">⌂ Accueil</button><button onclick="if(leave())catalog('learn')">J’apprends</button><button onclick="if(leave())catalog('practice')">Je m’entraîne</button><button onclick="if(leave())testSetup()">Je me teste</button><button onclick="navParent()">Parent</button>`;
document.querySelector('header').append(tabletNav);
const tabletPager=document.createElement('nav');tabletPager.className='tablet-pager';tabletPager.setAttribute('aria-label','Pages');
tabletPager.innerHTML='<button id="tabletPrevious" onclick="turnTabletPage(-1)">← Précédent</button><span id="tabletCount" role="status"></span><button id="tabletNext" onclick="turnTabletPage(1)">Suivant →</button>';
document.body.append(tabletPager);
function turnTabletPage(delta){tabletPage=Math.max(0,Math.min(tabletPages.length-1,tabletPage+delta));tabletPages.forEach((p,i)=>p.hidden=i!==tabletPage);document.getElementById('tabletCount').textContent=`Page ${tabletPage+1} sur ${tabletPages.length}`;document.getElementById('tabletPrevious').disabled=tabletPage===0;document.getElementById('tabletNext').disabled=tabletPage===tabletPages.length-1;}
function tabletLayout(){
 const app=document.getElementById('app');
 // Unwrap existing pagination before measuring again (rotation, dynamic lists).
 app.querySelectorAll(':scope>.tablet-page').forEach(p=>p.replaceWith(...p.childNodes));
 app.classList.remove('session','image-question','text-question');tabletPager.style.display='none';
 if(!tabletMedia.matches)return;
 if(document.getElementById('content')&&document.getElementById('below')){
   app.classList.add('session');
   if(state?.phase==='answer'&&state.q[state.i].kind==='mc')app.classList.add(app.querySelector('.visualchoices')?'image-question':'text-question');
   return;
 }
 const limit=innerHeight-104;const nodes=[...app.children];tabletPages=[];
 let page;
 function newPage(){page=document.createElement('div');page.className='tablet-page';app.append(page);tabletPages.push(page)}
 newPage();
 function add(node){
   page.append(node);
   if(page.scrollHeight<=limit+1)return;
   const canSplit=node.children.length&&!node.matches('button,details,.row,.modes,.actions,.statgrid,.photo,.filter,.listrow,label');
   const tooTall=node.getBoundingClientRect().height>limit;
   node.remove();
   // Break up a long list before moving it: its first items belong with the heading.
   if(canSplit&&tooTall){[...node.children].forEach(add);return;}
   if(page.children.length){newPage();page.append(node);if(page.scrollHeight<=limit+1)return;node.remove();}
   if(canSplit){
     // Split large collections and adult sections at item boundaries, preserving live controls.
     const children=[...node.children];
     for(const child of children){
       add(child);
     }
     return;
   }
   if(page.children.length)newPage();
   page.append(node);
 }
 nodes.forEach(add);
 tabletPages=tabletPages.filter(p=>{if(p.children.length)return true;p.remove();return false});
 tabletPage=0;tabletPager.style.display='';turnTabletPage(0);
}
// Run after each existing screen/action, including nested rendering calls.
for(const name of ['home','catalog','chapterPage','render','showAnswer','respond','result','testSetup','library','searchLibrary','parent','progressDetail','skills','sources','photoCredits']){
 const original=window[name];if(typeof original!=='function')continue;
 window[name]=function(...args){const result=original.apply(this,args);tabletLayout();return result};
}
let tabletResize;addEventListener('resize',()=>{clearTimeout(tabletResize);tabletResize=setTimeout(tabletLayout,100)});
tabletLayout();
