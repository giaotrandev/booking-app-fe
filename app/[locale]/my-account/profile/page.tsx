import { ProfileContentSidebar } from '#/components/blocks/account/sidebar/content/profile/profile';
import { getStaticParams, getTranslate } from '#/i18n/server';
import { fetchProfileInformation } from '#/lib/service/fetch-profile-information';
import { PageProps } from '#/types/global';

interface ProfileProps {}
export const generateStaticParams = getStaticParams;
export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const { translate } = await getTranslate();

  const title = await translate({
    vi: 'Thông Tin Cá Nhân - Vietnam Road Trip',
    en: 'Profile Information - Vietnam Road Trip',
  });

  const description = await translate({
    vi: 'Xem và chỉnh sửa thông tin cá nhân, email, số điện thoại, và cài đặt tài khoản của bạn.',
    en: 'View and edit your personal information, email, phone number, and account settings.',
  });

  const keywords = await translate({
    vi: 'thông tin cá nhân, tài khoản, hồ sơ người dùng, Vietnam Road Trip',
    en: 'profile, account, user information, Vietnam Road Trip',
  });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const url =
    locale === 'vi'
      ? 'https://vietnamroadtrip.vn/vi/my-account/profile'
      : 'https://vietnamroadtrip.vn/en/my-account/profile';

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
            vi: 'Vietnam Road Trip - Thông tin cá nhân',
            en: 'Vietnam Road Trip - Profile Information',
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
        vi: 'https://vietnamroadtrip.vn/vi/my-account/profile',
        en: 'https://vietnamroadtrip.vn/en/my-account/profile',
      },
    },
  };
}
const ProfilePage = async ({}: ProfileProps) => {
  const userInformation = await fetchProfileInformation();
  return <ProfileContentSidebar userInformation={userInformation} />;
};

export default ProfilePage;
