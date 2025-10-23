import { Typography } from '#/components/ui/typography';
import { getTranslate } from '#/i18n/server';
import { blurDataUrl } from '#/lib/constant';
import Image from 'next/image';

interface HeroImageWithTextBlockRenderProps {
  title?: string;
  description?: string;
  imageAlt?: string;
  imageUrl: string;
}

const HeroImageWithTextBlockRender = async ({
  title,
  description,
  imageAlt,
  imageUrl,
}: HeroImageWithTextBlockRenderProps) => {
  return (
    <section className="relative h-135">
      <div className="relative h-full w-full pt-[calc(540/1440)*100%]">
        <div className="absolute top-0 left-0 z-[1] h-full w-full bg-black/50" />
        <div className="absolute top-1/2 left-1/2 z-[2] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center text-white">
          <Typography asChild variant="big-title" className="font-bold">
            <h1>{title}</h1>
          </Typography>
          <Typography asChild variant="h4" className="text-center font-medium">
            <p>{description}</p>
          </Typography>
        </div>
        <Image
          src={imageUrl}
          alt={imageAlt ?? ''}
          fill
          className="object-cover"
          placeholder="blur"
          blurDataURL={blurDataUrl}
          priority
        />
      </div>
    </section>
  );
};

export { HeroImageWithTextBlockRender };
