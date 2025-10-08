import { Icon } from '#/components/icons';
import { Typography } from '#/components/ui/typography';
import { useLogout } from '#/lib/hooks/use-handle-logout';
import { cn } from '#/lib/utilities/cn';
import { useMediaQuery } from 'usehooks-ts';
import { UserMenuLinkItem, UserMenuLinkItemProps } from './user-menu-link-item';
import { useTranslate } from '#/i18n/client';

interface UserMenuListProps {}

const UserMenuList = ({}: UserMenuListProps) => {
  const { handleLogout } = useLogout();
  const matches = useMediaQuery('(min-width: 1024px)');
  const { translate } = useTranslate();
  const userMenuItems: UserMenuLinkItemProps[] = [
    {
      link: {
        url: '/my-account/profile',
        text: translate({
          vi: 'Tài khoản của tôi',
          en: 'My account',
        }),
      },
      icon: { name: 'face-human' },
    },
    {
      link: {
        url: '/my-account/my-booking',
        text: translate({
          vi: 'Đặt chỗ của tôi',
          en: 'My booking',
        }),
      },
      icon: { name: 'ticket' },
    },
  ];
  return (
    <ul>
      {userMenuItems.map((item, index) => (
        <li
          key={index}
          className={cn(
            'border-b-pj-gray-lightest px-4 py-3 lg:border-b',
            !matches && index === userMenuItems.length - 1
              ? 'border-none'
              : 'border-b',
          )}
        >
          <UserMenuLinkItem link={item.link} icon={item.icon} />
        </li>
      ))}

      {/* Logout */}
      <li
        className="group hidden cursor-pointer px-4 py-2 lg:flex"
        onClick={handleLogout}
      >
        <Icon
          name="logout"
          className="group-hocus-visible:stroke-pj-red h-5 w-5 stroke-black transition-[stroke]"
        />
        <Typography
          asChild
          className="hocus-visible:text-pj-red flex-1 pl-2 transition-colors"
        >
          <span>
            {translate({
              vi: 'Đăng xuất',
              en: 'Logout',
            })}
          </span>
        </Typography>
      </li>
    </ul>
  );
};

export { UserMenuList };
