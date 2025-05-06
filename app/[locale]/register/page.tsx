import LoginRenderBlock from '#/components/blocks/login/render';
import RegisterRenderBlock from '#/components/blocks/register/render';
import { FormRenderBlock } from '#/components/dynamic-form/render';
import { FormFieldProps } from '#/components/dynamic-form/type';
import { Layout } from '#/components/layout';
import { TemplateProps } from '#/components/templates';
import { Link } from '#/i18n/routing';
import { getTranslate, setStaticParamsLocale } from '#/i18n/server';
import { PageProps } from '#/types/global';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sample',
  description: 'This is a sample page, please remove this page after tested',
};

const RegisterPage = async ({ params }: PageProps) => {
  const { locale } = await params;
  setStaticParamsLocale(locale);
  const { translate } = await getTranslate();

  return (
    <div>
      <RegisterRenderBlock fields={formFields} />
    </div>
  );
};

export default RegisterPage;
const formFields: FormFieldProps[] = [
  {
    id: 'login-email',
    name: 'email',
    type: 'email',
    label: 'Email',
    required: true,
  },
  {
    id: 'first-name',
    name: 'first-name',
    type: 'text',
    label: 'First name',
    required: true,
  },
  {
    id: 'last-name',
    name: 'last-name',
    type: 'text',
    label: 'Last name',
    required: true,
  },
  {
    id: 'birthday',
    name: 'birthday',
    type: 'date',
    label: 'Birthday',
    required: true,
  },
  {
    id: ' id-number',
    name: 'id-number',
    type: 'number',
    label: 'ID Number',
    required: true,
  },
  {
    id: 'register-password',
    name: 'password',
    type: 'password',
    label: 'password',
    required: true,
  },
  {
    id: 'register-confirm-password',
    name: 'password',
    type: 'password',
    label: 'Confirm password',
    required: true,
  },
];
