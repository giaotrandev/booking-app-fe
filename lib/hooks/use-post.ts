import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchPosts } from '../service/fetch-posts';

interface UsePostsInfiniteParams {
  categoryId?: string;
  tagId?: string;
  status?: string;
  search?: string;
  lang?: string;
  limit?: number;
}

export function usePostsInfinite(params: UsePostsInfiniteParams) {
  return useInfiniteQuery({
    queryKey: ['posts', params],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await fetchPosts({
        ...params,
        page: pageParam,
        limit: params.limit || 10,
      });
      return data;
    },
    // getNextPageParam: (lastPage, allPages) => {
    //   //   const currentLength = allPages.flatMap(p => p.posts ?? []).length
    //   const hasMore = (lastPage.posts?.length || 0) >= (params.limit || 10);
    //   return hasMore ? allPages.length + 1 : undefined;
    // },
    getNextPageParam: (lastPage, allPages) => {
      const totalLoaded = allPages.flatMap(p => p.posts).length;
      const totalAvailable = lastPage.pagination?.totalPosts ?? 0;

      if (totalLoaded < totalAvailable) {
        return allPages.length + 1;
      }

      // Không còn dữ liệu nữa
      return undefined;
    },
    initialPageParam: 1,
  });
}
