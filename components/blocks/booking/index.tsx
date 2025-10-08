'use client';

import { useRouter } from '#/i18n/routing';
import { useCallback, useEffect, useRef, useState } from 'react';

import { fetchProvinces } from '#/lib/service/fetch-provinces';
import { convertToSelectOptions } from '#/lib/utilities/convert-to-select-options';

import { LoadingPage } from '#/components/common/loading-page';
import { useTripSearchParams } from '#/lib/hooks/use-search-params';
import { useTrips } from '#/lib/hooks/use-trips';
import { fetchBusStopFilter } from '#/lib/service/fetch-bus-stop-filter';
import { getPointIdsFromLabels } from '#/lib/utilities/get-point-ids-from-labels';
import { sanitizeTitle } from '#/lib/utilities/sanitize-title';
import { ProvincesRequestProps } from '#/services/global-settings/provinces-request';
import {
  DropoffPointsRequestProps,
  PickUpPointRequestProps,
} from '#/services/trip/filter/bus-stop/bus-stop-request';
import { BookingRenderBlock } from './render';
import { parseSafeNumber } from '#/lib/utilities/parse-safe-number';

const BookingBlock = () => {
  const router = useRouter();

  const [provinceList, setProvinceList] = useState<ProvincesRequestProps[]>([]);
  const [loadingProvinces, setLoadingProvinces] = useState(true);
  const [isLoadingTrips, setIsLoadingTrips] = useState(false);

  const [loadingBusStopFilterList, setLoadingBusStopFilterList] =
    useState<boolean>(true);
  const [pickUpFilterList, setPickUpFilterList] = useState<
    PickUpPointRequestProps[]
  >([]);
  const [dropOffFilterList, setDropOffFilterList] = useState<
    DropoffPointsRequestProps[]
  >([]);

  const fetchProvinceList = async () => {
    try {
      setLoadingProvinces(true);
      const resProvinces = await fetchProvinces();
      setProvinceList(resProvinces);
      if (resProvinces) {
        setIsLoadingTrips(true);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching provinces:', error);
    } finally {
      setLoadingProvinces(false);
    }
  };

  useEffect(() => {
    fetchProvinceList();
  }, []);

  const {
    sourceProvinceLabel,
    destinationProvinceLabel,
    departureDate,
    arrivalDate,
    dropoffPoints,
    pickupPoints,
    maxPrice,
    minPrice,
    maxTime,
    minTime,
    isValid,
  } = useTripSearchParams();
  const sourceProvince = provinceList?.find(item => {
    if (item && item.name) {
      return sanitizeTitle(item.name) == sourceProvinceLabel;
    }
  });
  const destinationProvince = provinceList?.find(item => {
    if (item && item.name) {
      return sanitizeTitle(item.name) == destinationProvinceLabel;
    }
  });
  // ✅ Tìm ID từ label
  const pickupPointIds = getPointIdsFromLabels(pickupPoints, pickUpFilterList);
  const dropoffPointIds = getPointIdsFromLabels(
    dropoffPoints,
    dropOffFilterList,
  );
  const pickupPointLabels = pickupPoints?.split(',') ?? [];
  const dropoffPointLabels = dropoffPoints?.split(',') ?? [];

  const shouldWaitForPickupList = pickupPointLabels.length > 0;
  const shouldWaitForDropoffList = dropoffPointLabels.length > 0;

  const readyToFetch =
    !!sourceProvince?.id &&
    !!destinationProvince?.id &&
    !!departureDate &&
    !loadingProvinces &&
    (!shouldWaitForPickupList || pickUpFilterList.length > 0) &&
    (!shouldWaitForDropoffList || dropOffFilterList.length > 0);

  const parsedMinPrice = parseSafeNumber(minPrice);
  const parsedMaxPrice = parseSafeNumber(maxPrice);
  const {
    data,
    refetch,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useTrips({
    sourceProvinceId: sourceProvince?.id ?? '',
    destinationProvinceId: destinationProvince?.id ?? '',
    departureDate: departureDate ?? '',
    arrivalDate,
    pickup: pickupPointIds ?? undefined,
    dropoff: dropoffPointIds ?? undefined,
    // enabled: isLoadingTrips,
    minPrice:
      parsedMinPrice !== undefined && parsedMinPrice !== 0
        ? parsedMinPrice
        : undefined,
    maxPrice:
      parsedMaxPrice !== undefined && parsedMaxPrice !== 0
        ? parsedMaxPrice
        : undefined,
    maxTime: maxTime ?? undefined,
    minTime: minTime ?? undefined,
  });
  const hasTriggeredRefetch = useRef(false);

  useEffect(() => {
    if (readyToFetch && !hasTriggeredRefetch.current) {
      refetch();
      hasTriggeredRefetch.current = true;
    }
  }, [readyToFetch, refetch]);

  const allTrips = data?.pages.flatMap(p => p.trips) ?? [];
  const fetchBusStopFilterList = async () => {
    try {
      // setLoadingBusStopFilterList(true);
      const res = await fetchBusStopFilter({
        sourceProvinceId: sourceProvince?.id ?? '',
        destinationProvinceId: destinationProvince?.id ?? '',
        departureDate: departureDate!,
        arrivalDate,
      });

      if (res.data) {
        setPickUpFilterList(res.data.pickupPoints);
        setDropOffFilterList(res.data.dropoffPoints);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching bus stop filter list:', error);
    }
  };

  useEffect(() => {
    fetchBusStopFilterList();
  }, [sourceProvince?.id, destinationProvince?.id, departureDate, arrivalDate]);

  useEffect(() => {
    if (!isValid) router.push('/not-found');
  }, [isValid]);
  if (loadingProvinces || !hasTriggeredRefetch.current) {
    return <LoadingPage />;
  }
  return (
    <BookingRenderBlock
      arrivalList={convertToSelectOptions(provinceList)}
      destinationList={convertToSelectOptions(provinceList)}
      bookingList={allTrips}
      dropOffFilterList={dropOffFilterList}
      pickUpFilterList={pickUpFilterList}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage ?? false}
      isLoading={isLoading}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
};

export default BookingBlock;
