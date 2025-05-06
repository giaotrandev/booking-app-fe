import { cn } from '#/lib/utilities/cn';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';
import { typographyVariants } from './typography';

const buttonVariants = cva(
  [
    typographyVariants({ variant: 'body' }),
    'font-armata inline-flex items-center text-center justify-center cursor-pointer',
    // disabled
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: 'text-[16px]',
        small: 'text-[13px]',
      },
      colors: {
        none: '',
        blue: 'text-pj-blue',
        grey: 'text-pj-grey-medium',
        'grey-light': 'text-pj-grey-light',
      },
    },
    defaultVariants: {
      variant: 'default',
      colors: 'blue',
    },
  },
);

export interface ButtonLinkProps
  extends ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  text?: string;
}

const ButtonLink = ({
  className,
  variant,
  children,
  text,
  colors,
  asChild = false,
  ...props
}: ButtonLinkProps) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      data-cursor="default"
      data-slot="button-link"
      className={cn(
        'group/button',
        buttonVariants({ variant, colors, className }),
      )}
      {...props}
    >
      <Slottable>{children}</Slottable>
      <span className="relative overflow-hidden">
        <span
          className={cn(
            'group-hocus-visible/button:-translate-y-[110%] relative inline-block transition-transform duration-500 ease-[cubic-bezier(.4,0,0,1)] before:absolute before:bottom-0 before:left-0 before:h-px before:w-full before:content-[""]',
            colors == 'blue' && 'before:bg-pj-blue',
            colors == 'grey' && 'before:bg-pj-grey',
            colors == 'grey-light' && 'before:bg-pj-grey-light',
          )}
        >
          {text}
        </span>
        <span
          className={cn(
            'group-hocus-visible/button:translate-y-0 absolute inset-0 flex translate-y-full items-center justify-center transition-transform duration-500 ease-[cubic-bezier(.4,0,0,1)] before:absolute before:bottom-0 before:left-0 before:h-px before:w-full before:content-[""]',
            colors == 'blue' && 'before:bg-pj-blue',
            colors == 'grey' && 'before:bg-pj-grey',
            colors == 'grey-light' && 'before:bg-pj-grey-light',
          )}
        >
          {text}
        </span>
      </span>
    </Comp>
  );
};

export { ButtonLink, buttonVariants };
