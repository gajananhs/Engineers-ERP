/* GE Process Flow service worker (Workbox 7.4.1, bundled locally). Static app: everything is pre-cached, so it works fully offline.
 * Files are served network-first, so a normal deploy reaches users on their next open. Bump SHELL_VERSION only if you add/remove a file in SHELL_FILES. */
importScripts('assets/js/vendor/workbox/workbox-sw.js');
workbox.setConfig({debug:false,modulePathPrefix:'assets/js/vendor/workbox/'});
const SHELL_VERSION='v1',SHELL_CACHE='ge-shell-'+SHELL_VERSION,scope=self.registration.scope,abs=p=>new URL(p,scope).href,BASE=new URL(scope).pathname;
const SHELL_FILES=['index.html','offline.html','manifest.json','assets/css/app.css','assets/js/flows.js','assets/js/app.js','assets/js/pwa.js','assets/icons/icon-192.png','assets/icons/icon-512.png','assets/icons/apple-touch-icon.png'].map(abs);
const {registerRoute,setCatchHandler}=workbox.routing,{NetworkFirst}=workbox.strategies,{CacheableResponsePlugin}=workbox.cacheableResponse;
self.addEventListener('install',e=>e.waitUntil(caches.open(SHELL_CACHE).then(c=>c.addAll(SHELL_FILES.map(u=>new Request(u,{cache:'reload'}))))));
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const n of await caches.keys())if(n.startsWith('ge-')&&n!==SHELL_CACHE)await caches.delete(n);await self.clients.claim()})()));
self.addEventListener('message',e=>{if(e.data&&e.data.type==='SKIP_WAITING')self.skipWaiting()});
const ours=u=>u.origin===self.location.origin&&u.pathname.startsWith(BASE);
registerRoute(({request,url})=>request.mode==='navigate'&&ours(url),new NetworkFirst({cacheName:SHELL_CACHE,networkTimeoutSeconds:4,plugins:[{cacheKeyWillBeUsed:async()=>abs('index.html')}]}));
registerRoute(({url})=>ours(url),new NetworkFirst({cacheName:SHELL_CACHE,networkTimeoutSeconds:3,plugins:[new CacheableResponsePlugin({statuses:[200]})]}));
setCatchHandler(async({request})=>request.mode==='navigate'?((await (await caches.open(SHELL_CACHE)).match(abs('offline.html')))||Response.error()):Response.error());
