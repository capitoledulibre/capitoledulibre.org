export interface RoomInfo {
  name: string;
  building: string;
  buildingLetter: string;
  floor: number;
  floorLabel: string;
  directions: string;
  color: string;
}

const SPECIAL_ROOMS: Record<string, Partial<RoomInfo>> = {
  'B00': { building: 'Bâtiment B', buildingLetter: 'B', floor: 0, floorLabel: 'Rez-de-chaussée', directions: 'Amphi B00, entrée principale du bâtiment B.' },
  'Hall C': { building: 'Bâtiment C', buildingLetter: 'C', floor: 0, floorLabel: 'Rez-de-chaussée', directions: 'Hall d\'accueil et village associatif.' },
  'B006-B007': { building: 'Bâtiment B', buildingLetter: 'B', floor: 0, floorLabel: 'Rez-de-chaussée', directions: 'Salles B006 et B007, au fond du rez-de-chaussée du bâtiment B.' },
};

const BUILDING_COLORS: Record<string, string> = {
  A: '#d03d00',
  B: '#1a365d',
  C: '#2c5282',
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
      directions: special.directions!,
      color: BUILDING_COLORS[special.buildingLetter!] || '#4a5568',
    };
  }

  // Convention: [Letter][Floor digit][Room digits] e.g. A203 = Bâtiment A, 2e étage, salle 03
  const match = name.match(/^([A-C])(\d)(\d{2})$/);
  if (!match) return null;

  const [, letter, floorStr, roomNum] = match;
  const floor = parseInt(floorStr, 10);

  return {
    name,
    building: `Bâtiment ${letter}`,
    buildingLetter: letter,
    floor,
    floorLabel: FLOOR_LABELS[floor] || `${floor}e étage`,
    directions: `${FLOOR_LABELS[floor] || `${floor}e étage`} du bâtiment ${letter}, salle ${roomNum}.`,
    color: BUILDING_COLORS[letter] || '#4a5568',
  };
}

export function getRoomSummary(name: string): string {
  const info = parseRoom(name);
  if (!info) return name;
  return `${info.building} · ${info.floorLabel}`;
}
