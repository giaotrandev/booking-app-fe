export enum SeatType {
  DRIVER = 'DRIVER',
  PREMIUM = 'PREMIUM',
  BED = 'BED',
  STANDARD = 'STANDARD',
}
export enum SeatStatus {
  AVAILABLE = 'AVAILABLE',
  RESERVED = 'RESERVED',
  BOOKED = 'BOOKED',
  BLOCKED = 'BLOCKED',
}
export interface OptionItemProps {
  id: string;
  time?: string;
  locationName?: string;
  address?: string;
}
export interface SeatRequestProps {
  id: string;
  number?: string;
  seatNumber?: string; // detail
  exists?: boolean;
  type?: SeatType;
  seatType?: SeatType; // detail
  position?: 'window' | 'aisle' | 'middle';
  x?: number;
  y?: number;
  status?: SeatStatus;
  price?: number;
  bookingTripId?: string;
}

export interface RowRequest {
  rowId?: string;
  seats?: SeatRequestProps[];
}

export interface DeckRequest {
  deckId?: string;
  name?: string;
  rows?: RowRequest[];
}

export type SeatConfiguration = {
  decks?: DeckRequest[];
};

export interface PickUpPointRequestProps {
  busStopId?: string;
  name?: string;
  wardName?: string;
  districtName?: string;
  provinceName?: string;
  provinceId?: string;
  stopOrder?: number;
}
export interface DropOffPointRequestProps extends PickUpPointRequestProps {}
// export interface RouteStopProps {
//   pickUpPointsStop?: PickUpPointStop[];
//   dropOffPointsProps?: DropOffPointProps[];
// }

export interface TripsRequestProps {
  id: string;
  name?: string;
  arrivalTime?: string;
  departureTime?: string;
  price?: number;
  numberOfSeats?: number;
  arrivalDestination?: string;
  departureDestination?: string;
  image?: string;
  description?: string;
  totalSeats?: number;
  seatsLeft?: number;
  decks?: DeckRequest[];
  pickingList?: OptionItemProps[];
  dropingList?: OptionItemProps[];
  seats?: SeatRequestProps[];
  // pickUpPoints?: PickUpPointRequestProps[];
  // DropOffPoints?: DropOffPointRequestProps[];
}
export interface TripDetailsRequestProps extends TripsRequestProps {}
