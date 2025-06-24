import { getCurrentLocale } from '#/i18n/server';
import { PropsWithChildren } from 'react';
import { LayoutFooter, LayoutFooterProps } from './footer/footer';
import { LayoutHeader, LayoutHeaderProps } from './header';
import { LayoutMain } from './main';
import { FilterItemProps } from './filter-trip/navigation-booking/render';
import { LayoutFilterTrip } from './filter-trip';
import { cookies } from 'next/headers';
import { fetchProvincesWithCookie } from '#/lib/service/fetch-provinces';
import { convertProvinceList } from '#/services/global-settings/province-list';
import { ProvincesRequestProps } from '#/services/global-settings/provinces-request';
interface LayoutProps extends PropsWithChildren {}

const Layout = async ({ children }: LayoutProps) => {
  const currentLocale = await getCurrentLocale();
  // NOTE: Query Global Settings here to get the Header & the Footer
  //   const globalSettings = await queryGlobalSettings({
  //     params: { locale: currentLocale },
  //   });

  const resProvinces = await fetchProvincesWithCookie();
  const provinceListData: ProvincesRequestProps[] = await convertProvinceList(
    resProvinces.provinces,
  );
  const header: LayoutHeaderProps = {};
  const footer: LayoutFooterProps = {};
  const convertToSelectOptions = (list: ProvincesRequestProps[]) =>
    list.map(item => ({ label: item.name ?? '', value: item.id }));

  // const arrivalListSample: FilterItemProps[] =
  //   convertToSelectOptions(arrivalList);
  // const destinationListSample: FilterItemProps[] =
  //   convertToSelectOptions(destinationList);
  return (
    <>
      <LayoutHeader {...header} />
      <LayoutFilterTrip
        arrivalList={convertToSelectOptions(provinceListData)}
        destinationList={convertToSelectOptions(provinceListData)}
      />
      <LayoutMain>{children}</LayoutMain>
      <LayoutFooter {...footer} />
    </>
  );
};

export { Layout };
const arrivalList: string[] = [
  'Hanoi',
  'Ho Chi Minh City',
  'Da Nang',
  'Hue',
  'Nha Trang',
];

const destinationList: string[] = [
  'Sapa',
  'Ha Long Bay',
  'Phu Quoc',
  'Da Lat',
  'Can Tho',
];
