import { TitleDescription } from '#/components/common/title-description';
import { Icon } from '#/components/icons';
import { Button } from '#/components/ui/button';
import { Container } from '#/components/ui/container';
import { Link } from '#/i18n/routing';
import { getTranslate } from '#/i18n/server';
import { BlockWrapper } from '../wrapper';

interface JouneyCTABlockRenderProps {}

const JouneyCTABlockRender = async ({}: JouneyCTABlockRenderProps) => {
  const { translate } = await getTranslate();

  return (
    <BlockWrapper className="bg-pj-red">
      <Container>
        <div className="flex flex-col items-center gap-y-5 lg:gap-y-6">
          <span>
            <Icon
              name="star"
              className="h-16 w-16 stroke-white lg:h-20 lg:w-20"
            />
          </span>
          <TitleDescription
            className="flex flex-col gap-y-2"
            title={await translate({
              vi: 'Sẵn Sàng Bắt Đầu Hành Trình?',
              en: 'Ready to Start Your Journey?',
            })}
            description={await translate({
              vi: 'Hãy để chúng tôi đồng hành cùng bạn trên mọi nẻo đường. Đặt vé ngay hôm nay!',
              en: 'Let us accompany you on every road. Book your ticket today!',
            })}
            descriptionVariant="h6"
            titleClassName="text-white"
            descriptionClassname="text-white"
          />
          <div className="flex items-center justify-center">
            <Button
              variant="outline"
              colors="white"
              asChild
              text={await translate({
                vi: 'Đặt Vé Ngay',
                en: 'Book Now',
              })}
              className="h-12 uppercase"
            >
              <Link href="/" />
            </Button>
          </div>
        </div>
      </Container>
    </BlockWrapper>
  );
};

export { JouneyCTABlockRender };
