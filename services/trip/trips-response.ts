// Enum definitions
export enum TripStatus {
  SCHEDULED = 'SCHEDULED',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum VehicleStatus {
  ACTIVE = 'ACTIVE',
  MAINTENANCE = 'MAINTENANCE',
  INACTIVE = 'INACTIVE',
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

export enum DistanceUnit {
  KM = 'KM',
  MILE = 'MILE',
}

interface BaseEntity {
  id?: string;
  status?: string;
  isDeleted?: boolean;
}

// Province interface
export interface Province extends BaseEntity {
  name?: string;
  code?: string;
  latitude?: number;
  longitude?: number;
}

// Route interface
export interface Route extends BaseEntity {
  code?: string;
  name?: string;
  direction?: string;
  image?: string;
  sourceProvinceId?: string;
  destinationProvinceId?: string;
  distance?: number;
  distanceUnit?: DistanceUnit;
  estimatedDuration?: number;
  sourceProvince?: Province;
  destinationProvince?: Province;
}

// Seat interface
export interface SeatResponse {
  id: string;
  status?: SeatStatus;
  bookingTripId?: string;
  number?: string;
  seatNumber?: string; // detail
  exists?: boolean;
  type?: SeatType;
  seatType?: SeatType; // detail
  position?: SeatPosition;
  x?: number;
  y?: number;
}

// Row interface
export interface RowResponse {
  rowId?: string;
  seats?: SeatResponse[];
}

// Deck interface
export interface DeckResponse {
  deckId?: string;
  name?: string;
  rows?: RowResponse[];
}

// Seat configuration interface
export interface SeatConfiguration {
  decks?: DeckResponse[];
}

// Vehicle type interface
export interface VehicleType extends BaseEntity {
  name?: string;
  description?: string;
  seatConfiguration?: SeatConfiguration;
}

// Vehicle interface
export interface Vehicle extends BaseEntity {
  plateNumber?: string;
  registrationCode?: string;
  image?: string;
  vehicleTypeId?: string;
  driverId?: string;
  registrationExpiryDate?: string;
  status?: VehicleStatus;
  vehicleType?: VehicleType;
}

// Count interface
export interface Count {
  seats?: number;
}

// Main Trip interface
export interface Trip {
  id: string;
  image?: string;
  routeId?: string;
  vehicleId?: string;
  departureTime?: string;
  arrivalTime?: string;
  basePrice?: number;
  specialPrice?: number;
  status?: TripStatus;
  route?: Route;
  vehicle?: Vehicle;
  _count?: Count;
  imageUrl?: string;
  availableSeats?: number;
  seats?: SeatResponse[];
}

// Usage example
export type TripResponseProps = Trip;
