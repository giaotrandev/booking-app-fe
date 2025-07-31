import { Col } from '#/components/ui/col';
import { Row } from '#/components/ui/row';
import { Typography } from '#/components/ui/typography';
import { cn } from '#/lib/utilities/cn';

export interface InfoItemProps {
  title: string;
  content: string;
  titleClassName?: string;
  contentClassName?: string;
}

const InfoItem = ({
  title,
  content,
  titleClassName,
  contentClassName,
}: InfoItemProps) => {
  return (
    <div className="flex justify-between gap-x-2">
      <div className="flex-1">
        <Typography asChild className={cn(titleClassName)}>
          <span>{title}: </span>
        </Typography>
      </div>
      <div className="max-w-1/2 text-right">
        <Typography
          asChild
          className={cn('font-medium break-words', contentClassName)}
        >
          <span>{content}</span>
        </Typography>
      </div>
    </div>
  );
};

export { InfoItem };
