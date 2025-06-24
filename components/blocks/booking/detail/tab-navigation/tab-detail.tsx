import { Typography } from '#/components/ui/typography';
import { cn } from '#/lib/utilities/cn';

export interface TabItemDetailProps {
  active?: boolean;
  countNumber: number;
  title: string;
}
const TabItemDetail = ({ active, countNumber, title }: TabItemDetailProps) => {
  return (
    <div className="flex gap-x-2">
      <div
        className={cn(
          'bg-pj-grey-light flex h-5 w-5 items-center justify-center rounded-full text-white',
          active && 'bg-pj-blue',
        )}
      >
        <Typography asChild variant="small-number">
          <span>{countNumber}</span>
        </Typography>
      </div>
      <Typography
        asChild
        variant="small-number"
        className={cn(active ? 'text-black' : 'text-pj-grey-light')}
      >
        <span>{title}</span>
      </Typography>
    </div>
  );
};

export { TabItemDetail };
