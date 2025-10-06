// app/api/verify-email/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');
  if (!token) {
    return NextResponse.json(
      { success: false, message: 'Missing token.' },
      { status: 400 },
    );
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/verify-email/${token}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      },
    );
    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error refreshing token:', err);
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
