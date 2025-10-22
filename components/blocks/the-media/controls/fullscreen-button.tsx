'use client';
import { cn } from '#/lib/utilities/cn';
import { Maximize } from 'lucide-react';
import screenfull from 'screenfull';
import { useTheMediaContext } from '../context';

const TheMediaControlsFullscreenButton = () => {
  const { platform, playerRef, isReady } = useTheMediaContext();
  const disabled = !isReady || platform === 'youtube';
  const handleFullscreen = () => {
    if (playerRef && playerRef.current && screenfull.isEnabled) {
      const internalPlayer = playerRef.current.getInternalPlayer() as Element;
      if (internalPlayer) {
        screenfull.toggle(internalPlayer);
      }
    }
  };
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={!disabled ? handleFullscreen : undefined}
      className={cn(
        'pointer-events-auto inline-flex size-8 shrink-0 grow-0 basis-8 items-center justify-center rounded-full',
        'disabled:opacity-50',
        'lg:hover:bg-black/80',
      )}
    >
      <Maximize className={cn('size-4', 'text-white')} />
    </button>
  );
};

export { TheMediaControlsFullscreenButton };
