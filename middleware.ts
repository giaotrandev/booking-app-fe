import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locale = pathname.split('/')[1];
  const accessToken = request.cookies.get('at')?.value;

  const protectedRoutes = [
    '/login',
    '/register',
    '/forgot-password',
    '/verify-email',
  ];

  // Xử lý route bắt đầu bằng locale (bỏ /en hoặc /vi để so sánh)
  const basePath = pathname.replace(/^\/(en|vi)/, '');

  // Redirect người đã đăng nhập tránh truy cập các route /login, /register...
  if (protectedRoutes.includes(basePath) && !!accessToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Nếu truy cập trực tiếp vào /en hoặc /vi (không path cụ thể), chuyển về /
  if (pathname === '/en' || pathname === '/vi') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(en|vi)/:path*', '/((?!api|_next|_vercel|next|.*\\..*).*)'],
};
