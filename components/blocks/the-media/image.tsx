'use client';
import { blurDataUrl } from '#/lib/constant';
import { ImageProps } from '#/types/global';
// import { blurDataUrl } from '#/lib/constants';
// import { ImageProps } from '#/types/globals';
import Image from 'next/image';

export interface TheMediaImageProps {
  image?: {
    width: number;
    height: number;
  } & Omit<ImageProps, 'width' | 'height'>;
}

const TheMediaImage = ({ image }: TheMediaImageProps) => {
  if (!image?.src) {
    return null;
  }
  return (
    <Image
      src={image.src}
      alt={image.alt}
      sizes={image.sizes}
      placeholder="blur"
      blurDataURL={blurDataUrl}
      fill
      className="z-0 object-cover object-center"
    />
  );
};

export { TheMediaImage };
