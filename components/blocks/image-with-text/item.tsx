import { Typography } from '#/components/ui/typography';
import { ImageProps } from '#/types/global';
import Image from 'next/image';

interface CardImageWithTextItemProps {
  icon: ImageProps;
  title: string;
  description: string;
}

const CardImageWithTextItem = ({
  icon,
  title,
  description,
}: CardImageWithTextItemProps) => {
  return (
    <div className="flex flex-col gap-y-4">
      <Image
        src={icon.src}
        alt={icon.alt}
        width={icon.width}
        height={icon.height}
        className="h-13.5 w-13.5"
      />
      <div className="flex flex-col gap-y-4 lg:gap-y-1">
        <Typography asChild variant="h3">
          <h2>{title}</h2>
        </Typography>
        <Typography asChild className="text-pj-grey-light w-full">
          <p>{description}</p>
        </Typography>
      </div>
    </div>
  );
};

export { CardImageWithTextItem };
