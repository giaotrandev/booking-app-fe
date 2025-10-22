import { cn } from '#/lib/utilities/cn';
import { ComponentProps } from 'react';
import { Typography } from './typography';

export interface TextareaProps extends ComponentProps<'textarea'> {}

const Textarea = ({ className, ...props }: TextareaProps) => {
  return (
    <div>
      <textarea
        data-slot="textarea"
        className={cn(
          'flex min-h-50 w-full rounded-[4px] border p-4 outline-none lg:min-h-60',
          'border-pj-input placeholder:text-zinc-500',
          // 'dark:border-white dark:placeholder:text-zinc-500',
          // disabled
          'disabled:pointer-events-none disabled:opacity-50',
          'lg:hocus-visible:border-pj-input-focus',

          className,
        )}
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

export { Textarea };
