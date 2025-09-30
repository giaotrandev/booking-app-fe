import { WrapperBookingHistoryBlock } from '#/components/blocks/account/sidebar/content/booking-history/wrapper-history';
import { notFound } from 'next/navigation';

interface MyBookingProps {}

const MyBookingPage = async ({}: MyBookingProps) => {
  return <WrapperBookingHistoryBlock />;
};

export default MyBookingPage;
