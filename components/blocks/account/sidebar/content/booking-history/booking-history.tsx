import {
  BookingRequestProps,
  BookingStatusRequest,
  PaymentStatusRequest,
  SeatStatus,
  SeatType,
} from '#/services/booking/booking-request';
import {
  BookingHistoryItem,
  BookingHistoryItemProps,
} from './booking-history-item';
import { IntroductionContent } from '../introduction-content';

interface BookingHistoryProps {}

const BookingHistory = ({}: BookingHistoryProps) => {
  return (
    <div className="flex flex-col gap-y-4">
      <IntroductionContent title="Personal Settings" description="My booking" />
      {Array.isArray(sampleBookingHistoryList) &&
        sampleBookingHistoryList.length > 0 && (
          <div className="flex flex-col gap-y-4 lg:gap-y-3">
            {sampleBookingHistoryList.map((item, index) => (
              <div key={item.id}>
                <BookingHistoryItem {...item} />
              </div>
            ))}
          </div>
        )}
    </div>
  );
};

export { BookingHistory };
const sampleBookingHistoryList: BookingHistoryItemProps[] = [
  {
    id: 'VR240822001',
    tripId: 'trip_001',
    userId: 'user_123',
    createdAt: '2025-08-25T08:00:00.000Z',
    passengerName: 'Giao Trần 1',
    passengerEmail: 'giao.tran@email.com',
    passengerPhone: '+84987654321',
    passengerNote: 'Cần chỗ để hành lý nhiều',
    pickupPoint: {
      name: 'Bến xe Miền Đông',
      address: '292 Đinh Bộ Lĩnh, Phường 26, Bình Thạnh',
      ward: 'Phường 26',
      district: 'Bình Thạnh',
      province: 'Hồ Chí Minh',
    },
    dropingPoint: {
      name: 'Bến xe Đà Lạt',
      address: '01 Tô Hiến Thành, Phường 3',
      ward: 'Phường 3',
      district: 'Thành phố Đà Lạt',
      province: 'Lâm Đồng',
    },
    status: BookingStatusRequest.CONFIRMED,
    paymentStatus: PaymentStatusRequest.COMPLETED,
    totalPrice: '470000',
    finalPrice: '450000',
    departureTime: '2025-08-25T08:00:00.000Z',
    arrivalTime: '2025-08-25T13:30:00.000Z',
    vehicle: {
      vehicleId: 'vehicle_001',
      vehicleCapacity: 40,
      vehiclePlateNumber: '51B-12345',
      vehicleName: 'Mercedes Sprinter',
      vehicleDescription: 'Xe giường nằm VIP 40 chỗ',
      vehicleImage: 'https://example.com/vehicle1.jpg',
    },
    route: {
      id: 'route_001',
      name: 'Hồ Chí Minh - Đà Lạt',
      code: 'HCM_DL',
      sourceProvince: { id: '79', name: 'Hồ Chí Minh' },
      destinationProvince: { id: '68', name: 'Lâm Đồng' },
    },
    seats: [
      {
        id: 'seat_001',
        tripId: 'trip_001',
        seatNumber: 'A12',
        seatType: SeatType.BED,
        status: SeatStatus.BOOKED,
        bookingTripId: 'VR240822001',
      },
      {
        id: 'seat_002',
        tripId: 'trip_001',
        seatNumber: 'A13',
        seatType: SeatType.BED,
        status: SeatStatus.BOOKED,
        bookingTripId: 'VR240822001',
      },
    ],
    updatedAt: '2025-08-22T10:30:00.000Z',
  },
  {
    id: 'VR240820002',
    tripId: 'trip_002',
    userId: 'user_123',
    passengerName: 'Giao Trần 1',
    passengerEmail: 'giao.tran@email.com',
    passengerPhone: '+84987654321',
    createdAt: '2025-08-25T08:00:00.000Z',
    pickupPoint: {
      name: 'Bến xe Trung tâm Đà Nẵng',
      address: 'Điện Biên Phủ, Chính Gián, Thanh Khê',
      ward: 'Chính Gián',
      district: 'Thanh Khê',
      province: 'Đà Nẵng',
    },
    dropingPoint: {
      name: 'Bến xe Hội An',
      address: 'Đường Lê Hồng Phong, Cẩm Châu',
      ward: 'Cẩm Châu',
      district: 'Hội An',
      province: 'Quảng Nam',
    },
    status: BookingStatusRequest.PENDING,
    paymentStatus: PaymentStatusRequest.PENDING,
    totalPrice: '150000',
    finalPrice: '150000',
    departureTime: '2025-08-28T14:30:00.000Z',
    arrivalTime: '2025-08-28T15:30:00.000Z',
    vehicle: {
      vehicleId: 'vehicle_002',
      vehicleCapacity: 16,
      vehiclePlateNumber: '43A-67890',
      vehicleName: 'Ford Transit',
      vehicleDescription: 'Xe limousine 16 chỗ ngồi',
      vehicleImage: 'https://example.com/vehicle2.jpg',
    },
    route: {
      id: 'route_002',
      name: 'Đà Nẵng - Hội An',
      code: 'DN_HA',
      sourceProvince: { id: '48', name: 'Đà Nẵng' },
      destinationProvince: { id: '49', name: 'Quảng Nam' },
    },
    seats: [
      {
        id: 'seat_003',
        tripId: 'trip_002',
        seatNumber: 'B05',
        seatType: SeatType.PREMIUM,
        status: SeatStatus.RESERVED,
        bookingTripId: 'VR240820002',
      },
    ],
    updatedAt: '2025-08-20T16:45:00.000Z',
  },
  {
    id: 'VR240815003',
    tripId: 'trip_003',
    userId: 'user_123',
    passengerName: 'Giao Trần 1',
    passengerEmail: 'giao.tran@email.com',
    passengerPhone: '+84987654321',
    passengerNote: 'Hủy do có việc đột xuất',
    createdAt: '2025-08-25T08:00:00.000Z',
    pickupPoint: {
      name: 'Bến xe Mỹ Đình',
      address: 'Phạm Hùng, Mỹ Đình, Nam Từ Liêm',
      ward: 'Mỹ Đình',
      district: 'Nam Từ Liêm',
      province: 'Hà Nội',
    },
    dropingPoint: {
      name: 'Bến xe Sapa',
      address: 'Đường Điện Biên Phủ, TT. Sapa',
      ward: 'TT. Sapa',
      district: 'Sapa',
      province: 'Lào Cai',
    },
    status: BookingStatusRequest.CANCELLED,
    paymentStatus: PaymentStatusRequest.COMPLETED,
    totalPrice: '340000',
    finalPrice: '320000',
    departureTime: '2025-08-18T06:00:00.000Z',
    arrivalTime: '2025-08-18T11:30:00.000Z',
    vehicle: {
      vehicleId: 'vehicle_003',
      vehicleCapacity: 45,
      vehiclePlateNumber: '29B-11111',
      vehicleName: 'Thaco Universe',
      vehicleDescription: 'Xe khách giường nằm 45 chỗ',
      vehicleImage: 'https://example.com/vehicle3.jpg',
    },
    route: {
      id: 'route_003',
      name: 'Hà Nội - Sapa',
      code: 'HN_SP',
      sourceProvince: { id: '01', name: 'Hà Nội' },
      destinationProvince: { id: '02', name: 'Lào Cai' },
    },
    seats: [
      {
        id: 'seat_004',
        tripId: 'trip_003',
        seatNumber: 'C08',
        seatType: SeatType.BED,
        status: SeatStatus.AVAILABLE,
        bookingTripId: 'VR240815003',
      },
      {
        id: 'seat_005',
        tripId: 'trip_003',
        seatNumber: 'C09',
        seatType: SeatType.BED,
        status: SeatStatus.AVAILABLE,
        bookingTripId: 'VR240815003',
      },
    ],
    updatedAt: '2025-08-17T09:15:00.000Z',
  },
  {
    id: 'VR240810004',
    tripId: 'trip_004',
    userId: 'user_123',
    passengerName: 'Giao Trần 1',
    passengerEmail: 'giao.tran@email.com',
    passengerPhone: '+84987654321',
    createdAt: '2025-08-25T08:00:00.000Z',
    pickupPoint: {
      name: 'Bến xe An Sương',
      address: 'Quốc lộ 22, An Phú Đông, Quận 12',
      ward: 'An Phú Đông',
      district: 'Quận 12',
      province: 'Hồ Chí Minh',
    },
    dropingPoint: {
      name: 'Bến xe Cần Thơ',
      address: 'Nguyễn Trãi, An Hội, Ninh Kiều',
      ward: 'An Hội',
      district: 'Ninh Kiều',
      province: 'Cần Thơ',
    },
    status: BookingStatusRequest.CONFIRMED,
    paymentStatus: PaymentStatusRequest.COMPLETED,
    totalPrice: '180000',
    finalPrice: '180000',
    departureTime: '2025-08-12T07:15:00.000Z',
    arrivalTime: '2025-08-12T10:45:00.000Z',
    vehicle: {
      vehicleId: 'vehicle_004',
      vehicleCapacity: 29,
      vehiclePlateNumber: '50F-22222',
      vehicleName: 'Hyundai Universe',
      vehicleDescription: 'Xe khách thường 29 chỗ ngồi',
      vehicleImage: 'https://example.com/vehicle4.jpg',
    },
    route: {
      id: 'route_004',
      name: 'Hồ Chí Minh - Cần Thơ',
      code: 'HCM_CT',
      sourceProvince: { id: '79', name: 'Hồ Chí Minh' },
      destinationProvince: { id: '92', name: 'Cần Thơ' },
    },
    seats: [
      {
        id: 'seat_006',
        tripId: 'trip_004',
        seatNumber: 'D15',
        seatType: SeatType.STANDARD,
        status: SeatStatus.BOOKED,
        bookingTripId: 'VR240810004',
      },
    ],
    updatedAt: '2025-08-10T14:20:00.000Z',
  },
  {
    id: 'VR240805005',
    tripId: 'trip_005',
    userId: 'user_123',
    passengerName: 'Giao Trần 1',
    passengerEmail: 'giao.tran@email.com',
    passengerPhone: '+84987654321',
    createdAt: '2025-08-25T08:00:00.000Z',
    pickupPoint: {
      name: 'Bến xe Giáp Bát',
      address: 'Phố Giải Phong, Hoàng Mai',
      ward: 'Giáp Bát',
      district: 'Hoàng Mai',
      province: 'Hà Nội',
    },
    dropingPoint: {
      name: 'Bến xe Ninh Bình',
      address: 'Đường Trần Nhân Tông, Đông Thành',
      ward: 'Đông Thành',
      district: 'Ninh Bình',
      province: 'Ninh Bình',
    },
    status: BookingStatusRequest.CONFIRMED,
    paymentStatus: PaymentStatusRequest.COMPLETED,
    totalPrice: '120000',
    finalPrice: '120000',
    departureTime: '2025-08-08T09:00:00.000Z',
    arrivalTime: '2025-08-08T11:00:00.000Z',
    vehicle: {
      vehicleId: 'vehicle_005',
      vehicleCapacity: 35,
      vehiclePlateNumber: '18A-33333',
      vehicleName: 'Samco Felix',
      vehicleDescription: 'Xe khách thường 35 chỗ ngồi',
      vehicleImage: 'https://example.com/vehicle5.jpg',
    },
    route: {
      id: 'route_005',
      name: 'Hà Nội - Ninh Bình',
      code: 'HN_NB',
      sourceProvince: { id: '01', name: 'Hà Nội' },
      destinationProvince: { id: '18', name: 'Ninh Bình' },
    },
    seats: [
      {
        id: 'seat_007',
        tripId: 'trip_005',
        seatNumber: 'A01',
        seatType: SeatType.STANDARD,
        status: SeatStatus.BOOKED,
        bookingTripId: 'VR240805005',
      },
    ],
    updatedAt: '2025-08-05T11:30:00.000Z',
  },
];
