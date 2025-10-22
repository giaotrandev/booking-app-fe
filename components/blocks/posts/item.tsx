'use client';
import { PostCardItem } from '#/components/common/post-card-item';
import { useTranslate } from '#/i18n/client';
import { PostsResponseProps } from '#/services/posts/post-response';

export interface PostItemProps
  extends Pick<
    PostsResponseProps,
    'title' | 'excerpt' | 'slug' | 'thumbnail' | 'category' | 'id'
  > {
  imageAlt?: string;
}
{
}

const PostItem = ({
  title,
  thumbnail,
  slug,
  excerpt,
  category,
}: PostItemProps) => {
  const { translate } = useTranslate();
  return (
    <PostCardItem
      imageAlt={
        title
          ? translate({
              vi: `Hình ảnh điểm đến ${title}`,
              en: `Destination image: ${title}`,
            })
          : category
            ? translate({
                vi: `Hình ảnh danh mục ${category}`,
                en: `Category image: ${category}`,
              })
            : translate({
                vi: 'Điểm đến phổ biến',
                en: 'Popular destination',
              })
      }
      imageContainerClassname="lg:pt-[calc(256/430*100%)]"
      title={title}
      excerpt={excerpt}
      slug={`posts/${slug}`}
      thumbnail={thumbnail}
      category={category}
      buttonTitle={translate({
        vi: `Xem thêm`,
        en: `See more`,
      })}
    />
  );
};

export { PostItem };
