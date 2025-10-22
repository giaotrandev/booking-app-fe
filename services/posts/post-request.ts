export interface TagRequestProps {
  id: string;
  name?: string;
  slug?: string;
  status?: string;
}
export interface PostTagItemRequestProps {
  id: string;
  postId: string;
  tagId: string;
  tag?: TagRequestProps;
}
export interface PostCategoryRequestProps {
  id: string;
  slug?: string;
  name?: string;
  description?: string;
  createdAt?: string;
}
export interface PostAuthorRequestProps {
  id: string;
  firstName?: string;
  lastName?: string;
}
export interface PostsRequestProps {
  id: string;
  slug?: string;
  title?: string;
  excerpt?: string;
  content?: string;
  thumbnail?: string;
  featuredImage?: string;
  status?: 'PUBLISHED' | 'DRAFT';
  publishedAt?: string;
  createdAt?: string;
  author?: PostAuthorRequestProps;
  category?: PostCategoryRequestProps;
  postTags?: PostTagItemRequestProps[];
}
export interface PostsRequestListProps {
  list?: PostsRequestProps[];
}
