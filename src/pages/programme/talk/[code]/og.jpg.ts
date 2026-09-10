import type { APIRoute, GetStaticPaths } from 'astro';
import { config } from '../../../../config';
import { talkCard } from '../../../../lib/ogTalkCard';
import type { FormattedTalk } from '../../../../lib/pretalx';
import { scheduleLine, speakerList, talkStaticPaths } from '../../../../lib/talks';

/**
 * The 1200x630 card a session's link unfurls to. One per talk, generated at
 * build time — see src/lib/ogTalkCard.ts for the rendering and its cache.
 */

export const getStaticPaths = (() => talkStaticPaths()) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const talk = props.talk as FormattedTalk;

  const buffer = await talkCard({
    title: talk.title,
    speakers: speakerList(talk),
    kicker: [talk.type, talk.track].filter(Boolean).join(' · '),
    schedule: scheduleLine(talk),
    edition: `Capitole du Libre · ${config.edition.displayDates}`,
  });

  // Only `astro dev`/`preview` read this header — a static build writes the
  // bytes to disk and nginx decides the type from the extension. Caching is
  // configured server-side; see the SEO notes in the README.
  return new Response(new Uint8Array(buffer), {
    headers: { 'Content-Type': 'image/jpeg' },
  });
};
