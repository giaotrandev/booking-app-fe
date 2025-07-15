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

export interface HeroRenderBlockProps {}
const HeroRenderBlock = ({}: HeroRenderBlockProps) => {
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
    <section
      ref={emblaRef}
      className="relative h-dvh !min-h-dvh overflow-hidden"
    >
      {isClient ? (
        <>
          <div className="flex h-dvh overflow-hidden">
            {heroListImagesAndVideos.map((item, index) => (
              <div
                className="relative h-screen before:absolute before:z-[10] before:h-full before:w-full before:bg-black/30 before:content-['']"
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
          <div className="absolute top-1/2 left-1/2 z-[11] -translate-x-1/2 -translate-y-1/2 lg:top-50">
            <Typography
              variant="h1"
              asChild
              className="text-center text-white uppercase"
            >
              <h1>START YOUR TRIP WITH US HERE </h1>
            </Typography>
          </div>
          <div
            className="absolute bottom-4 left-1/2 z-[11] flex -translate-x-1/2 gap-x-2"
            role="tablist"
            aria-label={translate({
              vi: 'Wählen Sie ein Dia zum Anzeigen',
              en: 'Select a slide to show',
            })}
          >
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                className={cn(
                  'size-4 cursor-pointer rounded-[50%] bg-white opacity-30 transition-opacity aria-selected:opacity-100 dark:bg-white',
                )}
                onClick={() => onDotButtonClick(index)}
                aria-selected={index === selectedIndex}
                aria-label={translate({
                  vi: `Weiter zu Folie ${index + 1}`,
                  en: `Go to slide ${index + 1}`,
                })}
                role="tab"
                aria-controls={`${uuid}-${index}`}
              />
            ))}
          </div>
        </>
      ) : (
        // TODO: Fix layout shifted
        <div className="h-[calc(100vh-64px)] bg-black/10 lg:h-[calc(100vh-95px)]" />
      )}
    </section>
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
