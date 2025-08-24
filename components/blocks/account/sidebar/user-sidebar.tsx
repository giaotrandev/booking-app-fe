'use client';

import { Typography } from '#/components/ui/typography';
import { UserAvatar } from '#/components/ui/user-avatar';
import { useUserStore } from '#/store/user';

interface AccountSideBarProps {}

const AccountSideBar = ({}: AccountSideBarProps) => {
  const { user } = useUserStore();
  if (!user) return null;
  return (
    <div className="flex flex-col items-center justify-center gap-y-3 rounded-md bg-white p-6 lg:p-8">
      <UserAvatar
        urlAvatar={user?.avatarUrl}
        userName={user?.name
          .split(' ')
          .map(word => word[0].toUpperCase())
          .join('')}
        avatarClassName="lg:size-24"
        titleFallBack="h3"
      />
      {user && user.name && (
        <Typography asChild className="" variant="h4">
          <p>{user?.name}</p>
        </Typography>
      )}
    </div>
  );
};

export { AccountSideBar };
