import {
  DeckRequest,
  RowRequest,
  SeatRequestProps,
  SeatStatus,
  SeatType,
} from './trips-request';
import {
  DeckResponse,
  RowResponse,
  SeatResponse,
  TripResponseProps,
} from './trips-response';

const isValidSeatStatus = (status: any): status is SeatStatus => {
  return Object.values(SeatStatus).includes(status);
};

// Check hợp lệ cho SeatType
const isValidSeatType = (type: any): type is SeatType => {
  return Object.values(SeatType).includes(type);
};

export const convertSeats = async (seats: SeatResponse[]) => {
  const _seats: SeatRequestProps[] = [];
  for (const seat of seats ?? []) {
    if (!seat) continue;
    _seats.push({
      id: seat.id,
      bookingTripId: seat.bookingTripId ?? undefined,
      number: seat.number ?? undefined,
      seatNumber: seat.seatNumber ?? undefined,
      exists: seat.exists ?? undefined,
      position: seat.position ?? undefined,
      status: seat.status ?? undefined,
      type: seat.type ?? undefined,
      seatType: seat.seatType ?? undefined,
      x: seat.x ?? undefined,
      y: seat.y ?? undefined,
    });
  }
  return _seats;
};

export const convertRows = async (rows: RowResponse[]) => {
  const _rows: RowRequest[] = [];
  for (const row of rows ?? []) {
    if (!row) continue;
    _rows.push({
      rowId: row.rowId ?? undefined,
      seats: (await convertSeats(row.seats ?? [])) ?? [],
    });
  }
  return _rows;
};

export const convertDecks = async (decks: DeckResponse[]) => {
  const _decks: DeckRequest[] = [];
  for (const deck of decks ?? []) {
    if (!deck) continue;
    _decks.push({
      deckId: deck.deckId ?? undefined,
      name: deck.name ?? undefined,
      rows: (await convertRows(deck.rows ?? [])) ?? undefined,
    });
  }
  return _decks;
};

export const convertTripItem = async (trip: TripResponseProps) => {
  return {
    id: trip.id,
    name: trip.vehicle?.vehicleType?.name ?? undefined,
    arrivalTime: trip.arrivalTime ?? undefined,
    departureTime: trip.departureTime ?? undefined,
    // price: trip.basePrice?.toString() ?? undefined,
    price: trip.basePrice ?? undefined,
    numberOfSeats: trip.availableSeats ?? undefined,
    arrivalDestination: trip.route?.sourceProvince?.name ?? undefined,
    departureDestination: trip.route?.destinationProvince?.name ?? undefined,
    image: trip.imageUrl ?? undefined,
    description: trip.vehicle?.vehicleType?.description ?? undefined,
    //  TODO: fix seatsLeft
    totalSeats: trip._count?.seats ?? undefined,
    seatsLeft: trip.availableSeats ?? undefined,
    decks:
      (await convertDecks(
        trip.vehicle?.vehicleType?.seatConfiguration?.decks ?? [],
      )) ?? undefined,
    seats: (await convertSeats(trip.seats ?? [])) ?? [],
  };
};
