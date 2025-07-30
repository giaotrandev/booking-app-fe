'use client';
import { cn } from '#/lib/utilities/cn';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { ComponentProps } from 'react';
import { Typography } from './typography';

export interface CheckboxProps
  extends ComponentProps<typeof CheckboxPrimitive.Root> {
  label?: string;
}

const Checkbox = ({ className, label, ...props }: CheckboxProps) => {
  return (
    <label className="flex cursor-pointer items-center gap-x-2">
      <CheckboxPrimitive.Root
        data-slot="checkbox"
        className={cn(
          'peer inline-flex size-4.5 shrink-0 cursor-pointer overflow-hidden rounded border',
          'border-pj-input data-[state=checked]:border-pj-blue [&[aria-invalid=true]]:border-pj-orange bg-white',
          'transition-[border] duration-300',
          'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
          'lg:hocus-visible:border-pj-blue',
          className,
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          className="flex items-center justify-center"
        >
          <span className="bg-pj-blue block size-4.5" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>

      {label && (
        <Typography
          asChild
          variant="small-label"
          className="text-pj-grey-light"
        >
          <span>{label}</span>
        </Typography>
      )}
    </label>
  );
};

export { Checkbox };
