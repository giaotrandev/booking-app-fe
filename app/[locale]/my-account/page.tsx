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
export const generateStaticParams = getStaticParams;
export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const { translate } = await getTranslate();

  const title = await translate({
    vi: 'Tài Khoản Của Tôi - Vietnam Road Trip',
    en: 'My Account - Vietnam Road Trip',
  });

  const description = await translate({
    vi: 'Truy cập khu vực tài khoản của bạn để quản lý thông tin cá nhân, lịch sử đặt vé và cài đặt bảo mật.',
    en: 'Access your account area to manage personal info, booking history, and security settings.',
  });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const url =
    locale === 'vi'
      ? 'https://vietnamroadtrip.vn/vi/my-account'
      : 'https://vietnamroadtrip.vn/en/my-account';

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'Vietnam Road Trip',
      type: 'website',
      images: [
        {
          url: '/images/logo.png',
          width: 1200,
          height: 630,
          alt: await translate({
            vi: 'Vietnam Road Trip - Tài khoản của tôi',
            en: 'Vietnam Road Trip - My Account',
          }),
        },
      ],
    },
    alternates: {
      canonical: url,
      languages: {
        vi: 'https://vietnamroadtrip.vn/vi/my-account',
        en: 'https://vietnamroadtrip.vn/en/my-account',
      },
    },
  };
}
const MyAccountPage = async ({ params, searchParams }: PageProps) => {
  const { locale } = await params;

  setStaticParamsLocale(locale);

  return <></>;
};

export default MyAccountPage;
