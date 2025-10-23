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
export const metadata: Metadata = {
  title: 'Sample',
  description: 'This is a sample page, please remove this page after tested',
};

// Sử dụng function có sẵn
export const generateStaticParams = getStaticParams;

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
          vi: `VietNam Road Trip - Trang về chúng tôi`,
          en: `VietNam Road Trip - About-us page`,
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
