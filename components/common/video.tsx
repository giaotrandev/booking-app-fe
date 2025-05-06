'use client';

import { cn } from '#/lib/utilities/cn';
import { useEffect, useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { useEventListener, useWindowSize } from 'usehooks-ts';

interface VideoItemProps {
  videoUrl: string;
  className?: string;
  isPlay: boolean;
  aspectRatio?: number;
  aspectRatioMobile?: number;
  loading: boolean;
  playbackRate?: number;
  getPlaying?: React.Dispatch<React.SetStateAction<boolean>>;
}

const VideoItem = ({
  videoUrl,
  className = '',
  isPlay = false,
  aspectRatio = 0.41,
  aspectRatioMobile = 2.4,
  loading,
  playbackRate,
  getPlaying,
}: VideoItemProps) => {
  const [isOnPlay, setOnPlay] = useState<boolean>(false);
  const [isOnReady, setOnReady] = useState<boolean>(false);
  const windowSize = useWindowSize();
  const [isWindowSize, setWindowSize] = useState<number>(1024);
  const ref = useRef<HTMLDivElement>(null);
  const [videoSize, setVideoSize] = useState({
    width: 0,
    height: 0,
    left: 0,
    top: 0,
  });

  const handleResize = () => {
    if (ref && ref.current) {
      const viewHeight = ref.current?.clientHeight;
      const viewWidth = ref.current?.clientWidth;

      const videoWidth =
        viewHeight * (viewWidth > 1360 ? aspectRatio : aspectRatioMobile);
      const videoHeight =
        viewWidth / (viewWidth > 1360 ? aspectRatio : aspectRatioMobile);

      if (viewWidth <= videoWidth) {
        setVideoSize({
          width: videoWidth,
          height: viewHeight,
          left: -(videoWidth - viewWidth) / 2,
          top: 0,
        });
      } else {
        setVideoSize({
          width: viewWidth,
          height: videoHeight,
          left: 0,
          top: -(videoHeight - viewHeight) / 2,
        });
      }
    }
  };

  useEffect(() => {
    if (ref && ref.current) {
      handleResize();
    }
  }, [ref]);

  useEffect(() => {
    setWindowSize(windowSize.width);
  }, [windowSize.width]);

  useEventListener('resize', handleResize);
  return (
    <div
      className={cn(
        'absolute top-1/2 left-1/2 z-[1] h-full w-full -translate-x-1/2 -translate-y-1/2',
        className,
      )}
      ref={ref}
    >
      {loading && (
        <>
          <ReactPlayer
            playbackRate={playbackRate}
            playing={isPlay}
            playsinline={true}
            muted={true}
            url={videoUrl}
            height={videoSize.height}
            width={videoSize.width}
            style={{
              position: 'absolute',
              top: videoSize.top,
              left: videoSize.left,
              pointerEvents: 'none',
            }}
            config={{
              youtube: {
                embedOptions: {
                  host: 'https://www.youtube-nocookie.com',
                },
                playerVars: {
                  controls: 0,
                  disablekb: 1,
                  fs: 0,
                  iv_load_policy: 3,
                  rel: 0,
                  autoplay: 1,
                },
              },
              vimeo: {
                playerOptions: {
                  dnt: true,
                  autoplay: true,
                  muted: true,
                  quality: isWindowSize >= 1024 ? 'auto' : '520p',
                  transparent: false,
                },
              },
            }}
            onReady={() => {
              setOnReady(true);
            }}
            // onStart={() => {
            //   console.log('Vimeo onStart');
            // }}
            onPlay={() => {
              if (!isOnPlay) {
                setTimeout(() => {
                  setOnPlay(true);
                  getPlaying && getPlaying(true);
                }, 700);
              }
            }}
          />
        </>
      )}
    </div>
  );
};

export default VideoItem;
