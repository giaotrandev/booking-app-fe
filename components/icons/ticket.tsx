import { cn } from '#/lib/utilities/cn';
import { SvgProps } from '#/types/global';

const Ticket = ({ ...props }: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 20"
      fill="none"
      className={cn('h-5 w-6 stroke-black', props.className)}
      {...props}
    >
      <path
        d="M14.4 13.1402V12.9463M14.3995 10.1373V9.94346M14.3995 7.14717V6.95333M5.01172 1.45972H12.001C12.0407 2.87478 13.2003 4.00972 14.625 4.00972C16.0496 4.00972 17.2092 2.87478 17.2489 1.45972H18.9882C21.0934 1.45972 22.7999 3.1663 22.7999 5.27148V14.7284C22.7999 16.8336 21.0934 18.5402 18.9882 18.5402H17.2489C17.2092 17.1251 16.0496 15.9902 14.625 15.9902C13.2003 15.9902 12.0407 17.1251 12.001 18.5402H5.01173C2.90655 18.5402 1.19996 16.8336 1.19996 14.7284L1.19995 5.27148C1.19995 3.1663 2.90654 1.45972 5.01172 1.45972Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Ticket;
