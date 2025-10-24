import { ResetPassword } from '#/components/blocks/reset-password/render';
import {
  getStaticParams,
  getTranslate,
  setStaticParamsLocale,
} from '#/i18n/server';
import { PageProps } from '#/types/global';
import { Metadata } from 'next';

export const generateStaticParams = getStaticParams;

// ✅ Tạo metadata động cho SEO + i18n
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const { translate } = await getTranslate();

  const title = await translate({
    vi: 'Đặt lại mật khẩu - Vietnam Road Trip',
    en: 'Reset Password - Vietnam Road Trip',
  });

  const description = await translate({
    vi: 'Thiết lập lại mật khẩu mới cho tài khoản Vietnam Road Trip của bạn để tiếp tục sử dụng các dịch vụ đặt vé xe nhanh chóng và an toàn.',
    en: 'Set a new password for your Vietnam Road Trip account to continue booking bus tickets quickly and securely.',
  });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const url =
    locale === 'vi'
      ? 'https://vietnamroadtrip.vn/vi/reset-password'
      : 'https://vietnamroadtrip.vn/en/reset-password';

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
        vi: 'https://vietnamroadtrip.vn/vi/reset-password',
        en: 'https://vietnamroadtrip.vn/en/reset-password',
      },
    },
  };
}

// ✅ Trang Reset Password
const ResetPasswordPage = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const { locale, token } = resolvedParams;

  setStaticParamsLocale(locale);
  const { translate } = await getTranslate();

  // ❌ Nếu không có token trong URL
  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black/70 px-5 text-center">
        <p className="font-semibold text-red-500">
          {await translate({
            vi: 'Mã xác thực không hợp lệ hoặc bị thiếu trong URL.',
            en: 'Invalid or missing token in the URL.',
          })}
        </p>
      </div>
    );
  }

  // ✅ Kiểm tra token hợp lệ qua API
  let isValid = false;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const res = await fetch(`${baseUrl}/api/auth/check-reset-token/${token}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    const data = await res.json();
    isValid = res.ok && data.success === true;
  } catch (err) {
    console.error('Error checking token:', err);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black/70 px-5 text-center">
      <ResetPassword isValid={isValid} token={token} />
    </div>
  );
};

export default ResetPasswordPage;
