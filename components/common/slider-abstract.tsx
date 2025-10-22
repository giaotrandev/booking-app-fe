'use client';

import { useTranslate } from '#/i18n/client';
import { usePrevNextButtons } from '#/lib/embla-carousel/arrow-buttons';
import { useDotButton } from '#/lib/embla-carousel/dot-button';
import { cn } from '#/lib/utilities/cn';
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { createContext, CSSProperties, ReactNode, useContext } from 'react';
import { ButtonIcon, buttonIconVariants } from '../ui/button-icon';
import Fade from 'embla-carousel-fade';
import { VariantProps } from 'class-variance-authority';
import { Container } from '../ui/container';

interface ResponsiveNumberProps {
  mobile?: number;
  tablet?: number;
  desktop?: number;
  bigDesktop?: number;
}

interface ResponsiveStringProps {
  mobile?: string;
  tablet?: string;
  desktop?: string;
  bigDesktop?: string;
}

const isScrollable = (emblaApi: EmblaCarouselType) => {
  return emblaApi.internalEngine().scrollSnaps.length > 1;
};

interface SliderAbstractProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  wrapperClassName?: string;
  showProgress?: boolean;
  showArrows?: boolean;
  options?: EmblaOptionsType;
  autoplay?: {
    playOnInit: boolean;
    delay: number;
  };
  slidesPerView?: number | ResponsiveNumberProps;
  gap?: number | ResponsiveNumberProps;
  navigationClassName?: string;
  fade?: boolean;
  overlayTwoSide?: boolean;
  arrowsClassName?: string;
  arrowContainerClassname?: string;
  arrowSize?: 'sm' | 'md' | 'lg' | 'xl';
}

const SliderAbstract = ({
  children,
  className = '',
  containerClassName = '',
  arrowsClassName = '',
  showProgress,
  showArrows,
  autoplay,
  options,
  slidesPerView = 1,
  wrapperClassName = '',
  navigationClassName,
  gap = 8,
  fade,
  overlayTwoSide,
  arrowContainerClassname,
  arrowSize,
}: SliderAbstractProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      watchDrag: emblaApi => isScrollable(emblaApi),
      ...options,
    },
    [
      ...(autoplay ? [Autoplay({ ...autoplay })] : []),
      ...(fade ? [Fade()] : []),
    ],
  );
  const { translate } = useTranslate();
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const _sliderPerView = {
    bigDesktop:
      typeof slidesPerView === 'object'
        ? slidesPerView.bigDesktop
        : slidesPerView,
    desktop:
      typeof slidesPerView === 'object' ? slidesPerView.desktop : slidesPerView,
    tablet:
      typeof slidesPerView === 'object' ? slidesPerView.tablet : slidesPerView,
    mobile:
      typeof slidesPerView === 'object' ? slidesPerView.mobile : slidesPerView,
  };

  const _gap = {
    bigDesktop: typeof gap === 'object' ? gap.bigDesktop : gap,
    desktop: typeof gap === 'object' ? gap.desktop : gap,
    tablet: typeof gap === 'object' ? gap.tablet : gap,
    mobile: typeof gap === 'object' ? gap.mobile : gap,
  };

  return (
    <div className={cn('relative overflow-hidden', wrapperClassName)}>
      <div
        className={cn('relative', className)}
        ref={emblaRef}
        style={
          {
            ...(_sliderPerView.mobile && {
              '--dynamic-slide-size-mobile': `${100 / _sliderPerView.mobile}%`,
            }),
            ...(_sliderPerView.tablet && {
              '--dynamic-slide-size-tablet': `${100 / _sliderPerView.tablet}%`,
            }),
            ...(_sliderPerView.desktop && {
              '--dynamic-slide-size-desktop': `${100 / _sliderPerView.desktop}%`,
            }),
            ...(_sliderPerView.bigDesktop && {
              '--dynamic-slide-size-big-desktop': `${100 / _sliderPerView.bigDesktop}%`,
            }),
            ...(_gap.mobile && {
              '--dynamic-gap-mobile': `${_gap.mobile}px`,
            }),
            ...(_gap.tablet && {
              '--dynamic-gap-tablet': `${_gap.tablet}px`,
            }),
            ...(_gap.desktop && {
              '--dynamic-gap-desktop': `${_gap.desktop}px`,
            }),
            ...(_gap.bigDesktop && {
              '--dynamic-gap-big-desktop': `${_gap.bigDesktop}px`,
            }),
          } as CSSProperties
        }
      >
        <SliderContext.Provider value={{ selectedIndex }}>
          <div
            className={cn(
              '3xl:-ml-[var(--dynamic-gap-big-desktop)] -ml-[var(--dynamic-gap-mobile)] flex h-full md:-ml-[var(--dynamic-gap-tablet)] lg:-ml-[var(--dynamic-gap-desktop)]',
              containerClassName,
            )}
          >
            {children}
          </div>
        </SliderContext.Provider>
        {overlayTwoSide && (
          <>
            <div
              style={{
                background:
                  'linear-gradient(270deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)',
              }}
              className={cn(
                'ease-ev-easing absolute top-0 left-0 z-10 h-full w-19.5 rotate-180 transition-opacity duration-300 lg:w-27',
                prevBtnDisabled && 'opacity-0',
              )}
            />
            <div
              style={{
                background:
                  'linear-gradient(270deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)',
              }}
              className={cn(
                'ease-ev-easing absolute top-0 right-0 z-10 h-full w-19.5 transition-opacity duration-300 lg:w-27',
                nextBtnDisabled && 'opacity-0',
              )}
            />
          </>
        )}
      </div>

      {(showProgress || showArrows) && (
        <Container className={cn(arrowContainerClassname)}>
          <div
            className={cn(
              'mt-10 flex items-center justify-between gap-10',
              navigationClassName,
            )}
          >
            {showProgress && (
              <div className="bg-pj-gray-lightest h-1 w-full flex-1 overflow-hidden rounded-full lg:max-w-50 lg:flex-auto">
                <div
                  className="bg-pj-red ease-ev-easing h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${((selectedIndex + 1) / scrollSnaps.length) * 100}%`,
                  }}
                />
              </div>
            )}
            {showArrows && (
              <div
                className={cn(
                  'ml-auto flex items-center gap-4 lg:gap-3',
                  arrowsClassName,
                )}
              >
                <ButtonIcon
                  size={arrowSize || 'lg'}
                  icon={{ name: 'arrow-left' }}
                  onClick={onPrevButtonClick}
                  disabled={prevBtnDisabled}
                  aria-label={translate({
                    en: 'previous slide',
                    vi: 'Slide trước',
                  })}
                />
                <ButtonIcon
                  size={arrowSize || 'lg'}
                  icon={{ name: 'arrow-right' }}
                  onClick={onNextButtonClick}
                  disabled={nextBtnDisabled}
                  aria-label={translate({
                    en: 'next slide',
                    vi: 'Slide sau',
                  })}
                />
              </div>
            )}
          </div>
        </Container>
      )}
    </div>
  );
};

