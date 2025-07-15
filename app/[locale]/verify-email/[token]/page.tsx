import { VerifyEmailClient } from '#/components/blocks/verify-email-client/render';
import {
  getStaticParams,
  getTranslate,
  setStaticParamsLocale,
} from '#/i18n/server';
import { PageProps } from '#/types/global';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verify Email',
  description: 'Verify your email address to activate your account.',
};
// Thêm dòng này
export const generateStaticParams = getStaticParams;
const VerifyEmailPage = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const { locale, token } = resolvedParams;

  setStaticParamsLocale(locale);
  const { translate } = await getTranslate();
  // TODO: UPDATE THIS LAYOUT
  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="font-semibold text-red-600">
          Token is missing in the URL.
        </p>
      </div>
    );
  }

  // Fetch server-side
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  let success = false;
  let message = 'Something went wrong.';

  try {
    const res = await fetch(`${baseUrl}/api/auth/verify-email/${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    const json = await res.json();
    success = json.success;
    message = json.message;
  } catch (err) {
    console.error(err);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <VerifyEmailClient success={success} message={message} />
    </div>
  );
};

export default VerifyEmailPage;
