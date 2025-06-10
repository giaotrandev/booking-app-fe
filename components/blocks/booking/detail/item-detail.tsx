'use client';
import { cn } from '#/lib/utilities/cn';
import { useGlobalsStore } from '#/store/globals';
import { SeatList } from './seat/seat-list';
import { TabDetailList } from './tab-navigation/tab-detail-list';

export interface BookingDetailItemProps {}
const BookingDetailItem = () => {
  const tabActive = useGlobalsStore(state => state.tabBookingActive);

  return (
    <div>
      <div className="border-pj-grey-light border-y py-3 lg:px-16">
        <TabDetailList />
      </div>
      <div className="lg:px-16 lg:py-10">
        <div
          className={cn(
            'opacity-0 transition-opacity',
            tabActive === 1 && 'opacity-100',
          )}
        >
          <SeatList />
        </div>
      </div>
    </div>
  );
};

export { BookingDetailItem };
