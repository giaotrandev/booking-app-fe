import { Typography } from '#/components/ui/typography';
import { blurDataUrl } from '#/lib/constant';
import { getTimeDifference } from '#/lib/utilities/get-time-difference';
import { ImageProps } from '#/types/global';
import Image from 'next/image';
import TimeItem from './time-item';
import { formatPrice } from '#/lib/utilities/format-price';
import { Button } from '#/components/ui/button';
import { BookingDetailItem } from './detail/item-detail';

export interface BookingItemProps {
  name?: string;
  arrivalTime?: string;
  departureTime?: string;
  price?: string;
  numberOfSeats?: number;
  arrivalDestination?: string;
  departureDestination?: string;
  image?: ImageProps;
  description?: string;
  seatsLeft?: number;
}
const BookingItem = ({
  name,
  arrivalTime,
  departureTime,
  price,
  numberOfSeats,
  arrivalDestination,
  departureDestination,
  description,
  image,
  seatsLeft,
}: BookingItemProps) => {
  return (
    <div className="hocus-visible:shadow-[0px_10px_30px_5px_#4a5568] flex flex-col rounded-xl bg-white p-3 transition-shadow">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:max-w-[229px]">
          <div className="relative pt-[78%] lg:h-full lg:pt-[100%]">
            {image && image.src && (
              <Image
                src={image.src}
                alt={image.alt ?? ''}
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL={blurDataUrl}
              />
            )}
          </div>
        </div>
        <div className="flex-1 px-4 pt-5 lg:px-4">
          {(name || price) && (
            <div className="flex flex-row items-center justify-between gap-x-2">
              {name && (
                <Typography
                  asChild
                  variant="h3"
                  className="text-pj-grey text-[20px]"
                >
                  <h2>{name}</h2>
                </Typography>
              )}
              {price && (
                <Typography
                  asChild
                  variant="h3"
                  className="text-pj-orange text-[20px]"
                >
                  <p> {formatPrice(price)}</p>
                </Typography>
              )}
            </div>
          )}
          {description && (
            <Typography asChild className="text-pj-grey-light pt-2.5 pb-2">
              <h2>{name}</h2>
            </Typography>
          )}
          {(arrivalTime ||
            departureTime ||
            arrivalDestination ||
            departureDestination ||
            seatsLeft) && (
            <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-x-2">
              {(arrivalTime ||
                departureTime ||
                arrivalDestination ||
                departureDestination) && (
                <div className="w-full lg:max-w-66.75">
                  {(arrivalTime || arrivalDestination) && (
                    <TimeItem
                      time={arrivalTime}
                      destination={arrivalDestination}
                    />
                  )}
                  {arrivalTime && departureTime && (
                    <div className="my-2 flex items-center gap-x-2 pl-1 lg:my-0">
                      <div className="bg-pj-grey-light h-4 w-px lg:h-10" />
                      <Typography
                        asChild
                        variant="sub-label"
                        className="text-pj-grey-light"
                      >
                        <p>
                          {getTimeDifference(arrivalTime, departureTime)} hours
                        </p>
                      </Typography>
                    </div>
                  )}
                  {(departureTime || departureDestination) && (
                    <TimeItem
                      time={departureTime}
                      destination={departureDestination}
                    />
                  )}
                </div>
              )}
              <div className="mt-2 flex flex-col gap-y-2 lg:mt-5 lg:items-end lg:justify-end lg:gap-y-1.5">
                {seatsLeft && (
                  <Typography asChild className="text-pj-grey-light">
                    <p>{seatsLeft} seats left</p>
                  </Typography>
                )}
                <div className="flex justify-end lg:justify-start">
                  <Button text="Book" variant="small" className="" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 lg:mt-10">
        <BookingDetailItem />
      </div>
    </div>
  );
};

export { BookingItem };
