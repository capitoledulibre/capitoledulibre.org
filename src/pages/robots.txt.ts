import type { APIContext } from 'astro';

/**
 * Generated rather than a static public/robots.txt: the sitemap URL has to
 * follow `site` from astro.config.mjs. A hardcoded apex URL would keep pointing
 * at the current edition's sitemap once this build is archived under
 * 2026.capitoledulibre.org.
 */
export function GET(context: APIContext) {
  const site = context.site!;
  const sitemap = new URL('sitemap-index.xml', site);

  const body = `User-agent: *
Allow: /

Sitemap: ${sitemap.href}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
