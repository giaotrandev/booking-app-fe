'use client';

import { SocketProvider } from '#/providers/socket-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense, useState } from 'react';
import BookingBlock from '.';

const WrapperBookingBlock = () => {
  const [queryClient] = useState(() => new QueryClient());

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
