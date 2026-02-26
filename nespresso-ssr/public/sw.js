const CACHE_NAME = "my-cache";

// eslint-disable-next-line
self.addEventListener("install", (e) => {
  console.log("installing service worker!!!");
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return (
        cache
          .addAll(["/", "/index.html", "/static/js/*.js", "/css/*.css"])
          // eslint-disable-next-line
          .then(() => self.skipWaiting())
      );
    })
  );
});

// eslint-disable-next-line
self.addEventListener("activate", (event) => {
  console.log("activating service worker");
  // eslint-disable-next-line
  event.waitUntil(self.clients.claim());
});

// eslint-disable-next-line
self.addEventListener("fetch", (event) => {
  console.log("Fetching:", event.request.url);
  // Добавьте логику обработки запросов, если нужно
});
