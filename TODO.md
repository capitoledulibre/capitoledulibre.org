# TODO — Site Capitole du Libre 2026

Backlog of ideas to make the site more attractive and substantive. Group by theme, not chronology. Prioritization is indicative — re-evaluate before picking up.

## Engagement / "wow" effect on the homepage

### Hero — from static to alive
- Current state: single background photo + decorative halos (`src/components/home/HeroSection.astro`).
- Option A: subtle photo slideshow (3-4 photos, cross-fade every 6-8s, optional Ken Burns).
- Option B: muted autoplay video loop (10-15s of B-roll, no audio prompt).
- Open questions:
  - Direction: photo vs. video?
  - If video: extract a segment from `teaser.mp4`, or produce a dedicated B-roll cut without titles/audio?
  - Respect `prefers-reduced-motion` — keep a static fallback.

### Gallery — anchor with community numbers
- Add a banner near `GallerySection` summarizing the legacy:
  "Since 2009 — XX editions — XXXX libristes welcomed cumulatively".
- Needs: founding year confirmation, edition count, 1-2 striking cumulative numbers.

### Testimonials — text quotes → video grid
- Today: 2 text quotes + link to `/temoignages` (`src/components/home/TestimonialsSection.astro`).
- Proposal: 4 cards with poster image + play button → opens video in lightbox/inline.
- Source videos already exist: `/static/videos/itw-{jbkempf,isabella,khrys,sebastien}-2024`.
- Open questions:
  - Feature all 4 on the home, or keep some exclusive to `/temoignages`?
  - Need pre-generated poster frames (extract from videos if not already available).

## "Plan your visit" / first-timer guide

- Gap: existing `TimelineSection` shows *what* a day looks like, but nothing helps a first-timer *organize* their day across 100+ talks and 4-5 permanent activities. Many miss the village associatif because they saturate their schedule with talks.
- Recommended format: a dedicated `/preparer-sa-visite` (or `/premier-visiteur`) page, promoted from the homepage. Reasoning: shareable ("send this to a colleague who's hesitating"), long-lived content. Lighter alternative: enrich the FAQ and add a "First visit? A few tips →" banner on the homepage.
- Suggested content:
  - **Before the event**: register (free but mandatory), build a Pretalx shortlist (favorites + iCal export already exists), plan 2-3 fallback talks per slot in case a room fills up, plan transport (park-and-ride, metro, bike).
  - **What to bring**: backed-up laptop if attending install party / LAN party, water bottle, power bank, layered clothing, business cards / stickers to swap.
  - **On site — the classic mistake to avoid**: don't saturate your schedule — leave ~30% of slots free for the village associatif and serendipitous encounters. Arrive early Saturday for badge pickup + complimentary coffee. Go see the village exhibitors — that's where you discover living projects. Friendly atmosphere: ask "naïve" questions, it's encouraged.
  - **During breaks** (block missing today): permanent activities running in parallel — village associatif, install party, initiation au code, LAN party, sponsor booths, food trucks. Include a site-map reference (link to `/lieu`).
  - **Saturday vs. Sunday**: distinguish the two days' rhythms (cocktail/networking Saturday evening, Sunday wraps earlier). Current `TimelineSection` doesn't differentiate them.

## History page / timeline

- Dedicated page (e.g. `/histoire`) OR a timeline block on `/equipe`.
- Format: visual timeline year-by-year — milestone + anecdote + archive photo per year.
- 12+ years of history is a real differentiator vs. younger conferences — worth surfacing.
- Material to gather (Lionel mentioned this is doable without too much effort):
  - Per-year attendance numbers.
  - Key milestones (first edition, venue changes, special editions, growth inflection points).
  - 1-2 quotes from founders / historic organizers.
  - Archive photos per year.

## Campus plan — room location detail

The campus plan (`src/components/ui/CampusPlan.astro`, hand-drawn schematic
SVG) answers "which building?" well. Next step: help attendees find the
actual room, which is a vertical (floor) + in-floor-position question a
top-down plan can't express. Three approaches, by ambition:

1. **Stacked floor diagram per building** *(recommended next step)* — on
   building select, show a vertical stack (RDC → 1er → 2e → 3e); each floor
   a band with its rooms as chips, target room/floor highlighted. Conveys
   "go up to the 2nd floor" without real geometry — the floor is already
   encoded in the room code (`C101` → 1st floor). Reuses the plan's design
   language. Low cost, data already available.
2. **Per-floor 2D mini-plans (floor tabs RDC / 1er / 2e / 3e)** — each tab
   shows a schematic 2D layout with rooms positioned ~realistically +
   stairs/lifts. Best for orientation but **requires the real ENSEEIHT
   floor plans** (relative room positions); fiction without them.
3. **Isometric / exploded 3D building** — stacked floors in axonometry,
   rooms as blocks. High "wow" but hard to keep legible when small, heavy to
   author/maintain, also needs real geometry. Likely not worth it for an
   info-first site.

- **Recommendation**: ship #1 next; upgrade high-traffic buildings (B, the
  amphi) to #2 only if we obtain the ENSEEIHT floor plans.
- **Blocking dependency for #2/#3**: getting the actual floor plans. Open
  question to confirm whether they're obtainable.

## Information gaps identified in earlier audit

