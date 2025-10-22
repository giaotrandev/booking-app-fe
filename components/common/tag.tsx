import { Typography } from '../ui/typography';

interface TagProps {
  title: string;
}

const Tag = ({ title }: TagProps) => {
  return (
    <div className="border-pj-red inline-flex rounded-[24px] border px-4 py-1">
      <Typography asChild className="text-pj-red font-medium uppercase">
        <p>{title}</p>
      </Typography>
    </div>
  );
};

export { Tag };
