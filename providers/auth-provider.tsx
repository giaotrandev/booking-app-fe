'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { useIsMounted } from 'usehooks-ts';

import {
  verifyTokenAction,
  VerifyTokenResult,
} from '#/layouts/auth-layout/actions/verify-token';
import { useUserStore } from '#/store/user';
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
  const { clearAuth } = useUserStore();
  const isMounted = useIsMounted();

  async function checkToken() {
    setLoading(true);
    try {
      const result = await verifyTokenAction();
      if (result.shouldRedirect) {
        clearAuth();
        router.replace('/'); // 👈 chỉ redirect trong 3 case đặc biệt
        return;
      }
      setTokenInfo(result);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error refreshing token:', err);
      // eslint-disable-next-line no-console
      // console.error('verifyTokenAction error:', err);
      // clearAuth();
      // router.replace('/');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isMounted()) checkToken(); // 👈 chỉ chạy sau khi mount hoàn tất
  }, [isMounted]);

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
export function useAuth() {
  const ctx = useContext(AuthContext);
  // Nếu provider chưa mount, return giá trị tạm mà KHÔNG log lỗi
  return ctx ?? { loading: true, tokenInfo: null, refetch: async () => {} };
}
