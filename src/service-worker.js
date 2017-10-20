importScripts('workbox-sw.prod.v2.1.0.js');

const workboxSW = new WorkboxSW({ skipWaiting: true, clientsClaim: true });

workboxSW.precache([]);

workboxSW.router.registerRoute('/', workboxSW.strategies.cacheFirst());

workboxSW.router.registerRoute(
  '/stories/(.*)',
  workboxSW.strategies.cacheFirst()
);

workboxSW.router.registerRoute(
  'https://node-hnapi.herokuapp.com/(.*)',
  workboxSW.strategies.networkFirst()
);
