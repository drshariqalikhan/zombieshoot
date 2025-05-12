
const CACHE_NAME = 'body-segmenter-v1';
const urlsToCache = [
  '.', // Alias for index.html
  'index.html',
  // Add paths to your TFJS models if you self-host them,
  // or rely on CDN caching (which is simpler for this example).
  // 'css/style.css', // Not needed if CSS is inline
  // 'js/script.js', // Not needed if JS is inline
  'icons/icon-192x192.png',
  'icons/icon-512x512.png'
  //Potentially TFJS CDN URLs if you want more aggressive caching, but browser caching is often sufficient.
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request); // Else, fetch from network
      }
    )
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
