import { ProvincesRequestProps } from '#/services/global-settings/provinces-request';

export const convertToSelectOptions = (list: ProvincesRequestProps[]) =>
  list.map(item => ({ label: item.name ?? '', value: item.id }));
