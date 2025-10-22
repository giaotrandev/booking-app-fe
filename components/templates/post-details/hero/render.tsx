import { CategoryTag } from '#/components/common/category-tag';
import { Icon } from '#/components/icons';
import { Container } from '#/components/ui/container';
import { Typography } from '#/components/ui/typography';
import { getTranslate } from '#/i18n/server';
import { blurDataUrl } from '#/lib/constant';
import { formatUtcDate } from '#/lib/utilities/format-time';
import Image from 'next/image';

export interface PostDetailsTemplateHeroBlockRenderProps {
  title?: string;
  thumbnail?: string;
  createdAt?: string;
  authorName?: string;
  categoryName?: string;
}

const PostDetailsTemplateHeroBlockRender = async ({
  title,
  thumbnail,
  createdAt,
  authorName,
  categoryName,
}: PostDetailsTemplateHeroBlockRenderProps) => {
  const { translate } = await getTranslate();

  return (
    <div>
      <section className="relative h-141.25">
        <div className="relative h-full w-full pt-[calc(565/1440)*100%]">
          <Image
            src={thumbnail ?? '/images/hero.webp'}
            alt={title ?? ''}
            fill
            className="object-cover"
            placeholder="blur"
            blurDataURL={blurDataUrl}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute right-0 bottom-0 left-0">
            <Container className="pb-12">
              <div className="flex w-full flex-col gap-y-3 lg:max-w-224">
                {(createdAt || categoryName) && (
                  <div className="flex items-center gap-4">
                    {categoryName && <CategoryTag title={categoryName} />}
                    {createdAt && (
                      <div className="bg-pj-gray-border flex items-center gap-2 rounded-full px-4 py-1.5">
                        <Icon className="fill-pj-gray h-4 w-4" name="date" />
                        <Typography asChild className="text-pj-fill-pj-gray">
                          <span>{formatUtcDate(createdAt)}</span>
                        </Typography>
                      </div>
                    )}
                  </div>
                )}
                {title && (
                  <Typography
                    asChild
                    variant="big-title"
                    className="font-bold text-white"
                  >
                    <h1>{title}</h1>
                  </Typography>
                )}
                {authorName && (
                  <Typography
                    asChild
                    variant="label"
                    className="text-pj-gray-border"
                  >
                    <p>{`${await translate({
                      vi: `Được viết bởi `,
                      en: `By `,
                    })}${authorName}`}</p>
                  </Typography>
                )}
              </div>
            </Container>
          </div>
        </div>
      </section>
    </div>
  );
};

export { PostDetailsTemplateHeroBlockRender };
