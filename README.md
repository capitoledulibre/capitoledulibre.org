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

# Les deux d'un coup
pnpm optimize
```

## Stack technique

- **[Astro 5](https://astro.build)** — Site statique
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

## Signaler un problème

Si vous trouvez un bug ou souhaitez proposer une amélioration :

- **Bug** : [ouvrir une issue](https://github.com/capitoledulibre/capitoledulibre.org/issues/new)
- **Suggestion** : [ouvrir une issue](https://github.com/capitoledulibre/capitoledulibre.org/issues/new)
- **Correction** : les pull requests sont les bienvenues !

## Licence

Contenu sous licence [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
