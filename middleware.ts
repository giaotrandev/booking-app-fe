// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

// Xử lý request với locale
export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locale = request.nextUrl.pathname.split('/')[1]; // lấy locale từ path

  // Loại bỏ locale khỏi pathname
  const pathWithoutLocale = pathname.replace(/^\/(de|en)/, '') || '/';

  // Kiểm tra các routes công khai
  const publicRoutes = ['/', '/login', '/register'];

  // Chỉ áp dụng middleware cho các route yêu cầu localization
  if (publicRoutes.includes(pathWithoutLocale)) {
    return intlMiddleware(request);
  }

  // Nếu không phải route công khai, tiếp tục xử lý middleware
  return intlMiddleware(request);
}

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
