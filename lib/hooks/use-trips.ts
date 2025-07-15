// hooks/useTrips.ts
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchTripsBySearching } from '#/lib/service/fetch-trip-by-searching';
import { convertTripList } from '#/services/trip/trip-list';

export const useTrips = (params: {
  sourceProvinceId: string;
  destinationProvinceId: string;
  departureDate: string;
  arrivalDate: string;
}) => {
  return useInfiniteQuery({
    queryKey: ['trips', params],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetchTripsBySearching({
        ...params,
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
    staleTime: 1000 * 60 * 5,
  });
};
