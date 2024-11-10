// Cache name
const CACHE_NAME = 'my-app-cache-v2';

// Files to cache
const urlsToCache = [
  '/',
  '/index.html',
  '/static/js/bundle.js',
  // Add more assets to pre-cache based on your build
];

// Install service worker and cache resources
// eslint-disable-next-line
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache?.addAll(urlsToCache);
    })
  );
});

// Fetch cached resources if offline
// eslint-disable-next-line
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
