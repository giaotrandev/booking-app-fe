'use client';

import { Typography } from '#/components/ui/typography';
import { formatPrice } from '#/lib/utilities/format-price';
import { useTranslate } from '#/i18n/client';

export interface SeatPriceProps {
  seatNunber?: string;
  price?: string;
}

const SeatPrice = ({ seatNunber, price }: SeatPriceProps) => {
  const { translate } = useTranslate();

  if (!(seatNunber || price)) return null;

  return (
    <div className="flex">
      {seatNunber && (
        <Typography asChild variant="sub-body" className="text-white">
          <span>
            {translate({
              vi: `Ghế: ${seatNunber}`,
              en: `Seat: ${seatNunber}`,
            })}
          </span>
        </Typography>
      )}
      {price && (
        <Typography asChild variant="sub-body" className="text-white">
          <span>
            {translate({
              vi: `- Giá: ${formatPrice(price)}`,
              en: `- Price: ${formatPrice(price)}`,
            })}
          </span>
        </Typography>
      )}
    </div>
  );
};

export { SeatPrice };
