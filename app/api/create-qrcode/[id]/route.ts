import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/bookings/${id}/payment/qr-code`,
    );
    if (!res.ok) throw new Error('Failed to create qr code');

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error create qr code' },
      { status: 500 },
    );
  }
}
