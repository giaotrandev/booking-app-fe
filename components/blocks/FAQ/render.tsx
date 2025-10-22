'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '#/components/headless/accordion';
import { Container } from '#/components/ui/container';
import { useState } from 'react';
import { BlockWrapper } from '../wrapper';
import { cn } from '#/lib/utilities/cn';
import { Icon } from '#/components/icons';
import { FAQItem } from './item';
import { Typography } from '#/components/ui/typography';
import { useTranslate } from '#/i18n/client';

interface FAQRenderBlockProps {}
export const sampleFAQList = [
  {
    title: {
      en: 'How do I book a travel tour on your website?',
      vi: 'Làm thế nào để đặt tour du lịch trên website?',
    },
    description: {
      en: 'Simply select your destination, departure date, number of travelers, then fill in your information and make payment. The entire booking process takes only 5 minutes to complete.',
      vi: 'Bạn chỉ cần chọn điểm đến, ngày khởi hành, số lượng khách, sau đó điền thông tin và thanh toán. Toàn bộ quy trình chỉ mất 5 phút để hoàn thành đặt chỗ.',
    },
  },
  {
    title: {
      en: 'How long does it take to confirm my booking?',
      vi: 'Thời gian xác nhận booking là bao lâu?',
    },
    description: {
      en: "After successful payment, you'll receive an instant confirmation email. Our team will contact you within 2-4 hours to confirm tour details and provide additional information.",
      vi: 'Sau khi thanh toán thành công, bạn sẽ nhận được email xác nhận ngay lập tức. Đội ngũ của chúng tôi sẽ liên hệ trong vòng 2-4 tiếng để xác nhận chi tiết tour.',
    },
  },
  {
    title: {
      en: 'Can I modify or cancel my tour after booking?',
      vi: 'Có thể thay đổi hoặc hủy tour sau khi đã đặt không?',
    },
    description: {
      en: 'Yes! You can modify your itinerary up to 7 days before departure with no additional fees. Cancellations made 15 days in advance receive 80% refund.',
      vi: 'Có thể! Bạn có thể thay đổi lịch trình trước 7 ngày khởi hành mà không mất phí. Hủy tour trước 15 ngày sẽ được hoàn 80% chi phí.',
    },
  },
  {
    title: {
      en: 'What payment methods do you accept?',
      vi: 'Các phương thức thanh toán được hỗ trợ?',
    },
    description: {
      en: 'We accept credit/debit cards, digital wallets (PayPal, Apple Pay), bank transfers, and cash payments at our office locations.',
      vi: 'Chúng tôi hỗ trợ thanh toán qua thẻ tín dụng/ghi nợ, ví điện tử (MoMo, ZaloPay), chuyển khoản ngân hàng và thanh toán tại văn phòng.',
    },
  },
  {
    title: {
      en: 'Is travel insurance included in the tour package?',
      vi: 'Tour có bao gồm bảo hiểm du lịch không?',
    },
    description: {
      en: 'All our tours include basic travel insurance coverage. You can also upgrade to our premium insurance package for enhanced protection when booking your tour.',
      vi: 'Tất cả tour của chúng tôi đều bao gồm bảo hiểm du lịch cơ bản. Bạn cũng có thể nâng cấp lên gói bảo hiểm premium với mức bảo vệ cao hơn khi đặt tour.',
    },
  },
];
const FAQRenderBlock = ({}: FAQRenderBlockProps) => {
  const [value, setValue] = useState<string[]>([]);
  const { translate } = useTranslate();

  return (
    <BlockWrapper>
      <Container>
        <div className="mx-auto xl:max-w-200">
          <div className="mb-8 flex w-full justify-center lg:mb-6">
            <Typography asChild variant="h1" className="font-bold">
              <h2>
                {translate({
                  vi: 'Câu hỏi thường gặp',
                  en: 'Common Questions',
                })}
              </h2>
            </Typography>
          </div>
          <Accordion
            type="multiple"
            value={value}
            onValueChange={value => setValue(value)}
          >
            {sampleFAQList
              .filter(item => item !== null)
              .map((item, index) => {
                if (!item.title) return null;
                return (
                  <AccordionItem
                    value={`${item.title}-${index}`}
                    key={index}
                    className="border-b-[1.5px]"
                  >
                    <AccordionTrigger
                      className={cn(
                        'flex w-full cursor-pointer items-center justify-between',
                        index === 0 ? 'pt-0 pb-8 lg:pb-6' : 'py-8 lg:py-6',
                      )}
                    >
                      <Typography asChild variant="h4">
                        <h3>{translate(item.title)}</h3>
                      </Typography>
                      <span>
                        <Icon
                          name="chevron-up"
                          className={cn(
                            'h-6 w-6 rotate-180 transition-transform',
                            value.includes(`${item.title}-${index}`) &&
                              'rotate-0',
                          )}
                        />
                      </span>
                    </AccordionTrigger>
                    {item.description && (
                      <AccordionContent className="pb-16 lg:pb-12">
                        <FAQItem description={translate(item.description)} />
                      </AccordionContent>
                    )}
                  </AccordionItem>
                );
              })}
          </Accordion>
        </div>
      </Container>
    </BlockWrapper>
  );
};

export { FAQRenderBlock };
