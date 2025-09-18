import { cn } from '#/lib/utilities/cn';
import { SvgProps } from '#/types/global';

const Password = ({ ...props }: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 22 14"
      fill="none"
      className={cn('h-6 w-6 stroke-current', props.className)}
    >
      <path
        d="M5.52879 7.0001H5.66882M10.9999 7.0001H11.1399M16.3294 7.0001H16.4694M1.3999 10.2668V3.73343C1.3999 2.55522 2.35503 1.6001 3.53324 1.6001H18.4666C19.6448 1.6001 20.5999 2.55522 20.5999 3.73343V10.2668C20.5999 11.445 19.6448 12.4001 18.4666 12.4001H3.53324C2.35503 12.4001 1.3999 11.445 1.3999 10.2668Z"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Password;
