'use client';
import { cn } from '#/lib/utilities/cn';
import { TheMediaOptionsProps } from '#/types/global';
import { useTheMediaContext } from '../context';
import { TheMediaControlsFullscreenButton } from './fullscreen-button';
import { TheMediaControlsPlayPauseButton } from './play-pause-button';
import { TheMediaControlsProgressBar } from './process-bar';
import { TheMediaControlsTimer } from './timer';
import { TheMediaControlsVolumeButton } from './volume-button';

export interface TheMediaControlsProps {
  options?: TheMediaOptionsProps;
}

const TheMediaControls = ({ options }: TheMediaControlsProps) => {
  const controls =
    options?.controls === false
      ? {
          showPlayPause: false,
          showFullscreen: false,
          showVolume: false,
          showProgressBar: false,
          showTimer: false,
        }
      : {
          showPlayPause: true,
          showFullscreen: true,
          showVolume: true,
          showProgressBar: true,
          showTimer: true,
          ...(typeof options?.controls !== 'boolean' ? options?.controls : {}),
        };
  const { isPlaying, showingControls, setInteractingControls } =
    useTheMediaContext();
  return (
    <div
      className={cn(
        'absolute bottom-0 left-0 z-4 flex h-1/2 w-full flex-col justify-end',
        'bg-gradient-to-b from-transparent to-black/30',
        isPlaying
          ? [showingControls ? 'opacity-100' : 'opacity-0']
          : 'opacity-100',
      )}
    >
      <div
        className="space-y-px px-2 pb-2"
        onMouseOver={() => {
          setInteractingControls(true);
        }}
        onMouseLeave={() => {
          setInteractingControls(false);
        }}
        onFocus={() => {
          setInteractingControls(true);
        }}
        onBlur={() => {
          setInteractingControls(false);
        }}
      >
        {controls.showProgressBar && (
          <div>
            <TheMediaControlsProgressBar />
          </div>
        )}
        <div>
          <div className="-mx-1 flex flex-nowrap items-center">
            {controls.showPlayPause && (
              <div className="w-auto shrink-0 grow-0 basis-auto px-1">
                <TheMediaControlsPlayPauseButton />
              </div>
            )}
            {controls.showTimer && (
              <div className="w-auto shrink-0 grow-0 basis-auto px-1">
                <TheMediaControlsTimer />
              </div>
            )}
            <div className="shrink-0 grow basis-[0%] px-1">
              <div className="-mx-1 flex flex-nowrap items-center justify-end">
                {controls.showVolume && (
                  <div className="w-auto shrink-0 grow-0 basis-auto px-1">
                    <TheMediaControlsVolumeButton />
                  </div>
                )}
                {controls.showFullscreen && (
                  <div className="w-auto shrink-0 grow-0 basis-auto px-1">
                    <TheMediaControlsFullscreenButton />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { TheMediaControls };
