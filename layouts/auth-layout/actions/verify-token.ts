'use server';

import { cookies } from 'next/headers';

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

export type VerifyTokenResult = {
  valid: boolean;
  expired: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  shouldRedirect?: boolean; // 👈 flag để provider xử lý
};

export async function verifyTokenAction(): Promise<VerifyTokenResult> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('at')?.value ?? null;
  const refreshToken = cookieStore.get('rt')?.value ?? null;

  const isDev = process.env.NODE_ENV === 'development';
  const baseURL = isDev ? 'http://localhost:3000' : process.env.NEXT_BASE_URL!;

  // ❌ Không có AT và cũng không có RT → về home
  if (!accessToken && !refreshToken) {
    return {
      valid: false,
      expired: true,
      accessToken: null,
      refreshToken: null,
      shouldRedirect: true,
    };
  }

  const atStatus = accessToken ? isTokenExpired(accessToken) : true;
  // ✅ Nếu AT còn sống → ok
  if (atStatus === false) {
    return {
      valid: true,
      expired: false,
      accessToken,
      refreshToken,
    };
  }

  // 🔄 Nếu AT hỏng/hết hạn nhưng có RT → thử refresh
  if (refreshToken) {
    try {
      const res = await fetch(`${baseURL}/api/refresh-access-token`, {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `rt=${refreshToken}`,
        },
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        const newAt = data?.accessToken;
        if (newAt) {
          // Lưu cookie AT mới
          cookieStore.set('at', newAt, {
            httpOnly: true,
            secure: !isDev,
            sameSite: 'lax',
          });
          return {
            valid: true,
            expired: false,
            accessToken: newAt,
            refreshToken,
          };
        }
      }

      // 👇 Trường hợp 3: refresh thất bại
      return {
        valid: false,
        expired: true,
        accessToken: null,
        refreshToken,
        shouldRedirect: true,
      };
    } catch (err) {
      return {
        valid: false,
        expired: true,
        accessToken: null,
        refreshToken,
        shouldRedirect: true,
      };
    }
  }

  // 👉 AT hết hạn, không có RT → cũng phải redirect
  return {
    valid: false,
    expired: true,
    accessToken: null,
    refreshToken,
    shouldRedirect: true,
  };
}
