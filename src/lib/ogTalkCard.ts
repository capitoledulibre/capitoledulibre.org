import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

/**
 * Build-time generator for the per-session social card.
 *
 * Sharing a talk link used to surface the generic event card, so every talk
 * looked identical in a timeline. Each session now gets its own 1200x630 JPEG
 * naming the event, the talk and its speakers.
 *
 * Same technique as scripts/generate-og-images.mjs: sharp composites Pango
 * text layers over a tinted photo, which means the Ubuntu font must be
 * installed system-wide. When it is not — or when anything else goes wrong —
 * the generic card is served instead, so a build never fails over a thumbnail.
 *
 * Rendering ~120 cards costs real time, so results are cached on disk under
 * .cache/og-talks/ keyed by a hash of what is drawn. Editing a talk's title in
 * Pretalx re-renders that one card; everything else is a file read.
 */

const WIDTH = 1200;
const HEIGHT = 630;
const PAD = 64;
const CONTENT_WIDTH = WIDTH - PAD * 2;

/** Bump when the layout changes, so cached cards from an older design are dropped. */
const LAYOUT_VERSION = 1;

const SOURCE_PHOTO = 'public/static/img/img01.jpg';
const LOGO = 'public/static/img/logo-capitoledulibre-horizontal.svg';
const FALLBACK_CARD = 'public/static/og/card.jpg';
const CACHE_DIR = join(process.cwd(), '.cache', 'og-talks');

// Brand colours, kept in sync with src/styles/global.css.
const BLUE = '#1a365d';
const ORANGE_DARK = '#a33000';
const GOLD = '#f6ad55';

export interface TalkCardInput {
  /** Session title — the line the card is really about. */
  title: string;
  /** "Alice Dupont et Bob Martin", or empty. */
  speakers: string;
  /** "Conférence · Sécurité" — format and track, printed above the title. */
  kicker: string;
  /** "samedi 14 novembre · 10:30 — 11:20 · Salle A203" */
  schedule: string;
  /** "Capitole du Libre 2026 · 14 & 15 novembre 2026" */
  edition: string;
}

// sharp is a devDependency: it exists at build time, which is the only time
// this module runs. Imported lazily so a missing install degrades to the
// generic card instead of breaking module resolution for the whole route.
type Sharp = typeof import('sharp');
let sharpModule: Promise<Sharp | null> | null = null;

function loadSharp(): Promise<Sharp | null> {
  sharpModule ??= import('sharp')
    .then((m) => m.default)
    .catch(() => {
      console.warn('[og] sharp is unavailable; talk cards fall back to the generic card.');
      return null;
    });
  return sharpModule;
}

