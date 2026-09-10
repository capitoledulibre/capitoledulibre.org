import { config } from '../config';
import { getTalks, type FormattedTalk } from './pretalx';

/**
 * Everything the site needs to address a single session: its own page, its
 * social card, its Pretalx permalink, and the short strings both the page and
 * the card print.
 *
 * The canonical URL of a session is this site's `/programme/talk/<code>/`, not
 * the Pretalx one: it is the page that carries the per-talk social card, the
 * campus plan and the room directions. Pretalx stays linked from the page as
 * the speaker-facing source.
 */

const cfpRoot = config.pretalx.baseUrl.replace(/\/api\/?$/, '');

/** Site-relative path of a session's own page. Trailing slash: see `trailingSlash: 'always'`. */
export function talkPath(code: string): string {
  return `/programme/talk/${code}/`;
}

/** Site-relative path of the 1200x630 card generated for a session. */
export function talkCardPath(code: string): string {
  return `/programme/talk/${code}/og.jpg`;
}

/** The session's page on Pretalx, where the speakers manage it. */
export function pretalxTalkUrl(code: string): string {
  return `${cfpRoot}/${config.pretalx.eventSlug}/talk/${code}/`;
}

const TIME_FORMAT: Intl.DateTimeFormatOptions = {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Europe/Paris',
};

/**
 * All date formatting pins Europe/Paris. These strings are baked into static
 * HTML and into the social cards at build time, so they must describe the
 * event's local schedule rather than the build machine's timezone.
 */
export function formatTalkTime(iso: string | null): string {
  if (!iso) return '';
  return new Date(iso).toLocaleTimeString('fr-FR', TIME_FORMAT);
}

/** "samedi 14 novembre" from an instant. */
export function formatTalkDay(iso: string | null): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'Europe/Paris',
  });
}

/**
 * Same, from a plain `YYYY-MM-DD` — the shape /programme derives its day tabs
 * from, by slicing the Pretalx timestamp, so the string is already a
 * Europe/Paris date.
 *
 * Anchored at noon UTC and formatted in UTC: a date-only string names no
 * instant, and pinning it to the build machine's local midnight would shift
 * the weekday on any machine far enough east or west.
 */
export function formatDayLabel(
  dateStr: string,
  options: Intl.DateTimeFormatOptions,
): string {
  return new Date(`${dateStr}T12:00:00Z`).toLocaleDateString('fr-FR', {
    ...options,
    timeZone: 'UTC',
  });
}

/** Speaker names as one readable list: "Alice, Bob et Charlie". */
export function speakerList(talk: Pick<FormattedTalk, 'speakers'>): string {
  const names = talk.speakers.map((s) => s.name);
  if (names.length === 0) return '';
  if (names.length === 1) return names[0];
  return `${names.slice(0, -1).join(', ')} et ${names[names.length - 1]}`;
}

/** "samedi 14 novembre · 10:30 — 11:20 · Salle A203" — the one-line practical summary. */
export function scheduleLine(talk: FormattedTalk): string {
  const parts: string[] = [];
  const day = formatTalkDay(talk.start);
  if (day) parts.push(day);
  const start = formatTalkTime(talk.start);
  const end = formatTalkTime(talk.end);
  if (start) parts.push(end ? `${start} — ${end}` : start);
  if (talk.room) parts.push(`Salle ${talk.room}`);
  return parts.join(' · ');
}

/**
 * Strips markdown *and* raw HTML to plain prose, for meta descriptions, social
 * cards and structured data.
 *
 * The HTML pass is not optional: Pretalx abstracts are markdown, and markdown
 * lets an author drop raw tags in. At least one talk in the current programme
 * does. Without it those tags end up printed verbatim in a `<meta>` description
 * and painted onto the social card.
 */
export function plainAbstract(description: string | null): string {
  if (!description) return '';
  return description
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/^\s{0,3}#{1,6}\s+/gm, '')
    .replace(/[*_`>#]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Truncates on a word boundary, appending an ellipsis only when it actually cut. */
export function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

/**
 * `<meta name="description">` for a session page: who speaks and when, then as
 * much of the abstract as fits. Search results and social previews truncate
 * well before 200 characters, so the facts that identify the talk go first.
 */
export function talkMetaDescription(talk: FormattedTalk): string {
  const speakers = speakerList(talk);
  const head = [
    speakers && `Par ${speakers}`,
    scheduleLine(talk),
  ]
    .filter(Boolean)
    .join(' · ');
  const abstract = plainAbstract(talk.description);
  const summary = `${head}. ${abstract}`.trim();
  return truncate(summary || talk.title, 200);
}

/**
 * Talks for the routes generated per session (`getStaticPaths`). Mirrors what
 * /programme does with a failed fetch: a production build fails loudly rather
 * than silently shipping a site with no session pages, while dev and an
 * explicit PRETALX_ALLOW_EMPTY=1 render nothing and carry on.
 */
export async function talkRoutes(): Promise<FormattedTalk[]> {
  try {
    return await getTalks();
  } catch (err) {
    const allowEmpty = import.meta.env.DEV || process.env.PRETALX_ALLOW_EMPTY === '1';
    if (!allowEmpty) throw err;
    console.error('[programme] Pretalx unavailable, no session pages generated:', err);
    return [];
  }
}

/**
 * `getStaticPaths` for the routes that need nothing but the session itself —
 * its social card and its .ics. The page next to them adds its own props, so
 * it builds its list rather than reusing this one.
 */
export async function talkStaticPaths() {
  const talks = await talkRoutes();
  return talks.map((talk) => ({ params: { code: talk.code }, props: { talk } }));
}
