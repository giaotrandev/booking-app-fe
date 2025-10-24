import { Template, TemplateProps } from '#/components/templates';
import {
  getStaticParams,
  setStaticParamsLocale,
  getTranslate,
} from '#/i18n/server';
import StandardLayout from '#/layouts/standard-layout';
import { getPostDetailAction } from '#/lib/service/fetch-post-details';
import { fetchPosts } from '#/lib/service/fetch-posts';
import { PageProps } from '#/types/global';
import { Metadata } from 'next';

export const generateStaticParams = getStaticParams;

// ✅ Dynamic metadata cho từng bài viết
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const { translate } = await getTranslate();

  const post = await getPostDetailAction(slug);

  const title =
    post?.title ||
    (await translate({
      vi: 'Bài viết - Vietnam Road Trip',
      en: 'Post - Vietnam Road Trip',
    }));

  const description =
    post?.excerpt ||
    (await translate({
      vi: 'Khám phá các bài viết mới nhất từ Vietnam Road Trip về hành trình, kinh nghiệm du lịch và điểm đến hấp dẫn.',
      en: 'Discover the latest articles from Vietnam Road Trip about journeys, travel tips, and destinations.',
    }));

  const image = post?.featuredImage || '/images/logo.png';
  const url =
    locale === 'vi'
      ? `https://vietnamroadtrip.vn/vi/posts/${slug}`
      : `https://vietnamroadtrip.vn/en/posts/${slug}`;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return {
    metadataBase: new URL(siteUrl),

    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'Vietnam Road Trip',
      type: 'article',
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
      languages: {
        vi: `https://vietnamroadtrip.vn/vi/posts/${slug}`,
        en: `https://vietnamroadtrip.vn/en/posts/${slug}`,
      },
    },
  };
}

// ✅ Trang chi tiết bài viết
const PostDetailsPage = async ({ params }: PageProps) => {
  const { locale, slug } = await params;
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
      status: postDetails?.status,
      authorName:
        postDetails?.author?.firstName || postDetails?.author?.lastName
          ? `${postDetails.author?.firstName ?? ''} ${postDetails.author?.lastName ?? ''}`
          : undefined,
      createdAt: postDetails?.createdAt,
      thumbnail: postDetails?.featuredImage,
      title: postDetails?.title,
      content: postDetails?.content,
      category: {
        id: postDetails?.category?.id ?? '',
        name: postDetails?.category?.name,
      },
      relatedPostList: Array.isArray(posts) ? posts : [],
    },
  };

  return (
    <StandardLayout>
      <Template {...template} />
    </StandardLayout>
  );
};

export default PostDetailsPage;
