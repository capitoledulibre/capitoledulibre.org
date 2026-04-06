#!/usr/bin/env node

/**
 * Converts all JPG/PNG images in public/static/img/ to AVIF and WebP.
 * Generates multiple sizes for responsive images.
 *
 * Usage: node scripts/optimize-images.mjs [--force]
 *   --force: re-convert even if output files already exist
 */

import sharp from 'sharp';
import { readdir, stat, mkdir } from 'node:fs/promises';
import { join, parse } from 'node:path';

const SRC_DIR = 'public/static/img';
const FORMATS = ['avif', 'webp'];
const WIDTHS = [480, 960, 1440]; // sm, md, lg
const QUALITY = { avif: 50, webp: 75 };
const EXTENSIONS = ['.jpg', '.jpeg', '.png'];

const force = process.argv.includes('--force');

async function fileExists(path) {
  try { await stat(path); return true; } catch { return false; }
}

async function processImage(filePath) {
  const { name, ext } = parse(filePath);
  if (!EXTENSIONS.includes(ext.toLowerCase())) return;
  // Skip SVGs and already-optimized files
  if (name.includes('.optimized')) return;

  const image = sharp(filePath);
  const metadata = await image.metadata();
  const originalWidth = metadata.width || 1920;

  let converted = 0;

  for (const format of FORMATS) {
    for (const width of WIDTHS) {
      // Skip if target width is larger than original
      if (width > originalWidth) continue;

      const outName = `${name}-${width}w.${format}`;
      const outPath = join(SRC_DIR, outName);

      if (!force && await fileExists(outPath)) continue;

      await sharp(filePath)
        .resize(width, null, { withoutEnlargement: true })
        [format]({ quality: QUALITY[format] })
        .toFile(outPath);

      converted++;
    }

    // Also generate a full-size version
    const fullName = `${name}.${format}`;
    const fullPath = join(SRC_DIR, fullName);

    if (!force && await fileExists(fullPath)) continue;

    await sharp(filePath)
      .resize(1920, null, { withoutEnlargement: true })
      [format]({ quality: QUALITY[format] })
      .toFile(fullPath);

    converted++;
  }

  return converted;
}

async function main() {
  console.log(`📸 Optimizing images in ${SRC_DIR}/`);
  if (force) console.log('   (--force: overwriting existing files)');

  const files = await readdir(SRC_DIR);
  const images = files.filter((f) => EXTENSIONS.includes(parse(f).ext.toLowerCase()));

  console.log(`   Found ${images.length} source images\n`);

  let totalConverted = 0;
  let totalSkipped = 0;

  for (const file of images) {
    const filePath = join(SRC_DIR, file);
    const before = totalConverted;
    const count = await processImage(filePath);
    totalConverted += count || 0;

    if (count > 0) {
      console.log(`   ✓ ${file} → ${count} files`);
    } else {
      console.log(`   · ${file} (skipped, already optimized)`);
      totalSkipped++;
    }
  }

  console.log(`\n   Done! ${totalConverted} files created, ${totalSkipped} skipped.`);

  // Show size comparison
  const srcFiles = await readdir(SRC_DIR);
  let jpgSize = 0, avifSize = 0, webpSize = 0;
  for (const f of srcFiles) {
    const s = await stat(join(SRC_DIR, f));
    if (f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png')) jpgSize += s.size;
    else if (f.endsWith('.avif')) avifSize += s.size;
    else if (f.endsWith('.webp')) webpSize += s.size;
  }

  const mb = (bytes) => (bytes / 1024 / 1024).toFixed(1);
  console.log(`\n   📊 Size comparison:`);
  console.log(`      Original (JPG/PNG): ${mb(jpgSize)} MB`);
  console.log(`      AVIF:               ${mb(avifSize)} MB`);
  console.log(`      WebP:               ${mb(webpSize)} MB`);
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
