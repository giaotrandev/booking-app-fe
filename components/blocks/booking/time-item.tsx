import { Typography } from '#/components/ui/typography';
import { cn } from '#/lib/utilities/cn';
import { formatUtcTime } from '#/lib/utilities/format-time';

export interface TimeItemProps {
  time?: string;
  destination?: string;
  className?: string;
}
const TimeItem = ({ destination, time, className }: TimeItemProps) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-y-2 lg:flex-row lg:items-center lg:gap-x-4 lg:gap-y-0',
        className,
      )}
    >
      {time && (
        <Typography asChild variant="h3" className="min-w-20 text-[16px]">
          <p>{formatUtcTime(time)}</p>
        </Typography>
      )}
      <div className="bg-pj-grey-light hidden h-px w-10 flex-none lg:block" />
      {destination && (
        <Typography
          asChild
          variant="sub-label"
          className="text-pj-grey-light line-clamp-1 lg:line-clamp-none"
        >
          <p>{destination}</p>
        </Typography>
      )}
    </div>
  );
};

export default TimeItem;
