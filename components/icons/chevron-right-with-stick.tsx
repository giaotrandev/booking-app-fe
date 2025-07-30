import { cn } from '#/lib/utilities/cn';
import { SvgProps } from '#/types/global';

const ChevronRightWithStick = ({ ...props }: SvgProps) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      //   width="15"
      //   height="14"
      viewBox="0 0 15 14"
      fill="none"
      className={cn('h-6 w-6 stroke-black', props.className)}
    >
      <g clipPath="url(#clip0_1545_9993)">
        <path
          d="M1.25 7H14.25"
          //   stroke="#000001"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.75 10.5L14.25 7L10.75 3.5"
          //   stroke="#000001"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default ChevronRightWithStick;
