import { ProvincesRequestProps } from './provinces-request';
import { ProvincesResponseProps } from './provinces-response';

export const convertProvinceItem = async (
  province: ProvincesResponseProps,
): Promise<ProvincesRequestProps> => ({
  id: province.id,
  name: province.name ?? undefined,
  code: province.code ?? undefined,
  latitude: province.latitude ?? undefined,
  longitude: province.longitude ?? undefined,
  status: province.status ?? undefined,
  image: province.image ?? undefined,
});
