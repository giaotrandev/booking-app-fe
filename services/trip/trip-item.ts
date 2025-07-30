import {
  DeckRequest,
  OptionItemProps,
  RowRequest,
  SeatRequestProps,
  SeatStatus,
  SeatType,
  TripsRequestProps,
} from './trips-request';
import {
  DeckResponse,
  PickUpPointResponseProps,
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
// export const convertBusStopPoint = async (
//   pickUpPoint: PickUpPointResponseProps,
// ): Promise<PickUpPointRequestProps> => {
//   return {
//     busStopId: pickUpPoint.busStopId ?? undefined,
//     districtName: pickUpPoint.districtName ?? undefined,
//     name: pickUpPoint.name ?? undefined,
//     provinceId: pickUpPoint.provinceId ?? undefined,
//     provinceName: pickUpPoint.provinceName ?? undefined,
//     stopOrder: pickUpPoint.stopOrder ?? undefined,
//     wardName: pickUpPoint.wardName ?? undefined,
//   };
// };

// export const convertPickUpPoints = async (
//   pickUpPoints: PickUpPointResponseProps[],
// ) => {
//   const _pickUpPoints: PickUpPointRequestProps[] = [];
//   for (const pickupPoint of pickUpPoints ?? []) {
//     if (!pickupPoint) continue;
//     _pickUpPoints.push(await convertBusStopPoint(pickupPoint));
//   }
//   return _pickUpPoints;
// };
// const convertBusStopItem = async (
//   pickUpPoint: PickUpPointResponseProps,
// ): Promise<OptionItemProps> => {
//   const addressParts = [
//     pickUpPoint.streetName,
//     pickUpPoint.wardName,
//     pickUpPoint.districtName,
//     pickUpPoint.provinceName,
//   ].filter(Boolean);

//   return {
//     id: pickUpPoint.busStopId ?? '',
//     locationName: pickUpPoint.name ?? undefined,
//     address: addressParts.join(', ') ?? undefined,
//     time: pickUpPoint.time ?? undefined,
//   };
// };

const convertBusStopList = async (
  pickUpPointList: PickUpPointResponseProps[],
) => {
  const _busStopList: OptionItemProps[] = [];
  for (const point of pickUpPointList ?? []) {
    if (!point) continue;
    const addressParts = [
      point.address,
      point.wardName,
      point.districtName,
      point.provinceName,
    ].filter(Boolean);
    _busStopList.push({
      id: point.busStopId ?? '',
      locationName: point.name ?? undefined,
      address: addressParts.join(', ') ?? undefined,
      time: point.estimatedTime ?? undefined,
    });
  }
  return _busStopList;
};
export const convertTripItem = async (
  trip: TripResponseProps,
): Promise<TripsRequestProps> => {
  return {
    id: trip.id,
    name: trip.vehicle?.vehicleType?.name ?? undefined,
    arrivalTime: trip.arrivalTime ?? undefined,
    departureTime: trip.departureTime ?? undefined,
    price: trip.basePrice ?? undefined,
    numberOfSeats: trip.availableSeats ?? undefined,
    arrivalDestination: trip.route?.sourceProvince?.name ?? undefined,
    departureDestination: trip.route?.destinationProvince?.name ?? undefined,
    image: trip.imageUrl ?? undefined,
    description: trip.vehicle?.vehicleType?.description ?? undefined,
    totalSeats: trip._count?.seats ?? undefined,
    seatsLeft: trip.availableSeats ?? undefined,
    decks:
      (await convertDecks(
        trip.vehicle?.vehicleType?.seatConfiguration?.decks ?? [],
      )) ?? undefined,
    seats: (await convertSeats(trip.seats ?? [])) ?? [],
    dropingList: await convertBusStopList(
      trip.route?.routeStops?.dropoffPoints ?? [],
    ),
    pickingList: await convertBusStopList(
      trip.route?.routeStops?.pickupPoints ?? [],
    ),
  };
};
