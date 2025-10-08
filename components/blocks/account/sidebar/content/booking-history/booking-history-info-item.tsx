import { Typography } from '#/components/ui/typography';
import { cn } from '#/lib/utilities/cn';

interface BookingInfoItemProps {
  label: string;
  value: string | number;
  valueClassName?: string;
}

const BookingInfoItem = ({
  label,
  value,
  valueClassName,
}: BookingInfoItemProps) => {
  return (
    <div className="flex flex-col">
      <Typography className="text-pj-gray" asChild>
        <p>{label}</p>
      </Typography>
      <Typography
        className={cn('text-[20px] font-medium', valueClassName)}
        variant="h5"
      >
        {value}
      </Typography>
    </div>
  );
};

export { BookingInfoItem };
