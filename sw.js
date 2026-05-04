const CACHE = 'pwa-static-v2'; // zmień nazwę = wymuszenie update

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  // ✅ HTML ZAWSZE Z SIECI
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request));
    return;
  }

  // ✅ reszta (img, css, js) – cache first
  event.respondWith(
    caches.match(event.request).then(res =>
      res || fetch(event.request)
    )
  );
});
