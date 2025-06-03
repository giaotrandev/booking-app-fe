import { Typography } from '#/components/ui/typography';
import { Link } from '#/i18n/routing';
import { blurDataUrl } from '#/lib/constant';
import { ImageProps } from '#/types/global';
import Image from 'next/image';

export interface FeaturedArticleItemProps {
  image?: ImageProps;
  tag?: string;
  title?: string;
  description?: string;
  url?: string;
}
const FeaturedArticleItem = ({
  image,
  tag,
  title,
  description,
  url,
}: FeaturedArticleItemProps) => {
  if (!(image || tag || title || description)) return null;
  return (
    <Link href={url ?? ''}>
      <div className="relative pt-[calc((214/371)*100%)]">
        {image && image.src && (
          <Image
            src={image?.src}
            alt="Fortis Solar Logo"
            fill
            className="object-cover"
            placeholder="blur"
            blurDataURL={blurDataUrl}
          />
        )}
      </div>
      <div className="bg-white p-4 shadow-lg">
        {(tag || title || description) && (
          <div className="flex flex-col gap-y-2">
            {tag && (
              <Typography asChild variant="sub-body" className="text-pj-orange">
                <p>{tag}</p>
              </Typography>
            )}
            {title && (
              <Typography asChild variant="h3">
                <p>{title}</p>
              </Typography>
            )}
            {description && (
              <Typography asChild variant="sub-body">
                <p>{description}</p>
              </Typography>
            )}
          </div>
        )}
        <div className="text-end">
          <Typography asChild variant="sub-body">
            <p>See more</p>
          </Typography>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedArticleItem;
