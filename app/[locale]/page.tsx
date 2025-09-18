import { FAQRenderBlock } from '#/components/blocks/FAQ/render';
import { FeaturedArticlesRenderBlock } from '#/components/blocks/featured-articles/render';
import { HeroBlock } from '#/components/blocks/hero';
import { ImageWithTextRenderBlock } from '#/components/blocks/image-with-text/render';
import ServiceRenderBlock from '#/components/blocks/service/render';
import { TeaserRenderBlock } from '#/components/blocks/teaser/render';
import { Layout } from '#/components/layout';
import { getStaticParams, setStaticParamsLocale } from '#/i18n/server';
import { homePagePath } from '#/lib/constant';
import { getValidRoutes } from '#/lib/helper/get-valid-routes';
import { PageProps } from '#/types/global';
import { notFound } from 'next/navigation';
// Thêm dòng này
export const generateStaticParams = getStaticParams;
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
      <TeaserRenderBlock />
      {/* <ServiceRenderBlock /> */}
      <ImageWithTextRenderBlock />
      <FAQRenderBlock />
      <FeaturedArticlesRenderBlock />
    </Layout>
  );
};

export default HomePage;
