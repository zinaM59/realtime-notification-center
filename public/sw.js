
const CACHE_NAME = "notification-center-v1";
const urlsToCache = [
    "/",
    "/icons/favicon.ico",
    "/manifest.webmanifest",
    //  "/_next/static/*", // Next.js bundles
    "/icons/icon-192.png",
    "/icons/icon-512.png"
];
const PRECACHE_URLS = [
    "/",                    // main page
    "/icons/favicon.ico",
    "/icons/android-chrome-192x192.png",
    "/icons/android-chrome-512x512.png",

    "/manifest.webmanifest"
];
// Install — cache files
self.addEventListener("install", (event) => {

    console.log(' install:',);
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(PRECACHE_URLS);
        }).catch((err) => {
            console.error("[sw] precache failed", err);
        })
    );
    self.skipWaiting();
});
// Activate — cleanup old caches
self.addEventListener("activate", (event) => {
    console.log(' activate:',);

    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch — cache-first with runtime caching
self.addEventListener("fetch", (event) => {
    // Only handle GET
    if (event.request.method !== "GET") {
        return;
    }

    console.log('fetch :',);
    if (!event.request.url.startsWith("http")) return;

    event.respondWith(
        caches.match(event.request).then((cached) => {
            if (cached) {
                // Serve from cache
                return cached;
            }

            // Otherwise: go to network and put a copy into cache
            return fetch(event.request)
                .then((response) => {
                    // Only cache successful responses
                    if (!response || response.status !== 200) {
                        return response;
                    }

                    const copy = response.clone();

                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, copy);
                    });
                    return response;
                })
                .catch(() => {
                    // If offline and it's a navigation request,
                    // fall back to the cached homepage
                    if (event.request.mode === "navigate") {
                        return caches.match("/"); //TODO - add offline.html - return caches.match("/offline.html");
                    }
                });
        })
    );
});
self.addEventListener('push', function (event) {
    console.log('event :', event.data.json());
    if (!event.data) return;

    const data = event.data.json();

    const options = {
        body: data.body,
        icon: data.icon || '/icon.png',
        badge: 'icons/android-chrome-192x192.png',
        data: {
            url: data.url || '/',
            type: data.type || "GENERAL",
        },
        requireInteraction: true
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );

})

self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    const targetUrl = event.notification?.data?.url || '/';
    const fullUrl = new URL(targetUrl, self.location.origin).href;
    event.waitUntil(
        (async () => {
            if (event.notification.data?.type === "APP_VERSION_UPDATED") {
                const keys = await caches.keys();
                await Promise.all(keys.map((key) => caches.delete(key)));
                await self.registration.update();
            }

            const clientList = await clients.matchAll({
                type: "window",
                includeUncontrolled: true,
            });

            for (const client of clientList) {
                if ("focus" in client) {
                    await client.navigate(fullUrl);
                    return client.focus();
                }
            }

            if (self.clients.openWindow) {
                return self.clients.openWindow(targetUrl);
            }
        })()
    );
 
});
