import { WrapperBookingHistoryBlock } from '#/components/blocks/account/sidebar/content/booking-history/wrapper-history';
import { getStaticParams, getTranslate } from '#/i18n/server';
import { PageProps } from '#/types/global';

interface MyBookingProps {}
export const generateStaticParams = getStaticParams;

// ✅ Metadata (SEO + i18n)
export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const { translate } = await getTranslate();

  const title = await translate({
    vi: 'Lịch Sử Đặt Vé - Vietnam Road Trip',
    en: 'Booking History - Vietnam Road Trip',
  });

  const description = await translate({
    vi: 'Xem lại toàn bộ lịch sử đặt vé của bạn, chi tiết chuyến đi và trạng thái thanh toán.',
    en: 'Review all your past bookings, trip details, and payment statuses.',
  });

  const keywords = await translate({
    vi: 'lịch sử đặt vé, vé xe của tôi, vé xe khách, Vietnam Road Trip',
    en: 'booking history, my bookings, bus tickets, Vietnam Road Trip',
  });

  const url =
    locale === 'vi'
      ? 'https://vietnamroadtrip.vn/vi/my-account/my-booking'
      : 'https://vietnamroadtrip.vn/en/my-account/my-booking';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

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
            vi: 'Vietnam Road Trip - Lịch sử đặt vé',
            en: 'Vietnam Road Trip - Booking History',
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
        vi: 'https://vietnamroadtrip.vn/vi/my-account/my-booking',
        en: 'https://vietnamroadtrip.vn/en/my-account/my-booking',
      },
    },
  };
}
const MyBookingPage = async ({}: MyBookingProps) => {
  return <WrapperBookingHistoryBlock />;
};

export default MyBookingPage;
