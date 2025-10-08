'use client';

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
import { useTranslate } from '#/i18n/client';

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
  const { translate } = useTranslate();

  const infoItems = [
    route && {
      label: translate({
        vi: 'Tuyến đường',
        en: 'Route',
      }),
      value: route.from
        ? `${route.from} → ${route.to ?? ''}`
        : `${route.to ?? ''}`,
    },
    route &&
      route.departureTime && {
        label: translate({
          vi: 'Ngày khởi hành',
          en: 'Departure Date',
        }),
        value: `${formatUtcDate(route.departureTime)} - ${formatUtcTime(route.departureTime)}`,
      },
    Array.isArray(seatNumbers) &&
      seatNumbers.length > 0 && {
        label: translate({
          vi: 'Ghế ngồi',
          en: 'Seats',
        }),
        value: seatNumbers.map(seat => seat).join(', '),
      },
    finalPrice && {
      label: translate({
        vi: 'Giá',
        en: 'Price',
      }),
      value: formatPrice(finalPrice),
    },
    createdAt && {
      label: translate({
        vi: 'Ngày tạo',
        en: 'Created At',
      }),
      value: formatUtcDate(createdAt),
    },
    createdAt && {
      label: translate({
        vi: 'Phương thức thanh toán',
        en: 'Payment Method',
      }),
      value: translate({
        vi: 'Chuyển khoản ngân hàng',
        en: 'Bank Transfer',
      }),
      valueClassName: 'text-pj-red',
    },
  ].filter(Boolean);

  return (
    <div className="rounded-md bg-white p-4 lg:p-6">
      <div className="border-pj-gray-lightest flex items-center gap-x-2 border-b pb-3">
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
          <h3>
            {translate({
              vi: 'Mã đặt chỗ',
              en: 'Booking code',
            })}
            : {id}
          </h3>
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
