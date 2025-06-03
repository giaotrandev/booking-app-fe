'use client';
import VideoItem from '#/components/common/video';
import { cn } from '#/lib/utilities/cn';
import { ImageProps, MediaProps } from '#/types/global';
import { EmblaCarouselType } from 'embla-carousel';
import Image from 'next/image';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

export interface HeroVideoItemProps {
  videoUrl?: string;
  index?: number;
  slideActive?: number;
  image?: ImageProps;
  setSlideActive: Dispatch<SetStateAction<number>>;
  emblaApi?: EmblaCarouselType;
}
const HeroVideoItem = ({
  videoUrl,
  index,
  slideActive,
  image,
  emblaApi,
  setSlideActive,
}: HeroVideoItemProps) => {
  const [isVideoLoaded, setVideoLoaded] = useState<boolean>(false);

  const getSlideInView = useCallback((emblaApi: EmblaCarouselType) => {
    emblaApi?.slidesInView() && setSlideActive(emblaApi?.slidesInView()[0]);
  }, []);

  useEffect(() => {
    if (emblaApi) emblaApi.on('slidesInView', getSlideInView);
  }, [emblaApi, getSlideInView]);

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
  };

  return (
    <div className="relative h-full w-screen">
      {image && image.src && (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={index === 0}
          quality={100}
          sizes="100vw"
          className={cn(
            'z-[2] object-cover object-center transition-opacity',
            isVideoLoaded ? 'opacity-0' : 'opacity-100',
          )}
        />
      )}
      {videoUrl && index === slideActive && (
        <VideoItem
          playbackRate={0.6}
          loading={true}
          aspectRatio={16 / 9}
          isPlay={true}
          videoUrl={videoUrl}
          className="aspect-video:w-full aspect-video:h-auto"
          getPlaying={handleVideoLoaded}
        />
      )}
    </div>
  );
};

export default HeroVideoItem;
