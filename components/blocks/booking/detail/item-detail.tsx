import { TabDetailList } from './tab-detail-list';

export interface BookingDetailItemProps {}
const BookingDetailItem = () => {
  return (
    <div>
      <div className="border-pj-grey-light border-y py-3 lg:px-16">
        <TabDetailList />
      </div>
    </div>
  );
};

export { BookingDetailItem };
