import { cn } from '#/lib/utilities/cn';
import { SvgProps } from '#/types/global';

const ExclamationCircle = ({ ...props }: SvgProps) => {
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
        d="M12 9v2m0 4h.01m0-12a9 9 0 110 18a9 9 0 010-18z"
      />
    </svg>
  );
};

export default ExclamationCircle;
