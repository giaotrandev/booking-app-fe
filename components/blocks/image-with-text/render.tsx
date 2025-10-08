import { Col } from '#/components/ui/col';
import { Container } from '#/components/ui/container';
import { Row } from '#/components/ui/row';
import { blurDataUrl } from '#/lib/constant';
import Image from 'next/image';
import { CardImageWithTextItem } from './item';
import { getTranslate } from '#/i18n/server';

interface ImageWithTextRenderBlockProps {}

const sampleData = [
  {
    icon: {
      src: '/images/icons/ticket.svg',
      alt: 'ticket-icon',
      width: 54,
      height: 54,
    },
    title: {
      en: 'Easy Booking',
      vi: 'Đặt chỗ dễ dàng',
    },
    description: {
      en: 'A simple and fast online tour booking system, completed in just a few minutes. Secure payment with multiple flexible methods.',
      vi: 'Hệ thống đặt tour trực tuyến đơn giản, nhanh chóng chỉ trong vài phút. Thanh toán an toàn với nhiều phương thức linh hoạt.',
    },
  },
  {
    icon: {
      src: '/images/icons/money.svg',
      alt: 'ticket-icon',
      width: 54,
      height: 54,
    },
    title: {
      en: 'Best Price',
      vi: 'Giá tốt nhất',
    },
    description: {
      en: 'Guaranteed competitive market rates with attractive promotions. Flexible refund policy in case of changes.',
      vi: 'Đảm bảo mức giá cạnh tranh nhất thị trường với nhiều ưu đãi hấp dẫn. Chính sách hoàn tiền linh hoạt khi có thay đổi.',
    },
  },
  {
    icon: {
      src: '/images/icons/phone.svg',
      alt: 'ticket-icon',
      width: 54,
      height: 54,
    },
    title: {
      en: '24/7 Support',
      vi: 'Hỗ trợ 24/7',
    },
    description: {
      en: 'A professional support team is ready to assist you anytime, anywhere. Quick answers to inquiries and fast issue resolution.',
      vi: 'Đội ngũ tư vấn viên chuyên nghiệp sẵn sàng hỗ trợ bạn mọi lúc, mọi nơi. Giải đáp thắc mắc và xử lý sự cố nhanh chóng. dịch sang tiếng anh',
    },
  },
];

const ImageWithTextRenderBlock = async ({}: ImageWithTextRenderBlockProps) => {
  const { translate } = await getTranslate();

  return (
    <Container className="px-0 lg:px-0">
      <div className="flex flex-col gap-y-12.5 lg:flex-row lg:gap-y-0">
        <div className="relative order-2 px-5 pb-12 lg:order-1 lg:w-[55.833%] lg:py-20 lg:pr-0 lg:pl-30">
          <div className="bg-pj-gray-lightest absolute bottom-0 left-0 h-[59.919%] w-full lg:top-0 lg:bottom-0 lg:h-full lg:w-[89.179%]" />
          <div className="ml-auto w-full">
            <div className="relative pt-[calc((737/675)*100%)]">
              <Image
                src="/images/placeholder.jpg"
                alt="Vietnam-road-trip"
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL={blurDataUrl}
              />
            </div>
          </div>
        </div>
        <div className="order-1 flex flex-1 items-center px-5 pt-15 pr-5 lg:order-2 lg:py-20 lg:pt-0 lg:pr-30">
          <div className="flex flex-col gap-y-12 lg:ml-auto lg:max-w-102 lg:gap-y-14">
            {sampleData.map(async item => (
              <CardImageWithTextItem
                key={item.icon.alt}
                icon={item.icon}
                title={await translate(item.title)}
                description={await translate(item.description)}
              />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export { ImageWithTextRenderBlock };
