import { fetchProfileInformation } from '#/lib/service/fetch-profile-information';
import { AccountRenderBlock } from './render';

interface AccountBlockProps {}

const AccountBlock = async ({}: AccountBlockProps) => {
  return <AccountRenderBlock />;
};

export { AccountBlock };
