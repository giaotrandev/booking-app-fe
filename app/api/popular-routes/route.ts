// app/api/routes/popular/route.ts
import { NextRequest, NextResponse } from 'next/server';

const BE_BASE_URL = 'https://booking-app-s5m3.onrender.com/api';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get('limit') || process.env.POPULAR_ROUTES_LIMIT;

    const res = await fetch(`${BE_BASE_URL}/routes/popular?limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to fetch popular routes',
          data: null,
        },
        { status: res.status },
      );
    }

    const data = await res.json();

    // Trả nguyên xi: success, message, data
    return NextResponse.json(data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching popular routes:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error fetching popular routes',
        data: null,
      },
      { status: 500 },
    );
  }
}
