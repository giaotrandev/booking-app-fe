'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { useIsMounted } from 'usehooks-ts';

import {
  verifyTokenAction,
  VerifyTokenResult,
} from '#/layouts/auth-layout/action/verify-token';
import { useUserStore } from '#/store/user';
import { usePathname, useRouter } from '#/i18n/routing';
import { PROTECTED_ROUTES } from '#/lib/constant';
// import { isProtectedRoute } from '#/lib/utilities/is-protected-route';
type AuthContextType = {
  loading: boolean;
  tokenInfo: VerifyTokenResult | null;
  refetch: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [tokenInfo, setTokenInfo] = useState<VerifyTokenResult | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname(); // 👈 thêm dòng này
  const { clearAuth } = useUserStore();
  const isMounted = useIsMounted();
  function isProtectedRoute(path: string) {
    const basePath = path.replace(/^\/(en|vi)/, '');
    return PROTECTED_ROUTES.some(route => basePath.startsWith(route));
  }
  async function checkToken() {
    setLoading(true);
    try {
      const res = await fetch('/api/verify-token', { credentials: 'include' });
      const result = await res.json();
      if (result.shouldRedirect) {
        clearAuth();
        if (isProtectedRoute(pathname)) {
          router.replace('/');
        }
        return;
      }

      setTokenInfo(result);
    } catch (err) {
      console.error('Error refreshing token:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isMounted()) checkToken();
  }, [isMounted, pathname]); // 👈 nếu đổi route thì re-check token

  return (
    <AuthContext.Provider
      value={{
        loading,
        tokenInfo,
        refetch: checkToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
// export function useAuth() {
//   const ctx = useContext(AuthContext);
//   // Nếu provider chưa mount, return giá trị tạm mà KHÔNG log lỗi
//   return ctx ?? { loading: true, tokenInfo: null, refetch: async () => {} };
// }
