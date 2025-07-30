'use server';

import { convertProvinceList } from '#/services/global-settings/province-list';

// lib/api/fetchProvinces.ts
// import { cookies } from 'next/headers';

export const fetchProvinces = async (): Promise<any> => {
  const isDev = process.env.NODE_ENV === 'development';
  const baseURL = isDev ? 'http://localhost:3000' : process.env.NEXT_BASE_URL;
  // const cookieStore = await cookies();
  try {
    const res = await fetch(`${baseURL}/api/city-province`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Cookie: cookieStore.toString(),
      },
      // next: { revalidate: 3600 },
    });

    if (res.ok) {
      const data = await res.json();
      const convertedData = await convertProvinceList(data.provinces);
      return convertedData;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching provinces:', error);
    return [];
  }
};
