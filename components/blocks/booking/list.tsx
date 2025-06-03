import { BookingItem, BookingItemProps } from './item';

export interface BookingListProps {
  list?: BookingItemProps[];
}
const BookingList = ({ list }: BookingListProps) => {
  if (!(Array.isArray(list) && list.length > 0)) return null;
  return (
    <div className="flex flex-col gap-y-10">
      {list.map((item, index) => (
        <div key={index}>
          <BookingItem {...item} />
        </div>
      ))}
    </div>
  );
};

export { BookingList };
