import { Typography } from '#/components/ui/typography';
import { cn } from '#/lib/utilities/cn';
import { BookingHistoryStatusRequest } from '#/services/booking-history/booking-history-request';
import { BookingStatusRequest } from '#/services/booking/booking-request';

interface StatusTagProps {
  status: BookingHistoryStatusRequest | BookingStatusRequest;
  className?: string;
}

const StatusTag = ({ status, className }: StatusTagProps) => {
  return (
    <Typography
      asChild
      variant="sub-label"
      className={cn(
        'rounded-[12px] px-2.5 py-1 font-bold',
        status === BookingHistoryStatusRequest.CANCELLED &&
          'bg-pj-red-light text-pj-red-medium',
        status === BookingHistoryStatusRequest.CONFIRMED &&
          'bg-pj-green-lightest text-pj-green-light',
        status === BookingHistoryStatusRequest.PENDING &&
          'bg-pj-yellow-medium text-pj-brown-medium',
        className,
      )}
    >
      <p>{status}</p>
    </Typography>
  );
};

export { StatusTag };
