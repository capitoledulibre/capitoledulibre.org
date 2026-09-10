import { config } from '../config';
import { plainAbstract, truncate } from './talks';

/**
 * schema.org helpers.
 *
 * Everything is expressed as one connected graph rather than a pile of
 * independent snippets: the site-wide entities (WebSite, the two
 * Organizations, the venue) are declared once by BaseLayout via `siteGraph()`,
 * and every page-level node points at them by `@id`. That is what lets a
 * consumer understand that the `Event`, the `BlogPosting` publisher and the
 * `sponsor` list all belong to the same organisation.
 */

/**
 * Canonical origin, taken from `site` in astro.config.mjs (itself overridable
 * with SITE_URL). Never hardcode the domain here: an archived edition rebuilt
 * under 2026.capitoledulibre.org must not emit @ids pointing at the apex.
 */
export const SITE_URL = (import.meta.env.SITE ?? 'https://capitoledulibre.org').replace(/\/+$/, '');

/** Turns a site-relative path into an absolute URL; passes through absolute ones. */
export function absolute(path: string): string {
  return /^https?:\/\//.test(path) ? path : `${SITE_URL}${path}`;
}

const { year } = config.edition;

/** Stable identifiers, so every page refers to the same entities. */
export const ID = {
  website: `${SITE_URL}/#website`,
  /** The event brand — what people search for. */
  brand: `${SITE_URL}/#organization`,
  /** Toulibre, the association that runs it. */
  organizer: `${SITE_URL}/#toulibre`,
  event: `${SITE_URL}/#edition-${year}`,
  venue: `${SITE_URL}/lieu/#enseeiht`,
} as const;

/** Branded 1200x630 card for og:image / twitter:image. See scripts/generate-og-images.mjs. */
export const OG_CARD = '/static/og/card.jpg';

/** Same subject in the three ratios Google asks for on Event.image. */
const EVENT_IMAGES = [
  '/static/og/event-16x9.jpg',
  '/static/og/event-4x3.jpg',
  '/static/og/event-1x1.jpg',
];

const LOGO = '/static/img/logo-capitoledulibre-horizontal.svg';

/** Toulouse is on CET in mid-November, every year. */
const TZ_OFFSET = '+01:00';
export const TIMEZONE = 'Europe/Paris';

/** Event day boundaries, as printed on the site. */
const DAY_START = '09:30';
const DAY_END = '18:00';

/** `YYYY-MM-DD` for a configured edition date, without timezone drift. */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Combines a configured edition date with a local wall-clock time. */
export function isoDateTime(date: Date, time: string): string {
  return `${isoDate(date)}T${time}:00${TZ_OFFSET}`;
}

export const EDITION_START = isoDateTime(config.edition.dates.start, DAY_START);
export const EDITION_END = isoDateTime(config.edition.dates.end, DAY_END);

type Node = Record<string, unknown>;

/** Drops keys whose value is undefined/null/empty so no empty properties ship. */
function compact(node: Node): Node {
  return Object.fromEntries(
    Object.entries(node).filter(([, v]) => {
      if (v === undefined || v === null || v === '') return false;
      if (Array.isArray(v) && v.length === 0) return false;
      return true;
    }),
  );
}

function ref(id: string): Node {
  return { '@id': id };
}

// ── Site-wide entities ────────────────────────────────────────────────────────

function websiteNode(): Node {
  return {
    '@type': 'WebSite',
    '@id': ID.website,
    url: `${SITE_URL}/`,
    name: 'Capitole du Libre',
    description: `L'événement du Logiciel Libre en Occitanie, organisé chaque année à Toulouse.`,
    inLanguage: 'fr-FR',
    publisher: ref(ID.brand),
  };
}

function brandNode(): Node {
  return {
    '@type': 'Organization',
    '@id': ID.brand,
    name: 'Capitole du Libre',
    alternateName: 'CdL',
    url: `${SITE_URL}/`,
    email: config.social.email,
    description:
      'Événement annuel gratuit dédié au logiciel libre à Toulouse : conférences, ateliers, village associatif, install party.',
    logo: {
      '@type': 'ImageObject',
      url: absolute(LOGO),
      caption: 'Capitole du Libre',
    },
    image: absolute(OG_CARD),
    parentOrganization: ref(ID.organizer),
    sameAs: [
      config.social.mastodon,
      config.social.bluesky,
      config.social.twitter,
      config.social.facebook,
      config.social.linkedin,
      config.social.instagram,
      config.links.github,
    ],
  };
}

function organizerNode(): Node {
  return {
    '@type': 'Organization',
    '@id': ID.organizer,
    name: 'Toulibre',
    description: `Association toulousaine de promotion du logiciel libre, organisatrice du Capitole du Libre.`,
    url: config.links.toulibre,
    subOrganization: ref(ID.brand),
  };
}

