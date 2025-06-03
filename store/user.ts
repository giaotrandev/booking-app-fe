'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
};

type AuthState = {
  user: User | null;
  isLoggedIn: boolean;
  rememberMe?: boolean;
};

type Actions = {
  setAuth: (payload: { user: User; rememberMe?: boolean }) => void;
  clearAuth: () => void;
};

const useUserStore = create<AuthState & Actions>()(
  persist(
    set => ({
      user: null,
      accessToken: null,
      isLoggedIn: false,

      setAuth: ({ user, rememberMe }) => {
        set(() => ({
          user,
          isLoggedIn: true,
          rememberMe,
        }));
      },

      clearAuth: () =>
        set(() => ({
          user: null,
          isLoggedIn: false,
        })),
    }),
    {
      name: 'user-store',
      partialize: state => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        rememberMe: state.rememberMe,
      }),
    },
  ),
);

export { useUserStore };
