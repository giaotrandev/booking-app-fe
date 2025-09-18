import {
  BookingHistoryRequestProps,
  BookingHistoryStatusRequest,
} from './booking-history-request';
import {
  BookingHistoryResponseProps,
  BookingHistoryStatusResponse,
} from './booking-history-response';
export const mapStatus = (
  status?: BookingHistoryStatusResponse,
): BookingHistoryStatusRequest => {
  switch (status) {
    case BookingHistoryStatusResponse.PENDING:
      return BookingHistoryStatusRequest.PENDING;
    case BookingHistoryStatusResponse.CONFIRMED:
      return BookingHistoryStatusRequest.CONFIRMED;
    case BookingHistoryStatusResponse.CANCELLED:
      return BookingHistoryStatusRequest.CANCELLED;
    default:
      return BookingHistoryStatusRequest.PENDING;
  }
};
export const convertBookingHistoryItem = (
  bookingHistory: BookingHistoryResponseProps,
): BookingHistoryRequestProps => {
  return {
    id: bookingHistory.id,
    createdAt: bookingHistory.createdAt,
    discountAmount: bookingHistory.discountAmount ?? undefined,
    finalPrice: bookingHistory.finalPrice ?? undefined,
    route: {
      to: bookingHistory.route?.to ?? undefined,
      from: bookingHistory.route?.from ?? undefined,
      departureTime: bookingHistory.route?.departureTime ?? undefined,
    },
    seatNumbers: bookingHistory.seatNumbers?.map(item => item),
    status: mapStatus(bookingHistory.status),
    totalPrice: bookingHistory.totalPrice ?? undefined,
    totalSeats: bookingHistory.totalSeats ?? undefined,
  };
};
