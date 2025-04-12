import { cn } from '#/lib/utilities/cn';
import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';

const inputVariants = cva([
  'flex w-full h-[24px] border bg-transparent',
  'border-black placeholder:text-zinc-500',
  'dark:border-white dark:placeholder:text-zinc-500',
  'file:cursor-pointer file:border-0 file:bg-transparent file:text-[14px]',
  // disabled
  'disabled:pointer-events-none disabled:opacity-50',
]);

export interface InputProps
  extends ComponentProps<'input'>,
    VariantProps<typeof inputVariants> {}

const Input = ({ className, type, ...props }: InputProps) => {
  return (
    <input
      data-slot="input"
      type={type}
      className={cn(inputVariants({ className }))}
      {...props}
    />
  );
};

export { Input, inputVariants };
