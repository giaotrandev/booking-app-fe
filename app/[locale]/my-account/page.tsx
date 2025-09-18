import AuthLayout from '#/components/auth-layout';
import { verifyTokenAction } from '#/components/auth-layout/actions/verify-token';
// import { AccountBlock } from '#/components/blocks/account';
import { TemplateProps } from '#/components/templates';
import { getStaticParams, setStaticParamsLocale } from '#/i18n/server';
import { fetchProfileInformation } from '#/lib/service/fetch-profile-information';
import { PageProps } from '#/types/global';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Sample',
  description: 'This is a sample page, please remove this page after tested',
};
// Thêm dòng này
export const generateStaticParams = getStaticParams;
const MyAccountPage = async ({ params, searchParams }: PageProps) => {
  const { locale } = await params;
  const _searchParams = await searchParams;

  setStaticParamsLocale(locale);
  const tokenResult = await verifyTokenAction();

  if (!tokenResult.valid) {
    return notFound();
  }
  // const userInformation = await fetchProfileInformation();

  return <></>;
};

export default MyAccountPage;
