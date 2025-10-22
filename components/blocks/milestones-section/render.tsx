import { TitleDescription } from '#/components/common/title-description';
import { Container } from '#/components/ui/container';
import { getTranslate } from '#/i18n/server';
import { BlockWrapper } from '../wrapper';
import { MilestoneList } from './list';

interface MilestonesSectionBlockRenderProps {}

const MilestonesSectionBlockRender =
  async ({}: MilestonesSectionBlockRenderProps) => {
    const { translate } = await getTranslate();

    return (
      <BlockWrapper>
        <Container>
          <TitleDescription
            className="flex flex-col gap-y-2"
            title={await translate({
              vi: 'Hành Trình Phát Triển',
              en: 'Development Journey',
            })}
            description={await translate({
              vi: 'Từng bước tiến trong hành trình xây dựng thương hiệu',
              en: 'Every milestone in our journey to build a trusted brand',
            })}
          />
          <div className="mt-6 w-full lg:mx-auto lg:max-w-[960px]">
            <MilestoneList />
          </div>
        </Container>
      </BlockWrapper>
    );
  };

export { MilestonesSectionBlockRender };
