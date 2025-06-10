'use client';
import { cn } from '#/lib/utilities/cn';
import { TabItemDetail } from './tab-detail';
import { useGlobalsStore } from '#/store/globals';

const TabDetailList = () => {
  const tabActive = useGlobalsStore(state => state.tabBookingActive);
  return (
    <div className="relative flex flex-col items-center justify-center lg:flex-row lg:justify-between">
      {sampleTabItemDetail.map((item, index) => (
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
          {/* {index < sampleTabItemDetail.length - 1 && (
            <p className="bg-pj-grey-light absolute top-1/2 left-[calc(100%+30px)] hidden h-px -translate-y-1/2 lg:block lg:w-24 xl:w-40" />
          )} */}
        </div>
      ))}
    </div>
  );
};

export { TabDetailList };
const sampleTabItemDetail = [
  {
    title: 'Seat Booking',
  },
  {
    title: 'Pick up/ Drop off',
  },
  {
    title: 'Information',
  },
];
