# CLAUDE.md — Site Capitole du Libre

## Vue d'ensemble

Site web officiel du **Capitole du Libre**, événement annuel dédié au logiciel libre à Toulouse. L'événement accueille ~1400 personnes sur un week-end (samedi-dimanche mi-novembre) à l'ENSEEIHT. Public : développeurs, passionnés d'informatique, curieux du logiciel libre — tous niveaux.

**Objectif du site** : Informer, donner envie de venir, aider les visiteurs à se projeter et à naviguer pendant l'événement.

## Stack technique

- **Framework** : Astro 5
- **CSS** : Tailwind CSS 4
- **Langage** : TypeScript
- **Package manager** : pnpm
- **Déploiement** : Serveur Ubuntu 24.04 + nginx (repo GitHub)
- **CFP/Programme** : Pretalx (API REST → affichage custom)

## Structure du projet

```
/
├── public/
│   └── static/
│       ├── img/
│       │   └── logo-capitoledulibre.svg
│       ├── photos/          # Galerie éditions passées
│       └── videos/          # Teaser
├── src/
│   ├── components/
│   │   ├── layout/          # Header, Footer, Nav
│   │   ├── home/            # Hero, Stats, Timeline, Parcours
│   │   ├── schedule/        # Programme (pretalx)
│   │   ├── venue/           # Plan, infos pratiques
│   │   └── ui/              # Boutons, cartes, badges
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── programme.astro
│   │   ├── lieu.astro
│   │   ├── village-associatif.astro
│   │   ├── install-party.astro
│   │   ├── lan-party.astro
│   │   ├── initiation-code.astro
│   │   ├── partenaires.astro
│   │   ├── equipe.astro
│   │   ├── faq.astro
│   │   └── blog/
│   │       ├── index.astro
│   │       └── [slug].astro
│   ├── config.ts              # Configuration édition (dates, slug pretalx...)
│   ├── content/
│   │   ├── blog/            # Articles MDX
│   │   ├── faq/             # Questions/réponses
│   │   ├── team/            # Membres équipe
│   │   └── partners/        # Partenaires par niveau
│   ├── lib/
│   │   └── pretalx.ts       # Client API Pretalx
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## Configuration édition

```typescript
// src/config.ts
export const config = {
  edition: {
    year: 2026,
    dates: {
      start: new Date('2026-11-14'),
      end: new Date('2026-11-15'),
    },
    displayDates: '14 & 15 novembre 2026',
  },
  venue: {
    name: 'ENSEEIHT',
    address: '2 rue Charles Camichel, 31000 Toulouse',
    coordinates: { lat: 43.6024, lng: 1.4545 },
  },
  pretalx: {
    baseUrl: 'https://cfp.capitoledulibre.org/api',
    eventSlug: 'cdl-2026',
  },
  tickets: {
    url: 'https://tickets.capitoledulibre.org/cdl/2026/',
  },
  links: {
    photos: 'https://photos.capitoledulibre.org',
    videos: 'https://videos.capitoledulibre.org',
    toulibre: 'https://toulibre.org',
  },
  stats: {
    visitors: 1400,
    conferences: 100,
    workshops: 20,
    stands: 30,
  },
} as const;
```

## Charte graphique

### Couleurs

```css
:root {
  /* Principales (orange) */
  --cdl-orange: #d03d00;
  --cdl-orange-light: #ff6b35;
  --cdl-orange-dark: #a33000;

  /* Secondaires */
  --cdl-blue: #1a365d;
  --cdl-blue-light: #2c5282;
  --cdl-gold: #f6ad55;

  /* Neutres */
  --cdl-gray: #4a5568;
  --cdl-gray-light: #e2e8f0;
  --cdl-bg: #fafafa;
}
```

### Tailwind config

```javascript
// tailwind.config.mjs
export default {
  theme: {
    extend: {
      colors: {
        cdl: {
          orange: '#d03d00',
          'orange-light': '#ff6b35',
          'orange-dark': '#a33000',
          blue: '#1a365d',
          'blue-light': '#2c5282',
          gold: '#f6ad55',
        }
      },
      fontFamily: {
        sans: ['Ubuntu', 'system-ui', 'sans-serif'],
        mono: ['Ubuntu Mono', 'monospace'],
      }
    }
  }
}
```

### Typographie

- **Titres, nav, CTA** : Ubuntu (400, 500, 700)
- **Code** : Ubuntu Mono
- Source : Google Fonts

## Pages

### Accueil (`/`)
- Hero avec date, lieu, tagline, CTA inscription
- Stats animées (1400 visiteurs, 100+ conférences, 30 stands, 20+ ateliers)
- Section "C'est pour qui ?" avec parcours suggérés
- Timeline journée type
- Galerie photos éditions passées
- Teaser vidéo (embed YouTube/PeerTube)
- Aperçu partenaires (logos)

### Programme (`/programme`)
- Fetch API Pretalx : `https://cfp.capitoledulibre.org/api/`
- Filtres : jour, track, type (conférence/atelier)
- Vue grille horaire ou liste
- Lien vers détail session sur Pretalx

