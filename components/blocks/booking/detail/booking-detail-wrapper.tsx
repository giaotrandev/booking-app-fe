'use client';

import { BookingSelectionProvider } from '#/context/booking/booking-selection-context';

import BookingDetailContent, {
  BookingDetailContentProps,
} from './booking-detail-content';
export interface BookingDetailWrapperProps extends BookingDetailContentProps {}

const BookingDetailWrapper = ({
  seatsLeft,
  decks,
  dropingList,
  pickingList,
}: BookingDetailWrapperProps) => {
  return (
    <BookingSelectionProvider>
      <BookingDetailContent
        seatsLeft={seatsLeft}
        decks={decks}
        dropingList={dropingList}
        pickingList={pickingList}
      />
    </BookingSelectionProvider>
  );
};

export { BookingDetailWrapper };
