/* global self, caches, fetch, URL, Request, Response, setTimeout, __CDL_PRECACHE__ */

/**
 * Service worker: keeps the programme, the campus plan and the practical pages
 * usable without a connection. There is no Wi-Fi for attendees at the venue,
 * so during the event the site is read over saturated mobile data, or not at
 * all.
 *
 * This file is a template. src/pwa/integration.mjs fills in the two
 * placeholders at build time and writes the result to dist/sw.js:
 *   - __CDL_VERSION__  hash of the precached files, so a deploy that changes
 *                      the programme rolls out a new worker and fresh caches
 *   - __CDL_PRECACHE__ URLs fetched on install
 *
 * Strategies:
 *   - pages and details.json: network first, falling back to the cache after
 *     a short timeout — fresh when the network works, instant when it crawls
 *   - /_astro/* (content-hashed): cache first, they never change
 *   - other same-origin images, icons and fonts: cache first, filled as visited
 *   - everything else (videos, .ics, cross-origin): straight to the network
 */

const VERSION = '__CDL_VERSION__';
const PRECACHE_URLS = __CDL_PRECACHE__;

const PRECACHE = `cdl-precache-${VERSION}`;
const PAGES = `cdl-pages-${VERSION}`;
const ASSETS = `cdl-assets-${VERSION}`;

/** Beyond this, a page waits on the cache rather than the network. */
const NETWORK_TIMEOUT_MS = 4000;
/** Rough cap on runtime-cached images, so photo-heavy browsing stays bounded. */
const MAX_ASSET_ENTRIES = 150;

const OFFLINE_PAGE = '/hors-ligne/';
const PROGRAMME_PAGE = '/programme/';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(PRECACHE)
      // `reload` skips the HTTP cache: precaching a stale copy would pin it
      // until the next deploy.
      .then((cache) => cache.addAll(PRECACHE_URLS.map((url) => new Request(url, { cache: 'reload' }))))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  const keep = new Set([PRECACHE, PAGES, ASSETS]);
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k.startsWith('cdl-') && !keep.has(k)).map((k) => caches.delete(k))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  // Video seeking uses range requests, which the Cache API cannot answer.
  if (request.headers.has('range')) return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request, PAGES).then((res) => res || offlineFallback(url)));
    return;
  }

  if (url.pathname === '/programme/details.json') {
    event.respondWith(networkFirst(request, PAGES).then((res) => res || Response.error()));
    return;
  }

  if (url.pathname.startsWith('/_astro/')) {
    event.respondWith(cacheFirst(request, ASSETS));
    return;
  }

  if (
    !url.pathname.startsWith('/static/videos/') &&
    /\.(avif|webp|png|jpe?g|svg|woff2?)$/.test(url.pathname)
  ) {
    event.respondWith(cacheFirst(request, ASSETS, MAX_ASSET_ENTRIES));
  }
});

/** Resolves with `promise`, or with `undefined` once `ms` have elapsed. */
function withTimeout(promise, ms) {
  return Promise.race([promise, new Promise((resolve) => setTimeout(resolve, ms))]);
}

/**
 * Network first: the fresh response when it arrives within the timeout, the
 * cached copy otherwise. With nothing cached it keeps waiting for the network,
 * and resolves `undefined` only when both have failed.
 */
async function networkFirst(request, cacheName) {
  const network = fetch(request)
    .then(async (res) => {
      // Only plain 200s: never pin an error page or an opaque redirect.
      if (res.ok && res.type === 'basic') {
        const cache = await caches.open(cacheName);
        await cache.put(request, res.clone());
      }
      return res;
    })
    .catch(() => undefined);

  const fast = await withTimeout(network, NETWORK_TIMEOUT_MS);
  if (fast) return fast;

  // `ignoreSearch`: /programme/?now=… is the same page as /programme/.
  const cached = await caches.match(request, { ignoreSearch: true });
  if (cached) return cached;

  return network;
}

async function cacheFirst(request, cacheName, maxEntries) {
  const cached = await caches.match(request);
  if (cached) return cached;

  const res = await fetch(request);
  if (res.ok && res.type === 'basic') {
    const cache = await caches.open(cacheName);
    await cache.put(request, res.clone());
    if (maxEntries) trim(cache, maxEntries);
  }
  return res;
}

/** Drops the oldest entries past `max` (Cache API keys come back in insertion order). */
async function trim(cache, max) {
  const keys = await cache.keys();
  await Promise.all(keys.slice(0, Math.max(0, keys.length - max)).map((key) => cache.delete(key)));
}

/**
 * Offline with no cached copy. A session URL gets the programme itself, which
 * opens that session's modal from the path; anything else, a page listing what
 * is available offline.
 */
async function offlineFallback(url) {
  if (url.pathname.startsWith('/programme/')) {
    const programme = await caches.match(PROGRAMME_PAGE);
    if (programme) return programme;
  }
  return (await caches.match(OFFLINE_PAGE)) || Response.error();
}
