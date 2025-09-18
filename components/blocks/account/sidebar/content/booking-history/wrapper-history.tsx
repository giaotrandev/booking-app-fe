'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense, useState } from 'react';
import { BookingHistoryBlock } from './booking-history';

const WrapperBookingHistoryBlock = () => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense>
        <BookingHistoryBlock />
      </Suspense>
    </QueryClientProvider>
  );
};

export { WrapperBookingHistoryBlock };
