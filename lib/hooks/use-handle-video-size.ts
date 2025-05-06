'use client';
import { AspectRatioOptionsProps } from '#/types/global';
import { useEffect, useMemo, useState } from 'react';

export interface UseHandleVideoSizeProps {
  video: {
    width: number;
    height: number;
  };
  options?: AspectRatioOptionsProps;
}

const useHandleVideoSize = ({ video, options }: UseHandleVideoSizeProps) => {
  const defaultAspectRatio = useMemo(() => {
    return {
      widthUnit: video.width,
      heightUnit: video.height,
    };
  }, [video.height, video.width]);
  const _options: UseHandleVideoSizeProps['options'] = {
    aspectRatio: 'auto',
    ...options,
  };
  let _aspectRatio = defaultAspectRatio;
  if (_options.aspectRatio !== 'auto') {
    if (_options.aspectRatio) {
      _aspectRatio = _options.aspectRatio;
    }
  }
  const [currentAspectRatio, setCurrentAspectRatio] = useState(_aspectRatio);
  useEffect(() => {
    const breakpoints: AspectRatioOptionsProps['breakpoints'] = {
      0: {
        aspectRatio: _aspectRatio,
      },
      ..._options.breakpoints,
    };
    const sortedBreakpoints = Object.keys(breakpoints ?? {}).sort(
      (a, b) => Number(b) - Number(a),
    );
    const updateAspectRatio = () => {
      if (breakpoints) {
        const matchedBreakpoint = sortedBreakpoints.find(
          breakpoint =>
            window.matchMedia(`(min-width: ${breakpoint}px)`).matches,
        );
        const selectedAspectRatio = matchedBreakpoint
          ? breakpoints[Number(matchedBreakpoint)].aspectRatio
          : breakpoints[Number(sortedBreakpoints[sortedBreakpoints.length - 1])]
              .aspectRatio;
        if (selectedAspectRatio === 'auto') {
          setCurrentAspectRatio(defaultAspectRatio);
        } else {
          if (selectedAspectRatio) {
            setCurrentAspectRatio(selectedAspectRatio);
          }
        }
      }
    };
    updateAspectRatio();
    const mediaQueries = sortedBreakpoints.map(breakpoint =>
      window.matchMedia(`(min-width: ${breakpoint}px)`),
    );
    mediaQueries.forEach(mediaQuery =>
      mediaQuery.addEventListener('change', updateAspectRatio),
    );
    return () => {
      mediaQueries.forEach(mediaQuery =>
        mediaQuery.removeEventListener('change', updateAspectRatio),
      );
    };
  }, [_aspectRatio, _options.breakpoints, defaultAspectRatio]);
  const videoContainerRatio =
    currentAspectRatio.widthUnit / currentAspectRatio.heightUnit;
  const videoRatio = video.width / video.height;
  let newWidth: number, newHeight: number;
  if (videoContainerRatio > videoRatio) {
    newHeight = currentAspectRatio.heightUnit;
    newWidth = video.width * (currentAspectRatio.heightUnit / video.height);
  } else {
    newWidth = currentAspectRatio.widthUnit;
    newHeight = video.height * (currentAspectRatio.widthUnit / video.width);
  }
  if (newWidth < currentAspectRatio.widthUnit) {
    newWidth = currentAspectRatio.widthUnit;
    newHeight = video.height * (currentAspectRatio.widthUnit / video.width);
  }
  if (newHeight < currentAspectRatio.heightUnit) {
    newHeight = currentAspectRatio.heightUnit;
    newWidth = video.width * (currentAspectRatio.heightUnit / video.height);
  }
  const percentageWidth = (newWidth * 100) / currentAspectRatio.widthUnit;
  const percentageHeight = (newHeight * 100) / currentAspectRatio.heightUnit;
  const offsetX = (currentAspectRatio.widthUnit - newWidth) / 2;
  const offsetY = (currentAspectRatio.heightUnit - newHeight) / 4;
  const percentageOffsetX = (offsetX * 100) / currentAspectRatio.widthUnit;
  const percentageOffsetY = (offsetY * 100) / currentAspectRatio.heightUnit;
  return {
    percentageWidth,
    percentageHeight,
    percentageOffsetX,
    percentageOffsetY,
  };
};

export { useHandleVideoSize };
