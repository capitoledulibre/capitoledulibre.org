import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

/**
 * Blog feed, advertised from every page via `<link rel="alternate">` in
 * BaseLayout. Content aggregators and readers discover posts through this
 * rather than by re-crawling /blog/.
 */
export async function GET(context: APIContext) {
  const posts = await getCollection('blog');
  posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: 'Blog du Capitole du Libre',
    description: 'Actualités, annonces et récaps du Capitole du Libre.',
    // context.site comes from `site` in astro.config.mjs, so an archived
    // edition rebuilt under its own hostname emits its own links.
    site: context.site!,
    trailingSlash: true,
    customData: '<language>fr-FR</language>',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.excerpt,
      pubDate: post.data.date,
      author: post.data.author,
      link: `/blog/${post.id}/`,
    })),
  });
}
