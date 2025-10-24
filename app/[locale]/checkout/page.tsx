import { CheckoutBlock } from '#/components/blocks/checkout';
import {
  getStaticParams,
  setStaticParamsLocale,
  getTranslate,
} from '#/i18n/server';
import StandardLayout from '#/layouts/standard-layout';
import { BOOKING_EXPIRE_MINUTES } from '#/lib/constant';
import { fetchBookingByBookingId } from '#/lib/service/fetch-booking-by-id';
import { isBookingExpired } from '#/lib/utilities/is-booking-expried';
import { SocketProvider } from '#/providers/socket-provider';
import { PaymentStatusRequest } from '#/services/booking/booking-request';
import { PageProps } from '#/types/global';
import { notFound } from 'next/navigation';

// ✅ Static params for i18n
export const generateStaticParams = getStaticParams;

// ✅ Metadata (SEO + i18n)
export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const { translate } = await getTranslate();

  const title = await translate({
    vi: 'Thanh Toán Đặt Vé - Vietnam Road Trip',
    en: 'Checkout Your Booking - Vietnam Road Trip',
  });

  const description = await translate({
    vi: 'Xác nhận thông tin và hoàn tất thanh toán vé xe liên tỉnh của bạn một cách nhanh chóng, an toàn và tiện lợi.',
    en: 'Confirm your information and complete your interprovincial bus ticket payment quickly, safely, and conveniently.',
  });

  const keywords = await translate({
    vi: 'thanh toán vé xe, checkout, vé xe liên tỉnh, Vietnam Road Trip',
    en: 'bus ticket checkout, payment, interprovincial bus, Vietnam Road Trip',
  });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const url =
    locale === 'vi'
      ? 'https://vietnamroadtrip.vn/vi/checkout'
      : 'https://vietnamroadtrip.vn/en/checkout';

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url,
      siteName: 'Vietnam Road Trip',
      type: 'website',
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      images: [
        {
          url: '/images/logo.png',
          width: 1200,
          height: 630,
          alt: await translate({
            vi: 'Vietnam Road Trip - Thanh toán vé xe liên tỉnh',
            en: 'Vietnam Road Trip - Bus Ticket Checkout',
          }),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/logo.png'],
    },
    alternates: {
      canonical: url,
      languages: {
        vi: 'https://vietnamroadtrip.vn/vi/checkout',
        en: 'https://vietnamroadtrip.vn/en/checkout',
      },
    },
  };
}

// ✅ Main page
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

  // ✅ Locale setup
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
