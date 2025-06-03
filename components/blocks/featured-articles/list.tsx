import FeaturedArticleItem, { FeaturedArticleItemProps } from './item';

export interface FeaturedArticleListProps {
  list: FeaturedArticleItemProps[];
}
const FeaturedArticleList = ({ list }: FeaturedArticleListProps) => {
  return (
    <div className="flex flex-col gap-y-6 lg:flex-row lg:gap-x-6 lg:gap-y-0">
      {list.map((item, index) => (
        <div key={index}>
          <FeaturedArticleItem {...item} />
        </div>
      ))}
    </div>
  );
};

export default FeaturedArticleList;
