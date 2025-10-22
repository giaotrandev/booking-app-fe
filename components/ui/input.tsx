'use client';
import { cn } from '#/lib/utilities/cn';
import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps, useImperativeHandle, useRef } from 'react';
import { Typography } from './typography';
import { Button } from './button';

const inputVariants = cva([
  'flex w-full h-14 outline-none lg:h-12 transition-colors border bg-transparent rounded-[4px] p-3',
  'border-pj-input placeholder:text-zinc-500',
  '[&[aria-invalid=true]]:border-pj-red',
  'file:cursor-pointer file:border-0 file:bg-transparent file:text-[14px]',
  'disabled:pointer-events-none disabled:opacity-50',
  'lg:hocus-visible:border-pj-input-focus',
]);

export interface InputProps
  extends ComponentProps<'input'>,
    VariantProps<typeof inputVariants> {
  ref?: React.Ref<HTMLInputElement>;
}

const Input = ({ className, type, ref, ...props }: InputProps) => {
  const innerRef = useRef<HTMLInputElement>(null);

  // gộp ref từ props (react-hook-form) với ref nội bộ
  useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);

  const handleFileButtonClick = () => {
    innerRef.current?.click();
  };

  return (
    <div className="relative">
      <input
        ref={innerRef}
        type={type}
        className={cn(
          inputVariants({ className }),
          type === 'file' && 'sr-only', // ✅ thay vì hidden
        )}
        {...props}
      />
      {type === 'file' && (
        <div className="flex flex-col items-center gap-y-2 lg:items-start lg:gap-y-1.5">
          <Button
            type="button"
            onClick={handleFileButtonClick}
            text="Upload avatar"
          />
          <Typography className="text-pj-input">JPG, PNG up to 5MB</Typography>
        </div>
      )}
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
