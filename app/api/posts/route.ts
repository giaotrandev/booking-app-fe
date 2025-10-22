import { NextResponse } from 'next/server';

const API_URL = 'https://booking-app-s5m3.onrender.com/api/posts';

interface PostQueryParams {
  page?: number;
  limit?: number;
  categoryId?: string;
  tagId?: string;
  status?: string;
  search?: string;
  lang?: string;
}

export async function POST(req: Request) {
  try {
    const body: PostQueryParams = await req.json();

    const {
      page = 1,
      limit = 10,
      categoryId,
      tagId,
      status,
      search,
      lang,
    } = body;

    // 🔹 Tạo query động
    const query = new URLSearchParams();
    query.append('page', String(page));
    query.append('limit', String(limit));

    if (categoryId) query.append('categoryId', categoryId);
    if (tagId) query.append('tagId', tagId);
    if (status) query.append('status', status);
    if (search) query.append('search', search);
    if (lang) query.append('lang', lang);

    // 🔹 Gọi tới BE
    const res = await fetch(`${API_URL}?${query.toString()}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
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
