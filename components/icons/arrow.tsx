import { SvgProps } from "#/types/global";

const Arrow = ({ ...props }: SvgProps) => {
  return (
    <svg
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      {...props}
    >
      <g clipPath="url(#clip0_408_260)">
        <path
          d="M8.41663 5L13.4166 10L8.41663 15"
          stroke="#323238"
          strokeWidth="2"
          strokeLinecap="square"
        />
      </g>
    </svg>
  );
};

export default Arrow;
