import { Icon } from '#/components/icons';
import { Typography } from '#/components/ui/typography';
import { useLogout } from '#/lib/hooks/use-handle-logout';
import { cn } from '#/lib/utilities/cn';
import { useMediaQuery } from 'usehooks-ts';
import { UserMenuLinkItem, UserMenuLinkItemProps } from './user-menu-link-item';

interface UserMenuListProps {}
export const userMenuItems: UserMenuLinkItemProps[] = [
  {
    link: {
      url: '/my-account/profile',
      text: 'My account',
    },
    icon: { name: 'face-human' },
  },
  {
    link: {
      url: '/my-account/my-booking',
      text: 'My booking',
    },
    icon: { name: 'ticket' },
  },
];
const UserMenuList = ({}: UserMenuListProps) => {
  const { handleLogout } = useLogout();
  const matches = useMediaQuery('(min-width: 1024px)');

  return (
    <ul>
      {userMenuItems.map((item, index) => (
        <li
          key={index}
          className={cn(
            'border-b-pj-grey px-4 py-2 lg:border-b',
            !matches && index === userMenuItems.length - 1
              ? 'border-none'
              : 'border-b',
          )}
        >
          <UserMenuLinkItem link={item.link} icon={item.icon} />
        </li>
      ))}
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
          <span>Logout</span>
        </Typography>
      </li>
    </ul>
  );
};

export { UserMenuList };
