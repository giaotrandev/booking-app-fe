'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { fetchProvinces } from '#/lib/service/fetch-provinces';

import { convertProvinceList } from '#/services/global-settings/province-list';
import { convertToSelectOptions } from '#/lib/utilities/convert-to-select-options';

import { BookingRenderBlock } from './render';
import { ProvincesRequestProps } from '#/services/global-settings/provinces-request';
import { LoadingPage } from '#/components/common/loading-page';
import { useTripSearchParams } from '#/lib/hooks/use-search-params';
import { useTrips } from '#/lib/hooks/use-trips';

const BookingBlock = () => {
  const router = useRouter();
  const [provinceList, setProvinceList] = useState<ProvincesRequestProps[]>([]);
  const [loadingProvinces, setLoadingProvinces] = useState(true);
  const {
    sourceProvinceId,
    destinationProvinceId,
    departureDate,
    arrivalDate,
    isValid,
  } = useTripSearchParams();

  useEffect(() => {
    const fetchProvinceList = async () => {
      try {
        setLoadingProvinces(true);
        const resProvinces = await fetchProvinces();
        const provinces = await convertProvinceList(resProvinces.provinces);
        setProvinceList(provinces);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      } finally {
        setLoadingProvinces(false);
      }
    };

    fetchProvinceList();
  }, []);
  useEffect(() => {
    if (!isValid) router.push('/not-found');
  }, [isValid]);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useTrips({
      sourceProvinceId: sourceProvinceId!,
      destinationProvinceId: destinationProvinceId!,
      departureDate: departureDate!,
      arrivalDate,
    });
  const allTrips = data?.pages.flatMap(p => p.trips) ?? [];

  const filterList = [];

  if (loadingProvinces || isLoading) {
    return (
      <div className="fixed inset-0 z-[1910] flex h-screen items-center justify-center bg-white">
        <LoadingPage />
      </div>
    );
  }
  return (
    <BookingRenderBlock
      arrivalList={convertToSelectOptions(provinceList)}
      destinationList={convertToSelectOptions(provinceList)}
      bookingList={allTrips}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage ?? false}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
};

export default BookingBlock;
