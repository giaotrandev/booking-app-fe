import { ProfileContentSidebar } from '#/components/blocks/account/sidebar/content/profile/profile';
import { fetchProfileInformation } from '#/lib/service/fetch-profile-information';
import { notFound } from 'next/navigation';

interface ProfileProps {}

const ProfilePage = async ({}: ProfileProps) => {
  const userInformation = await fetchProfileInformation();
  return <ProfileContentSidebar userInformation={userInformation} />;
};

export default ProfilePage;
