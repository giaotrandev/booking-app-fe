import { Button } from '#/components/ui/button';
import { Typography } from '#/components/ui/typography';
import { useBookingSelection } from '#/context/booking/booking-selection-context';
import { cn } from '#/lib/utilities/cn';
import { useState } from 'react';
import { SeatList, SeatListProps } from './seat/seat-list';
import { TabDetailList } from './tab-navigation/tab-detail-list';

import { InformationRender } from './information/render';
import {
  PickingAndDropingList,
  PickingAndDropingListProps,
} from './picking-drop/picking-droping-list';
import { TripsRequestProps } from '#/services/trip/trips-request';
import { formatPrice } from '#/lib/utilities/format-price';
export interface BookingDetailContentProps
  extends Omit<TripsRequestProps, 'id'> {}
const BookingDetailContent = ({
  decks,
  dropingList,
  pickingList,
}: BookingDetailContentProps) => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const { selectedSeats, setIsSubmit, totalPrice, saveTotalPrice } =
    useBookingSelection();
  const isContinueDisabled = selectedSeats.length === 0;

  const handleActionButtonNext = () => {
    if (activeTab === 3) {
      setIsSubmit(true);
    }
    saveTotalPrice();
    setActiveTab(prev => Math.min(3, prev + 1));
  };
  return (
    <div>
      <div className="border-pj-grey-light border-y py-3 lg:px-12">
        <TabDetailList tabActive={activeTab} />
      </div>
      <div className="lg:px-12 lg:py-3">
        {Array.isArray(decks) && decks.length > 0 && (
          <div className={cn(activeTab === 1 ? 'block' : 'hidden')}>
            <SeatList decks={decks} />
          </div>
        )}
        {((Array.isArray(pickingList) && pickingList.length > 0) ||
          (Array.isArray(dropingList) && dropingList.length > 0)) && (
          <div className={cn(activeTab === 2 ? 'block' : 'hidden')}>
            <PickingAndDropingList
              dropingList={dropingList}
              pickingList={pickingList}
            />
          </div>
        )}
        {activeTab === 3 && <InformationRender />}
        <div className="mt-4 flex justify-between">
          <div
            className={cn(
              'transition-opacity',
              activeTab > 1 ? 'opacity-100' : 'pointer-events-none opacity-0',
            )}
          >
            <Button
              text="Back"
              variant="small"
              onClick={() => setActiveTab(prev => Math.max(1, prev - 1))}
            />
          </div>
          <div className="flex items-center gap-x-4">
            <Typography asChild className="font-medium">
              <p>{`Total: ${formatPrice(totalPrice)}`}</p>
            </Typography>
            <Button
              type={activeTab === 3 ? 'submit' : 'button'}
              text="Continue"
              variant="small"
              disabled={isContinueDisabled}
              onClick={handleActionButtonNext}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailContent;
