import { BookingStatusRequest } from '#/services/booking/booking-request';
import { BookingStatusResponse } from '#/services/booking/booking-response';
import { UncheckedQrCodeItemRequestProps } from './unchecked-qrcode-request';
import { UncheckedQrCodeItemResponseProps } from './unchecked-qrcode-response';
const convertStatus = (status: BookingStatusResponse): BookingStatusRequest => {
  switch (status) {
    case BookingStatusResponse.CONFIRMED:
      return BookingStatusRequest.CONFIRMED;
    case BookingStatusResponse.CANCELLED:
      return BookingStatusRequest.CANCELLED;
    case BookingStatusResponse.PENDING:
    default:
      return BookingStatusRequest.PENDING;
  }
};
export const convertUncheckedQRCode = async (
  qrCode: UncheckedQrCodeItemResponseProps,
): Promise<UncheckedQrCodeItemRequestProps> => {
  return {
    bookingId: qrCode.bookingId ?? '',
    passengerEmail: qrCode.passengerEmail ?? undefined,
    passengerName: qrCode.passengerName ?? undefined,
    passengerPhone: qrCode.passengerPhone ?? undefined,
    passengerNote: qrCode.passengerNote ?? undefined,
    qrCodeImage: qrCode.qrCodeImage ?? undefined,
    status: convertStatus(qrCode.status ?? BookingStatusResponse.PENDING),
    seat: {
      seatNumber: qrCode?.seat?.seatNumber ?? '',
      seatType: qrCode.seat?.seatType ?? undefined,
    },
  };
};
