import { HeroImageWithTextBlockRender } from './render';

interface HeroImageWithTextBlockProps {
  title?: string;
  description?: string;
  imageAlt?: string;
}

const HeroImageWithTextBlock = ({
  title,
  description,
  imageAlt,
}: HeroImageWithTextBlockProps) => {
  return (
    <HeroImageWithTextBlockRender
      imageAlt={imageAlt}
      title={title}
      description={description}
    />
  );
};

export { HeroImageWithTextBlock };
