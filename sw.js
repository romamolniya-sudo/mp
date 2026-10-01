// Мой Путь — офлайн-кэш, версия muq2yuf6
const V="moy-put-muq2yuf6",FONTS="moy-put-fonts";
const CORE=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","apple-touch-icon.png"];
const EXTRA=["a1.bin","a2.bin","a3.bin"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE).then(()=>Promise.all(EXTRA.map(f=>c.add(f).catch(()=>{}))))).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V&&k!==FONTS).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;const u=new URL(e.request.url);
 if(u.origin===location.origin){e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||(e.request.mode==="navigate"?caches.match("./"):null)).then(r=>r||fetch(e.request).then(res=>{if(res.ok&&EXTRA.some(f=>u.pathname.endsWith("/"+f))){const cl=res.clone();caches.open(V).then(c=>c.put(e.request,cl));}return res;})));return;}
 if(/fonts\.(googleapis|gstatic)\.com$/.test(u.host)){e.respondWith(caches.open(FONTS).then(c=>c.match(e.request).then(r=>r||fetch(e.request).then(res=>{c.put(e.request,res.clone());return res;}))));}
});
