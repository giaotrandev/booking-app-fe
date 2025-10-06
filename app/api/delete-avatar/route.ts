import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function DELETE(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('at')?.value;

    if (!accessToken) {
      return NextResponse.json(null, { status: 401 });
    }
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Missing id ' },
        { status: 400 },
      );
    }

    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/users/avatar/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        // body: formData,
      },
    );

    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error refreshing token:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error', data: null },
      { status: 500 },
    );
  }
}
