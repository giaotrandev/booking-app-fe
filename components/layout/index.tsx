import { getCurrentLocale } from '#/i18n/server';
import { PropsWithChildren } from 'react';
import { LayoutFooter, LayoutFooterProps } from './footer/footer';
import { LayoutHeader, LayoutHeaderProps } from './header';
import { LayoutMain } from './main';
import { FilterItemProps } from '../blocks/hero/navigation-booking/render';
import { LayoutFilterTrip } from './filter-trip';

interface LayoutProps extends PropsWithChildren {}

const Layout = async ({ children }: LayoutProps) => {
  const currentLocale = await getCurrentLocale();
  // NOTE: Query Global Settings here to get the Header & the Footer
  //   const globalSettings = await queryGlobalSettings({
  //     params: { locale: currentLocale },
  //   });
  const header: LayoutHeaderProps = {};
  const footer: LayoutFooterProps = {};
  const convertToSelectOptions = (list: string[]) =>
    list.map(item => ({ label: item, value: item }));

  const arrivalListSample: FilterItemProps[] =
    convertToSelectOptions(arrivalList);
  const destinationListSample: FilterItemProps[] =
    convertToSelectOptions(destinationList);
  return (
    <>
      <LayoutHeader {...header} />
      {/* <LayoutFilterTrip
        arrivalList={arrivalListSample}
        destinationList={destinationListSample}
      /> */}
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
