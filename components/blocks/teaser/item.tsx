import { Typography } from '#/components/ui/typography';
import { blurDataUrl } from '#/lib/constant';
import { ImageProps } from '#/types/global';
import Image from 'next/image';

export interface TeaserItemProps {
  image?: ImageProps;
  title?: string;
  description?: string;
}
const TeaserItem = ({ image, title, description }: TeaserItemProps) => {
  return (
    <div className="flex h-full flex-col">
      <div className="relative pt-[100%]">
        {image && image.src && (
          <Image
            src={image.src}
            alt={image.alt ?? ''}
            fill
            className="object-cover"
            placeholder="blur"
            blurDataURL={blurDataUrl}
          />
        )}
      </div>
      {/* TODO: UPDATE COLOR FOR BG */}
      <div className="bg-pj-blue flex-1 px-4 py-2.5 text-white uppercase">
        <Typography asChild variant="h5">
          <p>{title}</p>
        </Typography>
        <Typography asChild>
          <p>{description}</p>
        </Typography>
      </div>
    </div>
  );
};

export default TeaserItem;
