import { cn } from '#/lib/utilities/cn';
import { Typography } from '../ui/typography';

export interface IntroductionFormProps {
  title?: string;
  description?: string;
  className?: string;
}
const IntroductionForm = ({
  title,
  description,
  className,
}: IntroductionFormProps) => {
  return (
    <div className={cn('flex flex-col gap-y-2.5', className)}>
      <Typography asChild variant="h3">
        <h2>{title}</h2>
      </Typography>
      <Typography asChild variant="label" className="text-pj-grey">
        <p>{description}</p>
      </Typography>
    </div>
  );
};

export default IntroductionForm;
