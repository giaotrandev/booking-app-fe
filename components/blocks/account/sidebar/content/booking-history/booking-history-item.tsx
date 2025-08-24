import { Button } from '#/components/ui/button';
import { Col } from '#/components/ui/col';
import { Row } from '#/components/ui/row';
import { Typography } from '#/components/ui/typography';
import { Link } from '#/i18n/routing';
import { formatUtcDate, formatUtcTime } from '#/lib/utilities/format-time';
import { BookingRequestProps } from '#/services/booking/booking-request';
import { useState } from 'react';
import { BookingInfoItem } from './booking-history-info-item';
import { BookingHistoryDetails } from './booking-history-details';

export interface BookingHistoryItemProps extends BookingRequestProps {}

const BookingHistoryItem = ({
  id,
  dropingPoint,
  arrivalTime,
  departureTime,
  finalPrice,
  seats,
  paymentStatus,
  status,
  route,
  createdAt,
}: BookingHistoryItemProps) => {
  const infoItems = [
    route && {
      label: 'Route',
      value: `${route.sourceProvince?.name} → ${route.destinationProvince?.name}`,
    },
    departureTime && {
      label: 'Departure Date',
      value: `${formatUtcDate(departureTime)} - ${formatUtcTime(departureTime)}`,
    },
    Array.isArray(seats) &&
      seats.length > 0 && {
        label: 'Seats',
        value: seats.map(seat => seat.seatNumber).join(', '),
      },
    finalPrice && {
      label: 'Price',
      value: finalPrice,
    },
    createdAt && {
      label: 'Created At',
      value: formatUtcDate(createdAt),
    },
    createdAt && {
      label: 'Payment Method',
      value: 'Bank Transfer',
    },
  ].filter(Boolean);

  return (
    <div className="rounded-md bg-white p-4 lg:p-6">
      <div className="border-pj-grey-lightest border-b pb-2">
        <Typography
          asChild
          className="text-pj-green text-[20px] font-medium"
          variant="h5"
        >
          <h3>Booking code: {id}</h3>
        </Typography>
      </div>
      <Row className="gap-y-1 py-3 lg:gap-y-3 lg:py-4">
        {infoItems.map((item, index) => {
          if (!item) return null;
          return (
            <Col key={index} className="col-span-full lg:col-span-6">
              <BookingInfoItem label={item.label} value={item.value} />
            </Col>
          );
        })}
      </Row>
      <BookingHistoryDetails id={id} />
    </div>
  );
};

export { BookingHistoryItem };
