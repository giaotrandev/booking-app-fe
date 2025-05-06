import { cn } from '#/lib/utilities/cn';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';
import { typographyVariants } from './typography';

const buttonVariants = cva(
  [
    typographyVariants({ variant: 'button-label' }),
    'inline-flex items-center justify-center cursor-pointer text-white',
    // disabled
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: 'px-4.5 py-1.75 uppercase',
        big: 'py-2.5 w-full lg:max-w-74 uppercase',
        'with-shadow':
          'text-black font-normal py-3 px-4.5 shadow-[0px_4px_4px_0px_#00000040]',
        special: 'w-full lg:max-w-74 py-2.25 px-8',
      },
      colors: {
        none: '',
        red: 'bg-pj-red',
        black: 'bg-pj-black',
        grey: 'bg-pj-grey',
      },
      shape: {
        default: 'rounded-[10px]',
        special: 'border border-pj-grey-light rounded-[25px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      colors: 'red',
      shape: 'default',
    },
  },
);

export interface ButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  text?: string;
}

const Button = ({
  className,
  variant,
  children,
  text,
  colors,
  shape,
  asChild = false,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      data-slot="button"
      className={cn(
        'group/button',
        buttonVariants({ variant, colors, shape, className }),
      )}
      {...props}
    >
      <span className="relative flex items-center overflow-hidden">
        <span className="group-hocus-visible/button:-translate-y-full inline-block transition-transform duration-500 ease-[cubic-bezier(.4,0,0,1)]">
          {text ? text : <Slottable>{children}</Slottable>}
        </span>
        <span className="group-hocus-visible/button:translate-y-0 absolute inset-0 flex translate-y-full items-center justify-center transition-transform duration-500 ease-[cubic-bezier(.4,0,0,1)]">
          {text ? text : <Slottable>{children}</Slottable>}
        </span>
      </span>
    </Comp>
  );
};

export { Button, buttonVariants };
