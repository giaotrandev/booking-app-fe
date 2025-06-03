import { blurDataUrl } from '#/lib/constant';
import { ImageProps, LinkProps } from '#/types/global';
import Image from 'next/image';

export interface ServiceItemProps {
  title?: string;
  description?: string;
  link?: LinkProps;
  image?: ImageProps;
}
const ServiceItem = ({ image, title, description, link }: ServiceItemProps) => {
  return (
    <div className="relative pt-[calc((258/542)*100%)]">
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
  );
};

export {};
