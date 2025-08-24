import { Typography } from '#/components/ui/typography';

interface IntroductionContentProps {
  title?: string;
  description?: string;
}

const IntroductionContent = ({
  title,
  description,
}: IntroductionContentProps) => {
  if (!(title && description)) return null;
  return (
    <div className="rounded-md bg-white px-4 py-2 lg:px-6">
      {title && (
        <Typography
          asChild
          variant="small-label"
          className="font-sans font-medium uppercase"
        >
          <h1>{title}/</h1>
        </Typography>
      )}
      {description && (
        <Typography
          asChild
          variant="h1"
          className="text-pj-red font-sans font-bold"
        >
          <h2>{description}</h2>
        </Typography>
      )}
    </div>
  );
};

export { IntroductionContent };
