// The roles are fixed: test horses never appear in lessons or practice.
const PHOTO_SETS=Object.fromEntries([...new Set(PHOTOS.map(p=>p.subject))].map(k=>[k,PHOTOS.filter(p=>p.subject===k)]));
function pickPhoto(key,role='lesson'){
  return PHOTO_SETS[key]?.find(p=>p.role===role||p.role==='all');
}
function questionPhotos(c,mode){
  const role=mode==='test'?'test':'practice';
  return Object.fromEntries([c.answer,...c.wrong].map(o=>visualForOption(c,o)).filter(Boolean).map(k=>[k,pickPhoto(k,role)]));
}
function photoArt(p,mini=false,blind=false){
  const label=blind?'Photographie à observer':p.subject.startsWith('coat:')?'Cheval : '+({noir:'noir',alezan:'alezan',bai:'bai'}[p.subject.split(':')[1]]):'Outil de pansage : '+({curry:'étrille',brush:'bouchon',softbrush:'brosse douce',pick:'cure-pied'}[p.subject.split(':')[1]]);
  return `<figure class="photo ${mini?'compact':''}"><img src="${p.file}" width="${p.width}" height="${p.height}" alt="${esc(label)}" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><p class="photo-error" role="status" hidden>Photo indisponible. Recharge la page ou choisis « Je ne sais pas encore ».</p><figcaption>${esc(p.author)} · ${blind?esc(p.license):`<a href="${p.licenseUrl}" target="_blank" rel="noopener">${esc(p.license)}</a>`}</figcaption></figure>`;
}
function photoHint(c){
  if(c.visual?.startsWith('coat:'))return 'Observe les poils du corps, la crinière, la queue et le bas des membres. Des marques blanches peuvent aussi être présentes.';
  if(PHOTO_SETS[c.visual])return 'C’est un exemple réel. Les modèles varient : compare aussi les outils au club avec ton enseignant. Pour distinguer des poils raides de poils souples, il faut aussi toucher la brosse.';
  return '';
}
function compareCoats(){
  return `<div class="coat-comparison">${[['bai','Bai','Corps brun, crins et bas des membres noirs.'],['alezan','Alezan','Poils et crins roux, sans les pointes noires du bai.']].map(([key,name,text])=>`<section><h2>${name}</h2>${photoArt(pickPhoto('coat:'+key),true)}<p>${text}</p></section>`).join('')}</div><p class="photo-instruction">Les marques blanches sur la tête ou les pieds ne changent pas la robe de base. Observe plusieurs indices ensemble.</p>`;
}
async function offlineStatus(){
  const el=document.getElementById('offlineState');if(!el)return;
  if(!('serviceWorker' in navigator)||!/^https?:$/.test(location.protocol)){el.textContent='Ouvre le lanceur avec le serveur local ou un hébergement HTTPS pour préparer le hors-ligne.';return;}
  try{
    const reg=await navigator.serviceWorker.getRegistration();
    if(!reg?.active){el.textContent='Téléchargement en cours. Garde Internet activé, puis reviens dans Parent.';return;}
    const channel=new MessageChannel();
    const timeout=setTimeout(()=>{if(el.isConnected)el.textContent='Vérification indisponible. Recharge avec Internet, puis reviens dans Parent.';channel.port1.close()},5000);
    channel.port1.onmessage=({data})=>{clearTimeout(timeout);channel.port1.close();if(el.isConnected)el.textContent=data.ready?'Prête hors ligne : les 13 photos et l’application sont téléchargées. La voix dépend de ton appareil.'+(reg.waiting?' Une mise à jour attend : ferme les onglets de l’application puis rouvre-la.':''):'Téléchargement incomplet. Recharge avec Internet avant de partir hors ligne.'};
    reg.active.postMessage('PHOTO_CACHE_STATUS',[channel.port2]);
  }catch(e){el.textContent='Hors-ligne indisponible. Vérifie les autorisations et recharge avec Internet.'}
}
if('serviceWorker' in navigator&&/^https?:$/.test(location.protocol))window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js',{scope:'./'}).then(reg=>{reg.addEventListener('updatefound',()=>{const worker=reg.installing;worker?.addEventListener('statechange',()=>{if(worker.state==='activated'||worker.state==='installed')offlineStatus()})});offlineStatus()}).catch(()=>{const el=document.getElementById('offlineState');if(el)el.textContent='Préparation hors ligne impossible. Recharge avec Internet.'}));
function photoCredits(){
  stop();state=null;
  $('app').innerHTML=`<span class="eyebrow">Espace adulte</span><h1>Crédits photographiques</h1><button onclick="parent()">Retour à l’espace Parent</button><p>13 photographies locales, dont 9 chevaux distincts : un par robe pour le cours, un autre pour l’entraînement, un troisième réservé au test. Les 4 outils utilisent chacun une seule photo : aucun transfert vers un autre modèle n’est vérifié.</p><p>Les versions adaptées des photos restent sous la licence indiquée. Redimensionnement proportionnel et compression WebP ; aucune recoloration ni découpe. Les licences concernent les médias, sans modifier celle du code.</p>${PHOTOS.map(p=>`<section class="card glass">${photoArt(p,true)}<h2>${esc(p.title)}</h2><p>${esc(p.author)} · <a href="${p.licenseUrl}" target="_blank" rel="noopener">${esc(p.license)}</a></p><p><a href="${p.sourceUrl}" target="_blank" rel="noopener">Page source et conditions</a> · <a href="${p.originalUrl}" target="_blank" rel="noopener">Fichier original</a></p><p>${esc(p.classification)}</p><p class="muted">${esc(p.modifications)} Récupération : ${p.retrieved}. Usage : ${p.role==='all'?'cours et exercices':p.role==='lesson'?'cours':p.role==='practice'?'entraînement':'test'}.</p></section>`).join('')}<a href="assets/photos/credits.json">Inventaire de provenance complet (JSON)</a>`;
}
