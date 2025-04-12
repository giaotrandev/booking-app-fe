import { cn } from '#/lib/utilities/cn';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';

// SETUP - UI: Go to https://fluidtypography.com/ to make typography responsive (if it needed)

const typographyVariants = cva([''], {
  variants: {
    variant: {
      body: '',
    },
  },
  defaultVariants: {
    variant: 'body',
  },
});

export interface TypographyProps
  extends ComponentProps<'div'>,
    VariantProps<typeof typographyVariants> {
  asChild?: boolean;
}

const Typography = ({
  className,
  variant,
  asChild = false,
  ...props
}: TypographyProps) => {
  const Comp = asChild ? Slot : 'div';
  return (
    // @ts-ignore: Shadcn UI v4 Comp
    <Comp
      data-slot="typography"
      className={cn(typographyVariants({ variant, className }))}
      {...props}
    />
  );
};

export { Typography, typographyVariants };
