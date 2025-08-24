'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { LoadingPage } from '#/components/common/loading-page';

export function RouteLoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // bật loading khi pathname thay đổi
    setIsLoading(true);

    // tắt loading sau 300ms để tránh flicker
    const timeout = setTimeout(() => setIsLoading(false), 300);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <>
      {isLoading && <LoadingPage />}
      {children}
    </>
  );
}
