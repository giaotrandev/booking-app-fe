import AuthLayout from '#/components/auth-layout';
import { WrapperBookingBlock } from '#/components/blocks/booking/wrapper-index';
import { setStaticParamsLocale, getStaticParams } from '#/i18n/server';
import { PageProps } from '#/types/global';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sample',
  description: 'This is a sample page, please remove this page after tested',
};

// Sử dụng function có sẵn
export const generateStaticParams = getStaticParams;

const BookingPage = async (props: PageProps) => {
  const params = await props.params;
  const { locale } = params;

  setStaticParamsLocale(locale);

  return (
    <AuthLayout>
      <WrapperBookingBlock />
    </AuthLayout>
  );
};

export default BookingPage;
