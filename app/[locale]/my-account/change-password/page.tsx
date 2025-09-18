import { verifyTokenAction } from '#/components/auth-layout/actions/verify-token';
import { ChangePassword } from '#/components/blocks/account/sidebar/content/change-password/change-password';
import { notFound } from 'next/navigation';

interface ChangePasswordPageProps {}

const ChangePasswordPage = async ({}: ChangePasswordPageProps) => {
  const tokenResult = await verifyTokenAction();

  if (!tokenResult.valid) {
    return notFound();
  }

  return <ChangePassword />;
};

export default ChangePasswordPage;
