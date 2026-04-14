import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    author: z.string(),
    excerpt: z.string(),
    image: z.string().optional(),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: '**/*.{json,yaml}', base: './src/content/team' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    photo: z.string().optional(),
    social: z
      .object({
        mastodon: z.string().optional(),
        github: z.string().optional(),
      })
      .optional(),
  }),
});

const partners = defineCollection({
  loader: glob({ pattern: '**/*.{json,yaml}', base: './src/content/partners' }),
  schema: z.object({
    name: z.string(),
    level: z.enum(['platine', 'or', 'argent', 'bronze', 'technique', 'institutionnel']),
    logo: z.string(),
    logo_light: z.string().optional(),
    url: z.string(),
    description: z.string().optional(),
  }),
});

const faq = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/faq' }),
  schema: z.object({
    question: z.string(),
    category: z.enum(['pratique', 'programme', 'accessibilite']),
    order: z.number(),
  }),
});

export const collections = { blog, team, partners, faq };
