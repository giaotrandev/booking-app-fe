import { HeroImageWithTextBlock } from '#/components/blocks/hero-image-with-text';
import { PostsBlock } from '#/components/blocks/posts';
import {
  setStaticParamsLocale,
  getStaticParams,
  getTranslate,
} from '#/i18n/server';
import StandardLayout from '#/layouts/standard-layout';
import { fetchCategories } from '#/lib/service/fetch-categories-post';
import { PageProps } from '#/types/global';
import { Metadata } from 'next';

// ✅ Tạo static params sẵn cho i18n
export const generateStaticParams = getStaticParams;

// ✅ Generate metadata có i18n
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const { translate } = await getTranslate();

  const title = await translate({
    vi: 'Vietnam Road Trip - Khám phá Việt Nam',
    en: 'Vietnam Road Trip - Explore Vietnam',
  });

  const description = await translate({
    vi: 'Khám phá những câu chuyện, điểm đến và trải nghiệm khắp các cảnh quan tươi đẹp cùng nền văn hóa phong phú của Việt Nam.',
    en: "Discover stories, destinations, and experiences from Vietnam's beautiful landscapes and rich culture.",
  });

  const keywords = await translate({
    vi: 'đặt vé xe, vé xe liên tỉnh, Vietnam Road Trip, vé xe khách, vé xe online',
    en: 'bus ticket, interprovincial bus, Vietnam Road Trip, online bus booking',
  });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const url =
    locale === 'vi'
      ? 'https://vietnamroadtrip.vn/vi/posts'
      : 'https://vietnamroadtrip.vn/en/posts';

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url,
      siteName: 'Vietnam Road Trip',
      type: 'website',
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      images: [
        {
          url: '/images/logo.png',
          width: 1200,
          height: 630,
          alt: await translate({
            vi: 'Vietnam Road Trip - Khám phá Việt Nam',
            en: 'Vietnam Road Trip - Explore Vietnam',
          }),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/logo.png'],
    },
    alternates: {
      canonical: url,
      languages: {
        vi: 'https://vietnamroadtrip.vn/vi/posts',
        en: 'https://vietnamroadtrip.vn/en/posts',
      },
    },
  };
}

// ✅ Main page
const PostsPage = async (props: PageProps) => {
  const params = await props.params;
  const { locale } = params;
  const { translate } = await getTranslate();

  setStaticParamsLocale(locale);
  const categories = await fetchCategories({ lang: locale });

  return (
    <StandardLayout>
      <HeroImageWithTextBlock
        imageUrl={'/images/hero.webp'}
        title={await translate({
          vi: `Khám Phá Việt Nam`,
          en: `Explore Viet Nam`,
        })}
        description={await translate({
          vi: `Khám phá những câu chuyện, điểm đến và trải nghiệm khắp các cảnh quan tươi đẹp cùng nền văn hóa phong phú của Việt Nam`,
          en: `Discover stories, destinations, and experiences from across Vietnam's beautiful landscapes and rich culture`,
        })}
        imageAlt={await translate({
          vi: `Vietnam Road Trip - Trang bài viết`,
          en: `Vietnam Road Trip - Posts page`,
        })}
      />
      <PostsBlock categories={categories} />
    </StandardLayout>
  );
};

export default PostsPage;
