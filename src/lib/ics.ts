import { config } from '../config';
import type { FormattedTalk } from './pretalx';
import { plainAbstract, speakerList } from './talks';

/**
 * iCalendar (RFC 5545) serialisation for a session, shared by the per-talk
 * `event.ics` endpoint and anything else that needs a calendar entry.
 *
 * /programme keeps its own copy in the browser, because exporting favourites
 * has to happen client-side: the set of favourites only exists in localStorage.
 */

/** Escapes the characters RFC 5545 gives meaning to inside a property value. */
export function escapeIcs(text: string | null | undefined): string {
  return String(text ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

/** UTC timestamp in the basic format calendars expect: 20261114T100000Z. */
export function icsDate(iso: string): string {
  return `${new Date(iso).toISOString().replace(/[-:]/g, '').split('.')[0]}Z`;
}

const encoder = new TextEncoder();

/**
 * Content lines are capped at 75 *octets*, and continuations start with a
 * space. Counting characters instead would overflow the limit on accented
 * French text and, worse, could cut an emoji in half — a few talk titles have
 * one, and half a surrogate pair is not valid UTF-8.
 */
function fold(line: string): string {
  if (encoder.encode(line).length <= 75) return line;

  const folded: string[] = [];
  let current = '';
  let bytes = 0;

  for (const char of line) {
    const size = encoder.encode(char).length;
    if (bytes + size > 75) {
      folded.push(current);
      current = ' ';
      bytes = 1;
    }
    current += char;
    bytes += size;
  }
  folded.push(current);

  return folded.join('\r\n');
}

/** The calendar file for one session, or null when it has no slot yet. */
export function talkIcs(talk: FormattedTalk, url: string): string | null {
  if (!talk.start || !talk.end) return null;

  const speakers = speakerList(talk);
  const facts = [
    talk.track && `Track : ${talk.track}`,
    talk.type && `Format : ${talk.type}`,
    talk.audience && `Public visé : ${talk.audience}`,
  ].filter(Boolean);
  const abstract = plainAbstract(talk.description);
  const description = [...facts, ...(abstract ? ['', abstract] : [])].join('\n');

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:-//Capitole du Libre//Programme ${config.edition.year}//FR`,
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${talk.code}@capitoledulibre.org`,
    `DTSTAMP:${icsDate(new Date().toISOString())}`,
    `DTSTART:${icsDate(talk.start)}`,
    `DTEND:${icsDate(talk.end)}`,
    `SUMMARY:${escapeIcs(speakers ? `${talk.title} — ${speakers}` : talk.title)}`,
    ...(talk.room ? [`LOCATION:${escapeIcs(`${config.venue.name} — Salle ${talk.room}`)}`] : []),
    `DESCRIPTION:${escapeIcs(description)}`,
    `URL:${url}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  return lines.map(fold).join('\r\n');
}
