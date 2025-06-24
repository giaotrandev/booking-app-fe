// app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const res = await fetch(
      'https://booking-app-s5m3.onrender.com/api/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body),
      },
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    const response = NextResponse.json(data, { status: 200 });
    // Handle cookies
    const setCookieHeader = res.headers.get('set-cookie');
    if (setCookieHeader) {
      // Bước 1: split thành từng cookie (giữ nguyên các phần tử ; bên trong mỗi cookie)
      const cookiesRes = setCookieHeader.split(/,(?=\s*\w+=)/); // tách theo dấu "," nhưng chỉ nếu sau đó là key= (tránh split nhầm trong giá trị cookie)
      // Bước 2: thêm từng cookie vào response header
      cookiesRes.forEach(cookie => {
        response.headers.append('Set-Cookie', cookie.trim());
      });
    }

    return response;
  } catch (error) {
    console.error('Login API error:', error);
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
