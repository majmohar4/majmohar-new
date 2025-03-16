const CACHE_NAME = 'site-cache-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/files/css/style.css',
    '/files/css/about.css',
    '/files/css/contacts.css',
    '/files/css/footer.css',
    '/files/css/friends.css',
    '/files/css/header.css',
    '/files/css/nav-bar.css',
    '/files/css/optimize.css',
    '/files/css/projects.css',
    '/files/css/section.css',
    '/files/css/skills.css',
    '/files/html-parts/about.html',
    '/files/html-parts/contact.html',
    '/files/html-parts/friends.html',
    '/files/html-parts/header.html',
    '/files/html-parts/projects.html',
    '/files/html-parts/skills.html',
    '/files/js/loadHTML.js',
    '/files/js/script.js',
    '/files/js/splittext.js',
    '/files/js/splittext.min.js',
    '/files/icons/aldente.png',
    '/files/icons/alt-tab.png',
    '/files/icons/assembly-icon.svg',
    '/files/icons/brave.svg',
    '/files/icons/coderunner.png',
    '/files/icons/css-icon.svg',
    '/files/icons/dark-mode.svg',
    '/files/icons/discord-icon.svg',
    '/files/icons/download.svg',
    '/files/icons/github-icon.svg',
    '/files/icons/gmail-icon.svg',
    '/files/icons/html-icon.svg',
    '/files/icons/icon.svg',
    '/files/icons/icon2.svg',
    '/files/icons/js-icon.png',
    '/files/icons/js-icon.svg',
    '/files/icons/light-mode.svg',
    '/files/icons/linkedin-icon.svg',
    '/files/icons/localsend.avif',
    '/files/icons/maccy.png',
    '/files/icons/neardrop.avif',
    '/files/icons/raycast.png',
    '/files/icons/react-icon.svg',
    '/files/icons/react.svg',
    '/files/icons/vs-code.svg',
    '/files/icons/website-icon.svg',
    '/files/icons/youtube-icon.svg',
    '/files/images/IMG_2983.jpg',
    '/files/images/abstract.webp',
    '/files/images/square_128x128.png',
    '/files/pdf/Maj Mohar CV eng.pdf',
    '/files/pdf/Maj Mohar CV slo.pdf'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).then((fetchResponse) => {
                return caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, fetchResponse.clone());
                    return fetchResponse;
                });
            });
        }).catch(() => {
            if (event.request.destination === 'document') {
                return caches.match('/index.html');
            }
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
            );
        })
    );
});