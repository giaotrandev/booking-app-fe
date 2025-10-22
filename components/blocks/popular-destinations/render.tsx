import { ButtonLinkUnderline } from '#/components/ui/button-link-underline';
import { Col } from '#/components/ui/col';
import { Container } from '#/components/ui/container';
import { Row } from '#/components/ui/row';
import { Typography } from '#/components/ui/typography';
import { Link } from '#/i18n/routing';
import { getTranslate } from '#/i18n/server';
import { BlockWrapper } from '../wrapper';
import { PopularDestinationList, PopularDestinationListProps } from './list';

interface PopularDestinationBlockRenderProps {
  list?: PopularDestinationListProps['list'];
}

const PopularDestinationBlockRender = async ({
  list,
}: PopularDestinationBlockRenderProps) => {
  const { translate } = await getTranslate();
  return (
    <BlockWrapper className="">
      <Container>
        <Row className="gap-y-12 lg:gap-x-20">
          <Col className="col-span-full lg:col-span-6">
            <div className="flex flex-col gap-y-4 lg:sticky lg:top-30 lg:left-0">
              <h2>
                <Typography asChild variant="h1" className="uppercase">
                  <span className="text-pj-red">
                    {await translate({
                      vi: 'Những điểm đến ',
                      en: 'Popular ',
                    })}
                  </span>
                </Typography>
                <Typography asChild variant="h1" className="uppercase">
                  <span>
                    {await translate({
                      vi: 'Phổ biến ',
                      en: 'destinations',
                    })}
                  </span>
                </Typography>
              </h2>
              <Typography asChild variant="label">
                <p>
                  {await translate({
                    vi: 'Việt Nam là một đất nước xinh đẹp nằm ở khu vực Đông Nam Á, nổi tiếng với bề dày lịch sử, nền văn hóa phong phú, và vẻ đẹp thiên nhiên ngoạn mục. Qua nhiều năm, đất nước này đã trở thành điểm đến du lịch yêu thích của du khách quốc tế, thu hút hàng triệu người đến khám phá vẻ đẹp và sức hấp dẫn riêng biệt của mình. Nếu bạn đang lên kế hoạch cho một chuyến đi đến Việt Nam, có rất nhiều địa điểm du lịch nổi bật mà bạn không nên bỏ lỡ. Trong bài viết này, chúng ta sẽ cùng tìm hiểu những điểm đến nổi tiếng nhất Việt Nam mà bạn nên đưa vào lịch trình của mình.',
                    en: "Vietnam is a beautiful country in Southeast Asia, known for its rich history, vibrant culture, and breathtaking natural scenery. The country has become a popular tourist hub over the years, with millions of visitors flocking to its shores to experience its beauty and charm. If you're planning a trip to Vietnam, there are several must-visit destinations that you should not miss. In this article, we will take a closer look at the most famous Vietnam tour places that you should include in your itinerary.",
                  })}
                </p>
              </Typography>
              <div className="flex">
                <ButtonLinkUnderline
                  text={await translate({
                    vi: `Xem tất cả bài viết`,
                    en: `View all posts`,
                  })}
                  icon="arrow-right"
                  asChild
                >
                  <Link href={'/posts'} />
                </ButtonLinkUnderline>
              </div>
            </div>
          </Col>
          {Array.isArray(list) && list.length > 0 && (
            <Col className="col-span-full lg:col-span-6">
              <PopularDestinationList list={list} />
            </Col>
          )}
        </Row>
      </Container>
    </BlockWrapper>
  );
};

export { PopularDestinationBlockRender };
