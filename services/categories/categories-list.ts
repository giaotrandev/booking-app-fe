import { convertCategoryItem } from './categories-item';
import { CategoriesRequestListProps } from './categories-request';
import {
  CategoriesResponseListProps,
  CategoriesResponseProps,
} from './categories-response';

export const convertCategoryList = async (
  posts: CategoriesResponseListProps['categories'],
) => {
  const _posts: CategoriesRequestListProps['list'] = [];
  for (const province of posts ?? []) {
    if (!province) continue;
    const _province: CategoriesResponseProps =
      await convertCategoryItem(province);
    _posts.push(_province);
  }
  return _posts;
};
