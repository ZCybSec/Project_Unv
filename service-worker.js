self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('pwa-cache').then((cache) => {
            return cache.addAll([
                '/Project_Unv/index.html',
                '/Project_Unv/styles.css',
                '/Project_Unv/script.js',
                "/Project_Unv/icons/manifest-icon-192.maskable.png",
                "/Project_Unv/icons/manifest-icon-512.maskable.png"
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        })
    );
});
