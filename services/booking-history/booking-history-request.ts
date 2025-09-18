export enum BookingHistoryStatusRequest {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}

export enum PaymentHistoryStatusRequest {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}
export interface BookingHistoryRouteItemRequestProps {
  from?: string;
  to?: string;
  departureTime?: string;
}
export interface BookingHistoryRequestProps {
  id: string;
  status?: BookingHistoryStatusRequest;
  totalPrice?: number;
  discountAmount?: null;
  finalPrice?: string;
  createdAt: string;
  route?: BookingHistoryRouteItemRequestProps;
  totalSeats?: number;
  seatNumbers?: string[];
  paymentMethod?: string;
}
