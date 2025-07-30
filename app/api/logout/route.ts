import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('at')?.value;
    const refreshToken = cookieStore.get('rt')?.value;
    if (!accessToken) {
      return NextResponse.json(
        {
          success: false,
          message: 'Unauthorized: No access token',
          data: null,
        },
        { status: 401 },
      );
    }

    // Tạo header Cookie thủ công
    const cookieHeader = [
      `at=${accessToken}`,
      refreshToken ? `rt=${refreshToken}` : '',
    ]
      .filter(Boolean)
      .join('; ');

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/logout`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieHeader, // 👈 Gửi cookie lên backend
        },
      },
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }
    cookieStore.delete('at');
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
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
