import { CategoriesRequestProps } from './categories-request';
import { CategoriesResponseProps } from './categories-response';

export const convertCategoryItem = async (
  category: CategoriesResponseProps,
): Promise<CategoriesRequestProps> => ({
  id: category.id ?? '',
  name: category.name ?? undefined,
  description: category.description ?? undefined,
  slug: category.slug ?? undefined,
});
