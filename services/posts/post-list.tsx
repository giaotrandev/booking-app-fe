import { convertPostItem } from './post-item';
import { PostsRequestListProps, PostsRequestProps } from './post-request';
import { PostsResponseListProps } from './post-response';

export const convertPostList = async (
  posts: PostsResponseListProps['posts'],
) => {
  const _posts: PostsRequestListProps['list'] = [];
  for (const province of posts ?? []) {
    if (!province) continue;
    const _province: PostsRequestProps = await convertPostItem(province);
    _posts.push(_province);
  }
  return _posts;
};
