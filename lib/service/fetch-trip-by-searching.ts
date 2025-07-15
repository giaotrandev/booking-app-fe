'use server';
// import { cookies } from 'next/headers';
export interface SearchingItemProps {
  sourceProvinceId: string;
  destinationProvinceId: string;
  departureDate: string;
  arrivalDate: string;
  page?: string;
}
export const fetchTripsBySearching = async (
  searchParams: SearchingItemProps,
) => {
  const isDev = process.env.NODE_ENV === 'development';
  const baseURL = isDev ? 'http://localhost:3000' : process.env.NEXT_BASE_URL;
  // const cookieStore = await cookies();

  try {
    // Tạo query parameters từ searchParams
    const queryParams = new URLSearchParams({
      sourceProvinceId: searchParams.sourceProvinceId,
      destinationProvinceId: searchParams.destinationProvinceId,
      departureDate: searchParams.departureDate,
      arrivalDate: searchParams.arrivalDate,
    });
    // MOI THEM VO
    if (searchParams.page) {
      queryParams.set('page', searchParams.page.toString());
    }

    const res = await fetch(
      `${baseURL}/api/search-trip?${queryParams.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Cookie: cookieStore.toString(),
        },
        next: { revalidate: 300 },
      },
    );
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      console.error('Failed to fetch trips:', res.statusText);
      throw new Error(`Failed to fetch trips: ${res.statusText}`);
    }
  } catch (error) {
    console.error('Error fetching trips:', error);
    throw error;
  }
};
