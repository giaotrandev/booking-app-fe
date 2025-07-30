import { BookingStatusRequest } from '#/services/booking/booking-request';

export enum SeatType {
  DRIVER = 'DRIVER',
  PREMIUM = 'PREMIUM',
  BED = 'BED',
  STANDARD = 'STANDARD',
}

export interface UncheckedQrCodeSeatItemRequestProps {
  seatNumber?: string;
  seatType?: SeatType;
}

export interface UncheckedQrCodeItemRequestProps {
  bookingId: string;
  passengerName?: string;
  passengerEmail?: string;
  passengerPhone?: string;
  passengerNote?: string;
  qrCodeImage?: string;
  status?: BookingStatusRequest;
  seat?: UncheckedQrCodeSeatItemRequestProps;
}
