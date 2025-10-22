import Image from 'next/image';
import { StretchedLink } from './stretched-link';
import { blurDataUrl } from '#/lib/constant';
import { Typography } from '../ui/typography';
import { ButtonLinkUnderline } from '../ui/button-link-underline';
import { PostsResponseProps } from '#/services/posts/post-response';
import { cn } from '#/lib/utilities/cn';
import { CategoryTag } from './category-tag';

interface PostCardItemProps
  extends Pick<
    PostsResponseProps,
    'title' | 'excerpt' | 'slug' | 'thumbnail' | 'category'
  > {
  imageAlt?: string;
  imageContainerClassname?: string;
  imageSizes?: string;
  buttonTitle?: string;
}

const PostCardItem = ({
  title,
  excerpt,
  slug,
  thumbnail,
  category,
  imageAlt,
  imageContainerClassname,
  imageSizes,
  buttonTitle,
}: PostCardItemProps) => {
  return (
    <StretchedLink
      link={{
        url: slug,
      }}
      className="group/button-link-underline border-pj-gray-border flex h-full cursor-pointer flex-col overflow-hidden rounded-[24px] border border-t-0"
    >
      <div
        className={cn(
          'relative overflow-hidden pt-[calc(256/328*100%)] lg:pt-[calc(256/616*100%)]',
          imageContainerClassname,
        )}
      >
        <Image
          src={thumbnail ?? '/images/hero.webp'}
          alt={imageAlt ?? ''}
          fill
          sizes={imageSizes ?? '(max-width: 1023px) 74.66vw, 27.0833vw'}
          className="group-hocus-visible/button-link-underline:scale-105 rounded-t-[24px] object-cover transition-transform duration-300 ease-out"
          placeholder="blur"
          blurDataURL={blurDataUrl}
        />
        {category && category.name && (
          <div className="absolute top-4 left-4 z-[1]">
            <CategoryTag title={category?.name} />
          </div>
        )}
      </div>
      {(title || excerpt) && (
        <div className="flex flex-1 flex-col justify-between gap-y-3 bg-white p-6">
          <div className="flex flex-col gap-y-3">
            {title && (
              <Typography
                asChild
                className="line-clamp-2 font-bold"
                variant="h4"
              >
                <h3>{title}</h3>
              </Typography>
            )}
            {excerpt && (
              <Typography asChild className="text-pj-gray-light line-clamp-3">
                <h4>{excerpt}</h4>
              </Typography>
            )}
          </div>
          {slug && buttonTitle && (
            <div>
              <ButtonLinkUnderline text={buttonTitle} icon="arrow-right" />
            </div>
          )}
        </div>
      )}
    </StretchedLink>
  );
};

export { PostCardItem };
