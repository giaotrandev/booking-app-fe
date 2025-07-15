import { cn } from '#/lib/utilities/cn';
import { VariantProps } from 'class-variance-authority';
import { Typography, typographyVariants } from '../ui/typography';

export interface LoadingProps extends VariantProps<typeof typographyVariants> {
  className?: string;
  content: string;
  textClassName?: string;
}
const Loading = ({
  className,
  content,
  variant,
  textClassName,
}: LoadingProps) => {
  return (
    <div className={cn('flex items-center justify-center py-8', className)}>
      <div className="border-pj-red h-6 w-6 animate-spin rounded-full border-4 border-t-transparent" />
      <Typography
        asChild
        variant={variant}
        className={cn('ml-2', textClassName)}
      >
        <span>{content}</span>
      </Typography>
    </div>
  );
};

export default Loading;
