import { Typography } from '#/components/ui/typography';
import { cn } from '#/lib/utilities/cn';

export interface TabItemDetailMobileProps {
  active?: boolean;
  countNumber: number;
  title: string;
}
const TabItemDetailMobile = ({
  active,
  countNumber,
  title,
}: TabItemDetailMobileProps) => {
  return (
    <div className="flex items-center gap-x-2">
      <div
        className={cn(
          'bg-pj-grey-light flex h-5 w-5 items-center justify-center rounded-full text-white',
        )}
      >
        <Typography asChild variant="small-number">
          <span>{countNumber}</span>
        </Typography>
      </div>
      <Typography
        asChild
        variant="small-number"
        className={cn('text-pj-black')}
      >
        <span>{title}</span>
      </Typography>
    </div>
  );
};

export { TabItemDetailMobile };
