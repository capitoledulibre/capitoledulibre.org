import { createHash } from 'node:crypto';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Writes dist/sw.js from the src/pwa/sw.js template once the build is done,
 * when the content-hashed asset names under /_astro/ are known.
 *
 * What gets precached is what an attendee needs on site with no network: the
 * programme with its abstracts (the modal shows every session, so the 120
 * session pages need not be precached), the campus plan, the practical pages,
 * and the styles, scripts and Latin fonts they use. Photos are left to the
 * runtime cache: precaching them would cost a visitor on mobile data megabytes
 * they never asked for.
 */

const PAGES = [
  '/',
  '/programme/',
  '/programme/details.json',
  '/lieu/',
  '/faq/',
  '/se-restaurer/',
  '/hors-ligne/',
  '/manifest.webmanifest',
  '/static/pwa/icon-192.png',
  '/favicon.svg',
];

/** CSS and JS, plus the woff2 Latin subsets: the only ones French text loads. */
const isPrecachedAsset = (name) =>
  /\.(css|js)$/.test(name) || /-latin(-ext)?-\d{3}-normal\.[\w-]+\.woff2$/.test(name);

/** URL path → file in dist/. */
function distFile(dist, url) {
  const path = url.endsWith('/') ? `${url}index.html` : url;
  return join(dist, path);
}

export default function serviceWorker() {
  return {
    name: 'cdl-service-worker',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const dist = fileURLToPath(dir);

        const assets = (await readdir(join(dist, '_astro')))
          .filter(isPrecachedAsset)
          .sort()
          .map((name) => `/_astro/${name}`);
        const urls = [...PAGES, ...assets];

        // The version follows the content, not the clock: rebuilding an
        // unchanged site must not make every visitor re-download the cache.
        // The build timestamp /programme prints for offline readers is left
        // out for the same reason.
        const hash = createHash('sha256');
        for (const url of urls) {
          const content = await readFile(distFile(dist, url));
          hash.update(url);
          hash.update(
            url.endsWith('/')
              ? content.toString('utf-8').replace(/data-built-at="[^"]*"/g, '')
              : content,
          );
        }
        const version = hash.digest('hex').slice(0, 12);

        const template = await readFile(new URL('./sw.js', import.meta.url), 'utf-8');
        const sw = template
          .replace(/^\/\* global .*\*\/\n/, '')
          // Anchored on the declarations: the template's header comment names
          // the placeholders too.
          .replace("const VERSION = '__CDL_VERSION__';", `const VERSION = '${version}';`)
          .replace('const PRECACHE_URLS = __CDL_PRECACHE__;', `const PRECACHE_URLS = ${JSON.stringify(urls, null, 2)};`);
        if (sw.includes("'__CDL_VERSION__'") || sw.includes('= __CDL_PRECACHE__')) {
          throw new Error('sw.js: a placeholder was not filled in');
        }

        await writeFile(join(dist, 'sw.js'), sw);
        logger.info(`sw.js ${version}: ${urls.length} URLs precached`);
      },
    },
  };
}
