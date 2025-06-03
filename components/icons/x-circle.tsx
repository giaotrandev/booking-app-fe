import { cn } from '#/lib/utilities/cn';
import { SvgProps } from '#/types/global';

const XCircle = ({ ...props }: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-6 w-6 fill-none stroke-current', props.className)}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 9l-6 6m0-6l6 6m5-3a9 9 0 11-18 0a9 9 0 0118 0z"
      />
    </svg>
  );
};

export default XCircle;
