const VERSION = 'v7'; // ← ZMIEŃ ZA KAŻDYM RAZEM
const CACHE = 'pwa-static-' + VERSION;

// ❌ TE PLIKI NIGDY NIE SĄ CACHE'OWANE
const NO_CACHE = [
  '/icon-192.png',
  '/icon-512.png',
  '/icon-512-maskable.png'
];

// instalacja
self.addEventListener('install', event => {
  console.log('[SW] install', VERSION);
  self.skipWaiting();
});

// aktywacja – czyścimy stare cache
self.addEventListener('activate', event => {
  console.log('[SW] activate');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE)
          .map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// obsługa fetch
self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);

  // ✅ HTML / nawigacja – ZAWSZE Z SIECI
  if (req.mode === 'navigate') {
