/*
 global workbox
*/

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
);

if (workbox) {
  //console.log(`Yay! Workbox is loaded 🎉`);
  workbox.routing.registerRoute(
    new RegExp(".*.js"),
    new workbox.strategies.NetworkFirst()
  );
  workbox.routing.registerRoute(
    /\.css$/,
    new workbox.strategies.StaleWhileRevalidate({ cacheName: "css-cache" })
  );

  workbox.routing.registerRoute(
    /\.(?:png|jpg|jpeg|svg|gif)$/,
    new workbox.strategies.CacheFirst({
      cacheName: "image-cache",
      plugins: [
        new workbox.expiration.Plugin({
          // Cache only 20 images.
          maxEntries: 20,
          // Cache for a maximum of a week.
          maxAgeSeconds: 7 * 24 * 60 * 60
        })
      ]
    })
  );
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
