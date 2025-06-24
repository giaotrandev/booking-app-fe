'use client';

import { cn } from '#/lib/utilities/cn';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { ComponentProps, useId } from 'react';
import { Typography } from '../ui/typography'; // Đảm bảo bạn đã import Typography đúng

export type RadioGroupProps = ComponentProps<typeof RadioGroupPrimitive.Root>;

const RadioGroup = ({ className, ...props }: RadioGroupProps) => {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn('flex flex-wrap gap-x-12', className)}
      {...props}
    />
  );
};

export type RadioGroupItemProps = ComponentProps<
  typeof RadioGroupPrimitive.Item
> & {
  label?: string;
};

const RadioGroupItem = ({
  className,
  label,
  ...props
}: RadioGroupItemProps) => {
  const id = useId(); // tạo id duy nhất để kết nối label với radio

  return (
    <div className="flex items-center gap-x-2">
      <RadioGroupPrimitive.Item
        id={id}
        data-slot="radio-group-item"
        className={cn(
          'peer border-pj-grey size-4 flex-none rounded-[50%] border',
          'data-[state=checked]:border-pj-grey [&[aria-invalid=true]]:border-pj-orange',
          'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
          // 'lg:hocus-visible:border-pj-input-focus',
          // 'transition-[border]',
          className,
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator
          data-slot="radio-group-indicator"
          className="flex items-center justify-center"
        >
          <span className="bg-pj-grey block size-4 flex-none rounded-[50%] border-current" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>

      {label && (
        <label htmlFor={id}>
          <Typography
            asChild
            variant="small-label"
            className="text-pj-grey-light cursor-pointer"
          >
            <p>{label}</p>
          </Typography>
        </label>
      )}
    </div>
  );
};

export { RadioGroup, RadioGroupItem };
