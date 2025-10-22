import { Col } from '#/components/ui/col';
import { Row } from '#/components/ui/row';
import { RelatedPostItem, RelatedPostItemProps } from './item';

export interface RelatedPostListProps {
  list: RelatedPostItemProps[];
}

const RelatedPostList = ({ list }: RelatedPostListProps) => {
  return (
    <Row className="gap-6 lg:gap-10">
      {list.map((item, index) => (
        <Col className="col-span-full md:col-span-6" key={item.id ?? index}>
          <RelatedPostItem key={item.id ?? index} {...item} />
        </Col>
      ))}
    </Row>
  );
};

export { RelatedPostList };
