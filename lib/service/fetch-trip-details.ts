'use server';

import { convertTripItem } from '#/services/trip/trip-item';

export async function getTripDetailAction(tripId: string) {
  try {
    const isDev = process.env.NODE_ENV === 'development';
    const baseURL = isDev ? 'http://localhost:3000' : process.env.NEXT_BASE_URL;
    const res = await fetch(`${baseURL}/api/trip-details/${tripId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      return { error: true, message: 'Failed to fetch trip details (network)' };
    }

    const dataResponse = await res.json();
    const convertedDataResponse = await convertTripItem(dataResponse.data);
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
  } catch (err) {
    console.error(err);
    return {
      error: true,
      message: 'Unknown error occurred (exception)',
    };
  }
}
