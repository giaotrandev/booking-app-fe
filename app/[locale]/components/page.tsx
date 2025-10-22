// TODO: Remove this page after tested
import { Layout } from '#/layouts/home-layout';
import { Template, TemplateProps } from '#/components/templates';
import { getStaticParams, setStaticParamsLocale } from '#/i18n/server';
import { PageProps } from '#/types/global';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sample',
  description: 'This is a sample page, please remove this page after tested',
};
export const generateStaticParams = getStaticParams;

const SamplePage = async (props: PageProps) => {
  const { locale } = await props.params;
  setStaticParamsLocale(locale);
  const template: TemplateProps = {
    name: 'standard',
  };

  return (
    //   <Template {...template}>
    <div className="max-w-screen-md space-y-10 py-10">
      <div>dd</div>
    </div>
    //   </Template>
  );
};

export default SamplePage;
