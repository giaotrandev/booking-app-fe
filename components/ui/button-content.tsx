import { cn } from '#/lib/utilities/cn';
import { Icon, IconProps } from '../icons';

export interface ButtonContentProps {
  text: string;
  icon?: IconProps;
  iconClassName?: string;
  iconPosition?: 'left' | 'right';
}
const ButtonContent = ({
  text,
  icon,
  iconClassName,
  iconPosition,
}: ButtonContentProps) => {
  return (
    <span className="relative flex items-center overflow-hidden">
      <span
        className={cn(
          'lg:group-hocus-visible/button:-translate-y-full flex transition-transform duration-500 ease-[cubic-bezier(.4,0,0,1)]',
          icon && 'items-center gap-x-2',
          iconPosition === 'right' && 'flex-row-reverse',
        )}
      >
        {icon && (
          <Icon
            name={icon.name}
            className={cn('h-4 w-4 stroke-black', iconClassName)}
          />
        )}
        {text}
      </span>
      <span
        className={cn(
          'lg:group-hocus-visible/button:translate-y-0 absolute inset-0 flex translate-y-full items-center justify-center transition-transform duration-500 ease-[cubic-bezier(.4,0,0,1)]',
          icon && 'items-center gap-x-2',
          iconPosition === 'right' && 'flex-row-reverse',
        )}
      >
        {icon && (
          <Icon
            name={icon.name}
            className={cn('h-4 w-4 stroke-black', iconClassName)}
          />
        )}
        {text}
      </span>
    </span>
  );
};
export { ButtonContent };
