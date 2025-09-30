import ForgotPasswordRenderBlock from '#/components/blocks/forgot-password/render';
import LoginRenderBlock from '#/components/blocks/login/render';
import { FormRenderBlock } from '#/components/dynamic-form/render';
import { FormFieldProps } from '#/components/dynamic-form/type';
import { Layout } from '#/layouts/home-layout';
import { TemplateProps } from '#/components/templates';
import { Link } from '#/i18n/routing';
import {
  getStaticParams,
  getTranslate,
  setStaticParamsLocale,
} from '#/i18n/server';
import { PageProps } from '#/types/global';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sample',
  description: 'This is a sample page, please remove this page after tested',
};
// Thêm dòng này
export const generateStaticParams = getStaticParams;

const LoginPage = async ({ params }: PageProps) => {
  const { locale } = await params;
  setStaticParamsLocale(locale);
  const { translate } = await getTranslate();

  return (
    <div>
      <ForgotPasswordRenderBlock fields={formFields} />
    </div>
  );
};

export default LoginPage;
const formFields: FormFieldProps[] = [
  {
    id: 'forgotpassword-email',
    name: 'email',
    type: 'email',
    label: 'Email',
    required: true,
  },
];
