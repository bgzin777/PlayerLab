const CACHE="playerlab-cache";

const arquivos=[

"/",

"/index.html",

"/css/style.css",

"/js/script.js"

];

self.addEventListener("install",e=>{

e.waitUntil(

caches.open(CACHE).then(cache=>{

return cache.addAll(arquivos);

})

);

});

self.addEventListener("fetch",e=>{

e.respondWith(

caches.match(e.request).then(res=>{

return res || fetch(e.request);

})

);

});