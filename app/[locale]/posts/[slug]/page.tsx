import { HeroImageWithTextBlock } from '#/components/blocks/hero-image-with-text';
import { PostsBlock } from '#/components/blocks/posts';
import { WrapperPostsBlock } from '#/components/blocks/posts/wrapper-index';
import { Template, TemplateProps } from '#/components/templates';
import { PostDetailsTemplateHeroBlock } from '#/components/templates/post-details/hero';
import {
  setStaticParamsLocale,
  getStaticParams,
  getTranslate,
} from '#/i18n/server';
import StandardLayout from '#/layouts/standard-layout';
import { fetchCategories } from '#/lib/service/fetch-categories-post';
import { getPostDetailAction } from '#/lib/service/fetch-post-details';
import { fetchPosts } from '#/lib/service/fetch-posts';
import { PageProps } from '#/types/global';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sample',
  description: 'This is a sample page, please remove this page after testing',
};

// Sử dụng function có sẵn
export const generateStaticParams = getStaticParams;

const PostDetailsPage = async (props: PageProps) => {
  const params = await props.params;
  const { locale, slug } = params;

  // Set locale trước cho next-intl
  setStaticParamsLocale(locale);

  const postDetails = await getPostDetailAction(slug);
  const relatedPostsList = await fetchPosts({
    categoryId: postDetails?.category?.id,
    limit: 2,
  });
  const posts = relatedPostsList?.posts ?? [];
  const template: TemplateProps = {
    name: 'postDetails',
    postDetails: {
      id: postDetails?.id ?? '',
      status: postDetails?.status ?? undefined,
      authorName:
        postDetails?.author?.firstName || postDetails?.author?.lastName
          ? `${postDetails.author?.firstName ?? ''}${postDetails.author?.lastName ?? ''}`
          : undefined,
      createdAt: postDetails?.createdAt ?? undefined,
      thumbnail: postDetails?.featuredImage ?? undefined,
      title: postDetails?.title ?? undefined,
      content: postDetails?.content ?? undefined,
      category: {
        id: postDetails?.category?.id ?? '',
        name: postDetails?.category?.name ?? undefined,
      },
      relatedPostList: Array.isArray(posts) && posts.length > 0 ? posts : [],
    },
  };

  return (
    <StandardLayout>
      <Template {...template} />
    </StandardLayout>
  );
};

export default PostDetailsPage;
