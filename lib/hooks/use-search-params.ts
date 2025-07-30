// hooks/useTripSearchParams.ts
import { useSearchParams } from 'next/navigation';

export const useTripSearchParams = () => {
  const searchParams = useSearchParams();

  const sourceProvinceLabel = searchParams.get('from');
  const destinationProvinceLabel = searchParams.get('to');
  const departureDate = searchParams.get('departureDate');
  const arrivalDate = searchParams.get('arrivalDate') || '';
  const pickupPoints = searchParams.get('pickup-points');
  const dropoffPoints = searchParams.get('dropoff-points');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const minTime = searchParams.get('minTime');
  const maxTime = searchParams.get('maxTime');
  return {
    sourceProvinceLabel,
    destinationProvinceLabel,
    departureDate,
    arrivalDate,
    pickupPoints,
    dropoffPoints,
    minPrice,
    maxPrice,
    minTime,
    maxTime,
    isValid:
      !!sourceProvinceLabel && !!destinationProvinceLabel && !!departureDate,
  };
};
