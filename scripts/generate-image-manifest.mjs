#!/usr/bin/env node

/**
 * Records the intrinsic dimensions of every image under public/static,
 * so components can emit accurate width/height attributes and avoid layout
 * shift (a Core Web Vitals input) without guessing an aspect ratio.
 *
 * Writes src/content/image-dimensions.json, keyed by the site-absolute path
 * used in markup (e.g. "/static/img/img01.jpg"). The file is committed; re-run
 * after adding or replacing images.
 *
 * Responsive derivatives (`-480w`, `-960w`, `-1440w`) are skipped: markup only
 * ever points at the original, and srcset carries its own width descriptors.
 *
 * Usage: node scripts/generate-image-manifest.mjs
 */

import sharp from 'sharp';
import { readdir, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const ROOT = 'public';
const SCAN_DIR = 'public/static';
const OUT = 'src/content/image-dimensions.json';
// SVGs are included too: their declared size gives the aspect ratio, which is
// all the width/height attributes need to supply.
const EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.svg'];
const DERIVATIVE = /-\d+w\.[a-z]+$/i;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(path)));
    } else if (EXTENSIONS.some((ext) => entry.name.toLowerCase().endsWith(ext))) {
      files.push(path);
    }
  }
  return files;
}

async function main() {
  const files = (await walk(SCAN_DIR)).filter((file) => !DERIVATIVE.test(file)).sort();

  const manifest = {};
  let failed = 0;

  for (const file of files) {
    // Keys are site-absolute, matching how markup references the file.
    const key = `/${relative(ROOT, file)}`;
    try {
      const { width, height } = await sharp(file).metadata();
      if (!width || !height) throw new Error('no dimensions');
      manifest[key] = { width, height };
    } catch (err) {
      console.warn(`skipped ${key}: ${err.message}`);
      failed++;
    }
  }

  await writeFile(OUT, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(
    `${OUT} — ${Object.keys(manifest).length} images${failed ? `, ${failed} skipped` : ''}`,
  );
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
