import { NextRequest, NextResponse } from 'next/server';

const BE_BASE_URL = 'https://booking-app-s5m3.onrender.com/api';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const res = await fetch(`${BE_BASE_URL}/trips/details/${id}`);
    if (!res.ok) throw new Error('Failed to fetch trip details');

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error refreshing token:', error);
    return NextResponse.json(
      { message: 'Error fetching trip details' },
      { status: 500 },
    );
  }
}
