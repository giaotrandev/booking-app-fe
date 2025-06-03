import { cn } from '#/lib/utilities/cn';
import { SvgProps } from '#/types/global';

const CheckCircle = ({ ...props }: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={cn('h-6 w-6 fill-none stroke-current', props.className)}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2l4-4m5 2a9 9 0 11-18 0a9 9 0 0118 0z"
      />
    </svg>
  );
};

export default CheckCircle;
