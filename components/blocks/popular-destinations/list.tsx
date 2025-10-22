import { PopularDestinationItem, PopularDestinationItemProps } from './item';

export interface PopularDestinationListProps {
  list: PopularDestinationItemProps[];
}

const PopularDestinationList = ({ list }: PopularDestinationListProps) => {
  return (
    <div className="flex flex-col gap-y-8">
      {list.map((item, index) => (
        <PopularDestinationItem key={item.id ?? index} {...item} />
      ))}
    </div>
  );
};

export { PopularDestinationList };
