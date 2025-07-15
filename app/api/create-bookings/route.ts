import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const apiRes = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/bookings`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );

    const data = await apiRes.json();
    console.log('data', data);
    const response = NextResponse.json(data, {
      status: apiRes.status,
    });
    console.log('req', response);
    return response;
  } catch (error) {
    console.error('[API /api/login] Internal Server Error:', error);
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
