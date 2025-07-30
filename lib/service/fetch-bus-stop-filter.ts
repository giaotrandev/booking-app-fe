'use server';

import { convertBusStopFilter } from '#/services/trip/filter/bus-stop/bus-stop-item';

export interface SearchingItemProps {
  sourceProvinceId: string;
  destinationProvinceId: string;
  departureDate: string;
  arrivalDate: string;
}
export const fetchBusStopFilter = async (searchParams: SearchingItemProps) => {
  const isDev = process.env.NODE_ENV === 'development';
  const baseURL = isDev ? 'http://localhost:3000' : process.env.NEXT_BASE_URL;

  try {
    // Tạo query parameters từ searchParams
    const queryParams = new URLSearchParams({
      sourceProvinceId: searchParams.sourceProvinceId,
      destinationProvinceId: searchParams.destinationProvinceId,
      departureDate: searchParams.departureDate,
      arrivalDate: searchParams.arrivalDate,
    });

    const res = await fetch(
      `${baseURL}/api/bus-stop-filter?${queryParams.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // next: { revalidate: 300 },
      },
    );
    if (!res.ok) {
      return {
        error: true,
        message: 'Failed to fetch bus stop filter (network)',
      };
    }
    const dataResponse = await res.json();
    const convertedDataResponse = await convertBusStopFilter(dataResponse.data);
    if (!dataResponse.success) {
      return {
        error: true,
        message: dataResponse.message || 'API responded with failure',
      };
    }

    return {
      error: false,
      data: convertedDataResponse,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return {
      error: true,
      message: 'Unknown error occurred (exception)',
    };
  }
};
