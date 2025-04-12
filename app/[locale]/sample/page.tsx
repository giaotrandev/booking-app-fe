import { Layout } from '#/components/layout';
import { setStaticParamsLocale } from '#/i18n/server';
import { PageProps } from '#/types/global';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sample',
  description: 'This is a sample page, please remove this page after tested',
};

const SamplePage = async ({ params }: PageProps) => {
  const { locale } = await params;
  setStaticParamsLocale(locale);

//   const template: TemplateProps = {
//     name: 'standard',
//   };

  return (
    <Layout>
      <div className="flex h-screen items-center justify-center px-5 lg:px-0">
        This is Home page
      </div>
    </Layout>
  );
};

export default SamplePage;
