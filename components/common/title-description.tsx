import { cn } from '#/lib/utilities/cn';
import { Typography, TypographyProps } from '../ui/typography';

interface TitleDescriptionProps {
  title?: string;
  description?: string;
  className?: string;
  titleVariant?: TypographyProps['variant'];
  descriptionVariant?: TypographyProps['variant'];
  descriptionClassname?: string;
  titleClassName?: string;
}

const TitleDescription = ({
  title,
  description,
  className,
  titleVariant,
  descriptionVariant,
  descriptionClassname,
  titleClassName,
}: TitleDescriptionProps) => {
  return (
    <div className={cn(className)}>
      {title && (
        <Typography
          asChild
          variant={titleVariant ?? 'h2'}
          className={cn('text-center font-bold', titleClassName)}
        >
          <h2>{title}</h2>
        </Typography>
      )}
      {description && (
        <Typography
          asChild
          variant={descriptionVariant ?? 'label'}
          className={cn('text-pj-gray-light text-center', descriptionClassname)}
        >
          <p>{description}</p>
        </Typography>
      )}
    </div>
  );
};

export { TitleDescription };
