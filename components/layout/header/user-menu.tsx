'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu';
import { Typography } from '#/components/ui/typography';
import { useEffect } from 'react';
import { UserMenuList } from './user-menu-list';
import { useUserStore } from '#/store/user';
import { useMediaQuery } from 'usehooks-ts';
import { UserAvatar } from '#/components/ui/user-avatar';
import { useGlobalsStore } from '#/store/globals';
export interface UserMenuProps {}

const UserMenu = ({}: UserMenuProps) => {
  const { sideUserDropDown, setSideUserDropDown } = useGlobalsStore();
  const { user } = useUserStore();
  const matches = useMediaQuery('(min-width: 1024px)');
  useEffect(() => {
    if (!matches && sideUserDropDown) {
      setSideUserDropDown(false);
    }
  }, [matches, sideUserDropDown, setSideUserDropDown]);
  return (
    <DropdownMenu
      modal={false}
      open={sideUserDropDown}
      onOpenChange={setSideUserDropDown}
    >
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          // disabled={processing}
          className="inline-flex cursor-pointer"
        >
          <UserAvatar
            urlAvatar={user?.avatarUrl}
            userName={user?.name
              .split(' ')
              .map(word => word[0].toUpperCase())
              .join('')}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={14}
        className="pointer-events-auto z-[1094] w-full max-w-[600px] rounded-md bg-white drop-shadow-sm"
      >
        <div className="flex w-full flex-col">
          <div className="border-b-pj-grey-lightest border-b">
            <div className="flex items-center justify-between px-3 py-3">
              <UserAvatar
                avatarClassName="size-10"
                titleFallBack="h6"
                urlAvatar={user?.avatarUrl}
                userName={user?.name
                  .split(' ')
                  .map(word => word[0].toUpperCase())
                  .join('')}
              />
              {user && (user.name || user.email) && (
                <div className="flex-1 pl-2">
                  {user.name && (
                    <Typography asChild className="font-medium">
                      <p>{user?.name}</p>
                    </Typography>
                  )}
                  {user.email && (
                    <Typography asChild variant="sub-body">
                      <p>{user.email}</p>
                    </Typography>
                  )}
                </div>
              )}
            </div>
          </div>
          <UserMenuList />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { UserMenu };
