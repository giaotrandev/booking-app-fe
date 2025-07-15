import AuthLayout from '#/components/auth-layout';
import { CheckoutBlock } from '#/components/blocks/checkout';
import { TemplateProps } from '#/components/templates';
import { getStaticParams, setStaticParamsLocale } from '#/i18n/server';
import { SocketProvider } from '#/providers/socket-provider';
import { PageProps } from '#/types/global';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sample',
  description: 'This is a sample page, please remove this page after tested',
};
// Thêm dòng này
export const generateStaticParams = getStaticParams;
const CheckoutPage = async ({ params, searchParams }: PageProps) => {
  const { locale } = await params;
  const _searchParams = await searchParams;
  console.log(_searchParams);
  setStaticParamsLocale(locale);

  const template: TemplateProps = {
    name: 'standard',
  };

  return (
    <AuthLayout>
      <SocketProvider>
        <CheckoutBlock />
      </SocketProvider>
    </AuthLayout>
  );
};

export default CheckoutPage;
