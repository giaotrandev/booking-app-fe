import { Typography } from '#/components/ui/typography';
import {
  formatFullDateWithWeekday,
  formatUtcTime,
} from '#/lib/utilities/format-time';
import { BusStopProps } from '#/services/booking/booking-request';

interface RouteItemProps {
  point?: BusStopProps;
  time?: string;
}

const RouteItem = ({ time, point }: RouteItemProps) => {
  if (!(time || (point && point.name))) return null;
  return (
    <div className="flex flex-col items-center gap-y-1.5 lg:gap-y-1">
      {time && (
        <>
          <Typography
            asChild
            variant="h2"
            className="text-[28px] leading-none font-bold lg:font-normal"
          >
            <p>{formatUtcTime(time)}</p>
          </Typography>
          <Typography asChild className="text-pj-input">
            <p>{formatFullDateWithWeekday(time)}</p>
          </Typography>
        </>
      )}
      {point && point.name && (
        <Typography asChild className="text-center font-bold" variant="h5">
          <p>{point?.name}</p>
        </Typography>
      )}
    </div>
  );
};

export { RouteItem };
