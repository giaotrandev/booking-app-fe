'use client';
import { cn } from '#/lib/utilities/cn';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';

const labelVariants = cva(['']);

export interface LabelProps
  extends ComponentProps<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {}

const Label = ({ className, ...props }: LabelProps) => (
  <LabelPrimitive.Root
    data-slot="label"
    className={cn(labelVariants(), className)}
    {...props}
  />
);

export { Label, labelVariants };
