import { getStaticParams, setStaticParamsLocale } from '#/i18n/server';
import { PageProps } from '#/types/global';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sample',
  description: 'This is a sample page, please remove this page after tested',
};
export const generateStaticParams = getStaticParams;
const MyAccountPage = async ({ params, searchParams }: PageProps) => {
  const { locale } = await params;

  setStaticParamsLocale(locale);

  return <></>;
};

export default MyAccountPage;
