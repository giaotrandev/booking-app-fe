import { FAQRenderBlock } from '#/components/blocks/FAQ/render';
import { FeaturedArticlesRenderBlock } from '#/components/blocks/featured-articles/render';
import { HeroBlock } from '#/components/blocks/hero';
import { ImageWithTextRenderBlock } from '#/components/blocks/image-with-text/render';
import ServiceRenderBlock from '#/components/blocks/service/render';
import { TeaserBlock } from '#/components/blocks/teaser';
import { TestimonialSliderBlock } from '#/components/blocks/testimonial-slider';
import { Layout } from '#/layouts/home-layout';
import {
  getStaticParams,
  setStaticParamsLocale,
  getTranslate,
} from '#/i18n/server';
import { homePagePath } from '#/lib/constant';
import { getValidRoutes } from '#/lib/helper/get-valid-routes';
import { PageProps } from '#/types/global';
import { notFound } from 'next/navigation';
import { PopularDestinationBlock } from '#/components/blocks/popular-destinations';

// ✅ Static params for i18n
export const generateStaticParams = getStaticParams;

// ✅ Metadata (SEO + i18n)
export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const { translate } = await getTranslate();

  const title = await translate({
    vi: 'Vietnam Road Trip - Đặt vé xe liên tỉnh dễ dàng và nhanh chóng',
    en: 'Vietnam Road Trip - Easy and Fast Interprovincial Bus Ticket Booking',
  });

  const description = await translate({
    vi: 'Vietnam Road Trip giúp bạn đặt vé xe liên tỉnh trong ngày nhanh chóng, tiện lợi và an toàn. Hỗ trợ thanh toán qua mã QR và theo dõi hành trình dễ dàng.',
    en: 'Vietnam Road Trip helps you book interprovincial bus tickets quickly, conveniently, and safely. Supports QR payment and real-time trip tracking.',
  });

  const keywords = await translate({
    vi: 'đặt vé xe, vé xe liên tỉnh, Vietnam Road Trip, vé xe khách, vé xe online',
    en: 'bus ticket, interprovincial bus, Vietnam Road Trip, online bus booking',
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const url =
    locale === 'vi'
      ? 'https://vietnamroadtrip.vn/vi'
      : 'https://vietnamroadtrip.vn/en';

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
            vi: 'Vietnam Road Trip - Đặt vé xe liên tỉnh',
            en: 'Vietnam Road Trip - Interprovincial Bus Booking',
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
        vi: 'https://vietnamroadtrip.vn/vi',
        en: 'https://vietnamroadtrip.vn/en',
      },
    },
  };
}

// ✅ Main page
const HomePage = async (props: PageProps) => {
  const { locale, all } = await props.params;
  setStaticParamsLocale(locale);

  const uri =
    Array.isArray(all) && all.length > 0 ? `/${all?.join('/')}` : homePagePath;

  const allowedRoutes = await getValidRoutes();
  if (!allowedRoutes.includes(uri)) {
    return notFound();
  }

  return (
    <Layout>
      <HeroBlock />
      <TeaserBlock />
      {/* <ServiceRenderBlock /> */}
      {/* <ImageWithTextRenderBlock /> */}
      <FAQRenderBlock />
      <TestimonialSliderBlock />
      <PopularDestinationBlock />
      {/* <FeaturedArticlesRenderBlock /> */}
    </Layout>
  );
};

export default HomePage;
