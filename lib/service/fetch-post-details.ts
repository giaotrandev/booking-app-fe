'use server';

import { convertPostItem } from '#/services/posts/post-item';

export async function getPostDetailAction(slugOrId?: string) {
  const isDev = process.env.NODE_ENV === 'development';
  const baseURL = isDev ? 'http://localhost:3000' : process.env.NEXT_BASE_URL;

  const res = await fetch(`${baseURL}/api/post-details/${slugOrId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    // cache: 'no-store',
  });

  if (!res.ok) {
    console.error('Failed to fetch post details');
    return null;
  }

  const dataResponse = await res.json();

  if (!dataResponse.success) {
    console.error('API responded with failure:', dataResponse.message);
    return null;
  }

  if (!dataResponse.data || !dataResponse.data.post) {
    console.error('Invalid data structure from API');
    return null;
  }

  const convertedDataResponse = await convertPostItem(dataResponse.data.post);

  return convertedDataResponse;
}