function venueNode(): Node {
  return {
    '@type': 'Place',
    '@id': ID.venue,
    name: config.venue.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2 rue Charles Camichel',
      addressLocality: 'Toulouse',
      postalCode: '31000',
      addressRegion: 'Occitanie',
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: config.venue.coordinates.lat,
      longitude: config.venue.coordinates.lng,
    },
    url: `${SITE_URL}/lieu/`,
    publicAccess: true,
    isAccessibleForFree: true,
  };
}

/**
 * The entities every page shares. Emitted once by BaseLayout; page-level nodes
 * reference these by `@id` instead of restating them.
 */
export function siteGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [websiteNode(), brandNode(), organizerNode(), venueNode()].map(compact),
  };
}

// ── Breadcrumbs ──────────────────────────────────────────────────────────────

/**
 * Trailing slashes matter: they must match the canonical URL, otherwise the
 * breadcrumb points at a URL that 301s.
 */
export function breadcrumb(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
      ...items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: item.name,
        item: absolute(item.path),
      })),
    ],
  };
}

// ── The edition itself ───────────────────────────────────────────────────────

export interface EventNodeOptions {
  /** Partner organisations, from the `partners` collection. */
  sponsors?: { name: string; url: string }[];
  /** Speakers, once a real programme for this edition exists. */
  performers?: { name: string }[];
  /** Sessions and permanent activities that make up the edition. */
  subEvents?: Node[];
}

/**
 * The `Event` for the current edition. Google needs name/startDate/location;
 * everything else here is the recommended set that makes the entity legible.
 */
export function eventNode(options: EventNodeOptions = {}): Node {
  const { sponsors = [], performers = [], subEvents = [] } = options;

  return compact({
    '@context': 'https://schema.org',
    '@type': 'Event',
    '@id': ID.event,
    name: `Capitole du Libre ${year}`,
    alternateName: `CdL ${year}`,
    description: `L'événement du Logiciel Libre en Occitanie. Conférences, ateliers, village associatif, install party, LAN party — gratuit sur inscription.`,
    url: `${SITE_URL}/`,
    startDate: EDITION_START,
    endDate: EDITION_END,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: ref(ID.venue),
    organizer: ref(ID.organizer),
    isAccessibleForFree: true,
    inLanguage: 'fr',
    image: EVENT_IMAGES.map(absolute),
    maximumAttendeeCapacity: config.stats.visitors,
    keywords: [
      'logiciel libre',
      'open source',
      'Linux',
      'conférences',
      'ateliers',
      'Toulouse',
      'Occitanie',
      `Capitole du Libre ${year}`,
    ],
    audience: {
      '@type': 'Audience',
      audienceType: 'Développeurs, étudiants, associations, curieux du logiciel libre',
    },
    offers: compact({
      '@type': 'Offer',
      name: 'Inscription gratuite',
      price: 0,
      priceCurrency: 'EUR',
      url: config.tickets.url,
      availability: 'https://schema.org/InStock',
      category: 'Free',
      // Only emitted once the real registration opening date is configured —
      // guessing here would put a wrong fact in structured data.
      validFrom: config.tickets.validFrom ? isoDate(config.tickets.validFrom) : undefined,
    }),
    sponsor: sponsors.map((s) => ({ '@type': 'Organization', name: s.name, url: s.url })),
    performer: performers.map((p) => ({ '@type': 'Person', name: p.name })),
    subEvent: subEvents,
  });
}

// ── Permanent activities (install party, LAN party, …) ───────────────────────

export interface ActivityOptions {
  name: string;
  description: string;
  path: string;
  /** Daily opening hours, as advertised on the page. */
  hours: { startTime: string; endTime: string }[];
  typicalAgeRange?: string;
  audienceType?: string;
  /** Extra collaborating organisation, e.g. Net7 for the install party. */
  contributor?: { name: string; url?: string };
}

/**
 * A permanent activity running across both days. `startDate`/`endDate` give the
 * overall span (what Google reads), `eventSchedule` gives the actual daily
 * hours so the two-day span is not mistaken for one 33-hour session.
 */
export function activityEvent(options: ActivityOptions): Node {
  const { name, description, path, hours, typicalAgeRange, audienceType, contributor } = options;
  const first = hours[0];
  const last = hours[hours.length - 1];

  return compact({
    '@context': 'https://schema.org',
    '@type': 'Event',
    '@id': `${absolute(path)}#event`,
    name: `${name} — Capitole du Libre ${year}`,
    description,
    url: absolute(path),
    superEvent: ref(ID.event),
    location: ref(ID.venue),
    organizer: ref(ID.organizer),
    startDate: isoDateTime(config.edition.dates.start, first.startTime),
    endDate: isoDateTime(config.edition.dates.end, last.endTime),
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    isAccessibleForFree: true,
    inLanguage: 'fr',
    typicalAgeRange,
    audience: audienceType ? { '@type': 'Audience', audienceType } : undefined,
    contributor: contributor
      ? compact({ '@type': 'Organization', name: contributor.name, url: contributor.url })
      : undefined,
    eventSchedule: hours.map((slot) => ({
      '@type': 'Schedule',
      startDate: isoDate(config.edition.dates.start),
      endDate: isoDate(config.edition.dates.end),
      startTime: slot.startTime,
      endTime: slot.endTime,
      byDay: ['https://schema.org/Saturday', 'https://schema.org/Sunday'],
      scheduleTimezone: TIMEZONE,
    })),
    offers: {
      '@type': 'Offer',
      price: 0,
      priceCurrency: 'EUR',
      url: config.tickets.url,
      availability: 'https://schema.org/InStock',
      category: 'Free',
    },
  });
}

