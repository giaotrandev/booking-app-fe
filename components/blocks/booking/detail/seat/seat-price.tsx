import { Typography } from '#/components/ui/typography';
import { formatPrice } from '#/lib/utilities/format-price';

export interface SeatPriceProps {
  seatNunber?: string;
  price?: string;
}
const SeatPrice = ({ seatNunber, price }: SeatPriceProps) => {
  if (!(seatNunber && price)) return null;
  return (
    <div className="flex">
      {seatNunber && (
        <Typography asChild variant="sub-body" className="text-white">
          <span>{seatNunber && `Seat: ${seatNunber}`}</span>
        </Typography>
      )}
      {price && (
        <Typography asChild variant="sub-body" className="text-white">
          <span>{`- Price: ${formatPrice(price)}`}</span>
        </Typography>
      )}
    </div>
  );
};

export { SeatPrice };
