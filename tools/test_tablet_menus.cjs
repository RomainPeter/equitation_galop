const {chromium}=require('playwright');const assert=require('node:assert/strict');
(async()=>{const server=await require('./serve.cjs').serve(8773);const browser=await chromium.launch({channel:'msedge',headless:true});try{
const page=await browser.newPage({serviceWorkers:'block'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const viewport of [{width:1280,height:800},{width:1024,height:600}]){
await page.setViewportSize(viewport);await page.goto('http://127.0.0.1:8773/Equi.html');await page.evaluate(()=>prefs.auto=false);
for(const mode of ['J’apprends','Je m’entraîne']){
await page.locator('.tablet-nav').getByRole('button',{name:mode,exact:true}).click();
assert(await page.locator('.tablet-page:not([hidden]) .chapter').count()>0,mode+' must show chapters immediately');
assert.equal(await page.locator('.chapter').count(),15);
const count=await page.evaluate(()=>tabletPages.length);
for(let i=0;i<count;i++){
assert(await page.locator('.tablet-page:not([hidden])').innerText());
assert(await page.locator('.tablet-page:not([hidden])').evaluate(p=>p.scrollHeight<=p.clientHeight+2));
if(i<count-1)await page.getByRole('button',{name:'Suivant →',exact:true}).click();
}
await page.evaluate(()=>catalog('learn'));await page.locator('.tablet-page:not([hidden]) .chapter').first().click();
assert(await page.locator('.tablet-page:not([hidden])').innerText());
}
for(const route of ['parent()','skills()','sources()','photoCredits()','testSetup()','library()']){await page.evaluate(r=>eval(r),route);assert(await page.locator('.tablet-page:not([hidden])').innerText(),route);}
}
assert.deepEqual(errors,[]);console.log('Menus passed at 1280×800 and 1024×600: chapters visible on first page, all 15 preserved, every catalogue page populated and without overflow; other menus nonempty.');
}finally{await browser.close();server.close()}})().catch(e=>{console.error(e);process.exitCode=1});
