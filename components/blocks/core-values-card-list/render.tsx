import { TitleDescription } from '#/components/common/title-description';
import { Container } from '#/components/ui/container';
import { Row } from '#/components/ui/row';
import { Typography } from '#/components/ui/typography';
import { getTranslate } from '#/i18n/server';
import { BlockWrapper } from '../wrapper';
import { CoreValuesCardList } from './list';

interface CoreValuesCardListBlockRenderProps {}

const CoreValuesCardListBlockRender =
  async ({}: CoreValuesCardListBlockRenderProps) => {
    const { translate } = await getTranslate();

    return (
      <BlockWrapper>
        <Container>
          <TitleDescription
            title={await translate({
              vi: 'Giá Trị Cốt Lõi',
              en: 'Core Values',
            })}
            description={await translate({
              vi: 'Những giá trị này định hình cách chúng tôi phục vụ và tạo nên sự khác biệt',
              en: 'These values define how we serve and make us stand out',
            })}
          />
          <div className="mt-6">
            <CoreValuesCardList />
          </div>
        </Container>
      </BlockWrapper>
    );
  };

export { CoreValuesCardListBlockRender };
