'use client';

import { Icon } from '#/components/icons';
import { Col } from '#/components/ui/col';
import { Row } from '#/components/ui/row';
import { Typography } from '#/components/ui/typography';
import { cn } from '#/lib/utilities/cn';
import { SeatConfiguration } from '#/services/trip/trips-request';
import { SeatLayout } from './seat-layout';
import { useTranslate } from '#/i18n/client';

export interface SeatListProps extends SeatConfiguration {}

export const SeatList = ({ decks }: SeatListProps) => {
  const { translate } = useTranslate();

  const sampleSeatItemCategoryList = [
    translate({
      vi: 'Ghế không khả dụng',
      en: 'Unavailable Seat',
    }),
    translate({
      vi: 'Ghế trống',
      en: 'Available Seat',
    }),
    translate({
      vi: 'Ghế bạn đang chọn',
      en: 'Your Selecting Seat',
    }),
  ];

  return (
    <div>
      <Row>
        <Col className="col-span-full mt-4 lg:col-span-4 lg:mt-0">
          <div className="flex flex-col gap-y-4 lg:gap-y-2">
            <Typography asChild variant="h6" className="font-medium">
              <p>
                {translate({
                  vi: 'Vui lòng chọn ghế bạn muốn',
                  en: 'Please select your desired seat(s)',
                })}
              </p>
            </Typography>
            <Typography asChild variant="h6" className="font-bold uppercase">
              <p>
                {translate({
                  vi: 'Lưu ý:',
                  en: 'Note:',
                })}
              </p>
            </Typography>
          </div>
          <ul className="mt-6 flex flex-col gap-y-3">
            {sampleSeatItemCategoryList.map((item, index) => (
              <li key={index} className="flex items-center gap-x-6">
                <Icon
                  name="seat"
                  className={cn(
                    index === 1 && 'fill-pj-gray-light',
                    index === 2 && 'fill-pj-green-medium',
                  )}
                />
                <Typography asChild variant="small-label">
                  <span>{item}</span>
                </Typography>
              </li>
            ))}
          </ul>
        </Col>

        {Array.isArray(decks) && decks.length > 0 && (
          <Col
            className={cn(
              'col-span-full mt-4 lg:mt-0 lg:max-h-[600px] lg:overflow-y-auto',
              decks.length === 1
                ? 'lg:col-span-5 lg:col-start-8'
                : 'lg:col-span-6 lg:col-start-7',
            )}
          >
            <SeatLayout decks={decks} />
          </Col>
        )}
      </Row>
    </div>
  );
};
