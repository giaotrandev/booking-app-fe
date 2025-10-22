import { Col } from '#/components/ui/col';
import { Container } from '#/components/ui/container';
import { Row } from '#/components/ui/row';
import { Typography } from '#/components/ui/typography';
import { getTranslate } from '#/i18n/server';
import Image from 'next/image';
import { BlockWrapper } from '../wrapper';
import { blurDataUrl } from '#/lib/constant';

interface MissionBlockRenderProps {}

const MissionBlockRender = async ({}: MissionBlockRenderProps) => {
  const { translate } = await getTranslate();

  return (
    <BlockWrapper>
      <Container>
        <Row className="gap-y-4 lg:gap-x-8">
          <Col className="col-span-full flex items-center lg:col-span-6">
            <div className="flex flex-col gap-y-4 lg:gap-y-6">
              <Typography
                asChild
                variant="h2"
                className="text-center font-bold lg:text-start"
              >
                <h2>
                  {translate({
                    vi: 'Sứ Mệnh Của Chúng Tôi',
                    en: 'Our Mission',
                  })}
                </h2>
              </Typography>
              <Typography
                asChild
                variant="label"
                className="text-pj-gray-light"
              >
                <p>
                  {translate({
                    vi: 'Chúng tôi tin rằng mỗi chuyến đi không chỉ là việc di chuyển từ điểm A đến điểm B, mà là những trải nghiệm đáng nhớ, những kết nối ý nghĩa và những kỷ niệm đẹp.',
                    en: 'We believe that every journey is not just about moving from point A to point B, but about creating memorable experiences, meaningful connections, and beautiful memories.',
                  })}
                </p>
              </Typography>
              <Typography
                asChild
                variant="label"
                className="text-pj-gray-light"
              >
                <p>
                  {translate({
                    vi: 'Với hơn 15 năm kinh nghiệm trong ngành vận tải hành khách, chúng tôi không ngừng nỗ lực để mang đến cho bạn những chuyến đi an toàn, thoải mái và đáng tin cậy nhất. dịch sang tiếng anh',
                    en: 'With over 15 years of experience in passenger transportation, we continuously strive to provide you with the safest, most comfortable, and most reliable travel experiences.',
                  })}
                </p>
              </Typography>
            </div>
          </Col>
          <Col className="col-span-full lg:col-span-6">
            <div className="relative overflow-hidden pt-[calc((400/463.5)*100%)]">
              <Image
                src="/images/hero.webp"
                alt={await translate({
                  vi: `VietNam Road Trip - Trang về chúng tôi`,
                  en: `VietNam Road Trip - About-us page`,
                })}
                fill
                className="rounded-[10px] object-cover lg:rounded-2xl"
                placeholder="blur"
                blurDataURL={blurDataUrl}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </BlockWrapper>
  );
};

export { MissionBlockRender };
