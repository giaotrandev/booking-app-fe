'use client';
import { cn } from '#/lib/utilities/cn';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { ComponentProps } from 'react';

export interface CheckboxProps
  extends ComponentProps<typeof CheckboxPrimitive.Root> {}

const Checkbox = ({ className, ...props }: CheckboxProps) => (
  <CheckboxPrimitive.Root
    data-slot="checkbox"
    className={cn(
      'peer size-4 shrink-0 cursor-pointer overflow-hidden rounded border',
      'data-[state=checked]:border-pj-grey [&[aria-invalid=true]]:border-pj-red border-black',
      'dark:border-white',
      'transition-[border] duration-300',
      // disabled
      'disabled:pointer-events-none disabled:opacity-50',
      'lg:hocus-visible:border-pj-input-focus',
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center rounded')}
    >
      <span className={cn('block size-4', 'bg-pj-grey', 'dark:bg-white')} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
);

export { Checkbox };
