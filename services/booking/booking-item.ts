import {
  BookingRequestProps,
  BookingRouteItemRequestProps,
  BookingStatusRequest,
  PaymentStatusRequest,
} from './booking-request';
import {
  BookingResponseProps,
  BookingStatusResponse,
  BookingTripsResponseProps,
  PaymentStatusResponse,
} from './booking-response';
const convertSeats = async (seats: BookingTripsResponseProps['seats']) => {
  const _seats: BookingRequestProps['seats'] = [];
  for (const seat of seats ?? []) {
    _seats.push({
      id: seat.id ?? '',
      seatNumber: seat.seatNumber ?? '',
      tripId: seat?.tripId ?? '',
      bookingTripId: seat.bookingTripId ?? '',
      seatType: seat.type ?? undefined,
      status: seat.status ?? undefined,
    });
  }
  return _seats;
};
export const mapPaymentStatus = (
  status?: PaymentStatusResponse,
): PaymentStatusRequest => {
  switch (status) {
    case PaymentStatusResponse.PENDING:
      return PaymentStatusRequest.PENDING;
    case PaymentStatusResponse.COMPLETED:
      return PaymentStatusRequest.COMPLETED;
    default:
      return PaymentStatusRequest.PENDING; // fallback
  }
};
export const mapBookingStatus = (
  status?: BookingStatusResponse,
): BookingStatusRequest => {
  switch (status) {
    case BookingStatusResponse.PENDING:
      return BookingStatusRequest.PENDING;
    case BookingStatusResponse.CONFIRMED:
      return BookingStatusRequest.CONFIRMED;
    case BookingStatusResponse.CANCELLED:
      return BookingStatusRequest.CANCELLED;
    default:
      return BookingStatusRequest.PENDING;
  }
};
export const convertBookingItem = async (
  booking: BookingResponseProps,
): Promise<BookingRequestProps> => {
  let arrivalTime: string = '';
  let departureTime: string = '';
  let vehicleId: string = '';
  let vehicleDescription: string | undefined = undefined;
  let vehicleName: string | undefined = undefined;
  let vehiclePlateNumber: string | undefined = undefined;
  let vehicleImage: string | undefined = undefined;
  let vehicleCapacity: number = 0;
  let route: BookingRouteItemRequestProps = {
    id: '',
    name: undefined,
    code: undefined,
    sourceProvince: undefined,
    destinationProvince: undefined,
  };
  let tripId: string = '';
  if (booking.bookingTrips && booking.bookingTrips.length > 0) {
    let bookingTrip = booking.bookingTrips[0];
    arrivalTime = bookingTrip.trip?.arrivalTime ?? '';
    departureTime = bookingTrip.trip?.departureTime ?? '';
    vehicleId = bookingTrip.trip?.vehicleId ?? '';
    vehicleDescription = bookingTrip.trip?.vehicle?.vehicleType?.description;
    vehicleName = bookingTrip.trip?.vehicle?.vehicleType?.name;
    vehiclePlateNumber = bookingTrip.trip?.vehicle?.plateNumber;
    vehicleImage = bookingTrip.trip?.imageUrl;
    vehicleCapacity = bookingTrip.trip?.capacity ?? 0;
    tripId = bookingTrip.trip?.id ?? '';
    if (bookingTrip.trip?.route) {
      let bookingTripRoute = bookingTrip.trip.route;
      route = {
        id: bookingTripRoute.id ?? '',
        code: bookingTripRoute.code ?? undefined,
        destinationProvince: {
          id: bookingTripRoute.destinationProvince?.id ?? '',
          name: bookingTripRoute.destinationProvince?.name ?? undefined,
        },
        name: bookingTripRoute.name ?? '',
        sourceProvince: {
          id: bookingTripRoute.sourceProvince?.id ?? '',
          name: bookingTripRoute.sourceProvince?.name ?? undefined,
        },
      };
    }
  }

  return {
    id: booking.id,
    tripId: tripId,
    arrivalTime: arrivalTime,
    departureTime: departureTime,
    passengerEmail: booking?.passengerEmail ?? '',
    passengerName: booking?.passengerName ?? '',
    passengerPhone: booking?.passengerPhone ?? '',
    passengerNote: booking?.passengerNote ?? undefined,
    totalPrice: booking?.totalPrice ?? '',
    finalPrice: booking?.finalPrice ?? '',
    userId: booking?.userId ?? undefined,
    seats: (await convertSeats(booking.bookingTrips![0]?.seats ?? [])) ?? [],
    dropingPoint: {
      name: booking?.dropoff?.name ?? undefined,
      address: booking?.dropoff?.address ?? undefined,
      ward: booking?.dropoff?.ward ?? undefined,
      district: booking?.dropoff?.district ?? undefined,
      province: booking?.dropoff?.province ?? undefined,
    },
    pickupPoint: {
      name: booking?.pickup?.name ?? undefined,
      address: booking?.pickup?.address ?? undefined,
      ward: booking?.pickup?.ward ?? undefined,
      district: booking?.pickup?.district ?? undefined,
      province: booking?.pickup?.province ?? undefined,
    },
    paymentStatus: mapPaymentStatus(booking.paymentStatus),
    status: mapBookingStatus(booking.status),
    vehicle: {
      // TODO: ADD CAPACITY
      vehicleId: vehicleId,
      vehicleDescription: vehicleDescription,
      vehicleImage: vehicleImage,
      vehicleName: vehicleName,
      vehiclePlateNumber: vehiclePlateNumber,
      vehicleCapacity: vehicleCapacity,
    },
    route: route,
    updatedAt: booking.updatedAt,
  };
};
