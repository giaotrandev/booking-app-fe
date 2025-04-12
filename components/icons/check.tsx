import { SvgProps } from "#/types/global";

const Check = ({ ...props }: SvgProps) => {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 lg:h-5 lg:w-5"
      {...props}
    >
      <g clipPath="url(#clip0_522_105)">
        <path
          d="M4.16663 9.99992L8.33329 14.1666L16.6666 5.83325"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="square"
        />
      </g>
    </svg>
  );
};

export default Check;
