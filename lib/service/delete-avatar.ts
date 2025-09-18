'use server';

import { cookies } from 'next/headers';

export interface DeleteAvatarProps {}

export const deleteAvatar = async (req: DeleteAvatarProps) => {
  const isDev = process.env.NODE_ENV === 'development';
  const baseURL = isDev ? 'http://localhost:3000' : process.env.NEXT_BASE_URL;
  const cookieStore = await cookies();

  try {
    const res = await fetch(`${baseURL}/api/delete-avatar`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieStore
          .getAll()
          .map(c => `${c.name}=${c.value}`)
          .join('; '),
      },
      body: JSON.stringify(req),
      // next: { revalidate: 300 },
    });
    const responseData = await res.json();
    if (!res.ok || !responseData.success) {
      throw new Error(responseData.message || 'Delete avatar failed');
    }

    return responseData;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error delete avatar:', error);
  }
};
