'use client';
import { cn } from '#/lib/utilities/cn';
import useEmblaCarousel from 'embla-carousel-react';
import Fade from 'embla-carousel-fade';
import { useIsClient } from 'usehooks-ts';
import { useId, useEffect, useState, useMemo } from 'react';
import { useTranslate } from '#/i18n/client';
import { useDotButton } from '#/lib/embla-carousel/dot-button';
import Autoplay from 'embla-carousel-autoplay';
import { Typography } from '#/components/ui/typography';
import { TheMedia } from '../the-media';
import { VideoInformationProps } from '#/types/global';
import { Container } from '#/components/ui/container';

export interface HeroSlide {
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  video?: VideoInformationProps;
}

export interface HeroRenderBlockProps {
  slides?: HeroSlide[];
}

const HeroRenderBlock = ({ slides = [] }: HeroRenderBlockProps) => {
  const { translate } = useTranslate();
  const uuid = useId();
  const isClient = useIsClient();
  const [activeSlide, setActiveSlide] = useState(0);

  // Tạo autoplay plugin với delay function
  const autoplayPlugin = useMemo(
    () =>
      Autoplay({
        delay: (scrollSnapList, emblaApi) => {
          const currentIndex = emblaApi.selectedScrollSnap();
          const currentSlide = slides[currentIndex];
          const hasVideo = !!currentSlide?.video;

          // Return array của delays cho mỗi slide
          const delays = slides.map(slide => {
            return slide.video ? 60000 : 5000;
          });

          return delays;
        },
        stopOnInteraction: false,
        stopOnLastSnap: false, // QUAN TRỌNG: Không dừng ở slide cuối
        jump: false, // Không skip slides
      }),
    [slides],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      watchDrag: true,
      loop: true,
      skipSnaps: false, // Không skip slides
      duration: 20, // Tốc độ transition (ms)
    },
    [Fade(), autoplayPlugin],
  );

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  // Track active slide
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const index = emblaApi.selectedScrollSnap();
      setActiveSlide(index);

      // Debug: Check if at last slide
      const isLastSlide = index === slides.length - 1;
      console.log('Current slide:', index, 'Is last:', isLastSlide);
    };

    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, slides.length]);

  if (!isClient) {
    return (
      <section className="relative h-dvh !min-h-dvh overflow-hidden">
        <div className="h-[calc(100vh-64px)] bg-black/10 lg:h-[calc(100vh-95px)]" />
      </section>
    );
  }

  return (
    <section
      ref={emblaRef}
      className="relative h-dvh !min-h-dvh overflow-hidden"
    >
      <div className="relative z-[10] flex h-dvh overflow-hidden">
        {slides.map((item, index) => (
          <div
            key={index}
            id={`${uuid}-${index}`}
            role="tabpanel"
            aria-label={translate({
              vi: `Slide ${index + 1}`,
              en: `Slide ${index + 1}`,
            })}
            className="relative h-screen flex-[0_0_100%] before:absolute before:z-[10] before:h-full before:w-full before:bg-black/30 before:content-['']"
          >
            <TheMedia
              key={`${index}-${activeSlide === index}`}
              image={item.image}
              video={item.video}
              options={{
                viewport: true,
                controls: false,
                showLoading: true,
                aspectRatio: 'auto',
                loop: true,
                autoplay: index === activeSlide,
                muted: true,
              }}
              wrapperProps={{
                className: 'h-screen !pointer-events-none',
              }}
            />
          </div>
        ))}
      </div>

      {/* Hero Title */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-[100] flex w-full -translate-x-1/2 -translate-y-1/2 flex-col gap-y-2 px-5 lg:top-60">
        <Typography
          variant="big-title"
          asChild
          className="text-center font-bold text-white uppercase"
        >
          <h1>
            {translate({
              vi: `Hành Trình An Toàn Bắt Đầu Từ Đây`,
              en: `Your Safe Journey Starts Here`,
            })}
          </h1>
        </Typography>
        <Typography
          variant="h4"
          asChild
          className="text-center font-medium text-white uppercase"
        >
          <p>
            {translate({
              vi: `Đặt vé xe liên tỉnh dễ dàng, nhanh chóng và tiện lợi`,
              en: `Book intercity bus tickets easily, quickly, and conveniently`,
            })}
          </p>
        </Typography>
      </div>
      {/* Navigation Dots */}
      {scrollSnaps.length > 1 && (
        <div
          className="absolute bottom-4 left-1/2 z-[11] flex -translate-x-1/2 gap-x-2"
          role="tablist"
          aria-label={translate({
            vi: 'Chọn slide để xem',
            en: 'Select a slide to show',
          })}
        >
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={cn(
                'bg-pj-red size-4 cursor-pointer rounded-[50%] border border-white opacity-30 transition-opacity hover:opacity-60 aria-selected:opacity-100',
              )}
              onClick={() => onDotButtonClick(index)}
              aria-selected={index === selectedIndex}
              aria-label={translate({
                vi: `Đến slide ${index + 1}`,
                en: `Go to slide ${index + 1}`,
              })}
              role="tab"
              aria-controls={`${uuid}-${index}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export { HeroRenderBlock };
