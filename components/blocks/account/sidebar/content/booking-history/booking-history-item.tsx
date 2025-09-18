import { Button } from '#/components/ui/button';
import { Col } from '#/components/ui/col';
import { Row } from '#/components/ui/row';
import { Typography } from '#/components/ui/typography';
import { Link } from '#/i18n/routing';
import { formatUtcDate, formatUtcTime } from '#/lib/utilities/format-time';
import { BookingRequestProps } from '#/services/booking/booking-request';
import { useState } from 'react';
import { BookingInfoItem } from './booking-history-info-item';
import { BookingHistoryDetails } from './details/booking-history-details';
import {
  BookingHistoryRequestProps,
  BookingHistoryStatusRequest,
} from '#/services/booking-history/booking-history-request';
import { formatPrice } from '#/lib/utilities/format-price';
import { StatusTag } from './status-tag';
import { cn } from '#/lib/utilities/cn';

// export interface BookingHistoryItemProps extends BookingRequestProps {}
export interface BookingHistoryItemProps extends BookingHistoryRequestProps {}
const BookingHistoryItem = ({
  id,
  finalPrice,
  status,
  route,
  createdAt,
  totalPrice,
  seatNumbers,
}: BookingHistoryItemProps) => {
  console.log('id', `${id} - ${seatNumbers}`);
  const infoItems = [
    route && {
      label: 'Route',
      value: route.from
        ? `${route.from} → ${route.to ?? ''}`
        : `${route.to ?? ''}`,
    },
    route &&
      route.departureTime && {
        label: 'Departure Date',
        value: `${formatUtcDate(route.departureTime)} - ${formatUtcTime(route.departureTime)}`,
      },
    Array.isArray(seatNumbers) &&
      seatNumbers.length > 0 && {
        label: 'Seats',
        value: seatNumbers.map(seat => seat).join(', '),
      },
    finalPrice && {
      label: 'Price',
      value: formatPrice(finalPrice),
    },
    createdAt && {
      label: 'Created At',
      value: formatUtcDate(createdAt),
    },
    createdAt && {
      label: 'Payment Method',
      value: 'Bank Transfer',
      valueClassName: 'text-pj-red',
    },
  ].filter(Boolean);

  return (
    <div className="rounded-md bg-white p-4 lg:p-6">
      <div className="border-pj-grey-lightest flex items-center gap-x-2 border-b pb-3">
        <Typography
          asChild
          className={cn(
            'text-pj-green-medium text-[20px] font-medium',
            status === BookingHistoryStatusRequest.CANCELLED && 'text-pj-red',
            status === BookingHistoryStatusRequest.CONFIRMED &&
              'text-pj-green-medium',
            status === BookingHistoryStatusRequest.PENDING &&
              'text-pj-orange-medium',
          )}
          variant="h5"
        >
          <h3>Booking code: {id}</h3>
        </Typography>
        {status && <StatusTag status={status} />}
      </div>
      <Row className="gap-y-1 py-3 lg:gap-y-3 lg:py-4">
        {infoItems.map((item, index) => {
          if (!item) return null;
          return (
            <Col key={index} className="col-span-full lg:col-span-6">
              <BookingInfoItem
                label={item.label}
                value={item.value}
                valueClassName={item.valueClassName}
              />
            </Col>
          );
        })}
      </Row>
      <BookingHistoryDetails id={id} />
    </div>
  );
};

export { BookingHistoryItem };
