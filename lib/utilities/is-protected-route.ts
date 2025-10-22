// constants/protected-routes.ts

import { PROTECTED_ROUTES } from '../constant';
/**
 * Kiểm tra xem 1 pathname hiện tại có nằm trong route yêu cầu đăng nhập không.
 * Hỗ trợ cả đa ngôn ngữ: /vi/my-account, /en/my-account,...
 */
export function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some(route => pathname.includes(route));
}
