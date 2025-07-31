import RegisterRenderBlock from '#/components/blocks/register/render';
import { FormFieldProps } from '#/components/dynamic-form/type';
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
    name: 'firstName',
    type: 'text',
    label: 'First name',
    required: true,
  },
  {
    id: 'last-name',
    name: 'lastName',
    type: 'text',
    label: 'Last name',
    required: true,
  },
  {
    id: '67b53c380c32252cb540c1b1',
    name: 'gender',
    required: true,
    options: [
      {
        id: '67b53c440c32252cb540c1b3',
        value: 'MALE',
        label: 'Male',
      },

      {
        id: '67b53c4c0c32252cb540c1b5',
        value: 'FEMALE',
        label: 'Female',
      },
    ],
    type: 'radio',
    label: 'Gender',
    placeholder: 'Gender',
  },
  {
    id: 'birthday',
    name: 'birthday',
    type: 'date',
    label: 'Birthday',
    required: true,
    placeholder: 'Birthday',
  },
  {
    id: 'register-password',
    name: 'password',
    type: 'password',
    label: 'Password',
    required: true,
  },
  {
    id: 'register-confirm-password',
    name: 'confirmPassword',
    type: 'password',
    label: 'Confirm password',
    required: true,
  },
];