High-impact attendee-facing info that's missing or thin. Not all of these need pages — some are one-paragraph additions.

### High priority
- **Newsletter signup** — no way to stay informed between visits. Add capture (footer + relevant CTAs).
- **Social / networking events** — only Saturday cocktail is documented; expand: Friday informal, after-event, community meetups, speaker meet-and-greets.
- ✅ **Parking details** *(done)* — park-and-ride + metro recommendation and nearby Indigo car parks with walking times added to `/lieu` and the transport FAQ, with Tisséo/Indigo links.
- **Cloakroom / lockers / quiet rooms** — no info on bag storage or rest spaces.

### Medium priority
- **Accessibility expansion** — FAQ section is ~2 sentences. Detail LSF availability, accessible bathrooms, accessible seating, neurodivergent-friendly spaces, service animals.
- ✅ **Anti-harassment contact visibility** *(done)* — "Signalement & bienveillance" block added to `/lieu` and `/contact` linking the CoC and the `conduite@` mailbox.
- **WiFi / charging / water points** — operational day-of details absent.
- **Local Toulouse guide** — hotels covered, but no info on nearby restaurants, bars, things to do for out-of-town attendees.

### Lower priority
- **Beginner vs. expert filter on `/programme`** — help newcomers identify accessible talks.
- **Family activities beyond `/initiation-code`** — list other kid/family-friendly content if any.
- **Venue room capacity** — useful for crowd-size expectations.

## SEO follow-ups (audit of 2026-08-20)

Everything actionable from that audit is implemented except the items below,
which are blocked on facts or on infrastructure access.

### Blocked on a fact we do not have
- **`Event.offers.validFrom`** — `config.tickets.validFrom` is deliberately
  `null`. Set it to the date registration actually opened; the JSON-LD emits the
  property only once it is filled in. Guessing a date would publish a false fact,
  and a future date would mark the offer as not yet valid.
- **`/equipe` renders zero people** — `src/content/team/` is empty, which is the
  real reason the page is 245 words. Needs the actual roster (name, role,
  optional photo, optional mastodon/github) before the `Person` structured data
  it now emits has anything to describe.
- **Thin pages needing facts, not padding.** Word counts after the village
  associatif expansion: blog 178, contact 239, equipe 245, partenaires 273,
  lan-party 276, se-restaurer 288, medias 295. Each needs specific missing
  information rather than more prose:
  - `/village-associatif` — the 33 confirmed stands are now listed from
    `src/content/stands.yaml`. Still missing: a link per exhibitor (their site
    or project page), which none of the Pretalx submissions carried.
  - `/lan-party` — the confirmed game list and whether registration is required.
  - `/se-restaurer` — food truck names/menus once known; nearby options.
  - `/medias`, `/temoignages` — a sentence of context per video.
  - `/partenaires` — a line on what each partner contributes (several already
    have a `description` in the collection that the page does not surface).

### Blocked on infrastructure access
- **`www.capitoledulibre.org` is NXDOMAIN.** No DNS record at all, so typing
  `www` yields a browser error and inbound links using it are dead. Needs a DNS
  record plus the nginx 301 to the apex — snippet is in the README's SEO notes.

### Deliberately not done
- **`noindex` on `/programme` while it shows the previous edition.** Raised in
  the audit and declined. Consequence to keep in mind: Google indexes
  `/programme/` with ~2 400 words of the 2025 schedule under a title announcing
  the current edition, competing with `2025.capitoledulibre.org`. The visible
  banner explains it to humans, not to crawlers. The schedule *structured data*
  is gated and stays off until the Pretalx slug matches the edition year.

### Known residual weight
- **`/programme` is 591 KB of HTML** (down from 887 KB; 100 KB gzipped, down
  from 164 KB). What remains is the talk descriptions the modal needs, shipped
  once in a JSON island. If it needs to shrink further, fetch descriptions on
  demand from Pretalx instead of inlining them.
- **`public/static/img/img01.jpg` is 3.8 MB** (3889x2593). No longer used as
  `og:image`, but it is still the `<picture>` fallback for browsers without AVIF
  or WebP, and the lightbox's full-size target. Generating downscaled JPEG
  derivatives would remove that cliff.

## Partner assets follow-ups (2026-08-24)

- **Bootlin logo is only 240x70** (`public/static/img/partners/logo-bootlin.png`),
  the largest asset the old site had. It is shown at the platine size
  (`max-h-20` = 80px), so it is soft on high-density screens. Ask Bootlin for an
  SVG or a 2x PNG.
- **JSON-LD advertises the dark-mode logo variant.** `partnerList()` in
  `src/lib/jsonld.ts` emits `partner.logo`, which for CAn7/Net7/Photo7/TVn7 is
  the white-ink `-w` file — invisible on the white background a crawler or rich
  result assumes. The page itself now renders `logo_light ?? logo`; the
  structured data should do the same.
- **Bleemeo is listed twice** (sponsor bronze + technical partner), by choice:
  the content schema holds one level per entry. It therefore appears twice in
  the partners `ItemList`. If that becomes a problem, the schema would need a
  `levels` array instead of a single `level`.

## Explicitly ruled out (do not re-suggest)

- Public call for volunteers — staffed via ENSEEIHT student partnership, already saturated.
- Dedicated "past editions archive" page — already covered by year-chips in the footer.
