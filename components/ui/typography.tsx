import { cn } from '#/lib/utilities/cn';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';

// SETUP - UI: Go to https://fluidtypography.com/ to make typography responsive (if it needed)

const typographyVariants = cva([''], {
  variants: {
    variant: {
      'big-title': 'leading-none font-archivo text-[64px]',
      h1: 'font-archivo leading-none lg:text-[48px]',
      h2: 'font-archivo leading-none lg:text-[40px]',
      h3: 'font-semibold leading-none lg:text-[32px]',
      h4: 'font-bold leading-none lg:text-[24px]',
      h5: 'font-semibold leading-none lg:text-[22px]',
      h6: 'leading-none lg:text-[20px]',
      label: 'font-armata leading-none text-[14px] lg:text-[18px]',
      'small-label': 'font-roboto leading-none text-[16px]',
      'sub-label': 'font-roboto leading-[0.75] text-[12px]',
      body: 'leading-[0.667] text-[16px]',
      'sub-body': 'font-armata leading-none text-[11px]',
      'button-label': 'font-medium leading-none text-[18px] lg:text-[20px]',
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
