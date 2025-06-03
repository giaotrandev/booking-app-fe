'use client';
import { cn } from '#/lib/utilities/cn';
import useEmblaCarousel from 'embla-carousel-react';
import HeroVideoItem from './item';
import Fade from 'embla-carousel-fade';
import { useIsClient } from 'usehooks-ts';
import { useId, useState } from 'react';
import { useTranslate } from '#/i18n/client';
import { useDotButton } from '#/lib/embla-carousel/dot-button';
import Autoplay from 'embla-carousel-autoplay';
import { Typography } from '#/components/ui/typography';
import {
  NavigationBooking,
  NavigationBookingProps,
} from './navigation-booking/render';

export interface HeroRenderBlockProps extends NavigationBookingProps {}
const HeroRenderBlock = ({
  arrivalList,
  destinationList,
}: HeroRenderBlockProps) => {
  const { translate } = useTranslate();
  const uuid = useId();
  const isClient = useIsClient();

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      watchDrag: true,
    },
    [Fade(), Autoplay()],
  );
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  const [slideActive, setSlideActive] = useState<number>(0);
  return (
    isClient && (
      <section ref={emblaRef} className="relative overflow-hidden">
        <div className="flex overflow-hidden">
          {heroListImagesAndVideos.map((item, index) => (
            <div
              className="relative h-[calc(100vh-64px)] before:absolute before:z-[10] before:h-full before:w-full before:bg-black/30 before:content-[''] lg:h-[calc(100vh-95px)]"
              key={index}
            >
              {(item.image || item.videoURL) && (
                <HeroVideoItem
                  videoUrl={item.videoURL}
                  index={index}
                  slideActive={slideActive}
                  image={item.image}
                  setSlideActive={setSlideActive}
                  emblaApi={emblaApi}
                />
              )}
            </div>
          ))}
        </div>
        <div className="absolute top-23.75 left-1/2 z-[11] -translate-x-1/2">
          <Typography variant="h2" asChild className="text-white uppercase">
            <h1>START YOUR TRIP WITH US HERE </h1>
          </Typography>
        </div>
        {((Array.isArray(arrivalList) && arrivalList.length > 0) ||
          (Array.isArray(destinationList) && destinationList.length > 0)) && (
          <div className="absolute top-1/2 left-1/2 z-[10] -translate-x-1/2 -translate-y-1/2">
            <NavigationBooking
              arrivalList={arrivalList}
              destinationList={destinationList}
            />
          </div>
        )}
        <div
          className="absolute bottom-4 left-1/2 z-[11] flex -translate-x-1/2 gap-x-2"
          role="tablist"
          aria-label={translate({
            de: 'Wählen Sie ein Dia zum Anzeigen',
            en: 'Select a slide to show',
          })}
        >
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={cn(
                // className,
                'size-4 cursor-pointer rounded-[50%] bg-white opacity-30 transition-opacity aria-selected:opacity-100 dark:bg-white',
              )}
              onClick={() => onDotButtonClick(index)}
              aria-selected={index === selectedIndex}
              aria-label={translate({
                de: `Weiter zu Folie ${index + 1}`,
                en: `Go to slide ${index + 1}`,
              })}
              role="tab"
              aria-controls={`${uuid}-${index}`}
            />
          ))}
        </div>
      </section>
    )
  );
};

export { HeroRenderBlock };
const heroListImagesAndVideos = [
  {
    image: {
      alt: 'hero-image-first',
      src: '/images/hero.webp',
    },
  },
  {
    image: {
      alt: 'hero-image-first',
      src: '/images/hero.webp',
    },
    videoURL: 'https://vimeo.com/347119375',
  },
  {
    image: {
      alt: 'hero-image-first',
      src: '/images/hero.webp',
    },
  },
  {
    image: {
      alt: 'hero-image-first',
      src: '/images/hero.webp',
    },
  },
  {
    image: {
      alt: 'hero-image-first',
      src: '/images/hero.webp',
    },
  },
];
