// Asignar nombre y version de la cache
const CACHE_NAME = 'v1_cache_cloudpay_pwa';

//Ficheros a cachear en la aplicación
var urlsToCache = [
  './',
  './stylesheets/menu.css',
  './stylesheets/flat-ui-slider.css',
  './stylesheets/base.css',
  './stylesheets/skeleton.css',
  './stylesheets/landings.css',
  './stylesheets/landings_layouts.css',
  './stylesheets/box.css',
  './assets/css/animations.min.css',
  './stylesheets/pixicon.css',
  './img/favicon.png',
  './images/7_shop_products/icon-1.png',
  './images/7_shop_products/icon-2.png',
  './images/7_shop_products/icon-3.png',
  './images/uploads/SliderLanding5.png',
  './images/main/bg-form1.jpg'
  './img/favicon-1024.png',
  './img/favicon-512.png',
  './img/favicon-384.png',
  './img/favicon-256.png',
  './img/favicon-192.png',
  './img/favicon-128.png',
  './img/favicon-96.png',
  './img/favicon-64.png',
  './img/favicon-32.png',
  './img/favicon-16.png'
];

// Evento Install
// instalacion del serviceWorker y guardar en cache los recursos estaticos de la aplicacion

self.addEventListener('install', e => {
    e.waitUntil(
      caches.open(CACHE_NAME)
            .then(cache => {
              return cache.addAll(urlsToCache)
                          .then(() => {
                            self.skipWaiting();
                          });
            })
            .catch(err => console.log('No se ha registrado la cache', err))
    );
});

// Envento Activate
// Que la app funcione sin conexión
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME];

  e.waitUntil(
    caches.keys()
          .then(cacheNames => {
            return Promise.all(
              cacheNames.map(cacheName => {
                if(cacheWhitelist.indexOf(cacheName) === -1) {
                  // Borrar elementos que no se necesitan
                  return caches.delete(cacheName);
                }
              })
            );
          })
          .then(() => {
            //Activar cache
            self.clients.claim();
          })
  );
});


// Evento Fetch
self.addEventListener('fetch', e => {

  e.respondWith(
    caches.match(e.request)
          .then(res => {
            if(res) {
              //Devuelvo datos desde cache
              return res;
            }

            return fetch(e.request);
          })
  );

});
