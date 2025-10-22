'use client';
import { cn } from '#/lib/utilities/cn';
import { useTheMediaContext } from '../context';

const hasHours = (seconds: number) => {
  if (isNaN(seconds)) {
    return false;
  }
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  return hh > 0;
};

const format = (seconds: number, hasHours?: boolean) => {
  if (isNaN(seconds)) {
    return hasHours ? '00:00:00' : '00:00';
  }
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes().toString().padStart(2, '0');
  const ss = date.getUTCSeconds().toString().padStart(2, '0');
  if (hh > 0) {
    return `${hh.toString().padStart(2, '0')}:${mm}:${ss}`;
  }
  return `${hasHours ? '00:' : ''}${mm}:${ss}`;
};

const TheMediaControlsTimer = () => {
  const { isReady, duration, currentTime } = useTheMediaContext();
  return (
    <div
      className={cn(
        'pointer-events-auto text-[12px] leading-none',
        !isReady && 'opacity-50',
      )}
    >
      {format(currentTime, hasHours(duration))} / {format(duration)}
    </div>
  );
};

export { TheMediaControlsTimer };
