import { MediaProps } from "#/types/global";

export interface HandleVideoInformationProps extends MediaProps {
  platform?: 'generic' | 'youtube' | 'vimeo';
}

const handleVideoInformation = async (
  video?: string | null | MediaProps,
): Promise<HandleVideoInformationProps | undefined> => {
  if (!video) {
    throw new Error();
  }
  try {
    if (typeof video === 'string') {
      const youtubeRegex =
        /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
      const vimeoRegex = /https:\/\/vimeo\.com\/(?:.*\/)?(\d+)/;
      if (youtubeRegex.test(video)) {
        const youtubeMatch = video.match(youtubeRegex);
        if (youtubeMatch) {
          const fetcher = await fetch(
            `https://www.youtube.com/oembed?url=${encodeURIComponent(video)}`,
            {
              cache: 'force-cache',
            },
          );
          const response = await fetcher.json();
          return {
            platform: 'youtube',
            url: video,
            alt: response.title ?? 'youtube',
            width: response.width ?? undefined,
            height: response.height ?? undefined,
          };
        }
      } else if (vimeoRegex.test(video)) {
        const vimeoMatch = video.match(vimeoRegex);
        if (vimeoMatch) {
          let results: HandleVideoInformationProps = {
            platform: 'vimeo',
            url: video,
            alt: '',
          };
          const id = vimeoMatch[1];
          const fetcher = await fetch(
            `https://vimeo.com/api/v2/video/${id}.json`,
            {
              cache: 'force-cache',
            },
          );
          const response = await fetcher.json();
          if (Array.isArray(response) && response.length > 0) {
            results.alt = response[0].title ?? 'vimeo';
            results.width = response[0].width ?? undefined;
            results.height = response[0].height ?? undefined;
          }
          return results;
        }
      } else {
        throw new Error();
      }
    } else {
      const videoExtensionsRegex =
        /\.(mp4|m4v|webm|ogv|ogg|mov|avi|wmv|flv|f4v|mkv|mk3d|mka|mks|mpeg|mpg|m2v|ts|m2ts|mts|vob|3gp|3g2|divx|xvid|rm|rmvb|asf)(\?.*)?$/i;
      if (videoExtensionsRegex.test(video.url)) {
        return {
          platform: 'generic',
          ...video,
        };
      } else {
        throw new Error();
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return;
  }
};

export { handleVideoInformation };
