import { PostsRenderBlock } from './render';
import { CategoriesRequestListProps } from '#/services/categories/categories-request';
import { convertToSelectOptions } from '#/lib/utilities/convert-to-select-options';
import { fetchPosts } from '#/lib/service/fetch-posts';
import { Suspense } from 'react';

interface PostsBlockProps {
  categories?: CategoriesRequestListProps['list'];
}

const PostsBlock = async ({ categories }: PostsBlockProps) => {
  // Map category slug cho dễ filter client-side
  const _categoryList = convertToSelectOptions(categories ?? []).map(item => {
    const category = categories?.find(c => c.id === item.value);
    return {
      ...item,
      value: category?.slug ?? item.value,
    };
  });

  // Fetch toàn bộ bài viết một lần
  const data = await fetchPosts({ limit: -1 });
  const posts = data?.posts ?? [];
  return (
    <Suspense>
      <PostsRenderBlock list={posts} categoryList={_categoryList} />
    </Suspense>
  );
};

export { PostsBlock };
