import { VerifyEmailClient } from '#/components/blocks/verify-email-client/render';
import {
  getStaticParams,
  getTranslate,
  setStaticParamsLocale,
} from '#/i18n/server';
import { PageProps } from '#/types/global';
import { Metadata } from 'next';

// ✅ Sinh route tĩnh đa ngôn ngữ
export const generateStaticParams = getStaticParams;

// ✅ Metadata động cho SEO + i18n
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const { translate } = await getTranslate();

  const title = await translate({
    vi: 'Xác minh email - Vietnam Road Trip',
    en: 'Verify Email - Vietnam Road Trip',
  });

  const description = await translate({
    vi: 'Xác minh địa chỉ email của bạn để kích hoạt tài khoản và bắt đầu đặt vé xe nhanh chóng, tiện lợi.',
    en: 'Verify your email address to activate your account and start booking trips quickly and easily.',
  });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const url =
    locale === 'vi'
      ? 'https://vietnamroadtrip.vn/vi/verify-email'
      : 'https://vietnamroadtrip.vn/en/verify-email';

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
            vi: 'Vietnam Road Trip - Xác minh email',
            en: 'Vietnam Road Trip - Verify Email',
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
        vi: 'https://vietnamroadtrip.vn/vi/verify-email',
        en: 'https://vietnamroadtrip.vn/en/verify-email',
      },
    },
  };
}

// ✅ Trang Verify Email chính
const VerifyEmailPage = async ({ params }: PageProps) => {
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
            vi: 'Mã xác thực bị thiếu trong URL.',
            en: 'Verification token is missing in the URL.',
          })}
        </p>
      </div>
    );
  }

  // ✅ Gọi API kiểm tra token xác minh email
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  let success = false;
  let message = await translate({
    vi: 'Đã xảy ra lỗi trong quá trình xác minh.',
    en: 'Something went wrong during verification.',
  });

  try {
    const res = await fetch(`${baseUrl}/api/auth/verify-email/${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    const json = await res.json();
    success = !!json.success;
    message = json.message || message;
  } catch (err) {
    console.error('Email verification error:', err);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black/70 px-5 text-center">
      <VerifyEmailClient success={success} message={message} />
    </div>
  );
};

export default VerifyEmailPage;
