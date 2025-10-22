import { Container } from '#/components/ui/container';
import { Typography } from '#/components/ui/typography';
import { getTranslate } from '#/i18n/server';
import { BlockWrapper } from '../wrapper';
import { CountingCardList } from './list';

interface CountingCardListBlockRenderProps {}

const CountingCardListBlockRender =
  async ({}: CountingCardListBlockRenderProps) => {
    const { translate } = await getTranslate();

    return (
      <BlockWrapper>
        <Container>
          <Typography
            asChild
            variant="h2"
            className="mb-6 text-center font-bold"
          >
            <h2>
              {translate({
                vi: 'Vì Sao Khách Hàng Chọn Chúng Tôi',
                en: 'Why Choose Us',
              })}
            </h2>
          </Typography>
          <CountingCardList />
        </Container>
      </BlockWrapper>
    );
  };

export { CountingCardListBlockRender };
