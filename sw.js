const C='ns-home-v1';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{const r=e.request;
 if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
 e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(C).then(x=>x.put(r,c));return res})
   .catch(()=>caches.match(r,{ignoreSearch:true})));});
// Phone alerts (push.py): show each pushed alert; a tap opens or focuses the page.
self.addEventListener('push',e=>{let d={};try{d=e.data.json()}catch(x){d={title:'North Star',body:e.data?e.data.text():''}}
 e.waitUntil(self.registration.showNotification(d.title||'North Star',{body:d.body||'',tag:d.tag,renotify:true,data:{url:self.registration.scope}}))});
self.addEventListener('notificationclick',e=>{e.notification.close();const u=(e.notification.data||{}).url||self.registration.scope;
 e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{for(const c of cs)if(c.url.startsWith(u)&&'focus' in c)return c.focus();
  return self.clients.openWindow(u)}))});
