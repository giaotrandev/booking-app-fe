'use client';
import { Slide, SliderAbstract } from '#/components/common/slider-abstract';
import { Container } from '#/components/ui/container';
import { Typography } from '#/components/ui/typography';
import { useTranslate } from '#/i18n/client';
import { BlockWrapper } from '../wrapper';
import { TestimonialSliderItem } from './item';
import { useMediaQuery } from 'usehooks-ts';

interface TestimonialSliderRenderBlockProps {}

const TestimonialSliderRenderBlock =
  ({}: TestimonialSliderRenderBlockProps) => {
    const { list } = DATA;
    const { translate } = useTranslate();
    const isDesktop = useMediaQuery('(min-width: 1024px)');

    return (
      <BlockWrapper>
        <Container>
          <h2>
            <Typography asChild variant="h1" className="uppercase">
              <span>
                {translate({
                  vi: 'Những khách hàng nói gì về ',
                  en: 'What customers say about ',
                })}{' '}
              </span>
            </Typography>
            <Typography asChild variant="h1" className="uppercase">
              <span className="text-pj-red">Vietnam Road Trip</span>
            </Typography>
          </h2>
          {Array.isArray(list) && list.length > 0 && (
            <div className="mt-12 xl:mt-15">
              <SliderAbstract
                options={{
                  loop: true,
                  duration: 50,
                  align: 'start',
                }}
                gap={0}
                arrowSize={'xl'}
                autoplay={{ playOnInit: true, delay: 5000 }}
                fade
                showArrows
                arrowContainerClassname="px-0"
                navigationClassName="px-0 w-full lg:right-0 lg:bottom-0 lg:absolute lg:w-[58.3448%]"
                arrowsClassName="justify-between w-full"
              >
                {list.map((item, key) => (
                  <Slide key={key}>
                    <TestimonialSliderItem
                      description={translate(item.description)}
                      position={translate(item.position)}
                      image={item.image}
                      name={item.name}
                    />
                  </Slide>
                ))}
              </SliderAbstract>
            </div>
          )}
        </Container>
      </BlockWrapper>
    );
  };

export { TestimonialSliderRenderBlock };
const DATA = {
  list: [
    {
      image: {
        src: 'https://pub-459bf266ac1b494db84a566366b2a2e6.r2.dev/images/about-us/member-1.webp',
        alt: 'Ngọc Anh',
      },
      name: 'Ngọc Anh',
      position: {
        en: 'New customer',
        vi: 'Khách hàng mới',
      },
      description: {
        en: 'Wonderful experience! I could easily find and book my trip in just a few minutes. Secure payment system, instant ticket confirmation. The bus was clean and comfortable, and the staff were very helpful. Very satisfied!',
        vi: 'Trải nghiệm tuyệt vời! Tôi có thể dễ dàng tìm và đặt chuyến đi chỉ trong vài phút. Hệ thống thanh toán an toàn, xác nhận vé gửi về nhanh chóng. Xe đi êm, sạch sẽ, nhân viên hỗ trợ tận tình. Rất hài lòng!',
      },
    },
    {
      image: {
        src: 'https://pub-459bf266ac1b494db84a566366b2a2e6.r2.dev/images/about-us/member-2.webp',
        alt: 'Hoang Nam',
      },
      name: 'Hoang Nam',
      position: {
        en: 'Family customer',
        vi: 'Khách hàng thân thiết',
      },
      description: {
        en: 'Vietnam Road Trip makes planning my journey so much easier. Lots of route options, flexible schedules, and clear price comparison. I booked tickets for my whole family without any trouble. Definitely will use again!',
        vi: 'Vietnam Road Trip giúp tôi lên kế hoạch chuyến đi tiện lợi hơn nhiều. Có nhiều lựa chọn tuyến đường, thời gian linh hoạt, dễ so sánh giá. Tôi đặt vé cho cả gia đình mà không gặp khó khăn gì. Chắc chắn sẽ tiếp tục sử dụng!',
      },
    },
    {
      image: {
        src: 'https://pub-459bf266ac1b494db84a566366b2a2e6.r2.dev/images/about-us/member-3.webp',
        alt: 'Thảo Vy',
      },
      name: 'Thảo Vy',
      position: {
        en: 'First-time user',
        vi: 'Khách hàng trải nghiệm lần đầu',
      },
      description: {
        en: 'This was my first time booking a bus ticket online with Vietnam Road Trip, and I felt completely assured. Everything was transparent with no hidden fees. The driver was friendly, and the ride was safe. I truly appreciate the professionalism of this service.',
        vi: 'Lần đầu thử đặt vé online qua Vietnam Road Trip và hoàn toàn yên tâm. Mọi thông tin minh bạch, không có chi phí ẩn. Tài xế thân thiện, xe chạy an toàn. Tôi đánh giá cao sự chuyên nghiệp của dịch vụ này.',
      },
    },
  ],
};
