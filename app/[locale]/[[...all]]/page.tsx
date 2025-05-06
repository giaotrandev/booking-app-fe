import { HeroRenderBlock } from '#/components/hero/render';
import { Layout } from '#/components/layout';
import { homePagePath } from '#/lib/constant';
import { getValidRoutes } from '#/lib/helper/get-valid-routes';
import { PageProps } from '#/types/global';
import { notFound } from 'next/navigation';

const DynamicPage = async (props: PageProps) => {
  const { locale, all } = await props.params;
  const uri =
    Array.isArray(all) && all.length > 0 ? `/${all?.join('/')}` : homePagePath;

  const allowedRoutes = await getValidRoutes();

  if (!allowedRoutes.includes(uri)) {
    return notFound();
  }

  return (
    <Layout>
      <HeroRenderBlock />
    </Layout>
  );
};

export default DynamicPage;
