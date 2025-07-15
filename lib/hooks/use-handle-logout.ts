'use client';

import { useRouter } from 'next/navigation';
import { useToast } from '#/components/ui/use-toast';
import { useUserStore } from '#/store/user';

/**
 * Custom hook để tái sử dụng logic logout
 */
export const useLogout = () => {
  const clearAuth = useUserStore(state => state.clearAuth);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      if (!res.ok) {
        toast({
          title: 'Logout failed',
          description: data.message || 'Unable to logout.',
          variant: 'error',
        });
        return;
      }

      clearAuth();
      toast({
        title: 'Logged out',
        description: data.message || 'You have been successfully logged out.',
        variant: 'success',
      });

      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: 'Logout failed',
        description: 'Something went wrong.',
        variant: 'error',
      });
    }
  };

  return { handleLogout };
};
