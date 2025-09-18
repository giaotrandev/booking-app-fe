import { verifyTokenAction } from '#/components/auth-layout/actions/verify-token';
import { ProfileContentSidebar } from '#/components/blocks/account/sidebar/content/profile/profile';
import { fetchProfileInformation } from '#/lib/service/fetch-profile-information';
import { notFound } from 'next/navigation';

interface ProfileProps {}

const ProfilePage = async ({}: ProfileProps) => {
  const tokenResult = await verifyTokenAction();

  if (!tokenResult.valid) {
    return notFound();
  }
  const userInformation = await fetchProfileInformation();
  return <ProfileContentSidebar userInformation={userInformation} />;
};

export default ProfilePage;
