// اسم الكاش ونسخته
const CACHE_NAME = "cyber-blog-cache-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/styles.css",
    "/script.js",
    "/manifest.json",
    "/icons/manifest-icon-192.maskable.png",
    "/icons/manifest-icon-512.maskable.png"
];

// تثبيت الـ Service Worker وتخزين الملفات في الكاش
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log("Opened cache");
                return cache.addAll(urlsToCache);
            })
    );
});

// تفعيل الـ Service Worker وتنظيف الكاش القديم
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log("Deleting old cache:", cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// جلب الملفات من الكاش أو الشبكة
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // إذا كانت البيانات موجودة في الكاش
                if (response) {
                    return response;
                }
                // إذا لم تكن في الكاش، جلبها من الشبكة
                return fetch(event.request);
            })
    );
});
