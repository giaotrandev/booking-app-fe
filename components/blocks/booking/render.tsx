'use client';

import EmptyContent from '#/components/common/empty-content';
import FilterAccordion from '#/components/common/filter/filter-accordion-list';
import Loading from '#/components/common/loading';
import { Container } from '#/components/ui/container';
import {
  DropoffPointsRequestProps,
  PickUpPointRequestProps,
} from '#/services/trip/filter/bus-stop/bus-stop-request';
import NavigationBooking, {
  NavigationBookingProps,
} from '../../../layouts/home-layout/filter-trip/navigation-booking/item';
import { BookingListProps } from './list';
import { ListWrapper } from './list-wrapper';
import { Suspense } from 'react';
import { useTranslate } from '#/i18n/client';

export interface BookingRenderBlockProps extends NavigationBookingProps {
  bookingList?: BookingListProps['list'];
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  pickUpFilterList?: PickUpPointRequestProps[];
  dropOffFilterList?: DropoffPointsRequestProps[];
  isLoading?: boolean;
}

const BookingRenderBlock = ({
  arrivalList,
  destinationList,
  bookingList,
  pickUpFilterList,
  dropOffFilterList,
  isLoading,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: BookingRenderBlockProps) => {
  const { translate } = useTranslate();

  const availableList =
    bookingList?.filter(trip => (trip.seatsLeft ?? 0) > 0) ?? [];
  const isEmpty = !availableList?.length && !isLoading;

  return (
    <section>
      <Container>
        <div className="flex flex-col">
          {((Array.isArray(arrivalList) && arrivalList.length > 0) ||
            (Array.isArray(destinationList) && destinationList.length > 0)) && (
            <Suspense
              fallback={
                <div>
                  {translate({
                    vi: 'Đang tải bộ lọc...',
                    en: 'Loading filters...',
                  })}
                </div>
              }
            >
              <div className="mb-4 flex items-center justify-center">
                <NavigationBooking
                  arrivalList={arrivalList}
                  destinationList={destinationList}
                  className="px-0 pt-6 lg:p-0"
                  isInSpeacialLayout
                />
              </div>
            </Suspense>
          )}

          <div className="flex flex-col gap-y-8 lg:flex-row lg:gap-y-0">
            <div className="w-full lg:max-w-59.25">
              <div className="sticky top-[100px] left-0">
                <FilterAccordion
                  dropOffFilterList={dropOffFilterList}
                  pickUpFilterList={pickUpFilterList}
                />
              </div>
            </div>

            <div className="w-full flex-1 xl:pl-14">
              <div className="bg-pj-gray-lightest p-6">
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loading
                      content={translate({
                        vi: 'Đang tải những chuyến đi...',
                        en: 'Loading trips...',
                      })}
                    />
                  </div>
                ) : isEmpty ? (
                  <div className="rounded-xl bg-white py-4">
                    <EmptyContent />
                  </div>
                ) : (
                  <ListWrapper
                    list={availableList}
                    fetchNextPage={fetchNextPage}
                    hasNextPage={hasNextPage}
                    isFetchingNextPage={isFetchingNextPage}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export { BookingRenderBlock };
