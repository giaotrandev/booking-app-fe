// app/api/trips/route.ts
import { defaultPage, pageSize } from '#/lib/constant';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      sourceProvinceId,
      destinationProvinceId,
      departureDate,
      arrivalDate,
      pickupStopIds,
      dropoffStopIds,
      minPrice,
      maxPrice,
      minTime,
      maxTime,
      page = defaultPage,
    } = body;

    if (!sourceProvinceId || !destinationProvinceId || !departureDate) {
      return NextResponse.json(
        { message: 'Missing required parameters' },
        { status: 400 },
      );
    }

    const beUrl = new URL(`${process.env.NEXT_PUBLIC_SITE_URL}/api/trips`);
    beUrl.searchParams.set('sourceProvinceId', sourceProvinceId);
    beUrl.searchParams.set('destinationProvinceId', destinationProvinceId);
    beUrl.searchParams.set('departureDate', departureDate);
    if (arrivalDate) {
      beUrl.searchParams.set('arrivalDate', arrivalDate);
    }
    beUrl.searchParams.set('pageSize', pageSize);
    beUrl.searchParams.set('page', page);

    const optionalParams = {
      pickupStopIds,
      dropoffStopIds,
      minPrice,
      maxPrice,
      maxTime,
      minTime,
    };
    Object.entries(optionalParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        beUrl.searchParams.set(key, value);
      }
    });
    const response = await fetch(beUrl.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: 'Failed to fetch data from backend' },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error refreshing token:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
