'use client';
import { cn } from '#/lib/utilities/cn';
import { Volume2, VolumeOff } from 'lucide-react';
import { useTheMediaContext } from '../context';

const TheMediaControlsVolumeButton = () => {
  const { isReady, isMuted, setIsMuted } = useTheMediaContext();
  return (
    <button
      type="button"
      onClick={() => {
        setIsMuted(!isMuted);
      }}
      className={cn(
        'pointer-events-auto inline-flex size-8 shrink-0 grow-0 basis-8 items-center justify-center rounded-full',
        'disabled:opacity-50',
        'lg:hover:bg-black/80',
      )}
      disabled={!isReady}
    >
      {!isMuted ? (
        <Volume2 className={cn('size-4', 'text-white')} />
      ) : (
        <VolumeOff className={cn('size-4', 'text-white')} />
      )}
    </button>
  );
};

export { TheMediaControlsVolumeButton };
