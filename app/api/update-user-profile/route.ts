import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    const cookieStore = await cookies();
    const accessToken = cookieStore.get('at')?.value;
    if (!accessToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/users/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body),
      },
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal server error', data: null },
      { status: 500 },
    );
  }
}
