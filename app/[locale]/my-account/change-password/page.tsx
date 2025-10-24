import { ChangePassword } from '#/components/blocks/account/sidebar/content/change-password/change-password';
import { getStaticParams, getTranslate } from '#/i18n/server';
import { PageProps } from '#/types/global';
// ✅ Static params cho i18n
export const generateStaticParams = getStaticParams;
interface ChangePasswordPageProps {}
export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const { translate } = await getTranslate();

  const title = await translate({
    vi: 'Đổi Mật Khẩu - Vietnam Road Trip',
    en: 'Change Password - Vietnam Road Trip',
  });

  const description = await translate({
    vi: 'Thay đổi mật khẩu tài khoản của bạn để tăng cường bảo mật.',
    en: 'Change your account password to enhance security.',
  });

  const url =
    locale === 'vi'
      ? 'https://vietnamroadtrip.vn/vi/my-account/change-password'
      : 'https://vietnamroadtrip.vn/en/my-account/change-password';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

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
            vi: 'Vietnam Road Trip - Đổi mật khẩu',
            en: 'Vietnam Road Trip - Change Password',
          }),
        },
      ],
    },
    alternates: {
      canonical: url,
      languages: {
        vi: 'https://vietnamroadtrip.vn/vi/my-account/change-password',
        en: 'https://vietnamroadtrip.vn/en/my-account/change-password',
      },
    },
  };
}
const ChangePasswordPage = async ({}: ChangePasswordPageProps) => {
  return <ChangePassword />;
};

export default ChangePasswordPage;
