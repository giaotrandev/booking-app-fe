import { cn } from '#/lib/utilities/cn';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { ComponentProps } from 'react';
import { Icon, IconNamesProps } from '../icons';
import { Typography, TypographyProps, typographyVariants } from './typography';

interface ButtonLinkUnderlineProps extends ComponentProps<'button'> {
  text?: string;
  variant?: TypographyProps['variant'];
  asChild?: boolean;
  smallIcon?: boolean;
  icon?: IconNamesProps;
}

const ButtonLinkUnderline = ({
  text,
  asChild,
  variant,
  className,
  icon,
  children,
  ...props
}: ButtonLinkUnderlineProps) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(
        typographyVariants({ variant }),
        'group/menu-link flex items-center space-x-1.5 text-black',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'before:bg-pj-red relative before:absolute before:bottom-0 before:h-px before:w-full before:origin-right before:scale-x-0 before:transition-transform before:content-[""]',
        'group-hocus-visible/menu-link:text-pj-red group-hocus-visible/menu-link:transition-[color] group-hocus-visible/menu-link:before:scale-100 group-hocus-visible/menu-link:before:origin-left',
        className,
      )}
      {...props}
    >
      <Slottable>{children}</Slottable>
      <span>{text}</span>
      {icon && (
        <span>
          <Icon
            name={icon}
            className="group-hocus-visible/menu-link:fill-pj-red group-hocus-visible/menu-link:stroke-pj-red h-6 w-6 flex-none fill-black stroke-black transition-[fill,stroke]"
          />
        </span>
      )}
    </Comp>
  );
};

export { ButtonLinkUnderline };
