'use server';

import { cookies } from 'next/headers';

export const cancelBooking = async (id: string) => {
  const isDev = process.env.NODE_ENV === 'development';
  const cookieStore = await cookies();
  const baseURL = isDev ? 'http://localhost:3000' : process.env.NEXT_BASE_URL;
  try {
    const res = await fetch(`${baseURL}/api/cancel-booking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieStore.get('at')
          ? `at=${cookieStore.get('at')?.value}`
          : '',
      },
      body: JSON.stringify({ id }),
      // next: { revalidate: 300 },
    });
    const responseData = await res.json();

    return responseData;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error creating booking:', error);
  }
};
