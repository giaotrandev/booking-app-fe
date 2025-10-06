'use server';
// import { cookies } from 'next/headers';
export interface SearchingItemProps {
  sourceProvinceId: string;
  destinationProvinceId: string;
  departureDate: string;
  arrivalDate: string;
  pickupStopIds?: string;
  dropoffStopIds?: string;
  minPrice?: number;
  maxPrice?: number;
  minTime?: string;
  maxTime?: string;
  page?: string;
}
export const fetchTripsBySearching = async (params: SearchingItemProps) => {
  const isDev = process.env.NODE_ENV === 'development';
  const baseURL = isDev ? 'http://localhost:3000' : process.env.NEXT_BASE_URL;
  const res = await fetch(`${baseURL}/api/search-trip`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch trips:', res.statusText);
  }
};
