import { SeatConfiguration } from '#/types/vehicle';
import { DoubleLayoutItem } from './double-layout-item';
import { SingleLayoutItem } from './single-layout-item';

export interface SeatItemProps extends SeatConfiguration {}
const SeatItem = ({ decks }: SeatItemProps) => {
  const isSingleLayout = decks.length === 1;
  return isSingleLayout ? (
    <SingleLayoutItem />
  ) : (
    <DoubleLayoutItem decks={decks} />
  );
};

export { SeatItem };
