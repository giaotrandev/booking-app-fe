'use client';

import { Typography } from '#/components/ui/typography';
import { useTranslate } from '#/i18n/client';
import { blurDataUrl } from '#/lib/constant';
import { cn } from '#/lib/utilities/cn';
import Image from 'next/image';

interface MilestoneItemProps {
  year?: string;
  title?: string;
  description?: string;
  image?: string;
  onClick?: () => void;
  isActive?: boolean;
  isLast?: boolean; // tùy chọn để ẩn line dưới dot cuối
}

const MilestoneItem = ({
  year,
  title,
  description,
  image,
  onClick,
  isActive = false,
  isLast = false,
}: MilestoneItemProps) => {
  const { translate } = useTranslate();
  return (
    <div
      className={cn(
        'flex cursor-pointer justify-between gap-x-4 transition-opacity',
        isActive ? 'opacity-100' : 'hocus-visible:opacity-100 opacity-60',
      )}
      onClick={onClick}
    >
      <div className="w-[20%]">
        <Typography
          asChild
          variant="h3"
          className={cn(
            'font-bold transition-colors',
            isActive ? 'text-pj-red' : 'text-black',
          )}
        >
          <p>{year}</p>
        </Typography>
      </div>

      <div className="flex flex-1 justify-between gap-x-4">
        <div className="relative flex flex-col items-center">
          <div
            className={cn(
              'relative z-10 flex h-4 w-4 rounded-full border-2 transition-[background-color,border-color]',
              isActive
                ? 'bg-pj-red border-pj-red shadow-[0_0_0_4px_rgba(255,0,0,0.2)]'
                : 'border-pj-gray-light bg-white',
            )}
          />
          {!isLast && (
            <div
              className={cn(
                'absolute top-4 h-[60px] w-px transition-[background-color]',
                isActive ? 'bg-pj-red/70' : 'bg-pj-gray-light',
              )}
            />
          )}
        </div>

        <div className="flex-1">
          <Typography
            asChild
            variant="h6"
            className={cn(
              'font-medium transition-colors',
              isActive ? 'text-pj-red' : 'text-black',
            )}
          >
            <p>{title}</p>
          </Typography>
          <Typography
            asChild
            className={cn(
              'transition-colors',
              isActive ? 'text-pj-gray-dark' : 'text-pj-gray-light',
            )}
          >
            <p>{description}</p>
          </Typography>
          {/* {image && (
            <div
              className={cn(
                'relative block h-10 pt-[100%] lg:hidden',
                isActive ? 'block' : 'hidden',
              )}
            >
              <Image
                src={image}
                alt={translate({
                  vi: `Hình ảnh cột mốc năm ${year} - ${title}`,
                  en: `Milestone image ${year} - ${title}`,
                })}
                fill
                className="rounded-2xl object-cover"
                placeholder="blur"
                blurDataURL={blurDataUrl}
              />
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export { MilestoneItem };
