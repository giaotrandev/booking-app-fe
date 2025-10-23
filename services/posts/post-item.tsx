import { PostsRequestProps } from './post-request';
import { PostsResponseProps } from './post-response';

export const convertPostItem = async (
  post: PostsResponseProps,
): Promise<PostsRequestProps> => ({
  id: post.id ?? '',
  author: {
    id: post.author?.id ?? '',
    firstName: post.author?.firstName ?? undefined,
    lastName: post.author?.lastName ?? undefined,
  },
  excerpt: post.excerpt ?? undefined,
  slug: post.slug ?? '',
  thumbnail: post.thumbnail ?? undefined,
  featuredImage: post.featuredImage ?? undefined,
  title: post.title ?? undefined,
  publishedAt: post.publishedAt ?? undefined,
  content: post.content ?? undefined,
  category: {
    id: post.category?.id ?? '',
    description: post.category?.description ?? undefined,
    createdAt: post.category?.createdAt ?? undefined,
    name: post.category?.name ?? undefined,
    slug: post.category?.slug ?? undefined,
  },
  createdAt: post.createdAt ?? undefined,
  status: post.status ?? undefined,
});
