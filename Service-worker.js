const CACHE_NAME = 'cuzdan-v1';
const ASSETS = [
  '/cuzdanpro3/',
  '/cuzdanpro3/index.html',
  'https://googleapis.com'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
