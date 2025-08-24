'use server';

import { FileProps } from '#/types/global';
import { cookies } from 'next/headers';

export interface UpdateProfileProps {
  id: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  gender?: string;
  birthday?: string | Date;
  avatar?: string;
}

export const updateProfile = async (req: UpdateProfileProps) => {
  const isDev = process.env.NODE_ENV === 'development';
  const baseURL = isDev ? 'http://localhost:3000' : process.env.NEXT_BASE_URL;
  const cookieStore = await cookies();

  try {
    const res = await fetch(`${baseURL}/api/update-user-profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieStore
          .getAll()
          .map(c => `${c.name}=${c.value}`)
          .join('; '),
      },
      body: JSON.stringify(req),
    });

    const responseData = await res.json();
    if (!res.ok) {
      throw new Error(responseData?.message || 'Update failed');
    }

    console.log('do', responseData);
    return responseData;
  } catch (error) {
    console.error('Error update profile user:', error);
    throw error;
  }
};
