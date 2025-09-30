import { ChangePassword } from '#/components/blocks/account/sidebar/content/change-password/change-password';
import { notFound } from 'next/navigation';

interface ChangePasswordPageProps {}

const ChangePasswordPage = async ({}: ChangePasswordPageProps) => {
  return <ChangePassword />;
};

export default ChangePasswordPage;
