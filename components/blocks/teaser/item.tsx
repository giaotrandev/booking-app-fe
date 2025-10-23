'use client';
import { Typography } from '#/components/ui/typography';
import { blurDataUrl } from '#/lib/constant';
import Image from 'next/image';
import { useTranslate } from '#/i18n/client';
import { formatPrice } from '#/lib/utilities/format-price';
import { Icon } from '#/components/icons';
import { Button } from '#/components/ui/button';
import { formatDuration } from '#/lib/utilities/format-time';
import { useLocale } from 'next-intl';
import { ProvincesRequestProps } from '#/services/provinces/provinces-request';
import { sanitizeTitle } from '#/lib/utilities/sanitize-title';
import { format } from 'date-fns';
import { StretchedLink } from '#/components/common/stretched-link';

export interface TeaserItemProps extends ProvincesRequestProps {}
const TeaserItem = ({
  image,
  name,
  minPrice = 300000,
  code,
  sourceProvince,
  destinationProvince,
  estimatedDuration,
  description = 'Tuyến đường kết nối An Giang và Thành phố Hồ Chí Minh, thời gian di chuyển khoảng 4-5 giờ',
}: TeaserItemProps) => {
  const locale = useLocale();
  const { translate } = useTranslate();

  // 🧩 Tạo URL động cho booking
  const params = new URLSearchParams();

  if (sourceProvince?.name) {
    params.append('from', sanitizeTitle(sourceProvince.name));
  }
  if (destinationProvince?.name) {
    params.append('to', sanitizeTitle(destinationProvince.name));
  }

  const today = new Date();
  const threeDaysLater = new Date(today);
  threeDaysLater.setDate(today.getDate() + 3);

  params.append('departureDate', format(today, 'yyyy-MM-dd'));
  params.append('arrivalDate', format(threeDaysLater, 'yyyy-MM-dd'));

  const bookingUrl = `/booking?${params.toString()}`;
  return (
    <StretchedLink
      link={{
        url: bookingUrl,
      }}
      className="group/button relative block cursor-pointer overflow-hidden rounded-[24px]"
    >
      <div className="relative overflow-hidden pt-[calc((250/280)*100%)] lg:pt-[calc((300/390)*100%)]">
        <Image
          src={image ?? '/images/hero.webp'}
          alt={
            image
              ? `${translate({
                  vi: `Hình ảnh tuyến xe ${sourceProvince?.name ?? ''} - ${destinationProvince?.name ?? ''}`,
                  en: `Route image from ${sourceProvince?.name ?? ''} to ${destinationProvince?.name ?? ''}`,
                })}`
              : `${translate({
                  vi: `Tuyến xe ${sourceProvince?.name ?? ''} - ${destinationProvince?.name ?? ''}`,
                  en: `Bus route from ${sourceProvince?.name ?? ''} to ${destinationProvince?.name ?? ''}`,
                })}`
          }
          fill
          sizes="(max-width: 1023px) 74.66vw, 27.0833vw"
          className="z-0 rounded-[24px] object-cover transition-transform duration-300 ease-out group-hover/button:scale-105"
          placeholder="blur"
          blurDataURL={blurDataUrl}
        />
        <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
      </div>
      <div className="border-pj-gray-border relative w-full rounded-b-[24px] border border-t-0 bg-white px-5 pt-7 pb-6 lg:py-5">
        {(name || code) && (
          <div className="absolute bottom-[calc(100%+12px)] left-5 z-1 w-[calc(100%-40px)] pt-4">
            {name && (
              <Typography
                variant="h4"
                className="line-clamp-2 text-white"
                asChild
              >
                <p>{name}</p>
              </Typography>
            )}
            {code && (
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-x-2">
                  <div>
                    <Icon name="plane" className="h-4 w-4 stroke-white" />
                  </div>
                  <Typography
                    variant="label"
                    className="line-clamp-2 text-white uppercase"
                    asChild
                  >
                    <p>{code}</p>
                  </Typography>
                </div>
                {estimatedDuration && (
                  <div className="flex items-center gap-x-1 rounded-full bg-white/40 px-3 py-1.5">
                    <div>
                      <Icon name="lock" className="h-4 w-4 fill-white" />
                    </div>
                    <Typography
                      variant="small-number"
                      className="line-clamp-2 text-white uppercase"
                      asChild
                    >
                      <p>
                        {formatDuration(
                          estimatedDuration,
                          locale as 'en' | 'vi',
                        )}
                      </p>
                    </Typography>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        <div className="relative z-1">
          {description && (
            <div>
              {description && (
                <Typography className="text-pj-gray-light line-clamp-3" asChild>
                  <p>{description}</p>
                </Typography>
              )}
              <div className="bg-pj-gray-lightest mt-3 h-px w-full" />
              <div className="mt-3 flex flex-col gap-y-3">
                {minPrice && (
                  <Typography asChild variant="small-label">
                    <p className="flex items-center justify-between">
                      <span className="text-pj-gray-light">
                        {translate({
                          vi: `Giá vé chỉ từ:`,
                          en: `Prices from: `,
                        })}
                      </span>
                      <Typography asChild variant="h4">
                        <span className="text-pj-red">
                          {formatPrice(minPrice)}
                        </span>
                      </Typography>
                    </p>
                  </Typography>
                )}
                <div className="flex w-full">
                  <Button
                    text={translate({
                      vi: `Đặt vé ngay`,
                      en: `Book now`,
                    })}
                    asChild
                    iconPosition="right"
                    icon={{
                      name: 'arrow-right',
                    }}
                    iconClassName="w-6 h-6 stroke-white"
                    className="w-full uppercase"
                  >
                    <span />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </StretchedLink>
  );
};

export default TeaserItem;
