import { cn } from '#/lib/utilities/cn';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';

const rowVariants = cva(['grid grid-cols-4 lg:grid-cols-12']);

export interface RowProps
  extends ComponentProps<'div'>,
    VariantProps<typeof rowVariants> {
  asChild?: boolean;
}

const Row = ({ className, asChild = false, ...props }: RowProps) => {
  const Comp = asChild ? Slot : 'div';
  return (
    // @ts-ignore: Shadcn UI v4 Comp
    <Comp
      data-slot="row"
      className={cn(rowVariants({ className }))}
      {...props}
    />
  );
};

export { Row, rowVariants };
