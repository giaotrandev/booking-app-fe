import { cn } from '#/lib/utilities/cn';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';

const containerVariants = cva([''], {
  variants: {
    variant: {
      standard: 'px-5 lg:px-30',
    },
  },
  defaultVariants: {
    variant: 'standard',
  },
});

export interface ContainerProps
  extends ComponentProps<'div'>,
    VariantProps<typeof containerVariants> {
  asChild?: boolean;
}

const Container = ({
  className,
  variant,
  asChild = false,
  ...props
}: ContainerProps) => {
  const Comp = asChild ? Slot : 'div';
  return (
    // @ts-ignore: Shadcn UI v4 Comp
    <Comp
      data-slot="container"
      className={cn(containerVariants({ variant, className }))}
      {...props}
    />
  );
};

export { Container, containerVariants };
