import { SvgProps } from '#/types/global';

const SelectChevronDown = ({ ...props }: SvgProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.293 8.29297L12 12.586L7.70697 8.29297L6.29297 9.70697L12 15.414L17.707 9.70697L16.293 8.29297Z"
        stroke="none"
      />
    </svg>
  );
};

export { SelectChevronDown };
