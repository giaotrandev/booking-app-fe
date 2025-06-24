import LoginRenderBlock from '#/components/blocks/login/render';
import { FormFieldProps } from '#/components/dynamic-form/type';
import { getTranslate, setStaticParamsLocale } from '#/i18n/server';
import { extractUriFromParams } from '#/lib/utilities/extract-uri-from-params';
import { PageProps } from '#/types/global';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sample',
  description: 'This is a sample page, please remove this page after tested',
};

const LoginPage = async (props: PageProps) => {
  const params = await props.params;
  const { locale } = params;

  setStaticParamsLocale(locale);

  const uri = extractUriFromParams(params);
  const { translate } = await getTranslate();

  return (
    <div>
      <LoginRenderBlock fields={formFields} />
    </div>
  );
};

export default LoginPage;

const formFields: FormFieldProps[] = [
  {
    id: 'login-email',
    name: 'email',
    type: 'email',
    label: 'Email',
    required: true,
  },
  {
    id: 'login-password',
    name: 'password',
    type: 'password',
    label: 'Password',
    required: true,
  },
  {
    id: 'login-remember-me',
    name: 'rememberMe',
    required: false,
    options: [
      {
        id: 'rememberMe-1',
        value: true,
        label: 'Remember me',
      },
    ],
    type: 'checkbox',
    label: 'Remember me',
    placeholder: 'Remember me',
  },
];

// import LoginRenderBlock from '#/components/blocks/login/render';
// import { FormFieldProps } from '#/components/dynamic-form/type';
// import { getTranslate, setStaticParamsLocale } from '#/i18n/server';
// import { PageProps } from '#/types/global';
// import { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'Sample',
//   description: 'This is a sample page, please remove this page after tested',
// };

// const LoginPage = async ({ params }: PageProps) => {
//   const { locale } = await params;
//   setStaticParamsLocale(locale);
//   const { translate } = await getTranslate();

//   return (
//     <div>
//       <LoginRenderBlock fields={formFields} />
//     </div>
//   );
// };

// export default LoginPage;
// const formFields: FormFieldProps[] = [
//   {
//     id: 'login-email',
//     name: 'email',
//     type: 'email',
//     label: 'Email',
//     required: true,
//   },
//   {
//     id: 'login-password',
//     name: 'password',
//     type: 'password',
//     label: 'password',
//     required: true,
//   },
//   {
//     id: 'login-remember-me',
//     name: 'rememberMe',
//     required: false,
//     options: [
//       {
//         id: 'rememberMe-1',
//         value: true,
//         label: 'Remember me',
//       },
//     ],
//     type: 'checkbox',
//     label: 'Remember me',
//     placeholder: 'Remember me',
//   },
// ];
