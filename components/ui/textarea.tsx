import { cn } from '#/lib/utilities/cn';
import { ComponentProps } from 'react';

export interface TextareaProps extends ComponentProps<'textarea'> {}

const Textarea = ({ className, ...props }: TextareaProps) => {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'flex w-full border bg-transparent',
        'border-black placeholder:text-zinc-500',
        'dark:border-white dark:placeholder:text-zinc-500',
        // disabled
        'disabled:pointer-events-none disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
};

export { Textarea };
