export enum BookingHistoryStatusResponse {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}

export enum PaymentHistoryStatusResponse {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}
export interface BookingHistoryRouteItemResponseProps {
  from?: string;
  to?: string;
  departureTime?: string;
}
export interface BookingHistoryResponseProps {
  id: string;
  status?: BookingHistoryStatusResponse;
  totalPrice?: number;
  discountAmount?: null;
  finalPrice?: string;
  createdAt: string;
  route?: BookingHistoryRouteItemResponseProps;
  totalSeats?: number;
  seatNumbers?: string[];
  paymentMethod?: string;
}
