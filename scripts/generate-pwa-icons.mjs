#!/usr/bin/env node

/**
 * Generates the PNG icons the web app manifest and iOS need, from the favicon.
 *
 * Outputs to public/static/pwa/:
 *   - icon-192.png           192x192  "any" purpose: the round logo, transparent corners
 *   - icon-512.png           512x512  "any" purpose
 *   - icon-maskable-512.png  512x512  "maskable": full-bleed orange, logo inside the
 *                                     80% safe zone so Android's mask never clips it
 *   - apple-touch-icon.png   180x180  iOS ignores transparency and fills it with
 *                                     black, so this one is full-bleed as well
 *
 * Outputs are committed; re-run only if the favicon changes.
 *
 * Usage: node scripts/generate-pwa-icons.mjs
 */

import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const SOURCE = 'public/favicon.svg';
const OUT_DIR = 'public/static/pwa';
const ORANGE = '#d03d00';

/** The logo alone, scaled to `size`. High density so the SVG rasterises crisply. */
function logo(size) {
  return sharp(SOURCE, { density: 600 }).resize(size, size).png().toBuffer();
}

/**
 * The favicon is a single path: the cross is a hole in the disc, not a white
 * shape, so it takes the colour of whatever is behind — dark on a dark
 * launcher, invisible on orange. A white disc goes underneath: small enough to
 * stay hidden behind the logo's rim, large enough to fill the cross.
 */
function whiteDisc(size) {
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">` +
      `<circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/></svg>`,
  );
}

/** The logo at `ratio` of a `size` canvas, on `background`, with a white cross. */
async function icon(size, { ratio = 1, background = { r: 0, g: 0, b: 0, alpha: 0 } } = {}) {
  const inner = Math.round(size * ratio);
  return sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite([
      { input: whiteDisc(Math.round(inner * 0.9)), gravity: 'centre' },
      { input: await logo(inner), gravity: 'centre' },
    ])
    .png()
    .toBuffer();
}

await mkdir(OUT_DIR, { recursive: true });

const outputs = [
  ['icon-192.png', () => icon(192)],
  ['icon-512.png', () => icon(512)],
  // On full-bleed orange the disc merges with the background and only the
  // cross reads; 0.75 keeps its arms inside the 80%-diameter safe circle.
  ['icon-maskable-512.png', () => icon(512, { ratio: 0.75, background: ORANGE })],
  ['apple-touch-icon.png', () => icon(180, { ratio: 0.85, background: ORANGE })],
];

for (const [name, render] of outputs) {
  await sharp(await render()).toFile(join(OUT_DIR, name));
  console.log(`✓ ${join(OUT_DIR, name)}`);
}
