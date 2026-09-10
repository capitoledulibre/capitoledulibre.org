import type { APIRoute, GetStaticPaths } from 'astro';
import { talkIcs } from '../../../../lib/ics';
import type { FormattedTalk } from '../../../../lib/pretalx';
import { talkPath, talkStaticPaths } from '../../../../lib/talks';

/**
 * "Ajouter à mon agenda" for a single session. A real file rather than a
 * `data:` URL built in the browser: it works with JavaScript off, survives
 * being forwarded, and every calendar client accepts a plain .ics link.
 */

export const getStaticPaths = (() => talkStaticPaths()) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props, site }) => {
  const talk = props.talk as FormattedTalk;
  const ics = talkIcs(talk, new URL(talkPath(talk.code), site).href);

  // A session with no slot has nothing to put in a calendar.
  if (!ics) return new Response('Not found', { status: 404 });

  return new Response(ics, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="cdl-${talk.code}.ics"`,
    },
  });
};
