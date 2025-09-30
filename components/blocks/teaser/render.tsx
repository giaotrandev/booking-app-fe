import Stroke from '#/components/common/stroke';
import { Container } from '#/components/ui/container';
import { Typography } from '#/components/ui/typography';
import { getTranslate } from '#/i18n/server';
import { ProvincesRequestProps } from '#/services/global-settings/provinces-request';
import { BlockWrapper } from '../wrapper';
import { TeaserList } from './list';
export interface TeaserRenderBlockProps {
  list: ProvincesRequestProps[];
}
const TeaserRenderBlock = async ({ list }: TeaserRenderBlockProps) => {
  if (!(Array.isArray(list) && list.length > 0)) return null;
  // const { translate } = await getTranslate();

  return (
    <BlockWrapper>
      {/* <Stroke className="mb-8" /> */}
      <Container>
        <div className="flex flex-col space-y-5">
          <h2>
            <Typography asChild variant="title" className="uppercase">
              <span>popular </span>
            </Typography>
            <Typography asChild variant="title" className="uppercase">
              <span className="text-pj-red">routes</span>
            </Typography>
          </h2>
          <TeaserList list={list} />
        </div>
      </Container>
    </BlockWrapper>
  );
};

export { TeaserRenderBlock };
const sampleTeaserList = [
  {
    image: {
      src: '/images/placeholder.jpg',
      alt: 'placeholder',
      width: 1200,
      height: 800,
    },
    title: 'SAI GON - CAN THO',
    description: 'From: 250,000 VND',
  },
  {
    image: {
      src: '/images/placeholder.jpg',
      alt: 'placeholder',
      width: 1200,
      height: 800,
    },
    title: 'SAI GON - CAN THO',
    description: 'From: 250,000 VND',
  },
  {
    image: {
      src: '/images/placeholder.jpg',
      alt: 'placeholder',
      width: 1200,
      height: 800,
    },
    title: 'SAI GON - DONG THAP',
    description: 'From: 250,000 VND',
  },
  {
    image: {
      src: '/images/placeholder.jpg',
      alt: 'placeholder',
      width: 1200,
      height: 800,
    },
    title: 'SAI GON - BEN TRE',
    description: 'From: 250,000 VND',
  },
  {
    image: {
      src: '/images/placeholder.jpg',
      alt: 'placeholder',
      width: 1200,
      height: 800,
    },
    title: 'SAI GON - AN GIANG',
    description: 'From: 250,000 VND',
  },
  {
    image: {
      src: '/images/placeholder.jpg',
      alt: 'placeholder',
      width: 1200,
      height: 800,
    },
    title: 'SAI GON - AN GIANG',
    description: 'From: 250,000 VND',
  },
  {
    image: {
      src: '/images/placeholder.jpg',
      alt: 'placeholder',
      width: 1200,
      height: 800,
    },
    title: 'SAI GON - AN GIANG',
    description: 'From: 250,000 VND',
  },
  {
    image: {
      src: '/images/placeholder.jpg',
      alt: 'placeholder',
      width: 1200,
      height: 800,
    },
    title: 'SAI GON - AN GIANG',
    description: 'From: 250,000 VND',
  },
  {
    image: {
      src: '/images/placeholder.jpg',
      alt: 'placeholder',
      width: 1200,
      height: 800,
    },
    title: 'SAI GON - AN GIANG',
    description: 'From: 250,000 VND',
  },
];
