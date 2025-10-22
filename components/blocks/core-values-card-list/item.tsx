import { Icon, IconNamesProps } from '#/components/icons';
import { Typography } from '#/components/ui/typography';
import { cn } from '#/lib/utilities/cn';

interface CoreValuesCardItemProps {
  title: string;
  description: string;
  iconName?: IconNamesProps;
}

const CoreValuesCardItem = ({
  title,
  description,
  iconName,
}: CoreValuesCardItemProps) => {
  return (
    <div className="flex flex-col gap-y-4 p-4 lg:p-6">
      <div className="flex">
        <span className="bg-pj-red/90 rounded-[12px] p-4">
          <Icon
            name={iconName}
            className={cn(
              'h-8 w-8 fill-white stroke-white',
              iconName === 'heart' && 'fill-none',
            )}
          />
        </span>
      </div>
      <Typography asChild variant="h6" className="font-semibold">
        <h3>{title}</h3>
      </Typography>
      <Typography asChild className="text-pj-gray-light">
        <p>{description}</p>
      </Typography>
    </div>
  );
};

export { CoreValuesCardItem };
