'use client';
import { cn } from '#/lib/utilities/cn';
// import { TheMediaOptionsProps } from '#/types/globals';
import {
  ComponentProps,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState,
} from 'react';
import { useIntersectionObserver, useWindowSize } from 'usehooks-ts';
import { TheMediaContextProps, useTheMediaContext } from './context';
import { TheMediaImage, TheMediaImageProps } from './image';
import { TheMediaVideo, TheMediaVideoProps } from './video';
import { TheMediaOptionsProps } from '#/types/global';
import { TheMediaProvider } from './provider';
import { TheMediaLoading } from './loading';
import { TheMediaPlayPause } from './play-pause';
import { TheMediaControls } from './controls';

export interface TheMediaProps extends TheMediaImageProps, TheMediaVideoProps {
  wrapperProps?: ComponentProps<'div'>;
  options?: TheMediaOptionsProps;
  isPlaying?: TheMediaContextProps['isPlaying'];
  setIsPlaying?: TheMediaContextProps['setIsPlaying'];
  isMuted?: TheMediaContextProps['isMuted'];
  setIsMuted?: TheMediaContextProps['setIsMuted'];
  startAt?: TheMediaContextProps['currentTime'];
}

const TheMedia = (props: TheMediaProps) => {
  return (
    <TheMediaProvider {...props}>
      <Render {...props} />
    </TheMediaProvider>
  );
};

export { TheMedia };

const Render = ({ wrapperProps, image, video, options }: TheMediaProps) => {
  const hasImage = !!image?.src;
  const hasVideo = !!video?.url;
  const isViewport = !!options?.viewport;
  const hasControls = options?.controls !== false;
  const showLoading = options?.showLoading !== false;
  const id = useId();
  const uuid = `the-media-${id.replace(/:/g, '')}`;
  const { isIntersecting, ref } = useIntersectionObserver();
  const {
    isRendered,
    videoWidth,
    videoHeight,
    showingControls,
    interactingControls,
    setIsRendered,
    setShowingControls,
    setBreakpoints,
    setDefaultAspectRatio,
  } = useTheMediaContext();
  const windowSize = useWindowSize();
  const [scrollbarWidth, setScrollbarWidth] = useState<number>(0);
  useEffect(() => {
    const getScrollbarWidth = (): number => {
      const outer: HTMLDivElement = document.createElement('div');
      outer.style.visibility = 'hidden';
      outer.style.overflow = 'scroll';
      document.body.appendChild(outer);
      const inner: HTMLDivElement = document.createElement('div');
      outer.appendChild(inner);
      const scrollbarWidth: number = outer.offsetWidth - inner.offsetWidth;
      outer.parentNode?.removeChild(outer);
      return scrollbarWidth;
    };
    setScrollbarWidth(getScrollbarWidth());
  }, []);
  const _breakpoints = useMemo(() => {
    return {
      0: {
        aspectRatio: options?.aspectRatio,
      },
      ...options?.breakpoints,
    };
  }, [options?.aspectRatio, options?.breakpoints]);
  const _defaultAspectRatio = useMemo(() => {
    return isViewport
      ? {
          widthUnit: (windowSize.width || 0) - scrollbarWidth,
          heightUnit: windowSize.height || 0,
        }
      : _breakpoints[0].aspectRatio === 'auto' || !_breakpoints[0].aspectRatio
        ? {
            widthUnit: hasVideo
              ? videoWidth
                ? videoWidth
                : image?.width || 0
              : image?.width || 0,
            heightUnit: hasVideo
              ? videoHeight
                ? videoHeight
                : image?.height || 0
              : image?.height || 0,
          }
        : _breakpoints[0].aspectRatio;
  }, [
    _breakpoints,
    hasVideo,
    image?.height,
    image?.width,
    isViewport,
    scrollbarWidth,
    videoHeight,
    videoWidth,
    windowSize.height,
    windowSize.width,
  ]);
  useEffect(() => {
    setBreakpoints(_breakpoints);
    setDefaultAspectRatio(_defaultAspectRatio);
  }, [
    _breakpoints,
    _defaultAspectRatio,
    setBreakpoints,
    setDefaultAspectRatio,
  ]);
  useEffect(() => {
    if (isIntersecting && !isRendered) {
      setIsRendered(true);
    }
  }, [isIntersecting, isRendered, setIsRendered]);
  const renderStyles = useCallback(() => {
    if (!isViewport && _defaultAspectRatio) {
      const minWidthes = Object.keys(_breakpoints || {});
      const minWidthOptions = Object.values(_breakpoints || {});
      const styles = [
        `--ev-the-media-max-width: ${
          hasVideo
            ? videoWidth
              ? `${videoWidth}px`
              : `${image?.width || 0}px`
            : `${image?.width || 0}px`
        };`,
        `--ev-the-media-padding-top: ${(_defaultAspectRatio.heightUnit / _defaultAspectRatio.widthUnit) * 100}%;`,
      ];
      if (Array.isArray(minWidthes) && minWidthes.length > 0) {
        for (let i = 0; i < minWidthes.length; i++) {
          const currentAspectRatio = minWidthOptions[i].aspectRatio;
          if (currentAspectRatio) {
            const currentPaddingTop =
              currentAspectRatio === 'auto'
                ? `${(_defaultAspectRatio.heightUnit / _defaultAspectRatio.widthUnit) * 100}%`
                : `${(currentAspectRatio.heightUnit / currentAspectRatio.widthUnit) * 100}%`;
            styles.push(
              `@media (width >= ${minWidthes[i]}px) { --ev-the-media-padding-top: ${currentPaddingTop}; }`,
            );
          }
        }
      }
      return `#${uuid} { ${styles.join(' ')} }`;
    } else {
      return '';
    }
  }, [
    _breakpoints,
    _defaultAspectRatio,
    hasVideo,
    image?.width,
    isViewport,
    uuid,
    videoWidth,
  ]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowingControls(interactingControls);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [showingControls, interactingControls, setShowingControls]);
  return (
    <>
      {!isViewport && <style>{renderStyles()}</style>}
      <div ref={ref} id={uuid}>
        <div
          data-slot="the-media"
          {...wrapperProps}
          className={cn(
            'group/the-media pointer-events-none w-full',
            isViewport
              ? 'h-dvh! h-screen'
              : 'max-w-[var(--ev-the-media-max-width)]',
            wrapperProps?.className,
          )}
          onMouseMove={() => {
            setShowingControls(true);
          }}
          onMouseLeave={() => {
            setShowingControls(false);
          }}
          onFocus={() => {
            setShowingControls(true);
          }}
          onBlur={() => {
            setShowingControls(false);
          }}
        >
          <div
            className={cn(
              'relative w-full overflow-hidden',
              isViewport ? 'h-full' : 'pt-[var(--ev-the-media-padding-top)]',
            )}
          >
            {hasImage && <TheMediaImage image={image} />}
            {hasVideo && (
              <>
                {isRendered && (
                  <TheMediaVideo video={video} options={options} />
                )}
                {showLoading && <TheMediaLoading />}
                {hasControls && (
                  <>
                    <TheMediaPlayPause />
                    <TheMediaControls options={options} />
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
