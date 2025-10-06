'use server';

import { convertProvinceList } from '#/services/provinces/province-list';

export async function getPopularRoutes(limit: number = 2) {
  const isDev = process.env.NODE_ENV === 'development';
  const baseURL = isDev ? 'http://localhost:3000' : process.env.NEXT_BASE_URL;

  try {
    const res = await fetch(`${baseURL}/api/popular-routes?limit=${limit}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    if (!res.ok) {
      return {
        success: false,
        message: 'Failed to fetch popular routes',
        data: null,
      };
    }

    const json = await res.json();

    // unwrap ngay tại đây
    const list = json?.data?.data ?? [];

    // convert sang format FE cần
    const convertedData = await convertProvinceList(list);

    return {
      success: json.success ?? true,
      message: json.message ?? 'Popular routes retrieved successfully',
      data: convertedData,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error fetching popular routes',
      data: null,
    };
  }
}
