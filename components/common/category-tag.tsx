import { Icon } from '../icons';
import { Typography } from '../ui/typography';

interface CategoryTagProps {
  title: string;
}

const CategoryTag = ({ title }: CategoryTagProps) => {
  return (
    <div className="bg-pj-red inline-flex items-center gap-2 rounded-full px-4 py-1.5">
      <Icon className="h-4 w-4 fill-white" name="tag" />
      <Typography asChild className="font-bold text-white">
        <p>{title}</p>
      </Typography>
    </div>
  );
};

export { CategoryTag };
