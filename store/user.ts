'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
type Permission = {
  code: string;
  name: string;
};

type Role = {
  name: string;
  permissions: Permission[];
};

type User = {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  role?: Role; // giữ nguyên object
  avatar?: string | null;
  previewAvatar?: string | null;
  phoneNumber?: string;
  birthday?: string;
  gender?: 'MALE' | 'FEMALE';
  address?: string;
  avatarUrl?: string;
  name: string;
};

type AuthState = {
  user: User | null;
  isLoggedIn: boolean;
  rememberMe?: boolean;
};

type Actions = {
  setAuth: (payload: { user: User; rememberMe?: boolean }) => void;
  clearAuth: () => void;
  setPreviewAvatar: (url: string | null) => void;
  setUser: (userPartial: Partial<User>) => void; // Action mới để cập nhật user một phần
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

      setPreviewAvatar: url => {
        set(state => {
          if (!state.user) return state;
          return {
            user: { ...state.user, previewAvatar: url },
          };
        });
      },

      setUser: userPartial => {
        set(state => {
          if (!state.user) return state;
          return {
            user: { ...state.user, ...userPartial },
          };
        });
      },
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
