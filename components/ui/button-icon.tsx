import { cn } from '#/lib/utilities/cn';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { ComponentProps } from 'react';
import { Icon, IconProps } from '../icons';

export interface ButtonIconProps extends ComponentProps<'button'> {
  asChild?: boolean;
  icon?: IconProps;
}

const ButtonIcon = ({
  className,
  children,
  asChild = false,
  icon,
  ...props
}: ButtonIconProps) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      data-slot="button-icon"
      className={cn(
        'group/button-icon box-border inline-flex size-8 shrink-0 grow-0 basis-8 cursor-pointer items-center justify-center rounded-full border border-black bg-black lg:size-10 lg:basis-10',
        'lg:group-hocus-visible/button-icon:border-black lg:group-hocus-visible/button-icon:bg-white lg:hocus-visible:border-black lg:hocus-visible:bg-white lg:transition-[border,background-color] lg:duration-300',
        // disabled
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      data-cursor="default"
      {...props}
    >
      <Slottable>{children}</Slottable>
      <span
        data-slot="button-icon-icon"
        className="inline-flex items-center justify-center"
      >
        <Icon
          {...icon}
          className={cn(
            'lg:group-hocus-visible/button-icon:fill-black lg:group-hocus-visible/button-icon:stroke-black lg:hocus-visible:fill-black lg:hocus-visible:stroke-black size-6 fill-white stroke-white lg:transition-[fill,stroke] lg:duration-300',
            icon?.className,
          )}
        />
      </span>
    </Comp>
  );
};

export { ButtonIcon };
