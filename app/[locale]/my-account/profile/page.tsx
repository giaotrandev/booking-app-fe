import { ProfileContentSidebar } from '#/components/blocks/account/sidebar/content/profile/profile';
import { fetchProfileInformation } from '#/lib/service/fetch-profile-information';

interface ProfileProps {}

const ProfilePage = async ({}: ProfileProps) => {
  const userInformation = await fetchProfileInformation();
  return <ProfileContentSidebar userInformation={userInformation} />;
};

export default ProfilePage;
