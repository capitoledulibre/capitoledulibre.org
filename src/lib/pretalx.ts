import { config } from '../config';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const { baseUrl, eventSlug } = config.pretalx;

// ── Cache configuration ──
// TTL in milliseconds (default: 1 hour, override with PRETALX_CACHE_TTL env var in seconds)
const CACHE_TTL = (parseInt(process.env.PRETALX_CACHE_TTL || '3600', 10)) * 1000;
const CACHE_DIR = join(process.cwd(), '.cache');
const CACHE_FILE = join(CACHE_DIR, `pretalx-${eventSlug}.json`);

interface CacheData {
  timestamp: number;
  talks: FormattedTalk[];
}

function readCache(): FormattedTalk[] | null {
  try {
    const raw = readFileSync(CACHE_FILE, 'utf-8');
    const data: CacheData = JSON.parse(raw);
    const age = Date.now() - data.timestamp;
    if (age < CACHE_TTL) {
      const ageSec = Math.round(age / 1000);
      console.log(`[pretalx] Using cached data (${data.talks.length} talks, ${ageSec}s old, TTL ${CACHE_TTL / 1000}s)`);
      return data.talks;
    }
    console.log(`[pretalx] Cache expired (${Math.round(age / 1000)}s old, TTL ${CACHE_TTL / 1000}s)`);
  } catch {
    // No cache or invalid
  }
  return null;
}

function writeCache(talks: FormattedTalk[]): void {
  try {
    mkdirSync(CACHE_DIR, { recursive: true });
    const data: CacheData = { timestamp: Date.now(), talks };
    writeFileSync(CACHE_FILE, JSON.stringify(data));
    console.log(`[pretalx] Cached ${talks.length} talks to ${CACHE_FILE}`);
  } catch (err) {
    console.warn('[pretalx] Failed to write cache:', err);
  }
}

// ── Pretalx API types ──

interface PretalxSlot {
  id: number;
  room: number;
  start: string;
  end: string;
  submission: string;
  duration: number;
}

interface PretalxResource {
  id: number;
  resource: string;
  description: string;
}

interface PretalxSubmission {
  code: string;
  title: string;
  description: string;
  duration: number;
  state: string;
  do_not_record: boolean;
  submission_type: { id: number; name: { fr: string } };
  speakers: { code: string; name: string; biography: string | null; avatar_url: string }[];
  track: { id: number; name: { fr: string } } | null;
  resources: PretalxResource[];
}

interface PretalxRoom {
  id: number;
  name: { fr: string } | string;
}

export interface Speaker {
  name: string;
  avatar: string | null;
  biography: string | null;
}

export interface Resource {
  url: string;
  description: string;
}

export interface FormattedTalk {
  code: string;
  title: string;
  description: string;
  duration: number;
  speakers: Speaker[];
  track: string;
  type: string;
  room: string | null;
  start: string | null;
  end: string | null;
  resources: Resource[];
}

function getLocalizedString(value: { fr: string } | string | null | undefined): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value.fr;
}

async function fetchAllPages<T>(url: string): Promise<T[]> {
  const results: T[] = [];
  let nextUrl: string | null = url;

  while (nextUrl) {
    const res = await fetch(nextUrl);
    if (!res.ok) throw new Error(`Pretalx API error: ${res.status}`);
    const data = await res.json();
    results.push(...data.results);
    nextUrl = data.next;
  }

  return results;
}

async function fetchTalksFromApi(): Promise<FormattedTalk[]> {
  console.log(`[pretalx] Fetching from API: ${baseUrl}/events/${eventSlug}/...`);

  const [submissions, slots, rooms] = await Promise.all([
    fetchAllPages<PretalxSubmission>(
      `${baseUrl}/events/${eventSlug}/submissions/?limit=100&state=confirmed&expand=submission_type,track,speakers,resources`
    ),
    fetchAllPages<PretalxSlot>(
      `${baseUrl}/events/${eventSlug}/slots/?limit=200`
    ),
    fetchAllPages<PretalxRoom>(
      `${baseUrl}/events/${eventSlug}/rooms/?limit=100`
    ),
  ]);

  const roomMap = new Map<number, string>();
  for (const room of rooms) {
    roomMap.set(room.id, getLocalizedString(room.name));
  }

  const slotBySubmission = new Map<string, PretalxSlot>();
  for (const slot of slots) {
    if (slot.submission) {
      slotBySubmission.set(slot.submission, slot);
    }
  }

  return submissions
    .filter((s) => slotBySubmission.has(s.code))
    .map((s) => {
      const slot = slotBySubmission.get(s.code)!;
      return {
        code: s.code,
        title: s.title,
        description: s.description,
        duration: s.duration,
        speakers: s.speakers.map((sp) => ({
          name: sp.name,
          avatar: sp.avatar_url || null,
          biography: sp.biography || null,
        })),
        track: s.track ? getLocalizedString(s.track.name) : '',
        type: getLocalizedString(s.submission_type.name),
        room: roomMap.get(slot.room) ?? null,
        start: slot.start,
        end: slot.end,
        resources: (s.resources || []).map((r) => ({
          url: r.resource,
          description: r.description,
        })),
      };
    });
}

export async function getTalks(): Promise<FormattedTalk[]> {
  // Try cache first
  const cached = readCache();
  if (cached) return cached;

  // Fetch from API
  const talks = await fetchTalksFromApi();
  writeCache(talks);
  return talks;
}
