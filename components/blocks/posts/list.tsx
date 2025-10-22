import { Col } from '#/components/ui/col';
import { Row } from '#/components/ui/row';
import { PostItem, PostItemProps } from './item';

export interface PostListProps {
  list: PostItemProps[];
}

const PostList = ({ list }: PostListProps) => {
  return (
    <Row className="gap-6 lg:gap-8">
      {list.map((item, index) => (
        <Col
          key={item.id ?? index}
          className="col-span-full md:col-span-2 lg:col-span-4"
        >
          <PostItem {...item} />
        </Col>
      ))}
    </Row>
  );
};

export { PostList };
