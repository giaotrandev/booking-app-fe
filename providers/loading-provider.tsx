'use client';

import { useEffect, useState } from 'react';
import { LoadingPage } from '#/components/common/loading-page';
import { usePathname } from '#/i18n/routing';

export function RouteLoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

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
