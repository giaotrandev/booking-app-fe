'use client';
import { Icon } from '#/components/icons';
import { cn } from '#/lib/utilities/cn';
import { useTheMediaContext } from './context';

const TheMediaLoading = () => {
  const { isReady, isLoaded, isPlaying } = useTheMediaContext();
  return (
    <div
      className={cn(
        'absolute inset-0 z-2 flex size-full items-center justify-center',
        !isReady || (!isLoaded && isPlaying) ? 'opacity-100' : 'opacity-0',
      )}
    >
      <Icon name="spinner" className="size-10 animate-spin fill-white" />
    </div>
  );
};

export { TheMediaLoading };
