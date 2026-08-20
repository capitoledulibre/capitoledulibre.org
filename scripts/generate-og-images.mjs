#!/usr/bin/env node

/**
 * Generates the social sharing card and the Event schema.org images.
 *
 * Outputs to public/static/og/:
 *   - card.jpg          1200x630  branded card used as og:image / twitter:image
 *   - event-16x9.jpg    1200x675  \
 *   - event-4x3.jpg     1200x900   > Event.image[] (Google recommends
 *   - event-1x1.jpg     1200x1200 /  the same subject in three ratios)
 *
 * Edition strings (year, dates, venue) are read from src/config.ts so there is
 * a single source of truth. Text is rendered with Pango, which needs the Ubuntu
 * font family installed system-wide; the script aborts if it is missing.
 *
 * Outputs are committed to the repository, so this only needs re-running when
 * the edition changes or the source photo is swapped.
 *
 * Usage: node scripts/generate-og-images.mjs [--source public/static/img/imgNN.jpg]
 */

import sharp from 'sharp';
import { execFile } from 'node:child_process';
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

const OUT_DIR = 'public/static/og';
const LOGO = 'public/static/img/logo-capitoledulibre-horizontal.svg';
const CONFIG = 'src/config.ts';

const CARD = { width: 1200, height: 630 };
const EVENT_RATIOS = [
  { name: 'event-16x9', width: 1200, height: 675 },
  { name: 'event-4x3', width: 1200, height: 900 },
  { name: 'event-1x1', width: 1200, height: 1200 },
];

// Brand colours, kept in sync with src/styles/global.css
const BLUE = '#1a365d';
const ORANGE_DARK = '#a33000';
const GOLD = '#f6ad55';

const sourceFlag = process.argv.indexOf('--source');
const SOURCE = sourceFlag !== -1 ? process.argv[sourceFlag + 1] : 'public/static/img/img01.jpg';

/** Pulls the edition strings out of src/config.ts without importing TypeScript. */
async function readEdition() {
  const src = await readFile(CONFIG, 'utf-8');
  const pick = (key) => {
    const m = src.match(new RegExp(`${key}:\\s*'([^']*)'`));
    return m?.[1];
  };
  const year = src.match(/year:\s*(\d{4})/)?.[1];
  const displayDates = pick('displayDates');
  const venueName = pick('name');
  if (!year || !displayDates || !venueName) {
    throw new Error(`Could not read year/displayDates/venue.name from ${CONFIG}`);
  }
  return { year, displayDates, venueName };
}

async function assertUbuntuFont() {
  try {
    const { stdout } = await execFileAsync('fc-list', [':family=Ubuntu', 'family']);
    if (stdout.trim()) return;
  } catch {
    // fc-list missing: fall through to the render probe below
  }
  // Probe Pango directly — it is the thing that actually needs the font.
  const probe = await sharp({
    text: { text: 'Ubuntu', font: 'Ubuntu Bold 40', rgba: true },
  })
    .png()
    .toBuffer();
  if (probe.length < 500) {
    throw new Error(
      'The Ubuntu font family is not available to Pango. Install it system-wide ' +
        '(https://design.ubuntu.com/font) and re-run.',
    );
  }
}

/** Rasterises the logo and recolours it white, keeping its alpha mask. */
async function whiteLogo(height) {
  const rendered = await sharp(LOGO, { density: 200 })
    .resize({ height, fit: 'inside' })
    .ensureAlpha()
    .png()
    .toBuffer();
  const { width, height: h } = await sharp(rendered).metadata();
  const alpha = await sharp(rendered).extractChannel('alpha').toBuffer();
  return sharp({
    create: { width, height: h, channels: 3, background: '#ffffff' },
  })
    .joinChannel(alpha)
    .png()
    .toBuffer();
}

