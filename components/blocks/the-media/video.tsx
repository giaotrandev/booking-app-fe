'use client';
import { cn } from '#/lib/utilities/cn';
import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useWindowSize } from 'usehooks-ts';
import { useTheMediaContext } from './context';
import { TheMediaOptionsProps, VideoInformationProps } from '#/types/global';

export interface TheMediaVideoProps {
  video?: VideoInformationProps;
  options?: TheMediaOptionsProps;
}

const TheMediaVideo = ({ video, options }: TheMediaVideoProps) => {
  const ref = useRef(null);
  const {
    playerRef,
    isReady,
    videoWidth,
    videoHeight,
    isLoaded,
    isStart,
    isPlaying,
    isMuted,
    currentTime,
    isSeeking,
    volume,
    breakpoints,
    defaultAspectRatio,
    setIsReady,
    setVideoWidth,
    setVideoHeight,
    setIsLoaded,
    setIsStart,
    setIsPlaying,
    setDuration,
    setLoaded,
    setCurrentTime,
  } = useTheMediaContext();
  const [firstSeeked, setFirstSeeked] = useState(false);
  const windowSize = useWindowSize();
  const [videoSize, setVideoSize] = useState({
    percentageWidth: 100,
    percentageHeight: 100,
    percentageOffsetX: 0,
    percentageOffsetY: 0,
  });
  useEffect(() => {
    if (breakpoints) {
      let currentBreakpoint = { aspectRatio: defaultAspectRatio };
      const breakpointsNumbers = Object.keys(breakpoints).sort(
        (a, b) => Number(b) - Number(a),
      );
      if (Array.isArray(breakpointsNumbers) && breakpointsNumbers.length > 0) {
        const matchedBreakpoint = Math.max(
          ...breakpointsNumbers
            .map(Number)
            .filter(breakpointsNumber => breakpointsNumber < windowSize.width),
        );
        if (breakpoints[matchedBreakpoint].aspectRatio !== 'auto') {
          currentBreakpoint = {
            aspectRatio: breakpoints[matchedBreakpoint].aspectRatio,
          };
        }
      }
      const currentAspectRatio = options?.viewport
        ? defaultAspectRatio
        : currentBreakpoint.aspectRatio;
      if (currentAspectRatio) {
        const videoContainerRatio =
          currentAspectRatio.widthUnit / currentAspectRatio.heightUnit;
        const videoRatio = videoWidth / videoHeight;
        let newWidth: number, newHeight: number;
        if (videoContainerRatio > videoRatio) {
          newHeight = currentAspectRatio.heightUnit;
          newWidth = videoWidth * (currentAspectRatio.heightUnit / videoHeight);
        } else {
          newWidth = currentAspectRatio.widthUnit;
          newHeight = videoHeight * (currentAspectRatio.widthUnit / videoWidth);
        }
        if (newWidth < currentAspectRatio.widthUnit) {
          newWidth = currentAspectRatio.widthUnit;
          newHeight = videoHeight * (currentAspectRatio.widthUnit / videoWidth);
        }
        if (newHeight < currentAspectRatio.heightUnit) {
          newHeight = currentAspectRatio.heightUnit;
          newWidth = videoWidth * (currentAspectRatio.heightUnit / videoHeight);
        }
        const percentageWidth = (newWidth * 100) / currentAspectRatio.widthUnit;
        const percentageHeight =
          (newHeight * 100) / currentAspectRatio.heightUnit;
        const offsetX = (currentAspectRatio.widthUnit - newWidth) / 2;
        const offsetY = (currentAspectRatio.heightUnit - newHeight) / 4;
        const percentageOffsetX =
          (offsetX * 100) / currentAspectRatio.widthUnit;
        const percentageOffsetY =
          (offsetY * 100) / currentAspectRatio.heightUnit;
        setVideoSize({
          percentageWidth,
          percentageHeight,
          percentageOffsetX,
          percentageOffsetY,
        });
      }
    }
  }, [
    breakpoints,
    defaultAspectRatio,
    options?.viewport,
    videoHeight,
    videoWidth,
    windowSize.width,
  ]);
  if (!video?.url) {
    return null;
  }
  return (
    <div
      ref={ref}
      className={cn(
        'absolute inset-0 z-1 size-full',
        isReady && isLoaded && isStart ? 'opacity-100' : 'opacity-0',
      )}
    >
      <ReactPlayer
        ref={playerRef}
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
        loop={options?.loop}
        muted={isMuted}
        volume={volume}
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
        onStart={() => {
          setIsStart(true);
          setIsPlaying(true);
        }}
        onEnded={() => {
          setIsPlaying(false);
        }}
        onPlay={() => {
          setIsPlaying(true);
        }}
        onPause={() => {
          setIsPlaying(false);
        }}
        onProgress={event => {
          if (event.loaded > 0) {
            setIsLoaded(true);
          }
          setLoaded(event.loaded);
          if (playerRef && playerRef.current && firstSeeked && !isSeeking) {
            setCurrentTime(playerRef.current.getCurrentTime());
          }
        }}
        onDuration={duration => {
          setDuration(duration);
        }}
        onReady={() => {
          setIsReady(true);
          if (ref && ref.current) {
            const iframe = (ref.current as HTMLIFrameElement).querySelector(
              'iframe',
            );
            if (iframe) {
              iframe.setAttribute('tabindex', '-1');
            }
          }
          if (playerRef && playerRef.current) {
            if (!firstSeeked) {
              playerRef.current.seekTo(currentTime, 'seconds');
              setFirstSeeked(true);
            }
            const internalPlayer =
              playerRef.current.getInternalPlayer() as HTMLVideoElement;
            if (internalPlayer) {
              if (!video.width && internalPlayer.videoWidth) {
                setVideoWidth(internalPlayer.videoWidth);
              }
              if (!video.height && internalPlayer.videoHeight) {
                setVideoHeight(internalPlayer.videoHeight);
              }
            }
          }
        }}
      />
    </div>
  );
};

export { TheMediaVideo };
