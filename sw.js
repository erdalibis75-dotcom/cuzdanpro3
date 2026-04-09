const CACHE_NAME = 'cuzdan-v4'; // Versiyonu v4 yaptık ki tarayıcı yenilesin
const urlsToCache = [
  '/Cuzdanpro3/',
  '/Cuzdanpro3/index.html',
  'https://googleapis.com'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names => Promise.all(
      names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => {
      return res || fetch(event.request).catch(() => {
        if (event.request.destination === 'document') {
          return caches.match('/Cuzdanpro3/index.html');
        }
      });
    })
  );
});
