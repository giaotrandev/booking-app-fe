'use client';

import { cn } from '#/lib/utilities/cn';
import { TabItemDetail } from './tab-detail';
import { useTranslate } from '#/i18n/client';

export interface TabDetailListPros {
  tabActive: number;
}

const TabDetailList = ({ tabActive }: TabDetailListPros) => {
  const { translate } = useTranslate();

  const tabItems = [
    {
      title: translate({
        vi: 'Chọn ghế',
        en: 'Seat Booking',
      }),
    },
    {
      title: translate({
        vi: 'Điểm đón / Điểm trả',
        en: 'Pick up / Drop off',
      }),
    },
    {
      title: translate({
        vi: 'Thông tin hành khách',
        en: 'Information',
      }),
    },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center lg:flex-row lg:justify-between">
      {tabItems.map((item, index) => (
        <div
          key={index}
          className={cn(
            'lg:relative lg:block',
            tabActive === index + 1 ? 'block' : 'hidden',
          )}
        >
          <TabItemDetail
            title={item.title}
            countNumber={index + 1}
            active={tabActive === index + 1}
          />
          {/* Nếu bạn muốn có thanh nối giữa các tab:
          {index < tabItems.length - 1 && (
            <p className="bg-pj-gray-light absolute top-1/2 left-[calc(100%+30px)] hidden h-px -translate-y-1/2 lg:block lg:w-24 xl:w-40" />
          )} */}
        </div>
      ))}
    </div>
  );
};

export { TabDetailList };
