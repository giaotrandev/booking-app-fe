'use client';

import { cn } from '#/lib/utilities/cn';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { ComponentProps, useId } from 'react';
import { Typography } from '../ui/typography'; // Đảm bảo bạn đã import Typography đúng
import { ImageProps } from '#/types/global';
import type { VariantProps } from 'class-variance-authority';
import { typographyVariants } from '../ui/typography';

type TypographyVariant = VariantProps<typeof typographyVariants>['variant'];

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
  labelVariant?: TypographyVariant;
  image?: ImageProps;
  imageClassName?: string;
  description?: string;
  descriptionVariant?: TypographyVariant;
};

const RadioGroupItem = ({
  className,
  label,
  image,
  labelVariant = 'small-label',
  imageClassName,
  description,
  descriptionVariant,
  ...props
}: RadioGroupItemProps) => {
  const id = useId();

  return (
    <div className="flex items-center gap-x-2">
      <RadioGroupPrimitive.Item
        id={id}
        data-slot="radio-group-item"
        className={cn(
          'peer border-pj-gray size-4 flex-none rounded-[50%] border',
          'data-[state=checked]:border-pj-blue [&[aria-invalid=true]]:border-pj-orange',
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
          <span className="bg-pj-blue block size-4 flex-none rounded-[50%] border-current" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>

      {(label || image || description) && (
        <label
          htmlFor={id}
          className="flex cursor-pointer items-center gap-x-2"
        >
          {image && image.src && (
            <img
              src={image.src}
              alt={image.alt}
              sizes="24px"
              className={cn(
                'h-20 w-20 flex-none rounded object-cover',
                imageClassName,
              )}
            />
          )}
          {(label || description) && (
            <div className="flex flex-col">
              {label && (
                <Typography
                  asChild
                  variant={labelVariant}
                  className="text-pj-gray-light"
                >
                  <p>{label}</p>
                </Typography>
              )}
              {description && (
                <Typography asChild variant={descriptionVariant}>
                  <p>{description}</p>
                </Typography>
              )}
            </div>
          )}
        </label>
      )}
    </div>
  );
};

export { RadioGroup, RadioGroupItem };
