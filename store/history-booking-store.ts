'use client';
import {
  BookingHistoryRequestProps,
  BookingHistoryStatusRequest,
} from '#/services/booking-history/booking-history-request';
import { create } from 'zustand';

type Route = {
  from: string;
  to: string;
  departureTime: string;
};

// type BookingHistoryItem = {
//   id: string;
//   status: BookingHistoryStatusRequest; // có thể dùng enum nếu muốn
//   totalPrice: number;
//   discountAmount: number | null;
//   finalPrice: number;
//   createdAt: string;
//   route: Route;
//   totalSeats: number;
//   seatNumbers: string[];
//   paymentMethod: string | null;
// };

type HistoryBookingState = {
  bookings: BookingHistoryRequestProps[];
  loading: boolean;
  error: string | null;
};

type HistoryBookingActions = {
  setBookings: (data: BookingHistoryRequestProps[]) => void;
  addBooking: (booking: BookingHistoryRequestProps) => void;
  removeBooking: (id: string) => void;
  setLoading: (value: boolean) => void;
  setError: (msg: string | null) => void;
};

const useHistoryBookingStore = create<
  HistoryBookingState & HistoryBookingActions
>(set => ({
  bookings: [],
  loading: false,
  error: null,

  setBookings: data => set({ bookings: data }),
  addBooking: booking =>
    set(state => ({ bookings: [booking, ...state.bookings] })),
  removeBooking: id =>
    set(state => ({
      bookings: state.bookings.filter(b => b.id !== id),
    })),
  setLoading: value => set({ loading: value }),
  setError: msg => set({ error: msg }),
}));

export { useHistoryBookingStore };
