import { Typography, TypographyProps } from '#/components/ui/typography';
import { cn } from '#/lib/utilities/cn';

interface InfoItemProps {
  title?: string;
  titleVariant?: TypographyProps['variant'];
  contentVariant?: TypographyProps['variant'];
  content?: string;
  className?: string;
  contentClassName?: string;
}

const InfoItem = ({
  title,
  content,
  className,
  contentClassName,
  titleVariant = 'body',
  contentVariant = 'h6',
}: InfoItemProps) => {
  if (!content) return null;
  return (
    <div
      className={cn(
        'border-b-pj-grey-light flex w-full justify-between border-b pb-2',
        className,
      )}
    >
      <Typography asChild variant={titleVariant}>
        <p>{title}</p>
      </Typography>
      {/* TODO: tim cach toi uu neu nhu content qua dai */}
      <Typography
        asChild
        variant={contentVariant}
        className={cn('font-semibold', contentClassName)}
      >
        <p>{content} </p>
      </Typography>
    </div>
  );
};

export { InfoItem };
