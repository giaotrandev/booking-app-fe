export interface CategoriesRequestProps {
  id: string;
  name?: string;
  slug?: string;
  description?: string;
}
export interface CategoriesRequestListProps {
  list?: CategoriesRequestProps[];
}
