import { HeroImageWithTextBlockRender } from './render';

interface HeroImageWithTextBlockProps {
  title?: string;
  description?: string;
  imageAlt?: string;
  imageUrl: string;
}

const HeroImageWithTextBlock = ({
  title,
  description,
  imageAlt,
  imageUrl,
}: HeroImageWithTextBlockProps) => {
  return (
    <HeroImageWithTextBlockRender
      imageAlt={imageAlt}
      imageUrl={imageUrl}
      title={title}
      description={description}
    />
  );
};

export { HeroImageWithTextBlock };
