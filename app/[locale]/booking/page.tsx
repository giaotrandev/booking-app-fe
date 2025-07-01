import AuthLayout from '#/components/auth-layout';
import BookingBlock from '#/components/blocks/booking';
import { BookingRenderBlock } from '#/components/blocks/booking/render';
import FilterAccordion from '#/components/common/filter-accordion';
import { Layout } from '#/components/layout';
import { TemplateProps } from '#/components/templates';
import { setStaticParamsLocale } from '#/i18n/server';
import { PageProps } from '#/types/global';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sample',
  description: 'This is a sample page, please remove this page after tested',
};

const BookingPage = async ({ params, searchParams }: PageProps) => {
  const { locale } = await params;
  const _searchParams = await searchParams;
  setStaticParamsLocale(locale);

  const template: TemplateProps = {
    name: 'standard',
  };

  return (
    <AuthLayout>
      <BookingBlock searchParams={_searchParams} />
    </AuthLayout>
  );
};

export default BookingPage;
