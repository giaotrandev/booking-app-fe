import { PostCardItem } from '#/components/common/post-card-item';
import { getTranslate } from '#/i18n/server';
import { PostsResponseProps } from '#/services/posts/post-response';

export interface RelatedPostItemProps
  extends Pick<
    PostsResponseProps,
    'title' | 'excerpt' | 'slug' | 'thumbnail' | 'category' | 'id'
  > {}
{
}

const RelatedPostItem = async ({
  title,
  excerpt,
  slug,
  thumbnail,
  category,
}: RelatedPostItemProps) => {
  const { translate } = await getTranslate();

  return (
    <PostCardItem
      imageAlt={
        title
          ? await translate({
              vi: `Hình ảnh điểm đến ${title}`,
              en: `Destination image: ${title}`,
            })
          : category
            ? await translate({
                vi: `Hình ảnh danh mục ${category}`,
                en: `Category image: ${category}`,
              })
            : await translate({
                vi: 'Điểm đến phổ biến',
                en: 'Popular destination',
              })
      }
      title={title}
      excerpt={excerpt}
      slug={`posts/${slug}`}
      thumbnail={thumbnail}
      category={category}
      buttonTitle={await translate({
        vi: `Xem thêm`,
        en: `See more`,
      })}
    />
  );
};

export { RelatedPostItem };
