import { cn } from '#/lib/utilities/cn';
import { SvgProps } from '#/types/global';

const Growth = ({ ...props }: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      //   fill="#000000"
      viewBox="0 0 32 32"
      className={cn('h-6 w-6 fill-current', props.className)}
      {...props}
    >
      <path d="M20,8v2h6.5859L18,18.5859,13.707,14.293a.9994.9994,0,0,0-1.414,0L2,24.5859,3.4141,26,13,16.4141l4.293,4.2929a.9994.9994,0,0,0,1.414,0L28,11.4141V18h2V8Z" />
    </svg>
  );
};

export default Growth;
