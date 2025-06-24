'use server';

import { cookies } from 'next/headers';

function isTokenExpired(token: string): boolean {
  try {
    const payloadBase64 = token.split('.')[1];
    const decodedPayload = JSON.parse(
      Buffer.from(payloadBase64, 'base64').toString(),
    );
    const exp = decodedPayload.exp;
    const now = Math.floor(Date.now() / 1000);
    return now >= exp;
  } catch (error) {
    console.error('Token decode error:', error);
    return true;
  }
}

const verifyTokenAction = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('at')?.value;
  const refreshToken = cookieStore.get('rt')?.value;

  if (!accessToken) {
    return { valid: false, reason: 'No access token' };
  }

  const expired = isTokenExpired(accessToken);

  return {
    valid: !expired,
    expired,
    accessToken,
    refreshToken,
  };
};

export { verifyTokenAction };
