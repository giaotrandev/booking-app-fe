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

// export const metadata: Metadata = {
//   title: 'Sample',
//   description: 'This is a sample page, please remove this page after tested',
// };
// Thêm dòng này
export const generateStaticParams = getStaticParams;
export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const { translate } = await getTranslate();

  const title = await translate({
    vi: 'Quên Mật Khẩu - Vietnam Road Trip',
    en: 'Forgot Password - Vietnam Road Trip',
  });

  const description = await translate({
    vi: 'Nhập email của bạn để đặt lại mật khẩu. Chúng tôi sẽ gửi hướng dẫn khôi phục tài khoản của bạn.',
    en: 'Enter your email to reset your password. We will send you instructions to recover your account.',
  });

  const keywords = await translate({
    vi: 'quên mật khẩu, đặt lại mật khẩu, Vietnam Road Trip, khôi phục tài khoản',
    en: 'forgot password, reset password, Vietnam Road Trip, account recovery',
  });

  const url =
    locale === 'vi'
      ? 'https://vietnamroadtrip.vn/vi/forgot-password'
      : 'https://vietnamroadtrip.vn/en/forgot-password';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url,
      siteName: 'Vietnam Road Trip',
      type: 'website',
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      images: [
        {
          url: '/images/logo.png',
          width: 1200,
          height: 630,
          alt: await translate({
            vi: 'Vietnam Road Trip - Đặt lại mật khẩu',
            en: 'Vietnam Road Trip - Reset Password',
          }),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/logo.png'],
    },
    alternates: {
      canonical: url,
      languages: {
        vi: 'https://vietnamroadtrip.vn/vi/forgot-password',
        en: 'https://vietnamroadtrip.vn/en/forgot-password',
      },
    },
  };
}
const LoginPage = async ({ params }: PageProps) => {
  const { locale } = await params;
  setStaticParamsLocale(locale);
  const { translate } = await getTranslate();

  return (
    <section>
      <ForgotPasswordRenderBlock fields={formFields} />
    </section>
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
