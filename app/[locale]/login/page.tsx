import LoginRenderBlock from '#/components/blocks/login/render';
import { FormFieldProps } from '#/components/dynamic-form/type';
import {
  getTranslate,
  setStaticParamsLocale,
  getStaticParams,
} from '#/i18n/server';
import { PageProps } from '#/types/global';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sample',
  description: 'This is a sample page, please remove this page after tested',
};

// Thêm dòng này
export const generateStaticParams = getStaticParams;

const LoginPage = async (props: PageProps) => {
  const params = await props.params;
  const { locale } = params;
  const { translate } = await getTranslate();

  setStaticParamsLocale(locale);

  return (
    <div>
      <LoginRenderBlock
        fields={[
          {
            id: 'login-email',
            name: 'email',
            type: 'email',
            label: await translate({
              vi: 'Email',
              en: 'Email',
            }),
            required: true,
          },
          {
            id: 'login-password',
            name: 'password',
            type: 'password',
            label: await translate({
              vi: 'Mật khẩu',
              en: 'Password',
            }),
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
                label: await translate({
                  vi: 'Ghi nhớ đăng nhập',
                  en: 'Remember me',
                }),
              },
            ],
            type: 'checkbox',
            label: await translate({
              vi: 'Ghi nhớ đăng nhập',
              en: 'Remember me',
            }),
            placeholder: await translate({
              vi: 'Ghi nhớ đăng nhập',
              en: 'Remember me',
            }),
          },
        ]}
      />
    </div>
  );
};

export default LoginPage;
