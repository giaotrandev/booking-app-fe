import { cn } from '#/lib/utilities/cn';
import { SvgProps } from '#/types/global';

const Date = ({ ...props }: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      //   width="18"
      //   height="20"
      viewBox="0 0 18 20"
      fill="none"
      className={cn('h-5 w-4.5 fill-black', props.className)}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 2H15V0H13V2H5V0H3V2H2C0.89 2 0 2.9 0 4V18C0 19.1 0.89 20 2 20H16C17.1 20 18 19.1 18 18V4C18 2.9 17.1 2 16 2ZM16 18H2V7H16V18ZM3.5 11C3.5 9.62 4.62 8.5 6 8.5C7.38 8.5 8.5 9.62 8.5 11C8.5 12.38 7.38 13.5 6 13.5C4.62 13.5 3.5 12.38 3.5 11Z"
        // fill="#6A6A6B"
      />
    </svg>
  );
};

export default Date;