// ── Programme sessions ───────────────────────────────────────────────────────

export interface SessionInput {
  code: string;
  title: string;
  description: string;
  start: string | null;
  end: string | null;
  room: string | null;
  track: string;
  type: string;
  speakers: { name: string }[];
}

/**
 * Strips markdown/HTML so descriptions stay plain text in structured data.
 * Shares `plainAbstract` with the session pages and social cards: two
 * implementations had already drifted apart on how they treat markdown links.
 */
function plainText(input: string, maxLength = 500): string {
  return truncate(plainAbstract(input), maxLength);
}

/**
 * One `Event` per talk, to be attached as `subEvent` of the edition. `talkUrl`
 * builds the Pretalx permalink, which is the canonical page for a session.
 */
export function sessionEvents(
  sessions: SessionInput[],
  talkUrl: (code: string) => string,
): Node[] {
  return sessions
    .filter((s) => s.start && s.end)
    .map((session) =>
      compact({
        '@type': 'Event',
        '@id': `${SITE_URL}/programme/#${session.code}`,
        name: session.title,
        description: session.description ? plainText(session.description) : undefined,
        url: talkUrl(session.code),
        startDate: session.start,
        endDate: session.end,
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
        superEvent: ref(ID.event),
        isAccessibleForFree: true,
        inLanguage: 'fr',
        // Track and format go in keywords: `about` expects a Thing and
        // `additionalType` a type IRI, neither of which a French label is.
        keywords: [session.track, session.type].filter(Boolean),
        location: session.room
          ? {
              '@type': 'Place',
              name: `${config.venue.name} — Salle ${session.room}`,
              containedInPlace: ref(ID.venue),
            }
          : ref(ID.venue),
        performer: session.speakers.map((s) => ({ '@type': 'Person', name: s.name })),
      }),
    );
}

// ── People and partners ─────────────────────────────────────────────────────

export interface PersonInput {
  name: string;
  role: string;
  photo?: string;
  social?: { mastodon?: string; github?: string };
}

/** The organising team as an ordered list of `Person` nodes. */
export function teamList(members: PersonInput[], path: string): Node {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${absolute(path)}#team`,
    name: `Équipe d'organisation du Capitole du Libre ${year}`,
    numberOfItems: members.length,
    itemListElement: members.map((member, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: compact({
        '@type': 'Person',
        name: member.name,
        jobTitle: member.role,
        image: member.photo ? absolute(member.photo) : undefined,
        memberOf: ref(ID.organizer),
        sameAs: [member.social?.mastodon, member.social?.github].filter(Boolean),
      }),
    })),
  };
}

export interface PartnerInput {
  name: string;
  url: string;
  logo: string;
  level: string;
  description?: string;
}

/** Partner organisations, listed as the edition's sponsors. */
export function partnerList(partners: PartnerInput[], path: string): Node {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${absolute(path)}#partners`,
    name: `Partenaires du Capitole du Libre ${year}`,
    numberOfItems: partners.length,
    itemListElement: partners.map((partner, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: compact({
        '@type': 'Organization',
        name: partner.name,
        url: partner.url,
        logo: absolute(partner.logo),
        description: partner.description,
        sponsorOf: ref(ID.event),
      }),
    })),
  };
}

// ── Blog ─────────────────────────────────────────────────────────────────────

export interface ArticleInput {
  title: string;
  excerpt: string;
  path: string;
  datePublished: Date;
  dateModified?: Date;
  author: string;
  /** Set when the byline is an organisation rather than a person. */
  authorIsOrganization?: boolean;
  image?: string;
}

export function articleNode(article: ArticleInput): Node {
  const url = absolute(article.path);

  return compact({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: article.title,
    description: article.excerpt,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished: article.datePublished.toISOString(),
    dateModified: (article.dateModified ?? article.datePublished).toISOString(),
    author: article.authorIsOrganization
      ? ref(ID.brand)
      : { '@type': 'Person', name: article.author },
    publisher: ref(ID.brand),
    isPartOf: ref(ID.website),
    inLanguage: 'fr',
    // Falls back to the branded card so every post ships an image.
    image: absolute(article.image ?? OG_CARD),
    about: ref(ID.event),
  });
}
