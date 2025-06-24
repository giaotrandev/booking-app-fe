import { cn } from '#/lib/utilities/cn';
import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';
import { Typography } from './typography';

const inputVariants = cva([
  'flex w-full h-10 outline-none lg:h-14 border bg-transparent rounded-[4px] p-3',
  'border-black placeholder:text-zinc-500',
  // 'dark:border-white dark:placeholder:text-zinc-500',
  '[&[aria-invalid=true]]:border-pj-red',
  'file:cursor-pointer file:border-0 file:bg-transparent file:text-[14px]',
  // disabled
  'disabled:pointer-events-none disabled:opacity-50',
  'lg:hocus-visible:border-pj-input-focus',
]);

export interface InputProps
  extends ComponentProps<'input'>,
    VariantProps<typeof inputVariants> {}

const Input = ({ className, type, ...props }: InputProps) => {
  return (
    <div className="relative">
      <input
        data-slot="input"
        type={type}
        className={cn(inputVariants({ className }))}
        {...props}
      />
      <div className="absolute -top-3 left-4 bg-white px-1">
        <Typography asChild variant="small-label" className="text-black">
          <span>
            {props.placeholder}
            {props.required && <span className="text-pj-red"> *</span>}
          </span>
        </Typography>
      </div>
    </div>
  );
};

export { Input, inputVariants };
