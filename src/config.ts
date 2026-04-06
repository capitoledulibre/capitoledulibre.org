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
    eventSlug: 'cdl-2025', // TODO: changer en 'cdl-2026' quand le programme sera prêt
  },
  cfp: {
    url: 'https://cfp.capitoledulibre.org/cdl-2026/cfp',
    deadline: new Date('2026-07-20T23:59:00+02:00'),
  },
  tickets: {
    url: 'https://tickets.capitoledulibre.org/cdl/2026/',
  },
  links: {
    photos: 'https://photos.capitoledulibre.org',
    videos: 'https://videos.capitoledulibre.org',
    toulibre: 'https://toulibre.org',
    github: 'https://github.com/capitoledulibre',
  },
  social: {
    mastodon: 'https://framapiaf.org/@capitoledulibre',
    bluesky: 'https://bsky.app/profile/capitoledulibre.org',
    twitter: 'https://x.com/capitoledulibre',
    facebook: 'https://www.facebook.com/CapitoleDuLibre/',
    linkedin: 'https://linkedin.com/company/capitole-du-libre',
    instagram: 'https://instagram.com/capitoledulibre',
    email: 'contact@capitoledulibre.org',
    matrix: 'https://matrix.to/#/#general:capitoledulibre.org',
    discord: 'https://discord.gg/SzMAMPFGUq',
    hashtag: '#cdl2026',
  },
  pastEditions: [
    2025, 2024, 2023, 2022, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011,
  ].map((year) => ({
    year,
    url: `https://${year}.capitoledulibre.org`,
  })),
  stats: {
    visitors: 1400,
    conferences: 100,
    workshops: 20,
    stands: 30,
  },
} as const;