interface SlideProps {
  children: ReactNode;
  className?: string;
  wrapperClassName?: string;
  width?: string | ResponsiveStringProps;
  index?: number;
}

const Slide = ({ children, className, width, index }: SlideProps) => {
  const { selectedIndex } = useSlider();

  const defaultWidths: Required<ResponsiveStringProps> = {
    mobile: 'var(--dynamic-slide-size-mobile)',
    tablet: 'var(--dynamic-slide-size-tablet)',
    desktop: 'var(--dynamic-slide-size-desktop)',
    bigDesktop: 'var(--dynamic-slide-size-big-desktop)',
  };

  const responsiveWidths: ResponsiveStringProps = width
    ? typeof width === 'string'
      ? {
          mobile: width,
          tablet: width,
          desktop: width,
          bigDesktop: width,
        }
      : {
          ...defaultWidths,
          bigDesktop: `calc(${width?.bigDesktop} + var(--dynamic-gap-big-desktop))`,
          desktop: `calc(${width?.desktop} + var(--dynamic-gap-desktop))`,
          tablet: `calc(${width?.tablet} + var(--dynamic-gap-tablet))`,
          mobile: `calc(${width?.mobile} + var(--dynamic-gap-mobile))`,
        }
    : defaultWidths;

  return (
    <div
      style={
        {
          '--embla-slide-size-mobile': responsiveWidths.mobile,
          '--embla-slide-size-tablet': responsiveWidths.tablet,
          '--embla-slide-size-desktop': responsiveWidths.desktop,
          '--embla-slide-size-big-desktop': responsiveWidths.bigDesktop,
        } as CSSProperties
      }
      className={cn(
        selectedIndex === index && 'active-slide',
        'embla__slide 3xl:pl-[var(--dynamic-gap-big-desktop)] 3xl:flex-[0_0_var(--embla-slide-size-big-desktop,none)] h-full flex-[0_0_var(--embla-slide-size-mobile,none)] pl-[var(--dynamic-gap-mobile)] md:flex-[0_0_var(--embla-slide-size-tablet,none)] md:pl-[var(--dynamic-gap-tablet)] lg:flex-[0_0_var(--embla-slide-size-desktop,none)] lg:pl-[var(--dynamic-gap-desktop)]',
        className,
      )}
    >
      {children}
    </div>
  );
};

const SliderContext = createContext<{ selectedIndex: number }>({
  selectedIndex: 0,
});

export const useSlider = () => useContext(SliderContext);

export { Slide, SliderAbstract };
