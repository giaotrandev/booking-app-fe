import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    '/',
    '/(de|en)/:path*', // SETUP - Multi Languages: Add/remove list of locale here
    // '/((?!_next|_vercel|next|.*\\..*).*)',
    '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
  ],
};
