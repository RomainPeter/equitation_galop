const ROOT=new URL('./',self.location.href);
// This namespace never deletes the published application's v1 cache.
const PREFIX='equi-photos:'+ROOT.pathname+':';
const CACHE=PREFIX+'v1';
const CORE=['./','./index.html','./Equi.html','./manifest.webmanifest','./icons/app.svg','./photos.css','./photos.js','./assets/photos/catalog.js','./assets/photos/credits.json'];
let files;
async function assetList(){
  if(files)return files;
  const cached=await caches.match(new URL('./assets/photos/credits.json',ROOT).href,{cacheName:CACHE});
  const response=cached||await fetch(new URL('./assets/photos/credits.json',ROOT),{cache:'reload'});
  if(!response.ok)throw Error('Inventaire photographique indisponible');
  const photos=await response.json();
  return files=[...CORE,...photos.map(p=>'./'+p.file)].map(p=>new URL(p,ROOT).href);
}
self.addEventListener('install',event=>event.waitUntil((async()=>{
  const cache=await caches.open(CACHE);
  // One missing media prevents this worker from replacing the active version.
  await cache.addAll((await assetList()).map(url=>new Request(url,{cache:'reload'})));
})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(k=>k.startsWith(PREFIX)&&k!==CACHE).map(k=>caches.delete(k)));
  await self.clients.claim();
})()));
self.addEventListener('message',event=>{
  if(event.data==='PHOTO_CACHE_STATUS')event.waitUntil((async()=>{
    try{const cache=await caches.open(CACHE);const found=await Promise.all((await assetList()).map(url=>cache.match(url)));event.ports[0]?.postMessage({ready:found.every(Boolean),version:CACHE})}
    catch(e){event.ports[0]?.postMessage({ready:false})}
  })());
});
self.addEventListener('fetch',event=>{
  const request=event.request,url=new URL(request.url);
  if(request.method!=='GET'||url.origin!==ROOT.origin||!url.pathname.startsWith(ROOT.pathname))return;
  // Serve a consistent complete version while an update waits for tabs to close.
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE),cached=await cache.match(request);
    if(cached)return cached;
    try{return await fetch(request)}catch(e){
      if(request.mode==='navigate')return await cache.match(new URL('./index.html',ROOT).href)||Response.error();
      return Response.error();
    }
  })());
});
