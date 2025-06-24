'use client';
import { useState } from 'react';
// import { BookingItem, BookingItemProps } from './item';
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
import { Button, buttonVariants } from '#/components/ui/button';
import { ImageProps } from '#/types/global';
import { BookingDetailContentProps } from './detail/booking-detail-content';
import { ButtonContent } from '#/components/ui/button-content';
import { cn } from '#/lib/utilities/cn';
export interface BookingItemProps
  extends Omit<BookingDetailContentProps, 'seatsLeft'> {
  name?: string;
  arrivalTime?: string;
  departureTime?: string;
  price?: string;
  numberOfSeats?: number;
  arrivalDestination?: string;
  departureDestination?: string;
  image?: ImageProps;
  description?: string;
  seatsLeft?: number;
}

export interface BookingListProps {
  list?: BookingItemProps[];
}
const BookingList = ({ list }: BookingListProps) => {
  if (!(Array.isArray(list) && list.length > 0)) return null;
  const [accordionValue, setAccordionValue] = useState<string>('');
  return (
    <Accordion
      type="single"
      collapsible
      value={accordionValue}
      onValueChange={setAccordionValue}
      className="flex flex-col gap-y-10"
    >
      {list.some(
        item =>
          item.image?.src ||
          item.name ||
          item.price ||
          item.description ||
          item.arrivalTime ||
          item.departureTime ||
          item.arrivalDestination ||
          item.departureDestination ||
          item.seatsLeft,
      )
        ? list.map((item, index) => {
            const value = `item-${index}`;
            return (
              <AccordionItem
                key={value}
                value={value}
                className="rounded-xl bg-white p-6 lg:p-3"
              >
                <div className="flex flex-col lg:flex-row">
                  <div className="w-full lg:max-w-[229px]">
                    <div className="relative pt-[78%] lg:h-full lg:pt-[100%]">
                      {item.image && item.image.src && (
                        <Image
                          src={item.image.src}
                          alt={item.image.alt ?? ''}
                          fill
                          className="object-cover"
                          placeholder="blur"
                          blurDataURL={blurDataUrl}
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex-1 pt-5 lg:px-4">
                    {(item.name || item.price) && (
                      <div className="flex flex-row items-center justify-between gap-x-2">
                        {item.name && (
                          <Typography
                            asChild
                            variant="h3"
                            className="text-pj-grey text-[20px]"
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
                      <Typography
                        asChild
                        className="text-pj-grey-light mt-2.5 mb-2"
                      >
                        <h2>{item.description}</h2>
                      </Typography>
                    )}
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-x-2">
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
                            <div className="w-full lg:max-w-66.75">
                              {(item.arrivalTime ||
                                item.arrivalDestination) && (
                                <TimeItem
                                  time={item.arrivalTime}
                                  destination={item.arrivalDestination}
                                />
                              )}
                              {item.arrivalTime && item.departureTime && (
                                <div className="my-2 flex items-center gap-x-2 pl-1 lg:my-0">
                                  <div className="bg-pj-grey-light h-4 w-px lg:h-10" />
                                  <Typography
                                    asChild
                                    variant="sub-label"
                                    className="text-pj-grey-light"
                                  >
                                    <p>
                                      {getTimeDifference(
                                        item.arrivalTime,
                                        item.departureTime,
                                      )}{' '}
                                      hours
                                    </p>
                                  </Typography>
                                </div>
                              )}
                              {(item.departureTime ||
                                item.departureDestination) && (
                                <TimeItem
                                  time={item.departureTime}
                                  destination={item.departureDestination}
                                />
                              )}
                            </div>
                          )}
                        </div>
                      )}
                      <div className="flex flex-col items-end gap-y-2 lg:justify-end">
                        {item.seatsLeft && (
                          <Typography asChild className="text-pj-grey-light">
                            <p>{item.seatsLeft} seats left</p>
                          </Typography>
                        )}
                        <AccordionTrigger>
                          <div
                            className={cn(
                              buttonVariants({
                                variant: 'small',
                                colors: 'red',
                                shape: 'default',
                              }),
                              'group/button',
                            )}
                          >
                            <ButtonContent text="Book" />
                          </div>
                        </AccordionTrigger>
                      </div>
                    </div>
                  </div>
                </div>
                <AccordionContent className="pt-3">
                  <BookingDetailWrapper
                    seatsLeft={item.seatsLeft}
                    decks={item.decks}
                    dropingList={item.dropingList}
                    pickingList={item.pickingList}
                  />
                </AccordionContent>
              </AccordionItem>
            );
          })
        : null}
    </Accordion>
  );
};

export { BookingList };
