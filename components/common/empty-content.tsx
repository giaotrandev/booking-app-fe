import Image from 'next/image';
import { Typography } from '../ui/typography';

export interface EmptyContentProps {
  content?: string;
  className?: string;
}
const EmptyContent = ({ content, className }: EmptyContentProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-2 lg:gap-y-4">
      <Typography asChild variant="h2" className="font-bold">
        <p>Oops</p>
      </Typography>
      <Typography asChild variant="h4" className="font-normal">
        <p>There's no trip is available</p>
      </Typography>
      <div className="w-full max-w-60 lg:max-w-80">
        <div className="relative pt-[calc((485/605)*100%)]">
          <Image
            src="/images/searching.webp"
            className="object-cover"
            fill
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default EmptyContent;
