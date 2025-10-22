import { FAQRenderBlock } from '#/components/blocks/FAQ/render';
import { FeaturedArticlesRenderBlock } from '#/components/blocks/featured-articles/render';
import { HeroBlock } from '#/components/blocks/hero';
import { ImageWithTextRenderBlock } from '#/components/blocks/image-with-text/render';
import ServiceRenderBlock from '#/components/blocks/service/render';
import { TeaserBlock } from '#/components/blocks/teaser';
import { TeaserRenderBlock } from '#/components/blocks/teaser/render';
import { TestimonialSliderBlock } from '#/components/blocks/testimonial-slider';
import { Layout } from '#/layouts/home-layout';
import { getStaticParams, setStaticParamsLocale } from '#/i18n/server';
import { homePagePath } from '#/lib/constant';
import { getValidRoutes } from '#/lib/helper/get-valid-routes';
import { PageProps } from '#/types/global';
import { notFound } from 'next/navigation';
import { PopularDestinationBlock } from '#/components/blocks/popular-destinations';
// Thêm dòng này
export const generateStaticParams = getStaticParams;
const HomePage = async (props: PageProps) => {
  const { locale, all } = await props.params;
  setStaticParamsLocale(locale);
  const uri =
    Array.isArray(all) && all.length > 0 ? `/${all?.join('/')}` : homePagePath;

  const allowedRoutes = await getValidRoutes();
  // const localizations =
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
