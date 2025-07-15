// hooks/useTripSearchParams.ts
import { useSearchParams } from 'next/navigation';

export const useTripSearchParams = () => {
  const searchParams = useSearchParams();

  const sourceProvinceId = searchParams.get('sourceProvinceId');
  const destinationProvinceId = searchParams.get('destinationProvinceId');
  const departureDate = searchParams.get('departureDate');
  const arrivalDate = searchParams.get('arrivalDate') || '';

  return {
    sourceProvinceId,
    destinationProvinceId,
    departureDate,
    arrivalDate,
    isValid: !!sourceProvinceId && !!destinationProvinceId && !!departureDate,
  };
};
