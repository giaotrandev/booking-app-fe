import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    console.log('🔥 API /api/login called');
    const body = await req.json();
    console.log(body)
    const res = await fetch('https://booking-app-s5m3.onrender.com/api/auth/login?lang=vi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data?.message || 'Login failed' }, { status: 401 });
    }

    // Trả về response cho FE
    return NextResponse.json({ success: true, user: data.data });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }

}