/** Pango markup is XML: edition strings such as "14 & 15 novembre" must be escaped. */
function esc(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

async function textLayer(markup, font, width) {
  return sharp({
    text: { text: markup, font, rgba: true, width, align: 'left' },
  })
    .png()
    .toBuffer();
}

/** Photo cropped to the target box, with the brand gradient laid over it. */
async function tintedPhoto({ width, height }, { blueAlpha, orangeAlpha }) {
  const photo = await sharp(SOURCE)
    .resize(width, height, { fit: 'cover', position: 'centre' })
    .toBuffer();

  const gradient = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
       <defs>
         <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
           <stop offset="0%" stop-color="${BLUE}" stop-opacity="${blueAlpha}"/>
           <stop offset="55%" stop-color="${BLUE}" stop-opacity="${(blueAlpha + orangeAlpha) / 2}"/>
           <stop offset="100%" stop-color="${ORANGE_DARK}" stop-opacity="${orangeAlpha}"/>
         </linearGradient>
       </defs>
       <rect width="${width}" height="${height}" fill="url(#g)"/>
     </svg>`,
  );

  return sharp(photo).composite([{ input: gradient, blend: 'over' }]).toBuffer();
}

async function buildCard({ displayDates, venueName }) {
  const { width, height } = CARD;
  const pad = 76;
  const base = await tintedPhoto(CARD, { blueAlpha: 0.93, orangeAlpha: 0.62 });

  const logo = await whiteLogo(92);
  const logoMeta = await sharp(logo).metadata();

  const dates = await textLayer(
    `<span foreground="#ffffff" weight="bold">${esc(displayDates)}</span>`,
    'Ubuntu 62',
    width - pad * 2,
  );
  const venue = await textLayer(
    `<span foreground="${GOLD}" weight="medium">${esc(venueName)} · Toulouse</span>`,
    'Ubuntu 38',
    width - pad * 2,
  );
  const kicker = await textLayer(
    '<span foreground="#ffffff" alpha="78%">L’événement du Logiciel Libre en Occitanie</span>',
    'Ubuntu 30',
    width - pad * 2,
  );
  const footer = await textLayer(
    '<span foreground="#ffffff" alpha="70%">Gratuit sur inscription · capitoledulibre.org</span>',
    'Ubuntu 27',
    width - pad * 2,
  );

  const datesMeta = await sharp(dates).metadata();
  const kickerMeta = await sharp(kicker).metadata();
  const footerMeta = await sharp(footer).metadata();

  // Stack from the top: logo, kicker, dates, venue. Footer pinned to the bottom.
  let y = pad + 4;
  const layers = [{ input: logo, left: pad, top: y }];
  y += logoMeta.height + 40;
  layers.push({ input: kicker, left: pad, top: y });
  y += kickerMeta.height + 18;
  layers.push({ input: dates, left: pad, top: y });
  y += datesMeta.height + 12;
  layers.push({ input: venue, left: pad, top: y });
  layers.push({
    input: footer,
    left: pad,
    top: height - pad - footerMeta.height + 8,
  });

  const out = join(OUT_DIR, 'card.jpg');
  await sharp(base)
    .composite(layers)
    .jpeg({ quality: 86, progressive: true, mozjpeg: true })
    .toFile(out);
  return out;
}

async function buildEventImages() {
  const written = [];
  for (const ratio of EVENT_RATIOS) {
    const base = await tintedPhoto(ratio, { blueAlpha: 0.28, orangeAlpha: 0.18 });
    const out = join(OUT_DIR, `${ratio.name}.jpg`);
    await sharp(base)
      .jpeg({ quality: 82, progressive: true, mozjpeg: true })
      .toFile(out);
    written.push(out);
  }
  return written;
}

async function main() {
  await assertUbuntuFont();
  await mkdir(OUT_DIR, { recursive: true });

  const edition = await readEdition();
  const card = await buildCard(edition);
  const events = await buildEventImages();

  for (const file of [card, ...events]) {
    const { width, height } = await sharp(file).metadata();
    const { size } = await stat(file);
    console.log(`${file} — ${width}x${height}, ${Math.round(size / 1024)} Ko`);
  }

  // Reminder, because the card is committed rather than built on the fly.
  await writeFile(
    join(OUT_DIR, 'README.md'),
    '# Social images\n\n' +
      'Generated by `pnpm og` (scripts/generate-og-images.mjs) and committed.\n' +
      'Re-run after changing the edition dates/venue in `src/config.ts` or the\n' +
      'source photo.\n',
  );
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
