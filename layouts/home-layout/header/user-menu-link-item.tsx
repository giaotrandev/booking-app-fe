'use client';
import { StretchedLink } from '#/components/common/stretched-link';
import { Icon, IconProps } from '#/components/icons';
import { Typography } from '#/components/ui/typography';
import { usePathname } from '#/i18n/routing';
import { cn } from '#/lib/utilities/cn';
import { LinkProps } from '#/types/global';

export interface UserMenuLinkItemProps {
  link: LinkProps;
  icon?: IconProps;
  hasArrowIcon?: boolean;
  className?: string;
}

const UserMenuLinkItem = ({
  link,
  icon,
  hasArrowIcon,
  className,
}: UserMenuLinkItemProps) => {
  const pathName = usePathname();
  return (
    <StretchedLink
      link={link}
      className={cn('group flex items-center justify-between', className)}
    >
      <span className="flex items-center">
        {icon && (
          <Icon
            {...icon}
            className={cn(
              'group-hocus-visible:stroke-pj-red h-5 w-5 stroke-black transition-[stroke]',
              pathName === link.url && 'stroke-pj-red',
            )}
          />
        )}
        {link?.text && (
          <Typography
            asChild
            className={cn(
              'group-hocus-visible:text-pj-red pl-2 transition-colors',
              pathName === link?.url && 'text-pj-red',
            )}
          >
            <span>{link.text}</span>
          </Typography>
        )}
      </span>
      {hasArrowIcon && (
        <Icon
          name="chevron-right"
          className={cn(
            'group-hocus-visible:stroke-pj-red h-4 w-4 stroke-black transition-[stroke]',
            pathName === link.url && 'stroke-pj-red',
          )}
        />
      )}
    </StretchedLink>
  );
};

export { UserMenuLinkItem };
