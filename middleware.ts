// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

// Tạo middleware từ next-intl
const intlMiddleware = createMiddleware(routing);

// Các route không cần đăng nhập
const publicRoutes = ['/', '/login', '/register'];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locale = request.nextUrl.pathname.split('/')[1]; // lấy locale từ path

  // Xác định path gốc không bao gồm locale
  const pathWithoutLocale = pathname.replace(/^\/(de|en)/, '') || '/';

  // Cho phép vào các route public mà không cần đăng nhập
  if (publicRoutes.includes(pathWithoutLocale)) {
    return intlMiddleware(request);
  }
  // TODO: Tìm cách xử lý cookie để vào trang home khi đã có đăng nhập từ trước
  // // Kiểm tra token từ cookie
  // const token = request.cookies.get('token')?.value;

  // // if (!token) {
  // //   const loginUrl = new URL(`/${locale || 'en'}/login`, request.url);
  // //   return NextResponse.redirect(loginUrl);
  // // }

  // Nếu đã login thì tiếp tục xử lý bằng next-intl
  return intlMiddleware(request);
}

// Áp dụng middleware cho các route
export const config = {
  matcher: [
    '/',
    '/(de|en)/:path*', // locale paths
    '/((?!api|_next|_vercel|next|.*\\..*).*)', // exclude /api, static files
  ],
};


// import createMiddleware from 'next-intl/middleware';
// import { routing } from './i18n/routing';

// export default createMiddleware(routing);

// export const config = {
//   matcher: [
//     '/',
//     '/(de|en)/:path*', // locale paths
//     '/((?!api|_next|_vercel|next|.*\\..*).*)', // exclude /api
//   ],
// };
