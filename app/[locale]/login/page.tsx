import LoginRenderBlock from '#/components/blocks/login/render';
import { FormFieldProps } from '#/components/dynamic-form/type';
import {
  getTranslate,
  setStaticParamsLocale,
  getStaticParams,
} from '#/i18n/server';
import { PageProps } from '#/types/global';
import { Metadata } from 'next';
export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const { translate } = await getTranslate();

  const title = await translate({
    vi: 'Đăng Nhập - Vietnam Road Trip',
    en: 'Login - Vietnam Road Trip',
  });

  const description = await translate({
    vi: 'Đăng nhập để đặt vé xe liên tỉnh nhanh chóng, quản lý vé đã đặt và theo dõi hành trình dễ dàng cùng Vietnam Road Trip.',
    en: 'Log in to quickly book interprovincial bus tickets, manage your bookings, and easily track your journeys with Vietnam Road Trip.',
  });

  const keywords = await translate({
    vi: 'đăng nhập, vé xe, vé xe liên tỉnh, Vietnam Road Trip, đặt vé xe khách, vé xe online',
    en: 'login, bus ticket, interprovincial bus, Vietnam Road Trip, online bus booking',
  });

  const url =
    locale === 'vi'
      ? 'https://vietnamroadtrip.vn/vi/login'
      : 'https://vietnamroadtrip.vn/en/login';
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
            vi: 'Vietnam Road Trip - Đăng nhập tài khoản',
            en: 'Vietnam Road Trip - Login Page',
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
        vi: 'https://vietnamroadtrip.vn/vi/login',
        en: 'https://vietnamroadtrip.vn/en/login',
      },
    },
  };
}
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
