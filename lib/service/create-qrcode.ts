'use server';

import { convertQRCode } from '#/services/QrCode/qr-code-item';

export interface CreateQrCodeProps {
  bookingId: string;
}

export const createQrCode = async (req: CreateQrCodeProps) => {
  const isDev = process.env.NODE_ENV === 'development';
  const baseURL = isDev ? 'http://localhost:3000' : process.env.NEXT_BASE_URL;
  try {
    const res = await fetch(`${baseURL}/api/create-qrcode/${req.bookingId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      //   next: { revalidate: 300 },
    });
    if (!res.ok) {
      return {
        error: true,
        message: 'Failed to fetch Qr code',
      };
    }
    const responseData = await res.json();
    if (!responseData.success) {
      return {
        error: true,
        message: responseData.message || 'API responded with failure',
      };
    }
    const convertData = await convertQRCode(responseData.data);
    return {
      error: false,
      data: convertData,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error creating qr code:', error);
    return {
      error: true,
      message: 'Unknown error occurred (exception)',
    };
  }
};
