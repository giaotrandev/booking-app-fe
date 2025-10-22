import { PropsWithChildren } from 'react';
import { LayoutFooter, LayoutFooterProps } from './footer/footer';
import { LayoutHeader, LayoutHeaderProps } from './header';
import { LayoutMain } from './main';
import { LayoutFilterTrip } from './filter-trip/render';
import { fetchProvinces } from '#/lib/service/fetch-provinces';
import { convertToSelectOptions } from '#/lib/utilities/convert-to-select-options';
interface LayoutProps extends PropsWithChildren {
  // localizations?: LocalizationProps[];
}

const Layout = async ({ children }: LayoutProps) => {
  // const currentLocale = await getCurrentLocale();
  // NOTE: Query Global Settings here to get the Header & the Footer
  //   const globalSettings = await queryGlobalSettings({
  //     params: { locale: currentLocale },
  //   });

  const resProvinces = await fetchProvinces();
  const header: LayoutHeaderProps = {};
  const footer: LayoutFooterProps = {};

  return (
    <>
      {/* <Localizations list={localizations} /> */}
      <LayoutHeader {...header} />
      <LayoutFilterTrip
        arrivalList={convertToSelectOptions(resProvinces)}
        destinationList={convertToSelectOptions(resProvinces)}
      />
      <LayoutMain>{children}</LayoutMain>
      <LayoutFooter {...footer} />
    </>
  );
};

export { Layout };
