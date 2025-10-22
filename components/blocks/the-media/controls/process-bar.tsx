'use client';
import { cn } from '#/lib/utilities/cn';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { CSSProperties } from 'react';
import { useTheMediaContext } from '../context';

const TheMediaControlsProgressBar = () => {
  const {
    playerRef,
    isReady,
    duration,
    loaded,
    currentTime,
    setCurrentTime,
    setIsSeeking,
  } = useTheMediaContext();
  const handleValueChange = (value: number[]) => {
    setCurrentTime(value[0]);
    setIsSeeking(true);
  };
  const handleValueCommit = (value: number[]) => {
    setIsSeeking(false);
    if (playerRef && playerRef.current) {
      playerRef.current.seekTo(value[0], 'seconds');
    }
  };
  return (
    <div>
      <SliderPrimitive.Root
        value={[currentTime]}
        min={0}
        max={duration}
        step={0.00001}
        disabled={!isReady}
        onValueChange={handleValueChange}
        onValueCommit={handleValueCommit}
        className={cn(
          'pointer-events-auto relative flex h-4 w-full touch-none items-center select-none',
          !isReady && 'opacity-50',
        )}
      >
        <SliderPrimitive.Track
          className={cn(
            'relative h-0.5 w-full grow overflow-hidden',
            'bg-white/20',
          )}
        >
          <div
            className="absolute top-0 left-0 h-full w-[var(--ev-the-media-loaded)] bg-white/30"
            style={
              {
                '--ev-the-media-loaded': `${loaded * 100}%`,
              } as CSSProperties
            }
          />
          <SliderPrimitive.Range
            className={cn('absolute h-full', 'bg-white')}
          />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className={cn(
            'block size-2.5 rounded-full',
            'bg-white',
            !isReady && 'translate-x-1.25',
          )}
        />
      </SliderPrimitive.Root>
    </div>
  );
};

export { TheMediaControlsProgressBar };
