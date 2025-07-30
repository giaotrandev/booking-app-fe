import { Typography } from '#/components/ui/typography';
import { cn } from '#/lib/utilities/cn';
import { InfoItem, InfoItemProps } from './info-item';

interface InfoListProps {
  title: string;
  list: Omit<InfoItemProps, 'titleClassName' | 'contentClassName'>[];
  titleColor: 'red' | 'blue' | 'green';
  listClassName?: string;
  infoTitleClassName?: string;
  infoContentClassName?: string;
  className?: string;
}

const InfoList = ({
  title,
  list,
  titleColor,
  listClassName,
  infoTitleClassName,
  infoContentClassName,
  className,
}: InfoListProps) => {
  return (
    <div
      className={cn(
        'border-pj-grey-light flex flex-col gap-y-3 rounded-xl border p-4',
        className,
      )}
    >
      <Typography
        asChild
        variant="h4"
        className={cn(
          'text-pj-red text-center text-[28px] font-semibold lg:text-start',
          titleColor === 'red' && 'text-pj-red',
          titleColor === 'blue' && 'text-pj-blue',
          titleColor === 'green' && 'text-pj-green',
        )}
      >
        <p>{title}</p>
      </Typography>
      <div className="flex flex-col gap-y-2">
        {list.map((item, index) => (
          <div key={index} className={cn(listClassName)}>
            <InfoItem
              title={item.title}
              content={item.content as string}
              contentClassName={infoContentClassName}
              titleClassName={infoTitleClassName}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export { InfoList };
