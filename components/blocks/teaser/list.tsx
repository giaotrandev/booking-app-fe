'use client';
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from '#/lib/utilities/cn';

import TeaserItem, { TeaserItemProps } from './item';
import { Slide, SliderAbstract } from '#/components/common/slider-abstract';

export interface TeaserListProps {
  list?: TeaserItemProps[];
}
const TeaserList = ({ list }: TeaserListProps) => {
  if (!(Array.isArray(list) && list.length > 0)) return null;
  return (
    <SliderAbstract
      gap={{
        desktop: 24,
        tablet: 24,
        mobile: 12,
      }}
      showArrows
      showProgress
      overlayTwoSide
      className="px-5 lg:px-20"
    >
      {list.map((item, key) => (
        <Slide
          width={{
            desktop: '390px',
            tablet: '390px',
            mobile: '280px',
          }}
          key={key}
          className={cn(key % 2 !== 0 && 'pt-4 lg:pt-8')}
        >
          <TeaserItem {...item} />
        </Slide>
      ))}
    </SliderAbstract>
  );
};

export { TeaserList };
