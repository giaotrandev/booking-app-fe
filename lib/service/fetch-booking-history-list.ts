'use server';

import { convertBookingHistoryList } from '#/services/booking-history/booking-history-list';
import { BookingHistoryStatusRequest } from '#/services/booking-history/booking-history-request';
import { cookies } from 'next/headers';
export interface BookingHistoryListProps {
  startDate?: string;
  endDate?: string;
  tripDepartureStart?: string;
  tripDepartureEnd?: string;
  tripArrivalStart?: string;
  tripArrivalEnd?: string;
  status?: BookingHistoryStatusRequest;
  page?: string;
}
export const fetchBookingHistoryList = async (
  params?: BookingHistoryListProps,
) => {
  const isDev = process.env.NODE_ENV === 'development';
  const baseURL = isDev ? 'http://localhost:3000' : process.env.NEXT_BASE_URL;
  const cookieStore = await cookies();

  try {
    const atCookie = cookieStore.get('at');

    const res = await fetch(`${baseURL}/api/booking-history-list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(atCookie && { Cookie: `at=${atCookie.value}` }),
      },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      return {
        success: false,
        message: `Failed to fetch booking history (${res.status})`,
        data: null,
      };
    }

    const data = await res.json();

    if (!data?.success) {
      return {
        success: false,
        message: data?.message || 'Failed to fetch booking history',
        data: null,
      };
    }

    // 👇 Convert data.data (list booking) trước khi trả về
    const convertedData = await convertBookingHistoryList(
      data.data?.data || [],
    );
    return {
      ...data,
      data: {
        ...data.data,
        data: convertedData,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: 'Internal client error',
      data: null,
    };
  }
};
