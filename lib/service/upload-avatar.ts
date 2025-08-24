'use server';

export interface UploadAvatarProps {}

export const uploadAvatar = async (req: UploadAvatarProps) => {
  const isDev = process.env.NODE_ENV === 'development';
  const baseURL = isDev ? 'http://localhost:3000' : process.env.NEXT_BASE_URL;
  try {
    const res = await fetch(`${baseURL}/api/upload-avatar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
      // next: { revalidate: 300 },
    });
    const responseData = await res.json();
    console.log(responseData);
    if (!res.ok || !responseData.success) {
      throw new Error(responseData.message || 'Upload avatar failed');
    }

    // ✅ Trả về đúng ID booking
    return responseData;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error upload avatar:', error);
  }
};
