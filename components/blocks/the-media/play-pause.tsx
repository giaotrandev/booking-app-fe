'use client';
import { cn } from '#/lib/utilities/cn';
import { useTheMediaContext } from './context';

const TheMediaPlayPause = () => {
  const { isReady, isPlaying, setIsPlaying } = useTheMediaContext();
  return (
    <button
      type="button"
      disabled={!isReady}
      onClick={() => {
        setIsPlaying(!isPlaying);
      }}
      className={cn(
        'pointer-events-auto absolute inset-0 z-3 size-full',
        'disabled:pointer-events-none',
      )}
    />
  );
};

export { TheMediaPlayPause };
