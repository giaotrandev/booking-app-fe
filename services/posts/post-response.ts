export interface TagResponseProps {
  id?: string;
  name?: string;
  slug?: string;
  status?: string;
}
export interface PostTagItemResponseProps {
  id?: string;
  postId?: string;
  tagId?: string;
  tag?: TagResponseProps;
}
export interface PostCategoryResponseProps {
  id: string;
  slug?: string;
  name?: string;
  description?: string;
  createdAt?: string;
}
export interface PostAuthorResponseProps {
  id?: string;
  firstName?: string;
  lastName?: string;
}
export interface PostsResponseProps {
  id?: string;
  slug?: string;
  title?: string;
  content?: string;
  excerpt?: string;
  thumbnail?: string;
  status: 'PUBLISHED' | 'DRAFT';
  publishedAt?: string;
  createdAt?: string;
  author?: PostAuthorResponseProps;
  category?: PostCategoryResponseProps;
  postTags?: PostTagItemResponseProps[];
}
export interface PostsResponseListProps {
  posts?: PostsResponseProps[];
}
