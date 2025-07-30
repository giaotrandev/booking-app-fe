'use client';

import { SocketProvider } from '#/providers/socket-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense, useEffect, useState } from 'react';
import BookingBlock from '.';
import { useFilterStore } from '#/store/filter-store';

const WrapperBookingBlock = () => {
  const [queryClient] = useState(() => new QueryClient());
  const resetFilters = useFilterStore(state => state.resetFilters);
  useEffect(() => {
    return () => {
      resetFilters();
    };
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <SocketProvider>
        <Suspense>
          <BookingBlock />
        </Suspense>
      </SocketProvider>
    </QueryClientProvider>
  );
};

export { WrapperBookingBlock };
