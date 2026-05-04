const CACHE = 'pwa-html-cache-v1';

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then(cache =>
      cache.addAll([
        './',
        './index.html',
        './icon-192.png',
        './icon-512.png'
      ])
    )
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    // ZAWSZE pobieraj HTML z sieci
    event.respondWith(fetch(event.request));
    return;
  }
});