### Lieu (`/lieu`)
- Infos ENSEEIHT (adresse, transports)
- Plan interactif du site (salles, village associatif, food trucks, install party)
- Infos pratiques : accessibilité PMR, wifi, vestiaire, parking vélo
- Carte OpenStreetMap

### Village associatif (`/village-associatif`)
- Présentation du concept (associations du libre, communautés)
- Liste des stands avec descriptions
- Plan d'implantation
- CTA pour proposer un stand

### Install Party (`/install-party`)
- Présentation de l'atelier permanent d'installation Linux
- Ce qu'on peut y faire (installer Linux, résoudre des problèmes, poser des questions)
- Conseils pour venir préparé (sauvegarder ses données, etc.)
- Horaires et emplacement

### LAN Party (`/lan-party`)
- Présentation de l'événement gaming libre
- Liste des jeux proposés (jeux libres)
- Comment participer (apporter son PC, inscription...)
- Horaires et emplacement

### Initiation au code (`/initiation-code`)
- Présentation de l'atelier pour débutants
- Public cible (enfants, adultes, aucun prérequis)
- Ce qu'on y apprend
- Horaires et emplacement

### Partenaires (`/partenaires`)
- Niveaux : Platine, Or, Argent, Bronze
- Logos + liens
- CTA "Devenir partenaire" + PDF dossier

### Équipe (`/equipe`)
- Membres de l'équipe d'organisation
- Lien vers Toulibre

### FAQ (`/faq`)
- Questions fréquentes (accordéon)
- Catégories : Pratique, Programme, Accessibilité

### Blog (`/blog`)
- Articles MDX
- Annonces, récaps, interviews speakers

## Intégration Pretalx

API endpoint : `https://cfp.capitoledulibre.org/api/`

```typescript
// src/lib/pretalx.ts
import { config } from '../config';

const { baseUrl, eventSlug } = config.pretalx;

export async function getSchedule() {
  const res = await fetch(`${baseUrl}/events/${eventSlug}/schedules/latest/`);
  return res.json();
}

export async function getSpeakers() {
  const res = await fetch(`${baseUrl}/events/${eventSlug}/speakers/`);
  return res.json();
}

export async function getTalks() {
  const res = await fetch(`${baseUrl}/events/${eventSlug}/talks/`);
  return res.json();
}
```

## Contenus collections (Astro Content Collections)

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    author: z.string(),
    excerpt: z.string(),
    image: z.string().optional(),
  }),
});

const team = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    photo: z.string().optional(),
    social: z.object({
      mastodon: z.string().optional(),
      github: z.string().optional(),
    }).optional(),
  }),
});

const partners = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    level: z.enum(['platine', 'or', 'argent', 'bronze', 'technique', 'institutionnel']),
    logo: z.string(),
    url: z.string(),
  }),
});

const faq = defineCollection({
  type: 'content',
  schema: z.object({
    question: z.string(),
    category: z.enum(['pratique', 'programme', 'accessibilite']),
    order: z.number(),
  }),
});

export const collections = { blog, team, partners, faq };
```

## Commandes

```bash
pnpm install          # Installer dépendances
pnpm dev              # Serveur dev (localhost:4321)
pnpm build            # Build production → dist/
pnpm preview          # Preview build local
```

## Conventions de code

- Composants Astro en PascalCase : `HeroSection.astro`
- Fichiers utilitaires en camelCase : `pretalx.ts`
- Classes Tailwind : ordre logique (layout → spacing → typography → colors → effects)
- Pas de CSS custom sauf variables globales
- Images optimisées via `astro:assets`
- Accessibilité : landmarks ARIA, alt text, focus visible, contraste AA

## Ressources externes

- Site actuel : https://capitoledulibre.org
- Pretalx CFP : https://cfp.capitoledulibre.org
- Billetterie : https://tickets.capitoledulibre.org
- Photos : https://photos.capitoledulibre.org
- Vidéos : https://videos.capitoledulibre.org
- Association Toulibre : https://toulibre.org

