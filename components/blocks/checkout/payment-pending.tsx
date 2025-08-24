'use client';

import { Col } from '#/components/ui/col';
import { Row } from '#/components/ui/row';
import { Typography } from '#/components/ui/typography';
import { formatPrice } from '#/lib/utilities/format-price';
import { ItemQrCode } from './item-qrcode';
import { BookingRequestProps } from '#/services/booking/booking-request';
import { formatUtcDate, formatUtcTime } from '#/lib/utilities/format-time';
import { OptionsPaymentProps, PaymentMethodList } from './payment-method-list';
import { PaymentMethodMobile } from './payment-method-mobile';
import { InfoList } from './info-list';
import { useState } from 'react';

interface PaymentPendingProps extends BookingRequestProps {
  qrCode?: string;
  isHaveQrCode: boolean;
  paymentList: OptionsPaymentProps[];
}

const PaymentPending = ({
  passengerEmail,
  passengerName,
  passengerPhone,
  passengerNote,
  seats,
  totalPrice,
  pickupPoint,
  dropingPoint,
  vehicle,
  route,
  arrivalTime,
  departureTime,
  qrCode,
  updatedAt,
  isHaveQrCode,
  paymentList,
  finalPrice,
}: PaymentPendingProps) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');

  const pickupText = pickupPoint
    ? `${pickupPoint.name || ''} - ${pickupPoint.address || ''}, ${pickupPoint.ward || ''}, ${pickupPoint.district || ''}, ${pickupPoint.province || ''}`
    : '';
  const dropoffText = dropingPoint
    ? `${dropingPoint.name || ''} - ${dropingPoint.address || ''}, ${dropingPoint.ward || ''}, ${dropingPoint.district || ''}, ${dropingPoint.province || ''}`
    : '';
  const infoItems = [
    { title: 'Passenger name', content: passengerName },
    { title: 'Passenger email', content: passengerEmail },
    { title: 'Passenger phone', content: passengerPhone },
    { title: 'Passenger note', content: passengerNote },
  ];
  const seatsNumber = seats.map(item => item.seatNumber).join(', ');
  const busInfoItems = [
    { title: 'Bus Type', content: vehicle?.vehicleName },
    { title: 'Bus capacity', content: vehicle?.vehicleCapacity },
    { title: 'Number of seats purchased', content: seats.length },
    { title: 'Seat Number', content: seatsNumber },
    { title: 'Route from', content: route?.sourceProvince?.name },
    {
      title: 'Departure Time',
      content: `${formatUtcTime(departureTime)} - ${formatUtcDate(departureTime)}`,
    },
    { title: 'Route to', content: route?.destinationProvince?.name },
    {
      title: 'Arrival Time',
      content: `${formatUtcTime(arrivalTime)} - ${formatUtcDate(arrivalTime)}`,
    },
    {
      title: 'Pick up point',
      content: pickupText,
    },
    {
      title: 'Drop off point',
      content: dropoffText,
    },
  ];
  const priceInfoItems = [
    {
      title: 'Your total price',
      content: formatPrice(finalPrice),
    },
  ];

  return (
    <Row className="gap-y-4 lg:gap-x-10">
      <Col className="col-span-full hidden flex-col gap-y-4 lg:col-span-4 lg:flex">
        <Typography asChild variant="h3">
          <h1>Please select your payment method</h1>
        </Typography>
        <div className="border-pj-grey-light flex flex-col gap-y-4 rounded-xl border p-3">
          <PaymentMethodList
            options={paymentList}
            onChange={setSelectedMethod}
          />
        </div>
      </Col>
      <Col className="col-span-full hidden rounded-xl bg-white lg:col-span-4 lg:flex lg:h-fit">
        <ItemQrCode
          qrCode={qrCode ?? ''}
          totalPrice={totalPrice}
          updatedAt={updatedAt}
          isHaveQrCode={isHaveQrCode}
        />
      </Col>
      <Col className="col-span-full lg:col-start-9">
        <div className="flex flex-col gap-y-4">
          {infoItems.some(item => !!item.content) && (
            <InfoList
              title="Your trip information"
              titleColor="red"
              list={infoItems
                .filter(item => item.content)
                .map(item => ({
                  title: item.title,
                  content: item.content as string,
                }))}
            />
          )}
          {busInfoItems.some(item => !!item.content) && (
            <InfoList
              title="Your bus information"
              titleColor="blue"
              list={busInfoItems
                .filter(item => item.content)
                .map(item => ({
                  title: item.title,
                  content: item.content as string,
                }))}
            />
          )}
          <InfoList
            title="Total Price"
            titleColor="green"
            list={priceInfoItems}
            infoContentClassName="text-pj-red lg:text-[18px]"
          />
        </div>
      </Col>
      <Col className="col-span-full flex lg:hidden">
        <PaymentMethodMobile
          options={paymentList}
          onChange={setSelectedMethod}
          selectedMethod={selectedMethod}
          isHaveQrCode={isHaveQrCode}
          totalPrice={totalPrice}
          updatedAt={updatedAt}
          qrCode={qrCode}
        />
      </Col>
    </Row>
  );
};

export { PaymentPending };
