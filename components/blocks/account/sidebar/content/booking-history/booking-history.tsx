'use client';

import { BookingHistoryItem } from './booking-history-item';
import { IntroductionContent } from '../introduction-content';
import { useBookingHistory } from '#/lib/hooks/use-history-booking-list';
import { useHistoryBookingStore } from '#/store/history-booking-store';
import { useCallback, useEffect, useRef } from 'react';
import Loading from '#/components/common/loading';
import { useTranslate } from '#/i18n/client'; // 👈 thêm hook i18n client

interface BookingHistoryBlockProps {}

export const BookingHistoryBlock = ({}: BookingHistoryBlockProps) => {
  const { translate } = useTranslate(); // 👈 dùng translate client-side
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useBookingHistory({});
  const { bookings, setBookings } = useHistoryBookingStore();
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (data?.pages) {
      const merged = data.pages.flatMap(page => page.bookings);
      const uniqueBookings = Array.from(
        new Map(merged.map(item => [item.id, item])).values(),
      );
      setBookings(uniqueBookings);
    }
  }, [data, setBookings]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage?.();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0,
    });

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [handleObserver]);

  return (
    <div>
      <div className="flex flex-col gap-y-4">
        <IntroductionContent
          title={translate({
            vi: 'Cài đặt cá nhân',
            en: 'Personal Settings',
          })}
          description={translate({
            vi: 'Đơn đặt vé của tôi',
            en: 'My booking',
          })}
        />

        {Array.isArray(bookings) && bookings.length > 0 && (
          <div className="flex flex-col gap-y-4 lg:gap-y-3">
            {bookings.map(item => (
              <div key={item.id}>
                <BookingHistoryItem {...item} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Intersection observer target */}
      <div ref={loaderRef} className="h-px" />

      {hasNextPage && isFetchingNextPage && (
        <div className="flex justify-center">
          <Loading
            content={translate({
              vi: 'Đang tải thêm lịch sử đặt vé...',
              en: 'Loading more booking history list...',
            })}
          />
        </div>
      )}
    </div>
  );
};
