// // middleware.ts
// import createMiddleware from 'next-intl/middleware';
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { routing } from './i18n/routing';

// const intlMiddleware = createMiddleware(routing);

// // atob fallback (Edge runtime có atob; Node có Buffer)
// const atobSafe = (s: string) => {
//   if (typeof atob === 'function') return atob(s);
//   if (typeof Buffer !== 'undefined')
//     return Buffer.from(s, 'base64').toString('binary');
//   throw new Error('No base64 decoder available');
// };

// function isTokenExpired(token: string): boolean | 'invalid' {
//   try {
//     const parts = token.split('.');
//     if (parts.length !== 3) return 'invalid';
//     // payload base64url -> base64
//     let payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
//     while (payload.length % 4) payload += '=';
//     const decoded = atobSafe(payload);
//     const obj = JSON.parse(decoded);
//     const exp = obj?.exp;
//     if (typeof exp !== 'number') return 'invalid';
//     const now = Math.floor(Date.now() / 1000);
//     return now >= exp; // true = expired, false = still valid
//   } catch (err) {
//     // eslint-disable-next-line no-console
//     console.error('Error refreshing token:', err);
//     return 'invalid';
//   }
// }

// export default function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   const accessToken = request.cookies.get('at')?.value ?? null;

//   const protectedRoutes = [
//     '/login',
//     '/register',
//     '/forgot-password',
//     '/verify-email',
//   ];

//   // loại bỏ locale ở đầu nếu có (an toàn hơn cho các trường hợp /en và /en/...)
//   const basePath = pathname.replace(/^\/(en|vi)(?=\/|$)/, '');

//   // Chỉ redirect khi có accessToken _và_ token còn hạn (isTokenExpired === false)
//   const atValid = accessToken && isTokenExpired(accessToken) === false;

//   if (protectedRoutes.includes(basePath) && atValid) {
//     return NextResponse.redirect(new URL('/', request.url));
//   }

//   // nếu truy cập đúng /en hoặc /vi thì chuyển về /
//   if (pathname === '/en' || pathname === '/vi') {
//     return NextResponse.redirect(new URL('/', request.url));
//   }

//   return intlMiddleware(request);
// }

// export const config = {
//   matcher: ['/', '/(en|vi)/:path*', '/((?!api|_next|_vercel|next|.*\\..*).*)'],
// };
// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

// --- Optional helper (chỉ cần nếu bạn có logic token) ---
const atobSafe = (s: string) => {
  if (typeof atob === 'function') return atob(s);
  if (typeof Buffer !== 'undefined')
    return Buffer.from(s, 'base64').toString('binary');
  throw new Error('No base64 decoder available');
};

function isTokenExpired(token: string): boolean | 'invalid' {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return 'invalid';
    let payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    while (payload.length % 4) payload += '=';
    const decoded = atobSafe(payload);
    const obj = JSON.parse(decoded);
    const exp = obj?.exp;
    if (typeof exp !== 'number') return 'invalid';
    const now = Math.floor(Date.now() / 1000);
    return now >= exp;
  } catch {
    return 'invalid';
  }
}

export default function middleware(request: NextRequest) {
  const token = request.cookies.get('at')?.value ?? null;
  const guestOnlyRoutes = [
    '/login',
    '/register',
    '/forgot-password',
    '/verify-email',
  ];

  const { pathname, searchParams } = request.nextUrl;

  const localeMatch = pathname.match(/^\/(en|vi)(?=\/|$)/);
  const locale = localeMatch ? localeMatch[1] : 'en';
  const tokenValid = token && isTokenExpired(token) === false;

  const basePath = pathname.replace(/^\/(en|vi)/, '');

  if (guestOnlyRoutes.some(route => basePath.startsWith(route)) && tokenValid) {
    const callbackUrl = searchParams.get('callbackUrl');
    if (callbackUrl) {
      return NextResponse.redirect(
        new URL(callbackUrl, request.nextUrl.origin),
      );
    }
    return NextResponse.redirect(new URL(`/${locale}`, request.nextUrl.origin));
  }
  // ✅ Gọi next-intl middleware để xử lý locale
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/',
    '/(vi|en)/:path*', // SETUP - Multi Languages: Add/remove list of locale here
    '/((?!api|_next|_vercel|next|.*\\..*).*)',
  ],
};

// ✅ Không cần matcher phức tạp — next-intl đã xử lý đủ:
// export const config = {
//   matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
// };
// const accessToken = request.cookies.get('at')?.value ?? null;

// // ✅ Danh sách route dành cho guest (user chưa login)
// const guestOnlyRoutes = [
//   '/login',
//   '/register',
//   '/forgot-password',
//   '/verify-email',
// ];

// const { pathname } = request.nextUrl;
// const basePath = pathname.replace(/^\/(en|vi)(?=\/|$)/, ''); // strip locale

// const isGuestOnly = guestOnlyRoutes.includes(basePath);
// const tokenValid = accessToken && isTokenExpired(accessToken) === false;

// // Nếu user đã login → chặn vào login/register/... (redirect về /)
// if (isGuestOnly && tokenValid) {
//   return NextResponse.redirect(new URL('/', request.url));
// }
