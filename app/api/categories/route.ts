import { NextResponse } from 'next/server';

const API_URL = 'https://booking-app-s5m3.onrender.com/api/categories';

interface PostQueryParams {
  lang?: string;
}

export async function POST(req: Request) {
  try {
    const body: PostQueryParams = await req.json();

    const { lang } = body;

    // 🔹 Tạo query động
    const query = new URLSearchParams();

    if (lang) query.append('lang', lang);

    // 🔹 Gọi tới BE
    const res = await fetch(`${API_URL}?${query.toString()}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      // cache: 'no-store',
    });

    // 🔹 Nếu BE lỗi, trả nguyên response về FE
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return NextResponse.json(err, { status: res.status });
    }

    // 🔹 Trả đúng data BE trả ra (có success, message, data)
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Internal Server Error' },
      { status: 500 },
    );
  }
}
