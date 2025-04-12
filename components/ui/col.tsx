import { cn } from '#/lib/utilities/cn';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';

const colVariants = cva(['']);

export interface ColProps
  extends ComponentProps<'div'>,
    VariantProps<typeof colVariants> {
  asChild?: boolean;
}

const Col = ({ className, asChild = false, ...props }: ColProps) => {
  const Comp = asChild ? Slot : 'div';
  return (
    // @ts-ignore: Shadcn UI v4 Comp
    <Comp
      data-slot="col"
      className={cn(colVariants({ className }))}
      {...props}
    />
  );
};

export { Col, colVariants };
