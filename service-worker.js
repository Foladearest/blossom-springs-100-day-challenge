// ============================================
// BLOSSOM SPRINGS SERVICE WORKER
// Handles offline functionality and caching
// ============================================

const CACHE_NAME = 'blossom-springs-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './styles.css',
    './script.js',
    './manifest.json'
];

// ===== Installation Event =====
self.addEventListener('install', (event) => {
    console.log('🌸 Service Worker: Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('🌸 Service Worker: Caching assets');
                return cache.addAll(ASSETS_TO_CACHE)
                    .catch(error => {
                        console.warn('Some assets could not be cached:', error);
                    });
            })
            .then(() => self.skipWaiting())
    );
});

// ===== Activation Event =====
self.addEventListener('activate', (event) => {
    console.log('🌸 Service Worker: Activating...');
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME) {
                            console.log('🌸 Service Worker: Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => self.clients.claim())
    );
});

// ===== Fetch Event - Network First Strategy =====
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Skip cross-origin requests
    if (url.origin !== location.origin) {
        return;
    }

    // Network first strategy
    event.respondWith(
        fetch(request)
            .then((response) => {
                const clonedResponse = response.clone();

                if (response.status === 200) {
                    caches.open(CACHE_NAME)
                        .then((cache) => {
                            cache.put(request, clonedResponse);
                        })
                        .catch(err => {
                            console.warn('Error caching response:', err);
                        });
                }

                return response;
            })
            .catch(() => {
                return caches.match(request)
                    .then((cached) => {
                        if (cached) {
                            return cached;
                        }

                        if (request.destination === 'document') {
                            return caches.match('./index.html');
                        }

                        return new Response(
                            'Offline - Resource not available',
                            {
                                status: 503,
                                statusText: 'Service Unavailable',
                                headers: new Headers({
                                    'Content-Type': 'text/plain'
                                })
                            }
                        );
                    });
            })
    );
});

// ===== Push Notification Event =====
self.addEventListener('push', (event) => {
    console.log('🌸 Service Worker: Push notification received');
    
    let notificationData = {
        title: 'Blossom Springs',
        body: 'Time to complete your daily challenge!',
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23d8b5e8;stop-opacity:1" /><stop offset="100%" style="stop-color:%239966cc;stop-opacity:1" /></linearGradient></defs><rect width="192" height="192" fill="url(%23grad)"/><circle cx="96" cy="96" r="50" fill="%2381c784"/></svg>',
        badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><circle cx="48" cy="48" r="48" fill="%23d8b5e8"/><text x="48" y="60" font-size="50" font-weight="bold" text-anchor="middle" fill="white">🌸</text></svg>',
        tag: 'blossom-springs-notification',
        requireInteraction: false
    };

    if (event.data) {
        try {
            notificationData = event.data.json();
        } catch (e) {
            notificationData.body = event.data.text();
        }
    }

    event.waitUntil(
        self.registration.showNotification(notificationData.title, notificationData)
    );
});

// ===== Notification Click Event =====
self.addEventListener('notificationclick', (event) => {
    console.log('🌸 Service Worker: Notification clicked');
    event.notification.close();

    event.waitUntil(
        clients.matchAll({
            type: 'window',
            includeUncontrolled: true
        })
            .then((clientList) => {
                for (let i = 0; i < clientList.length; i++) {
                    const client = clientList[i];
                    if (client.url.includes('blossom-springs')) {
                        return client.focus();
                    }
                }
                if (clients.openWindow) {
                    return clients.openWindow('./');
                }
            })
    );
});

// ===== Message Event =====
self.addEventListener('message', (event) => {
    const { data } = event;

    if (data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (data.type === 'GET_CACHE_STATUS') {
        caches.keys()
            .then((cacheNames) => {
                event.ports[0].postMessage({
                    type: 'CACHE_STATUS',
                    cached: cacheNames.includes(CACHE_NAME)
                });
            });
    }
});

console.log('🌸 Service Worker loaded successfully!');