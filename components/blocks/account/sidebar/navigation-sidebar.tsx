import { IconProps } from '#/components/icons';
import { getTranslate } from '#/i18n/server';
import {
  UserMenuLinkItem,
  UserMenuLinkItemProps,
} from '#/layouts/home-layout/header/user-menu-link-item';
import { cn } from '#/lib/utilities/cn';
import { LinkProps } from '#/types/global';

export interface NavigationSidebarProps {
  link?: LinkProps;
  icon?: IconProps;
}

const NavigationSidebar = async ({}: NavigationSidebarProps) => {
  const { translate } = await getTranslate();
  const NavigationItemSidebarSample: UserMenuLinkItemProps[] = [
    {
      link: {
        url: '/my-account/profile',
        text: await translate({
          vi: 'Hồ sơ',
          en: 'Profile',
        }),
      },
      icon: { name: 'face-human' },
    },
    {
      link: {
        url: '/my-account/change-password',
        text: await translate({
          vi: 'Đổi mật khẩu',
          en: 'Change password',
        }),
      },
      icon: { name: 'password' },
    },
    {
      link: {
        url: '/my-account/my-booking',
        text: await translate({
          vi: 'Đặt chỗ của tôi',
          en: 'My booking',
        }),
      },
      icon: { name: 'ticket' },
    },
  ];
  return (
    <ul className="rounded-md bg-white">
      {NavigationItemSidebarSample.map((item, index) => (
        <li key={index}>
          <UserMenuLinkItem
            link={item.link}
            icon={item.icon}
            hasArrowIcon
            className={cn('border-b-pj-gray-lightest border-b-2 px-5 py-4')}
          />
        </li>
      ))}
    </ul>
  );
};

export { NavigationSidebar };
