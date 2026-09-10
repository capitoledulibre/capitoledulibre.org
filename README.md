<p align="center">
  <img src="public/static/img/logo-capitoledulibre-horizontal.svg" alt="Capitole du Libre" width="400" />
</p>

<h1 align="center">Capitole du Libre 2026</h1>

<p align="center">Site web officiel du <strong>Capitole du Libre</strong>, l'événement du Logiciel Libre en Occitanie.</p>

**14 & 15 novembre 2026** — ENSEEIHT, Toulouse

Le Capitole du Libre rassemble chaque année ~1 400 visiteurs pour un week-end de conférences, ateliers, village associatif, install party et LAN party autour du logiciel libre. Organisé par l'association [Toulibre](https://toulibre.org).

## Quickstart

```bash
# Prérequis : Node.js >= 22, pnpm

# Installer les dépendances
pnpm install

# Lancer le serveur de développement
pnpm dev
# → http://localhost:4321

# Build production
pnpm build

# Preview du build
pnpm preview
```

## Optimisation des assets

```bash
# Convertir les images en AVIF + WebP (nécessite sharp)
pnpm images

# Convertir les vidéos en WebM/VP9 + MP4 720p (nécessite ffmpeg)
pnpm videos

# Enregistrer les dimensions des images (width/height, anti-CLS)
pnpm images:manifest

# Régénérer la carte de partage social + les images Event schema.org
pnpm og

# Images, vidéos et manifeste d'un coup
pnpm optimize
```

## Stack technique

- **[Astro 7](https://astro.build)** — Site statique
- **[Tailwind CSS 4](https://tailwindcss.com)** — Styles
- **TypeScript**
- **[Pretalx](https://cfp.capitoledulibre.org)** — Programme (API REST)

## Structure du projet

```
src/
├── components/       # Composants Astro
│   ├── home/         # Sections de la page d'accueil
│   ├── layout/       # Header, Footer
│   └── ui/           # Composants réutilisables (Picture, VideoPlayer, Lightbox...)
├── content/          # Contenu (blog, FAQ, photos.yaml)
├── layouts/          # BaseLayout
├── lib/              # Helpers (pretalx, photos, rooms, jsonld)
├── pages/            # Pages du site
└── styles/           # CSS global
public/
├── static/img/       # Images et logos
├── static/videos/    # Vidéos
├── favicon.svg
├── robots.txt
├── humans.txt
└── llms.txt
```

## Configuration

La configuration de l'édition est centralisée dans `src/config.ts` : dates, lieu, slug Pretalx, liens, réseaux sociaux, stats.

Pour passer à une nouvelle édition, modifier ce fichier et mettre à jour le contenu des collections.

## SEO notes

<!-- Written in English per the repo-wide documentation language rule. -->

**Canonical origin.** `site` in `astro.config.mjs` reads `SITE_URL`, defaulting to
the apex domain. When this edition is archived under its own hostname, rebuild
with the override so canonical URLs, `og:url`, the sitemap and every JSON-LD
`@id` stay self-consistent instead of pointing at whatever edition then owns the
apex:

```bash
SITE_URL=https://2026.capitoledulibre.org pnpm build
```

**Structured data.** `src/lib/jsonld.ts` emits one connected graph. `BaseLayout`
declares the site-wide entities (`WebSite`, the two `Organization`s, the venue
`Place`) once, and page-level nodes reference them by `@id`. Never hardcode the
domain in a node — derive it from `SITE_URL`.

**Programme schedule.** `/programme` only emits the edition `Event` with its
`subEvent` sessions once `config.pretalx.eventSlug` matches the configured
edition year. While the page falls back to the previous edition's programme, it
deliberately publishes no schedule markup: describing last year's talks as this
year's schedule would be false structured data.

**Social card.** `og:image` is a committed 1200x630 card, regenerated with
`pnpm og` (needs the Ubuntu font installed system-wide). Re-run it after
changing the edition dates or venue in `src/config.ts`.

**Rendered markdown.** Talk abstracts, blog posts, the FAQ and the code of
conduct are styled with `prose` (`@tailwindcss/typography`, registered in
`src/styles/global.css`, with its colour variables pointed at the CDL tokens so
it follows dark mode). Don't hand-roll paragraph spacing on markdown output.

**Image dimensions.** `Picture.astro` and the raw `<img>` tags take their
`width`/`height` from `src/content/image-dimensions.json`. Run
`pnpm images:manifest` after adding or replacing an image, otherwise the new file
ships without dimensions.

**Trailing slashes.** `trailingSlash: 'always'`. Internal links must include the
trailing slash — without it nginx 301-redirects every click.

**HTTP caching (nginx, not in this repo).** Production currently sends no
`Cache-Control` at all, so every visit revalidates with a conditional request
even though `/_astro/` filenames are content-hashed and therefore immutable.
Merge into the server block — keep whatever `try_files` the `location /` already
has, and note that a nested `add_header` replaces the inherited set rather than
adding to it:

```nginx
# Content-hashed build output: the filename changes when the bytes change.
location /_astro/ {
    add_header Cache-Control "public, max-age=31536000, immutable";
}

# Committed media. Not content-hashed, so keep the window short enough that
# replacing a file under the same name is picked up reasonably fast.
location /static/ {
    add_header Cache-Control "public, max-age=604800";
}

# HTML, robots.txt, sitemap, RSS: must revalidate so a deploy takes effect now.
location / {
    add_header Cache-Control "public, max-age=0, must-revalidate";
}
```

**Pending infrastructure item.** `www.capitoledulibre.org` does not resolve
(NXDOMAIN), so anyone typing `www` gets a browser error and any inbound link
using it is dead. Add the DNS record and a redirect to the apex:

```nginx
server {
    server_name www.capitoledulibre.org;
    return 301 https://capitoledulibre.org$request_uri;
}
```

## Signaler un problème

Si vous trouvez un bug ou souhaitez proposer une amélioration :

- **Bug** : [ouvrir une issue](https://github.com/capitoledulibre/capitoledulibre.org/issues/new)
- **Suggestion** : [ouvrir une issue](https://github.com/capitoledulibre/capitoledulibre.org/issues/new)
- **Correction** : les pull requests sont les bienvenues !

## Licence

Contenu sous licence [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
