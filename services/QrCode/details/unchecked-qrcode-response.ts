import { BookingStatusResponse } from '#/services/booking/booking-response';

export enum SeatType {
  DRIVER = 'DRIVER',
  PREMIUM = 'PREMIUM',
  BED = 'BED',
  STANDARD = 'STANDARD',
}
export interface UncheckedQrCodeSeatItemResponseProps {
  seatNumber?: string;
  seatType?: SeatType;
}

export interface UncheckedQrCodeItemResponseProps {
  bookingId?: string;
  passengerName?: string;
  passengerEmail?: string;
  passengerPhone?: string;
  passengerNote?: string;
  qrCodeImage?: string;
  status?: BookingStatusResponse;
  seat?: UncheckedQrCodeSeatItemResponseProps;
}
