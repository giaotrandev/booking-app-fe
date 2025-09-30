import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('rt')?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { success: false, message: 'No refresh token found' },
      { status: 401 },
    );
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `rt=${refreshToken}`,
      },
      credentials: 'include',
      cache: 'no-store',
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    // ✅ Tạo response 1 lần duy nhất
    const response = NextResponse.json(
      {
        success: true,
        ...data,
      },
      { status: 200 },
    );

    // ✅ Forward cookie từ BE → Browser
    const setCookieHeader = res.headers.get('set-cookie');
    let accessToken: string | null = null;

    if (setCookieHeader) {
      const cookiesRes = setCookieHeader.split(/,(?=\s*\w+=)/);
      cookiesRes.forEach(cookie => {
        response.headers.append('Set-Cookie', cookie.trim());

        // 👉 Lấy value của at
        if (cookie.trim().startsWith('at=')) {
          accessToken = cookie.trim().split(';')[0].split('=')[1];
        }
      });

      console.log('cookiesRes', cookiesRes);
    }

    // ⚡️ Gắn accessToken vào payload trả về
    return NextResponse.json(
      {
        success: true,
        ...data,
        accessToken, // 👈 thêm giá trị AT
      },
      { status: 200, headers: response.headers },
    );
  } catch (err) {
    console.error('Error refreshing token:', err);
    return NextResponse.json(
      { success: false, message: 'Error refreshing token' },
      { status: 500 },
    );
  }
}
