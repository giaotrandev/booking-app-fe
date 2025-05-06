// TODO: Remove this page after tested
import { Layout } from '#/components/layout';
import { Template, TemplateProps } from '#/components/templates';
import { Button } from '#/components/ui/button';
import { ButtonLink } from '#/components/ui/button-link';
import { Input } from '#/components/ui/input';
import { setStaticParamsLocale } from '#/i18n/server';
import { PageProps } from '#/types/global';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sample',
  description: 'This is a sample page, please remove this page after tested',
};

const SamplePage = async (props: PageProps) => {
  const { locale } = await props.params;
  setStaticParamsLocale(locale);
  const template: TemplateProps = {
    name: 'standard',
  };

  return (
    <Layout>
      <Template {...template}>
        <div className="max-w-screen-md space-y-10 px-10 py-10">
          <div className="flex gap-2">
            <Button variant="big" text="search" />
            <Button text="search" />
            <Button text="search" colors="grey" />
            <Button text="search" colors="none" variant="with-shadow" />
            <ButtonLink text="search" />
          </div>
          <Input placeholder="Email" required type="email" />
        </div>
      </Template>
    </Layout>
  );
};

export default SamplePage;
