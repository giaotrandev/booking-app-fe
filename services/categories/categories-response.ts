export interface CategoriesResponseProps {
  id: string;
  name?: string;
  slug?: string;
  description?: string;
}
export interface CategoriesResponseListProps {
  categories?: CategoriesResponseProps[];
}
