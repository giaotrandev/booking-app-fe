'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
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

  async function checkToken() {
    setLoading(true);
    try {
      const result = await verifyTokenAction();
      console.log('reuslt', result);
      if (result.shouldRedirect) {
        console.log('do');
        clearAuth();
        router.replace('/'); // 👈 chỉ redirect trong 3 case đặc biệt
        return;
      }
      console.log('doooo');
      setTokenInfo(result);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('verifyTokenAction error:', err);
      // clearAuth();
      // router.replace('/');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkToken();
  }, []);

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
  //   if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  if (!ctx) {
    console.error('useAuth must be used inside <AuthProvider>');
    return { loading: false, tokenInfo: null, refetch: async () => {} };
  }
  return ctx;
}
