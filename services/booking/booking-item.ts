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
const convertSeats = (
  seats: BookingTripsResponseProps['seats'],
): BookingRequestProps['seats'] => {
  if (!(Array.isArray(seats) && seats.length > 0)) return [];
  return seats.map(seat => ({
    id: seat.id ?? '',
    seatNumber: seat.seatNumber ?? '',
    tripId: seat.tripId ?? '',
    bookingTripId: seat.bookingTripId ?? '',
    seatType: seat.type ?? undefined,
    status: seat.status ?? undefined,
  }));
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
export const convertBookingItem = (
  booking: BookingResponseProps,
): BookingRequestProps => {
  const firstTrip = booking.bookingTrips?.[0]; // 👈 an toàn hơn

  const arrivalTime = firstTrip?.trip?.arrivalTime ?? '';
  const departureTime = firstTrip?.trip?.departureTime ?? '';
  const tripId = firstTrip?.trip?.id ?? '';

  const vehicle = {
    vehicleId: firstTrip?.trip?.vehicleId ?? '',
    vehicleDescription: firstTrip?.trip?.vehicle?.vehicleType?.description,
    vehicleName: firstTrip?.trip?.vehicle?.vehicleType?.name,
    vehiclePlateNumber: firstTrip?.trip?.vehicle?.plateNumber,
    vehicleImage: firstTrip?.trip?.imageUrl,
    vehicleCapacity: firstTrip?.trip?.capacity ?? 0,
  };

  const route: BookingRouteItemRequestProps | undefined = firstTrip?.trip?.route
    ? {
        id: firstTrip.trip.route.id ?? '',
        code: firstTrip.trip.route.code ?? undefined,
        name: firstTrip.trip.route.name ?? '',
        sourceProvince: firstTrip.trip.route.sourceProvince && {
          id: firstTrip.trip.route.sourceProvince.id ?? '',
          name: firstTrip.trip.route.sourceProvince.name ?? undefined,
        },
        destinationProvince: firstTrip.trip.route.destinationProvince && {
          id: firstTrip.trip.route.destinationProvince.id ?? '',
          name: firstTrip.trip.route.destinationProvince.name ?? undefined,
        },
      }
    : undefined;

  return {
    id: booking.id,
    tripId,
    arrivalTime,
    departureTime,
    passengerEmail: booking?.passengerEmail ?? '',
    passengerName: booking?.passengerName ?? '',
    passengerPhone: booking?.passengerPhone ?? '',
    passengerNote: booking?.passengerNote ?? undefined,
    totalPrice: booking.totalPrice + '',
    finalPrice: booking.finalPrice + '',
    basePrice: firstTrip?.trip?.basePrice + '',
    totalSeats:
      Array.isArray(firstTrip?.seats) && firstTrip?.seats.length > 0
        ? firstTrip?.seats?.length
        : undefined,
    specialPrice: firstTrip?.trip?.specialPrice?.toString(),
    userId: booking?.userId ?? undefined,
    seats: convertSeats(firstTrip?.seats ?? []),
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
    vehicle,
    route,
    createdAt: booking?.createdAt,
    updatedAt: booking?.updatedAt,
  };
};
