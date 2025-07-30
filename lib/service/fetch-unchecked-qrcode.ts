'use server';

import { convertUncheckedQrcodeList } from '#/services/QrCode/details/unchecked-qrcode-list';

export async function getUnCheckedQrCodeAction(bookingId: string) {
  try {
    const isDev = process.env.NODE_ENV === 'development';
    const baseURL = isDev ? 'http://localhost:3000' : process.env.NEXT_BASE_URL;
    const res = await fetch(
      `${baseURL}/api/get-unchecked-qrcode/${bookingId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (!res.ok) {
      return {
        error: true,
        message: 'Failed to fetch Qrcode details (network)',
      };
    }

    const dataResponse = await res.json();
    const convertedDataResponse = await convertUncheckedQrcodeList(
      dataResponse.data,
    );
    if (!dataResponse.success) {
      return {
        error: true,
        message: dataResponse.message || 'API responded with failure',
      };
    }

    return {
      error: false,
      data: convertedDataResponse,
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return {
      error: true,
      message: 'Unknown error occurred (exception)',
    };
  }
}
