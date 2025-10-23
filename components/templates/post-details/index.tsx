import { BlockWrapper } from '#/components/blocks/wrapper';
import { Container } from '#/components/ui/container';
import { Typography } from '#/components/ui/typography';
import { PostsRequestProps } from '#/services/posts/post-request';
import { Content } from './content';
import {
  PostDetailsTemplateHeroBlock,
  PostDetailsTemplateHeroBlockProps,
} from './hero';
import { RelatedPostsBlock, RelatedPostsBlockProps } from './related-posts';

export interface PostDetailsTemplateProps
  extends PostDetailsTemplateHeroBlockProps,
    Partial<
      Omit<PostsRequestProps, 'title' | 'createdAt' | 'thumbnail' | 'author'>
    > {
  relatedPostList?: RelatedPostsBlockProps['list'];
}

const PostDetailsTemplate = ({
  title,
  thumbnail,
  createdAt,
  authorName,
  content,
  relatedPostList,
  category,
}: PostDetailsTemplateProps) => {
  return (
    <div>
      {(title || thumbnail || createdAt || authorName || category?.name) && (
        <PostDetailsTemplateHeroBlock
          title={title}
          thumbnail={thumbnail}
          createdAt={createdAt}
          authorName={authorName}
          categoryName={category?.name}
        />
      )}
      {content && (
        <BlockWrapper>
          <Container>
            <div className="lg:mx-auto lg:max-w-300">
              <Content content={content} />
            </div>
          </Container>
        </BlockWrapper>
      )}
      {Array.isArray(relatedPostList) && relatedPostList.length > 0 && (
        <BlockWrapper className="border-pj-gray-lightest border-t">
          <Container>
            <RelatedPostsBlock list={relatedPostList} />
          </Container>
        </BlockWrapper>
      )}
    </div>
  );
};

export { PostDetailsTemplate };
