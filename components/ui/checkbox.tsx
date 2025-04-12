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
      'peer size-4 shrink-0 border',
      'border-black',
      'dark:border-white',
      // disabled
      'disabled:pointer-events-none disabled:opacity-50',
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center')}
    >
      <span className={cn('block size-3', 'bg-black', 'dark:bg-white')} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
);

export { Checkbox };
