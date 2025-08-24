import { InformationProfileRequestProps } from './information-profile-request';
import { InformationProfileResponseProps } from './information-profile-response';

export const convertInformationProfileItem = async (
  user: InformationProfileResponseProps,
): Promise<InformationProfileRequestProps> => {
  return {
    id: user.id,
    email: user.email ?? undefined,
    firstName: user.firstName ?? undefined,
    lastName: user.lastName ?? undefined,
    gender: user.gender ?? undefined,
    address: user.address ?? undefined,
    avatarUrl: user.avatarUrl ?? undefined,
    birthday: user.birthday ?? undefined,
    phoneNumber: user.phoneNumber ?? undefined,
  };
};
