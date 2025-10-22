'use client';
import { cn } from '#/lib/utilities/cn';
import { Pause, Play } from 'lucide-react';
import { useTheMediaContext } from '../context';

const TheMediaControlsPlayPauseButton = () => {
  const { isReady, isPlaying, setIsPlaying } = useTheMediaContext();
  return (
    <button
      type="button"
      disabled={!isReady}
      onClick={() => {
        setIsPlaying(!isPlaying);
      }}
      className={cn(
        'pointer-events-auto inline-flex size-8 shrink-0 grow-0 basis-8 items-center justify-center rounded-full',
        'disabled:opacity-50',
        'lg:hover:bg-black/80',
      )}
    >
      {!isPlaying ? (
        <Play className={cn('size-4', 'text-white')} />
      ) : (
        <Pause className={cn('size-4', 'text-white')} />
      )}
    </button>
  );
};

export { TheMediaControlsPlayPauseButton };
