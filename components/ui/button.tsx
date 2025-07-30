import { cn } from '#/lib/utilities/cn';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';
import { typographyVariants } from './typography';
import { ButtonContent } from './button-content';
import { IconProps } from '../icons';

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
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        small: 'px-4 py-2 text-[14px] lg:text-[16px]',
      },
      colors: {
        none: '',
        red: 'bg-pj-red',
        black: 'bg-black',
        grey: 'bg-pj-grey',
        blue: 'bg-pj-blue',
      },
      shape: {
        default: 'rounded-[10px]',
        tag: 'rounded-[24px]',
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
  icon?: IconProps;
}

const Button = ({
  className,
  variant,
  children,
  text,
  colors,
  shape,
  icon,
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
        variant === 'with-shadow' && 'text-[14px] lg:text-[14px]',
      )}
      {...props}
    >
      {children && <Slottable>{children}</Slottable>}
      {text && <ButtonContent text={text} icon={icon} />}
    </Comp>
  );
};

export { Button, buttonVariants };
