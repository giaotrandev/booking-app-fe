'use client';
import { cn } from '#/lib/utilities/cn';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { ComponentProps } from 'react';
import { Typography } from './typography';

export interface CheckboxProps
  extends ComponentProps<typeof CheckboxPrimitive.Root> {
  label?: string;
}

const Checkbox = ({ className, label, ...props }: CheckboxProps) => (
  <CheckboxPrimitive.Root
    data-slot="checkbox"
    className={cn(
      // 'flex space-x-2',
      // 'peer size-3 shrink-0 cursor-pointer overflow-hidden rounded border',
      'data-[state=checked]:border-pj-grey [&[aria-invalid=true]]:border-pj-red border-black',
      // 'dark:border-white',
      // 'transition-[border] duration-300',
      // // disabled
      // 'disabled:pointer-events-none disabled:opacity-50',
      // 'lg:hocus-visible:border-pj-input-focus',
      'peer flex items-center space-x-2',
      'rounded-[5px]',
      'data-[state=checked]:border-pj-grey [&[aria-invalid=true]]:border-pj-red border-pj-grey',
      // 'transition-[border] duration-300',
      // hocus
      // 'hocus:outline-none hocus:ring-2 hocus:ring-zinc-600 dark:hocus:ring-zinc-200',
      // disabled
      'disabled:pointer-events-none disabled:opacity-50',
      // 'lg:hocus-visible:border-pj-input-focus',
      className,
    )}
    {...props}
  >
    <div
      className={cn(
        'group border-pj-grey relative h-4 w-4 shrink-0 rounded-[5px] border',
      )}
    >
      <CheckboxPrimitive.Indicator
        className={cn(
          'group bg-pj-grey absolute top-1/2 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-[5px]',
        )}
      />
    </div>
    {label && (
      <Typography
        asChild
        variant="small-label"
        className="text-pj-grey-light cursor-pointer"
      >
        <p>{label}</p>
      </Typography>
    )}
  </CheckboxPrimitive.Root>
);

export { Checkbox };
