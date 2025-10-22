import { getVideoInformation } from '#/lib/helper/video/information';
import { HeroRenderBlock, HeroSlide } from './render';

export interface HeroSlideInput {
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  videoURL?: string;
}

export interface HeroSectionProps {
  slides?: HeroSlideInput[];
}

const HeroBlock = async ({ slides = defaultSlides }: HeroSectionProps) => {
  // Process all video URLs to get complete video information
  const processedSlides: HeroSlide[] = await Promise.all(
    slides.map(async slide => {
      if (slide.videoURL) {
        const videoInfo = await getVideoInformation(slide.videoURL);
        return {
          image: slide.image,
          video: videoInfo,
        };
      }
      return {
        image: slide.image,
      };
    }),
  );

  return <HeroRenderBlock slides={processedSlides} />;
};

export { HeroBlock };

// Default slides data
const defaultSlides: HeroSlideInput[] = [
  {
    image: {
      alt: 'Hero image 1',
      src: '/images/hero.webp',
      width: 1920,
      height: 1080,
    },
  },
  {
    image: {
      alt: 'Hero video 1',
      src: '/images/hero.webp',
      width: 1920,
      height: 1080,
    },
    videoURL:
      'https://pub-459bf266ac1b494db84a566366b2a2e6.r2.dev/images/home/home-1.webm',
  },
  {
    image: {
      alt: 'Hero video 2',
      src: '/images/hero.webp',
      width: 1920,
      height: 1080,
    },
    videoURL:
      'https://pub-459bf266ac1b494db84a566366b2a2e6.r2.dev/images/home/home-2.webm',
  },
  {
    image: {
      alt: 'Hero image 2',
      src: '/images/hero.webp',
      width: 1920,
      height: 1080,
    },
  },
];

// // ============================================
// // File 3: Example Usage in page.tsx
// // ============================================
// /*
// import { HeroSection } from '@/components/hero/hero-section';

// export default async function HomePage() {
//   // Option 1: Use default slides
//   return <HeroSection />;

//   // Option 2: Custom slides
//   const customSlides = [
//     {
//       image: {
//         alt: 'Beautiful beach',
//         src: '/images/beach.webp',
//         width: 1920,
//         height: 1080,
//       },
//     },
//     {
//       image: {
//         alt: 'Mountain adventure',
//         src: '/images/mountain.webp',
//         width: 1920,
//         height: 1080,
//       },
//       videoURL: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
//     },
//     {
//       image: {
//         alt: 'City tour',
//         src: '/images/city.webp',
//         width: 1920,
//         height: 1080,
//       },
//       videoURL: 'https://vimeo.com/347119375',
//     },
//   ];

//   return <HeroSection slides={customSlides} />;
// }
