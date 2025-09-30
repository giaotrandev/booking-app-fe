import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers';

export async function GET() {
  try {
    // const cookieStore = await cookies();
    // const accessToken = cookieStore.get('at')?.value;

    // if (!accessToken) {
    //   return NextResponse.json(null, { status: 401 });
    // }

    // Kiểm tra environment variable
    if (!process.env.NEXT_PUBLIC_SITE_URL) {
      return NextResponse.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 },
      );
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/geo/provinces`,
      {
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${accessToken}`,
        },
        // next: { revalidate: 3600 }, // Cache 1 giờ
      },
    );

    if (!res.ok) {
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to fetch provinces from external API',
        },
        { status: res.status },
      );
    }

    const data = await res.json();

    // Validate data structure
    if (!data || typeof data !== 'object') {
      return NextResponse.json(
        { success: false, message: 'Invalid data received' },
        { status: 500 },
      );
    }

    return NextResponse.json(data.data || data, {
      status: 200,
      headers: {
        // 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        'Content-Type': 'application/json',
      },
    });
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
