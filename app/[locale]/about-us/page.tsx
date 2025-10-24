import { CoreValuesCardListBlock } from '#/components/blocks/core-values-card-list';
import { CountingCardListBlock } from '#/components/blocks/counting-card-list';
import { HeroImageWithTextBlock } from '#/components/blocks/hero-image-with-text';
import { JouneyCTABlock } from '#/components/blocks/journey-cta';
import { MilestonesSectionBlock } from '#/components/blocks/milestones-section';
import { MissionBlock } from '#/components/blocks/mission';
import {
  setStaticParamsLocale,
  getStaticParams,
  getTranslate,
} from '#/i18n/server';
import StandardLayout from '#/layouts/standard-layout';
import { PageProps } from '#/types/global';
import { Metadata } from 'next';

// ✅ Static params for i18n
export const generateStaticParams = getStaticParams;

// ✅ Generate dynamic metadata with i18n
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const { translate } = await getTranslate();

  const title = await translate({
    vi: 'Vietnam Road Trip - Về chúng tôi',
    en: 'Vietnam Road Trip - About us',
  });

  const description = await translate({
    vi: 'Tìm hiểu về Vietnam Road Trip – nền tảng đặt vé xe liên tỉnh uy tín, cam kết mang đến trải nghiệm di chuyển an toàn, tiện lợi và đáng tin cậy cho mọi hành trình của bạn.',
    en: 'Learn more about Vietnam Road Trip – a trusted platform for interprovincial bus booking, committed to safe, convenient, and reliable travel experiences for every journey.',
  });

  const keywords = await translate({
    vi: 'về chúng tôi, Vietnam Road Trip, đặt vé xe, vé xe liên tỉnh, dịch vụ vận chuyển hành khách, hành trình Việt Nam',
    en: 'about us, Vietnam Road Trip, bus ticket, interprovincial bus, passenger transport, Vietnam travel',
  });

  const url =
    locale === 'vi'
      ? 'https://vietnamroadtrip.vn/vi/about-us'
      : 'https://vietnamroadtrip.vn/en/about-us';
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
            vi: 'Vietnam Road Trip - Về chúng tôi',
            en: 'Vietnam Road Trip - About us',
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
        vi: 'https://vietnamroadtrip.vn/vi/about-us',
        en: 'https://vietnamroadtrip.vn/en/about-us',
      },
    },
  };
}

// ✅ Main Page
const AboutUsPage = async (props: PageProps) => {
  const params = await props.params;
  const { locale } = params;
  const { translate } = await getTranslate();

  setStaticParamsLocale(locale);

  return (
    <StandardLayout>
      <HeroImageWithTextBlock
        imageUrl="https://pub-459bf266ac1b494db84a566366b2a2e6.r2.dev/images/about-us/vietnam-road-trip-about-us-hero.webp"
        title={await translate({
          vi: `Về chúng tôi`,
          en: `About us`,
        })}
        description={await translate({
          vi: `Đồng hành cùng hành trình của bạn với dịch vụ vận chuyển hành khách uy tín và chất lượng hàng đầu Việt Nam`,
          en: `Accompany your journey with Vietnam’s leading, reliable, and high-quality passenger transport service`,
        })}
        imageAlt={await translate({
          vi: `Vietnam Road Trip - Trang về chúng tôi`,
          en: `Vietnam Road Trip - About-us page`,
        })}
      />
      <CountingCardListBlock />
      <MissionBlock />
      <CoreValuesCardListBlock />
      <MilestonesSectionBlock />
      <JouneyCTABlock />
    </StandardLayout>
  );
};

export default AboutUsPage;
