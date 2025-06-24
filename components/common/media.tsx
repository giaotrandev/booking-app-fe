'use client';
import { useTranslate } from '#/i18n/client';

import { useHandleVideoSize } from '#/lib/hooks/use-handle-video-size';
import { cn } from '#/lib/utilities/cn';
import Image from 'next/image';
import {
  CSSProperties,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import ReactPlayer from 'react-player';
import { useIntersectionObserver, useWindowSize } from 'usehooks-ts';
// import { BlockRenderProps } from '..';
import { AspectRatioOptionsProps, ImageProps } from '#/types/global';
import { HandleVideoInformationProps } from '#/lib/helper/video/information';
import { blurDataUrl } from '#/lib/constant';

// export interface MediaBlockRenderProps extends BlockRenderProps {
//   image?: ImageProps;
//   video?: HandleVideoInformationProps;
//   autoplay?: boolean;
//   fullscreen?: boolean;
//   options?: AspectRatioOptionsProps;
// }
export interface MediaBlockRenderProps {
  image?: ImageProps;
  video?: HandleVideoInformationProps;
  autoplay?: boolean;
  fullscreen?: boolean;
  options?: AspectRatioOptionsProps;
}

const MediaBlockRender = ({
  //   blockWrapperProps,
  image,
  video,
  autoplay,
  fullscreen,
  options,
}: MediaBlockRenderProps) => {
  const { translate } = useTranslate();
  const id = useId();
  const uuid = `media-block-${id.replace(/:/g, '')}`;
  const windowSize = useWindowSize();
  const videoWrapperRef = useRef(null);
  const videoRef = useRef(null);
  const { isIntersecting, ref: refObserver } = useIntersectionObserver({
    threshold: 0.1,
  });
  const [isRendered, setIsRendered] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [muted, setMuted] = useState<boolean>(!!autoplay);

  const hasVideoUrl = !!video?.url;
  const imageWidth = image?.width ?? windowSize.width;
  const imageHeight = image?.height ?? (windowSize.width * 9) / 16;
  const videoWidth = video?.width ?? windowSize.width;
  const videoHeight = video?.height ?? (windowSize.width * 9) / 16;

  const videoSize = useHandleVideoSize({
    video: {
      width: videoWidth,
      height: videoHeight,
    },
    options,
  });

  const defaultAspectRatio = {
    widthUnit: hasVideoUrl && videoWidth ? videoWidth : imageWidth,
    heightUnit: hasVideoUrl && videoHeight ? videoHeight : imageHeight,
  };
  const _options: AspectRatioOptionsProps = {
    aspectRatio: 'auto',
    ...options,
  };
  let _aspectRatio = defaultAspectRatio;
  if (_options.aspectRatio !== 'auto') {
    if (_options.aspectRatio) {
      _aspectRatio = _options.aspectRatio;
    }
  }
  const minWidthes = Object.keys(_options.breakpoints ?? {});
  const minWidthOptions = Object.values(_options.breakpoints ?? {});

  const handleStyle = useCallback(() => {
    let styles = [
      `--ev-media-block-max-width: ${
        hasVideoUrl
          ? video.platform === 'youtube'
            ? `${imageWidth}px`
            : videoWidth
              ? `${videoWidth}px`
              : `${imageWidth}px`
          : `${imageWidth}px`
      };`,
      `--ev-media-block-padding-top: ${(_aspectRatio.heightUnit / _aspectRatio.widthUnit) * 100}%;`,
    ];
    if (Array.isArray(minWidthes) && minWidthes.length > 0) {
      for (let i = 0; i < minWidthes.length; i++) {
        const currentAspectRatio = minWidthOptions[i].aspectRatio;
        if (currentAspectRatio) {
          const currentPaddingTop =
            currentAspectRatio === 'auto'
              ? `${(defaultAspectRatio.heightUnit / defaultAspectRatio.widthUnit) * 100}%`
              : `${(currentAspectRatio.heightUnit / currentAspectRatio.widthUnit) * 100}%`;
          styles.push(
            `@media (width >= ${minWidthes[i]}px) { --ev-media-block-padding-top: ${currentPaddingTop}; }`,
          );
        }
      }
    }
    return `#${uuid} { ${styles.join(' ')} }`;
  }, [
    uuid,
    _aspectRatio.heightUnit,
    _aspectRatio.widthUnit,
    defaultAspectRatio.heightUnit,
    defaultAspectRatio.widthUnit,
    hasVideoUrl,
    imageWidth,
    minWidthOptions,
    minWidthes,
    video?.platform,
    videoWidth,
  ]);

  const handleOpenFullScreen = useCallback(() => {
    if (videoRef && videoRef.current) {
      const iframe = (videoRef.current as any).getInternalPlayer();
      if (iframe) {
        if (iframe.requestFullscreen) {
          iframe.requestFullscreen();
        } else if (iframe.webkitEnterFullscreen) {
          // iOS Safari
          iframe.webkitEnterFullscreen();
        } else if (iframe.mozRequestFullScreen) {
          // Firefox
          iframe.mozRequestFullScreen();
        } else if (iframe.webkitRequestFullscreen) {
          // Chrome, Safari và Opera
          iframe.webkitRequestFullscreen();
        } else if (iframe.msRequestFullscreen) {
          // IE/Edge
          iframe.msRequestFullscreen();
        }
      }
    }
  }, []);
  useEffect(() => {
    if (isIntersecting && !isRendered) {
      setIsRendered(true);
    }
  }, [isIntersecting, isRendered, setIsRendered]);
  useEffect(() => {
    if (autoplay) {
      setIsPlaying(autoplay);
    }
  }, [autoplay, setIsPlaying]);
  return (
    <>
      <style>{handleStyle()}</style>
      <div id={uuid}>
        <div
          data-slot="media-block"
          //   {...blockWrapperProps}
          className={cn(
            'group/media-block pointer-events-none w-full max-w-[var(--ev-media-block-max-width)]',
            // blockWrapperProps?.className,
          )}
          ref={refObserver}
        >
          <div className="relative w-full overflow-hidden pt-[var(--ev-media-block-padding-top)]">
            {image?.src && (
              <Image
                src={image.src}
                alt={image.alt}
                sizes={image.sizes}
                placeholder="blur"
                blurDataURL={blurDataUrl}
                fill
                className="z-0 object-cover object-[var(--ev-focal-x)_var(--ev-focal-y)]"
                style={
                  {
                    '--ev-focal-x': image.focalX ? `${image.focalX}%` : '50%',
                    '--ev-focal-y': image.focalY ? `${image.focalY}%` : '50%',
                  } as CSSProperties
                }
              />
            )}
            {hasVideoUrl && (
              <>
                {isRendered && (
                  <div
                    ref={videoWrapperRef}
                    className={cn(
                      'absolute inset-0 z-1 size-full',
                      video.platform === 'youtube' && 'scale-101',
                      isLoaded && isPlaying ? 'opacity-100' : 'opacity-0',
                    )}
                  >
                    <ReactPlayer
                      ref={videoRef}
                      url={video.url}
                      width={`${videoSize.percentageWidth}%`}
                      height={`${videoSize.percentageHeight}%`}
                      style={{
                        marginLeft: `${videoSize.percentageOffsetX}%`,
                        marginTop: `${videoSize.percentageOffsetY}%`,
                        pointerEvents: 'none',
                      }}
                      playing={isPlaying}
                      controls={false}
                      loop={false}
                      muted={muted}
                      playsinline={true}
                      config={{
                        youtube: {
                          embedOptions: {
                            host: 'https://www.youtube-nocookie.com',
                          },
                        },
                        vimeo: {
                          playerOptions: {
                            dnt: true,
                          },
                        },
                      }}
                      onPlay={() => {
                        setIsPlaying(true);
                      }}
                      onPause={() => {
                        setIsPlaying(false);
                      }}
                      onProgress={event =>
                        event.loaded > 0 && setIsLoaded(true)
                      }
                      onReady={() => {
                        if (videoWrapperRef && videoWrapperRef.current) {
                          const iframe = (
                            videoWrapperRef.current as HTMLIFrameElement
                          ).querySelector('iframe');
                          if (iframe) {
                            iframe.setAttribute('tabindex', '-1');
                          }
                        }
                      }}
                    />
                  </div>
                )}
                {/** Loading */}
                {isRendered && !isLoaded && isPlaying && (
                  <div className="absolute inset-0 z-2 flex size-full cursor-pointer items-center justify-center">
                    {translate({
                      vi: 'Laden',
                      en: 'Loading',
                    })}
                  </div>
                )}
                {/** Play - Pause */}
                <button
                  data-slot="media-block-play-pause"
                  className="group/media-block-play-pause pointer-events-auto absolute inset-0 z-3 flex size-full cursor-pointer items-center justify-center"
                  onClick={() => {
                    setIsPlaying(prev => !prev);
                  }}
                >
                  {!isPlaying && (
                    <span className="bg-black text-white dark:bg-white dark:text-black">
                      {translate({
                        vi: 'Spielen',
                        en: 'Play',
                      })}
                    </span>
                  )}
                  {isRendered && isLoaded && isPlaying && (
                    <span
                      className={cn(
                        'bg-black text-white dark:bg-white dark:text-black',
                        'opacity-0 group-focus-visible/media-block-play-pause:opacity-100 lg:group-hover/media-block:opacity-100',
                      )}
                    >
                      {translate({
                        vi: 'Pause',
                        en: 'Pause',
                      })}
                    </span>
                  )}
                </button>
                {/** Fullscreen: Not working with youtube */}
                {fullscreen &&
                  video.platform !== 'youtube' &&
                  isRendered &&
                  isLoaded &&
                  isPlaying && (
                    <button
                      className={cn(
                        'pointer-events-auto absolute top-0 right-0 z-4 cursor-pointer',
                        'opacity-0 focus-visible:opacity-100 lg:group-hover/media-block:opacity-100',
                      )}
                      onClick={handleOpenFullScreen}
                    >
                      <span className="bg-black text-white dark:bg-white dark:text-black">
                        {translate({
                          vi: 'Fullscreen',
                          en: 'Fullscreen',
                        })}
                      </span>
                    </button>
                  )}
                {/** Mute */}
                {isRendered && isLoaded && isPlaying && (
                  <button
                    className={cn(
                      'pointer-events-auto absolute right-0 bottom-0 z-4 cursor-pointer',
                      'opacity-0 focus-visible:opacity-100 lg:group-hover/media-block:opacity-100',
                    )}
                    onClick={() => setMuted(prev => !prev)}
                  >
                    <span className="bg-black text-white dark:bg-white dark:text-black">
                      {muted
                        ? translate({
                            vi: 'Aufheben der Stummschaltung',
                            en: 'Unmute',
                          })
                        : translate({
                            vi: 'Stummschalten',
                            en: 'Mute',
                          })}
                    </span>
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export { MediaBlockRender };
