'use client';

import { Col } from '#/components/ui/col';
import { Row } from '#/components/ui/row';
import { Typography } from '#/components/ui/typography';
import { useBookingSelection } from '#/context/booking/booking-selection-context';
import { useEffect } from 'react';
import { OptionItemList, OptionItemListProps } from './option-list';
import { useTranslate } from '#/i18n/client';

export interface PickingAndDropingListProps {
  pickingList?: OptionItemListProps['list'];
  dropingList?: OptionItemListProps['list'];
}

const PickingAndDropingList = ({
  pickingList,
  dropingList,
}: PickingAndDropingListProps) => {
  const {
    setSelectedPickingId,
    setSelectedDropingId,
    selectedPickingId,
    selectedDropingId,
  } = useBookingSelection();

  const { translate } = useTranslate();

  useEffect(() => {
    if (pickingList?.[0]?.id && !selectedPickingId) {
      setSelectedPickingId(pickingList[0].id);
    }
  }, [pickingList, selectedPickingId, setSelectedPickingId]);

  useEffect(() => {
    if (dropingList?.[0]?.id && !selectedDropingId) {
      setSelectedDropingId(dropingList[0].id);
    }
  }, [dropingList, selectedDropingId, setSelectedDropingId]);

  if (
    !(
      (Array.isArray(pickingList) && pickingList.length > 0) ||
      (Array.isArray(dropingList) && dropingList.length > 0)
    )
  )
    return null;

  return (
    <Row className="relative mt-4 gap-y-4 lg:mt-0 lg:gap-x-6 lg:gap-y-0">
      {/* <div className="absolute top-0 left-1/2 hidden h-full w-px -translate-x-1/2 bg-black lg:block" /> */}
      {Array.isArray(pickingList) && pickingList.length > 0 && (
        <Col className="col-span-full lg:col-span-6">
          <Typography asChild className="mb-1 text-center" variant="label">
            <p>
              {translate({
                vi: 'Điểm đón',
                en: 'Pick up points',
              })}
            </p>
          </Typography>
          <OptionItemList
            list={pickingList}
            defaultValue={pickingList[0].id}
            onChange={val => {
              setSelectedPickingId(val);
            }}
          />
        </Col>
      )}
      {Array.isArray(dropingList) && dropingList.length > 0 && (
        <Col className="col-span-full lg:col-span-6">
          <Typography asChild className="mb-1 text-center" variant="label">
            <p>
              {translate({
                vi: 'Điểm trả',
                en: 'Drop off points',
              })}
            </p>
          </Typography>
          <OptionItemList
            list={dropingList}
            defaultValue={dropingList[0].id}
            onChange={val => {
              setSelectedDropingId(val);
            }}
          />
        </Col>
      )}
    </Row>
  );
};

export { PickingAndDropingList };
