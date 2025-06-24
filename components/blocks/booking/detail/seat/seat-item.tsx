'use client';
import { useBookingSelection } from '#/context/booking/booking-selection-context';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '#/components/headless/tooltip';
import { Icon } from '#/components/icons';
import { cn } from '#/lib/utilities/cn';
import { SeatProps } from '#/types/vehicle';
import { SeatPrice } from './seat-price';
export interface SeatItemProps extends SeatProps {
  isHasUpperDeck: boolean;
  deckId: string;
  rowId: string;
}
const SeatItem = ({
  status,
  number,
  price,
  isHasUpperDeck,
  deckId,
  rowId,
}: SeatItemProps) => {
  // TODO: PRICE
  const { selectSeat, isSeatSelected } = useBookingSelection();

  if (!(status || number || price)) return null;

  const handleSelectSeat = () => {
    if (status !== 'AVAILABLE' || !number) return;
    selectSeat({ number, price, deckId, rowId });
  };

  const selected = isSeatSelected(number ?? '');

  return (
    <Tooltip>
      <TooltipTrigger
        onClick={handleSelectSeat}
        className={cn('cursor-pointer')}
      >
        <Icon
          name="seat"
          className={cn(
            'hocus:fill-pj-green h-auto max-w-100 min-w-10 transition-[fill]',
            isHasUpperDeck
              ? 'w-[60%] md:w-[34%] lg:w-[42%]'
              : 'w-[60%] md:w-[34%] lg:w-[60%]',
            status === 'AVAILABLE' &&
              (selected ? 'fill-pj-green' : 'fill-pj-grey-light'),
            status === 'RESERVED' && 'pointer-events-none fill-black',
          )}
        />
      </TooltipTrigger>
      {(number || price) && (
        <TooltipContent className="bg-pj-blue-dark pointer-events-none rounded-md px-3 py-1.5 text-white">
          <SeatPrice seatNunber={number} price={price ?? '0'} />
        </TooltipContent>
      )}
    </Tooltip>
  );
};

export default SeatItem;
