type Seat = {
  number: string;
  exists: boolean;
  type: 'DRIVER' | 'PASSENGER' | string;
  position: 'window' | 'aisle' | 'middle' | string;
  x: number;
  y: number;
  status: 'AVAILABLE' | 'RESERVED';
};

type Row = {
  rowId: string;
  seats: Seat[];
};

type Deck = {
  deckId: string;
  name: string;
  rows: Row[];
};

export type SeatConfiguration = {
  decks: Deck[];
};
