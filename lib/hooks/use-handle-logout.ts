'use client';

import { useToast } from '#/components/ui/use-toast';
import { usePathname, useRouter } from '#/i18n/routing';
import { useUserStore } from '#/store/user';
import { protectedRoutes } from '../constant';

export const useLogout = () => {
  const clearAuth = useUserStore(state => state.clearAuth);
  const router = useRouter();
  const pathname = usePathname();
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

      if (protectedRoutes.includes(pathname)) {
        router.push('/');
      }
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
