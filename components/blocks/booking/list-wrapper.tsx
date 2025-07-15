'use client';
import { BookingSelectionProvider } from '#/context/booking/booking-selection-context';
import { BookingList, BookingListProps } from './list';
import { BookingRenderBlockProps } from './render';

interface ListWrapperProps
  extends BookingListProps,
    Pick<
      BookingRenderBlockProps,
      'fetchNextPage' | 'isFetchingNextPage' | 'hasNextPage'
    > {}

const ListWrapper = ({
  list,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
}: ListWrapperProps) => {
  if (!(Array.isArray(list) && list.length > 0)) return null;
  return (
    <BookingSelectionProvider>
      <BookingList
        list={list}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </BookingSelectionProvider>
  );
};

export { ListWrapper };
