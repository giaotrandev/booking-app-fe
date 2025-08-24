export enum BookingStatusRequest {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}

export enum PaymentStatusRequest {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}
export enum SeatType {
  DRIVER = 'DRIVER',
  PREMIUM = 'PREMIUM',
  BED = 'BED',
  STANDARD = 'STANDARD',
}
export enum SeatStatus {
  AVAILABLE = 'AVAILABLE',
  RESERVED = 'RESERVED',
  BOOKED = 'BOOKED',
  BLOCKED = 'BLOCKED',
}
export interface OptionItemProps {
  id: string;
  time?: string;
  locationName?: string;
  address?: string;
}
export interface BookingSeatItemRequestProps {
  id: string;
  tripId: string;
  seatNumber: string;
  seatType?: SeatType;
  status?: SeatStatus;
  bookingTripId?: string;
}
export interface VehicleItemRequestProps {
  vehicleId: string;
  vehicleCapacity?: number;
  vehiclePlateNumber?: string;
  vehicleName?: string;
  vehicleDescription?: string;
  vehicleImage?: string;
}

export interface ProvinceItemProps {
  id: string;
  name?: string;
}
export interface BookingRouteItemRequestProps {
  id: string;
  name?: string;
  code?: string;
  sourceProvince?: ProvinceItemProps;
  destinationProvince?: ProvinceItemProps;
}
export interface BusStopProps {
  name?: string;
  address?: string;
  ward?: string;
  district?: string;
  province?: string;
}
export interface BookingRequestProps {
  id: string;
  tripId: string;
  userId?: string;
  createdAt?: string;
  passengerName: string;
  passengerEmail: string;
  passengerPhone: string;
  passengerNote?: string;
  pickupPoint?: BusStopProps;
  dropingPoint?: BusStopProps;
  status: BookingStatusRequest;
  paymentStatus: PaymentStatusRequest;
  totalPrice: string;
  finalPrice: string;
  arrivalTime: string;
  departureTime: string;
  vehicle?: VehicleItemRequestProps;
  route?: BookingRouteItemRequestProps;
  seats: BookingSeatItemRequestProps[];
  updatedAt: string;
}
