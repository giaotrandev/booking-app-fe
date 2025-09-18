export enum BookingStatusResponse {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}

export enum PaymentStatusResponse {
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

export enum SeatPosition {
  WINDOW = 'window',
  AISLE = 'aisle',
}
export interface BookingSeatItemResponseProps {
  id: string;
  tripId: string;
  status?: SeatStatus;
  bookingTripId?: string;
  seatNumber?: string; // detail
  exists?: boolean;
  type?: SeatType;
  seatType?: SeatType; // detail
  position?: SeatPosition;
  x?: number;
  y?: number;
}
export interface ProvinceItemProps {
  id: string;
  name?: string;
}
export interface BookingRouteItemProps {
  id: string;
  name?: string;
  code?: string;
  sourceProvinceId?: string;
  destinationProvinceId?: string;
  sourceProvince?: ProvinceItemProps;
  destinationProvince?: ProvinceItemProps;
}
export interface VehicleTypeItemProps {
  id: string;
  name?: string;
  description?: string;
}
export interface VehicleItemProps {
  id: string;
  plateNumber?: string;
  image?: string;
  vehicleType?: VehicleTypeItemProps;
  capacity?: number;
}
export interface BookingTripItemProps {
  id: string;
  routeId?: string;
  vehicleId?: string;
  arrivalTime?: string;
  departureTime?: string;
  basePrice?: number;
  capacity?: number;
  specialPrice?: number;
  route?: BookingRouteItemProps;
  vehicle?: VehicleItemProps;
  imageUrl?: string;
}
export interface BookingTripsResponseProps {
  seats?: BookingSeatItemResponseProps[];
  trip?: BookingTripItemProps;
}
export interface BusStopProps {
  name?: string;
  address?: string;
  ward?: string;
  district?: string;
  province?: string;
}
export interface BookingResponseProps {
  id: string;
  userId?: string;
  passengerName?: string;
  passengerEmail?: string;
  passengerPhone?: string;
  passengerNote?: string;
  pickupId?: string;
  dropoffId?: string;
  status: BookingStatusResponse;
  paymentStatus: PaymentStatusResponse;
  totalPrice?: number;
  finalPrice?: number;
  pickup?: BusStopProps;
  dropoff?: BusStopProps;
  bookingTrips?: BookingTripsResponseProps[];
  updatedAt: string;
  createdAt: string;
}
