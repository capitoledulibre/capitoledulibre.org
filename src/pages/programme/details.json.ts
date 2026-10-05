import type { APIRoute } from 'astro';
import { renderMarkdown } from '../../lib/markdown';
import { talkRoutes } from '../../lib/talks';

/**
 * The long-form text of every session — abstracts and speaker bios — which
 * /programme used to inline in its JSON island. It was two thirds of that
 * payload and only needed once someone opens a session, searches, or exports
 * favourites, so the page now fetches it on first need (see programme.astro).
 * The service worker precaches it so the modal keeps working offline.
 *
 * Shape: { [code]: { descriptionHtml, bios: [biographyHtml per speaker] } },
 * bios in the same order as the speakers in the page payload.
 */

export const GET: APIRoute = async () => {
  const talks = await talkRoutes();

  const details = Object.fromEntries(
    talks.map((t) => [
      t.code,
      {
        descriptionHtml: renderMarkdown(t.description),
        bios: t.speakers.map((s) => renderMarkdown(s.biography)),
      },
    ]),
  );

  return new Response(JSON.stringify(details), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
