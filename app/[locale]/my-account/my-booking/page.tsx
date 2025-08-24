import { verifyTokenAction } from '#/components/auth-layout/actions/verify-token';
import { BookingHistory } from '#/components/blocks/account/sidebar/content/booking-history/booking-history';
import { notFound } from 'next/navigation';

interface MyBookingProps {}

const MyBooking = async ({}: MyBookingProps) => {
  const tokenResult = await verifyTokenAction();

  if (!tokenResult.valid) {
    return notFound();
  }
  return <BookingHistory />;
};

export default MyBooking;
