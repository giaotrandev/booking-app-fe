import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('at')?.value;
    if (!accessToken) {
      return NextResponse.json(null, { status: 401 });
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };
    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/change-password`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      },
    );
    const data = await apiRes.json();
    const response = NextResponse.json(data, {
      status: apiRes.status,
    });
    return response;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error refreshing token:', error);
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
