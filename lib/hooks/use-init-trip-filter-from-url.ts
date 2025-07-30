'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useFilterStore } from '#/store/filter-store';
import { OptionType } from '#/types/global';

export const useInitTripFilterFromUrl = () => {
  const searchParams = useSearchParams();
  const setFilter = useFilterStore(state => state.setFilter);

  useEffect(() => {
    const pickupPoints = searchParams.get('pickup-points');
    const dropoffPoints = searchParams.get('dropoff-points');

    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');

    const minTime = searchParams.get('minTime');
    const maxTime = searchParams.get('maxTime');

    // Convert string to OptionType[]
    const convertToOptionArray = (ids: string): OptionType[] =>
      ids.split(',').map(id => ({ value: id, label: '' }));

    if (pickupPoints) {
      const pickupOptions = convertToOptionArray(pickupPoints);
      setFilter('pickup', pickupOptions);
    }

    if (dropoffPoints) {
      const dropoffOptions = convertToOptionArray(dropoffPoints);
      setFilter('dropoff', dropoffOptions);
    }

    if (minPrice && maxPrice) {
      const min = parseInt(minPrice, 10);
      const max = parseInt(maxPrice, 10);
      if (!isNaN(min) && !isNaN(max)) {
        setFilter('price', [min, max]);
      }
    }

    if (minTime && maxTime) {
      const min = parseInt(minTime, 10);
      const max = parseInt(maxTime, 10);
      if (!isNaN(min) && !isNaN(max)) {
        setFilter('time', [min, max]);
      }
    }
  }, [searchParams, setFilter]);
};