/** Pango markup is XML: titles containing "&" or "<" must be escaped. */
function esc(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Probes Pango once. Without the Ubuntu family it silently falls back to
 * whatever fontconfig picks, which is off-brand and sometimes nothing at all.
 */
let fontOk: Promise<boolean> | null = null;

function hasUbuntu(sharp: Sharp): Promise<boolean> {
  fontOk ??= sharp({ text: { text: 'Ubuntu', font: 'Ubuntu Bold 40', rgba: true } })
    .png()
    .toBuffer()
    .then((buf) => buf.length > 500)
    .catch(() => false)
    .then((ok) => {
      if (!ok) {
        console.warn(
          '[og] The Ubuntu font is not available to Pango; talk cards fall back ' +
            'to the generic card. Install it system-wide (https://design.ubuntu.com/font).',
        );
      }
      return ok;
    });
  return fontOk;
}

interface Layer {
  buffer: Buffer;
  width: number;
  height: number;
}

async function textLayer(
  sharp: Sharp,
  markup: string,
  font: string,
  width = CONTENT_WIDTH,
): Promise<Layer> {
  const image = sharp({ text: { text: markup, font, rgba: true, width, align: 'left' } });
  const buffer = await image.png().toBuffer();
  const meta = await sharp(buffer).metadata();
  return { buffer, width: meta.width, height: meta.height };
}

/**
 * Memoises a promise but drops it again if it rejects, so one transient failure
 * does not turn every remaining card into the fallback for the rest of the
 * build. Same reasoning as the memo in src/lib/pretalx.ts.
 */
function memoize<T>(factory: () => Promise<T>): () => Promise<T> {
  let cached: Promise<T> | null = null;
  return () => {
    if (cached) return cached;
    const promise = factory();
    cached = promise;
    promise.catch(() => {
      if (cached === promise) cached = null;
    });
    return promise;
  };
}

/**
 * The background is identical on every card, so it is rendered once per build
 * rather than once per talk. The gradient is heavier than the generic card's:
 * this one carries three stacked blocks of text, not just a date.
 */
let background: (() => Promise<Buffer>) | null = null;

function buildBackground(sharp: Sharp): Promise<Buffer> {
  background ??= memoize(async () => {
    const photo = await sharp(SOURCE_PHOTO)
      .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'centre' })
      .toBuffer();

    const overlay = Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
         <defs>
           <linearGradient id="brand" x1="0" y1="0" x2="1" y2="1">
             <stop offset="0%" stop-color="${BLUE}" stop-opacity="0.96"/>
             <stop offset="55%" stop-color="${BLUE}" stop-opacity="0.9"/>
             <stop offset="100%" stop-color="${ORANGE_DARK}" stop-opacity="0.78"/>
           </linearGradient>
           <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
             <stop offset="55%" stop-color="#000000" stop-opacity="0"/>
             <stop offset="100%" stop-color="#000000" stop-opacity="0.35"/>
           </linearGradient>
         </defs>
         <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#brand)"/>
         <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#floor)"/>
         <rect x="0" y="${HEIGHT - 10}" width="${WIDTH}" height="10" fill="${GOLD}"/>
       </svg>`,
    );

    return sharp(photo).composite([{ input: overlay, blend: 'over' }]).toBuffer();
  });
  return background();
}

/** Rasterises the logo and recolours it white, keeping its alpha mask. */
let logoLayer: (() => Promise<Layer>) | null = null;

function buildLogo(sharp: Sharp, height: number): Promise<Layer> {
  logoLayer ??= memoize(async () => {
    const rendered = await sharp(LOGO, { density: 200 })
      .resize({ height, fit: 'inside' })
      .ensureAlpha()
      .png()
      .toBuffer();
    const meta = await sharp(rendered).metadata();
    const alpha = await sharp(rendered).extractChannel('alpha').toBuffer();
    const buffer = await sharp({
      create: { width: meta.width, height: meta.height, channels: 3, background: '#ffffff' },
    })
      .joinChannel(alpha)
      .png()
      .toBuffer();
    return { buffer, width: meta.width, height: meta.height };
  });
  return logoLayer();
}

/**
 * Renders the title as large as it fits in `maxHeight`, then truncates as a
 * last resort. Titles range from four words to a full sentence, and a fixed
 * size would either overflow the long ones or waste the card on the short ones.
 */
const TITLE_SIZES = [58, 51, 45, 40, 35];

async function titleLayer(sharp: Sharp, title: string, maxHeight: number): Promise<Layer> {
  for (const size of TITLE_SIZES) {
    const layer = await textLayer(
      sharp,
      `<span foreground="#ffffff" weight="bold">${esc(title)}</span>`,
      `Ubuntu ${size}`,
    );
    if (layer.height <= maxHeight) return layer;
  }

  const smallest = TITLE_SIZES[TITLE_SIZES.length - 1];
  let text = title;
  // Overlong titles exist; shrink the string until the block fits rather than
  // letting it run off the bottom of the card.
  for (let i = 0; i < 12 && text.length > 24; i++) {
    text = text.slice(0, Math.floor(text.length * 0.85)).trimEnd();
    const layer = await textLayer(
      sharp,
      `<span foreground="#ffffff" weight="bold">${esc(`${text}…`)}</span>`,
      `Ubuntu ${smallest}`,
    );
    if (layer.height <= maxHeight) return layer;
  }
  return textLayer(
    sharp,
    `<span foreground="#ffffff" weight="bold">${esc(`${text}…`)}</span>`,
    `Ubuntu ${smallest}`,
  );
}

async function render(sharp: Sharp, input: TalkCardInput): Promise<Buffer> {
  const base = await buildBackground(sharp);
  const logo = await buildLogo(sharp, 54);

  const edition = await textLayer(
    sharp,
    `<span foreground="#ffffff" alpha="72%">${esc(input.edition)}</span>`,
    'Ubuntu 25',
  );
  const kicker = input.kicker
    ? await textLayer(
        sharp,
        `<span foreground="${GOLD}" weight="bold" letter_spacing="1800">${esc(
          input.kicker.toUpperCase(),
        )}</span>`,
        'Ubuntu 24',
      )
    : null;
  const speakers = input.speakers
    ? await textLayer(
        sharp,
        `<span foreground="#ffffff" alpha="92%">${esc(input.speakers)}</span>`,
        'Ubuntu 31',
      )
    : null;
  const schedule = input.schedule
    ? await textLayer(
        sharp,
        `<span foreground="#ffffff" alpha="80%">${esc(input.schedule)}</span>`,
        'Ubuntu 26',
      )
    : null;

  // Space left for the title once the fixed blocks are placed.
  const topBlock = PAD + logo.height + 40 + (kicker ? kicker.height + 16 : 0);
  const bottomBlock =
    PAD + (schedule ? schedule.height + 26 : 0) + (speakers ? speakers.height + 26 : 0);
  const title = await titleLayer(sharp, input.title, HEIGHT - topBlock - bottomBlock);

  const layers: { input: Buffer; left: number; top: number }[] = [
    { input: logo.buffer, left: PAD, top: PAD },
    { input: edition.buffer, left: WIDTH - PAD - edition.width, top: PAD + 16 },
  ];

  // Kicker and title are centred in the band left between the header and the
  // pinned footer: a four-word title would otherwise hang under the logo with
  // 200px of empty card below it. Long titles fill the band, so this is a
  // no-op for them.
  const bandTop = PAD + logo.height + 40;
  const bandHeight = HEIGHT - bottomBlock - bandTop;
  const groupHeight = title.height + (kicker ? kicker.height + 16 : 0);
  let y = bandTop + Math.max(0, Math.round((bandHeight - groupHeight) / 2));
  if (kicker) {
    layers.push({ input: kicker.buffer, left: PAD, top: y });
    y += kicker.height + 16;
  }
  layers.push({ input: title.buffer, left: PAD, top: y });

  // Speakers and schedule are pinned to the bottom, so cards stay aligned
  // whatever the title's height.
  let bottom = HEIGHT - PAD;
  if (schedule) {
    bottom -= schedule.height;
    layers.push({ input: schedule.buffer, left: PAD, top: bottom });
    bottom -= 26;
  }
  if (speakers) {
    bottom -= speakers.height;
    layers.push({ input: speakers.buffer, left: PAD, top: bottom });
  }

  return sharp(base)
    .composite(layers)
    .jpeg({ quality: 84, progressive: true, mozjpeg: true })
    .toBuffer();
}

function cacheKey(input: TalkCardInput): string {
  const payload = JSON.stringify([LAYOUT_VERSION, input]);
  return createHash('sha256').update(payload).digest('hex').slice(0, 16);
}

/**
 * The card for one session. Never throws: any failure resolves to the generic
 * event card, which is still on-brand and still names the event.
 */
export async function talkCard(input: TalkCardInput): Promise<Buffer> {
  const cacheFile = join(CACHE_DIR, `${cacheKey(input)}.jpg`);
  try {
    return await readFile(cacheFile);
  } catch {
    // Not rendered yet.
  }

  try {
    const sharp = await loadSharp();
    if (!sharp || !(await hasUbuntu(sharp))) return await readFile(FALLBACK_CARD);

    const buffer = await render(sharp, input);
    await mkdir(CACHE_DIR, { recursive: true });
    await writeFile(cacheFile, buffer);
    return buffer;
  } catch (err) {
    console.warn(
      `[og] Falling back to the generic card for "${input.title}": ` +
        (err instanceof Error ? err.message : String(err)),
    );
    return readFile(FALLBACK_CARD);
  }
}
