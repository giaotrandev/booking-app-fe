import { cn } from '#/lib/utilities/cn';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { ComponentProps } from 'react';
import { Icon, IconProps } from '../icons';
import { cva, VariantProps } from 'class-variance-authority';

const buttonIconVariants = cva(
  [
    'group/button-icon inline-flex shrink-0 grow-0 cursor-pointer items-center justify-center rounded-full border',
    'lg:group-hocus-visible/button-icon:border-black lg:group-hocus-visible/button-icon:bg-white lg:hocus-visible:bg-white lg:transition-[border,background-color] lg:duration-300',
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      size: {
        sm: 'size-6 basis-6 [&_[data-slot=button-icon-icon]]:size-3', // button 24px, icon 12px
        md: 'size-8 basis-8 [&_[data-slot=button-icon-icon]]:size-4', // button 32px, icon 16px
        lg: 'size-10 basis-10 [&_[data-slot=button-icon-icon]]:size-5', // button 40px, icon 20px
        xl: 'size-16 basis-16 [&_[data-slot=button-icon-icon]]:size-8', // button 40px, icon 20px
      },
      colors: {
        black: 'bg-black border-black lg:hocus-visible:border-black',
        red: 'bg-pj-red border-pj-red lg:hocus-visible:border-pj-red',
      },
    },
    defaultVariants: {
      size: 'md',
      colors: 'red',
    },
  },
);

export interface ButtonIconProps
  extends ComponentProps<'button'>,
    VariantProps<typeof buttonIconVariants> {
  asChild?: boolean;
  icon?: IconProps;
  colors?: 'red' | 'black';
}

const ButtonIcon = ({
  className,
  children,
  asChild = false,
  icon,
  colors = 'red',
  size,
  ...props
}: ButtonIconProps) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      data-slot="button-icon"
      className={cn(buttonIconVariants({ size, colors }), className)}
      data-cursor="default"
      {...props}
    >
      {children && <Slottable>{children}</Slottable>}
      {icon && (
        <Icon
          data-slot="button-icon-icon"
          className={cn(
            'fill-white stroke-white lg:transition-[fill,stroke]',
            colors === 'black' &&
              'lg:group-hocus-visible/button-icon:fill-black lg:group-hocus-visible/button-icon:stroke-black lg:hocus-visible:fill-black lg:hocus-visible:stroke-black',
            colors === 'red' &&
              'lg:group-hocus-visible/button-icon:fill-pj-red lg:group-hocus-visible/button-icon:stroke-pj-red lg:hocus-visible:fill-pj-red lg:hocus-visible:stroke-pj-red',
            icon?.className,
          )}
          {...icon}
        />
      )}
    </Comp>
  );
};

export { ButtonIcon, buttonIconVariants };
