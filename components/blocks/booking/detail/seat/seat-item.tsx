'use client';
import { useBookingSelection } from '#/context/booking/booking-selection-context';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '#/components/headless/tooltip';
import { Icon } from '#/components/icons';
import { cn } from '#/lib/utilities/cn';
import { SeatPrice } from './seat-price';
import { SeatRequestProps, SeatStatus } from '#/services/trip/trips-request';
export interface SeatItemProps extends SeatRequestProps {
  isHasUpperDeck: boolean;
  deckId: string;
  rowId: string;
}
const SeatItem = ({
  id,
  status,
  number,
  price,
  isHasUpperDeck,
  deckId,
  rowId,
}: SeatItemProps) => {
  const { selectSeat, isSeatSelected } = useBookingSelection();

  if (!(status || number || price)) return null;

  const handleSelectSeat = () => {
    if (status !== SeatStatus.AVAILABLE || !number) return;
    selectSeat({ id, number, price, deckId, rowId, status });
  };

  const selected = isSeatSelected(number ?? '');

  return (
    <Tooltip>
      <TooltipTrigger
        onClick={handleSelectSeat}
        className="pointer-events-none"
      >
        <div className={cn('pointer-events-none inline-flex justify-center')}>
          <Icon
            name="seat"
            className={cn(
              'hocus:fill-pj-green-medium pointer-events-auto h-auto max-w-100 min-w-10 cursor-pointer transition-[fill]',
              isHasUpperDeck
                ? 'w-[60%] md:w-[34%] lg:w-[42%]'
                : 'w-[60%] md:w-[34%] lg:w-[60%]',
              status === SeatStatus.AVAILABLE &&
                (selected ? 'fill-pj-green-medium' : 'fill-pj-gray-light'),
              (status === SeatStatus.RESERVED ||
                status === SeatStatus.BOOKED) &&
                'pointer-events-none fill-black',
            )}
          />
        </div>
      </TooltipTrigger>
      {(number || price) && (
        <TooltipContent className="bg-pj-blue-dark pointer-events-none rounded-md px-3 py-1.5 text-white">
          <SeatPrice seatNunber={number} price={price?.toString()} />
        </TooltipContent>
      )}
    </Tooltip>
  );
};

export default SeatItem;
