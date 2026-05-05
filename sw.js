const VERSION = 'v5'; // ← ZMIENIAJ PRZY KAŻDEJ ZMIANIE
const CACHE = 'pwa-static-' + VERSION;

self.addEventListener('install', event => {
  self.skipWaiting(); // ⬅ NOWY SW GOTOWY NATYCHMIAST
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    )
  );
  self.clients.claim(); // ⬅ PRZEJMIJ WSZYSTKIE STRONY
});

self.addEventListener('fetch', event => {
  // ✅ HTML ZAWSZE Z SIECI
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request, { cache: 'no-store' }));
    return;
  }

  // ✅ static assets – cache fallback
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
