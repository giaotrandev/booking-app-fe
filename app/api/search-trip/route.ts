import { NextRequest, NextResponse } from 'next/server';

const BE_BASE_URL = 'https://booking-app-s5m3.onrender.com/api';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const sourceProvinceId = searchParams.get('sourceProvinceId');
  const destinationProvinceId = searchParams.get('destinationProvinceId');
  const departureDate = searchParams.get('departureDate');
  const returnDate = searchParams.get('returnDate');

  if (!sourceProvinceId || !destinationProvinceId || !departureDate) {
    return NextResponse.json(
      { message: 'Missing required query parameters' },
      { status: 400 },
    );
  }

  try {
    const beUrl = new URL(`${BE_BASE_URL}/trips/search`);
    beUrl.searchParams.set('sourceProvinceId', sourceProvinceId);
    beUrl.searchParams.set('destinationProvinceId', destinationProvinceId);
    beUrl.searchParams.set('departureDate', departureDate);
    if (returnDate) {
      beUrl.searchParams.set('returnDate', returnDate);
    }

    const response = await fetch(beUrl.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
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
    return NextResponse.json(data);
  } catch (error) {
    console.error('Internal server error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
