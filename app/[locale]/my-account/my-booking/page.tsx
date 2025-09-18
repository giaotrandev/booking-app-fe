import { verifyTokenAction } from '#/components/auth-layout/actions/verify-token';
import { WrapperBookingHistoryBlock } from '#/components/blocks/account/sidebar/content/booking-history/wrapper-history';
import { notFound } from 'next/navigation';

interface MyBookingProps {}

const MyBookingPage = async ({}: MyBookingProps) => {
  const tokenResult = await verifyTokenAction();

  if (!tokenResult.valid) {
    return notFound();
  }
  return <WrapperBookingHistoryBlock />;
};

export default MyBookingPage;
