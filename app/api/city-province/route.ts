import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('at')?.value;

    if (!accessToken) {
      return NextResponse.json(null, { status: 401 });
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/geo/provinces`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    if (!res.ok) {
      return NextResponse.json(null, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data.data, { status: 200 });
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
