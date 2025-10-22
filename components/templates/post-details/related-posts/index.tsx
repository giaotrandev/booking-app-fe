import { fetchPosts } from '#/lib/service/fetch-posts';
import { RelatedPostListProps } from './list';
import { RelatedPostsBlockRender } from './render';

export interface RelatedPostsBlockProps extends RelatedPostListProps {}

const RelatedPostsBlock = async ({ list }: RelatedPostsBlockProps) => {
  return <RelatedPostsBlockRender list={list} />;
};

export { RelatedPostsBlock };
