export interface SeatProps {
  number?: string;
  exists?: boolean;
  type?: 'DRIVER' | 'PASSENGER';
  position?: 'window' | 'aisle' | 'middle';
  x?: number;
  y?: number;
  status?: 'AVAILABLE' | 'RESERVED';
  price?: string;
}

export interface Row {
  rowId: string;
  seats: SeatProps[];
}

export interface Deck {
  deckId: string;
  name: string;
  rows: Row[];
}

export type SeatConfiguration = {
  decks?: Deck[];
};
