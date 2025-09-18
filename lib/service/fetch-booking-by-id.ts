'use server';

import { convertBookingItem } from '#/services/booking/booking-item';

export async function fetchBookingByBookingId(bookingId: string) {
  try {
    const isDev = process.env.NODE_ENV === 'development';
    const baseURL = isDev ? 'http://localhost:3000' : process.env.NEXT_BASE_URL;
    const res = await fetch(`${baseURL}/api/booking-details/${bookingId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      return {
        error: true,
        message: 'Failed to fetch booking details (network)',
      };
    }

    const response = await res.json();
    if (!response.success) {
      return {
        error: true,
        message: response.message || 'API responded with failure',
      };
    }
    const commonData = response.data;
    const convertData = convertBookingItem(commonData);
    return {
      error: false,
      data: convertData,
    };
  } catch (err) {
    console.error(err);
    return {
      error: true,
      message: 'Unknown error occurred (exception)',
    };
  }
}
