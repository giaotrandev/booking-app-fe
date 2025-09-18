import StandardLayout from '#/components/auth-layout';
import { CheckoutBlock } from '#/components/blocks/checkout';
import { TemplateProps } from '#/components/templates';
import { getStaticParams, setStaticParamsLocale } from '#/i18n/server';
import { BOOKING_EXPIRE_MINUTES } from '#/lib/constant';
import { fetchBookingByBookingId } from '#/lib/service/fetch-booking-by-id';
import { isBookingExpired } from '#/lib/utilities/is-booking-expried';
import { SocketProvider } from '#/providers/socket-provider';
import { PaymentStatusRequest } from '#/services/booking/booking-request';
import { PageProps } from '#/types/global';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Sample',
  description: 'This is a sample page, please remove this page after tested',
};

// Thêm dòng này
export const generateStaticParams = getStaticParams;

const CheckoutPage = async ({ params, searchParams }: PageProps) => {
  const { locale } = await params;
  const _searchParams = await searchParams;
  const bookingId = _searchParams?.bookingId as string | undefined;

  if (!bookingId) {
    notFound();
  }

  const res = await fetchBookingByBookingId(bookingId);

  if (
    !res ||
    res.error ||
    !res.data ||
    (res.data.paymentStatus === PaymentStatusRequest.PENDING &&
      isBookingExpired(res.data.createdAt, BOOKING_EXPIRE_MINUTES))
  ) {
    notFound();
  }
  setStaticParamsLocale(locale);

  return (
    <StandardLayout>
      <SocketProvider>
        <CheckoutBlock bookingId={bookingId} checkoutData={res.data} />
      </SocketProvider>
    </StandardLayout>
  );
};

export default CheckoutPage;
