'use client';
import { StretchedLink } from '#/components/common/stretched-link';
import { Button } from '#/components/ui/button';
import { usePathname } from '#/i18n/routing';
import { useLogout } from '#/lib/hooks/use-handle-logout';
import { useGlobalsStore } from '#/store/globals';
import { useUserStore } from '#/store/user';
import { LinkProps } from '#/types/global';
import { ItemMenu } from './item-menu';
import { UserMenu } from './user-menu';

export interface LayoutHeaderMenuProps {
  list?: LinkProps[];
}

const LayoutHeaderMenu = ({ list }: LayoutHeaderMenuProps) => {
  const pathname = usePathname();
  if (!(Array.isArray(list) && list.length > 0)) {
    return null;
  }
  const { setSidenavOpen } = useGlobalsStore();
  const { isLoggedIn } = useUserStore();
  const { handleLogout } = useLogout();
  const handleButtonLogout = () => {
    handleLogout();
    setSidenavOpen(false);
  };
  return (
    <nav className="h-full">
      <ul className="flex h-full flex-col items-center gap-y-6 px-4 lg:flex-row lg:flex-wrap lg:space-x-8 lg:gap-y-0">
        {list.map((item, key) => {
          const active = pathname === item.url;
          return (
            <li key={key}>
              <ItemMenu active={active} cta={item} />
            </li>
          );
        })}
        <li className="w-full lg:hidden">
          {isLoggedIn ? (
            <Button
              className="h-12 w-full"
              text="Logout"
              onClick={handleButtonLogout}
            />
          ) : (
            <Button className="h-12 w-full" asChild>
              <StretchedLink
                link={{
                  url: '/login',
                }}
                onClick={() => setSidenavOpen(false)}
              >
                Login
              </StretchedLink>
            </Button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export { LayoutHeaderMenu };
