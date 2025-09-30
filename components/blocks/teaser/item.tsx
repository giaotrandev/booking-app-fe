import { Typography } from '#/components/ui/typography';
import { blurDataUrl } from '#/lib/constant';
import { ProvincesRequestProps } from '#/services/global-settings/provinces-request';
import Image from 'next/image';

export interface TeaserItemProps extends ProvincesRequestProps {}
const TeaserItem = ({ image, name }: TeaserItemProps) => {
  return (
    <div className="flex h-full flex-col">
      <div className="relative pt-[100%]">
        <Image
          src={image ?? '/images/placeholder.jpg'}
          alt={name ?? ''}
          fill
          className="object-cover"
          placeholder="blur"
          blurDataURL={blurDataUrl}
        />
      </div>
      {/* TODO: UPDATE COLOR FOR BG */}
      <div className="bg-pj-orange-medium flex-1 px-4 py-2.5 text-white uppercase">
        <Typography asChild variant="h5">
          <p>{name}</p>
        </Typography>
        {/* <Typography asChild>
          <p>{description}</p>
        </Typography> */}
      </div>
    </div>
  );
};

export default TeaserItem;
