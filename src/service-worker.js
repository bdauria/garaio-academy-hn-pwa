importScripts('workbox-sw.prod.v2.1.0.js');

const workboxSW = new WorkboxSW({ clientsClaim: true });

workboxSW.precache([]);

workboxSW.router.setDefaultHandler({
  handler: workboxSW.strategies.cacheFirst()
});

workboxSW.router.registerRoute(
  'https://node-hnapi.herokuapp.com/(.*)',
  workboxSW.strategies.networkFirst()
);
