'use client';
import { cn } from '#/lib/utilities/cn';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { ComponentProps } from 'react';

export type RadioGroupProps = ComponentProps<typeof RadioGroupPrimitive.Root>;

const RadioGroup = ({ className, ...props }: RadioGroupProps) => {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn('', className)}
      {...props}
    />
  );
};

export type RadioGroupItemProps = ComponentProps<
  typeof RadioGroupPrimitive.Item
>;

const RadioGroupItem = ({ className, ...props }: RadioGroupItemProps) => {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        'peer size-4 rounded-full border',
        'border-black',
        'dark:border-white',
        // disabled
        'disabled:pointer-events-none disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex items-center justify-center"
      >
        <span
          className={cn(
            'block size-3 rounded-full',
            'bg-black',
            'dark:bg-white',
          )}
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
};

export { RadioGroup, RadioGroupItem };
