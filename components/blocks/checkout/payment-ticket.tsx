'use client';

import { Icon } from '#/components/icons';
import { Col } from '#/components/ui/col';
import { Row } from '#/components/ui/row';
import { Typography } from '#/components/ui/typography';
import { cn } from '#/lib/utilities/cn';
import { formatUtcDate, formatUtcTime } from '#/lib/utilities/format-time';
import { BookingRequestProps } from '#/services/booking/booking-request';
import Image from 'next/image';
import { InfoList } from './info-list';
import { ItemQrCode } from './item-qrcode';
import { PaymentRouteItem } from './payment-route-item';
import { blurDataUrl } from '#/lib/constant';
import { UncheckedQrCodeItemRequestProps } from '#/services/QrCode/details/unchecked-qrcode-request';
import { Button } from '#/components/ui/button';
import { Link } from '#/i18n/routing';
import { useTranslate } from '#/i18n/client';

interface PaymentTicketProps
  extends Omit<BookingRequestProps, 'seats' | 'createdAt' | 'basePrice'> {
  isHaveQrCode: boolean;
  seats?: UncheckedQrCodeItemRequestProps[];
}

const PaymentTicket = ({
  seats,
  arrivalTime,
  departureTime,
  route,
  finalPrice,
  updatedAt,
  isHaveQrCode,
}: PaymentTicketProps) => {
  const { translate } = useTranslate();

  return (
    <div className="flex flex-col gap-y-6 lg:gap-y-8">
      <div className="rounded-xl bg-white p-5">
        <ItemQrCode
          totalPrice={finalPrice}
          updatedAt={updatedAt}
          isHaveQrCode={isHaveQrCode}
        />
        <div className="border-pj-gray-light mx-auto my-5 w-full border-t border-dashed" />
        <div className="relative flex w-full items-center justify-between">
          <div>
            <PaymentRouteItem
              route={route?.sourceProvince?.name}
              time={`${formatUtcTime(departureTime)} - ${formatUtcDate(departureTime)}`}
            />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Icon
              name="chevron-right-with-sticky"
              className="h-6 w-6 stroke-black"
            />
          </div>
          <div>
            <PaymentRouteItem
              route={route?.destinationProvince?.name}
              time={`${formatUtcTime(arrivalTime)} - ${formatUtcDate(arrivalTime)}`}
            />
          </div>
        </div>
      </div>

      {Array.isArray(seats) && seats.length > 0 && (
        <Row className="gap-y-6 lg:gap-x-8 lg:gap-y-8">
          {seats.map((item, index) => {
            const infoItems = [
              {
                title: translate({
                  vi: 'Họ tên hành khách',
                  en: 'Passenger name',
                }),
                content: item.passengerName,
              },
              {
                title: translate({
                  vi: 'Email hành khách',
                  en: 'Passenger email',
                }),
                content: item.passengerEmail,
              },
              {
                title: translate({
                  vi: 'Số điện thoại hành khách',
                  en: 'Passenger phone',
                }),
                content: item.passengerPhone,
              },
              {
                title: translate({
                  vi: 'Ghi chú hành khách',
                  en: 'Passenger note',
                }),
                content: item?.passengerNote,
              },
            ];

            return (
              <Col
                className={cn(
                  'col-span-full flex flex-col gap-y-4 rounded-xl bg-white p-5 lg:col-span-6',
                  seats.length === 1 && 'lg:col-start-4',
                )}
                key={index}
              >
                {item.seat && item.seat.seatNumber && (
                  <div className="flex items-center justify-between">
                    <div className="border-pj-red inline-flex rounded-[24px] border px-4 py-1">
                      <Typography
                        asChild
                        className="text-pj-red font-medium uppercase"
                      >
                        <p>
                          {translate({
                            vi: `Ghế: ${item.seat?.seatNumber}`,
                            en: `Seat: ${item.seat?.seatNumber}`,
                          })}
                        </p>
                      </Typography>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <Button
                        icon={{ name: 'print' }}
                        colors="none"
                        text={translate({
                          vi: 'In vé',
                          en: 'Print ticket',
                        })}
                        shape="tag"
                        className="p-0 text-black lg:text-[16px]"
                      />
                    </div>
                  </div>
                )}

                {Array.isArray(infoItems) && infoItems.length > 0 && (
                  <div className="bg-pj-gray-lightest rounded-[8px] p-4">
                    {infoItems.some(item => !!item.content) && (
                      <InfoList
                        title={translate({
                          vi: 'Thông tin hành khách',
                          en: 'Passenger information',
                        })}
                        titleColor="red"
                        list={infoItems
                          .filter(item => item.content)
                          .map(item => ({
                            title: item.title,
                            content: item.content as string,
                          }))}
                        className="gap-y-2 border-0 p-0"
                      />
                    )}
                  </div>
                )}

                {item.qrCodeImage && (
                  <div className="flex flex-col items-center justify-center gap-y-3">
                    <Typography
                      asChild
                      variant="sub-label"
                      className="text-pj-gray-light w-full text-start"
                    >
                      <p>
                        {translate({
                          vi: '* Nhấn vào mã QR để tải xuống.',
                          en: '* Click the QR code to download.',
                        })}
                      </p>
                    </Typography>
                    <div className="w-full max-w-60">
                      <Link
                        href={item.qrCodeImage}
                        download={`seat-${item?.seat?.seatNumber}-qrcode.png`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative block pt-[100%]"
                      >
                        <Image
                          src={item.qrCodeImage}
                          alt={`seat-${item?.seat?.seatNumber}-qrcode`}
                          fill
                          className="object-cover"
                          placeholder="blur"
                          blurDataURL={blurDataUrl}
                        />
                      </Link>
                    </div>
                  </div>
                )}
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
};

export { PaymentTicket };
