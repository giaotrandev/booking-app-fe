import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/tickets/pdf`,
      {
        method: 'GET',
      },
    );
    if (!res.ok) throw new Error('Failed to print ticket');

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error refreshing token:', error);
    return NextResponse.json(
      { message: 'Error fetching print ticket' },
      { status: 500 },
    );
  }
}
