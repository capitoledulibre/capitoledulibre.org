import { config } from '../config';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const { baseUrl, eventSlug } = config.pretalx;

// ── Cache configuration ──
// TTL in milliseconds (default: 1 hour, override with PRETALX_CACHE_TTL env var in seconds)
const CACHE_TTL = (parseInt(process.env.PRETALX_CACHE_TTL || '3600', 10)) * 1000;
const CACHE_DIR = join(process.cwd(), '.cache');
const CACHE_FILE = join(CACHE_DIR, `pretalx-${eventSlug}.json`);

/**
 * Bumped whenever FormattedTalk gains a field, so a cache written by an older
 * build is refetched instead of silently serving talks missing the new data.
 * A stale-schema cache is still kept as the last-resort fallback when Pretalx
 * is down — half the fields beats an empty programme.
 */
const CACHE_SCHEMA = 2;

interface CacheData {
  schema?: number;
  timestamp: number;
  talks: FormattedTalk[];
}

/** Raised when Pretalx is unreachable and there is no cache to fall back on. */
export class PretalxUnavailableError extends Error {
  constructor(cause: unknown) {
    super(
      `Pretalx is unreachable and no cached schedule exists for "${eventSlug}". ` +
        `Refusing to report an empty programme, which would be indistinguishable ` +
        `from "no talks published yet".`,
    );
    this.name = 'PretalxUnavailableError';
    this.cause = cause;
  }
}

/** Reads the cache regardless of age; the caller decides whether stale is acceptable. */
function readCache(): { talks: FormattedTalk[]; age: number; schema: number } | null {
  try {
    const raw = readFileSync(CACHE_FILE, 'utf-8');
    const data: CacheData = JSON.parse(raw);
    return { talks: data.talks, age: Date.now() - data.timestamp, schema: data.schema ?? 1 };
  } catch {
    // No cache, or it is unreadable/corrupt.
    return null;
  }
}

function writeCache(talks: FormattedTalk[]): void {
  try {
    mkdirSync(CACHE_DIR, { recursive: true });
    const data: CacheData = { schema: CACHE_SCHEMA, timestamp: Date.now(), talks };
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

/** A speaker's answer to one of the event's CfP questions. */
interface PretalxAnswer {
  question: number;
  answer: string | null;
}

interface PretalxQuestion {
  id: number;
  question: { fr: string } | string;
  target: string;
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
  answers: PretalxAnswer[];
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
  /** Speaker's own answer to the "Quel est le public visé ?" CfP question. */
  audience: string | null;
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

/**
 * The answer is free text typed by the speaker, so casing is all over the place
 * ("Tout public", "tout public", "débutant·es"). Only the first letter is
 * normalised: rewriting more would mangle names like "opentofu" or "GNOME".
 */
function findAudience(submission: PretalxSubmission, questionId: number): string | null {
  const answer = (submission.answers || []).find((a) => a.question === questionId)?.answer?.trim();
  if (!answer) return null;
  return answer.charAt(0).toUpperCase() + answer.slice(1);
}

/**
 * Id of the "Quel est le public visé ?" CfP question, resolved by wording
 * rather than hardcoded: the numeric id and the `identifier` are both minted
 * per question, so a new edition gets new ones. Returns null when the question
 * is absent (an edition that dropped it), which just leaves `audience` unset.
 */
async function fetchAudienceQuestionId(): Promise<number | null> {
  const questions = await fetchAllPages<PretalxQuestion>(
    `${baseUrl}/events/${eventSlug}/questions/?limit=100`,
  );
  const match = questions.find(
    (q) => q.target === 'submission' && /public\s+vis/i.test(getLocalizedString(q.question)),
  );
  if (!match) {
    console.warn('[pretalx] No "public visé" question on this event; talks will have no audience.');
    return null;
  }
  return match.id;
}

async function fetchTalksFromApi(): Promise<FormattedTalk[]> {
  console.log(`[pretalx] Fetching from API: ${baseUrl}/events/${eventSlug}/...`);

  const [submissions, slots, rooms, audienceQuestionId] = await Promise.all([
    fetchAllPages<PretalxSubmission>(
      `${baseUrl}/events/${eventSlug}/submissions/?limit=100&state=confirmed&expand=submission_type,track,speakers,resources,answers`
    ),
    fetchAllPages<PretalxSlot>(
      `${baseUrl}/events/${eventSlug}/slots/?limit=200`
    ),
    fetchAllPages<PretalxRoom>(
      `${baseUrl}/events/${eventSlug}/rooms/?limit=100`
    ),
    fetchAudienceQuestionId(),
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
        audience: audienceQuestionId === null ? null : findAudience(s, audienceQuestionId),
      };
    });
}

export async function getTalks(): Promise<FormattedTalk[]> {
  const cached = readCache();

  if (cached && cached.schema === CACHE_SCHEMA && cached.age < CACHE_TTL) {
    console.log(
      `[pretalx] Using cached data (${cached.talks.length} talks, ${Math.round(cached.age / 1000)}s old, TTL ${CACHE_TTL / 1000}s)`,
    );
    return cached.talks;
  }

  if (cached && cached.schema !== CACHE_SCHEMA) {
    console.log(
      `[pretalx] Cache schema ${cached.schema} predates ${CACHE_SCHEMA}; refetching.`,
    );
  } else if (cached) {
    console.log(
      `[pretalx] Cache expired (${Math.round(cached.age / 1000)}s old, TTL ${CACHE_TTL / 1000}s)`,
    );
  }

  try {
    const talks = await fetchTalksFromApi();
    writeCache(talks);
    return talks;
  } catch (err) {
    // An expired cache still beats shipping /programme with no schedule at all:
    // a transient Pretalx outage during a deploy used to silently strip the
    // page of ~2400 words and all of its subEvent structured data.
    if (cached) {
      console.warn(
        `[pretalx] Fetch failed (${err instanceof Error ? err.message : String(err)}). ` +
          `Falling back to STALE cache (${cached.talks.length} talks, ${Math.round(cached.age / 1000)}s old).`,
      );
      return cached.talks;
    }
    throw new PretalxUnavailableError(err);
  }
}
