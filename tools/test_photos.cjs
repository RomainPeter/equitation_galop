const {chromium}=require('playwright');
const fs=require('node:fs');
const assert=require('node:assert/strict');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const screenshots=path.join(root,'docs','captures');
fs.mkdirSync(screenshots,{recursive:true});
const report={browser:'Microsoft Edge desktop, headless',widths:[390,600,800],lessons:0,questions:0,photos:13,errors:[],checks:[]};
(async()=>{
 const server=await require('./serve.cjs').serve(8772);
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
 const context=await browser.newContext({viewport:{width:600,height:1000}});
 await context.addInitScript(()=>{window.__spoken=[];window.speechSynthesis.speak=u=>window.__spoken.push(u.text);});
 const page=await context.newPage();
 page.on('pageerror',e=>report.errors.push(e.message));
 page.on('response',r=>{if(r.url().startsWith('http://127.0.0.1:8772')&&r.status()>=400)report.errors.push(r.status()+' '+r.url())});
 await page.goto('http://127.0.0.1:8772/Equi.html');
 await page.evaluate(async()=>{await caches.open('equi-galop-v1');await caches.open('unrelated-app');await caches.open('equi-photos:/:obsolete');prefs.auto=false;save();await navigator.serviceWorker.ready;});
 await page.waitForFunction(()=>navigator.serviceWorker.controller);
 const loadImages=async()=>{
   await page.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(im=>im.decode())));
   assert(await page.locator('img').evaluateAll(imgs=>imgs.every(im=>im.complete&&im.naturalWidth>0)));
 };
 const ids=await page.evaluate(()=>DATA.cards.map(c=>c.id));
 assert.equal(ids.length,178);
 assert.equal(await page.evaluate(()=>DATA.chapters.length),21);
 for(const id of ids){
   await page.evaluate(id=>startOne(id),id);await loadImages();report.lessons++;
   await page.evaluate(()=>tryIt());await loadImages();
   const leakage=await page.evaluate(()=>[...document.querySelectorAll('.choice.image img')].some(im=>im.alt!=='Photographie à observer'||im.title));
   assert.equal(leakage,false,id+' leaked label');
   await page.evaluate(()=>{const q=state.q[0];if(q.kind==='point')choosePoint(q.c.target);else chooseOption(q.options.indexOf(q.c.answer));validate();});
   assert.equal(await page.evaluate(()=>state.answers[0].ok),true,id);
   await loadImages();report.questions++;
 }
 report.checks.push('178 lessons, questions, selection, validation and immediate corrections; every displayed photo decoded');
 for(const mode of ['learn','practice','test']){
   for(const coat of ['noir','alezan','bai']){
     const c=await page.evaluate(coat=>DATA.cards.find(c=>c.visual==='coat:'+coat).id,coat);
     await page.evaluate(({mode,c})=>{start(mode,[],[byID[c]]);if(mode==='learn')tryIt();}, {mode,c});
     const roles=await page.evaluate(()=>Object.values(state.q[0].photos).filter(Boolean).map(p=>p.role));
     assert(roles.every(role=>role===(mode==='test'?'test':'practice')));
     await page.evaluate(()=>{for(let i=0;i<state.q[0].options.length;i++)readOption(i)});
     const speech=await page.evaluate(()=>window.__spoken.slice(-3));
     assert(speech.every(t=>/^Image [123]\. Pour choisir cette image/.test(t)));
   }
 }
 report.checks.push('Distinct photo roles for three coats; image audio speaks only option numbers');
 await page.evaluate(()=>startOne('robes_03'));await loadImages();
 await page.screenshot({path:path.join(screenshots,'01-lecon-bai.png'),fullPage:true});
 await page.getByRole('button',{name:'À moi de trouver',exact:true}).click();await loadImages();
 await page.screenshot({path:path.join(screenshots,'02-quiz-photos.png'),fullPage:true});
 await page.evaluate(()=>chooseOption(state.q[0].options.indexOf(state.q[0].c.answer)));
 await page.getByRole('button',{name:'Valider mon choix',exact:true}).click();await loadImages();
 await page.screenshot({path:path.join(screenshots,'03-correction.png'),fullPage:true});
 await page.evaluate(()=>startOne(DATA.cards.find(c=>c.visual==='object:pick').id));await loadImages();
 await page.screenshot({path:path.join(screenshots,'04-cure-pied.png'),fullPage:true});
 for(const width of report.widths){
   await page.setViewportSize({width,height:1000});
   for(const route of ['home()','parent()','photoCredits()',"startOne('robes_01')",'tryIt()',"start('practice',['outils'])",'testSetup()']){
     await page.evaluate(route=>eval(route),route);await loadImages();
     assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),width+' '+route+' overflow');
     if(route==='tryIt()')assert(await page.locator('.pick,.choice .listen,#validate').evaluateAll(nodes=>nodes.every(n=>n.getBoundingClientRect().height>=44)),'Touch target below 44px');
   }
 }
 report.checks.push('No horizontal overflow at 390, 600 and 800 px across home, Parent, credits, lesson, coat quiz, tools and test setup');
 await page.evaluate(()=>{testSetup(['robes']);document.getElementById('testCount').value='5';launchTest()});
 for(let i=0;i<5;i++){
   await page.evaluate(i=>{const q=state.q[state.i];chooseOption(i===0?q.options.findIndex(o=>o!==q.c.answer):q.options.indexOf(q.c.answer));validate()},i);
   assert(!(await page.locator('#below').innerText()).includes('Regardons ensemble'));
   await page.evaluate(()=>next());
 }
 assert.equal(await page.evaluate(()=>reviewIDs.length),1);
 assert.equal(await page.evaluate(()=>state.answers.filter(a=>a.ok).length),4);
 await loadImages();
 await page.getByRole('button',{name:'M’entraîner sur mes erreurs',exact:true}).click();
 assert.equal(await page.evaluate(()=>state.q.length),1);
 report.checks.push('Autonomous 5-question test, delayed corrections, score 4/5, retry of exactly one error');
 // Existing save format and identifiers remain valid; import and export through the actual UI.
 await page.evaluate(()=>parent());
 const before=await page.evaluate(()=>JSON.stringify(prefs.stats));
 const downloadPromise=page.waitForEvent('download');
 await page.getByRole('button',{name:'Exporter ma sauvegarde',exact:true}).click();
 const download=await downloadPromise;const saved=path.join(root,'test-results','save.json');fs.mkdirSync(path.dirname(saved),{recursive:true});await download.saveAs(saved);
 page.once('dialog',d=>d.accept());
 await page.locator('#importFile').setInputFiles(saved);
 await page.waitForFunction(()=>document.getElementById('notice')?.textContent==='Sauvegarde importée.');
 assert.deepEqual(await page.evaluate(()=>prefs.stats),JSON.parse(before));
 report.checks.push('Export/import round trip preserves progress in equi-complete-1 format');
 await page.getByRole('button',{name:'Crédits photographiques',exact:true}).click();await loadImages();
 assert.equal(await page.locator('.photo').count(),13);
 // Use the real launcher and cached app after taking the whole context offline.
 await page.goto('http://127.0.0.1:8772/');
 await page.waitForFunction(()=>navigator.serviceWorker.controller);
 await context.setOffline(true);await page.reload();
 const frame=page.frames().find(f=>f.url().includes('Equi.html'));assert(frame);
 await frame.waitForFunction(()=>typeof startOne==='function');
 await frame.evaluate(()=>{prefs.auto=false;startOne('robes_01')});
 await frame.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(im=>im.decode())));
 await frame.evaluate(()=>parent());
 await frame.waitForFunction(()=>document.getElementById('offlineState')?.textContent.startsWith('Prête hors ligne'));
 const cached=await frame.evaluate(async()=>{
   const names=await caches.keys(),cache=await caches.open('equi-photos:/:v3');
   return {names,photos:await Promise.all(PHOTOS.map(p=>cache.match(p.file).then(Boolean)))};
 });
 assert(cached.photos.every(Boolean));assert(cached.names.includes('equi-galop-v1'));assert(cached.names.includes('unrelated-app'));assert(!cached.names.includes('equi-photos:/:obsolete'));
 await frame.evaluate(()=>photoCredits());await frame.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(im=>im.decode())));
 report.checks.push('Offline reload through index iframe, all 13 photos available, readiness message, credits; legacy and unrelated caches preserved, obsolete photo cache removed');
 await context.close();
 // Explicit missing-photo state with worker disabled so cached media cannot hide the failure.
 const failed=await browser.newContext({serviceWorkers:'block'});const fp=await failed.newPage();
 await fp.route('**/assets/photos/robes/n1.webp',route=>route.abort());
 await fp.goto('http://127.0.0.1:8772/Equi.html');await fp.evaluate(()=>{prefs.auto=false;startOne('robes_01')});
 await fp.locator('.photo-error').waitFor({state:'visible'});
 report.checks.push('Missing image displays explicit recovery state');
 await failed.close();
 assert.deepEqual(report.errors,[]);
 report.passed=true;
 }finally{await browser.close();server.close();fs.writeFileSync(path.join(root,'docs','verification-photos.json'),JSON.stringify(report,null,2)+'\n')}
 console.log(JSON.stringify(report,null,2));
})().catch(e=>{console.error(e);process.exitCode=1});
