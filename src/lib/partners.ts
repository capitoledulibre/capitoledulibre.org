import { getCollection, type CollectionEntry } from 'astro:content';

export type Partner = CollectionEntry<'partners'>['data'];

/**
 * Sponsor tiers, richest first. `technique` and `institutionnel` are partners
 * too, but they are not sponsors and are listed separately on /partenaires.
 */
export const SPONSOR_TIERS = [
  { key: 'platine', label: 'Platine' },
  { key: 'or', label: 'Or' },
  { key: 'argent', label: 'Argent' },
  { key: 'bronze', label: 'Bronze' },
] as const;

export type SponsorTier = (typeof SPONSOR_TIERS)[number]['key'];

export interface SponsorGroup {
  key: SponsorTier;
  label: string;
  partners: Partner[];
}

/**
 * Sponsors grouped by tier, richest first, alphabetical within a tier; tiers
 * with no sponsor are dropped so callers never render an empty heading or row.
 */
export async function getSponsorGroups(): Promise<SponsorGroup[]> {
  const all = (await getCollection('partners')).map((entry) => entry.data);
  return SPONSOR_TIERS.map((tier) => ({
    ...tier,
    partners: all
      .filter((partner) => partner.level === tier.key)
      .sort((a, b) => a.name.localeCompare(b.name, 'fr')),
  })).filter((tier) => tier.partners.length > 0);
}

/** Partners who provide services, hardware or expertise rather than money. */
export async function getTechnicalPartners(): Promise<Partner[]> {
  const all = (await getCollection('partners')).map((entry) => entry.data);
  return all.filter((partner) => partner.level === 'technique' || partner.level === 'institutionnel');
}
