'use client';
import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar';
import { cn } from '#/lib/utilities/cn';
import { Typography, TypographyProps } from './typography';

export interface UserAvatarProps {
  userName?: string;
  avatarClassName?: string;
  titleFallBack?: TypographyProps['variant'];
  urlAvatar?: string;
  width?: number;
  height?: number;
}

const UserAvatar = ({
  userName,
  urlAvatar,
  avatarClassName,
  titleFallBack,
  width,
  height,
}: UserAvatarProps) => {
  return (
    <Avatar
      className={cn(
        'flex size-12 items-center justify-center',
        avatarClassName,
      )}
    >
      <AvatarImage
        src={urlAvatar || undefined}
        alt="user-icon"
        className="h-full w-full object-cover"
        width={width ?? 56}
        height={height ?? 56}
      />
      <AvatarFallback className={cn('bg-pj-input')}>
        <Typography
          className="font-medium text-black"
          variant={titleFallBack ?? 'h4'}
        >
          <p>{userName || 'User'}</p>
        </Typography>
      </AvatarFallback>
    </Avatar>
  );
};

export { UserAvatar };
