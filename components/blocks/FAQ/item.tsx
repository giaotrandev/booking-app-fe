import { Typography } from '#/components/ui/typography';
import { cn } from '#/lib/utilities/cn';

export interface FAQItemProps {
  description?: string;
  className?: string;
}

const FAQItem = ({ description, className }: FAQItemProps) => {
  return (
    <Typography asChild className={cn('text-pj-grey-light', className)}>
      <p>{description}</p>
    </Typography>
  );
};

export { FAQItem };
