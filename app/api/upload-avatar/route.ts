import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('at')?.value;

    if (!accessToken) {
      return NextResponse.json(null, { status: 401 });
    }
    const formData = await req.formData();
    const id = formData.get('id');
    const avatar = formData.get('avatar');

    if (!id || !(avatar instanceof File)) {
      return NextResponse.json(
        { success: false, message: 'Missing id or avatar file' },
        { status: 400 },
      );
    }

    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/users/avatar/${id}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`, // ✅ gửi token
        },
        body: formData,
      },
    );

    const data = await backendRes.json();

    return NextResponse.json(data, { status: backendRes.status });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: 'Internal server error', data: null },
      { status: 500 },
    );
  }
}
