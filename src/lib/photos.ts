import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';

export interface Photo {
  src: string;
  alt: string;
  credit: string;
  tags: string[];
}

let _cache: Photo[] | null = null;

function loadPhotos(): Photo[] {
  if (_cache) return _cache;
  const raw = readFileSync(join(process.cwd(), 'src/content/photos.yaml'), 'utf-8');
  _cache = parse(raw) as Photo[];
  return _cache;
}

/** Get all photos */
export function getAllPhotos(): Photo[] {
  return loadPhotos();
}

/** Get photos matching ANY of the given tags */
export function getPhotosByTag(...tags: string[]): Photo[] {
  return loadPhotos().filter((p) => p.tags.some((t) => tags.includes(t)));
}

/** Get photos matching ALL of the given tags */
export function getPhotosByAllTags(...tags: string[]): Photo[] {
  return loadPhotos().filter((p) => tags.every((t) => p.tags.includes(t)));
}

/** Get a random subset of photos matching a tag */
export function getRandomPhotosByTag(tag: string, count: number): Photo[] {
  const matching = getPhotosByTag(tag);
  const shuffled = [...matching].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
