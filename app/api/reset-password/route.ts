// app/api/verify-email/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const body = await req.json(); // Gọi 1 lần duy nhất
  const { token } = body;

  if (!token) {
    return NextResponse.json(
      { success: false, message: 'Missing token.' },
      { status: 400 },
    );
  }
  try {
    const res = await fetch(`${baseUrl}/api/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
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
