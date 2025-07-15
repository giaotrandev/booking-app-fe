import { defaultPage, pageSize } from '#/lib/constant';
import { NextRequest, NextResponse } from 'next/server';

const BE_BASE_URL = 'https://booking-app-s5m3.onrender.com/api';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const sourceProvinceId = searchParams.get('sourceProvinceId');
  const destinationProvinceId = searchParams.get('destinationProvinceId');
  const departureDate = searchParams.get('departureDate');
  const arrivalDate = searchParams.get('arrivalDate');
  const page = searchParams.get('page') ?? defaultPage;

  if (!sourceProvinceId || !destinationProvinceId || !departureDate) {
    return NextResponse.json(
      { message: 'Missing required query parameters' },
      { status: 400 },
    );
  }

  try {
    const beUrl = new URL(`${BE_BASE_URL}/trips`);
    beUrl.searchParams.set('sourceProvinceId', sourceProvinceId);
    beUrl.searchParams.set('destinationProvinceId', destinationProvinceId);
    beUrl.searchParams.set('departureDate', departureDate);
    if (arrivalDate) {
      beUrl.searchParams.set('arrivalDate', arrivalDate);
    }
    // Moi them vo
    beUrl.searchParams.set('pageSize', pageSize);
    beUrl.searchParams.set('page', page);

    const response = await fetch(beUrl.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 300 },
    });
    if (!response.ok) {
      const text = await response.text();
      console.error('Failed to fetch from BE:', response.status, text);
      return NextResponse.json(
        { message: 'Failed to fetch data from backend' },
        { status: response.status },
      );
    }

    const data = await response.json();
    if (!data || typeof data !== 'object') {
      console.error('Invalid data structure received from backend');
      return NextResponse.json(
        { success: false, message: 'Invalid data received from backend' },
        { status: 500 },
      );
    }

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Internal server error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
