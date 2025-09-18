import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('at')?.value;
    // Chuẩn bị headers chung
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Nếu có token thì thêm Authorization
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/bookings/${id}/cancel`,
      {
        method: 'POST',
        headers,
      },
    );
    const data = await apiRes.json();
    const response = NextResponse.json(data, {
      status: apiRes.status,
    });
    return response;
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
