import { fetchPosts } from '#/lib/service/fetch-posts';
import { PopularDestinationBlockRender } from './render';

interface PopularDestinationBlockProps {}

const PopularDestinationBlock = async ({}: PopularDestinationBlockProps) => {
  const list = await fetchPosts({
    limit: 2,
  });
  const posts = list?.posts ?? [];
  return <PopularDestinationBlockRender list={posts} />;
};

export { PopularDestinationBlock };
