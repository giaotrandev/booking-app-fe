import { IconProps } from '#/components/icons';
import {
  UserMenuLinkItem,
  UserMenuLinkItemProps,
} from '#/layouts/home-layout/header/user-menu-link-item';
import { userMenuItems } from '#/layouts/home-layout/header/user-menu-list';
import { cn } from '#/lib/utilities/cn';
import { LinkProps } from '#/types/global';

export interface NavigationSidebarProps {
  link?: LinkProps;
  icon?: IconProps;
}

const NavigationSidebar = ({}: NavigationSidebarProps) => {
  return (
    <ul className="rounded-md bg-white">
      {NavigationItemSidebarSample.map((item, index) => (
        <li key={index}>
          <UserMenuLinkItem
            link={item.link}
            icon={item.icon}
            hasArrowIcon
            className={cn('border-b-pj-grey-lightest border-b-2 px-5 py-4')}
          />
        </li>
      ))}
    </ul>
  );
};

export { NavigationSidebar };
export const NavigationItemSidebarSample: UserMenuLinkItemProps[] = [
  {
    link: {
      url: '/my-account/profile',
      text: 'Profile',
    },
    icon: { name: 'face-human' },
  },
  {
    link: {
      url: '/my-account/change-password',
      text: 'Change password',
    },
    icon: { name: 'password' },
  },
  {
    link: {
      url: '/my-account/my-booking',
      text: 'My booking',
    },
    icon: { name: 'ticket' },
  },
];
