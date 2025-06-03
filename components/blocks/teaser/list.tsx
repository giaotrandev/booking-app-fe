'use client';
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from '#/lib/utilities/cn';

import TeaserItem, { TeaserItemProps } from './item';
import CarouselNavigation from '#/components/common/carousel-navigation';
import { usePrevNextButtons } from '#/lib/embla-carousel/arrow-buttons';

export interface TeaserListProps {
  list?: TeaserItemProps[];
}
const TeaserList = ({ list }: TeaserListProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    watchDrag: true,
  });
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);
  if (!(Array.isArray(list) && list.length > 0)) return null;
  return (
    <div className="w-full">
      <div className="relative overflow-hidden" ref={emblaRef}>
        <div className="-ml-8.25 flex">
          {list.map((item, index) => {
            return (
              <div
                key={index}
                className={cn(
                  'min-w-0 shrink-0 grow-0',
                  'w-full basis-full lg:w-[291px] lg:basis-[291px]',
                  'pl-8.25',
                )}
              >
                <TeaserItem {...item} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-2">
        <CarouselNavigation
          onPrevClick={onPrevButtonClick}
          onNextClick={onNextButtonClick}
          prevDisabled={prevBtnDisabled}
          nextDisabled={nextBtnDisabled}
        />
      </div>
    </div>
  );
};

export { TeaserList };
