export interface RoomInfo {
  name: string;
  building: string;
  buildingLetter: string;
  floor: number;
  floorLabel: string;
  /** One-line location, as signposted on site: "Bâtiment A — 3e étage — Salle A302". */
  label: string;
  /** Extra guidance for rooms the label alone does not locate; empty otherwise. */
  directions: string;
  color: string;
}

const SPECIAL_ROOMS: Record<string, Partial<RoomInfo>> = {
  'B00': { building: 'Bâtiment B', buildingLetter: 'B', floor: 0, floorLabel: 'Rez-de-chaussée', label: 'Bâtiment B — Rez-de-chaussée — Amphi B00', directions: 'Entrée principale du bâtiment B.' },
  'Hall C': { building: 'Bâtiment C', buildingLetter: 'C', floor: 0, floorLabel: 'Rez-de-chaussée', label: 'Bâtiment C — Rez-de-chaussée — Hall C', directions: 'Hall d\'accueil, buvette et village associatif.' },
  'B006-B007': { building: 'Bâtiment B', buildingLetter: 'B', floor: 0, floorLabel: 'Rez-de-chaussée', label: 'Bâtiment B — Rez-de-chaussée — Salles B006 et B007', directions: 'Au fond du rez-de-chaussée du bâtiment B.' },
};

// Keep in sync with the building colours in CampusPlan.astro.
const BUILDING_COLORS: Record<string, string> = {
  A: '#6ca939',
  B: '#d03d00',
  C: '#957e7e',
};

const FLOOR_LABELS: Record<number, string> = {
  0: 'Rez-de-chaussée',
  1: '1er étage',
  2: '2e étage',
  3: '3e étage',
};

export function parseRoom(name: string): RoomInfo | null {
  if (!name) return null;

  // Special rooms
  if (SPECIAL_ROOMS[name]) {
    const special = SPECIAL_ROOMS[name];
    return {
      name,
      building: special.building!,
      buildingLetter: special.buildingLetter!,
      floor: special.floor!,
      floorLabel: special.floorLabel!,
      label: special.label!,
      directions: special.directions ?? '',
      color: BUILDING_COLORS[special.buildingLetter!] || '#4a5568',
    };
  }

  // Convention: [Letter][Floor digit][Room digits] e.g. A203 = Bâtiment A, 2e étage, salle A203
  const match = name.match(/^([A-C])(\d)(\d{2})$/);
  if (!match) return null;

  const [, letter, floorStr] = match;
  const floor = parseInt(floorStr, 10);
  const floorLabel = FLOOR_LABELS[floor] || `${floor}e étage`;

  return {
    name,
    building: `Bâtiment ${letter}`,
    buildingLetter: letter,
    floor,
    floorLabel,
    // Rooms are signposted by their full code, so spelling out "salle 02" only
    // invents a name nobody will read on a door.
    label: `Bâtiment ${letter} — ${floorLabel} — Salle ${name}`,
    directions: '',
    color: BUILDING_COLORS[letter] || '#4a5568',
  };
}

export function getRoomSummary(name: string): string {
  const info = parseRoom(name);
  if (!info) return name;
  return `${info.building} · ${info.floorLabel}`;
}
