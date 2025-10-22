import {
  PostDetailsTemplateHeroBlockRender,
  PostDetailsTemplateHeroBlockRenderProps,
} from './render';

export interface PostDetailsTemplateHeroBlockProps
  extends PostDetailsTemplateHeroBlockRenderProps {}

const PostDetailsTemplateHeroBlock = ({
  authorName,
  createdAt,
  thumbnail,
  title,
  categoryName,
}: PostDetailsTemplateHeroBlockProps) => {
  return (
    <PostDetailsTemplateHeroBlockRender
      authorName={authorName}
      createdAt={createdAt}
      thumbnail={thumbnail}
      title={title}
      categoryName={categoryName}
    />
  );
};

export { PostDetailsTemplateHeroBlock };
