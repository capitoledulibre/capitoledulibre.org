import { statSync } from 'node:fs';
import { join } from 'node:path';

/** Human-readable (French) size of a file served from public/, e.g. "1,1 Mo". */
export function fileSize(path: string): string {
  const bytes = statSync(join(process.cwd(), 'public', path)).size;
  return bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1).replace('.', ',')} Mo`
    : `${Math.round(bytes / 1024)} Ko`;
}
