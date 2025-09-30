import { getPopularRoutes } from '#/lib/service/fetch-popular-routes';
import { TeaserRenderBlock } from './render';

interface TeaserBlockProps {}

const TeaserBlock = async ({}: TeaserBlockProps) => {
  const list = await getPopularRoutes(10);
  return <TeaserRenderBlock list={list.data ?? []} />;
};

export { TeaserBlock };
