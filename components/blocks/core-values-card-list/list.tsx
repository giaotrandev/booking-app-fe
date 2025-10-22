import { IconNamesProps } from '#/components/icons';
import { Col } from '#/components/ui/col';
import { Row } from '#/components/ui/row';
import { getTranslate } from '#/i18n/server';
import { CoreValuesCardItem } from './item';

interface CoreValuesCardListProps {}

const CoreValuesCardList = async ({}: CoreValuesCardListProps) => {
  const { translate } = await getTranslate();
  const coreValues = [
    {
      iconName: 'shield' as IconNamesProps,
      title: await translate({
        vi: 'An Toàn Hàng Đầu',
        en: 'Safety First',
      }),
      description: await translate({
        vi: 'Chúng tôi cam kết đảm bảo an toàn tuyệt đối cho mọi hành trình với đội ngũ tài xế chuyên nghiệp.',
        en: 'We are committed to ensuring absolute safety on every journey with our team of professional drivers.',
      }),
    },
    {
      iconName: 'heart' as IconNamesProps,

      title: await translate({
        vi: 'Tận Tâm Phục Vụ',
        en: 'Dedicated Service',
      }),
      description: await translate({
        vi: 'Đặt sự hài lòng của khách hàng lên hàng đầu với dịch vụ hỗ trợ 24/7 và chăm sóc tận tình.',
        en: 'We prioritize customer satisfaction with 24/7 support and attentive care.',
      }),
    },
    {
      iconName: 'medal' as IconNamesProps,
      title: await translate({
        vi: 'Chất Lượng Đỉnh Cao',
        en: 'Premium Quality',
      }),
      description: await translate({
        vi: 'Phương tiện hiện đại cùng tiện nghi cao cấp mang đến trải nghiệm di chuyển thoải mái nhất.',
        en: 'Modern vehicles and high-end amenities provide the most comfortable travel experience.',
      }),
    },
    {
      iconName: 'growth' as IconNamesProps,
      title: await translate({
        vi: 'Phát Triển Bền Vững',
        en: 'Sustainable Growth',
      }),
      description: await translate({
        vi: 'Không ngừng đổi mới và cải tiến để phục vụ bạn ngày càng tốt hơn.',
        en: 'We continuously innovate and improve to serve you better every day.',
      }),
    },
  ];
  return (
    <Row className="gap-6 lg:gap-y-0">
      {coreValues.map((item, index) => (
        <Col
          key={index}
          className="border-pj-gray-light col-span-full rounded-[12px] border md:col-span-2 lg:col-span-3"
        >
          <CoreValuesCardItem {...item} />
        </Col>
      ))}
    </Row>
  );
};

export { CoreValuesCardList };
