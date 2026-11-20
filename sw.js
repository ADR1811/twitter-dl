// Cache de la coquille de l'app uniquement ; les requêtes API/vidéo vont toujours au réseau.
const C='xdl-v7', FILES=['./','index.html','manifest.webmanifest','icon.svg','icon-180.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(u.origin!==location.origin)return;
  e.respondWith(fetch(e.request).catch(()=>caches.match(e.request,{ignoreSearch:true})));
});
