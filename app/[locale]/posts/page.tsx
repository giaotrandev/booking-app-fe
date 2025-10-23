import { HeroImageWithTextBlock } from '#/components/blocks/hero-image-with-text';
import { PostsBlock } from '#/components/blocks/posts';
import { WrapperPostsBlock } from '#/components/blocks/posts/wrapper-index';
import {
  setStaticParamsLocale,
  getStaticParams,
  getTranslate,
} from '#/i18n/server';
import StandardLayout from '#/layouts/standard-layout';
import { fetchCategories } from '#/lib/service/fetch-categories-post';
import { PageProps } from '#/types/global';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Sample',
  description: 'This is a sample page, please remove this page after tested',
};

// Sử dụng function có sẵn
export const generateStaticParams = getStaticParams;

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
          vi: `VietNam Road Trip - Trang những bài viết`,
          en: `VietNam Road Trip - Posts page`,
        })}
      />
      <PostsBlock categories={categories} />
      {/* <WrapperPostsBlock categories={categories} /> */}
    </StandardLayout>
  );
};

export default PostsPage;
