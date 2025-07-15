import { ResetPassword } from '#/components/blocks/reset-password/render';
import {
  getStaticParams,
  getTranslate,
  setStaticParamsLocale,
} from '#/i18n/server';
import { PageProps } from '#/types/global';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Set a new password for your account.',
};
// Thêm dòng này
export const generateStaticParams = getStaticParams;
const ResetPasswordPage = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const { locale, token } = resolvedParams;
  setStaticParamsLocale(locale);
  const { translate } = await getTranslate();
  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="font-semibold text-red-600">
          Token is missing in the URL.
        </p>
      </div>
    );
  }
  let isValid = false;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const res = await fetch(`${baseUrl}/api/auth/check-reset-token/${token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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
