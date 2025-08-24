'use client';
import { Button } from '#/components/ui/button';
import { Link } from '#/i18n/routing';
import { useState } from 'react';

interface BookingHistoryDetailsProps {
  id: string;
}

const BookingHistoryDetails = ({ id }: BookingHistoryDetailsProps) => {
  const [openBookingDetails, setOpenBookingDetails] = useState<boolean>(false);

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <Button text="View Details" variant="small" asChild>
          <Link href={`/my-account/my-booking?ticketId=${id}`} />
        </Button>
        <Button
          text="Print Ticket"
          variant="outline"
          colors="none"
          className="py-2 text-[14px] lg:text-[16px]"
        />
      </div>
    </div>
  );
};

export { BookingHistoryDetails };
