import { cn } from '#/lib/utilities/cn';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';

// SETUP - UI: Go to https://fluidtypography.com/ to make typography responsive (if it needed)

const typographyVariants = cva([''], {
  variants: {
    variant: {
      'big-title': ' text-[48px]/[1] lg:text-[60px]/[1.25]',
      h1: 'leading-none text-[36px] lg:text-[48px]',
      h2: 'leading-none text-[30px] lg:text-[40px]',
      h3: 'font-semibold leading-none text-[28px] lg:text-[32px]',
      h4: 'font-bold leading-none text-[18px] lg:text-[24px]',
      h5: 'font-semibold leading-none lg:text-[22px]',
      h6: 'leading-[1.25] lg:text-[20px]',
      title: '  leading-[0.87] text-[24px] lg:text-[36px]',
      label: '  leading-none text-[14px] lg:text-[18px]',
      'small-label': '  leading-none text-[16px]',
      'sub-label': '  leading-[0.75] text-[12px]',
      body: 'leading-normal text-[16px]',
      'sub-body': 'leading-none text-[14px]',
      'button-label': 'font-medium leading-none text-[18px] lg:text-[20px]',
      'small-number': ' leading-none text-[14px]',
      // p2: 'text-[16px] leading-[22px] lg:text-[24px] lg:leading-[32px]',
      // p3: 'text-[14px] leading-[18px] lg:text-[18px] lg:leading-[26px]',
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
