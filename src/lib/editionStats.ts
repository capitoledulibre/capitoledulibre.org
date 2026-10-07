import { config } from '../config';
import { getTalks } from './pretalx';
import { getStands } from './stands';

/**
 * Headline numbers for the home page, counted from the data rather than typed
 * into config.ts — the typed ones had fallen behind ("100+ conférences" with
 * 123 sessions published, "30+ stands" with 33 confirmed).
 *
 * Counts are floored to the ten and printed with a "+", so a cancellation or
 * two does not make the home page wrong between deploys. `config.stats` stays
 * as the floor: before the programme and the stand list are published (or if
 * Pretalx is unreachable in dev) the home page keeps last year's orders of
 * magnitude instead of announcing "0+".
 */

export interface EditionStats {
  /** e.g. "120+" — conferences, workshops and keynotes together. */
  sessions: string;
  /** e.g. "30+" */
  stands: string;
  /** e.g. "1 400" */
  visitors: string;
  /** True once Pretalx serves this edition's programme with sessions in it. */
  programmePublished: boolean;
}

const floorToTen = (n: number) => Math.floor(n / 10) * 10;
const plus = (n: number) => `${n}+`;

let _cache: Promise<EditionStats> | null = null;

async function compute(): Promise<EditionStats> {
  // Only this edition's programme counts: while Pretalx still serves last
  // year's, its size says nothing about this year's.
  const isCurrentEdition = config.pretalx.eventSlug === `cdl-${config.edition.year}`;

  let sessionCount = 0;
  if (isCurrentEdition) {
    try {
      sessionCount = (await getTalks()).length;
    } catch {
      // /programme fails the build loudly on its own; here the floor will do.
    }
  }

  return {
    // config.stats.conferences is what the home page has always printed for
    // "conférences et ateliers" together, so it is the floor for both.
    sessions: plus(Math.max(floorToTen(sessionCount), config.stats.conferences)),
    stands: plus(Math.max(floorToTen(getStands().length), config.stats.stands)),
    visitors: config.stats.visitors.toLocaleString('fr-FR'),
    programmePublished: sessionCount > 0,
  };
}

export function getEditionStats(): Promise<EditionStats> {
  _cache ??= compute();
  return _cache;
}
