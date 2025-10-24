import { WrapperBookingBlock } from '#/components/blocks/booking/wrapper-index';
import {
  setStaticParamsLocale,
  getStaticParams,
  getTranslate,
} from '#/i18n/server';
import StandardLayout from '#/layouts/standard-layout';
import { PageProps } from '#/types/global';
import { Metadata } from 'next';

export const generateStaticParams = getStaticParams;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const { translate } = await getTranslate();

  const title = await translate({
    vi: 'Vietnam Road Trip - Đặt Vé Xe Liên Tỉnh Nhanh Chóng Và Dễ Dàng',
    en: 'Vietnam Road Trip - Fast and Easy Interprovincial Bus Booking',
  });

  const description = await translate({
    vi: 'Đặt vé xe liên tỉnh tiện lợi cùng Vietnam Road Trip. Chọn chuyến, chọn chỗ ngồi và thanh toán online qua mã QR dễ dàng, an toàn.',
    en: 'Book interprovincial bus tickets easily with Vietnam Road Trip. Choose your route, pick your seat, and pay online via QR safely and conveniently.',
  });

  const keywords = await translate({
    vi: 'đặt vé xe, vé xe liên tỉnh, Vietnam Road Trip, vé xe khách, vé xe online',
    en: 'bus ticket, interprovincial bus, Vietnam Road Trip, coach ticket, online booking',
  });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const url =
    locale === 'vi'
      ? 'https://vietnamroadtrip.vn/vi/booking'
      : 'https://vietnamroadtrip.vn/en/booking';

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
            vi: 'Vietnam Road Trip - Trang Đặt Vé Xe Liên Tỉnh',
            en: 'Vietnam Road Trip - Interprovincial Bus Booking Page',
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
        vi: 'https://vietnamroadtrip.vn/vi/booking',
        en: 'https://vietnamroadtrip.vn/en/booking',
      },
    },
  };
}

const BookingPage = async (props: PageProps) => {
  const { locale } = await props.params;
  setStaticParamsLocale(locale);

  return (
    <StandardLayout>
      <WrapperBookingBlock />
    </StandardLayout>
  );
};

export default BookingPage;
