// Guarda la app en el teléfono para que funcione sin conexión.
// Al publicar cambios, suba el número de versión.
const VERSION = 'selector-epp-v3';
const FILES = [
  './', './index.html', './manifest.webmanifest', './vendor/jspdf.umd.min.js', './vendor/qrcode.js',
  './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png',
  './fonts/barlow-latin-400-normal.woff2', './fonts/barlow-latin-500-normal.woff2',
  './fonts/barlow-latin-600-normal.woff2', './fonts/barlow-latin-700-normal.woff2',
  './fonts/barlow-condensed-latin-600-normal.woff2', './fonts/barlow-condensed-latin-700-normal.woff2',
  './fonts/barlow-condensed-latin-800-normal.woff2'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;

  // La página: con señal se carga siempre la última versión; sin señal, la guardada
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put('./index.html', copy)); }
        return res;
      }).catch(() => caches.match('./index.html', {ignoreSearch: true}))
    );
    return;
  }

  // Archivos (fuentes, librerías, íconos): desde el teléfono y se actualizan en segundo plano
  e.respondWith(caches.open(VERSION).then(async cache => {
    const cached = await cache.match(req, {ignoreSearch: true});
    const fresh = fetch(req).then(res => { if (res.ok) cache.put(req, res.clone()); return res; }).catch(() => cached);
    return cached || fresh;
  }));
});
