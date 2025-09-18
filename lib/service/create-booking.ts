'use server';

import { cookies } from 'next/headers';

export interface CreateBookingProps {
  tripId: string;
  seatIds: string[];
  passengerName: string;
  passengerEmail: string;
  passengerPhone: string;
  passengerNote?: string;
  pickupId?: string;
  dropoffId?: string;
}

export const createBooking = async (req: CreateBookingProps) => {
  const isDev = process.env.NODE_ENV === 'development';
  const cookieStore = await cookies();
  const baseURL = isDev ? 'http://localhost:3000' : process.env.NEXT_BASE_URL;
  try {
    const res = await fetch(`${baseURL}/api/create-bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieStore.get('at')
          ? `at=${cookieStore.get('at')?.value}`
          : '',
      },
      body: JSON.stringify(req),
      // next: { revalidate: 300 },
    });
    const responseData = await res.json();
    if (!res.ok || !responseData.success) {
      throw new Error(responseData.message || 'Tạo booking thất bại');
    }

    // ✅ Trả về đúng ID booking
    return responseData.data.id as string;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error creating booking:', error);
  }
};
