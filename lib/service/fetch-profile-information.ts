'use server';

import { convertInformationProfileItem } from '#/services/user/information-profile-item';
import { cookies } from 'next/headers';

export const fetchProfileInformation = async () => {
  const isDev = process.env.NODE_ENV === 'development';
  const baseURL = isDev ? 'http://localhost:3000' : process.env.NEXT_BASE_URL;
  const cookieStore = await cookies();
  try {
    const res = await fetch(`${baseURL}/api/profile-information`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieStore
          .getAll()
          .map(c => `${c.name}=${c.value}`)
          .join('; '),
      },
      // next: { revalidate: 3600 },
    });
    if (!res.ok) return undefined;

    const data = await res.json();
    const convertedData = await convertInformationProfileItem(data.user);
    return convertedData;
  } catch (error) {
    console.error('Error fetching provinces:', error);
    return undefined;
  }
};
