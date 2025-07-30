// hooks/useTrips.ts
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchTripsBySearching } from '#/lib/service/fetch-trip-by-searching';
import { convertTripList } from '#/services/trip/trip-list';

export const useTrips = (params: {
  sourceProvinceId: string;
  destinationProvinceId: string;
  departureDate: string;
  arrivalDate: string;
  pickup?: string[];
  dropoff?: string[];
  minPrice?: number;
  maxPrice?: number;
  minTime?: string;
  maxTime?: string;
}) => {
  return useInfiniteQuery({
    queryKey: [
      'trips',
      params.sourceProvinceId,
      params.destinationProvinceId,
      params.departureDate,
      params.arrivalDate,
      params.pickup?.join(','),
      params.dropoff?.join(','),
      params.minPrice,
      params.maxPrice,
      params.minTime,
      params.maxTime,
    ],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetchTripsBySearching({
        ...params,
        pickupStopIds: params.pickup?.join(','),
        dropoffStopIds: params.dropoff?.join(','),
        page: String(pageParam),
      });
      const rawTrips = res.data?.outboundTrips?.data ?? [];
      const pagination = res.data?.outboundTrips?.pagination;

      const trips = await convertTripList(rawTrips);
      return {
        trips,
        nextPage: pagination?.page! + 1,
        hasMore: pagination?.hasNextPage ?? false,
      };
    },
    getNextPageParam: lastPage =>
      lastPage.hasMore ? lastPage.nextPage : undefined,
    initialPageParam: 1,
    // staleTime: 1000 * 60 * 5,
    staleTime: 0,
    // enabled: false,
    // staleTime: 1000 * 60 * 5, // giữ cache 5 phút
    // gcTime: 1000 * 60 * 10, // giữ cache tổng 10 phút (sau staleTime)
    // keepPreviousData: true,
    // enabled: params.enabled,
  });
};
