// import { MediaProps, VideoInformationProps } from '#/types/globals';
import { MediaProps, VideoInformationProps } from '#/types/global';
import { google } from 'googleapis';

const getVideoInformation = async (
  video?: string | MediaProps | null,
): Promise<VideoInformationProps | undefined> => {
  try {
    if (!video) {
      throw new Error('Video URL is required');
    }
    const youtubeRegex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const vimeoRegex = /https:\/\/vimeo\.com\/(?:.*\/)?(\d+)/;
    const videoExtensionsRegex =
      /\.(mp4|m4v|webm|ogv|ogg|mov|avi|wmv|flv|f4v|mkv|mk3d|mka|mks|mpeg|mpg|m2v|ts|m2ts|mts|vob|3gp|3g2|divx|xvid|rm|rmvb|asf)(\?.*)?$/i;
    if (typeof video === 'string') {
      if (youtubeRegex.test(video)) {
        const youtubeMatch = video.match(youtubeRegex);
        if (youtubeMatch) {
          const id = youtubeMatch[1];
          try {
            if (!process.env.GOOGLE_YOUTUBE_API_KEY) {
              throw new Error('GOOGLE_YOUTUBE_API_KEY is not defined');
            }
            const youtube = google.youtube({
              version: 'v3',
              auth: process.env.GOOGLE_YOUTUBE_API_KEY,
            });
            const fetcher = await youtube.videos.list({
              part: ['snippet', 'statistics'],
              id: [id],
            });
            const response = fetcher.data.items?.[0];
            return {
              platform: 'youtube',
              url: `https://www.youtube.com/watch?v=${id}`,
              alt: response?.snippet?.title || '',
              width: response?.snippet?.thumbnails?.maxres?.width || undefined,
              height:
                response?.snippet?.thumbnails?.maxres?.height || undefined,
            };
          } catch (error) {
            console.error(error);
            const fetcher = await fetch(
              `https://youtube.com/oembed?url=${encodeURIComponent(video)}`,
              { cache: 'force-cache' },
            );
            if (fetcher.ok && fetcher.status === 200) {
              const response = await fetcher.json();
              return {
                platform: 'youtube',
                url: `https://www.youtube.com/watch?v=${id}`,
                alt: response.title || '',
                width: response.width || undefined,
                height: response.height || undefined,
              };
            } else {
              throw new Error('Failed to fetch YouTube video');
            }
          }
        }
      } else if (vimeoRegex.test(video)) {
        const vimeoMatch = video.match(vimeoRegex);
        if (vimeoMatch) {
          const id = vimeoMatch[1];
          const fetcher = await fetch(
            `https://vimeo.com/api/v2/video/${id}.json`,
            {
              cache: 'force-cache',
            },
          );
          if (fetcher.ok && fetcher.status === 200) {
            const response = await fetcher.json();
            if (Array.isArray(response) && response.length > 0) {
              return {
                platform: 'vimeo',
                url: response[0].url || video,
                alt: response[0].title || '',
                width: response[0].width,
                height: response[0].height,
              };
            }
          } else {
            if (!process.env.VIMEO_API_KEY) {
              throw new Error('VIMEO_API_KEY is not defined');
            }
            const fetcher = await fetch(`https://api.vimeo.com/videos/${id}`, {
              cache: 'force-cache',
              headers: {
                Authorization: `Bearer ${process.env.VIMEO_API_KEY}`,
              },
            });
            const response = await fetcher.json();
            if (fetcher.ok && fetcher.status === 200) {
              return {
                platform: 'vimeo',
                url: response.player_embed_url || video,
                alt: response.name || '',
                width: response.width,
                height: response.height,
              };
            } else {
              throw new Error(
                response?.developer_message || 'Failed to fetch Vimeo video',
              );
            }
          }
        }
      } else if (videoExtensionsRegex.test(video)) {
        return {
          platform: 'generic',
          url: video,
          alt: '',
        };
      } else {
        throw new Error('Invalid video URL format');
      }
    } else {
      if (videoExtensionsRegex.test(video.url)) {
        return {
          platform: 'generic',
          ...video,
        };
      } else {
        throw new Error('Invalid video URL format');
      }
    }
  } catch (error) {
    console.error(error);
    return;
  }
};

export { getVideoInformation };
