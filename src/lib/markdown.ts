import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

/**
 * Rendering for the markdown that comes from Pretalx — talk abstracts and
 * speaker biographies.
 *
 * Why this is not just `marked.parse()`: markdown passes raw HTML straight
 * through, and `marked` has had no `sanitize` option since v5. The result is
 * injected with `set:html` on the session pages and with `innerHTML` in the
 * /programme modal, so without the pass below anything typed into a CfP field
 * would execute on capitoledulibre.org. Submissions are reviewed before they
 * are confirmed, but review is not a security boundary.
 *
 * The allowlist keeps what speakers legitimately use — at least one talk in the
 * current programme relies on `<sup>` — and drops everything else, including
 * every event handler attribute, `<script>`, `<style>` and `<iframe>`.
 *
 * This runs at build time only: `sanitize-html` is a devDependency and none of
 * it reaches the browser.
 */

marked.setOptions({ breaks: true, gfm: true });

const ALLOWED_TAGS = [
  'p',
  'br',
  'hr',
  'strong',
  'em',
  'b',
  'i',
  'del',
  'sup',
  'sub',
  'code',
  'pre',
  'blockquote',
  'ul',
  'ol',
  'li',
  'a',
  // Abstracts start at the page's h2, so a speaker's own headings begin at h3.
  'h3',
  'h4',
  'h5',
  'h6',
  'table',
  'thead',
  'tbody',
  'tr',
  'th',
  'td',
];

const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: ALLOWED_TAGS,
  allowedAttributes: {
    // `rel` is added by transformTags below, and sanitize-html re-filters
    // attributes *after* a transform runs — leave it out here and the rel is
    // silently dropped again.
    a: ['href', 'title', 'rel'],
    // GitHub-flavoured markdown emits these on table cells.
    th: ['align'],
    td: ['align'],
  },
  allowedSchemes: ['http', 'https', 'mailto'],
  // A link out of a talk abstract is a link to somewhere we do not control.
  transformTags: {
    a: (tagName, attribs) => ({
      tagName,
      attribs: { ...attribs, rel: 'noopener noreferrer nofollow' },
    }),
  },
  // Anything dropped leaves its text behind rather than vanishing silently.
  nonTextTags: ['script', 'style', 'textarea', 'option', 'noscript'],
};

/** Renders CfP markdown to HTML that is safe to inject. Empty input yields ''. */
export function renderMarkdown(text: string | null | undefined): string {
  if (!text) return '';
  return sanitizeHtml(marked.parse(text) as string, SANITIZE_OPTIONS);
}
