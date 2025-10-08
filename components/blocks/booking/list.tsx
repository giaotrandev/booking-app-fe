'use client';
import { useCallback, useEffect, useState, useRef } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '#/components/headless/accordion';
import Image from 'next/image';
import { blurDataUrl } from '#/lib/constant';
import { formatPrice } from '#/lib/utilities/format-price';
import { Typography } from '#/components/ui/typography';
import TimeItem from './time-item';
import { getTimeDifference } from '#/lib/utilities/get-time-difference';
import { BookingDetailWrapper } from './detail/booking-detail-wrapper';
import { buttonVariants } from '#/components/ui/button';
import { ButtonContent } from '#/components/ui/button-content';
import { cn } from '#/lib/utilities/cn';
import { SeatStatus, TripsRequestProps } from '#/services/trip/trips-request';
import { getTripDetailAction } from '#/lib/service/fetch-trip-details';
import { useToast } from '#/components/ui/use-toast';
import { useSocketContext } from '#/providers/socket-provider';
import Loading from '#/components/common/loading';
import { useBookingSelection } from '#/context/booking/booking-selection-context';
import { useTranslate } from '#/i18n/client';

export interface BookingListProps {
  list?: TripsRequestProps[];
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}

const BookingList = ({
  list,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
}: BookingListProps) => {
  if (!(Array.isArray(list) && list.length > 0)) return null;
  const { translate } = useTranslate();
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const { clearSelectedSeats, markSeatAsUnavailable } = useBookingSelection();
  const [accordionValue, setAccordionValue] = useState<string>('');
  const [tripDetails, setTripDetails] = useState<TripsRequestProps>();
  const [loadingTripId, setLoadingTripId] = useState<string>('');
  const [previousListLength, setPreviousListLength] = useState(0);
  const [newItemsCount, setNewItemsCount] = useState(0);
  const { toast } = useToast();
  const { socket } = useSocketContext();

  // Track new items for animation
  useEffect(() => {
    if (list && list.length > previousListLength) {
      const newItems = list.length - previousListLength;
      setNewItemsCount(newItems);
      setPreviousListLength(list.length);
      setTimeout(() => setNewItemsCount(0), 600);
    }
  }, [list, previousListLength]);

  const updateSeatStatus = (seatNumber: string, newStatus: SeatStatus) => {
    setTripDetails(prevTrip => {
      if (!prevTrip) return prevTrip;
      const updatedDecks = prevTrip.decks?.map(deck => ({
        ...deck,
        rows: deck.rows?.map(row => ({
          ...row,
          seats: row.seats?.map(seat =>
            seat.number === seatNumber ? { ...seat, status: newStatus } : seat,
          ),
        })),
      }));
      return { ...prevTrip, decks: updatedDecks };
    });
  };

  const handleTripDetails = async (
    tripId: string,
    openAccordionItem: boolean,
  ) => {
    if (openAccordionItem) setLoadingTripId(tripId);
    try {
      const res = await getTripDetailAction(tripId);
      if (
        res.error ||
        !res.data ||
        !res.data.id ||
        !Array.isArray(res.data.decks) ||
        res.data.decks.length === 0
      ) {
        return;
      }

      const trip = res.data;
      const seatStatusMap = new Map<string, SeatStatus>();
      const seatIdMap = new Map<string, string>();
      trip.seats?.forEach(seat => {
        seatStatusMap.set(seat.seatNumber!, seat.status!);
        seatIdMap.set(seat.seatNumber!, seat.id!);
      });

      const initialDecks = trip.decks?.map(deck => ({
        ...deck,
        rows: deck.rows?.map(row => ({
          ...row,
          seats: row.seats?.map(seat => ({
            ...seat,
            id: seat.number ? (seatIdMap.get(seat.number) ?? '') : '',
            price: trip.price,
            status: seat.number ? seatStatusMap.get(seat.number) : undefined,
          })),
        })),
      }));

      setTripDetails({ ...trip, decks: initialDecks });

      if (!socket || !socket.connected) return;

      if (openAccordionItem) {
        socket.emit(
          'joinTripRoom',
          tripId,
          (response: { success: boolean; error?: string }) => {
            if (response.success) {
              socket.on(
                'seatStatusChanged',
                (data: {
                  seatNumber: string;
                  status: SeatStatus;
                  userId?: string;
                }) => {
                  updateSeatStatus(data.seatNumber, data.status);
                  if (data.status !== SeatStatus.AVAILABLE) {
                    markSeatAsUnavailable(data.seatNumber);
                  }
                },
              );
            }
          },
        );
      } else {
        socket.emit('leaveTripRoom', tripId, () => {});
      }
    } catch (err) {
      toast({
        title: translate({
          vi: 'Lỗi kết nối thời gian thực',
          en: 'Real-time connection error',
        }),
        description: translate({
          vi: 'Không thể thiết lập kết nối thời gian thực.',
          en: 'Unable to establish real-time connection.',
        }),
        variant: 'destructive',
      });
    } finally {
      if (openAccordionItem) setLoadingTripId('');
    }
  };

  // Infinite scroll
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

  useEffect(() => {
    if (!accordionValue) clearSelectedSeats();
  }, [accordionValue]);

  return (
    <div className="space-y-6">
      <Accordion
        type="single"
        collapsible
        value={accordionValue}
        onValueChange={setAccordionValue}
        className="flex flex-col gap-y-6"
      >
        {list.map((item, index) => {
          if (!item) return null;
          const value = `item-${index}`;
          const isNewItem =
            newItemsCount > 0 && index >= list.length - newItemsCount;

          return (
            <AccordionItem
              key={value}
              value={value}
              className={cn(
                'rounded-xl bg-white',
                isNewItem &&
                  'animate-in slide-in-from-bottom-4 fade-in duration-500',
              )}
              style={{
                animationDelay: isNewItem
                  ? `${(index - (list.length - newItemsCount)) * 100}ms`
                  : '0ms',
              }}
            >
              <div className="flex flex-col lg:flex-row lg:p-5">
                {/* Image */}
                <div className="w-full lg:max-w-[229px]">
                  <div className="relative overflow-hidden rounded-t-xl pt-[78%] lg:h-full lg:rounded-xl lg:pt-[100%]">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={translate({
                          vi: `Xe khách ${item.name || ''} từ ${item.departureDestination || ''} đến ${item.arrivalDestination || ''}. Giá từ ${item.price ? formatPrice(item.price) : ''}.`,
                          en: `Bus ${item.name || ''} from ${item.departureDestination || ''} to ${item.arrivalDestination || ''}. Price from ${item.price ? formatPrice(item.price) : ''}.`,
                        })}
                        fill
                        className="object-cover"
                        placeholder="blur"
                        blurDataURL={blurDataUrl}
                      />
                    )}
                  </div>
                </div>

                {/* Trip info */}
                <div className="flex flex-1 flex-col p-4 lg:py-0 lg:pr-0 lg:pl-4">
                  {(item.name || item.price) && (
                    <div className="flex flex-row items-center justify-between gap-x-2">
                      {item.name && (
                        <Typography
                          asChild
                          variant="h3"
                          className="text-pj-gray text-[20px]"
                        >
                          <h2>{item.name}</h2>
                        </Typography>
                      )}
                      {item.price && (
                        <Typography
                          asChild
                          variant="h3"
                          className="text-pj-orange text-[20px]"
                        >
                          <p>{formatPrice(item.price)}</p>
                        </Typography>
                      )}
                    </div>
                  )}

                  {item.description && (
                    <Typography asChild className="text-pj-gray-light">
                      <h2>{item.description}</h2>
                    </Typography>
                  )}

                  <div className="flex flex-col lg:mt-auto lg:flex-row lg:justify-between lg:gap-x-2">
                    {/* Time info */}
                    {(item.arrivalTime ||
                      item.departureTime ||
                      item.arrivalDestination ||
                      item.departureDestination ||
                      item.seatsLeft) && (
                      <div>
                        {(item.arrivalTime ||
                          item.departureTime ||
                          item.arrivalDestination ||
                          item.departureDestination) && (
                          <div className="w-full lg:max-w-70 lg:translate-y-3">
                            {(item.departureTime ||
                              item.departureDestination) && (
                              <TimeItem
                                time={item.departureTime}
                                destination={item.departureDestination}
                              />
                            )}

                            {item.arrivalTime && item.departureTime && (
                              <div className="my-2 flex items-center gap-x-2 pl-1 lg:my-0">
                                <div className="bg-pj-gray-light h-4 w-px lg:h-10" />
                                <Typography
                                  asChild
                                  variant="sub-label"
                                  className="text-pj-gray-light"
                                >
                                  <p>
                                    {getTimeDifference(
                                      item.arrivalTime,
                                      item.departureTime,
                                    )}
                                  </p>
                                </Typography>
                              </div>
                            )}

                            {(item.arrivalTime || item.arrivalDestination) && (
                              <TimeItem
                                time={item.arrivalTime}
                                destination={item.arrivalDestination}
                              />
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Book button */}
                    <div className="flex flex-col items-end gap-y-2 lg:justify-end">
                      {item.seatsLeft && (
                        <Typography asChild className="text-pj-gray-light">
                          <p>
                            {translate({
                              vi: `Còn ${item.seatsLeft} ghế`,
                              en: `${item.seatsLeft} seats left`,
                            })}
                          </p>
                        </Typography>
                      )}

                      <AccordionTrigger
                        onClick={() => {
                          const isOpen = accordionValue === value;
                          const nextValue = isOpen ? '' : value;
                          setAccordionValue(nextValue);
                          handleTripDetails(item.id, !isOpen);
                        }}
                        className={cn(
                          buttonVariants({
                            variant: 'small',
                            colors: 'red',
                            shape: 'default',
                          }),
                          'group/button',
                        )}
                        disabled={loadingTripId === item.id}
                      >
                        <ButtonContent
                          text={
                            loadingTripId === item.id
                              ? translate({
                                  vi: 'Đang mở...',
                                  en: 'Loading...',
                                })
                              : accordionValue !== value
                                ? translate({
                                    vi: 'Đặt vé',
                                    en: 'Book',
                                  })
                                : translate({
                                    vi: 'Đóng',
                                    en: 'Close',
                                  })
                          }
                        />
                      </AccordionTrigger>
                    </div>
                  </div>
                </div>
              </div>

              <AccordionContent>
                {loadingTripId === item.id ? (
                  <div className="px-5 pb-5">
                    <Loading
                      content={translate({
                        vi: 'Đang tải chi tiết chuyến đi...',
                        en: 'Loading trip details...',
                      })}
                    />
                  </div>
                ) : tripDetails ? (
                  <BookingDetailWrapper
                    id={tripDetails.id}
                    seatsLeft={tripDetails.seatsLeft}
                    decks={tripDetails.decks}
                    dropingList={tripDetails.dropingList}
                    pickingList={tripDetails.pickingList}
                  />
                ) : null}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      {/* Infinite scroll loader */}
      <div ref={loaderRef} className="h-px" />
      {hasNextPage && isFetchingNextPage && (
        <div className="flex justify-center">
          <Loading
            content={translate({
              vi: 'Đang tải thêm chuyến đi...',
              en: 'Loading more trips...',
            })}
          />
        </div>
      )}
    </div>
  );
};

export { BookingList };
