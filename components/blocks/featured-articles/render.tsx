import Stroke from '#/components/common/stroke';
import { Button } from '#/components/ui/button';
import { Container } from '#/components/ui/container';
import { Typography } from '#/components/ui/typography';
import { BlockWrapper } from '../wrapper';
import FeaturedArticleList from './list';

const FeaturedArticlesRenderBlock = () => {
  return (
    <BlockWrapper className="bg-pj-gray-lightest">
      {/* <div className="mb-6">
        <Stroke />
      </div> */}
      <Container>
        <div className="flex flex-col gap-y-6 xl:flex-row xl:gap-x-19 xl:gap-y-0">
          <div className="flex max-w-107.75 flex-col space-y-3">
            <h2>
              <Typography asChild variant="big-title" className="uppercase">
                <span className="text-pj-red">ALSO </span>
              </Typography>
              <Typography asChild variant="big-title" className="uppercase">
                <span>CHECK OUT</span>
              </Typography>
            </h2>
            <Typography
              asChild
              variant="sub-body"
              className="text-pj-gray-light"
            >
              <p>
                Vietnam is a beautiful country in Southeast Asia, known for its
                rich history, vibrant culture, and breathtaking natural scenery.
                The country has become a popular tourist hub over the years,
                with millions of visitors flocking to its shores to experience
                its beauty and charm. If you're planning a trip to Vietnam,
                there are several must-visit destinations that you should not
                miss. In this article, we will take a closer look at the most
                famous Vietnam tour places that you should include in your
                itinerary.
              </p>
            </Typography>
            <div>
              <Button text="View detail" colors="none" variant="with-shadow" />
            </div>
          </div>
          <div className="flex flex-1">
            <FeaturedArticleList list={sampleFearturedArticles} />
          </div>
        </div>
      </Container>
    </BlockWrapper>
  );
};

export { FeaturedArticlesRenderBlock };
const sampleFearturedArticles = [
  {
    url: '#',
    image: {
      src: '/images/placeholder.jpg',
      alt: 'placeholder',
      width: 1200,
      height: 800,
    },
    tag: 'Mekong Delta',
    title: 'An Giang',
    description:
      'An Giang is a province in southern Vietnam, bordering Cambodia. It lies in the Mekong Delta and tributaries of the vast Mekong River run through its fertile landscape. It’s known for its agricultural traditions',
  },
  {
    url: '#',
    image: {
      src: '/images/placeholder.jpg',
      alt: 'placeholder',
      width: 1200,
      height: 800,
    },
    tag: 'Mekong Delta',
    title: 'An Giang',
    description:
      'An Giang is a province in southern Vietnam, bordering Cambodia. It lies in the Mekong Delta and tributaries of the vast Mekong River run through its fertile landscape. It’s known for its agricultural traditions',
  },
];
