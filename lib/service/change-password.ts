'use server';

import { cookies } from 'next/headers';

export interface ChangePasswordProps {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const changePassword = async (req: ChangePasswordProps) => {
  const isDev = process.env.NODE_ENV === 'development';
  const baseURL = isDev ? 'http://localhost:3000' : process.env.NEXT_BASE_URL;
  const cookieStore = await cookies();

  try {
    const res = await fetch(`${baseURL}/api/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieStore.get('at')
          ? `at=${cookieStore.get('at')?.value}`
          : '',
      },
      body: JSON.stringify(req),
    });

    const responseData = await res.json();

    return responseData;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error update profile user:', error);
  }
};
