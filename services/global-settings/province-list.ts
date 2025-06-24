import { convertProvinceItem } from './province-item';
import {
  ProvincesRequestListProps,
  ProvincesRequestProps,
} from './provinces-request';
import { ProvincesResponseListProps } from './provinces-response';

export const convertProvinceList = async (
  provinces: ProvincesResponseListProps['list'],
) => {
  const _provinces: ProvincesRequestListProps['list'] = [];
  for (const province of provinces ?? []) {
    if (!province) continue;
    const _province: ProvincesRequestProps =
      await convertProvinceItem(province);
    _provinces.push(_province);
  }
  return _provinces;
};
