'use server';

import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

function verifyJwt(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!); // <-- verify chữ ký
  } catch {
    return null;
  }
}
function isTokenExpired(token: string): boolean | 'invalid' {
  try {
    const payloadBase64 = token.split('.')[1];
    const decodedPayload = JSON.parse(
      Buffer.from(payloadBase64, 'base64').toString(),
    );
    const exp = decodedPayload.exp;
    const now = Math.floor(Date.now() / 1000);
    return now >= exp;
  } catch {
    return 'invalid';
  }
}

const verifyTokenAction = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('at')?.value;
  const refreshToken = cookieStore.get('rt')?.value;
  console.log('Access Token:', accessToken);
  console.log('Refresh Token:', refreshToken);
  if (!accessToken) {
    return { valid: false, reason: 'No access token' };
  }

  const expired = isTokenExpired(accessToken);
  console.log('Is Token Expired:', expired);
  if (expired === 'invalid') {
    return { valid: false, reason: 'Invalid token' };
  }

  return {
    valid: !expired,
    expired: expired === true,
    accessToken,
    refreshToken,
  };
};

export { verifyTokenAction };
