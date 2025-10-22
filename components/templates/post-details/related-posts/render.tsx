import { Typography } from '#/components/ui/typography';
import { getTranslate } from '#/i18n/server';
import { RelatedPostList, RelatedPostListProps } from './list';

interface RelatedPostsBlockRenderProps {
  list: RelatedPostListProps['list'];
}

const RelatedPostsBlockRender = async ({
  list,
}: RelatedPostsBlockRenderProps) => {
  const { translate } = await getTranslate();

  return (
    <div className="flex flex-col gap-y-12">
      <h2>
        <Typography asChild variant="h1" className="uppercase">
          <span className="text-pj-red">
            {await translate({
              vi: 'Những bài viết ',
              en: 'Related ',
            })}
          </span>
        </Typography>
        <Typography asChild variant="h1" className="uppercase">
          <span>
            {await translate({
              vi: 'Liên quan ',
              en: 'posts',
            })}
          </span>
        </Typography>
      </h2>
      <RelatedPostList list={list} />
    </div>
  );
};

export { RelatedPostsBlockRender };
