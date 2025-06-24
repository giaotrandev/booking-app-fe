import { Col } from '#/components/ui/col';
import { Row } from '#/components/ui/row';
import { Typography } from '#/components/ui/typography';
import { useBookingSelection } from '#/context/booking/booking-selection-context';
import { OptionItemList, OptionItemListProps } from './option-list';

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
            <p>Pick up points</p>
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
            <p>Drop off points</p>
          </Typography>
          <OptionItemList
            list={dropingList}
            defaultValue={dropingList[0].id}
            onChange={val => {
              setSelectedDropingId(val);
              // console.log('✅ Drop selected:', val);
            }}
          />
        </Col>
      )}
    </Row>
  );
};

export { PickingAndDropingList };
