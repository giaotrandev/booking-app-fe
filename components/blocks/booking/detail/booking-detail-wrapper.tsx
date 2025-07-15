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
  id,
}: BookingDetailWrapperProps) => {
  return (
    // <BookingSelectionProvider>
    <BookingDetailContent
      id={id}
      seatsLeft={seatsLeft}
      decks={decks}
      dropingList={dropingList}
      pickingList={pickingList}
    />
    // </BookingSelectionProvider>
  );
};

export { BookingDetailWrapper };
