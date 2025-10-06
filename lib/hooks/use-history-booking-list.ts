// hooks/useBookingHistory.ts
'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchBookingHistoryList } from '#/lib/service/fetch-booking-history-list';
import { BookingHistoryStatusRequest } from '#/services/booking-history/booking-history-request';

export const useBookingHistory = (params: {
  startDate?: string;
  endDate?: string;
  tripDepartureStart?: string;
  tripDepartureEnd?: string;
  tripArrivalStart?: string;
  tripArrivalEnd?: string;
  status?: BookingHistoryStatusRequest;
}) => {
  return useInfiniteQuery({
    queryKey: [
      'booking-history',
      params.status,
      params.startDate,
      params.endDate,
      params.tripDepartureStart,
      params.tripDepartureEnd,
      params.tripArrivalStart,
      params.tripArrivalEnd,
    ],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetchBookingHistoryList({
        ...params,
        page: String(pageParam),
      });
      const rawBookings = res?.data?.data ?? [];
      const meta = res?.data?.meta;

      return {
        bookings: rawBookings,
        nextPage: (meta?.page ?? 1) + 1,
        hasMore: meta?.hasNextPage ?? false,
      };
    },
    getNextPageParam: lastPage =>
      lastPage.hasMore ? lastPage.nextPage : undefined,
    initialPageParam: 1,
    staleTime: 0, // luôn fresh khi filter
  });
};
