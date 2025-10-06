import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/bookings/${id}`,
    );
    if (!res.ok) throw new Error('Failed to fetch booking details');

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error refreshing token:', error);
    return NextResponse.json(
      { message: 'Error fetching booking details' },
      { status: 500 },
    );
  }
}
