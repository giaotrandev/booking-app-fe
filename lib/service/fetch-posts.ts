'use server';

import { PostsResponseListProps } from '#/services/posts/post-response';
import { PostsRequestProps } from '#/services/posts/post-request';
import { convertPostList } from '#/services/posts/post-list';

interface PostQueryParams {
  page?: number;
  limit?: number;
  categoryId?: string;
  tagId?: string;
  status?: string;
  search?: string;
  lang?: string;
}

interface PostsResponseData {
  success: boolean;
  message: string;
  data: PostsResponseListProps & {
    pagination?: {
      currentPage: number;
      totalPages: number;
      totalPosts: number;
    };
  };
}

export async function fetchPosts(params: PostQueryParams = {}) {
  const isDev = process.env.NODE_ENV === 'development';
  const baseURL = isDev ? 'http://localhost:3000' : process.env.NEXT_BASE_URL;

  try {
    const res = await fetch(`${baseURL}/api/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
      // cache: 'no-store',
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return {
        success: false,
        message: err?.message || 'Failed to fetch posts',
        posts: [],
        pagination: { currentPage: 1, totalPages: 1, totalPosts: 0 },
      };
    }

    const result: PostsResponseData = await res.json();
    const { success, message, data } = result;

    const convertedPosts: PostsRequestProps[] = await convertPostList(
      data.posts,
    );

    return {
      success,
      message,
      pagination: data.pagination,
      posts: convertedPosts,
    };
  } catch (error) {
    console.error('❌ fetchPosts error:', error);
    return {
      success: false,
      message: 'Unexpected error while fetching posts',
      posts: [],
      pagination: { currentPage: 1, totalPages: 1, totalPosts: 0 },
    };
  }
}
