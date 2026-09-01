import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';

export interface Stand {
  name: string;
  /** Descriptive half of the original Pretalx title, when there is one. */
  tagline?: string;
}

let _cache: Stand[] | null = null;

/** Confirmed village associatif exhibitors, sorted the way they are displayed. */
export function getStands(): Stand[] {
  if (_cache) return _cache;
  const raw = readFileSync(join(process.cwd(), 'src/content/stands.yaml'), 'utf-8');
  const stands = (parse(raw) ?? []) as Stand[];
  // Accent- and case-insensitive so "Ergo-L", "tetaneutral.net" and
  // "Zeste de Savoir" land where a French reader expects them.
  _cache = [...stands].sort((a, b) =>
    a.name.localeCompare(b.name, 'fr', { sensitivity: 'base' }),
  );
  return _cache;
}
