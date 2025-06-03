import { parseSetCookie } from '#/lib/utilities/parse-cookies';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const res = await fetch(
      'https://booking-app-s5m3.onrender.com/api/auth/login',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      },
    );

    const data = await res.json();

    const response = NextResponse.json(data, { status: res.status });

    if (!response.ok) {
      return response;
    }

    const setCookieHeader = res.headers.get('set-cookie');
    if (setCookieHeader) {
      const cookies = setCookieHeader.split(',').map(cookie => cookie.trim());
      cookies.forEach(cookie => {
        response.headers.append('Set-Cookie', cookie);
      });
    }

    return response;
    // return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.log('Lỗi: ', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
        data: null,
      },
      { status: 500 },
    );
  }
}
// const response = NextResponse.json({
//       success: true,
//       user: backendData.user,
//     });

//     // Forward tất cả headers từ backendResponse
//     backendResponse.headers.forEach((value, key) => {
//       response.headers.set(key, value);
//     });
