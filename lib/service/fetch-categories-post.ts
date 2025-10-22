'use server';

import { convertCategoryList } from '#/services/categories/categories-list';
import { CategoriesResponseListProps } from '#/services/categories/categories-response';
import { CategoriesRequestProps } from '#/services/categories/categories-request';

interface CategoriesQueryParams {
  lang?: string;
}

interface CategoriesResponseData {
  success: boolean;
  message: string;
  data: CategoriesResponseListProps;
}

export async function fetchCategories(params: CategoriesQueryParams = {}) {
  const isDev = process.env.NODE_ENV === 'development';
  const baseURL = isDev ? 'http://localhost:3000' : process.env.NEXT_BASE_URL;

  try {
    const res = await fetch(`${baseURL}/api/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
      // cache: 'no-store',
    });

    if (!res.ok) {
      console.error('❌ Failed to fetch categories');
      return [];
    }

    const result: CategoriesResponseData = await res.json();
    const convertedCategories: CategoriesRequestProps[] =
      await convertCategoryList(result?.data?.categories ?? []);

    return convertedCategories;
  } catch (error) {
    console.error('❌ fetchCategories error:', error);
    return [];
  }
}
