'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { PostsBlock } from '.';
import { CategoriesRequestListProps } from '#/services/categories/categories-request';
export interface WrapperPostsBlockProps {
  categories?: CategoriesRequestListProps['list'];
}
const WrapperPostsBlock = ({ categories }: WrapperPostsBlockProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <PostsBlock categories={categories} />
    </QueryClientProvider>
  );
};

export { WrapperPostsBlock };
