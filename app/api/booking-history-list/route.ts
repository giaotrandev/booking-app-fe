import { defaultPage, pageSize } from '#/lib/constant';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      startDate,
      endDate,
      tripDepartureStart,
      tripDepartureEnd,
      tripArrivalStart,
      tripArrivalEnd,
      status,
      page = defaultPage,
    } = body;
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('at')?.value;
    if (!accessToken) {
      return NextResponse.json(null, { status: 401 });
    }

    if (!process.env.NEXT_PUBLIC_SITE_URL) {
      return NextResponse.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 },
      );
    }

    const beUrl = new URL(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/bookings/my-bookings`,
    );
    beUrl.searchParams.set('view', 'history');
    beUrl.searchParams.set('pageSize', pageSize);
    beUrl.searchParams.set('page', page);
    const optionalParams = {
      startDate,
      endDate,
      tripDepartureStart,
      tripDepartureEnd,
      tripArrivalStart,
      tripArrivalEnd,
      status,
    };
    Object.entries(optionalParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        beUrl.searchParams.set(key, value);
      }
    });
    const res = await fetch(beUrl.toString(), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await res.json();

    // Nếu BE trả về success = false thì trả lỗi thẳng về FE
    if (!data?.success) {
      return NextResponse.json(
        {
          success: false,
          message: data?.message || 'Failed to fetch booking history',
          data: null,
        },
        { status: res.status || 500 },
      );
    }

    // Nếu success = true => trả data
    return NextResponse.json(
      {
        success: true,
        message: data.message,
        data: data.data,
      },
      { status: 200 },
    );
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
