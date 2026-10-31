/* The Hollow Vale: offline support. Bump VERSION whenever any file changes. */
const VERSION = "hollow-vale-v4";
const PRECACHE = [
  "./",
  "icons/apple-touch-icon.png",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/maskable-512.png",
  "index.html",
  "manifest.webmanifest",
  "r/R.js",
  "r/R.wasm.gz.wasm",
  "r/libRblas.so.gz.wasm",
  "r/libRlapack.so.wasm",
  "r/vfs/usr/lib/R/library/grDevices/afm.data.gz.wasm",
  "r/vfs/usr/lib/R/library/grDevices/afm.js.metadata.json",
  "r/vfs/usr/lib/R/library/grDevices/enc.data.gz.wasm",
  "r/vfs/usr/lib/R/library/grDevices/enc.js.metadata.json",
  "r/vfs/usr/lib/R/library/translations/DESCRIPTION.txt",
  "r/webr-worker.js",
  "r/webr.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(VERSION).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // Fonts: use the cache, refresh it in the background.
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    event.respondWith(caches.open(VERSION + "-fonts").then(async (c) => {
      const hit = await c.match(req);
      const net = fetch(req).then((r) => { c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    }));
    return;
  }
  if (url.origin !== location.origin) return;
  // Pages: try the network first so updates arrive, fall back to the cache offline.
  if (req.mode === "navigate") {
    event.respondWith(fetch(req, { cache: "no-cache" }).then((r) => { caches.open(VERSION).then((c) => c.put(req, r.clone())); return r; })
      .catch(() => caches.match(req).then((r) => r || caches.match("./"))));
    return;
  }
  // Everything else (the R engine, icons): cache first.
  event.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((r) => {
    if (r.ok) { const copy = r.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); }
    return r;
  })));
});
