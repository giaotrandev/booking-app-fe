'use client';
import { Col } from '#/components/ui/col';
import { Row } from '#/components/ui/row';
import { useTranslate } from '#/i18n/client';
import { CountingCardItem } from './item';

interface CountingCardListProps {}

const CountingCardList = ({}: CountingCardListProps) => {
  const { translate } = useTranslate();
  const stats = [
    {
      title: '500K+',
      description: translate({
        vi: 'Khách hàng hài lòng',
        en: 'Satisfied customers',
      }),
    },
    {
      title: '100+',
      description: translate({
        vi: 'Tuyến đường',
        en: 'Routes',
      }),
    },
    {
      title: '15+',
      description: translate({
        vi: 'Năm kinh nghiệm',
        en: 'Years of experience',
      }),
    },
    {
      title: '4.8/5',
      description: translate({
        vi: 'Đánh giá trung bình',
        en: 'Average rating',
      }),
    },
  ];

  return (
    <Row className="gap-4 lg:gap-y-0">
      {stats.map((item, index) => (
        <Col key={index} className="col-span-full md:col-span-2 lg:col-span-3">
          <CountingCardItem {...item} />
        </Col>
      ))}
    </Row>
  );
};

export { CountingCardList };
